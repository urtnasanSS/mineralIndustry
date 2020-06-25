<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">
      Файл хуулах
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload
        class="editor-slide-upload"
        :action="uploadUrl"
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
      >
        <el-button size="small" type="primary">Хуулах</el-button>
      </el-upload>
      <el-button size="mini" type="primary" @click="handleSubmit" style="margin-top:10px;">Тийм</el-button>
      <el-button size="mini" @click="dialogVisible = false" style="margin-top:10px;">Буцах</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadUrl: process.env.baseUrl + 'file/upload',
      baseUrl: process.env.baseUrl
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      )
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to upload successfully or there is a network problem. Please refresh the page and upload again！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      if (response.result && response.result === 'success') {
        const uid = file.uid
        this.listObj[uid] = {}
        this.listObj[uid].url = this.baseUrl + '/' + response.filename
        this.listObj[uid].hasSuccess = true
        // const objKeyArr = Object.keys(this.listObj)
        // for (let i = 0, len = objKeyArr.length; i < len; i++) {
        //   if (this.listObj[objKeyArr[i]].uid === uid) {
        //     this.listObj[objKeyArr[i]].url = this.baseUrl + '/' + response.filename
        //     this.listObj[objKeyArr[i]].hasSuccess = true
        //     return
        //   }
        // }
      }
    },
    handleRemove(file) {
      // console.log('file', file)
      delete this.listObj[file.uid]
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     delete this.listObj[objKeyArr[i]]
      //     return
      //   }
      // }
    } // ,
    // beforeUpload(file) {
    //   const _self = this
    //   const _URL = window.URL || window.webkitURL
    //   const fileName = file.uid
    //   this.listObj[fileName] = {}
    //   return new Promise((resolve, reject) => {
    //     const img = new Image()
    //     img.src = _URL.createObjectURL(file)
    //     img.onload = function() {
    //       _self.listObj[fileName] = {
    //         hasSuccess: false,
    //         uid: file.uid,
    //         width: this.width,
    //         height: this.height
    //       }
    //     }
    //     resolve(true)
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
