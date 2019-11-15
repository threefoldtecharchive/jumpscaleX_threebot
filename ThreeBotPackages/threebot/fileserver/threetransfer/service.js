export default ({
    uploadFile (file) {
        console.log(`In service`, file)
        return axios.post(`${window.config.jsApiUrl}/threetransfer/upload`, 
        file,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
    },
})