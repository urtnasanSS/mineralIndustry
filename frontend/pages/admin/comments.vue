<template>
  <div class="admin-container">
    <smart-action-buttons
      v-model="searchValue"
      :config="configActionButtons"
      @createdActions="createdActions"
      @handleRefresh="handleRefresh"
      @handleSearch="handleSearch"
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
      <el-table-column align="left" :label="'Нэр'" prop="author" width="auto" sortable />
      <el-table-column
        align="left"
        :label="'Утас'"
        prop="text"
        width="auto"
      />
      <el-table-column
        align="left"
        :label="'Email'"
        prop="text"
        width="auto"
      />
      <el-table-column
        align="left"
        :label="'Сэтгэгдэл'"
        prop="text"
        width="auto"
      />
      <el-table-column
        align="center"
        :label="'Мэдээний ID'"
        prop="contentId"
        width="140px"
      />
      <el-table-column
        align="center"
        :label="'Үүсгэсэн огноо'"
        prop="createdAt"
        width="140px"
        sortable
      >
        <template slot-scope="scope">
          <span v-if="scope.row.createdAt">{{ moment(scope.row.createdAt).format("YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
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
    >
      <div class="drawer__content">
        <el-form
          ref="dataForm"
          :rules="dialogStatus == 'view' ? null : rules"
          :model="temp"
          label-position="left"
          label-width="150px"
        >
          <el-form-item :label="'Нэр'" prop="author">
            <label v-if="dialogStatus == 'view'">{{ temp.author }}</label>
            <el-input v-else v-model="temp.author" size="mini" />
          </el-form-item>
          <el-form-item :label="'Сэтгэгдэл'" prop="text">
            <label v-if="dialogStatus == 'view'">{{ temp.text }}</label>
            <el-input v-else v-model="temp.text" size="mini" />
          </el-form-item>
        </el-form>
      </div>
      <div class="drawer__footer">
        <el-button
          v-if="dialogStatus == 'create' && routerActions.includes('create') || dialogStatus == 'update' && routerActions.includes('update')"
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
import BannerTypeServices from '../../services/BannerTypeServices'
import CommentServices from '../../services/CommentServices'
// import Api from '../../services/Api'
import SmartActionButtonShowDelete from '@/components/custom/SmartActionButtonShowDelete'
import {
  isNull,
  // getKeyAttributeValue,
  isEqualsData,
  validateShowMessage,
  // checkValidSub,
  // checkValidSubArray,
  removeAtts
} from '@/utils/Helper'
export default {
  name: '',
  components: {
    'smart-action-buttons': SmartActionButtonShowDelete
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
            value: 'author',
            type: 'string',
            action: 'contains',
            text: 'Нэр',
            searchValue: null
          },
          {
            value: 'text',
            type: 'string',
            action: 'contains',
            text: 'Сэтгэгдэл',
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
        author: '',
        text: '',
        files: [],
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
        author: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'blur'
          }
        ]
      },
      routerActions: [],
      selectedTemps: [],
      bannerTypeList: [],
      imgSrc: '',
      cropImg: ''
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
      CommentServices.show(this.listQuery)
        .then((response) => {
          const data = response.data
          console.log(data, 'data------------------------')
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
      this.bannerTypeList = (await BannerTypeServices.index()).data
      // console.log(this.bannerTypeList, 'bannerTypeList v')
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
        await this.getList(this.listQuery)
        this.$message({
          showClose: true,
          type: 'success',
          message: 'Хайж дууслаа.'
        })
      }
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
          CommentServices.manyDelete(this.selectedTemps)
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
        id: undefined, // АНХНЫ УТГА undefined-г ОНООСОН
        author: '',
        text: '',
        bannerTypeId: null,
        files: [],
        isActive: true
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
      if (this.validateDataForm()) {
        this.fullscreenLoading = true
        removeAtts(this.temp)
        CommentServices.post(this.temp)
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
        CommentServices.put(this.temp)
          .then((response) => {
            // console.log(response, 'asdasd')
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
    handleSuccess (response, file, fileList) {
      this.temp.files.push({
        id: null,
        name: file.name,
        response: file,
        url: this.baseUrl + response.filename,
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
