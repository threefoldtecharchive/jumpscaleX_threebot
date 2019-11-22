module.exports = {
  name: 'threetransfer',
  components: {
  },
  props: [],
  data () {
    return {
      file: '',
      downloadUUID: '',
      generatedUUID: '',
      uploadedFiles: [],
      snackbar: false,
      copyMessage: ''
    }
  },
  computed: {
    ...window.vuex.mapGetters([
      'uploadMessages',
      'uploadMessage',
      'uploading'
    ]),
    showUploadButton () {
      if (this.file === '' || this.uploadMessage.code === 'UPLOADING'){
        return false
      }
      return true
    }
  },
  mounted () {
    var self = this;
      window.addEventListener("dragenter", function (e) {
              document.querySelector("#dropzone").style.visibility = "";
              document.querySelector("#dropzone").style.opacity = 1;
              document.querySelector("#textnode").style.fontSize = "48px";
      });

      window.addEventListener("dragleave", function (e) {
          e.preventDefault();

              document.querySelector("#dropzone").style.visibility = "hidden";
              document.querySelector("#dropzone").style.opacity = 0;
              document.querySelector("#textnode").style.fontSize = "42px";
          
      });

      window.addEventListener("dragover", function (e) {
          e.preventDefault();
          document.querySelector("#dropzone").style.visibility = "";
          document.querySelector("#dropzone").style.opacity = 1;
          document.querySelector("#textnode").style.fontSize = "48px";
      });

      window.addEventListener("drop", function (e) {
          e.preventDefault();
          document.querySelector("#dropzone").style.visibility = "hidden";
          document.querySelector("#dropzone").style.opacity = 0;
          document.querySelector("#textnode").style.fontSize = "42px";
          
        var files = e.dataTransfer.files;
        console.log("Drop files:", files);
        console.log(files.length)
        
        if (files.length === 0 || files.length > 1){
          alert("Please drop only 1 file")
        }else {
          self.setUploadFile(files[0]);
        }
        });
  },
  methods: {
    ...window.vuex.mapActions([
      'uploadfile',
      'downloadfile',
      'clearMessages',
      'setUploading'
    ]),
    handleFileUpload () {
      this.clearMessages()
      this.file = this.$refs.file.files[0];
    },
    submitFile () {
      this.uploadfile(this.file); 
      this.file = '' 
    },
    cancelUploading () {
      this.uploadfile(""); 
      this.setUploading(false)
    },   
    downloadFile () {      
      this.downloadfile(this.downloadUUID)
    },
    setUploadFile (file){
      console.log('insetuploadfile', file)
      this.file = file
    },
    onCopy: function (e) {
      this.copyMessage = 'Url has been copied to your clipboard'
    },
    onError: function (e) {
      this.copyMessage = 'Something went wrong while copying'
    }
    /*uploadFiles: function(f) {
      var self = this;

      function loadFiles(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
          
          var content = e.target.result;
          var data = d3.csvParse(content, function(d) {
            return {
              x: +d["# X "],
              y: +d[" Y "],
              error: +d[" E "],
              dx: +d[" DX"],
              name: name
            };
          });

          //console.log("data = ", data);
          data = data.splice(1, data.length);

          self.uploadedFiles.unshift({
            data: data,
            fileName: name
          });
          
          var results = JSON.stringify(data[0]);
          d3.select("#results").html("First data point:<br> " + results);
        };
        reader.readAsText(file, "UTF-8");
      }

      for (var i = 0; i < f.length; i++) {
          if (this.uploadedFiles.length > 0) {
            if (
              !this.checkDuplicateFile(
                f[i].name.substr(0, f[i].name.lastIndexOf(".txt"))
              )
            ) {
              loadFiles(f[i]);
            }
          } else {
            loadFiles(f[i]);
          }
      }
    },
    checkDuplicateFile: function(filename) {
      if (this.uploadedFiles.find(el => el.fileName === filename)) {
        alert("Duplicate file: " + filename);
        return true;
      } else {
        return false;
      }
    }*/
  }
}
