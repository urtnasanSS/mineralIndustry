<template>
  <div>
    <el-drawer
      :title="textMap[dialogStatus]"
      :before-close="handleClose"
      :visible.sync="dialogFormVisible"
    >
      <div class="drawer__content">
        <el-form
          ref="dataForm"
          :rules="dialogStatus == 'view' ? null : rules"
          :model="temp"
          label-position="left"
          label-width="150px"
        >
          <el-form-item :label="'Нэр'" prop="name">
            <label v-if="dialogStatus == 'view'">{{ temp.name }}</label>
            <el-input v-else v-model="temp.name" size="mini" />
          </el-form-item>
          <el-form-item :label="'Нэр /Англи/'" prop="nameEn">
            <label v-if="dialogStatus == 'view'">{{ temp.nameEn }}</label>
            <el-input v-else v-model="temp.nameEn" size="mini" />
          </el-form-item>
          <el-form-item :label="'Холбоос'" prop="link">
            <label v-if="dialogStatus == 'view'">{{ temp.link }}</label>
            <el-input v-else v-model="temp.link" size="mini" />
          </el-form-item>
          <el-form-item label="Зураг сонгох" prop="image">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemoveImage"
              :file-list="temp.files.filter(c=> c.isDelete === false)"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleImage" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div class="drawer__footer">
        <el-button
          v-if="isPermitted"
          style="margin-left: 5px;"
          type="primary"
          @click="saveData('saveAndClose')"
        >
          {{ "Хадгалах" }}
        </el-button>
        <el-button style="margin-left: 5px;" @click="handleClose">
          <i class="fa fa-sign-out" />
          {{ "Хаах" }}
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import LinksServices from '../../frontend/services/LinksServices'
import { isNull, removeAtts, isEqualsData } from '@/utils/Helper'
export default {
  name: '',
  props: {
    temp: {
      type: Object,
      default: () => ({})
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    dialogStatus: {
      type: String,
      default: ''
    },
    routerActions: {
      type: Array,
      default: () => ([])
    },
    isPermitted: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        nameEn: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        link: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ]
      },
      dialogVisibleImage: false,
      drawerLoading: false,
      textMap: {
        update: 'Засварлах',
        create: 'Бүртгэх',
        view: 'Харах'
      },
      dialogImageUrl: '',
      uploadUrl: process.env.baseUrl + 'file/upload', // process.env.BASE_API + '/upload/',
      fileUrl: process.env.baseUrl,
      menuList: [],
      categoryList: [],
      fileListAudio: []
    }
  },
  computed: {
    dialogVisible () {
      if (this.dialogFormVisible) {
      }
      return this.dialogFormVisible
    }
  },
  watch: {
    'temp.haveUploadVideo' (newVal, oldVal) {
      // console.log(newVal, 'newVal newVal')
    },
    dialogVisible (newVal, oldVal) {
    }
  },
  created () {
    this.refDatas()
  },
  destroyed () {},
  methods: {
    async refDatas () {
      this.menuList = (await LinksServices.index()).data
      this.categoryList = (await LinksServices.index()).data
    },
    handleClose (done) {
      // console.log("handleClosehandleClose ");
      if (this.temp.isChanged && !isEqualsData(this.temp, this.tempBefore)) {
        this.$confirm('Хаах', 'Хаах эсэх', {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Үгүй',
          type: 'warning',
          roundButton: true,
          closeOnPressEscape: false,
          closeOnClickModal: false,
          showClose: false
        })
          .then((_) => {
            delete this.temp.isChanged
            this.$emit('update-dialog-visible', false)
            // this.dialogFormVisible = false;
            done()
          })
          .catch((_) => {
            // this.dialogFormVisible = false
          })
      } else {
        this.$emit('update-dialog-visible', false)
        // this.dialogFormVisible = false;
      }
    },
    saveData (val) {
      this.buttonStatus = val
      if (isNull(this.temp.id) && this.dialogStatus === 'create') {
        this.createData()
      } else {
        this.updateData()
      }
    },
    createData () {
      this.drawerLoading = true
      removeAtts(this.temp)
      LinksServices.post(this.temp)
        .then((response) => {
          this.$emit('create-list', response)
          this.saveSuccess()
          this.$notify({
            title: 'Амжилттай хадгалагдлаа',
            message: 'Хадгалах',
            type: 'success',
            duration: 2000
          })
          this.drawerLoading = false
        })
        .catch((error) => {
          this.drawerLoading = false
          this.$message({
            type: 'warning',
            message: 'Алдаа гарлаа'
          })
          return this.$message({
            type: 'warning',
            message: error.response.data.error
          })
        })
      // }
    },
    updateData () {
      // if (this.validateDataForm()) {
      this.drawerLoading = true
      removeAtts(this.temp)
      LinksServices.put(this.temp)
        .then((response) => {
          this.$emit('update-list', response)
          this.saveSuccess()
          this.$notify({
            title: 'Амжилттай засварлагдлаа',
            message: 'Хадгалах',
            type: 'success',
            duration: 2000
          })
          this.drawerLoading = false
        })
        .catch((error) => {
          this.drawerLoading = false
          this.$message({
            type: 'warning',
            message: 'Хадгалагдлаа'
          })
          return this.$message({
            type: 'warning',
            message: error.response.data.error
          }) // ЭСВЭЛ АЛДАА ГАРВАЛ BACKEND-С ИРЖ БАЙГАА АЛДААНЫ МЕССЕЖИЙГ ХЭРЭГЛЭГЧИД ХАРУУЛАХ
        })
      // }
    },
    handleRemoveImage (file, fileList) {
      for (const v of this.temp.files) {
        if (v.storageName === file.storageName) {
          v.isDelete = true
          break
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImage = true
    },
    handleSuccess (response, file, fileList) {
      this.temp.files.push({
        id: null,
        name: file.name,
        fileType: file.raw.type,
        size: file.raw.size,
        response: file,
        url: this.fileUrl + response.filename,
        isDelete: false,
        storageName: response.filename
      })
    },
    beforeUpload (file) {
      const isPicture =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      if (!isPicture) {
        this.$message.error('Зөвхөн зураг хуулна уу')
      }
      return isPicture
    },
    handleExceedAudio (files, fileList) {
      this.$message.warning(
        // `The limit is 3, you selected ${
        //   files.length
        // } files this time, add up to ${files.length + fileList.length} totally`
        `Зөвхөн 1 файл хуулах боломжтой`
      )
    },
    beforeRemoveAudio (file, fileList) {
      // console.log(fileList, 'fileListv fileList')
      // return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    async saveSuccess () {
      await this.$emit('push-temp', this.temp)
      switch (this.buttonStatus) {
        case 'save':
          this.dialogStatus = 'update'
          break
        case 'saveAndView':
          this.dialogStatus = 'view'
          break
        case 'saveAndNew':
          this.resetTemp()
          this.dialogStatus = 'create'
          break
        case 'saveAndClose':
          this.$emit('update-dialog-visible', false)
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" >
.contentDrawer {
  padding: 20px;
  height: 100%;
  .upload-demos{
    .el-upload-list{
      display: none;
    }
  }
  .audioPlayer{
    // background-color: red;
    height: 30px;
    width: 100%;
    margin-top: 10px;
  }
  .youtubeIframe{
    text-align: center;
    margin-top: 20px;
    height:300px;
    iframe{
      height: 100%;
    }
  }
  .videoPlayer{
    text-align: center;
  }
}
</style>
