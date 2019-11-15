import threetransferService from '../service.js'

export default ({
    state : {

    },
    actions: {
        uploadfile: (context, file) => {
            threetransferService.uploadFile(file).then(response => {
                console.log(`file succesfully uploaded`)
            })
        }
    },
    mutations: {

    },
    getters: {
    }
})