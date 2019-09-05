from Jumpscale import j

'''


schema_job = """
@url = jumpscale.myjobs.job
category*= ""
time_start = 0 (T)
time_stop = 0 (T)
state* = "NEW,ERROR,OK,RUNNING,HALTED" (E)
timeout = 0
action_id* = 0
args = (json)
kwargs = (dict)
result = (S)
error = (dict)
return_queues = (LS)
#will not execute this one before others done
dependencies = (LI)


"""

schema_action = """
@url = jumpscale.myjobs.action
actorname = ""
methodname = ""
key* = ""  #hash
code = ""

"""
'''



WORKERS = """
{
"workers": [
{
"timeout": "3,600",
"time_start": "2019/08/21 15:57:51",
"last_update": "2019/08/21 16:10:03",
"current_job": "-",
"error": "",
"state": "NEW",
"pid": "0",
"halt": false,
"id": 1
},
{
"timeout": "3,600",
"time_start": "2019/08/21 15:57:54",
"last_update": "2019/08/21 15:57:54",
"current_job": "-",
"error": "",
"state": "new",
"pid": "0",
"halt": false,
"id": 2
},
{
"timeout": "3,600",
"time_start": "2019/08/21 15:57:56",
"last_update": "2019/08/21 16:03:42",
"current_job": "-",
"error": "",
"state": "NEW",
"pid": "0",
"halt": false,
"id": 3
}
]
}
"""


JOBS = """
{
"jobs": [
{
"category": "",
"time_start": "2019/08/21 16:01:41",
"time_stop": "2019/08/21 16:01:41",
"state": "OK",
"timeout": "0",
"action_id": "4",
"args": [1,2],
"kwargs": "{}",
"result": "3",
"error": "{}",
"return_queues": [],
"id": 5
},
{
"category": "",
"time_start": "2019/08/21 16:03:42",
"time_stop": "2019/08/21 16:05:22",
"state": "OK",
"timeout": "0",
"action_id": "6",
"args": [1,2],
"kwargs": "{}",
"result": "3",
"error": "{}",
"return_queues": [],
"id": 7
},
{
"category": "",
"time_start": "2019/08/21 16:10:03",
"time_stop": "2019/08/21 16:11:43",
"state": "OK",
"timeout": "0",
"action_id": "6",
"args": [1,2],
"kwargs": "{}",
"result": "3",
"error": "{}",
"return_queues": [],
"id": 8
}
]
}
"""


class myjobs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.job_model = j.servers.myjobs.model_job
        self.action_model = j.servers.myjobs.model_action
        self.worker_model = j.data.bcdb.myjobs.model_get(url="jumpscale.myjobs.worker")                                       

    # def list_workers(self, schema_out):
    #     """
    #     ```in
    #     ```

    #     ```out
    #     workers = (LO) !jumpscale.myjobs.worker
    #     ```
    #     """
    #     out = schema_out.new()
    #     out.workers = list(self.worker_model.iterate())
    #     return out

    # def list_jobs(self, schema_out):
    #     """
    #     ```in
    #     ```

    #     ```out
    #     jobs = (LO) !jumpscale.myjobs.job
    #     ```
    #     """
    #     out = schema_out.new()
    #     out.jobs = list(self.job_model.iterate())
    #     return out

    # def list_actions(self, schema_out):
    #     """
    #     ```in
    #     ```

    #     ```out
    #     actions = (LO) !jumpscale.myjobs.action
    #     ```
    #     """
    #     out = schema_out.new()
    #     out.actions = list(self.action_model.iterate())
    #     return out

    def list_workers(self):
        print("called...  will return ", WORKERS)
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
                job_dict["action_id"] = self.action_model.get(job_dict["action_id"]).methodname
            except:
                pass
            return job_dict

        print("called...  will return ", JOBS)
        jobs = j.data.serializers.json.dumps({"jobs": [transform_job(job) for job in self.job_model.find()]})
        print("returning jobs  ", jobs)
        return jobs
        # return JOBS
