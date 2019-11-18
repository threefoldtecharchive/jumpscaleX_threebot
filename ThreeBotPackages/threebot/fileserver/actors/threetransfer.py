from Jumpscale import j
import uuid
import re

class threetransfer(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        bcdb = j.data.bcdb.get("threetransfer")
        self.shortlink_model = bcdb.model_get(url="threetransfer.shortlink.1")

    def _check_file_exists(self, path, version=4):
        if not j.sal.fs.isFile(path):
            raise j.exceptions.Value("There is no file on the given path: %s" % path)

    def _get_uuid(self, uuid_to_test):
        return uuid.UUID(uuid_to_test)

    def _check_uuid_exists(self, uuid_to_test):
        if  self.shortlink_model.count(identifier=uuid_to_test) != 0:
            return True
        return False



    # @j.baseclasses.actor_method
    def link(self, shortlink, schema_out=None, user_session=None):
        """
        ```in
        shortlink = (O) !threetransfer.shortlink.1
        ```

        ```out
        shortlink = (O) !threetransfer.shortlink.1
        ```
        """

        if not re.search("^http",shortlink.url):
            self._check_file_exists(shortlink.url)
        
        if shortlink.identifier:
            shortlink.identifier = self._get_uuid(shortlink.identifier)
        else:
            shortlink.identifier = uuid.uuid4()

        if self._check_uuid_exists(shortlink.identifier):
            raise j.exceptions.Value("The identifier %s is already in use" % shortlink.identifier)

        shortlink = self.shortlink_model.new(shortlink).save()

        return shortlink

    def get(self, identifier, schema_out=None, user_session=None):
        """
        ```in
        identifier = ""
        ```

        ```out
        file = (O) !threetransfer.shortlink.1
        ```
        """
        
        if not self._check_uuid_exists(identifier):
            raise j.exceptions.Value("The identifier %s does not exist" % identifier)
        
        file = self.shortlink_model.find(identifier=identifier)
        import ipdb; ipdb.set_trace()
        out = schema_out.new()
        out.file = file
        return out

