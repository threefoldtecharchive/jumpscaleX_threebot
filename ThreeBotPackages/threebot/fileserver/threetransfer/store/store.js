import threetransferService from '../service.js'

export default ({
    state : {
        uploadMessages: [],
        uploaded: false
    },
    actions: {
        uploadfile: (context, file) => {
            context.commit('addMessage', {message: 'Uploading file', color:'green'})
            threetransferService.uploadFile(file).then(response => {
                context.commit('addMessage', {message: 'File has been succesfully uploaded', color:'green'})
                context.dispatch('generateLink',file.name)
            }).catch(error => {
                context.commit('addMessage', {message: 'An error occured during the uploading of the file', color:'red'})
                console.log(`Request failed: `, error)
            })
        },
        generateLink: (context, url) => {
            context.commit('addMessage', {message: 'Generating link', color:'green'})
            threetransferService.generateLink(url).then(response => {
                let message = `The file is available for download on the following url: ${window.location.origin}fileserver/threetransfer/#/download/${response.data.identifier}`
                context.commit('addMessage', {message: message, color:'green'})
            }).catch(error => {
                context.commit('addMessage', {message: 'Link generation failed', color:'red'})
                console.log(error)
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
        },
        clearMessages: (context) => {
            context.commit('clearMessages')
        } 
    },
    mutations: {
        addMessage: (state, message) => { state.uploadMessages.push(message) },
        clearMessages: (state) => { state.uploadMessages = [] }
    },
    getters: {
        uploadMessages: (state) => state.uploadMessages
    }
})