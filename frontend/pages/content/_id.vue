<template>
  <div ref="content" v-loading="loading" class="newsOuter">
    <el-row class="columns">
      <el-col class="column is-9 values">
        <div class="head">
          <h4 class="title  headerTitle">
            {{ lang == 'mn' ? temp.title : temp.titleEn }}
          </h4>
          <button class="printButton button is-danger" @click="handleClickPrint()">
            <span class="icon">
              <i class="fa fa-floppy-o"></i>
            </span>
            <span>Татаж авах</span>
          </button>
        </div>
        <p class="headerSubtitle">
          <i class="fas fa-eye" /> {{ temp.count }}
          <i class="fas fa-clock" style="margin-left:10px;" />
          {{ moment(temp.createdAt).format("YYYY-MM-DD") }}
        </p>
        <!-- <button class="button fa fa-share-alt" style="background-color: #0066ff; width: 110px; height: 19px; font-size: 12px; color: white">
          <span style="margin-left:8%">Нийтлэх</span>
        </button> -->
        <!-- <button class="button is-primary" style="background-color: #00b1ff; width: 110px; height: 19px; font-size: 12px">
          <span class="icon">
            <i class="fab fa-twitter"></i>
          </span>
          <span>Жиргэх</span>
        </button> -->
        <div class="detailImage">
          <div class="column is-13">
            <div class="card-image">
              <figure class="image is-5by3 customImage">
                <div v-if="files && files.length > 0" style="height:400px; max-width:100%; margin: 0% float:left">
                  <el-image
                    :fit="'contain'"
                    :src="baseUrl + files[0].storageName"
                    class="image1"
                    lazy
                  >
                  </el-image>
                </div>
              </figure>
            </div>
          </div>
        </div>
        <div v-if="lang == 'mn'">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="temp.content"></p>
        </div>
        <div v-else>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="temp.contentEn"></p>
        </div>
        <div v-if="isStopPress == true && pdf.length > 0">
          <embed :src="pdf[pdf.length - 1].url" style="height:700px; width: 100%" />
        </div>
        <!-- Сэтгэгдэл -->
        <div v-if="!temp.isHideComments">
          <div style="margin:49px 78px 20px 0px !important;">
            <el-divider content-position="left">
              {{ lang == 'mn' ? 'Санал:' : 'Comments:' }}
            </el-divider>
            <div class="columns" style="margin-top:10px;">
              <div class="column is-1" style="display:flex; justify-content:center;">
                <i class=" userIcon el-icon-user" style="font-size:24px;" />
              </div>
              <div class="column">
                <div class="field">
                  <div class="control" style="margin-bottom:10px;">
                    <input
                      id="author"
                      v-model="comment.author"
                      class="input is-small"
                      type="text"
                      :placeholder="lang == 'mn' ? 'Нэр' : 'Name'"
                      style="width:250px"
                    >
                    <input
                      id="phone"
                      v-model="comment.phone"
                      class="input is-small"
                      type="text"
                      :placeholder="lang == 'mn' ? 'Утас' : 'Phone'"
                      style="width:250px"
                    >
                    <input
                      id="email"
                      v-model="comment.email"
                      class="input is-small"
                      type="text"
                      :placeholder="lang == 'mn' ? 'И-Мэйл' : 'Email'"
                      style="width:250px"
                    >
                  </div>
                  <div class="control is-small">
                    <textarea id="comments" v-model="comment.text" class="textarea is-small" :placeholder="lang == 'mn' ? 'Санал' : 'Comment'" />
                  </div>
                </div>
                <a class="button is-info is-small is-right" @click="handleCreateComment">{{ lang == 'mn' ? 'Нийтлэх' : 'Submit' }}</a>
              </div>
            </div>
          </div>
          <article v-for="item in commentList" :key="item.id" class="message">
            <div v-if="item.show == true" class="message-body">
              <strong>{{ item.author }}</strong>
              <p class="subtitle">
                <i class="fas fa-clock" style="margin-left:20px;" />
                {{ moment(item.createdAt).format("YYYY-MM-DD") }}
              </p>
              <p>
                {{ item.text }}
              </p>
            </div>
          </article>
          <div class="columns paginationNumber">
            <div class="column is-6">
              <div style="text-align:left;">
                <div class="block">
                  <el-pagination
                    background
                    :page-sizes="[6, 12, 18, 24]"
                    :page-size="listQuery.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :current-page.sync="listQuery.currentPage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="column is-4 ">
        <div class="relatedNews">
          <rightColoum />
          <rightColoumAnnuon />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import CommentServices from '../../services/CommentServices'
