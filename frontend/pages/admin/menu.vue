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
    <ul class="mainDataTable" style="height:calc(100% - 40px); padding:20px;">
      <template v-for="(element, index1) in list">
        <admin-menu-item :element="element" :index="index1" :key="element.id" @click="handleClickMenuHider($event)" @change="handleSelectionChange($event)" />
      </template>
    </ul>
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
          <el-form-item :label="'Нэр'" prop="name">
            <label v-if="dialogStatus == 'view'">{{ temp.name }}</label>
            <el-input v-else v-model="temp.name" size="mini" />
          </el-form-item>
          <el-form-item :label="'Нэр /Англи/'" prop="nameEn">
            <label v-if="dialogStatus == 'view'">{{ temp.nameEn }}</label>
            <el-input v-else v-model="temp.nameEn" size="mini" />
          </el-form-item>
          <el-form-item :label="'Харьяалагдах цэс'" prop="parentId">
            <label v-if="dialogStatus=='view' ">{{ temp.parentId }}</label>
            <el-cascader
              v-else
              v-model="temp.parentId"
              :show-all-levels="false"
              :collapse-tags="false"
              :options="setDesabledItem(list, temp.id)"
              :props="{ checkStrictly: true }"
              clearable
            />
          </el-form-item>
          <el-form-item :label="'Эрэмбэ'" prop="sortOrder">
            <label v-if="dialogStatus == 'view'">{{ temp.sortOrder }}</label>
            <el-input
              v-model="temp.sortOrder"
            />
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
  // checkValidSubArray
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
      menuViewTypeList: [],
      menuTypeList: [],
      temp: {
        id: null,
        menuViewTypeId: null,
        menuTypeId: 1,
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
    setChildDisable1 (item, disabled) {
      if (item.children && item.children.length > 0) {
        for (const i of item.children) {
          i.disabled = disabled
          if (i.children && i.children.length > 0) {
            for (const kk of i.children) {
              kk.disabled = disabled
            }
          }
        }
      }
    },
    setChildDisable (i, id) {
      if (i.children && i.children.length > 0) {
        for (const k of i.children) {
          if (k.value === id) {
            k.disabled = true
            this.setChildDisable1(k, true)
          } else {
            this.setChildDisable1(k, false)
          }
          this.setChildDisable(k, id)
        }
      }
    },
    // cascadийн disable-ийг тохируулж байна. Энэ кодыг сайжруулах !!!!
    setDesabledItem (list, id) {
      if (this.dialogFormVisible) {
        for (const item of list) {
          item.disabled = false
          if (item.value === id) {
            item.disabled = true
            this.setChildDisable1(item, true)
          } else {
            this.setChildDisable1(item, false)
          }
          this.setChildDisable(item, id)
        }
      }
      return list
    },
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
      console.log(this.menuViewTypeList, 'menuViewTypeList------------------------------')
      this.menuTypeList = (await MenuTypeServices.index()).data
      // this.cascadeList = (await MenuServices.cascadeList()).data;
    },
    createdActions (val) {
      this.routerActions = val
    },
    getList () {
      this.listLoading = true
      MenuServices.cascadeList().then((response) => {
        this.list = response.data
        this.listLoading = false
      }).catch((err) => {
        this.list = []
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
      if (val.selected) {
        this.selectedTemps.push(val)
      } else {
        const index = this.selectedTemps.indexOf(val)
        this.selectedTemps.splice(index, 1)
      }
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
      // console.log(this.selectedTemps, ' this.selectedTemps this.selectedTemps')
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
      MenuServices.findById(this.selectedTemps[0]).then((response) => {
        // console.log(response, 'response response')
        this.dialogFormVisible = true
        this.resetTemp()
        this.temp = response.data
        this.dialogStatus = 'update'
        this.$nextTick(() => {
          this.$refs.dataForm.clearValidate()
        })
      }).catch(function (error) {
        this.$message({
          type: 'error',
          message: error
        })
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
      // this.temp = Object.assign(
      //   {},
      //   this.selectedTemps[this.viewCurrentPage - 1]
      // );
      MenuServices.findById(this.selectedTemps[0]).then((response) => {
        // console.log(response, 'response response')
        this.dialogStatus = 'view'
        this.dialogFormVisible = true
        this.resetTemp()
        this.temp = response.data
        this.$nextTick(() => {
          this.$refs.dataForm.clearValidate()
        })
      }).catch(function (error) {
        this.$message({
          type: 'error',
          message: error
        })
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
        MenuServices.manyDelete(this.selectedTemps[0]).then((response) => {
          // this.handleSelectionChange(response.data)
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
        menuTypeId: 1,
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
          if (this.temp.parentId.length > 3) {
            return this.$message({ type: 'warning', message: '3 дээш салбарласан туслах цэс байх боломжгүй' })
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
          if (this.temp.parentId.length > 3) {
            return this.$message({ type: 'warning', message: '3 дээш салбарласан туслах цэс байх боломжгүй' })
          } else {
            this.temp.parentId = this.temp.parentId[this.temp.parentId.length - 1]
          }
        }
        removeAtts(this.temp)
        this.fullscreenLoading = true
        // console.log(this.temp, 'hadgalah')
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
  &:hover {
    color: #303133;
  }
}
</style>
