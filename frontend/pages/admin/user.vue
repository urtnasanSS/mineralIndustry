<template>
  <div class="admin-container">
    <smart-action-buttons
      v-model="searchValue"
      :config="configActionButtons"
      :is-permitted="isPermitted"
      @createdActions="createdActions"
      @handleRefresh="handleRefresh"
      @handleSearch="handleSearch"
      @handleCreate="handleCreate"
      @handleUpdate="handleUpdate"
      @handleView="handleView"
      @handleRemove="handleRemove"
      @handleRestore="handleRestore"
      @handleDelete="handleDelete"
    />
    <el-table
      ref="tableList"
      v-loading="listLoading"
      :data="list"
      :default-sort="listQuery.sort"
      element-loading-text="Уншиж байна. Түр хүлээнэ үү.."
      border
      :row-class-name="activeClass"
      class="mainDataTable"
      height="calc(100% - 90px)"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
    >
      <el-table-column align="center" type="selection" width="40" />
      <el-table-column align="center" :label="'№'" prop="id" width="45">
        <template slot-scope="scope">
          <span>
            {{
              list.indexOf(scope.row) +
                (listQuery.currentPage - 1) * listQuery.limit +
                1
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="left" :label="'Овог'" prop="surName" width="auto" sortable />
      <el-table-column align="left" :label="'Нэр'" prop="givenName" width="auto" sortable />
      <el-table-column align="left" :label="'Утасны дугаар'" prop="phoneNumber" width="auto" sortable />
      <el-table-column align="left" :label="'Нэвтрэх нэр'" prop="userName" width="auto" sortable />
    </el-table>
    <div class="mainPagination">
      <div class="block">
        <el-pagination
          background
          :current-page.sync="listQuery.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-drawer
      v-loading="fullscreenLoading"
      :title="textMap[dialogStatus]"
      :before-close="handleClose"
      :visible.sync="dialogFormVisible"
      size="1000px;"
    >
      <div class="drawer__content">
        <el-form
          ref="dataForm"
          :rules="dialogStatus == 'view' ? null : rules"
          :model="temp"
          label-position="left"
          label-width="150px"
        >
          <el-form-item :label="'Овог'" prop="surName">
            <label v-if="dialogStatus == 'view'">{{ temp.surName }}</label>
            <el-input v-else v-model="temp.surName" size="mini" />
          </el-form-item>
          <el-form-item :label="'Нэр'" prop="givenName">
            <label v-if="dialogStatus == 'view'">{{ temp.givenName }}</label>
            <el-input v-else v-model="temp.givenName" size="mini" />
          </el-form-item>
          <el-form-item :label="'Нэвтрэх нэр'" prop="userName">
            <label v-if="dialogStatus == 'view'">{{ temp.userName }}</label>
            <el-input v-else v-model="temp.userName" size="mini" />
          </el-form-item>
          <el-form-item :label="'Регистр'" prop="register">
            <label v-if="dialogStatus == 'view'">{{ temp.register }}</label>
            <el-input v-else v-model="temp.register" size="mini" />
          </el-form-item>
          <el-form-item :label="'Пасспорт'" prop="password">
            <label v-if="dialogStatus == 'view'">{{ temp.password }}</label>
            <el-input v-else v-model="temp.password" size="mini" />
          </el-form-item>
          <el-form-item :label="'Утасны дугаар'" prop="phoneNumber">
            <label v-if="dialogStatus == 'view'">{{ temp.phoneNumber }}</label>
            <el-input v-else v-model="temp.phoneNumber" size="mini" />
          </el-form-item>
          <el-form-item :label="'Хандах эрх'" prop="role">
            <label v-if="dialogStatus == 'view'">{{ temp.role }}</label>
            <!-- <el-input v-else v-model="temp.phoneNumber" size="mini" /> -->
            <label v-else class="select">
              <select v-model="temp.role">
                <option value="1">Систем админ</option>
                <option value="2">Мэдээний админ</option>
                <option value="3">Харах эрхтэй</option>
              </select>
            </label>
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
// import axios from 'axios'
import moment from 'moment'
import UserServices from '../../services/UserServices'
// import Api from '../../services/Api'
import SmartActionButton from '@/components/custom/SmartActionButton'
import {
  isNull,
  // getKeyAttributeValue,
  validateShowMessage,
  isEqualsData,
  // checkValidSub,
  // checkValidSubArray,
  removeAtts
} from '@/utils/Helper'
export default {
  name: '',
  components: {
    'smart-action-buttons': SmartActionButton
  },
  layout: 'adminLayout',
  data () {
    return {
      dialogVisibleImage: false,
      dialogImageUrl: '',
      uploadUrl: process.env.baseUrl + '/upload', // process.env.BASE_API + '/upload/',
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {}
      },
      configActionButtons: {
        excludeButtons: '',
        downloadItems: 'excel pdf word html',
        includeButtons: '',
        otherButtons: [{ link: 'restore', clickEvent: 'handleRestore' }],
        searchOptions: [
          {
            value: 'surName',
            type: 'string',
            action: 'contains',
            text: 'Овог',
            searchValue: null
          },
          {
            value: 'givenName',
            type: 'string',
            action: 'contains',
            text: 'Нэр',
            searchValue: null
          }
        ]
      },
      dialogStatus: '',
      listLoading: false,
      list: [],
      total: 0,
      searchValue: '',
      dialogFormVisible: false,
      temp: {
        id: null,
        surname: '',
        giveName: '',
        userName: '',
        register: '',
        password: '',
        phoneNumber: '',
        role: '',
        permissionTypeId: '1',
        isActive: true
      },
      textMap: {
        update: 'Засварлах',
        create: 'Бүртгэх',
        view: 'Харах'
      },
      buttonStatus: 'saveAndClose',
      buttonMap: {
        save: 'Хадгалах',
        saveAndView: 'Хадгалаад харах',
        saveAndNew: 'Хадгалаад шинэ',
        saveAndClose: 'Хадгалаад хаах'
      },
      fullscreenLoading: false,
      rules: {
        surName: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        givenName: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        register: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ]
      },
      routerActions: [],
      selectedTemps: [],
      imgSrc: '',
      cropImg: ''
    }
  },
  computed: {
    isPermitted() {
      return ['1'].includes(this.$store.getters.userKey.role)
    }
  },
  watch: {},
  created () {
    this.getList()
    this.refDatas()
  },
  destroyed () {},
  methods: {
    moment,
    isNull,
    setImage (e) {
      const file = e.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()

        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }

        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      // console.log(this.cropImg, ' this.cropImg  this.cropImg')
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    rotate () {
      // guess what this does :)
      this.$refs.cropper.rotate(90)
    },
    createdActions (val) {
      this.routerActions = val
    },
    getList () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      this.listLoading = true
      UserServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          this.list = JSON.parse(JSON.stringify(data.rows))
          this.total = data.count
          this.currentPage = this.listQuery.currentPage
          this.loading = false
        })
        .catch((err) => {
          this.list = []
          this.total = 0
          this.loading = false
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      this.listLoading = false
    },
    async refDatas () {
      // this.AllData = (await LinksServices.index()).data
      // console.log(this.AllData, 'NewData')
    },
    activeClass ({ row, rowIndex }) {
      if (row.isActive === false) {
        return 'notActiveClass'
      } else {
        return ''
      }
    },
    handleSelectionChange (val) {
      this.selectedTemps = val
    },
    handleSortChange (val) {
      this.listQuery.sort.prop = val.prop // БАГАНЫН prop - ын УТГЫГ listQuery.sort -ийн УТГАД ӨГӨХ
      this.listQuery.sort.order = val.order // ascending, descending
      this.getList() // listQuery.sort-д УТГУУДАА ОНООСНЫ ДАРАА ҮНДСЭН ЖАГСААЛТЫГ ДАХИН ДУУДНАА
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleRowClick (row) {
      this.$refs.tableList.clearSelection()
      this.$refs.tableList.toggleRowSelection(row)
    },
    async handleRefresh () {
      this.resetListQuery()
      this.searchValue = null
      await this.getList()
      this.$message({
        showClose: true,
        type: 'success',
        message: 'Дахин ачааллаа'
      })
    },
    async handleSearch () {
      if (this.searchValue) {
        this.listQuery.search = this.searchValue
        this.listQuery.currentPage = 1
        await this.getList()
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Хайж дууслаа.'
        })
      }
    },
    handleCreate () {
      this.dialogFormVisible = true
      this.resetTemp()
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    handleUpdate () {
      this.isLoadingSave = false
      if (this.selectedTemps.length === 0) {
        return this.$message({
          type: 'warning',
          message: 'Мөр сонгоогүй байна.'
        })
      } else if (this.selectedTemps.length > 1) {
        return this.$message({
          type: 'warning',
          message: 'Зөвхөн нэг мөр сонгоно уу.'
        })
      }
      this.dialogFormVisible = true
      this.resetTemp()
      this.temp = JSON.parse(JSON.stringify(this.selectedTemps[0]))
      // console.log(this.temp, 'this.temp')
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    async handleView () {
      if (this.selectedTemps.length === 0) {
        return this.$message({
          type: 'warning',
          message: 'Мөр сонгоогүй байна.'
        })
      } else if (this.selectedTemps.length > 1) {
        return this.$message({
          type: 'warning',
          message: 'Зөвхөн нэг мөр сонгоно уу.'
        })
      }
      this.viewCurrentPage = 1
      await this.tempView()
    },
    tempView () {
      this.temp = Object.assign(
        {},
        this.selectedTemps[this.viewCurrentPage - 1]
      )
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    handleRemove () {},
    handleRestore () {},
    handleDelete () {
      if (this.selectedTemps.length === 0) {
        return this.$message({
          type: 'warning',
          message: 'Мөр сонгоогүй байна.'
        })
      }
      this.$confirm('Устгахдаа итгэлтэй байна уу', 'Анхааруулга', {
        type: 'warning'
      })
        .then(() => {
          UserServices.manyDelete(this.selectedTemps)
            .then((response) => {
              this.$notify({
                title: 'Амжилттай',
                message: 'Устгагдлаа',
                type: 'success',
                duration: 2000
              })
              for (let i = 0; i < this.selectedTemps.length; i++) {
                const index = this.list.indexOf(this.selectedTemps[i])
                this.list.splice(index, 1)
                this.total--
              }
            })
            .catch(function (error) {
              this.$message({
                type: 'error',
                message: error
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Цуцлагдлаа'
          })
        })
    },
    handleClose (done) {
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
            this.dialogFormVisible = false
            done()
          })
          .catch((_) => {
            // this.dialogFormVisible = false
          })
      } else {
        this.dialogFormVisible = false
      }
    },
    resetTemp () {
      // ҮНДСЭН ӨГӨГДӨЛ БҮРТГЭХ, ЗАСВАРЛАХАД АШИГЛАХ ТҮР САНАХ ХУВЬСАГЧИЙГ ЦЭВЭРЛЭХ
      this.temp = {
        id: null, // АНХНЫ УТГА undefined-г ОНООСОН
        surName: '',
        givenName: '',
        phoneNumber: '',
        password: '',
        isActive: true
      }
    },
    saveData (val) {
      this.buttonStatus = val
      if (isNull(this.temp.id) && this.dialogStatus === 'create') {
        this.createData()
      } else {
        // console.log('updateeeeee')
        this.updateData()
      }
    },
    createData () {
      if (this.validateDataForm()) {
        this.fullscreenLoading = true
        this.temp.permissionTypeId = '1'
        this.temp.isActive = true
        // removeAtts(this.temp)
        UserServices.post(this.temp)
          .then((response) => {
            this.total = this.total + 1
            this.temp = response.data
            this.list.unshift(this.temp)
            this.saveSuccess()
            this.dialogStatus = 'update'
            // savedMessage(this)
            this.$notify({
              title: 'Амжилттай хадгалагдлаа',
              message: 'Хадгалах',
              type: 'success',
              duration: 2000
            })
            this.fullscreenLoading = false
          })
          .catch((error) => {
            this.fullscreenLoading = false
            this.$message({
              type: 'warning',
              message: 'Алдаа гарлаа'
            })
            return this.$message({
              type: 'warning',
              message: error.response.data.error
            })
          })
      }
    },
    updateData () {
      if (this.validateDataForm()) {
        this.fullscreenLoading = true
        removeAtts(this.temp)
        // console.log(this.temp, 'this.temp')
        UserServices.put(this.temp)
          .then((response) => {
            // console.log(response.data, 'asdasd')
            // for (const v of this.list) {
            //   if (v.id === this.temp.id) {
            //     const index = this.list.indexOf(v); // INDEX ОЛОХ
            //     this.temp = response.data;
            //     this.list.splice(
            //       index,
            //       1,
            //       JSON.parse(JSON.stringify(this.temp))
            //     );
            //     break;
            //   }
            // }

            this.saveSuccess()
            // updatedNotify(this);
            this.fullscreenLoading = false
          })
          .catch((error) => {
            this.fullscreenLoading = false
            this.$message({
              type: 'warning',
              message: 'Хадгалагдлаа'
            })
            return this.$message({
              type: 'warning',
              message: error.response.data.error
            }) // ЭСВЭЛ АЛДАА ГАРВАЛ BACKEND-С ИРЖ БАЙГАА АЛДААНЫ МЕССЕЖИЙГ ХЭРЭГЛЭГЧИД ХАРУУЛАХ
          })
      }
    },
    validateDataForm () {
      let isValidate = true
      this.$refs.dataForm.validate((valid, fields) => {
        if (!valid) {
          validateShowMessage(fields, this, 'Category')
          isValidate = false
        }
      })
      return isValidate
    },
    async saveSuccess () {
      await this.pushTemp(this.temp)
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
          this.dialogFormVisible = false
          break
        default:
          break
      }
    },
    pushTemp (val) {
      this.$refs.tableList.toggleRowSelection(val)
      let isHave = false
      for (const row of this.selectedTemps) {
        if (row.id === val.id) {
          isHave = true
          break
        }
      }
      if (!isHave) {
        this.selectedTemps.push(val)
      }
    },
    resetListQuery () {
      this.listQuery.currentPage = 1
      this.listQuery.search = {}
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
      this.temp.files.push({ id: null, name: file.name, response: file, url: this.baseUrl + response.filename, isDelete: false, storageName: response.filename })
    },
    beforeUpload (file) {
      const isPicture = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      if (!isPicture) {
        this.$message.error('Зөвхөн зураг хуулна уу')
      }
      return isPicture
    }
  }
}
</script>
<style lang="scss" >
/* Style Two */

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrapper input[type="file"] {
  font-size: 12px;
  // position: absolute;
  // left: 0;
  // top: 0;
}
</style>
