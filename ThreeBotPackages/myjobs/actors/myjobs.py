from Jumpscale import j


class myjobs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.jobs = j.servers.myjobs.jobs
        self.workers = j.servers.myjobs.workers
        self.action_model = j.servers.myjobs.model_action

    def list_workers(self):
        def transform_worker(worker_obj):
            states_dict = dict(zip(range(5), "NEW,ERROR,BUSY,WAITING,HALTED".split(",")))
            worker_types_dict = dict(zip(range(3), "tmux,subprocess,inprocess".split(",")))
            worker_dict = worker_obj._data._ddict
            try:
                worker_dict["state"] = states_dict[worker_dict["state"]]
                worker_dict["type"] = worker_types_dict[worker_dict["type"]]
            except Exception as e:
                print(e)
            return worker_dict

        workers = j.data.serializers.json.dumps(
            {"workers": [transform_worker(worker) for worker in self.workers.find()]}
        )
        print("returning workers  ", workers)
        return workers

    def list_jobs(self, schema_out):
        """
        ```out
        jobs = (LO) !jumpscale.myjobs.job
        ```
        """

        out = schema_out.new()
        out.jobs = self.jobs.find()
        return out
