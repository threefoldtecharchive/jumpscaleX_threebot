from Jumpscale import j

WORKER_STATES = dict(zip(range(5), ["NEW", "ERROR", "BUSY", "WAITING", "HALTED"]))
WORKER_TYPES = dict(zip(range(3), ["tmux", "subprocess", "inprocess"]))
JOB_STATES = dict(zip(range(5), ["NEW", "ERROR", "OK", "RUNNING", "DONE"]))


class myjobs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.job_model = j.servers.myjobs.jobs._model
        self.action_model = j.servers.myjobs.model_action
        self.worker_model = j.servers.myjobs.workers._model
        self.client = j.clients.logger.get("logs_actor")

    def with_formatted_traceback(self, job):
        """return a dict with formatted traceback for any given job

        :param job: job object
        :return: dict with job info
        :rtype: dict
        """
        if not job['traceback']:
            return job

        job["formatted"] = j.core.tools.traceback_format(job['traceback'])
        return job

    @j.baseclasses.actor_method
    def list_workers(self, schema_out=None, user_session=None):
        def transform_worker(worker_obj):
            # worker_obj._ddict_hr  gets values converted to strings and also convert timestamps too!
            # {'name': 'w1', 'timeout': '3,600', 'time_start': '', 'last_update': '2019/10/17 13:11:44', 'current_job': '-', 'error': '', 'state': 'WAITING', 'pid': '5,682', 'halt': False, 'type': 'TMUX', 'debug': False, 'nr': '1', 'id': 1}
            # worker_obj._ddict return valid data, but the enum as int not string
            # {'name': 'w1', 'timeout': 3600, 'time_start': 0, 'last_update': 1571317904, 'current_job': 2147483647, 'error': '', 'state': 3, 'pid': 5682, 'halt': False, 'type': 0, 'debug': False, 'nr': 1, 'id': 1}
            # so we just trasform this enum into a string value
            worker_dict = worker_obj._ddict
            try:
                worker_dict["state"] = WORKER_STATES[worker_dict["state"]]
                worker_dict["type"] = WORKER_TYPES[worker_dict["type"]]
            except Exception as e:
                print(e)
            return worker_dict

        return j.data.serializers.json.dumps([transform_worker(worker) for worker in self.worker_model.find()])

    @j.baseclasses.actor_method
    def list_jobs(self, schema_out=None, user_session=None):
        def transform_job(job_obj):
            job_dict = job_obj._ddict
            try:
                job_dict["state"] = JOB_STATES[job_dict["state"]]
                job_dict["args"] = str(job_dict.get("args", ""))
                job_dict["kwargs"] = str(job_dict["kwargs"])
                job_dict["result"] = str(job_dict["result"])
                job_dict["error"] = self.with_formatted_traceback(job_dict["error"])
                if job_dict["error"]["processid"]:
                    job_dict['logs'] = self.client.find(processid=job_dict["error"]["processid"])
            except Exception as e:
                print(e)
            try:
                job_dict["action_id"] = self.action_model.get(job_dict["action_id"]).methodname
            except Exception as e:
                print(e)
            return job_dict

        return j.data.serializers.json.dumps([transform_job(job) for job in self.job_model.find()])
        # return JOBS
