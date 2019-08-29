import unittest
import logging
from Jumpscale import j


class FarmActorsTests(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.bcdb = j.data.bcdb.get("tf_directory")
        self.model = self.bcdb.model_get(url="tfgrid.farm.1")
        self.cl = j.clients.gedis.get("main", host="localhost", port=9901)

    def tearDown(self):
        self.model.destroy()

    def test01_farm_register(self):
        """
        Testcase to test register farm actor
        #. Create new farm, should succeed
        #. Get farm info
        """
        logging.info("Create new farm, should succeed")
        farm = self.model.new()
        farm.name = "farm1"
        farm.location.county = "egypt"
        farm.location.city = "cairo"
        result = self.cl.actors.farms.register(farm._ddict)

        logging.info("Get farm info")
        farm = self.cl.actors.farms.get(result.farm_id)
        self.assertEqual(farm.name, "farm1")

    def test02_farms_list(self):
        """
        Testcase to test list farms actor
        #. Create two farms.
        #. List all farms, should succeed.
        #. Filter by country, should succeed.
        #. Filter by city, should succeed
        """
        logging.info("Create two farms")
        farm_1 = self.model.new()
        farm_1.name = "farm1"
        farm_1.location.country = "egypt"
        farm_1.location.city = "cairo"
        self.cl.actors.farms.register(farm_1._ddict)

        farm_2 = self.model.new()
        farm_2.name = "farm2"
        farm_2.location.country = "belgium"
        farm_2.location.city = "ghent"
        self.cl.actors.farms.register(farm_2._ddict)

        logging.info("List all farms, should succeed")
        result = self.cl.actors.farms.list()
        self.assertEqual(len(result.farms), 2)

        logging.info("Filter by country, should succeed")
        result = self.cl.actors.farms.list(country="egypt")
        self.assertTrue(result.farms)
        self.assertEqual(result.farms[0].location.country, "egypt")

        logging.info("Filter by city, should succeed")
        result = self.cl.actors.farms.list(city="ghent")
        self.assertTrue(result.farms)
        self.assertEqual(result.farms[0].location.city, "ghent")

    def test03_farm_get(self):
        """
        Testcase to test get farm actor
        #. Create new farm.
        #. Get farm info, should succeed.
        #. Try to get non-existing farm, should fail.
        """
        logging.info("Create new farm")
        farm = self.model.new()
        farm.name = "farm1"
        result = self.cl.actors.farms.register(farm._ddict)

        logging.info("Get farm info, should succeed")
        farm = self.cl.actors.farms.get(result.farm_id)
        self.assertEqual(farm.name, "farm1")

        logging.info("Try to get non-existing farm, should fail")
        with self.assertRaises(j.exceptions.NotFound):
            self.cl.actors.farms.get(1000)

    def test04_farm_update(self):
        """
        Testcase to test update farm actor
        #. Create new farm.
        #. Update farm info, should succeed.
        #. Try to update non-existing farm, should fail.
        """
        logging.info("Create new farm")
        farm = self.model.new()
        farm.name = "test-update"
        result = self.cl.actors.farms.register(farm._ddict)

        logging.info("Update farm info, should succeed")
        farm.name = "farm1"
        self.cl.actors.farms.update(result.farm_id, farm._ddict)
        farm = self.cl.actors.farms.get(result.farm_id)
        self.assertEqual(farm.name, "farm1")

        logging.info("Try to update non-existing farm, should fail")
        with self.assertRaises(j.exceptions.NotFound):
            self.cl.actors.farms.update(1000, farm._ddict)
