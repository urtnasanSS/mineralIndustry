<template>
  <div class="admin-container">
    <smart-action-buttons
      v-model="searchValue"
      :config="configActionButtons"
      @createdActions="createdActions"
      @handleRefresh="handleRefresh"
      @handleSearch="handleSearch"
      @handleCreate="handleCreate"
      @handleUpdate="handleUpdate"
      @handleView="handleView"
      @handleRemove="handleRemove"
      @handleRestore="handleRestore"
      @handleDelete="handleDelete"
      :is-permitted="isPermitted"
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
      <el-table-column align="left" :label="'Нэр'" prop="name" width="auto" sortable />
      <el-table-column align="left" :label="'Файл'" prop="files[0].name" width="auto" sortable />
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
    <audio-drawer
      :dialog-form-visible="dialogFormVisible"
      :temp="temp"
      :dialog-status="dialogStatus"
      :is-permitted="isPermitted"
      @update-dialog-visible="handleCloseDialog"
      @update-list="updateList"
      @create-list="createList"
      @push-temp="pushTemp"
    />
  </div>
</template>
<script>
// import axios from 'axios'
import moment from 'moment'
import audioTypeServices from '../../services/audioTypeServices'
import audioDrawer from '../../components/audioDraw'
// import Api from '../../services/Api'
import SmartActionButton from '@/components/custom/SmartActionButton'
import {
  isNull,
  // getKeyAttributeValue,
  validateShowMessage,
  // checkValidSub,
  // checkValidSubArray,
  isEqualsData
  // removeAtts
} from '@/utils/Helper'
export default {
  name: '',
  components: {
    'smart-action-buttons': SmartActionButton,
    'audio-drawer': audioDrawer
  },
  layout: 'adminLayout',
  data () {
    return {
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
        otherButtons: [{ code: 'restore', clickEvent: 'handleRestore' }],
        searchOptions: [
          {
            value: 'name',
            type: 'string',
            action: 'contains',
            text: 'Нэр',
            searchValue: null
          }
        ]
      },
      dialogStatus: 'view',
      listLoading: false,
      list: [],
      total: 0,
      uploadUrl: process.env.baseUrl + 'file/upload', // process.env.BASE_API + '/upload/',
      fileUrl: process.env.baseUrl,
      searchValue: '',
      dialogFormVisible: false,
      temp: {
        id: null,
        name: '',
        code: '',
        files: [],
        haveUploadVideo: false,
        isActive: true,
        isDelete: false
      },
      fileListAudio: [],
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
        name: [
          {
            required: true,
            message: 'Утга шаардана.',
            title: 'Нэр',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: 'Утга шаардана.',
            title: 'Код',
            trigger: 'blur'
          }
        ]
      },
      routerActions: [],
      selectedTemps: []
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
  },
  destroyed () {},
  methods: {
    moment,
    isNull,
    createdActions (val) {
      this.routerActions = val
    },
    getList () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      this.listLoading = true
      audioTypeServices.index(this.listQuery)
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
    handleSuccess (response, file, fileList) {
      this.temp.files.push({
        id: null,
        name: file.name,
        size: file.raw.size,
        response: file,
        url: this.fileUrl + response.filename,
        isDelete: false,
        storageName: response.filename
      })
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
    handleExceedAudio (files, fileList) {
      this.$message.warning(
        // `The limit is 3, you selected ${
        //   files.length
        // } files this time, add up to ${files.length + fileList.length} totally`
        `Зөвхөн 1 файл хуулах боломжтой`
      )
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
      this.dialogStatus = 'create'
      // this.$nextTick(() => {
      //   this.$refs.dataForm.clearValidate()
      // })
      this.resetTemp()
    },
    handleCloseDialog () {
      this.dialogFormVisible = false
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
      this.dialogStatus = 'update'
      // this.$nextTick(() => {
      //   this.$refs.dataForm.clearValidate()
      // })
    },
    updateList (val) {
      // console.log(val, ' val val val')
      this.temp = val.data
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v) // INDEX ОЛОХ
          this.list.splice(index, 1, JSON.parse(JSON.stringify(this.temp)))
          break
        }
      }
    },
    createList (val) {
      this.temp = val.data
      this.total = this.total + 1
      this.list.unshift(this.temp)
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
      // this.$nextTick(() => {
      //   this.$refs.dataForm.clearValidate()
      // })
    },
    handleRemove (file, fileList) {
      for (const v of this.temp.files) {
        if (v.storageName === file.storageName) {
          v.isDelete = true
          break
        }
      }
    },
    handleRestore () {
    },
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
          audioTypeServices.manyDelete(this.selectedTemps)
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
        name: '',
        code: '',
        files: [],
        haveUploadVideo: false,
        isActive: true,
        isDelete: false
      }
    },
    // saveData (val) {
    //   this.buttonStatus = val
    //   if (isNull(this.temp.id) && this.dialogStatus === 'create') {
    //     this.createData()
    //   } else {
    //     // console.log('updateeeeee')
    //     this.updateData()
    //   }
    // },
    // createData () {
    //   if (this.validateDataForm()) {
    //     this.fullscreenLoading = true
    //     removeAtts(this.temp)
    //     audioTypeServices.post(this.temp)
    //       .then((response) => {
    //         this.total = this.total + 1
    //         this.temp = response.data
    //         this.list.unshift(this.temp)
    //         this.saveSuccess()
    //         this.dialogStatus = 'update'
    //         // savedMessage(this)
    //         this.$notify({
    //           title: 'Амжилттай хадгалагдлаа',
    //           message: 'Хадгалах',
    //           type: 'success',
    //           duration: 2000
    //         })
    //         this.fullscreenLoading = false
    //       })
    //       .catch((error) => {
    //         this.fullscreenLoading = false
    //         this.$message({
    //           type: 'warning',
    //           message: 'Алдаа гарлаа'
    //         })
    //         return this.$message({
    //           type: 'warning',
    //           message: error.response.data.error
    //         })
    //       })
    //   }
    // },
    // updateData () {
    //   if (this.validateDataForm()) {
    //     this.fullscreenLoading = true
    //     removeAtts(this.temp)
    //     console.log(this.temp, 'this.temp')
    //     audioTypeServices.put(this.temp)
    //       .then((response) => {
    //         for (const v of this.list) {
    //           if (v.id === this.temp.id) {
    //             const index = this.list.indexOf(v) // INDEX ОЛОХ
    //             this.temp = response.data
    //             this.list.splice(
    //               index,
    //               1,
    //               JSON.parse(JSON.stringify(this.temp))
    //             )
    //             break
    //           }
    //         }

    //         this.saveSuccess()
    //         // updatedNotify(this);
    //         this.fullscreenLoading = false
    //       })
    //       .catch((error) => {
    //         this.fullscreenLoading = false
    //         this.$message({
    //           type: 'warning',
    //           message: 'Хадгалагдлаа'
    //         })
    //         return this.$message({
    //           type: 'warning',
    //           message: error.response.data.error
    //         }) // ЭСВЭЛ АЛДАА ГАРВАЛ BACKEND-С ИРЖ БАЙГАА АЛДААНЫ МЕССЕЖИЙГ ХЭРЭГЛЭГЧИД ХАРУУЛАХ
    //       })
    //   }
    // },
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
    }
  }
}
</script>
