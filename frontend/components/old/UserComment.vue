<template>
  <div style="margin:50px 20px 20px 100px !important;">
    <p>{{ commentId }}</p>
    <article v-for="item in temp.commentIds" :key="item.id" class="message">
      <div class="message-body">
        <strong style="float:left">{{ item.author }}</strong>
        <p class="subtitle">
          <i class="fas fa-clock" style="margin-left:20px;" />
          {{ moment(item.createdAt).format("YYYY-MM-DD") }}
        </p>
        <p>
          {{ item.text }}
        </p>
      </div>
    </article>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '../../frontend/services/ContentServices'
export default {
  name: 'UserComment',
  components: {
  },
  props: {
    commentId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      listQuery: {
        currentPage: 1,
        limit: 3,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          contentId: this.commentId
        }
      },
      temp: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    moment,
    getData () {
      ContentServices.index(this.listQuery).then((response) => {
        this.temp = response.data.rows
        // console.log(this.temp, 'commentsymaa')
      }).catch((err) => {
        this.temp = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    }
  }
}
</script>
