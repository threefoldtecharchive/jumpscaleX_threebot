# This file is part of Radicale Server - Calendar Server
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
"""
Custom storage backend.

Copy of filesystem storage backend for testing

"""

from radicale.storage import multifilesystem


# TODO: make something more in this collection (and test it)
class Collection(multifilesystem.Collection):
    """Collection stored in a folder."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
