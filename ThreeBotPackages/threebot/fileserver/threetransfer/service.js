export default ({
    uploadFile (file) {
        console.log(`In service`, file)
        return axios.post(`${window.config.fileTransferApiUrl}/fileserver/api/threetransfer/${file.name}`, 
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
    },
})