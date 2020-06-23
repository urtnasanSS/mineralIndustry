<template>
  <div>
    <div v-loading="loading" class="newsOuter">
      <GroupTitle :name="'Түгээмэл асуулт хариулт'" />
      <el-collapse accordion>
        <div v-if="this.$store.state.language.language.code == 'mn'">
          <el-collapse-item v-for="( item, index ) in list" :key="item.id" :name="item.id">
            <template slot="title">
              <span style="font-weight:bold; text-transform:uppercase">{{ index + 1 }}. {{ item.answer }}</span>
              <!-- <i class="header-icon el-icon-info"></i> -->
            </template>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="item.question" class="contents" />
          </el-collapse-item>
        </div>
        <div v-else>
          <el-collapse-item v-for="( item, index ) in list" :key="item.id" :name="item.id">
            <template slot="title">
              <span style="font-weight:bold; text-transform:uppercase">{{ index + 1 }}. {{ item.answerEn }}</span>
              <!-- <i class="header-icon el-icon-info"></i> -->
            </template>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="item.questionEn" class="contents" />
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import GroupTitle from '~/components/custom/GroupTitle.vue'
import FaqsServices from '~/services/FaqsServices'
export default {
  layout: 'contentLayout',
  name: 'FaqNews',
  components: {
    GroupTitle
  },
  data () {
    return {
      loading: false,
      list: []
    }
  },
  watch: {},
  mounted () {
    this.getList()
  },
  destroyed () {},
  methods: {
    async getList () {
      this.loading = true
      try {
        const data = (await FaqsServices.index()).data
        // console.log(data, 'dataaaaaaa')
        this.list = data
        this.loading = false
      } catch (err) {
        this.loading = false
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    createStr(item) {
      item.newStr = item.str
      item.newStr = item.newStr.replace('###', item.current)
      return item.newStr
    }
  }
}
</script>
<style lang="scss" scoped>
.newsOuter {
  padding-left: 10px;
  .contents {
    /deep/ ul {
      margin-left: 40px;
    }
    /deep/ ol {
      margin-left: 40px;
    }
  }
  ul {
    margin-top: 34px;
    margin-bottom: 20px;
    li {
      padding: 8px 0;
    &:hover {
      text-decoration: underline;
      font-weight: bold;
    }
    &:hover:before {
      background-color: black;
    }
    &:before {
      display: inline-block;
      content: '';
      -webkit-border-radius: 0.375rem;
      border-radius: 0.375rem;
      height: 0.55rem;
      width: 0.55rem;
      margin-right: 0.5rem;
      background-color: #bdbdbd;
    }
    }
  }
}
</style>
