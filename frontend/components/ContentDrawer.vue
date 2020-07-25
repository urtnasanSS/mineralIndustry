<template>
  <div>
    <el-drawer
      :title="textMap[dialogStatus]"
      :before-close="handleClose"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      size="1315px"
    >
      <div v-loading="drawerLoading" class="drawer__content">
        <el-steps :active="activeStep" finish-status="success" simple>
          <el-step title="Ерөнхий мэдээлэл" icon="el-icon-edit" />
          <el-step title="Нэмэлт мэдээлэл" icon="el-icon-edit-outline" />
          <el-step title="Файлууд" icon="el-icon-picture" />
        </el-steps>
        <div class="contentDrawer">
          <!-- Ерөнхий мэдээлэл -->
          <div v-if="activeStep===0" class="main">
            <el-form
              ref="mainFormRef"
              :rules="dialogStatus == 'view' ? null : mainRules"
              :model="temp"
              label-position="left"
              label-width="150px"
            >
              <el-form-item :label="'Хэл'" prop="language">
                <label v-if="dialogStatus == 'view'">{{ language }}</label>
                <el-select v-else v-model="language" placeholder="Select">
                  <el-option
                    v-for="item in languages"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="language === 1" :label="'Гарчиг'" prop="title">
                <label v-if="dialogStatus == 'view'">{{ temp.title }}</label>
                <el-input v-else v-model="temp.title" size="mini" />
              </el-form-item>
              <el-form-item v-else :label="'Title'" prop="title">
                <label v-if="dialogStatus == 'view'">{{ temp.titleEn }}</label>
                <el-input v-else v-model="temp.titleEn" size="mini" />
              </el-form-item>
              <el-form-item v-if="language === 1" :label="'Хураангүй'" prop="description">
                <label v-if="dialogStatus == 'view'">{{ temp.description }}</label>
                <el-input v-else v-model="temp.description" type="textarea" size="mini" />
              </el-form-item>
              <el-form-item v-else :label="'Abstract'" prop="descriptionEn">
                <label v-if="dialogStatus == 'view'">{{ temp.descriptionEn }}</label>
                <el-input v-else v-model="temp.descriptionEn" type="textarea" size="mini" />
              </el-form-item>
              <el-form-item v-if="language === 1" :label="'Дэлгэрэнгүй'" prop="content">
                <label v-if="dialogStatus == 'view'">{{ temp.content }}</label>
                <tinymce v-else v-model="temp.content"></tinymce>
              </el-form-item>
              <el-form-item v-else :label="'Detail'" prop="contentEn">
                <label v-if="dialogStatus == 'view'">{{ temp.contentEn }}</label>
                <tinymce v-else v-model="temp.contentEn"></tinymce>
              </el-form-item>
              <!-- <el-form-item v-if="language === 1" :label="'Дэлгэрэнгүй'" prop="content">
                <label v-if="dialogStatus == 'view'">{{ temp.content }}</label>
                <vue-editor v-else v-model="temp.content" :editor-toolbar="customToolbar" />
              </el-form-item>
              <el-form-item v-else :label="'Detail'" prop="contentEn">
                <label v-if="dialogStatus == 'view'">{{ temp.contentEn }}</label>
                <vue-editor v-else v-model="temp.contentEn" :editor-toolbar="customToolbar" />
              </el-form-item> -->
              <el-upload
                v-if="dialogStatus !== 'view'"
                class="upload-demos"
                :action="uploadUrl"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
              >
                <article slot="tip" class="message is-info is-small " style="margin-top:10px;">
                </article>
                <el-button size="small" type="primary" icon="fa fa-plus">
                  Файл хуулах
                </el-button>
              </el-upload>
              <el-table :data="temp.files" style="width: 100%">
                <el-table-column prop="name" label="Нэр" style="width: 50%">
                </el-table-column>
                <el-table-column prop="url" label="Url">
                </el-table-column>
              </el-table>
            </el-form>
          </div>

          <!-- Нэмэлт мэдээлэл -->
          <div v-if="activeStep===1" class="additional">
            <el-form
              ref="addFormRef"
              :rules="dialogStatus == 'view' ? null : addRules"
              :model="temp"
              label-position="left"
              label-width="150px"
            >
              <el-form-item :label="'Онцлох эсэх'" prop="isSpecial">
                <label v-if="dialogStatus == 'view'">{{ temp.isSpecial }}</label>
                <el-switch v-else v-model="temp.isSpecial" active-color inactive-color />
              </el-form-item>
              <el-form-item :label="'Шуурхай эсэх'" prop="isStopPress">
                <label v-if="dialogStatus == 'view'">{{ temp.isStopPress }}</label>
                <el-switch v-else v-model="temp.isStopPress" active-color inactive-color />
              </el-form-item>
              <el-form-item :label="'Сэтгэгдэл нуух'" prop="isHideComments">
                <label v-if="dialogStatus == 'view'">{{ temp.isHideComments }}</label>
                <el-switch v-else v-model="temp.isHideComments" active-color inactive-color />
              </el-form-item>
              <el-form-item :label="'Нийтлэх хугацаа'" prop="publishDate">
                <label v-if="dialogStatus == 'view'">{{ temp.publishDate }}</label>
                <el-date-picker
                  v-else
                  v-model="temp.publishDate"
                  type="datetime"
                  placeholder="Сонгох"
                />
              </el-form-item>
              <!-- {{temp.menuId}} -->
              <el-form-item :label="'Цэс'" prop="menuId">
                <label v-if="dialogStatus == 'view'">{{ temp.menuId }}</label>
                <el-cascader
                  v-else
                  v-model="temp.menuId"
                  :show-all-levels="false"
                  :collapse-tags="false"
                  :options="menuList"
                  :props="{ checkStrictly: true }"
                  clearable
                />
              </el-form-item>
              <!-- {{temp.categoryId}} -->
              <el-form-item :label="'Категори'" prop="categoryId">
                <label v-if="dialogStatus == 'view'">{{ temp.categoryId }}</label>
                <el-select
                  v-else
                  v-model="temp.categoryId"
                  clearable
                  multiple
                  filterable
                  value-key="id"
                  placeholder="Сонгох"
                >
                  <el-option
                    v-for="listItem in categoryList"
                    :key="listItem.id"
                    :label="listItem.name"
                    :value="listItem.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <!-- Файлууд -->
          <div v-if="activeStep===2" class="files">
            <el-form
              ref="filesFormRef"
              :rules="dialogStatus == 'view' ? null : filesRules"
              :model="temp"
              label-position="left"
              label-width="150px"
            >
              <el-form-item label="Зураг сонгох" prop="image">
                <div v-if="dialogStatus == 'view'" class="block">
                  <el-image
                    v-for="file in temp.files.filter(c=> c.isDelete === false && c.fileType.includes('image'))"
                    :key="file.id"
                    style="width: 100px; height: 100px; margin-right:10px;"
                    :src="fileUrl + file.storageName"
                    fit="contain"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" />
                    </div>
                  </el-image>
                </div>
                <el-upload
                  v-else
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :file-list="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('image'))"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleImage" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>
              <!-- <el-form-item :label="'Аудио'" prop="haveAudio" style="margin:50px 0px;">
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
                  <source :src="fileUrl + temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].storageName" type="audio/ogg">
                  <source :src="fileUrl + temp.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].storageName" type="audio/mpeg">
                </audio>
              </el-form-item>
              <el-form-item :label="'Видео'" prop="haveUploadVideo">
                <el-switch
                  v-if="dialogStatus !== 'view'"
                  v-model="temp.haveUploadVideo"
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff0000"
                  active-text="Видео хуулах"
                  inactive-text="Видеоны Youtube холбоос оруулах"
                />
                <div v-if="!temp.haveUploadVideo">
                  <article v-if="dialogStatus !== 'view'" class="message is-info is-small " style="margin-top:10px;">
                    <div class="message-body " style="padding:5px 5px 5px 10px;">
                      iFrame-ийг зөвхөн <a href="https://www.youtube.com" target="_new"><strong> https://www.youtube.com</strong></a> -с Embed хуулж авна уу.<br> Жишээ нь:<em>  iframe src="" width="" height="" frameborder="0" style="border:0" allowfullscreen iframe </em>
                    </div>
                  </article>
                  <el-input v-if="dialogStatus !== 'view'" v-model="temp.youtubeIframe" type="textarea" size="mini" />
                  <div v-if="temp.youtubeIframe" class="youtubeIframe">
                    {{ temp.youtubeIframe }}
                  </div>
                </div>
                <div v-if="temp.haveUploadVideo" style="margin-top:10px;">
                  <el-upload
                    v-if="dialogStatus !== 'view'"
                    class="upload-demo"
                    :action="uploadUrl"
                    :on-remove="handleRemove"
                    :before-upload="beforeUploadVideo"
                    :on-success="handleSuccess"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceedAudio"
                    :file-list="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('video'))"
                  >
                    <article slot="tip" class="message is-info is-small " style="margin-top:10px;">
                      <div class="message-body " style="padding:5px 5px 5px 10px;">
                        Зөвхөн <strong>mp4, webm, ogg </strong>өргөтгөлтэй видео хуулна.
                      </div>
                    </article>
                    <el-button size="small" type="primary" icon="el-icon-video-camera">
                      Хуулах
                    </el-button>
                  </el-upload>
                  <div class="videoPlayer">
                    <video v-if="temp.files.filter(c=> c.isDelete === false && c.fileType.includes('video')).length>0" width="400" controls>
                      <source :src="fileUrl + temp.files.filter(c=> c.isDelete === false && c.fileType.includes('video'))[0].storageName" type="video/mp4">
                      <source :src="fileUrl + temp.files.filter(c=> c.isDelete === false && c.fileType.includes('video'))[0].storageName" type="video/ogg">
                      Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
                    </video>
                  </div>
                </div>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>
      <div class="drawer__footer">
        <el-row style="width:100%;">
          <el-col :span="12">
            <el-button-group>
              <el-button
                type="primary"
                :disabled="activeStep === 0"
                icon="el-icon-arrow-left"
                plain
                @click="changeStep('before')"
              >
                Өмнөх
              </el-button>
              <el-button type="primary" :disabled="activeStep === 2" @click="changeStep('next')">
                Дараах
                <i class="el-icon-arrow-right" plain />
              </el-button>
            </el-button-group>
          </el-col>
          <el-col :span="12" align="right">
            <el-button
              v-if="isPermitted"
              :disabled="activeStep!==2"
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

    <!-- {{dialogVisible}}  -->
  </div>
