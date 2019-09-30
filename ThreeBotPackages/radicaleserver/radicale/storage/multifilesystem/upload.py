# This file is part of Radicale Server - Calendar Server
# Copyright © 2014 Jean-Marc Martins
# Copyright © 2012-2017 Guillaume Ayoub
# Copyright © 2017-2018 Unrud <unrud@outlook.com>
#
# This library is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
import os
import pickle

from radicale import item as radicale_item
from radicale import pathutils
from Jumpscale import j


class CollectionUploadMixin:
    def upload(self, href, item):
        if not pathutils.is_safe_filesystem_path_component(href):
            raise pathutils.UnsafePathError(href)
        try:
            self._store_item_cache(href, item)
        except Exception as e:
            raise j.exceptions.Value("Failed to store item %r in collection %r: %s" % (href, self.path, e)) from e
        path = pathutils.path_to_filesystem(self._filesystem_path, href)
        with self._atomic_write(path, newline="") as fd:
            fd.write(item.serialize())
        # Clean the cache after the actual item is stored, or the cache entry
        # will be removed again.
        self._clean_item_cache()
        # Track the change
        self._update_history_etag(href, item)
        self._clean_history()
        return self._get(href, verify_href=False)

    def _upload_all_nonatomic(self, items, suffix=""):
        """Upload a new set of items.

        This takes a list of vobject items and
        uploads them nonatomic and without existence checks.

        """
        try:
            cache_folder = os.path.join(self._filesystem_path, ".Radicale.cache", "item")
            self._makedirs_synced(cache_folder)
            hrefs = set()

            for item in items:
                uid = item.uid
                try:
                    cache_content = self._item_cache_content(item)
                except Exception as e:
                    raise j.exceptions.Value(
                        "Failed to store item %r in temporary collection %r: %s" % (uid, self.path, e)
                    ) from e
                href_candidates = []
                if os.name in ("nt", "posix"):
                    href_candidates.append(lambda: uid if uid.lower().endswith(suffix.lower()) else uid + suffix)
                href_candidates.extend(
                    (
                        lambda: radicale_item.get_etag(uid).strip('"') + suffix,
                        lambda: radicale_item.find_available_uid(hrefs.__contains__, suffix),
                    )
                )
                href = None

                def get_path():
                    nonlocal href
                    while href_candidates:
                        href = href_candidates.pop(0)()
                        if href in hrefs:
                            continue
                        if not pathutils.is_safe_filesystem_path_component(href):
                            if not href_candidates:
                                raise pathutils.UnsafePathError(href)
                            continue
                        try:
                            return pathutils.path_to_filesystem(self._filesystem_path, href)
                        except OSError as e:
                            if href_candidates and (
                                os.name == "posix" and e.errno == 22 or os.name == "nt" and e.errno == 123
                            ):
                                continue
                            raise

                with self._atomic_write(get_path(), newline="") as f:
                    f.write(item.serialize())
                hrefs.add(href)
                with self._atomic_write(os.path.join(cache_folder, href), mode="wb") as f:
                    pickle.dump(cache_content, f)
            # self._sync_directory(cache_folder)
            # self._sync_directory(self._filesystem_path)
        except Exception as e:
            raise e
