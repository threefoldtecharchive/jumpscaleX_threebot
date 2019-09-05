// export default
//     {

//         "workers": [
//             {
//                 "timeout": "3,600",
//                 "time_start": "2019/08/21 15:57:51",
//                 "last_update": "2019/08/21 16:10:03",
//                 "current_job": "-",
//                 "error": "",
//                 "state": "NEW",
//                 "pid": "0",
//                 "halt": false,
//                 "id": 1
//             },
//             {
//                 "timeout": "3,600",
//                 "time_start": "2019/08/21 15:57:54",
//                 "last_update": "2019/08/21 15:57:54",
//                 "current_job": "-",
//                 "error": "something wrong",
//                 "state": "error",
//                 "pid": "0",
//                 "halt": false,
//                 "id": 2
//             },
//             {
//                 "timeout": "3,600",
//                 "time_start": "2019/08/21 15:57:56",
//                 "last_update": "2019/08/21 16:03:42",
//                 "current_job": "-",
//                 "error": "",
//                 "state": "NEW",
//                 "pid": "0",
//                 "halt": false,
//                 "id": 3
//             }],
//         "jobs": [
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:01:41",
//                 "time_stop": "2019/08/21 16:01:41",
//                 "state": "ok",
//                 "timeout": "0",
//                 "action_id": "4",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 5
//             },
//             {
//                 "category": "test category",
//                 "time_start": "2019/08/21 16:03:42",
//                 "time_stop": "2019/08/21 16:05:22",
//                 "state": "error",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{error test}",
//                 "return_queues": ["test1", "test2"],
//                 "id": 7
//             },
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:10:03",
//                 "time_stop": "2019/08/21 16:11:43",
//                 "state": "ok",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 8
//             },
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:10:03",
//                 "time_stop": "2019/08/21 16:11:43",
//                 "state": "ok",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 8
//             },
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:10:03",
//                 "time_stop": "2019/08/21 16:11:43",
//                 "state": "halted",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 8
//             },
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:10:03",
//                 "time_stop": "2019/08/21 16:11:43",
//                 "state": "running",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 8
//             },
//             {
//                 "category": "",
//                 "time_start": "2019/08/21 16:10:03",
//                 "time_stop": "2019/08/21 16:11:43",
//                 "state": "new",
//                 "timeout": "0",
//                 "action_id": "6",
//                 "args": "[\n1,\n2\n]",
//                 "kwargs": "{}",
//                 "result": "3",
//                 "error": "{}",
//                 "return_queues": [],
//                 "id": 8
//             }
//         ]

//     }

function getWorkers() {
    // return GEDIS_CLIENT.execute(info = { "namespace": "default", "actor": "myjobs", "command": "list_jobs" })
    return new Promise((resolve, reject) => {
        const workers = [
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
                "error": "something wrong",
                "state": "error",
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
            }]

        setTimeout(function () {
            resolve(workers); // Yay! Everything went well!
        }, 5000);
    })

}



function getJobs() {
    // return GEDIS_CLIENT.execute(info = { "namespace": "default", "actor": "myjobs", "command": "list_workers" })
    return new Promise((resolve, reject) => {

        var jobs = [
            {
                "category": "",
                "time_start": "2019/08/21 16:01:41",
                "time_stop": "2019/08/21 16:01:41",
                "state": "error",
                "timeout": "0",
                "action_id": "4",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 5
            },
            {
                "category": "test category",
                "time_start": "2019/08/21 16:03:42",
                "time_stop": "2019/08/21 16:05:22",
                "state": "error",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{error test}",
                "return_queues": ["test1", "test2"],
                "id": 7
            },
            {
                "category": "",
                "time_start": "2019/08/21 16:10:03",
                "time_stop": "2019/08/21 16:11:43",
                "state": "ok",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 8
            },
            {
                "category": "",
                "time_start": "2019/08/21 16:10:03",
                "time_stop": "2019/08/21 16:11:43",
                "state": "ok",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 8
            },
            {
                "category": "",
                "time_start": "2019/08/21 16:10:03",
                "time_stop": "2019/08/21 16:11:43",
                "state": "halted",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 8
            },
            {
                "category": "",
                "time_start": "2019/08/21 16:10:03",
                "time_stop": "2019/08/21 16:11:43",
                "state": "running",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 8
            },
            {
                "category": "",
                "time_start": "2019/08/21 16:10:03",
                "time_stop": "2019/08/21 16:11:43",
                "state": "new",
                "timeout": "0",
                "action_id": "6",
                "args": "[\n1,\n2\n]",
                "kwargs": "{}",
                "result": "3",
                "error": "{}",
                "return_queues": [],
                "id": 8
            }
        ]
        
        setTimeout(function () {
            resolve(jobs); // Yay! Everything went well!
        }, 5000);
    }
    )
}


export { getJobs, getWorkers }