</template>
<script>
import MenuServices from '../../frontend/services/MenuServices'
import CategoryServices from '../../frontend/services/CategoryServices'
import ContentServices from '../../frontend/services/ContentServices'
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
        ['link', 'image', 'video', 'formula', 'code-block'],
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
        this.$nextTick(() => {
          this.$refs.mainFormRef.clearValidate()
          // this.$refs["addFormRef"].clearValidate();
          // this.$refs["filesFormRef"].clearValidate();
        })
      }
      return this.dialogFormVisible
    }
  },
  watch: {
    'temp.haveUploadVideo' (newVal, oldVal) {
      // console.log(newVal, 'newVal newVal')
    },
    dialogVisible (newVal, oldVal) {
      this.activeStep = 0
    }
  },
  created () {
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
            } else if ((this.temp.menuId.length > 0) || (this.temp.categoryId.length > 0)) {
              this.activeStep++
            } else {
              this.$message({ message: 'Цэс эсвэл Категори сонгоно уу!', type: 'warning' })
            }
          })
        }
      } else if (this.activeStep-- < 1) { this.activeStep = 0 }
    },
    // saveData(val) {
    //   this.$emit('saveData', val)
    // },
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
      ContentServices.post(this.temp)
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
      ContentServices.put(this.temp)
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
    // validateDataForm() {
    //   let isValidate = true;
    //   this.$refs["dataForm"].validate((valid, fields) => {
    //     if (!valid) {
    //       validateShowMessage(fields, this, "Category");
    //       isValidate = false;
    //     }
    //   });
    //   return isValidate;
    // },
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
