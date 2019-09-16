from Jumpscale import j

# FIXME: re-use macros (or make them re-usbale!)
#       now, we cannot even import them normally here!
# TODO: cache with expiration

REPO = "https://github.com/threefoldfoundation/data_team/tree/master/team"


def filter_on(data, attr, values):
    values = set(values)

    def filter_by_attr(person):
        try:
            return any([value in person[attr] for value in values])
        except KeyError:
            return False

    return list(filter(filter_by_attr, data))


def filter_on_mapping(mapping, data):
    """filter on mapping of projects and contribution types

    :param mapping: list of tuples (project_id, contribution_id) e.g. [(1, 1), (1,2)]
    :type mapping: [tuple]
    :param data: team data
    :type data: [dict]
    """
    new_data = []

    for person in data:
        projects, contributions = person["project_ids"], person["contribution_ids"]
        for item in zip(projects, contributions):
            if item in mapping:
                new_data.append(person)
                break

    return new_data


def get_data(path, image_path="images", projects=None, contribution_types=None):
    data = []
    for directory in j.sal.fs.listDirsInDir(path):
        person_data = {}

        for filepath in j.sal.fs.listFilesInDir(directory):
            basename = j.sal.fs.getBaseName(filepath).lower()
            extname = j.sal.fs.getFileExtension(filepath)
            if basename.startswith("publicinfo") and extname == "toml":
                person_data.update(j.data.serializers.toml.load(filepath))
            elif extname in ("png", "jpg", "jpeg"):
                person_data["avatar"] = j.sal.fs.joinPaths(image_path, basename)
                dest = j.sal.fs.joinPaths(path, image_path)
                j.sal.fs.copyFile(filepath, dest)

        if person_data:
            data.append(person_data)

    if projects:
        data = filter_on(data, "project_ids", projects)
    if contribution_types:
        data = filter_on(data, "contribution_ids", contribution_types)
        if projects and len(projects) == len(contribution_types):
            # ensure the order of filtration is respected
            # mapping for example projects of [1,2] to contributions types of [1,4]
            # so will show 1:1 (project:contribution_type) and 2:4
            mapping = list(zip(projects, contribution_types))
            data = filter_on_mapping(mapping, data)
    return data


class team(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.path = None

    def clone_repo(self):
        self.path = j.clients.git.getContentPathFromURLorPath(REPO, pull=True)

    def list_members(self, image_path, projects, contribution_types):
        """
        ```in
            image_path = (S)
            projects = (LI)
            contribution_types = (LI)
        ```
        """
        if not self.path:
            self.clone_repo()

        data = get_data(self.path, projects=projects, contribution_types=contribution_types)
        return j.data.serializers.json.dumps(data)
