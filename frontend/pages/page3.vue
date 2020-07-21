<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area" class="center">
      <div id="left_content" style="width: 40%; margin: 5% 0% 5% 0%; float: left;">
        <p class="title">Холбоо барих</p>
        <a> Сэтгэгдэл бичих
        </a><br>
        <div class="field">
          <div class="control">
            <textarea id="comments" class="textarea" v-model="comment.text" placeholder="" rows="7"></textarea>
          </div>
        </div>
        <a>Утасны дугаар</a>
        <input class="input" v-model="comment.phone" type="tel" placeholder="">
        <a>Цахим хаяг</a>
        <input class="input" v-model="comment.email" type="email" placeholder="">
        <div class="buttons">
          <button class="button" @click="handleCreateComment">Илгээх</button>
        </div>
      </div>
      <div id="right_content" style="width: 22%; float: left; margin: 10% 0% 10% 5%">
        <p>{{ value.name }}</p>
        <p>Утас: {{ value.phone }}</p>
        <p>Факс: {{ value.Fax }}</p>
        <p>Цахим шуудан: {{ value.Email }}</p>
        <div style="margin-top: 30px">
          <p>
            {{ value.uPosition }} {{ value.uName }}
            Утас: {{ value.uPhone }}, өрөөний
            дугаар {{ value.uWork }}
          </p>
        </div>
      </div>
    </div>
    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'
import CommentServices from '@/services/CommentServices'
import AddressServices from '@/services/AddressServices.js'

