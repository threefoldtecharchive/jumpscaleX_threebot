from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        actors_dir = self._dirpath + "/actors/"
        j.sal.fs.remove(actors_dir)
        j.sal.fs.createDir(actors_dir)
        for model in self.bcdb.models:
            if model.schema.url.startswith("jumpscale.bcdb."):
                continue
            j.tools.jinja2.file_render(
                self._dirpath + "/templates/template.py",
                dest=actors_dir + model.schema.key + "_model.py",
                model=model,
                fields_schema=self._model_get_fields_schema(model),
            )
        self.gedis_server.actors_add(self._dirpath + "/actors/")

    def _model_get_fields_schema(self, model):
        lines = model.schema.text.splitlines()
        if lines[0].strip().startswith("@url"):
            lines.pop(0)
        return "\n        ".join(lines)
