<template>
  <div class="container">
    <div class="notification">
      <div class="column is-12" style="font-size: xx-large">
        <h1 style="text-align: center; border-bottom: 1px solid gray; color: #1e73be">
          Холбоо барих
        </h1>
      </div>
      <div class="columns is-desktop">
        <div class="column" style="padding: 0 0 0 30px">
          <div class="column is-12" style="color: #1e73be; font-size:14px">
            <p>Хаяг: {{ temp.name }}</p>
          </div>
          <!-- <div>
            <div v-if="temp.phone">
              <div class="column is-2" style="float:left">
                Утас:
              </div>
              <div class="column is-9" style="float:left">
                {{ temp.phone }}
              </div>
            </div>
            <div class="column is-2" style="float:left">
              Email:
            </div>
            <div class="column is-9" style="float:left">
              {{ temp.Email }}
            </div>
            <div class="column is-2" style="float:left">
              Факс:
            </div>
            <div class="column is-9" style="float:left">
              {{ temp.Fax }}
            </div>
            <div class="column is-2" style="float:left">
              Фэйсбүүк:
            </div>
            <div class="column is-9" style="float:left">
              {{ temp.facebook }}
            </div>
          </div> -->
          <div class="column is-12 line">
            <i style="font-weight: bold">Архивын холбогдолтой мэдээ, мэдээлэл: </i>(976)-1800-1205 /энгийн утасны тарифаар/
          </div>
          <div class="column is-12 line">
            <i style="font-weight: bold">Архив, албан хэрэг хөтлөлтийн сургалт: </i>(976)-77002055
          </div>
          <div class="column is-12 line">
            <i style="font-weight: bold">Архив, албан хэрэг хөтлөлтийн программ хангамж: </i>(976)-77002053
          </div>
          <div class="column is-12 line-blue">
            Архив, албан хэрэг хөтлөлтийн талаар мэргэжил, арга зүйн заавар, зөвлөгөө:
          </div>
          <div class="column is-8 line">
            <ul class="line-ul">
              <li>Албан хэрэг хөтлөлтийн ажлын зохион байгуулалт</li>
              <li>Баримт бичгийг стандартын дагуу зохион бүрдүүлэх</li>
              <li>Байгууллагын болон төрийн архивын ажлын зохион байгуулалт</li>
              <li>Хөтлөх хэргийн нэрийн жагсаалт боловсруулах арга зүй, архивын баримтын хадгалах хугацаа тогтоох</li>
              <li>Архивын баримтын хадгалалт хамгаалалт</li>
              <li>Архивын баримтын тоо бүртгэл, ашиглалт</li>
              <li>Архивын баримтын хадгалалт хамгаалалт</li>
              <li>Байгууллагын дэргэдэх Баримт бичиг нягтлан шалгах комиссын үйл ажиллагаа</li>
              <li>Хөмрөг үүсгэгч байгууллагаас төрийн архивд баримт шилжүүлэх арга зүй</li>
            </ul>
          </div>
          <div class="column is-4 line-ul-phone">
            <i>(976)-77002086</i><br>
            <i>(976)-77002046</i>
          </div>
          <div class="column is-10 line" style="padding-top:60px">
          </div>
        </div>
        <div class="column" style="padding: 10px 30px 0 0">
          <div class="column is-12 line-blue">
            Үндэсний төв архивын хөмрөг үүсгэгч байгууллага, иргэдэд өгөх мэргэжил арга зүйн заавар, зөвлөгөө:
          </div>
          <div class="column is-8 line">
            <ul class="line-ul">
              <li>ҮТА-д хөмрөг үүсгэгч байгууллага, иргэд, баримтаа шилжүүлэх</li>
              <li>ҮТА-ын хөмрөг үүсгэгч байгууллагын архивын баримтад нягтлан шалгалт, дахин боловсруулалт хийх, хадгаламжийн нэгж бүрдүүлэх, данс, бүртгэл үйлдэх, тоо бүртгэл хөтлөх,  арга зүй</li>
              <li>ҮТА-ын дэргэдэх ББНШАЗК-ын үйл ажиллагаа, хөмрөг үүсгэгч байгууллага данс бүртгэлээ батлуулах</li>
              <li>Байгууллагын архивын баримт гэрээгээр цэгцлэх</li>
            </ul>
          </div>
          <div class="column is-4 line-ul-phone">
            <i>(976)-77002062</i><br>
            <i>(976)-77002089</i>
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">ҮТА-д шинээр ашиглалтад орсон барилгын зураг төсөл, техникийн баримт шилжүүлэх: </i>(976)-77002063
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">ҮТА-д кино, гэрэл зураг, дуу авианы баримт шилжүүлэх: </i>(976)-77002092
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">ҮТА-д улс төрийн нам, олон нийтийн байгууллагын баримт шилжүүлэх:</i><i>(976)-77002094</i>
          </div>
          <div class="column is-8 line">
            <ul class="line-ul">
              <li>Уншлагын танхимаар үйлчлүүлэх</li>
              <li>ҮТА-аас зураг төсөл техникийн баримтаас лавлагаа, хуулбар авах</li>
              <li>Кино, гэрэл зураг, дүрс бичлэг, дуу авианы баримтаас лавлагаа, хуулбар авах</li>
            </ul>
          </div>
          <div class="column is-4 line-ul-phone">
            <i>(976)-77002062</i>
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Архивын баримтыг сэлбэн засах, сэргээн шинэтгэх: </i>(976)-77002095
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Архивын онлайн лавлагааны талаар: </i>(976)-77002087
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Архивын лавлагааны талаар /бичгээр/: </i>(976)-77002043<br>(976)-77002087
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">ҮТА-д захиалсан лавлагаа авах: </i>(976)-77002061
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Хэвлэмэл хуудасны захиалга: </i>(976)-77002042
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Өргөдөл, гомдол: </i>(976)-77002045
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Бичиг хэргийн ажилтан: </i>(976)-77002096
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Гадаад харилцааны ажилтан: </i>(976)-77002045
          </div>
          <div class="column is-10 line">
            <i style="font-weight: bold">Хэвлэл, мэдээллийн ажилтан: </i>(976)-77002039
          </div>
          <div class="column is-10 line-blue">
            <i style="font-weight: bold">Цагын хуваарь: </i>
          </div>
          <div class="column is-10 line" style="font-weight: bold; padding-left: 30px">
            Даваа – Баасан гараг, 8:30 - 17:00<br>Бямба, Ням гараг болон нийтээр тэмдэглэх баярын өдрүүдэд амарна.
          </div>
        </div>
      </div>
      <div>
        <iframe
          :src="temp.iframe"
          width="100%"
          height="450"
          frameborder="0"
          style="border:0; height: 250px"
          allowfullscreen=""
        />
        <!-- <div class="column is-12" style="margin-top:10px; float:left">
          <div class="column is-1" style="display:flex; justify-content:center;  float:left">
            <i class="el-icon-user" style="font-size:24px;" />
          </div>
          <div class="column is-11" style="float:left">
            <div class="field">
              <div class="control" style="margin-bottom:10px;">
                <input class="input is-small" type="text" v-model="comment.author" placeholder="Нэр" style="width:250px">
              </div>
              <div class="control is-small">
                <textarea class="textarea is-small" v-model="comment.text" placeholder="Сэтгэгдэл" />
              </div>
            </div>
            <a class="button is-info is-small is-right" @click="handleCreateComment">Нийтлэх</a>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import CommentServices from '../../frontend/services/CommentServices'
