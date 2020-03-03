from Jumpscale import j

import math
import psutil

# Helper function
def Convert(tup):
    ports = []
    for a, b in tup:
        temp = {}
        temp["port_number"] = a
        temp["process"] = b
        ports.append(temp)
    return ports


class health(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.gedis_client = j.clients.gedis.get("health_actor", package_name="zerobot.webinterface")

    @j.baseclasses.actor_method
    def network_info(self, schema_out=None, user_session=None):
        container_ip = j.sal.nettools.getIpAddress()
        return container_ip

    @j.baseclasses.actor_method
    def health(self, schema_out=None, user_session=None):
        data = {}

        # bcdb test
        try:
            bcdb = j.data.bcdb.get("test_health")
            scm = """@url = world.ship
            n = 0 (I)
            sub = (O) !world.ship.window

            @url = world.ship.window
            sn = 1 (I)"""

            model = bcdb.model_get(schema=scm)
            obj = model.new()
            obj.n = 1
            obj.sub.sn = 4
            obj.save()
            assert len(bcdb.get_all()) == 1
            bcdb.reset()
            bcdb.destroy()
            data["bcdb"] = "OK"
            self._log_info("TEST OK")
        except Exception as e:
            self._log_error(f"error happend at bcdb: {e}")
            data["bcdb"] = "Error"

        # wikis are running
        try:
            wikis = j.sal.nettools.checkUrlReachable("http://127.0.0.1/3git/wikis/zerobot.packagemanager/readme.md")
            if wikis:
                data["wikis"] = "OK"
            else:
                data["wikis"] = "Error"
        except Exception as e:
            self._log_error(f"error happend at wikis ping: {e}")
            data["wikis"] = "Error"

        # codeserver is running
        try:
            codeserver = j.sal.nettools.checkUrlReachable("http://127.0.0.1:8080")
            if codeserver:
                data["codeserver"] = "OK"
            else:
                data["codeserver"] = "Error"
        except Exception as e:
            self._log_error(f"error happend at codeserver ping: {e}")
            data["codeserver"] = "Error"

        # Jupyter is running
        try:
            jupyter = j.sal.nettools.checkUrlReachable("http://127.0.0.1/simulator/threefold/show/")
            if jupyter:
                data["jupyter"] = "OK"
            else:
                data["jupyter"] = "Error"
        except Exception as e:
            self._log_error(f"error happend at jupyter ping: {e}")
            data["jupyter"] = "Error"

        return data

    @j.baseclasses.actor_method
    def get_running_processes(self, schema_out=None, user_session=None):
        """
        Get list of running process sorted by Memory Usage
        """
        all_data = {}
        processes_list = []
        # Iterate over the list
        for proc in psutil.process_iter():
            try:
                # Fetch process details as dict
                pinfo = proc.as_dict(attrs=["pid", "name", "username"])
                pinfo["vms"] = proc.memory_info().vms / (1024 * 1024)
                # Append dict to list
                processes_list.append(pinfo)
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
        processes_list = sorted(processes_list, key=lambda procObj: procObj["vms"], reverse=True)
        all_data["processes_list"] = processes_list

        # memory data
        memory_usage = {}
        memory_data = dict(psutil.virtual_memory()._asdict())
        memory_usage["total_mem"] = math.ceil(memory_data.get("total") / (1024 * 1024 * 1024))
        memory_usage["usage_percent"] = memory_data.get("percent")
        all_data["memory_usage"] = memory_usage
        return j.data.serializers.json.dumps(all_data)

    @j.baseclasses.actor_method
    def get_identity(self, schema_out=None, user_session=None):
        """
        :return: string threebotname
        """
        name = self.gedis_client.actors.identity.name().name
        return name

    @j.baseclasses.actor_method
    def get_running_ports(self, schema_out=None, user_session=None):
        """
        :return: string threebotname
        """
        data = []
        ports = j.sal.nettools.getRunningPorts()
        data = Convert(ports)
        return j.data.serializers.json.dumps(data)

    @j.baseclasses.actor_method
    def jsx_version(self, schema_out=None, user_session=None):
        """
        ```out
        res = (dict)
        ```
        :return: string threebotname
        """
        tag, version = j.clients.git.get(basedir="/sandbox/code/github/threefoldtech/jumpscaleX_core").describe(
            showout=False
        )

        return version

    @j.baseclasses.actor_method
    def get_disk_space(self, schema_out=None, user_session=None):
        res = {}
        disk_obj = psutil.disk_usage("/")
        res["total"] = disk_obj.total // (1024.0 ** 3)
        res["used"] = disk_obj.used // (1024.0 ** 3)
        res["free"] = disk_obj.free // (1024.0 ** 3)
        res["percent"] = disk_obj.percent

        return res
