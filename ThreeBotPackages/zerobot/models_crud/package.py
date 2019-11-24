from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        actors_dir = j.dirs.VARDIR + "/codegen/actors/"
        if j.sal.fs.exists(actors_dir):
            j.sal.fs.remove(actors_dir)
        j.sal.fs.createDir(actors_dir)

        for model in self.bcdb.models:
            # Exclude bcdb meta data models
            if model.schema.url.startswith("jumpscale.bcdb."):
                continue
            j.tools.jinja2.file_render(
                self._dirpath + "/templates/template.py",
                dest=actors_dir + model.schema.key + "_model.py",
                model=model,
                fields_schema=self._model_get_fields_schema(model),
            )
        self.gedis_server.actors_add(actors_dir)

    def _model_get_fields_schema(self, model):
        lines = model.schema.text.splitlines()
        if lines[0].strip().startswith("@url"):
            lines.pop(0)
        return "\n        ".join(lines)

    def test(self):
        test_schema = """
        @url = bcdb.example
        name** = (S)
        address = (S)
        age** = (I)
        """
        # load the model
        j.data.bcdb.system.model_get(schema=test_schema)

        # start the server with bcdb package loaded
        self.start()

        # get gedis client
        cl = j.clients.gedis.threebot
        cl.reload()
        # destroy old testing data
        cl.actors.bcdb_example_model.destroy()

        # create some testing data
        for i in range(10):
            cl.actors.bcdb_example_model.new(name=f"example{i}", address=f"address{i}", age=i)

        # retrieve all objects
        all_objs = cl.actors.bcdb_example_model.find()
        assert len(all_objs) == 10

        # find an object with query
        res = cl.actors.bcdb_example_model.find(query={"name": "example4", "age": 4})
        assert len(res) == 1
        assert res[0].address == "address4"

        # get by name
        obj4_by_name = cl.actors.bcdb_example_model.get_by_name(name="example4")
        assert obj4_by_name.address == "address4"

        # get by id
        obj4_by_id = cl.actors.bcdb_example_model.get(object_id=obj4_by_name.id)
        assert obj4_by_name == obj4_by_id

        # find with wrong query
        res = cl.actors.bcdb_example_model.find(query={"name": "example4", "age": 1})
        assert len(res) == 0

        # update data
        cl.actors.bcdb_example_model.set(object_id=obj4_by_name.id, values={"age": 3})
        res = cl.actors.bcdb_example_model.find(query={"name": "example4", "age": 3})
        assert len(res) == 1

        # delete one object
        cl.actors.bcdb_example_model.delete(object_id=obj4_by_name.id)
        all_objs = cl.actors.bcdb_example_model.find()
        assert len(all_objs) == 9

        print("SUCCESS")
