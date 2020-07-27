<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area " class="center" style=" float: left; margin-top: 10px;">
      <div id="Header" style="width: 100%; height: 50px; margin:5% 5% 5% 5%;">
        <a1
          style="width: 372px;
          height: 31px;
          font-family: SegoeUI;
          font-size: 23px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.35;
          letter-spacing: normal;
          text-align: left;
          color: #000000;
          float: left;"
        >
          Бүрдүүлэх материалын жагсаалт
        </a1>
        <div>
          <button class="printButton button is-danger" @click="handleClickPrint()">
            <span class="icon">
              <i class="fa fa-floppy-o"></i>
            </span>
            <span>Татаж авах</span>
          </button>
        </div>
      </div>
      <div id="body" style="float: left; margin-bottom: 5%;">
        <h4 class="title  headerTitle">
          {{ lang == 'mn' ? temp.title : temp.titleEn }}
        </h4>
        <a class="title"></a> <br><br>

        <a class="title">3. Жижиглэнгийн худалдаа эрхлэх тусгай зөвшөөрөл хүсэгч нь дараах бичиг баримтуудыг бүрдүүлж ирүүлнэ.</a><br><br>
        <a class="text"> Үүнд:<br><br>

          Аж ахуйн үйл ажиллагааны тусгай зөвшөөрлийн тухай хуулийн 11 дүгээр зүйлийн 11.1.1, 11.1.2-т заасан тусгай зөвшөөрөл хүссэн хүсэлт, тусгай зөвшөөрөл хүсэгчийн улсын бүртгэлийн гэрчилгээ,<br>
          Холбогдох мэргэжлийн холбооны гишүүн хуулийн этгээд болохыг нотлох баримт,<br>
          Түгээх станцын үл хөдлөх эд хөрөнгийн гэрчилгээ, эсхүл түгээх станцын хүчин төгөлдөр түрээсийн гэрээ,<br>
          Газрын тосны асуудал эрхэлсэн төрийн захиргааны байгууллагаас олгосон бүртгэлийн гэрчилгээ,<br>
          Газрын тосны асуудал эрхэлсэн төрийн захиргааны байгууллагаас тухайн агуулахад гаргасан техник, технологийн дүгнэлт,<br>
          Газрын тосны бүтээгдэхүүний тухай хуулийн 9 дүгээр зүйлийн 9.2.1-т заасан бичиг баримт,<br>
          Шатдаг хийг баллоноор жижиглэнгийн худалдаа эрхлэгчийн хувьд:<br>
          Баллон хадгалах завсрын агуулахын үл хөдлөх эд хөрөнгийн гэрчилгээ, эсхүл хүчин төгөлдөр түрээсийн гэрээ,<br></a>
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
      temp: {}
    }
  },
  mounted () {
    if (this.$route.params) {
      this.lang = this.$store.state.language.language.code
      this.getContent(this.$route.params)
      this.contentCount(this.$route.params)
    } else {
      this.$nuxt.$router.replace({ path: '/404' })
      // console.log('NotWorking')
    }
  },
  methods: {
    handleClickPrint () {
      let prtContent = '<h3>Уул уурхай</h3>'
      prtContent += this.$refs.content.innerHTML
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
      WinPrint.document.write(prtContent)
      WinPrint.document.close()
      WinPrint.print()
    },
    getContent (id) {
      try {
        this.loading = true
        ContentService.getContentById(id).then((response) => {
          this.temp = response.data
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

</style>
