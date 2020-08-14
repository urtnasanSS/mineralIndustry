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
      <el-table-column align="left" :label="'Нэр'" prop="name" width="auto" sortable>
        <template slot-scope="scope">
          <span :class="`tag ${scope.row.color}`">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

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
      size="30%"
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
          <el-form-item :label="'Өнгө'" prop="color">
            <label v-if="dialogStatus == 'view'">{{ temp.color }}</label>
            <el-select
              v-else
              v-model="temp.color"
              clearable
              size="mini"
              filterable
              value-key="id"
            >
              <el-option
                v-for="item in colors"
                :key="item.id"
                :label="item.color"
                :value="item.class"
              >
                <span :class="`tag ${item.class}`" style="width:100%;">{{ item.id }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="temp.name && temp.color" :label="'Харагдах байдал'" prop="">
            <span :class="`tag ${temp.color}`">{{ temp.name }}</span>
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
import axios from 'axios'
import moment from 'moment'
import CategoryServices from '../../services/CategoryServices'
// import Api from '../../services/Api'
import SmartActionButton from '@/components/custom/SmartActionButton'
import {
  isNull,
  // getKeyAttributeValue,
  validateShowMessage,
  // checkValidSub,
  // checkValidSubArray,
  isEqualsData,
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
      colors: [
        { id: 1, color: '#0a0a0a', class: 'is-black' },
        { id: 2, color: '#363636', class: 'is-dark' },
        { id: 3, color: '#f5f5f5', class: 'is-light' },
        { id: 4, color: '#fff', class: 'is-white' },
        { id: 5, color: '#00d1b2', class: 'is-primary' },
        { id: 6, color: '#3273dc', class: 'is-link' },
        { id: 7, color: '#209cee', class: 'is-info' },
        { id: 8, color: '#23d160', class: 'is-success' },
        { id: 9, color: '#ffdd57', class: 'is-warning' },
        { id: 10, color: '#ff3860', class: 'is-danger' }
      ],
      predefineColors: [
        'hsl(217, 71%, 53%)',
        'hsl(204, 86%, 53%)',
        'hsl(141, 71%, 48%)',
        'hsl(48, 100%, 67%)',
        'hsl(348, 100%, 61%)'
      ],
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
      dialogStatus: '',
      listLoading: false,
      list: [],
      total: 0,
      searchValue: '',
      dialogFormVisible: false,
      temp: {
        id: null,
        name: '',
        nameEn: '',
        color: '',
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
        name: [
          {
            required: true,
            message: 'Утга шаардана.',
            title: 'Нэр',
            trigger: 'blur'
          }
        ],
        nameEn: [
          {
            required: true,
            message: 'Утга шаардана.',
            title: 'Нэр /Англи/',
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
      CategoryServices.index(this.listQuery)
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
    handleRemove () {
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
          CategoryServices.manyDelete(this.selectedTemps)
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
        nameEn: '',
        color: '',
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
        removeAtts(this.temp)
        axios
          .post(`http://localhost:8083/Category/post`, this.temp)
          .then((response) => {
            // console.log(response, 'repsonseeeeeeee')
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
        CategoryServices.put(this.temp)
          .then((response) => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v) // INDEX ОЛОХ
                this.temp = response.data
                this.list.splice(
                  index,
                  1,
                  JSON.parse(JSON.stringify(this.temp))
                )
                break
              }
            }

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
    }
  }
}
</script>
