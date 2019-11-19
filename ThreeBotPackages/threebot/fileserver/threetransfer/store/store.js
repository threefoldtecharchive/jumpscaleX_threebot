import threetransferService from '../service.js'

export default ({
    state : {
        uploadMessages: [],
        uploaded: false
    },
    actions: {
        uploadfile: (context, file) => {
            threetransferService.uploadFile(file).then(response => {
                console.log(`file succesfully uploaded`)
            }).catch(error => {
                context.commit('addMessage', 'add')
                console.log(`Request failed: `, error)
                alert("Whoops something went wrong ...")
            })
        },
        generateLink: (context, url) => {
            console.log("in gen link")
            threetransferService.generateLink(url).then(response => {
                console.log(`gen link`, response)
            }).catch(error => {
                console.log(`Request failed: `, error)
                alert("Whoops something went wrong ...")
            })
        },
        downloadfile: (context, identifier) => {
            threetransferService.downloadFile(identifier).then(response => {
                console.log(response)

                let blob = new Blob([response.data])
                console.log(`blob`,blob)
                url = window.URL.createObjectURL(blob)
                console.log(`hello?`)
                console.log(`url`,url)


                var a = document.createElement("a");
                a.href = response.data;
                a.setAttribute("download", identifier);
                a.click();
                console.log(a)
            })
        }
    },
    mutations: {
        addMessage: (state, message) => { state.uploadMessages.push(message) },
        clearMessages: (state) => { state.farms = [] }
    },
    getters: {
        uploadMessages: (state) => state.uploadMessages
    }
})