import caldav
from Jumpscale import j


class radicale(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.base_url = "http://{}:{}@127.0.0.1:8851"
        self.client = None
        pass

    def login(self, username, password):
        url = self.base_url.format(username, password)
        client = caldav.DAVClient(url)
        self.client = client.principal()

    def _verify_client(self):
        if not self.client:
            raise j.exceptions.Runtime("Use login method to enable the actor")

    def add_calender(self, name, cal_id=None):
        self._verify_client()
        calender = self.client.make_calendar(name, cal_id)
        return j.sal.fs.getBaseName(calender.canonical_url)

    def delete_calender(self, cal_id):
        self._verify_client()
        for calender in self.client.calendars():
            if j.sal.fs.getBaseName(calender.canonical_url) == cal_id:
                calender.delete()
                break

    def add_event(self, username, title, content):
        """
        ```in
        name = (S)
        do_token = (S)
        do_project_name = (S)
        ssh_key = (S)
        ```
        This actor method is used to add event (only used to add invitation)
        """
        user_path = f"/var/lib/radicale/collections/collection-root/{username}"
        calendars = j.sal.bcdbfs.list_files_and_dirs(user_path)
        if calendars:
            calendar = calendars[0]
            j.sal.bcdbfs.write_file(f"{calendar}/{title}", content)
