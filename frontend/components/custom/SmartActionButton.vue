<template>
  <div>
    <el-row class="panel-group" style="width: 100%; padding:10px 10px 8px 10px;">
      <el-col
        :span="
          isNull(config.colSpan1) ? (isAdminUser ? 9 : 12) : config.colSpan1
        "
      >
        <el-tooltip
          key="create"
          effect="light"
          :content="'Шинээр бүртгэх'"
          placement="bottom"
        >
          <el-button v-if="isPermitted" style="padding:4px 7px;" plain @click="handleCreate">
            <i style="font-size:20px; color:#007AFF;" class="fa fa-plus" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          v-if="isPermitted &&
            (config.excludeButtons === undefined ||
            (!config.excludeButtons.includes('update') &&
            !config.excludeButtons.includes('ac01')))
          "
          key="update"
          effect="light"
          :content="'Засварлах'"
          placement="bottom"
        >
          <el-button
            v-if="isPermitted &&
              (config.excludeButtons === undefined ||
              (!config.excludeButtons.includes('update') &&
              !config.excludeButtons.includes('ac01')))
            "
            style="padding:4px 6px;  margin-left:15px;"
            plain
            @click="handleUpdate"
          >
            <i style="font-size:20px; color:#4CD964;" class="fa fa-edit" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          v-if="(config.excludeButtons === undefined ||
            (!config.excludeButtons.includes('view') &&
            !config.excludeButtons.includes('02')))
          "
          key="view"
          effect="light"
          :content="'Харах'"
          placement="bottom"
        >
          <el-button
            v-if="(config.excludeButtons === undefined ||
              (!config.excludeButtons.includes('view') &&
              !config.excludeButtons.includes('02')))
            "
            style="padding:4px 6px; margin-left:0px;"
            plain
            @click="handleView"
          >
            <i style="font-size:20px; color:#8E8E93;" class="fa fa-bullseye" />
          </el-button>
        </el-tooltip>
        <!-- <el-tooltip
          v-if="isPermitted &&
            (config.excludeButtons === undefined ||
            !config.excludeButtons.includes('remove'))
          "
          key="remove"
          effect="light"
          :content="'Идэвхигүй болгох'"
          placement="bottom"
        >
          <el-button
            v-if="isPermitted &&
              (config.excludeButtons === undefined ||
              !config.excludeButtons.includes('remove'))
            "
            style="padding:4px 6px;"
            plain
            @click="handleRemove"
          >
            <i style="font-size:20px; color:#FFCC00;" class="el-icon-remove-outline" />
          </el-button>
        </el-tooltip> -->
        <el-tooltip
          v-if="isPermitted &&
            (config.excludeButtons === undefined ||
            !config.excludeButtons.includes('delete'))
          "
          key="delete"
          effect="light"
          :content="'Устгах'"
          placement="bottom"
        >
          <el-button
            v-if="isPermitted &&
              (config.excludeButtons === undefined ||
              !config.excludeButtons.includes('delete'))
            "
            style="padding:4px 6px; margin-left:0px; margin-right:2px;"
            plain
            @click="handleDelete"
          >
            <i style="font-size:20px; color:#FF2D55;" class="fa fa-trash-alt" />
          </el-button>
        </el-tooltip>
        <!-- идвэхтэй болгох товч -->
        <!-- <el-tooltip
          v-if="isPermitted &&
            (config.excludeButtons === undefined ||
            !config.excludeButtons.includes('isActive'))
          "
          key="isActive"
          effect="light"
          :content="'Идэвхтэй болгох'"
          placement="bottom"
        >
          <el-button
            v-if="isPermitted &&
              (config.excludeButtons === undefined ||
              !config.excludeButtons.includes('isActive'))
            "
            style="padding:4px 6px;"
            plain
            @click="handleRestore"
          >
            <i style="font-size:18px; color:#C954EE;" class="fa fa-repeat" />
          </el-button>
        </el-tooltip> -->
        <!-- <el-dropdown
          v-if="
            config.includeButtons !== undefined &&
              config.includeButtons.includes('currenYear')
          "
          trigger="click"
          @command="handleSelectCurrentYear"
        >
          <el-button
            type="primary"
            style="padding: 5px 7px 4px 13px; font-size: 18px; font-weight: bold;"
          >
            {{ config.dateRange.currentYear
            }}
            <i
              class="el-icon-arrow-down el-icon--right"
            />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in config.currentYearOptions"
              :key="item"
              :style="
                'font-size: 18px; padding: 3px 20px;' +
                  (config.dateRange.currentYear === item
                    ? 'font-weight: bold;'
                    : '')
              "
              :command="item"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-date-picker
          v-if="
            config.includeButtons !== undefined &&
              config.includeButtons.includes('currentDateRange')
          "
          ref="dateSearch"
          v-model="config.dateRange.currentDateRange"
          class="input-with-select"
          size="small"
          type="daterange"
          unlink-panels
          :range-separator="'-с'"
          :start-placeholder="'Эхлэх өдөр'"
          style="width: 250px; top: -1px;"
          :end-placeholder="'Дуусах өдөр'"
          :picker-options="pickerOptions2"
          @change="handleChangeDateRange"
        />
        <!-- bagi nemsen -->
        <el-switch
          v-if="
            config.includeButtons !== undefined &&
              config.includeButtons.includes('isActive')
          "
          v-model="config.isActive"
          style="margin:0px 10px;"
          active-text="Амжилттай"
          inactive-text="Амжилтгүй"
          @change="handleChangeActive"
        />
        <!-- bagi nemsen -->
        <el-dropdown
          v-if="isPermitted &&
            (config.downloadItems &&
            config.downloadItems.length > 0 &&
            (config.excludeButtons === undefined ||
            !config.excludeButtons.includes('delete'))) &&
            false
          "
          trigger="click"
        >
          <el-button style="padding:4px 6px;" plain>
            <i style="font-size:20px; color:purple;" class="fa fa-download" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item v-if="config.downloadItems.includes('excel')"><span  v-on:click="handleDownloadExcel" style="display:block;"> {{$t('smartActionButtons.excel')}}</span></el-dropdown-item>
              <el-dropdown-item v-if="config.downloadItems.includes('pdf')"><span  v-on:click="handleDownloadPdf" style="display:block;">{{$t('smartActionButtons.pdf')}}</span></el-dropdown-item>
              <el-dropdown-item v-if="config.downloadItems.includes('word')"><span  v-on:click="handleDownloadWord" style="display:block;">{{$t('smartActionButtons.word')}}</span></el-dropdown-item>
            <el-dropdown-item v-if="config.downloadItems.includes('html')"><span  v-on:click="handleDownloadHtml" style="display:block;">{{$t('smartActionButtons.html')}}</span></el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <span v-else>&nbsp;</span>
        <!-- <el-tooltip effect="light" :content="$t('smartActionButtons.helpMenu')" placement="bottom" key="helpMenu"> -->
        <!-- <el-dropdown v-if="config.otherButtons && config.otherButtons.length > 0" trigger="click">
          <el-button style="padding:4px 6px;" plain>
            <i style="font-size:20px; color:purple;" class="fa fa-ellipsis-h" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="button in config.otherButtons"
              :key="button.code"
            >
              <span
                style="display:block; padding: 3px 0px; font-size:12px;"
                @click="handleOtherButtons(button.clickEvent)"
              >{{ button.code }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <!-- </el-tooltip> -->
        <el-button
          v-if="config.includeButtons !== undefined && config.includeButtons.includes('isChooseNormalTime')"
          plain
          type="success"
          style="padding: 6px;position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);"
          @click="handleChooseNormalTime"
        >
          Энгийн цагийн хуваарь сонгох
        </el-button>
        <span
          v-if="
            config.timeSheetDateRange && config.timeSheetDateRange.length > 0
          "
          class="timeSheetDateRange"
        >
          <span @click="handleBeforeMonth()">
            <i class="fa fa-chevron-circle-left" title="Өмнөх сар" />
          </span>
          {{ config.timeSheetDateRange[0] }} -
          {{ config.timeSheetDateRange[1] }}
          <span
            @click="handleAfterMonth"
          >
            <i class="fa fa-chevron-circle-right" title="Дараагын сар" />
          </span>
        </span>
        <el-checkbox
          v-if="
            config.includeButtons !== undefined &&
              config.includeButtons.includes('unchecked')
          "
          v-model="unchecked"
          @change="handleChangeUnchecked"
        >
          <span style="font-size: 12px; margin-right:10px;">Бөглөөгүй</span>
        </el-checkbox>
      </el-col>
      <el-col v-if="isAdminUser" :span="3">
        <el-checkbox
          v-model="isAdmin"
          border
          :disabled="disabledIsAdmin"
          style="float: right;  margin-top: 3px; margin-right: 7px;"
          @change="handleSearchIsAdmin"
        >
          <span>Админ хэрэглэгчид</span>
        </el-checkbox>
      </el-col>
      <el-col :span="config.colSpan2 || 12" align="right" style=" display:inline-flex;">
        <el-select
          v-model="selectedSearchItem"
          placeholder="Сонгох"
          size="small"
          style="width: 250px !important;"
        >
          <!-- <el-option v-if="!config.hideAllSearch" :label="allItem.text" :value="allItem" /> -->
          <el-option
            v-for="searchItem in config.searchOptions"
            :key="searchItem.value"
            :value="searchItem"
            :label="searchItem.text"
          />
        </el-select>
        <el-input
          v-if="selectedSearchItem.type === 'string'"
          ref="inputSearch"
          v-model="searchValue"
          :placeholder="'Утга оруулна уу'"
          class="input-with-select"
          width="200px"
          size="small"
          @input="updateSearchValue()"
          @change="handleSearch"
        />
        <el-input-number
          v-if="selectedSearchItem.type === 'number'"
          ref="inputSearch"
          v-model="searchValue"
          controls-position="right"
          :placeholder="'Утга оруулна уу'"
          class="input-with-select"
          width="200px"
          size="small"
          @input="updateSearchValue()"
          @change="handleSearch"
        />
        <el-date-picker
          v-if="selectedSearchItem.type === 'date'"
          ref="dateSearch"
          v-model="searchValue"
          class="input-with-select"
          style="width:500px;"
          size="small"
          type="daterange"
          unlink-panels
          :range-separator="'-с'"
          :start-placeholder="'Эхлэх өдөр'"
          :end-placeholder="'Дуусах өдөр'"
          :picker-options="pickerOptions2"
          @input="updateSearchValue()"
          @change="handleSearch"
        />
        <el-select
          v-if="selectedSearchItem.type === 'boolean'"
          ref="booleanSearch"
          v-model="searchValue"
          filterable
          closeable
          style="width:500px;"
          align="right"
          size="small"
          class="input-with-select"
          @input="updateSearchValue()"
          @change="handleSearch"
        >
          <el-option :label="'null'" :value="null" />
          <el-option :label="'Тийм'" :value="true" />
          <el-option :label="'Үгүй'" :value="false" />
        </el-select>
        <el-select
          v-if="selectedSearchItem.type === 'dropdown'"
          ref="dropdownSearch"
          v-model="searchValue"
          filterable
          closeable
          style="width:500px;"
          align="right"
          size="small"
          class="input-with-select"
          @input="updateSearchValue()"
          @change="handleSearch"
        >
          <el-option
            v-for="item in selectedSearchItem.items"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-cascader
          v-if="selectedSearchItem.type === 'cascade'"
          ref="cascadeSearch"
          v-model="searchValue"
          :show-all-levels="false"
          size="small"
          :options="selectedSearchItem.items"
          :props="props2"
          change-on-select
          style="width:500px;"
          class="input-with-select"
          @change="handleCascaderChange"
          @input="updateSearchValue()"
        />
        <el-tooltip key="search" effect="light" :content="'Хайх'">
          <el-button style="padding:3px 6px; margin:0px;" type="default" @click="handleSearch">
            <i style="font-size:20px; " class="fa fa-search" />
          </el-button>
        </el-tooltip>
        <!-- <el-tooltip effect="light" :content="'Дэлгэрэнгүй хайх'" key="searchDetail">
               <el-button v-if="config.excludeButtons === undefined || !config.excludeButtons.includes('searchDetail')" @click="showDialog" style="padding:3px 6px; margin:0px;" type="default">
                  <i style="font-size:20px; " class="fa fa-filter"/>
               </el-button>
        </el-tooltip>-->
        <el-tooltip key="refresh" effect="light" :content="'Дахин ачаалах'">
          <el-button class="refreshButton" type="default" @click="handleRefresh">
            <i style="font-size:20px; " class="fa fa-sync-alt" />
          </el-button>
        </el-tooltip>
        <!-- <el-tooltip effect="light" :content="'Тусламж'" key="help">
               <el-button v-if="config.excludeButtons === undefined || !config.excludeButtons.includes('help')" @click="handleHelp" style="padding:3px 6px; margin:0px;" type="default">
                  <i style="font-size:20px; " class="fa fa-question"/>
               </el-button>
        </el-tooltip> -->
        <!-- <el-tooltip v-if="config.excludeButtons === undefined || !config.excludeButtons.includes('settings')" effect="light" :content="'Тохиргоо'" key="settings">
               <el-button @click="handleSettings" v-if="config.excludeButtons === undefined || !config.excludeButtons.includes('settings')" style= "padding:3px 6px; margin:0px;">
                  <i style="font-size:20px; " class="fa fa-cog"/>
               </el-button>
        </el-tooltip> -->
      </el-col>
    </el-row>
    <!-- <el-full-dialog width="600px" :title="$t('smartActionButtons.searchDetail')" :visible.sync="dialogFormVisible" class="fullDialogSearch" append-to-body :before-close="handleCloseDetail">
         <el-form label-position="right" label-width="200px">
            <el-form-item  :label="searchItem.text" v-for="searchItem in config.searchOptions" :key="searchItem.value">
               <el-input v-on:input="updateSearchDetailValue(searchItem)" ref="inputSearch" v-if="searchItem.type === 'string'"
                  v-model="searchItem.searchValue" :placeholder="$t('smartActionButtons.pleaseInput')" class="input-with-select" style="width:100%;" size="small">
               </el-input>
               <el-input-number v-on:input="updateSearchDetailValue(searchItem)" ref="inputSearch" controls-position="right" v-if="searchItem.type === 'number'"
                  v-model="searchItem.searchValue" :placeholder="$t('smartActionButtons.pleaseInput')" class="input-with-select" style="width:100%;" size="small">
               </el-input-number>
               <el-date-picker v-model="searchItem.searchValue" v-on:input="updateSearchDetailValue(searchItem)"
                  v-if="searchItem.type === 'date'" class="input-with-select"  style="width:100%;" size="small" type="daterange"
                  unlink-panels :range-separator="$t('smartActionButtons.to')"
                  :start-placeholder="$t('smartActionButtons.start')" :end-placeholder="$t('smartActionButtons.start')"
                  :picker-options="pickerOptions2"></el-date-picker>
               <el-select v-model="searchItem.searchValue" v-on:input="updateSearchDetailValue(searchItem)"
                  filterable  v-if="searchItem.type === 'boolean'"  style="width:100%;"  align="right"   clearable  size="small"  class="input-with-select">
                  <el-option :label="$t('smartActionButtons.booleanNull')" :value="null"></el-option>
                  <el-option :label="$t('smartActionButtons.booleanTrue')" :value="true"></el-option>
                  <el-option :label="$t('smartActionButtons.booleanFalse')" :value="false"></el-option>
               </el-select>
               <el-select filterable  v-model="searchItem.searchValue" v-on:input="updateSearchDetailValue(searchItem)" @change="handleChangeSelect(searchItem)"
                  v-if="(searchItem.type === 'dropdown' || searchItem.type === 'cascade')"  style="width:100%;"  align="right"   size="small"  class="input-with-select">
                  <el-option label="сонгох.." :value="null"></el-option>
                  <el-option v-for="item in searchItem.items" :key="item.id" :label="item.name" :value="item.id"></el-option>
               </el-select>
               <el-select v-model="searchItem.searchValue" v-on:input="updateSearchDetailValue(searchItem)" clearable size="small" filterable value-key="id"
                @change="handleChangeSelect(searchItem)" v-if="searchItem.type === 'dropdownWithChildren'">
                <el-option-group v-for="group in searchItem.items" :key="group.id" :label="group.id">
                  <el-option v-for="item in group.children" :key="item.id" :label="item.name" :value="item" >
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSearchDetail">{{$t('smartActionButtons.search')}}</el-button>
            <el-button @click="handleFilterClear">{{$t('smartActionButtons.dialogClear')}}</el-button>
            <el-button @click="dialogFormVisible = false">{{$t('dialog.cancel')}}</el-button>
         </div>
    </el-full-dialog>-->
  </div>
</template>
<script>
// import FrontendRouterService from '@/services/settings/FrontendRouterService'
import { isNull, date2str } from '@/utils/Helper'
export default {
  name: 'SmartActionButtons',
  props:
  // [
  //   'config',
  //   'value',
  //   'colSpan1',
  //   'isAdminUser',
  //   'disabledIsAdmin',
  //   'printLoading'
  // ],
  {
    config: { type: Object, default: () => ({}) },
    // value: { type: String, default: '' },
    colSpan1: { type: Number, default: 0 },
    isAdminUser: { type: Boolean },
    disabledIsAdmin: { type: Boolean },
    printLoading: { type: Boolean },
    isPermitted: { type: Boolean }
  },
  data () {
    return {
      dialogFormVisible: false,
      allItem: {
        value: 'searchText',
        type: 'string',
        action: 'contains',
        text: 'Бүх багана',
        isDefault: true
      },
      selectedSearchItem: {},
      unchecked: true,
      routerActions: [],
      isAdmin: false,
      searchValue: null,
      searchValues: {},
      props2: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      options2: [
        {
          label: 'California',
          cities: []
        },
        {
          label: 'Florida',
          cities: []
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: 'Өмнөх 7 хоног',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Өмнөх сар',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Өмнөх 3 сар',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Энэ жил',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              start.setDate(1)
              start.setMonth(0)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  // computed: {
  //   routerLink() {
  //     return this.$router.currentRoute.meta.routerId
  //   }
  // },
  watch: {
    selectedSearchItem () {
      if (this.selectedSearchItem.type === 'string') {
        if (this.selectedSearchItem.searchValue === null) {
          this.searchValue = ''
        } else {
          this.searchValue = this.selectedSearchItem.searchValue
        }
      } else if (this.selectedSearchItem.type === 'date') {
        if (this.selectedSearchItem.searchValue === null) {
          this.searchValue = []
        } else {
          this.searchValue = this.selectedSearchItem.searchValue
        }
      } else if (this.selectedSearchItem.type === 'boolean') {
        this.searchValue = this.selectedSearchItem.searchValue
      } else if (
        this.selectedSearchItem.type === 'dropdown' ||
        this.selectedSearchItem.type === 'dropdownWithChildren'
      ) {
        this.searchValue = null
      } else if (this.selectedSearchItem.type === 'cascade') {
        this.searchValue = []
        this.$emit('resetCascaderItems', true)
      } else if (this.selectedSearchItem.type === 'number') {
        if (this.selectedSearchItem.searchValue === null) {
          this.searchValue = ''
        } else {
          this.searchValue = this.selectedSearchItem.searchValue
        }
      }
    },
    $route (val) {
      this.getRouterActions(this.$router.currentRoute.meta.routerId)
    }
  },
  created () {
    const defaultSel = this.config.searchOptions.find(c => c.isDefault)
    if (isNull(defaultSel)) {
      this.selectedSearchItem = this.allItem
    } else {
      this.selectedSearchItem = defaultSel
    }
    this.getRouterActions(this.$router.currentRoute.meta.routerId)
  },
  methods: {
    isNull,
    checkAction (action) {
      return this.routerActions.includes(action)
    },
    getRouterActions (routerId) {
      this.routerActions = ['create', 'update', 'view', 'delete']
      // FrontendRouterService.getUserCurrentActions(routerId).then(response => {
      //   // console.log('actions', response.data, this.routerLink)
      //   this.routerActions = response.data.actions
      this.$emit('createdActions', this.routerActions)
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    showDialog () {
      this.$emit('resetCascaderItems', false)
      this.selectedSearchItem = this.allItem
      this.dialogFormVisible = true
    },
    async handleCloseDetail () {
      await this.$emit('handleCloseDetail')
      this.dialogFormVisible = false
    },
    resetSearchValues () {
      this.searchValue = null
      for (let i = 0; i < this.config.searchOptions.length; i++) {
        this.config.searchOptions[i].searchValue = null
      }
    },
    updateSearchValue () {
      this.$emit('input', this.getJsonValue(this.selectedSearchItem))
    },
    handleChooseNormalTime () {
      this.$emit('handleChooseNormalTime')
    },
    getJsonValue (searchItem) {
      if (searchItem.type === 'string') {
        return JSON.parse(
          '{"' +
            this.selectedSearchItem.value +
            '": "' +
            this.searchValue +
            '"}'
        )
      } else if (
        this.selectedSearchItem.type === 'date' &&
        this.selectedSearchItem.action === 'between'
      ) {
        if (this.searchValue && this.searchValue.length === 2) {
          return JSON.parse(
            '{"' +
              this.selectedSearchItem.value +
              '": ["' +
              this.searchValue[0] +
              '", "' +
              this.searchValue[1] +
              '"]}'
          )
        }
      } else if (this.selectedSearchItem.type === 'boolean') {
        return JSON.parse(
          '{"' + this.selectedSearchItem.value + '": ' + this.searchValue + '}'
        )
      } else if (searchItem.type === 'number') {
        return JSON.parse(
          '{"' + this.selectedSearchItem.value + '": ' + this.searchValue + '}'
        )
      } else if (
        searchItem.type === 'cascade' &&
        !isNull(this.searchValue) &&
        this.searchValue.length > 0
      ) {
        return JSON.parse(
          '{"' +
            this.selectedSearchItem.value +
            '": "' +
            this.searchValue[this.searchValue.length - 1] +
            '"}'
        )
      } else {
        return JSON.parse(
          '{"' +
            this.selectedSearchItem.value +
            '": "' +
            this.searchValue +
            '"}'
        )
      }
    },
    getJsonValues (searchItem) {
      if (searchItem.type === 'string') {
        return JSON.parse(
          '{"' + searchItem.value + '": "' + searchItem.searchValue + '"}'
        )
      } else if (
        searchItem.type === 'date' &&
        searchItem.action === 'between'
      ) {
        if (searchItem.searchValue && searchItem.searchValue.length === 2) {
          return JSON.parse(
            '{"' +
              searchItem.value +
              '": ["' +
              searchItem.searchValue[0] +
              '", "' +
              searchItem.searchValue[1] +
              '"]}'
          )
        }
      } else if (searchItem.type === 'boolean') {
        return JSON.parse(
          '{"' + searchItem.value + '": ' + searchItem.searchValue + '}'
        )
      } else if (searchItem.type === 'number') {
        return JSON.parse(
          '{"' + searchItem.value + '": ' + searchItem.searchValue + '}'
        )
      } else {
        return JSON.parse(
          '{"' + searchItem.value + '": "' + searchItem.searchValue + '"}'
        )
      }
    },
    updateSearchDetailValue (searchItem) {
      let isHave = false
      for (const key in this.searchValues) {
        if (
          this.searchValues[key] !== undefined &&
          this.searchValues[key] !== null
        ) {
          if (key === searchItem.value) {
            isHave = true
            this.searchValues[key] = searchItem.searchValue
            break
          }
        }
      }
      if (!isHave) {
        this.searchValues[searchItem.value] = searchItem.searchValue
      }
      this.$emit('input', this.searchValues)
    },
    async handleCascaderChange (val) {
      if (val.length === 1 || val.length === 2) {
        await this.$emit('getChildren', val, this.selectedSearchItem)
      }
      if (val.length === this.selectedSearchItem.level + 1) {
        this.handleSearch()
      }
    },
    handleChangeSelect (val) {
      this.$emit('getSubItems', val)
    },
    handleBeforeMonth () {
      const parts = this.config.timeSheetDateRange[0].split('-')
      const mydate = new Date(parts[0], parts[1] - 1, parts[2])
      const mydate1 = new Date(parts[0], parts[1] - 1, parts[2])
      mydate.setMonth(mydate1.getMonth() - 1)
      mydate1.setDate(mydate1.getDate() - 1)
      this.$emit('handleBeforeMonth', [
        date2str(mydate, 'yyyy-MM-dd'),
        date2str(mydate1, 'yyyy-MM-dd')
      ])
    },
    handleAfterMonth () {
      const parts = this.config.timeSheetDateRange[0].split('-')
      const mydate = new Date(parts[0], parts[1] - 1, parts[2])
      const mydate1 = new Date(parts[0], parts[1] - 1, parts[2])
      mydate.setMonth(mydate1.getMonth() + 1)
      mydate1.setMonth(mydate1.getMonth() + 2)
      mydate1.setDate(mydate1.getDate() - 1)
      this.$emit('handleAfterMonth', [
        date2str(mydate, 'yyyy-MM-dd'),
        date2str(mydate1, 'yyyy-MM-dd')
      ])
    },
    handleCreate () {
      this.$emit('handleCreate')
    },
    handleUpdate () {
      this.$emit('handleUpdate')
    },
    handleView () {
      this.$emit('handleView')
    },
    handlePrint () {
      this.$emit('handlePrint')
    },
    handleRemove () {
      this.$emit('handleRemove')
    },
    handleRestore () {
      this.$emit('handleRestore')
    },
    handleRemoveStatusBook () {
      this.$emit('handleRemoveStatusBook')
    },
    handleDelete () {
      this.$emit('handleDelete')
    },
    handleDownloadExcel () {
      this.$emit('handleDownloadExcel')
    },
    handleDownloadPdf () {
      this.$emit('handleDownloadPdf')
    },
    handleDownloadWord () {
      this.$emit('handleDownloadWord')
    },
    handleDownloadHtml () {
      this.$emit('handleDownloadHtml')
    },
    handleOtherButtons (val) {
      this.$emit(val)
    },
    handleSearch () {
      this.isAdmin = false
      this.$emit('handleSearch')
    },
    handleHelp () {
      this.$emit('handleHelp')
    },
    handleSearchIsAdmin (val) {
      this.$emit('handleSearchIsAdmin', this.isAdmin)
    },
    handleChangeUnchecked () {
      this.$emit('handleChangeUnchecked', this.unchecked)
    },
    handleSearchDetail () {
      this.isAdmin = false
      this.dialogFormVisible = false
      this.handleSearch()
    },
    handleFilterClear () {
      this.searchValues = {}
      this.resetSearchValues()
      this.$emit('input', this.searchValues)
      // this.dialogFormVisible = false
      // this.handleSearch()
    },
    handleRefresh () {
      this.isAdmin = false
      this.searchValues = {}
      this.resetSearchValues()
      this.$emit('input', this.searchValues)
      this.selectedSearchItem = this.allItem
      this.$emit('handleRefresh')
    },
    handleSelectCurrentYear (command) {
      // console.log('command', command)
      this.config.dateRange.currentYear = command
      const start = new Date()
      const end = new Date()
      // console.log('start.getFullYear ', start.getFullYear())
      if (start.getFullYear() === this.config.dateRange.currentYear) {
        start.setDate(1)
        start.setMonth(0)
      } else {
        start.setFullYear(this.config.dateRange.currentYear)
        start.setDate(1)
        start.setMonth(0)
        end.setFullYear(this.config.dateRange.currentYear + 1)
        end.setDate(1)
        end.setMonth(0)
        end.setDate(end.getDate() - 1)
      }
      this.config.dateRange.currentDateRange = [start, end]
      this.handleChangeDateRange()
    },
    handleChangeDateRange () {
      this.$emit(
        'handleChangeDateRange',
        this.config.dateRange.currentDateRange
      )
    },
    handleChangeActive () {
      this.$emit('handleChangeActive', this.config.isActive)
    },
    handleSettings () {
      this.$emit('handleSettings')
    }
  }
}
</script>
<style scope>
.el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-range-editor--small.el-input__inner {
  height: 32px;
  line-height: 32px;
}
.fullDialogSearch .el-input--small .el-input__inner {
  height: 24px;
  line-height: 24px;
}
.fullDialogSearch .el-range-editor--small.el-input__inner {
  height: 24px;
  line-height: 24px;
}
.panel-group .refreshButton {
  padding: 3px 6px;
  margin: 0px;
}
.panel-group .refreshButton svg:active {
  -webkit-animation-name: spin;
  -webkit-animation-duration: 4000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 4000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 4000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;

  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}
@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
