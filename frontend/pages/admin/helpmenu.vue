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
            {{ list.indexOf(scope.row) + (listQuery.currentPage - 1) * listQuery.limit + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="left" :label="'Нэр'" prop="name" width="auto" sortable />
      <el-table-column align="center" :label="'Цэсэнд харьяалагдах мэдээлэл харагдах төрөл'" prop="menuViewTypeIds">
        <template v-if="scope.row.menuViewTypeId" slot-scope="scope">
          <span>{{ getListName(scope.row.menuViewTypeId, scope.row.menuViewTypeIds, menuViewTypeList) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'Цэсний байршил'" prop="menuTypeIds">
        <template v-if="scope.row.menuTypeId" slot-scope="scope">
          <span>{{ getListName(scope.row.menuTypeId, scope.row.menuTypeIds, menuTypeList) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'Эрэмбэ'" prop="sortOrder" width="100px" sortable />
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
    <el-drawer
      v-loading="fullscreenLoading"
      :title="textMap[dialogStatus]"
      :before-close="handleClose"
      :visible.sync="dialogFormVisible"
      size="40%"
    >
      <div class="drawer__content">
        <el-form
          ref="dataForm"
          :rules="dialogStatus == 'view' ? null : rules"
          :model="temp"
          label-position="left"
          label-width="180px"
        >
          <!-- <el-row>
          <el-col :span="12">-->
          <el-form-item :label="'Нэр'" prop="name">
            <label v-if="dialogStatus == 'view'">{{ temp.name }}</label>
            <el-input v-else v-model="temp.name" size="mini" />
          </el-form-item>
          <el-form-item :label="'Нэр /Англи/'" prop="nameEn">
            <label v-if="dialogStatus == 'view'">{{ temp.nameEn }}</label>
            <el-input v-else v-model="temp.nameEn" size="mini" />
          </el-form-item>

          <!-- </el-col>
          <el-col :span="12" style="padding-left:10px;">-->
          <el-form-item :label="'Харьяалагдах цэс'" prop="parentId">
            <label v-if="dialogStatus=='view' ">{{ temp.parentId }}</label>
          </el-form-item>
          <el-form-item :label="'Эрэмбэ'" prop="sortOrder">
            <label v-if="dialogStatus == 'view'">{{ temp.sortOrder }}</label>
            <el-input
              v-else
              v-model="temp.sortOrder"
            />
          </el-form-item>
          <!-- </el-col>

          </el-row>
          <el-row>
          <el-col :span="12">-->
          <el-form-item :label="'Цэсний байршил'" prop="menuTypeId">
            <label v-if="dialogStatus=='view' && temp.menuTypeIds">{{ temp.menuTypeIds.name }}</label>
            <el-select
              v-else
              v-model="temp.menuTypeId"
              clearable
              size="mini"
              filterable
              value-key="id"
            >
              <el-option
                v-for="listItem in menuTypeList.filter(c=> c.id !== 1)"
                :key="listItem.id"
                :label="listItem.name"
                :value="listItem.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :label="'Цэсэнд харьяалагдах мэдээлэл харагдах төрөл'"
            prop="menuViewTypeId"
          >
            <label
              v-if="dialogStatus=='view' && temp.menuViewTypeIds"
            >{{ temp.menuViewTypeIds.name }}</label>
            <el-select
              v-else
              v-model="temp.menuViewTypeId"
              clearable
              size="mini"
              filterable
              value-key="id"
            >
              <el-option
                v-for="listItem in menuViewTypeList"
                :key="listItem.id"
                :label="listItem.name"
                :value="listItem.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="temp.menuViewTypeId && temp.menuViewTypeId === 6" :label="'Redirect'" prop="isRedirect">
            <label v-if="dialogStatus == 'view'">{{ temp.isRedirect }}</label>
            <el-switch v-else v-model="temp.isRedirect" />
          </el-form-item>
          <el-form-item
            v-if="temp.menuViewTypeId && temp.menuViewTypeId === 6"
            :label="'Холбоос'"
            prop="link"
          >
            <label v-if="dialogStatus == 'view'">{{ temp.link }}</label>
            <el-input v-else v-model="temp.link" size="mini" />
          </el-form-item>
          <!-- </div> -->
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
// import draggable from 'vuedraggable'
// import axios from 'axios'
import moment from 'moment'
import MenuTypeServices from '../../services/MenuTypeServices'
import MenuServices from '../../services/MenuServices'
// import Api from '../../services/Api'
import SmartActionButton from '@/components/custom/SmartActionButton'
import {
  isNull,
  // getKeyAttributeValue,
  validateShowMessage,
  isEqualsData,
  // checkValidSub,
  // checkValidSubArray,
  removeAtts,
  isNullOrEmpty
} from '@/utils/Helper'
export default {
  name: '',
  components: {
    // draggable,
    'smart-action-buttons': SmartActionButton
  },
  layout: 'adminLayout',
  data () {
    return {
      // todos: [
      //   {id: 1, title: 'asdasd', done: true},
      //   {id: 2, title: 'a2131sdasd', done: false},
      //   {id: 3, title: 'asda1231sd', done: true},
      //   {id: 4, title: 'asdas44d', done: false},
      // ],
      listQuery: {
        limit: 100,
        currentPage: 1,
        sort: {
          prop: 'sortOrder',
          order: 'ascending'
        },
        search: {
          notMenuTypeId: 1
        }
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
      menuViewTypeList: [],
      menuTypeList: [],
      temp: {
        id: null,
        menuViewTypeId: null,
        menuTypeId: null,
        parentId: null,
        isRedirect: false,
        name: '',
        nameEn: '',
        link: '',
        sortOrder: 1,
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
        ],
        menuViewTypeId: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'change'
          }
        ],
        menuTypeId: [
          {
            required: true,
            message: 'Утга шаардана.',
            trigger: 'change'
          }
        ],
        link: [
          {
            required: true,
            message: 'Утга шаардана.',
            title: 'Холбоос',
            trigger: 'blur'
          }
        ],
        sortOrder: [
          {
            required: true,
            message: 'Утга шаардана.',
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
    this.refDatas()
  },
  destroyed () {},
  methods: {
    moment,
    isNull,
    // cascadийн disable-ийг тохируулж байна. Энэ кодыг сайжруулах !!!!
    getListName (value, values, list) {
      if (isNullOrEmpty(values)) {
        const data = list.find(i => i.id === value)
        if (!isNull(data)) {
          return data.name
        }
      } else {
        return values.name
      }
    },
    async refDatas () {
      this.menuViewTypeList = (await MenuServices.getViewType()).data
      this.menuTypeList = (await MenuTypeServices.index()).data
      // this.cascadeList = (await MenuServices.cascadeList()).data;
    },
    createdActions (val) {
      this.routerActions = val
    },
    getList () {
      this.listLoading = true
      MenuServices.index(this.listQuery).then((response) => {
        const data = response.data
        if (data.rows.length > 0) {
          this.list = JSON.parse(JSON.stringify(data.rows))
        }
        this.total = data.count
        this.currentPage = this.listQuery.currentPage
        this.listLoading = false
      }).catch((err) => {
        this.list = []
        this.total = 0
        this.listLoading = false
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
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
      this.selectedTemps = []
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
      } else if (this.selectedTemps.length > 1) {
        return this.$message({
          type: 'warning',
          message: 'Зөвхөн нэг мөр сонгоно уу.'
        })
      }
      this.$confirm('Устгахдаа итгэлтэй байна уу', 'Анхааруулга', {
        type: 'warning'
      }).then(() => {
        MenuServices.manyDeleteHelpMenu(this.selectedTemps[0]).then((response) => {
          this.handleSelectionChange(response.data)
          this.selectedTemps = []
          this.getList()
          this.$notify({
            title: 'Амжилттай',
            message: 'Устгагдлаа',
            type: 'success',
            duration: 2000
          })
        }).catch(function (error) {
          this.$message({
            type: 'error',
            message: error
          })
        })
      }).catch(() => {
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
        id: undefined,
        menuViewTypeId: null,
        menuTypeId: null,
        parentId: null,
        isRedirect: false,
        name: '',
        nameEn: '',
        link: '',
        sortOrder: 1,
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
        if (this.temp.parentId && this.temp.parentId.length > 0) {
          if (this.temp.parentId.length > 2) {
            return this.$message({ type: 'warning', message: 'Хоёроос дээш салбарласан туслах цэс байх боломжгүй' })
          } else {
            this.temp.parentId = this.temp.parentId[this.temp.parentId.length - 1]
          }
        }
        removeAtts(this.temp)
        this.fullscreenLoading = true
        MenuServices.post(this.temp).then((response) => {
          this.handleSelectionChange(response.data)
          this.getList()
          this.saveSuccess()
          this.$notify({
            title: 'Амжилттай',
            message: 'Хадгалагдлаа',
            type: 'success',
            duration: 2000
          })
          this.fullscreenLoading = false
        }).catch((error) => {
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
        // console.log(this.temp, "this.temp");
        if (this.temp.parentId && this.temp.parentId.length > 0) {
          if (this.temp.parentId.length > 2) {
            return this.$message({ type: 'warning', message: 'Хоёроос дээш салбарласан туслах цэс байх боломжгүй' })
          } else {
            this.temp.parentId = this.temp.parentId[this.temp.parentId.length - 1]
          }
        }
        removeAtts(this.temp)
        this.fullscreenLoading = true
        MenuServices.put(this.temp).then((response) => {
          this.handleSelectionChange(response.data)
          this.getList()
          this.saveSuccess()
          this.$notify({
            title: 'Амжилттай',
            message: 'Засварлагдлаа',
            type: 'success',
            duration: 2000
          })
          this.fullscreenLoading = false
        }).catch((error) => {
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
          validateShowMessage(fields, this, 'Menu')
          isValidate = false
        }
      })
      return isValidate
    },
    saveSuccess () {
      // await this.pushTemp(this.temp);
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
      // this.$refs.tableList.toggleRowSelection(val);
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
    handleClickMenuHider (item) {
      if (item.hide) {
        item.hide = false
      } else {
        item.hide = true
      }
    }
    // getSortOrder(list, id){
    //   if (list && list.length>0){
    //     for (const item of list){
    //       if (item.value === id ){
    //         return item.sortOrder
    //       }
    //     }
    //   }
    // },
    // getSortSub(item){
    //   if (item.parentId){
    //     const order = this.getSortOrder(this.list, item.parentId)
    //     console.log(order, 'data')
    //     return order + '.'
    //   }
    // }
  }
}
</script>
<style lang="scss" >
.listMainItem {
  display: flex;
  justify-content: center;
  // border-bottom: solid 1px #e4e7ed;
  width: 100%;
  text-transform: uppercase;
  .el-checkbox {
    padding: 5px 10px;
    width: 100%;
  }
  &:hover {
    background-color: #f5f5f5;
    color: #363636;
    cursor: pointer;
  }
}
.listMainItemSub {
  display: flex;
  justify-content: center;
  font-size: 14px;
  width: 100%;
  .el-checkbox {
    padding: 5px 10px;
    width: 100%;
  }
  &:hover {
    background-color: #f5f5f5;
    color: #363636;
    cursor: pointer;
  }
}
.menuHider{
  padding-left: 10px;
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #606266;
  width: 20px;
}
</style>
