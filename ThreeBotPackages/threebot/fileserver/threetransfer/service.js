export default ({
    uploadFile (file) {
        return axios.post(`${window.config.fileTransferApiUrl}/fileserver/api/threetransferr/${file.name}`, 
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
    },
    generateLink (url) {
        return axios.post(`${window.config.jsApiUrl}/threetransfer/link`, {
            args: {
                shortlink:{
                    url
                }
            }
        })
    },
    downloadFile (identifier) {
        return axios.get(`${window.config.fileTransferApiUrl}/fileserver/api/threetransferdownload/${identifier}`)
    },
})