export default {
  components: {
    HeaderWithNavbar,
    foother
  },

  data() {
    return {
      data: [],
      value: {},
      CommentId: 1,
      CommentName: 'Холбоо барих',
      comment: {
        phone: '',
        email: '',
        text: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      AddressServices.index()
        .then((response) => {
          this.data = response.data
          this.value = this.data[0]
        })
        .catch((err) => {
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    handleCreateComment () {
      if (this.comment.text === '' || this.comment.text.trim() === '') {
        return this.$message({ type: 'warning', message: 'Сэтгэгдэл оруулна уу' })
      }
      if (this.comment.phone === '' || this.comment.phone.trim() === '') {
        return this.$message({ type: 'warning', message: 'Утас оруулна уу' })
      }
      if (this.comment.email === '' || this.comment.email.trim() === '') {
        return this.$message({ type: 'warning', message: 'И-мэйл оруулна уу' })
      }
      this.replaceWords()
    },
    async replaceWords (event) {
      const commentAuthor = this.CommentName
      const commentContent = document.getElementById('comments')
      const badWords = ['хуц', 'пизда', 'fuck', 'sex', 'pizdaa', 'pizda', 'piazda', 'piatka', 'piahluu', 'pishda', 'pijda', 'sda', 'sdakaa', 'zda', 'aash', 'shaa', 'sha', 'lalar', 'boov', 'lagaa', 'teneg', 'lalaraa', 'lalraa', 'llr', 'haraal idsen', 'лалар', 'ynhan', 'huts', 'ideesei', 'haraal', 'golog', 'sadist', 'садист', 'лага', 'лагаанууд', 'laga', 'laganuud', 'ллр', 'лларууд', 'ллрийн', 'лалр', 'fuckhole', 'nujuur huh', 'нөжөөр хах', 'nojoor hah', 'нохой долоог', 'nohoi doloog', 'pooface', 'shitface', 'муухай царай', 'muuhai tsarai', 'begtruuleh', 'megduuleh', 'dumbfuck', 'мэгдүүлэх', 'бэгтрүүлэх', 'mash muu', 'муу', 'bad', 'shitty', 'bureg', 'medrel', 'manguu', 'муутай', 'бүрэг', 'мангуу', 'dumb ass', 'coliot', 'soliot', 'солиот', 'bampot', 'лүд', 'lud', 'шаацан', 'шаадаг', 'шавар', 'poop', 'dookie', 'шаалдаа', 'dummy', 'freaking', 'homodumbshit', 'fuckwit', 'fuckwad', 'fuckup', 'fucktart', 'fucknutt', 'fucknut', 'fucking', 'fuckface', 'fuckersucker', 'fuckbrain', 'fuckboy', 'fuckbag', 'fuckass', 'там', 'tam', 'heck', 'hell', 'drunk', 'shitfaced', 'согтуу', 'sogtuu', 'sanhuugiin demjleg awna', 'sanhuugiin demjleg uzuulne', 'санхүүгийн дэмжлэг авна', 'санхүүгийн дэмжлэг үзүүлнэ', 'завхай', 'шалиг', 'садар самуун', 'садар', 'шуналтай', 'шунаг', 'lickerish', 'sheesen', 'шээсэн', 'urinate', 'piss', 'shawar', 'садар', 'zail', 'fuckoff', 'zanbal', 'cumslut', 'skank', 'занбал', 'банзал', 'явдалтай охин', 'huuhen', 'ywdaltai', 'unelegch', 'үнэлэгч', 'яанхан', 'slut', 'cumdumpster', 'pissed off', 'skeet', 'jizz', 'fickmilk', 'dickjuice', 'cum', 'үрийн шингэн', 'uriin shingen', 'umhii nuh', 'tuuchi', 'туучий', 'buttfucker', 'ogzog', 'хонго', 'hongo', 'buttocks', 'asscracker', 'asses', 'shitbrains', 'assface', 'muudle', 'үймээн', 'будлиан', 'самуурал', 'мансуурах', 'замбараагүй', 'шаврын хаалт', 'uimeen', 'budlian', 'samuun', 'mansuurah', 'zambaraagui', 'ass', 'shitbagger', 'shitbag', 'puto', 'shitas', 'маанаг', 'тэгэг бөгс', 'dumbass', 'whoreface', 'whorebag', 'shithole', 'shitdick', 'shitcunt', 'twatlips', 'suckass', 'thundercunt', 'teneg bogs', 'assmuncher', 'cumbubble', 'tosoor gooj', 'hello fuck', 'хөнөөх', 'хядах', 'bogs', 'бөгс', 'хуцваа', 'assassinate', 'алах', 'шээс', 'ялгадас', 'шээх', 'баах', 'shitting', 'avilgal', 'ariun tsever', 'jorlon', 'жорлон', 'shithouse', 'amnii ewgui uner', 'bad breath', 'shitbreath', 'hunuuh', 'hydah', 'alah', 'чичирхийлэгч', 'чичрэх', 'fucker', 'бэлгийн тоглоом', 'oodgui asshtai', 'uudgui aashtai', 'awirtai', 'avirtai', 'muuhai abirtai', 'baliar zantai', 'баас', 'ylgadas', 'shees', 'bitchy', 'tsusaar teegel', 'tomsog', 'төмсөг', 'bollox', 'tumsug', 'bollocks', 'tuuchii', 'шаа', 'haalda', 'shaadag', 'shaatsan', 'cunnilingus', 'wankjob', 'үхээнц', 'handjob', 'humping', 'munging', 'fucks', 'fuckin', 'pussylicking', 'wank', 'сексийн гаж үйлдэл', 'skullfuck', 'tittyfuck', 'feltch', 'fellatio', 'decksucking', 'sexual act', 'dickslap', 'sex-iin gaj uildel', 'tard', 'novsh', 'nowsh', 'jerk', 'mothafucka', 'новш', 'shithead', 'asshole', 'psda', 'сда', 'bizda', 'sogogtoi', 'физда', 'бизда', 'псда', 'pda', 'согогтой', 'fucked', 'dildo', 'chicherhiilegch', 'chichreh', 'fuckbutt', 'hoe', 'sharuud', 'gayass', 'assclown', 'fuckhead', 'shitspitter', 'bugs', 'arse', 'chicherhilegch', 'өгзөг', 'хонго', 'clumsy', 'болхи', 'бойд', 'шаах', 'араас', 'бөгсрүү', 'долоогч', 'долоох', 'doloogch', 'dolooh', 'bolhi', 'boid', 'assfuck', 'asslicker', 'bugsruu', 'shaah', 'butelgui', ' бүтэлгүй', 'lameass', 'lickspittle', 'бялдууч', 'зусарч', 'bylduuch', 'zusarch', 'ass-jabber', 'чалчаа', 'хов жив', 'хов', 'жив', 'үглээ', 'утаггүй', 'донгосох', 'chalchaa', 'hov jiv', 'how', 'jiv', 'chotgor', 'darn', 'damn', 'goshdarnit', 'goddamnit', 'чөтгөр', 'goshdarn', 'goddamn', 'utaggui', 'dongocoh', 'dongosoh', 'douche', 'дамсаг', 'алавч', 'damsag', 'damcag', 'alawch', 'douchebag', 'bullshit', 'dongos', 'dongosoon', 'dongocoon', 'female dog', 'punta', 'эм нохой', 'донгоссон', 'донгос', 'жингир', 'гичий', 'jingir', 'givhii', 'goovh', 'ал', 'умай', 'хилүү', 'хэлүү', 'al', 'heluu', 'kotch', 'kooch', 'kunt', 'minge', 'kootch', 'umai', 'coochy', 'coochie', 'clit', 'vagina', 'vagin', 'twats', 'twat', 'snatch', 'pussy', 'pussies', 'punanny', 'poontang', 'poonany', 'poonani', 'poon', 'shodoi', 'шодой', 'боов', 'cock', 'hovchirch', 'boner', 'хөвчрөх', 'edor', 'shaaaa', 'мангар', 'усан тэнэг', 'эргүү', 'fuckstick', 'dicks', 'dickhole', 'assmonkey', 'asslick', 'asscock', 'asshead', 'cockhead', 'cocknose', 'эрлийз', 'erliiz', 'гичы', 'гичий', 'гичи', 'jinger', 'haraalid', 'halagdsan', 'ulugchin', 'duinge', 'shaar', 'tit', 'moom', 'muum', 'huhnii', 'анус', 'anus', 'meem', 'gomo', 'хүйстэн', 'bitchis', 'jungaa', 'hujaa', 'hytad', 'жунгаа', 'хужаа', 'хятад', 'china', 'hund surtal', 'суртал', 'gay', 'lesbian', 'илжиг', 'лагаа', 'tenegteh', 'тэнэгтэх', 'iljig', 'тэнэглэх', 'маанаг гахай', 'uhne', 'alna', 'sda.', 'hulgaich', 'salbadai', 'uxseniix', 'mal', 'shaana', 'пзда', 'jatsga', 'medrel', 't1', 'шоронд', 'zusaldagch', 'shaahaa', 'nusak', 'nusakuud', 'bizdaar', 'moomtei', 'boovt', 'erguu', 'hutsaad', 'luivarchid', 'baasaa', 'новшоос', 'shulam', 'terrorist', 'haldlaga', 'tsuglaya', 'eserguutseye', 'eserguutse', 'alnaa', 'hidna', 'hyadna', 'zevseg', 'buu', 'hutga', 'mandtugai', 'мандтугай', 'лаларын', 'хөгийн', 'халдлага', 'жагсая', 'хутга', 'буу', 'шаалгах', 'alniihan', 'yankan', 'sdaakuud', 'alnuudaa', 'malaa', 'шаах', 'хуц', 'guts', 'huts']
      const censoredAuthor = this.censoreAuthor(commentAuthor, badWords)
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
    async createComment (commentContent) {
      this.comment.contentId = this.CommentId
      this.comment.author = commentContent.author
      this.comment.text = commentContent.value
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
    },
    resetTemp () {
      this.comment = {
        author: null,
        text: null,
        email: null,
        phone: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  display:block;
  margin-left:10%;
  margin-right:10%;
  padding:0%;
  a {
    width: 117px;
    opacity: 0.49;
    font-family: SegoeUI;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  p {
    font-family: SegoeUI;
    font-size: 15px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  .title {
    width: 159px;
    height: 31px;
    margin-bottom: 7px;
    font-family: SegoeUI;
    font-size: 23px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  .textarea {
    margin: 5px 0 2px 0;
  }
  .input {
    margin: 5px 0 2px 0;
  }
  .buttons {
    .button {
      margin: 10px 0 0 0;
      width: 168px;
      height: 38px;
      border-radius: 9px;
      background-color: #1a3675;
      color: white;
    }
  }
}
.logo_mmhi {
width: 263px;
height: 82px;
object-fit: contain;
}

.text {
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
.title {
  font-weight: bold;
  font-style: normal;
}
</style>