import ContentService from '../../services/ContentServices'
import rightColoum from '../../components/rightColoum'
import rightColoumAnnuon from '../../components/rightColoumAnnoun'
import {
  isNull
} from '@/utils/Helper'
export default {
  layout: 'contentLayout',
  name: 'Content',
  components: {
    rightColoum,
    rightColoumAnnuon
  },
  data () {
    return {
      loading: false,
      lang: '',
      baseUrl: process.env.baseUrl + '/',
      videoBaseUrl: process.env.baseUrl,
      temp: {},
      isStopPress: false,
      audios: [],
      pdf: [],
      see: [],
      files: [],
      commentList: [],
      comment: {
        author: '',
        phone: '',
        email: '',
        text: '',
        isActive: true,
        show: false
      },
      total: 0,
      listQuery: {
        limit: 6,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'DESC'
        },
        search: {
        }
      },
      helpCategoryId: null,
      AllCommentFile: []
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.lang = this.$store.state.language.language.code
      this.getContent(this.$route.params.id)
      this.contentCount(this.$route.params.id)
      this.getComments(this.$route.params.id)
    } else {
      this.$nuxt.$router.replace({ path: '/home' })
    }
  },
  methods: {
    moment,
    isNull,
    handleCreateComment () {
      if (this.comment.author === '' || this.comment.author.trim() === '') {
        return this.$message({ type: 'warning', message: 'Нэр оруулна уу' })
      }
      if (this.comment.phone === '' || this.comment.phone.trim() === '') {
        return this.$message({ type: 'warning', message: 'Утас оруулна уу' })
      }
      if (this.comment.email === '' || this.comment.email.trim() === '') {
        return this.$message({ type: 'warning', message: 'И-мэйл оруулна уу' })
      }
      if (this.comment.text === '' || this.comment.text.trim() === '') {
        return this.$message({ type: 'warning', message: 'Сэтгэгдэл оруулна уу' })
      }
      this.replaceWords()
    },
    async replaceWords (event) {
      const commentAuthor = document.getElementById('author')
      const commentContent = document.getElementById('comments')
      const badWords = ['хуц', 'пизда', 'fuck', 'sex', 'pizdaa', 'pizda', 'piazda', 'piatka', 'piahluu', 'pishda', 'pijda', 'sda', 'sdakaa', 'zda', 'aash', 'shaa', 'sha', 'lalar', 'boov', 'lagaa', 'teneg', 'lalaraa', 'lalraa', 'llr', 'haraal idsen', 'лалар', 'ynhan', 'huts', 'ideesei', 'haraal', 'golog', 'sadist', 'садист', 'лага', 'лагаанууд', 'laga', 'laganuud', 'ллр', 'лларууд', 'ллрийн', 'лалр', 'fuckhole', 'nujuur huh', 'нөжөөр хах', 'nojoor hah', 'нохой долоог', 'nohoi doloog', 'pooface', 'shitface', 'муухай царай', 'muuhai tsarai', 'begtruuleh', 'megduuleh', 'dumbfuck', 'мэгдүүлэх', 'бэгтрүүлэх', 'mash muu', 'муу', 'bad', 'shitty', 'bureg', 'medrel', 'manguu', 'муутай', 'бүрэг', 'мангуу', 'dumb ass', 'coliot', 'soliot', 'солиот', 'bampot', 'лүд', 'lud', 'шаацан', 'шаадаг', 'шавар', 'poop', 'dookie', 'шаалдаа', 'dummy', 'freaking', 'homodumbshit', 'fuckwit', 'fuckwad', 'fuckup', 'fucktart', 'fucknutt', 'fucknut', 'fucking', 'fuckface', 'fuckersucker', 'fuckbrain', 'fuckboy', 'fuckbag', 'fuckass', 'там', 'tam', 'heck', 'hell', 'drunk', 'shitfaced', 'согтуу', 'sogtuu', 'sanhuugiin demjleg awna', 'sanhuugiin demjleg uzuulne', 'санхүүгийн дэмжлэг авна', 'санхүүгийн дэмжлэг үзүүлнэ', 'завхай', 'шалиг', 'садар самуун', 'садар', 'шуналтай', 'шунаг', 'lickerish', 'sheesen', 'шээсэн', 'urinate', 'piss', 'shawar', 'садар', 'zail', 'fuckoff', 'zanbal', 'cumslut', 'skank', 'занбал', 'банзал', 'явдалтай охин', 'huuhen', 'ywdaltai', 'unelegch', 'үнэлэгч', 'яанхан', 'slut', 'cumdumpster', 'pissed off', 'skeet', 'jizz', 'fickmilk', 'dickjuice', 'cum', 'үрийн шингэн', 'uriin shingen', 'umhii nuh', 'tuuchi', 'туучий', 'buttfucker', 'ogzog', 'хонго', 'hongo', 'buttocks', 'asscracker', 'asses', 'shitbrains', 'assface', 'muudle', 'үймээн', 'будлиан', 'самуурал', 'мансуурах', 'замбараагүй', 'шаврын хаалт', 'uimeen', 'budlian', 'samuun', 'mansuurah', 'zambaraagui', 'ass', 'shitbagger', 'shitbag', 'puto', 'shitas', 'маанаг', 'тэгэг бөгс', 'dumbass', 'whoreface', 'whorebag', 'shithole', 'shitdick', 'shitcunt', 'twatlips', 'suckass', 'thundercunt', 'teneg bogs', 'assmuncher', 'cumbubble', 'tosoor gooj', 'hello fuck', 'хөнөөх', 'хядах', 'bogs', 'бөгс', 'хуцваа', 'assassinate', 'алах', 'шээс', 'ялгадас', 'шээх', 'баах', 'shitting', 'avilgal', 'ariun tsever', 'jorlon', 'жорлон', 'shithouse', 'amnii ewgui uner', 'bad breath', 'shitbreath', 'hunuuh', 'hydah', 'alah', 'чичирхийлэгч', 'чичрэх', 'fucker', 'бэлгийн тоглоом', 'oodgui asshtai', 'uudgui aashtai', 'awirtai', 'avirtai', 'muuhai abirtai', 'baliar zantai', 'баас', 'ylgadas', 'shees', 'bitchy', 'tsusaar teegel', 'tomsog', 'төмсөг', 'bollox', 'tumsug', 'bollocks', 'tuuchii', 'шаа', 'haalda', 'shaadag', 'shaatsan', 'cunnilingus', 'wankjob', 'үхээнц', 'handjob', 'humping', 'munging', 'fucks', 'fuckin', 'pussylicking', 'wank', 'сексийн гаж үйлдэл', 'skullfuck', 'tittyfuck', 'feltch', 'fellatio', 'decksucking', 'sexual act', 'dickslap', 'sex-iin gaj uildel', 'tard', 'novsh', 'nowsh', 'jerk', 'mothafucka', 'новш', 'shithead', 'asshole', 'psda', 'сда', 'bizda', 'sogogtoi', 'физда', 'бизда', 'псда', 'pda', 'согогтой', 'fucked', 'dildo', 'chicherhiilegch', 'chichreh', 'fuckbutt', 'hoe', 'sharuud', 'gayass', 'assclown', 'fuckhead', 'shitspitter', 'bugs', 'arse', 'chicherhilegch', 'өгзөг', 'хонго', 'clumsy', 'болхи', 'бойд', 'шаах', 'араас', 'бөгсрүү', 'долоогч', 'долоох', 'doloogch', 'dolooh', 'bolhi', 'boid', 'assfuck', 'asslicker', 'bugsruu', 'shaah', 'butelgui', ' бүтэлгүй', 'lameass', 'lickspittle', 'бялдууч', 'зусарч', 'bylduuch', 'zusarch', 'ass-jabber', 'чалчаа', 'хов жив', 'хов', 'жив', 'үглээ', 'утаггүй', 'донгосох', 'chalchaa', 'hov jiv', 'how', 'jiv', 'chotgor', 'darn', 'damn', 'goshdarnit', 'goddamnit', 'чөтгөр', 'goshdarn', 'goddamn', 'utaggui', 'dongocoh', 'dongosoh', 'douche', 'дамсаг', 'алавч', 'damsag', 'damcag', 'alawch', 'douchebag', 'bullshit', 'dongos', 'dongosoon', 'dongocoon', 'female dog', 'punta', 'эм нохой', 'донгоссон', 'донгос', 'жингир', 'гичий', 'jingir', 'givhii', 'goovh', 'ал', 'умай', 'хилүү', 'хэлүү', 'al', 'heluu', 'kotch', 'kooch', 'kunt', 'minge', 'kootch', 'umai', 'coochy', 'coochie', 'clit', 'vagina', 'vagin', 'twats', 'twat', 'snatch', 'pussy', 'pussies', 'punanny', 'poontang', 'poonany', 'poonani', 'poon', 'shodoi', 'шодой', 'боов', 'cock', 'hovchirch', 'boner', 'хөвчрөх', 'edor', 'shaaaa', 'мангар', 'усан тэнэг', 'эргүү', 'fuckstick', 'dicks', 'dickhole', 'assmonkey', 'asslick', 'asscock', 'asshead', 'cockhead', 'cocknose', 'эрлийз', 'erliiz', 'гичы', 'гичий', 'гичи', 'jinger', 'haraalid', 'halagdsan', 'ulugchin', 'duinge', 'shaar', 'tit', 'moom', 'muum', 'huhnii', 'анус', 'anus', 'meem', 'gomo', 'хүйстэн', 'bitchis', 'jungaa', 'hujaa', 'hytad', 'жунгаа', 'хужаа', 'хятад', 'china', 'hund surtal', 'суртал', 'gay', 'lesbian', 'илжиг', 'лагаа', 'tenegteh', 'тэнэгтэх', 'iljig', 'тэнэглэх', 'маанаг гахай', 'uhne', 'alna', 'sda.', 'hulgaich', 'salbadai', 'uxseniix', 'mal', 'shaana', 'пзда', 'jatsga', 'medrel', 't1', 'шоронд', 'zusaldagch', 'shaahaa', 'nusak', 'nusakuud', 'bizdaar', 'moomtei', 'boovt', 'erguu', 'hutsaad', 'luivarchid', 'baasaa', 'новшоос', 'shulam', 'terrorist', 'haldlaga', 'tsuglaya', 'eserguutseye', 'eserguutse', 'alnaa', 'hidna', 'hyadna', 'zevseg', 'buu', 'hutga', 'mandtugai', 'мандтугай', 'лаларын', 'хөгийн', 'халдлага', 'жагсая', 'хутга', 'буу', 'шаалгах', 'alniihan', 'yankan', 'sdaakuud', 'alnuudaa', 'malaa', 'шаах', 'хуц', 'guts', 'huts']
      const censoredAuthor = this.censoreAuthor(commentAuthor.value, badWords)
      const censored = this.censoreText(commentContent.value, badWords)
      commentContent.author = censoredAuthor
      commentContent.value = censored
      await this.createComment(commentContent)
    },
    censoreAuthor (string, filters) {
      const regex = new RegExp(filters.join('|'), 'gi')
      return string.replace(regex, function (match) {
        let stars = ''
        for (let i = 0; i < match.length; i++) {
          stars += '*'
        }
        return stars
      })
    },
    censoreText (string, filters) {
      const regex = new RegExp(filters.join('|'), 'gi')
      return string.replace(regex, function (match) {
        let stars = ''
        for (let i = 0; i < match.length; i++) {
          stars += '*'
        }
        return stars
      })
    },
    resetTemp () {
      this.comment = {
        author: null,
        text: null,
        email: null,
        phone: null
      }
    },
    async createComment (commentContent) {
      this.comment.author = commentContent.author
      this.comment.text = commentContent.value
      this.comment.contentId = this.temp.id
      await CommentServices.post(this.comment)
        .then((response) => {
          this.commentList.unshift(response.data)
          this.resetTemp()
          this.$notify({
            title: 'Таны саналыг хүлээн авлаа',
            message: 'Таны санал Админ шалгаж үзсэний дараа харагдах боломжтой',
            type: 'success',
            duration: 6000
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
            this.isStopPress = this.temp.isStopPress
            this.files = this.temp.files.filter(c => c.fileType.includes('image'))
            this.pdf = this.temp.files.filter(c => c.fileType.includes('pdf'))
            this.audios = this.temp.files.filter(c => c.fileType.includes('audio'))
          }
          if (this.temp && this.temp.youtubeIframe.length > 0) {
            this.see = this.temp.youtubeIframe
          }
          this.loading = false
        })
      } catch (err) {
        this.loading = false
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    async getComments (id, listQuery) {
      try {
        const id = this.$route.params.id
        await CommentServices.index(id, this.listQuery).then((response) => {
          const valute = response.data
          this.commentList = JSON.parse(JSON.stringify(valute.rows))
          this.total = valute.count
        })
      } catch (err) {
        this.list = []
        this.total = 0
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
    getFileSize (item) {
      const bytes = item.size
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) {
        return '0 Byte'
      }
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / 1024 ** i, 2) + ' ' + sizes[i]
    },
    handleClickPrint () {
      let prtContent = '<h3>Уул уурхай</h3>'
      prtContent += this.$refs.content.innerHTML
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
      WinPrint.document.write(prtContent)
      WinPrint.document.close()
      WinPrint.print()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getComments()
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
      this.getComments(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.newsOuter{
  padding-right: 10px;
  position: relative;
  .contents {
    /deep/ ul {
      margin-left: 40px;
    }
    /deep/ ol {
      margin-left: 40px;
    }
  }
  .printerImage{
    transition: all 0.3s ease 0s;
    margin-top: 10px;
    width:40px;
    &:hover{
      transform: translateY(3px);
    }
  }
	.text {
		text-align: justify;
		padding: 10px;
	}
	.columns {
		.values {
      @media screen and (max-width: 1023px) {
        padding-left: 2.75rem;
      }
			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 14px;
			}
			.subtitle {
				padding: 5px 0px;
				float: right;
				font-size: 11px;
				color: #909399;
			}
			.content {
				font-size: 12px;
				color: #909399;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
	}
  .userIcon {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
	.detailImage {
    display: grid;
    float:left;
    width: 100%;
    .image1 {
      height: 100%;
      width: 100%
    }
	}
  .head {
    border-bottom: 1px solid black;
    float: left;
    width: 100%;
    @media screen and (max-width: 1023px) {
      padding-left: 1.75rem;
    }
    .headerTitle {
      padding: 20px 50px 0px 0px;
      overflow: hidden;
      float: left;
      width: 88%;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      font-size: 18px;
      min-height: 45px;
      margin-bottom: 0.5rem;
    }
    .printButton{
      float: left;
      width: 10%;
      font-size: 14px;
      margin: 10px 0 0 5px;
      @media screen and (max-width: 1215px) {
        font-size: 9px;
        margin: 20px 0 0 0;
      }
      @media screen and (max-width: 990px) {
        font-size: 9px;
        margin: 20px 0 0 0;
      }
      @media screen and (max-width: 850px) {
        font-size: 7px;
        margin: 25px 0 0 0;
      }
      @media screen and (max-width: 768px) {
        width: 15%;
        font-size: 12px;
        margin: 10px 0 5px 0;
      }
      @media screen and (max-width: 580px) {
        font-size: 10px;
        margin: 10px 0 5px 0;
      }
      .icon {
        @media screen and (max-width: 500px) {
          display: none;
        }
      }

    }
  }
  .headerSubtitle {
		padding: 4px 10px 2px 10px;
    width: 100%;
    float: left;
		font-size: 12px;
		color: #909399;
    @media screen and (max-width: 1023px) {
      padding-left: 1.75rem;
    }
  }
	.subtitle {
		padding: 3px 10px;
		font-size: 12px;
		color: #909399;
	}
	.column {
		height: 50%;
	}
	.audio {
    .audioPlayer{
      height: 30px;
      width: 100%;
    }
		.fa-play {
			color: blue;
			font-size: 18px;
			padding: 2px 10px 2px 25px;
			float: left;
		}
		.auidoText {
			font-size: 14px;
      padding-left: 5px;
		}
	}
	.picturedetail {
		.picture-about {
      font-style: italic;
			font-size: 11px;
			color: #909399;
			padding: 2px 10px;
		}
	}
  .relatedNews {
    float: right;
    width: 100%;
    @media screen and (max-width: 768px) {
      padding-left: 1.75rem;
    }
  }
}
</style>
