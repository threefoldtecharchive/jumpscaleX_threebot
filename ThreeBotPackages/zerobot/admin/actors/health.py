from Jumpscale import j
import psutil


class health(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.gedis_client = j.clients.gedis.get("health_actor", package_name="zerobot.webinterface")

    @j.baseclasses.actor_method
    def network_info(self, schema_out=None, user_session=None):
        container_ip = j.sal.nettools.getIpAddress()
        return container_ip

    @j.baseclasses.actor_method
    def bcdb_health(self, schema_out=None, user_session=None):
        state = True
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
            self._log_info("TEST OK")
        except Exception as e:
            self._log_error(f"error happend: {e}")
            state = False
        return state

    @j.baseclasses.actor_method
    def get_running_processes(self, schema_out=None, user_session=None):
        """
        Get list of running process sorted by Memory Usage
        """
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

        return processes_list

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
        ports = j.sal.nettools.getRunningPorts()
        return ports

    @j.baseclasses.actor_method
    def jsx_version(self, schema_out=None, user_session=None):
        """
        :return: string threebotname
        """
        version = j.clients.git.get(basedir="/sandbox/code/github/threefoldtech/jumpscaleX_core").describe()
        return version
