from Jumpscale import j

# FIXME: re-use macro code (or make get_data generic)
# TODO: cache with expiration

REPO = "https://github.com/abom/test_community/tree/master/partners"


def get_data(path, image_path="images"):
    data = []
    for directory in j.sal.fs.listDirsInDir(path):
        partner_data = {}

        for filepath in j.sal.fs.listFilesInDir(directory):
            basename = j.sal.fs.getBaseName(filepath).lower()
            extname = j.sal.fs.getFileExtension(filepath)
            if basename.startswith("info") and extname == "toml":
                partner_data.update(j.data.serializers.toml.load(filepath))
            elif extname in ("png", "jpg", "jpeg"):
                partner_data["logo"] = j.sal.fs.joinPaths(image_path, basename)
                dest = j.sal.fs.joinPaths(path, image_path)
                j.sal.fs.copyFile(filepath, dest)

        if partner_data:
            data.append(partner_data)

    return data


class community(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.path = None

    def clone_repo(self):
        self.path = j.clients.git.getContentPathFromURLorPath(REPO, pull=True)

    def list_partners(self, image_path):
        """
        ```in
            image_path = (S)
        ```
        """
        if not self.path:
            self.clone_repo()

        data = get_data(self.path, image_path=image_path)
        return j.data.serializers.json.dumps(data)
