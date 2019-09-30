# This file is part of Radicale Server - Calendar Server
# Copyright © 2014 Jean-Marc Martins
# Copyright © 2012-2017 Guillaume Ayoub
# Copyright © 2017-2019 Unrud <unrud@outlook.com>
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
import binascii
import os
import pickle

from radicale import item as radicale_item
from radicale import pathutils
from radicale.log import logger
from Jumpscale import j


class CollectionHistoryMixin:
    def _update_history_etag(self, href, item):
        """Updates and retrieves the history etag from the history cache.

        The history cache contains a file for each current and deleted item
        of the collection. These files contain the etag of the item (empty
        string for deleted items) and a history etag, which is a hash over
        the previous history etag and the etag separated by "/".
        """
        history_folder = os.path.join(self._filesystem_path, ".Radicale.cache", "history")
        try:
            contents = j.sal.bcdbfs.file_read(os.path.join(history_folder, href))
            cache_etag, history_etag = pickle.loads(contents)
        except (j.exceptions.NotFound, pickle.UnpicklingError, ValueError) as e:
            if isinstance(e, (pickle.UnpicklingError, ValueError)):
                logger.warning("Failed to load history cache entry %r in %r: %s", href, self.path, e, exc_info=True)
            cache_etag = ""
            # Initialize with random data to prevent collisions with cleaned
            # expired items.
            history_etag = binascii.hexlify(os.urandom(16)).decode("ascii")
        etag = item.etag if item else ""
        if etag != cache_etag:
            self._makedirs_synced(history_folder)
            history_etag = radicale_item.get_etag(history_etag + "/" + etag).strip('"')
            try:
                # Race: Other processes might have created and locked the file.
                with self._atomic_write(os.path.join(history_folder, href), "wb") as f:
                    pickle.dump([etag, history_etag], f)
            except PermissionError:
                pass
        return history_etag

    def _get_deleted_history_hrefs(self):
        """Returns the hrefs of all deleted items that are still in the
        history cache."""
        history_folder = os.path.join(self._filesystem_path, ".Radicale.cache", "history")
        try:
            for entry in j.sal.bcdbfs.list_files_and_dirs(history_folder):
                href = os.path.basename(entry)
                if not pathutils.is_safe_filesystem_path_component(href):
                    continue
                if j.sal.bcdbfs.is_file(os.path.join(self._filesystem_path, href)):
                    continue
                yield href
        except j.exceptions.NotFound:
            pass

    def _clean_history(self):
        # Delete all expired history entries of deleted items.
        history_folder = os.path.join(self._filesystem_path, ".Radicale.cache", "history")
        self._clean_cache(
            history_folder,
            self._get_deleted_history_hrefs(),
            max_age=self.configuration.get("storage", "max_sync_token_age"),
        )
