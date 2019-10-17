from unittest import TestCase
from loguru import logger
from uuid import uuid4


class BaseTest(TestCase):
    LOGGER = logger

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @staticmethod
    def info(message):
        BaseTest.LOGGER.info(message)

    @staticmethod
    def generate_random_str():
        return str(uuid4()).replace("-", "")[:10]
