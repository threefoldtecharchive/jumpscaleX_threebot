# This file is part of Radicale Server - Calendar Server
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
"""
Custom web plugin.

"""

from http import client

from radicale import web


class Web(web.BaseWeb):
    def get(self, environ, base_prefix, path, user):
        return client.OK, {"Content-Type": "text/plain"}, "custom"
