# This file is part of Radicale Server - Calendar Server
# Copyright © 2008 Nicolas Kandel
# Copyright © 2008 Pascal Halter
# Copyright © 2008-2017 Guillaume Ayoub
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
from http import client
from xml.etree import ElementTree as ET

from radicale import httputils, storage, xmlutils


def xml_delete(base_prefix, path, collection, href=None):
    """Read and answer DELETE requests.

    Read rfc4918-9.6 for info.

    """
    collection.delete(href)

    multistatus = ET.Element(xmlutils.make_tag("D", "multistatus"))
    response = ET.Element(xmlutils.make_tag("D", "response"))
    multistatus.append(response)

    href = ET.Element(xmlutils.make_tag("D", "href"))
    href.text = xmlutils.make_href(base_prefix, path)
    response.append(href)

    status = ET.Element(xmlutils.make_tag("D", "status"))
    status.text = xmlutils.make_response(200)
    response.append(status)

    return multistatus


class ApplicationDeleteMixin:
    def do_DELETE(self, environ, base_prefix, path, user):
        """Manage DELETE request."""
        if not self.access(user, path, "w"):
            return httputils.NOT_ALLOWED
        with self.Collection.acquire_lock("w", user):
            item = next(self.Collection.discover(path), None)
            if not item:
                return httputils.NOT_FOUND
            if not self.access(user, path, "w", item):
                return httputils.NOT_ALLOWED
            if_match = environ.get("HTTP_IF_MATCH", "*")
            if if_match not in ("*", item.etag):
                # ETag precondition not verified, do not delete item
                return httputils.PRECONDITION_FAILED
            if isinstance(item, storage.BaseCollection):
                xml_answer = xml_delete(base_prefix, path, item)
            else:
                xml_answer = xml_delete(base_prefix, path, item.collection, item.href)
            headers = {"Content-Type": "text/xml; charset=%s" % self.encoding}
            return client.OK, headers, self.write_xml_content(xml_answer)
