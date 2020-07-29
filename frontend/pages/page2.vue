<template>
  <div ref="content" v-loading="loading" class="newsOuter">
    <HeaderWithNavbar />
    <div id="content_area " class="center" style=" float: left; margin-top: 10px;">
      <div id="Header" style="width: 100%; height: 50px; margin:5% 5% 5% 5%;">
        Бүрдүүлэх материалын жагсаалт
      </div>
      <div id="body" style="float: left; margin-bottom: 5%;">
        <h4 class="title  headerTitle">
          {{ temp.title }}
          <button class="printButton button is-danger" @click="handleClickPrint()">
            <span class="icon">
              <i class="fa fa-floppy-o"></i>
            </span>
            <span>Татаж авах</span>
          </button>
        </h4>
        <a class="title"></a> <br><br>
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="temp.content" class="contents" />
        </div>
      </div>
    </div>

    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import ContentService from '~/services/ContentServices.js'
import foother from '~/components/foother.vue'
export default {
  components: {
    HeaderWithNavbar,
    foother
  },
  data () {
    return {
      loading: false,
      temp: {}
    }
  },
  watch () {
  },
  mounted () {
    if (this.$route.params) {
      this.getContent(this.$route.params.id)
      this.contentCount(this.$route.params.id)
      console.log('----NotWorking----')
    } else {
      this.$nuxt.$router.replace({ path: '/404' })
    }
  },
  methods: {
    getContent (id) {
      try {
        this.loading = true
        ContentService.getContentById(id).then((response) => {
          this.temp = response.data
          console.log('/////////////////-**---------------------------------', id)
          if (this.temp.contentCategoryIds && this.temp.contentCategoryIds.length > 0) {
            this.helpCategoryId = this.temp.contentCategoryIds[0].categoryId
          }
          if (this.temp.files && this.temp.files.length > 0) {
            this.files = this.temp.files.filter(c => c.fileType.includes('image'))
            this.videos = this.temp.files.filter(c => c.fileType.includes('video'))
            this.audios = this.temp.files.filter(c => c.fileType.includes('audio'))
          }
          this.loading = false
        })
      } catch (err) {
        this.loading = false
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    async contentCount (id) {
      try {
        await ContentService.incrementCount(id)
      } catch (err) {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    handleClickPrint () {
      let prtContent = '<h3>Уул уурхай</h3>'
      prtContent += this.$refs.content.innerHTML
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
      WinPrint.document.write(prtContent)
      WinPrint.document.close()
      WinPrint.print()
    }
  }
}

</script>
<style>
.center{display:block; margin-left:10% ; margin-right:10% ;padding:0%; }
.logo_mmhi {
width: 263px;
height: 82px;
object-fit: contain;
}

.text{
width: 1293px;
height: 665px;
font-family: SegoeUI;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: italic;
line-height: 1.36;
letter-spacing: normal;
text-align: left;
color: #000000;
}
.title{
font-weight: bold;
font-style: normal;
}
.headerTitle {
		padding: 20px 50px 20px 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		font-size: 18px;
		border-bottom: 1px solid black;
    min-height: 61px;
}
</style>