import AddressServices from '../../frontend/services/AddressServices'
export default {
  layout: 'contactLayout',
  name: 'Contact',
  data () {
    return {
      temp: {},
      CommentId: 43,
      comment: {
        author: '',
        text: '',
        isActive: true
      }
    }
  },
  watch: {},
  created () {
    this.refDatas()
  },
  destroyed () {},
  methods: {
    async refDatas () {
      const data = (await AddressServices.index()).data
      if (data) {
        this.temp = data[0]
      }
    },
    handleCreateComment () {
      if (this.comment.author === '') {
        return this.$message({ type: 'warning', message: 'Нэр оруулна уу' })
      }
      if (this.comment.text === '') {
        return this.$message({ type: 'warning', message: 'Сэтгэгдэл оруулна уу' })
      }
      this.createComment()
    },
    resetTemp () {
      this.comment = {
        author: null,
        text: null
      }
    },
    async createComment () {
      this.comment.contentId = this.CommentId
      await CommentServices.post(this.comment)
        .then((response) => {
          this.resetTemp()
          this.$notify({
            title: 'Амжилттай хадгалагдлаа',
            message: 'Хадгалах',
            type: 'success',
            duration: 2000
          })
        })
        .catch((error) => {
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
  }
}
</script>
<style lang="scss" scoped>
.container {
  .notification {
    font-size: 12px !important;
    font-family: Roboto Condensed;
    .line {
      padding-top: 1px;
      padding-bottom: 0px;
      float: left;
      .line-ul {
        list-style-type: circle;
        margin-left: 20px;
      }
    }
    .line-ul-phone {
      float:left;
      padding-top:35px
    }
    .line-blue {
      float:left;
      color: #1e73be;
      font-size: 14px;
      padding-bottom:0px;
      padding-top:1px
    }
  }
}
</style>
