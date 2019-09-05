import gevent
from gevent import monkey

monkey.patch_all(thread=False)
import logging

import os
from Jumpscale import j


# def _create_theebots():
#     threebot_tids = {}
#     for name in ["customer", "farmer1", "farmer2", "signer1", "singer2"]:
#         tb = j.clients.threebot.threebot_register(name)
#         threebot_tids[name] = tb.id
#     return threebot_tids


def main(self):
    pass
    # threebots_info = _create_theebots()
