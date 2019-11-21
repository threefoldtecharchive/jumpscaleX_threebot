import threetransferService from '../service.js'

export default ({
    state : {
        uploadMessages: [],
        downloadError: "abc"

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
                let message = `The file is available for download on the following url: ${window.location.origin}/fileserver/threetransfer/#/download/${response.data.identifier}`
                context.commit('addMessage', {message: message, color:'green'})
            }).catch(error => {
                context.commit('addMessage', {message: 'Link generation failed', color:'red'})
                console.log(error)
            })
        },
        downloadfile: (context, identifier) => {
            console.log(`downloadfile`, identifier)
            threetransferService.downloadFile(identifier).then(response => {
                console.log(response)
                const a = document.createElement("a");
                a.style.display = "none";
                document.body.appendChild(a);
                
                // Set the HREF to a Blob representation of the data to be downloaded
                a.href = window.URL.createObjectURL(
                    new Blob([response.data]/*, {type: response.data.type}*/)
                );
                
                // Use download attribute to set set desired file name
                
                a.setAttribute("download", response.headers.filename);
                
                // Trigger the download by simulating click
                a.click();
                
                // Cleanup
                window.URL.revokeObjectURL(a.href);
                document.body.removeChild(a);
                

            }).catch(error => {
                console.log(error)
                // context.commit('setDownloadError', 'Downloading failed')
            })
        },
        clearMessages: (context) => {
            context.commit('clearMessages')
        } 
    },
    mutations: {
        addMessage: (state, message) => { state.uploadMessages.push(message) },
        clearMessages: (state) => { state.uploadMessages = [] },
        setDownloadError: (state, message) => {state.downloadError = message}
    },
    getters: {
        uploadMessages: (state) => state.uploadMessages,
        downloadError: (state) => state.downloadError
    }
})