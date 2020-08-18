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
      <el-table-column align="center" :label="'№'" prop="id" width="40">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <span>
              {{
                list.indexOf(scope.row) +
                  (listQuery.currentPage - 1) * listQuery.limit +
                  1
              }}
            </span>
          </div>
          <div v-else>
            <span class="dataTableTextNotActive">
              {{
                list.indexOf(scope.row) +
                  (listQuery.currentPage - 1) * listQuery.limit +
                  1
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Онцлох" width="59">
        <template slot-scope="scope">
          <div style="position: relative; height: 25px; width: 25px;">
            <el-button
              :disabled="!isPermitted"
              :title="scope.row.isSpecial ? 'Мэдээг онцолсныг буцаах': 'Мэдээг онцлох'"
              :type="scope.row.isSpecial ? 'primary': ''"
              icon="el-icon-star-off"
              style="padding:4px; z-index:5; position:absolute; top:0; left: 25%;"
              circle
              @click="handleClickStar(scope.row)"
            />
          </div>
          <!-- <el-button @click="handleClickStar" type="text" size="small">Detail</el-button> -->
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Шуурхай" width="65">
        <template slot-scope="scope">
          <div style="position: relative; height: 25px; width: 25px;">
            <el-button
              :disabled="!isPermitted"
              :title="scope.row.isStopPress ? 'Шуурхайг болих': 'Шуурхай болгох'"
              :type="scope.row.isStopPress ? 'danger': ''"
              icon="el-icon-star-off"
              style="padding:4px; z-index:5; position:absolute; top:0; left: 25%;"
              circle
              @click="handleClickStopPress(scope.row)"
            />
          </div>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="'Файлын төрөл'" prop="title" width="97">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <div v-if="scope.row.files.length>0">
              <div v-for="(file, count) in scope.row.files.filter(c=> c.fileType.includes('image'))" :key="count.id">
                <p v-if="count == 0">
                  Зураг
                </p>
              </div>
              <div v-for="(value, count) in scope.row.files.filter(c=> c.fileType.includes('video'))" :key="count.id">
                <p v-if="count == 0">
                  Видео
                </p>
              </div>
              <div v-for="(item, count) in scope.row.files.filter(c=> c.fileType.includes('audio'))" :key="count.id">
                <p v-if="count == 0">
                  Аудио
                </p>
              </div>
            </div>
            <div v-else>
              Файл байхгүй
            </div>
          </div>
          <div v-else>
            <div v-if="scope.row.files.length>0" style="text-decoration: line-through; color: #fc0!important;">
              <div v-for="(file, count) in scope.row.files.filter(c=> c.fileType.includes('image'))" :key="count.id">
                <p v-if="count == 0">
                  Зураг
                </p>
              </div>
              <div v-for="(value, count) in scope.row.files.filter(c=> c.fileType.includes('video'))" :key="count.id">
                <p v-if="count == 0">
                  Видео
                </p>
              </div>
              <div v-for="(item, count) in scope.row.files.filter(c=> c.fileType.includes('audio'))" :key="count.id">
                <p v-if="count == 0">
                  Аудио
                </p>
              </div>
            </div>
            <div v-else style="text-decoration: line-through; color: #fc0!important;">
              Файл байхгүй
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'Зураг'" prop="title" width="60">
        <template slot-scope="scope">
          <!-- <pre class="coder">{{scope.row.files.filter(c=> c.isDelete === false && c.fileType.includes('image'))}}</pre> -->
          <el-image
            v-for="file in scope.row.files.filter(c=> c.isDelete === false && c.fileType.includes('image'))"
            :key="file.id"
            style="width: 35px; height: 35px; padding-top:5px; "
            :src="file.url"
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="left" :label="'Гарчиг'" prop="title" width="auto">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <div v-if="scope.row.title" class="dataTableText">
              {{ scope.row.title }}
            </div>
          </div>
          <div v-else>
            <div v-if="scope.row.title" class="dataTableTextNotActive">
              {{ scope.row.title }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="left" :label="'Хураангуй'" prop="description" width="auto">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <div v-if="scope.row.description" class="dataTableText">
              {{ scope.row.description }}
            </div>
          </div>
          <div v-else>
            <div v-if="scope.row.description" class="dataTableTextNotActive">
              {{ scope.row.description }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'Цэс'" prop="menu" width="170">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <div v-if="scope.row.contentMenuIds && scope.row.contentMenuIds[0]">
              <span
                :class="`tag ${getTagColor(scope.row.contentMenuIds[0].menuId, menuList)}`"
                style="margin-right:5px; margin-top:5px;"
              >{{ getListName(scope.row.contentMenuIds[0].menuId, menuList) }}</span>
              <span v-if="scope.row.contentMenuIds.length > 1">
              </span>
            </div>
          </div>
          <div v-else class="dataTableTextNotActive">
            <div v-if="scope.row.contentMenuIds && scope.row.contentMenuIds[0]">
              <span
                :class="`tag ${getTagColor(scope.row.contentMenuIds[0].menuId, menuList)}`"
                style="margin-right:5px; margin-top:5px;"
              >{{ getListName(scope.row.contentMenuIds[0].menuId, menuList) }}</span>
              <span v-if="scope.row.contentMenuIds.length > 1">
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'Категори'" prop="category" width="170">
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <div v-if="scope.row.contentCategoryIds && scope.row.contentCategoryIds[0]">
              <span
                :class="`tag ${getTagColor(scope.row.contentCategoryIds[0].categoryId, categoryList)}`"
                style="margin-right:5px; margin-top:5px;"
              >{{ getListName(scope.row.contentCategoryIds[0].categoryId, categoryList) }}</span>
              <span v-if="scope.row.contentCategoryIds.length > 1">
                <el-popover placement="bottom" width="100" trigger="click">
                  <span
                    v-for="item in scope.row.contentCategoryIds.slice(1, 100)"
                    :key="item.id"
                    :class="`tag ${getTagColor(item.categoryId, categoryList)}`"
                    style="margin-right:5px; margin-top:5px; width:100%;"
                  >{{ getListName(item.categoryId, categoryList) }}</span>
                  <span slot="reference">+{{ scope.row.contentCategoryIds.length -1 }}</span>
                </el-popover>
              </span>
            </div>
          </div>
          <div v-else class="dataTableTextNotActive">
            <div v-if="scope.row.contentCategoryIds && scope.row.contentCategoryIds[0]">
              <span
                :class="`tag ${getTagColor(scope.row.contentCategoryIds[0].categoryId, categoryList)}`"
                style="margin-right:5px; margin-top:5px;"
              >{{ getListName(scope.row.contentCategoryIds[0].categoryId, categoryList) }}</span>
              <span v-if="scope.row.contentCategoryIds.length > 1">
                <el-popover placement="bottom" width="100" trigger="click">
                  <span
                    v-for="item in scope.row.contentCategoryIds.slice(1, 100)"
                    :key="item.id"
                    :class="`tag ${getTagColor(item.categoryId, categoryList)}`"
                    style="margin-right:5px; margin-top:5px; width:100%;"
                  >{{ getListName(item.categoryId, categoryList) }}</span>
                  <span slot="reference">+{{ scope.row.contentCategoryIds.length -1 }}</span>
                </el-popover>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="'Нийтлэх огноо'"
        prop="publishDate"
        width="120px"
        sortable
      >
        <template slot-scope="scope">
          <div v-if="scope.row.isActive === true">
            <span
              v-if="scope.row.publishDate"
            >{{ moment(scope.row.publishDate).format("YYYY-MM-DD") }}</span>
          </div>
          <div v-else class="dataTableTextNotActive">
            <span
              v-if="scope.row.publishDate"
            >{{ moment(scope.row.publishDate).format("YYYY-MM-DD") }}</span>
          </div>
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
    <content-drawer
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
import ContentServices from '../../services/ContentServices'
import BannerTypeServices from '../../services/BannerTypeServices'
import MenuServices from '../../services/MenuServices'
import CategoryServices from '../../services/CategoryServices'
import ContentDrawer from '../../components/ContentDrawer'
import SmartActionButton from '@/components/custom/SmartActionButtonRemoveRestore'
import {
  isNull
  // getKeyAttributeValue,
  // validateShowMessage,
  // checkValidSub,
  // checkValidSubArray,
  // removeAtts
} from '@/utils/Helper'
export default {
  name: '',
  components: {
    'smart-action-buttons': SmartActionButton,
    'content-drawer': ContentDrawer
  },
  layout: 'adminLayout',
  data () {
    return {
      audios: [],
      videos: [],
      image: [],
      allpicture: [],
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
            value: 'title',
            type: 'string',
            action: 'contains',
            text: 'Гарчиг',
            searchValue: null
          },
          {
            value: 'description',
            type: 'string',
            action: 'contains',
            text: 'Хураангуй',
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
        title: '',
        titleEn: '',
        description: '',
        descriptionEn: '',
        content: '',
        contentEn: '',
        count: 0,
        isHideComments: false,
        isSpecial: false,
        isStopPress: false,
        publishDate: new Date(),
        menuId: [],
        categoryId: [],
        files: [],
        // haveAudio: false,
        // haveVideo: false,
        haveUploadVideo: false,
        youtubeIframe: '',
        isActive: true,
        isDelete: false
      },
      buttonStatus: 'saveAndClose',
      buttonMap: {
        save: 'Хадгалах',
        saveAndView: 'Хадгалаад харах',
        saveAndNew: 'Хадгалаад шинэ',
        saveAndClose: 'Хадгалаад хаах'
      },
      fullscreenLoading: false,
      routerActions: [],
      selectedTemps: [],
      bannerTypeList: [],
      imgSrc: '',
      cropImg: '',
      categoryList: [],
      menuList: []
    }
  },
  computed: {
    isPermitted() {
      return ['1', '2'].includes(this.$store.getters.userKey.role)
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
    createdActions (val) {
      this.routerActions = val
    },
    getListName (value, list) {
      // if (isNullOrEmpty(values)){
      const data = list.find(i => i.id === value)
      if (!isNull(data)) {
        return data.name
      }
      // } else {
      //   return values.name
      // }
    },
    getTagColor (value, list) {
      const data = list.find(i => i.id === value)
      if (!isNull(data)) {
        return data.color
      }
    },
    getList () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      this.listLoading = true
      ContentServices.indexAdmin(this.listQuery)
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
      this.bannerTypeList = (await BannerTypeServices.index()).data
      this.menuList = (await MenuServices.index()).data
      this.categoryList = (await CategoryServices.index()).data
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
    handleCreate () {
      this.dialogFormVisible = true
      this.resetTemp()
      this.dialogStatus = 'create'
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleCloseDialog () {
      this.dialogFormVisible = false
    },
    handleUpdate () {
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
      this.selectedTemps[0].categoryId = []
      if (this.selectedTemps[0].contentCategoryIds) {
        for (const item of this.selectedTemps[0].contentCategoryIds) {
          this.selectedTemps[0].categoryId.push(item.categoryId)
        }
      }
      this.selectedTemps[0].menuId = []
      if (this.selectedTemps[0].contentMenuIds) {
        for (const item of this.selectedTemps[0].contentMenuIds) {
          this.selectedTemps[0].menuId.push(item.menuId)
        }
      }
      // console.log(this.selectedTemps[0], 'item')
      this.resetTemp()
      this.temp = JSON.parse(JSON.stringify(this.selectedTemps[0]))
      console.log('---------this.baseUrl----------------', this.baseUrl)
      console.log('---------this.temp----------------', this.temp)
      this.$nextTick(() => {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      })
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
      //   this.$refs["dataForm"].clearValidate();
      // });
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
    handleRemove () {
      if (this.selectedTemps.length === 0) {
        return this.$message({
          type: 'warning',
          message: 'Мөр сонгоогүй байна.'
        })
      }
      this.$confirm('Та сонгогдсон утгуудыг идэвхгүй болгохдоо итгэлтэй байна уу?', 'Анхааруулга', {
        type: 'warning'
      })
        .then(() => {
          ContentServices.manyRemove(this.selectedTemps)
            .then((response) => {
              this.$notify({
                title: 'Амжилттай',
                message: 'Идэвхгүй болголоо',
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
    handleRestore () {
      if (this.selectedTemps.length === 0) {
        return this.$message({
          type: 'info',
          message: 'Мөр сонгоогүй байна.'
        })
      }
      this.$confirm('Та сонгогдсон утгуудыг идэвхитэй болгохдоо итгэлтэй байна уу?', 'Анхааруулга', {
        type: 'warning'
      })
        .then(() => {
          ContentServices.manyRestore(this.selectedTemps)
            .then((response) => {
              this.$notify({
                title: 'Амжилттай',
                message: 'Идэвхтэй болголоо',
                type: 'success',
                duration: '2000'
              })
            })
        })
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
          ContentServices.manyDelete(this.selectedTemps)
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
    resetTemp () {
      this.temp = {
        id: null,
        title: '',
        titleEn: '',
        description: '',
        descriptionEn: '',
        content: '',
        contentEn: '',
        count: 0,
        isSpecial: false,
        isStopPress: false,
        isHideComments: false,
        publishDate: new Date(),
        menuId: [],
        categoryId: [],
        files: [],
        // haveAudio: false,
        // haveVideo: false,
        haveUploadVideo: false,
        youtubeIframe: '',
        isActive: true,
        isDelete: false
      }
    },
    resetListQuery () {
      this.listQuery.currentPage = 1
      this.listQuery.search = {}
    },
    handleClickStar (item) {
      // console.log("handleClickStar", item);
      this.$confirm(
        `Та <strong> ${item.title}</strong> гарчигтай мэдээг <span class="tag ${
          item.isSpecial ? ' is-warning' : 'is-success'
        }"> ${
          item.isSpecial ? 'Онцолсныг буцаахдаа' : 'Онцлохдоо'
        }</span> итгэлтэй байна уу `,
        'Мэдэгдэл',
        {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Үгүй',
          type: 'info',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          if (item.isSpecial) {
            item.isSpecial = false
          } else {
            item.isSpecial = true
          }
          ContentServices.putSpecial(item)
            .then((response) => {
              // console.log(response, ' response')
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
              // this.saveSuccess();
              // // updatedNotify(this);
              // this.fullscreenLoading = false;
            })
            .catch((error) => {
              this.fullscreenLoading = false
              // this.$message({
              //   type: "warning",
              //   message: "Хадгалагдлаа"
              // });
              return this.$message({
                type: 'warning',
                message: error.response.data.error
              }) // ЭСВЭЛ АЛДАА ГАРВАЛ BACKEND-С ИРЖ БАЙГАА АЛДААНЫ МЕССЕЖИЙГ ХЭРЭГЛЭГЧИД ХАРУУЛАХ
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Цуцлагдлаа'
          })
        })
    },
    handleClickStopPress (item) {
      // console.log("handleClickStar", item);
      this.$confirm(
        `Та <strong> ${item.title}</strong> гарчигтай мэдээг <span class="tag ${
          item.isStopPress ? ' is-warning' : 'is-success'
        }"> ${
          item.isStopPress ? 'Шуурхайг буцаахдаа' : 'Шуурхай болгохдоо'
        }</span> итгэлтэй байна уу `,
        'Мэдэгдэл',
        {
          confirmButtonText: 'Тийм',
          cancelButtonText: 'Үгүй',
          type: 'info',
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          if (item.isStopPress) {
            item.isStopPress = false
          } else {
            item.isStopPress = true
          }
          ContentServices.putStopPress(item)
            .then((response) => {
              // console.log(response, " response");
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
              // this.saveSuccess();
              // // updatedNotify(this);
              // this.fullscreenLoading = false;
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Цуцлагдлаа'
          })
        })
    }
  }
}
</script>
<style lang="scss" >
/* Style Two */
.dataTableText{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dataTableTextNotActive{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: line-through;
  color: #fc0!important;
}
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
