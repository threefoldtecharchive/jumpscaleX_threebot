from Jumpscale import j


class myjobs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.job_model = j.data.bcdb.myjobs.model_get(url="jumpscale.myjobs.job")
        self.action_model = j.data.bcdb.myjobs.model_get(url="jumpscale.myjobs.action")
        self.worker_model = j.data.bcdb.myjobs.model_get(url="jumpscale.myjobs.worker")

    def list_workers(self):
        def transform_worker(worker_obj):
            states_dict = dict(zip(range(5), "NEW,ERROR,BUSY,WAITING,HALTED".split(",")))
            worker_types_dict = dict(zip(range(3), "tmux,subprocess,inprocess".split(",")))
            worker_dict = worker_obj._ddict
            try:
                worker_dict["state"] = states_dict[worker_dict["state"]]
                worker_dict["type"] = worker_types_dict[worker_dict["type"]]
            except Exception as e:
                print(e)
            return worker_dict

        workers = j.data.serializers.json.dumps(
            {"workers": [transform_worker(worker) for worker in self.worker_model.find()]}
        )
        print("returning workers  ", workers)
        return workers

    def list_jobs(self):
        return j.data.serializers.json.dumps([job._ddict_hr for job in self.job_model.find()])
