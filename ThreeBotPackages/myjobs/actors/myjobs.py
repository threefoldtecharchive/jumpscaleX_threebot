from Jumpscale import j


class myjobs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.job_model = j.servers.myjobs.model_job
        self.action_model = j.servers.myjobs.model_action
        self.worker_model = j.data.bcdb.myjobs.model_get(url="jumpscale.myjobs.worker")

    def list_workers(self):
        return WORKERS

    def list_action(self):
        return []

    def list_jobs(self):
        def transform_job(job_obj):
            states_dict = dict(zip(range(5), "NEW,ERROR,OK,RUNNING,HALTED".split(",")))
            job_dict = job_obj._ddict
            job_dict["state"] = states_dict[job_dict["state"]]
            job_dict["args"] = str(job_dict["args"])
            job_dict["kwargs"] = str(job_dict["kwargs"])
            job_dict["result"] = str(job_dict["result"])
            job_dict["error"] = str(job_dict["error"])
            try:
                job_dict["action_id"] = self.action_model.get(
                    job_dict["action_id"]
                ).methodname
            except:
                pass
            return job_dict

        print("called...  will return ", JOBS)
        jobs = j.data.serializers.json.dumps(
            {"jobs": [transform_job(job) for job in self.job_model.find()]}
        )
        print("returning jobs  ", jobs)
        return jobs
        # return JOBS
