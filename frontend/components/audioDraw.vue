<template>
  <div>
    <el-drawer
      :title="textMap[dialogStatus]"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      size="750px"
    >
      <div v-loading="drawerLoading" class="drawer__content">
        <div class="contentDrawer">
          <el-form ref="dataForm" :rules="dialogStatus == 'view' ? null : mainRules" :model="temp" label-position="left" label-width="150px">
            <el-form-item :label="'Нэр'" prop="name">
              <label v-if="dialogStatus == 'view'">{{ temp.name }}</label>
              <el-input v-else v-model="temp.name" size="mini" style="width:50%" />
            </el-form-item>
            <el-form-item :label="'Төрөл'" prop="code">
              <label v-if="dialogStatus == 'view'">{{ temp.code }}</label>
              <label v-else class="select" size="mini">
                <select v-model="temp.code">
                  <option value="1">Эхлэл</option>
                  <option value="2">Нүүр хуудас</option>
                </select>
              </label>
            </el-form-item>
          </el-form>
          <div class="files">
            <el-form
              ref="filesFormRef"
              :rules="dialogStatus == 'view' ? null : filesRules"
              :model="temp"
              label-position="left"
              label-width="150px"
            >
              <el-form-item :label="'Аудио'" prop="url" style="margin:50px 0px;">
                <el-upload
                  v-if="dialogStatus !== 'view'"
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemoveAudio"
                  :before-upload="beforeUploadAudio"
                  :on-success="handleSuccess"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceedAudio"
                  :file-list="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))"
                >
                  <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
                  <article slot="tip" class="message is-info is-small " style="margin-top:10px;">
                    <div class="message-body " style="padding:5px 5px 5px 10px;">
                      Зөвхөн <strong>mp3, ogg, wav </strong>өргөтгөлтэй аудио хуулна.
                    </div>
                  </article>
                  <el-button size="small" type="primary" icon="el-icon-video-play">
                    Хуулах
                  </el-button>
                </el-upload>
                <audio v-if="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio')).length>0" controls class="audioPlayer">
                  <source :src="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/ogg">
                  <source :src="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/mpeg">
                </audio>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="drawer__footer">
        <el-row style="width:100%;">
          <el-col :span="24" align="right">
            <el-button
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
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import MenuServices from '../../frontend/services/MenuServices'
import CategoryServices from '../../frontend/services/CategoryServices'
import audioTypeServices from '../../frontend/services/audioTypeServices'
import { validateShowMessage, isNull, removeAtts, isEqualsData } from '@/utils/Helper'

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
    isPermitted: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ header: 1 }, { header: 2 }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video', 'formula'],
        [{ direction: 'rtl' }],
        ['clean']
      ],
      languages: [
        {
          value: 1,
          label: 'Монгол'
        },
        {
          value: 2,
          label: 'Англи'
        }
      ],
      language: 1,
      mainRules: {
        title: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        titleEn: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        descriptionEn: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        contentEn: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ]
      },
      addRules: {
        categoryId: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'change'
          }
        ],
        menuId: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'change'
          }
        ],
        publishDate: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ]
      },
      filesRules: {
        image: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'change'
          }
        ]
      },
      dialogVisibleImage: false,
      activeStep: 0,
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
        // this.$nextTick(() => {
        //   this.$refs.mainFormRef.clearValidate()
        // })
      }
      return this.dialogFormVisible
    }
  },
  watch: {
    dialogVisible (newVal, oldVal) {
      this.activeStep = 0
    }
  },
  mounted () {
    this.refDatas()
  },
  destroyed () {},
  methods: {
    async refDatas () {
      this.menuList = (await MenuServices.cascadeList()).data
      this.categoryList = (await CategoryServices.index()).data
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
    changeStep (type) {
      if (type === 'next') {
        // if (this.activeStep++ > 2) this.activeStep = 0;
        if (this.activeStep === 0) {
          this.$refs.mainFormRef.validate((valid, fields) => {
            if (!valid) {
              validateShowMessage(fields, this, 'Content')
            } else {
              this.activeStep++
            }
          })
        } else if (this.activeStep === 1) {
          this.$refs.addFormRef.validate((valid, fields) => {
            if (!valid) {
              validateShowMessage(fields, this, 'Content')
            } else {
              this.activeStep++
            }
          })
        }
      } else if (this.activeStep-- < 1) { this.activeStep = 0 }
    },
    saveData (val) {
      this.buttonStatus = val
      if (isNull(this.temp.id) && this.dialogStatus === 'create') {
        // console.log(this.temp, 'nanana')
        this.createData()
      } else {
        this.updateData()
      }
    },
    createData () {
      this.drawerLoading = true
      removeAtts(this.temp)
      audioTypeServices.post(this.temp)
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
      this.drawerLoading = true
      removeAtts(this.temp)
      audioTypeServices.put(this.temp)
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
    handleRemove (file, fileList) {
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
      // console.log(file, 'this.file')
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
    beforeUploadAudio (file) {
      const isAudio =
        file.type === 'audio/ogg' ||
        file.type === 'audio/mp3' ||
        file.type === 'audio/wav'
      if (!isAudio) {
        this.$message.error('Зөвхөн аудио файл хуулна уу')
      }
      return isAudio
      // console.log(file, "file file before");
    },
    beforeUploadVideo (file) {
      const isVideo =
        file.type === 'video/ogg' ||
        file.type === 'video/webm' ||
        file.type === 'video/mp4'
      if (!isVideo) {
        this.$message.error('Зөвхөн видео файл хуулна уу')
      }
      return isVideo
      // console.log(file, "file file before");
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
