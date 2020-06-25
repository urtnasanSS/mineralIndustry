<template>
  <div
    class="hero is-mini has-background-black is-gapless"
    style="background-image: url('/img/bg1.png'); background-repeat: repeat;  position:relative; margin-top:30px; "
  >
    <div class="hero-body" style="padding: 2rem 1.5rem;">
      <div class="container">
        <GroupTitle
          :name="lang == 'mn' ? 'Холбоо барих' : 'Contact us'"
          shortline-color="red"
          title-color="white"
          title-margin-bottom="10px"
        />
        <div class="columns is-gapless" style="margin-top:40px;">
          <div class="column" style="padding-right:20px !important; ">
            <div class="title">
              <i class="fa fa-flag" />
              <span>{{ lang == 'mn' ? 'Хандалтын мэдээлэл' : 'Visitor count' }} </span>
            </div>
            <div class="content">
              <div class="columns" style="    background-color: #00000021;">
                <div class="column">
                  <div class="customNumber">
                    {{ request.today }}
                  </div>
                  <div class="customText">
                    {{ lang == 'mn' ? 'Өнөөдөр' : 'Today' }}
                  </div>
                </div>
                <div class="column">
                  <div class="customNumber">
                    {{ request.lastWeek }}
                  </div>
                  <div class="customText">
                    {{ lang == 'mn' ? 'Энэ 7 хоног' : 'This week' }}
                  </div>
                </div>
                <div class="column">
                  <div class="customNumber">
                    {{ request.lastMonth }}
                  </div>
                  <div class="customText">
                    {{ lang == 'mn' ? 'Энэ сар' : 'This mounth' }}
                  </div>
                </div>
                <div class="column">
                  <div class="customNumber">
                    {{ request.lastYear }}
                  </div>
                  <div class="customText">
                    {{ lang == 'mn' ? 'Энэ жил' : 'This Year' }}
                  </div>
                </div>
                <div class="column">
                  <div class="customNumber">
                    {{ request.allRequest }}
                  </div>
                  <div class="customText">
                    {{ lang == 'mn' ? 'Нийт' : 'Total' }}
                  </div>
                </div>
              </div>
              <!-- <div class="onlineText">
                Одоогийн байдлаар 8 онлайн хэрэглэгч байна.
              </div> -->
            </div>
          </div>
          <div class="column">
            <div class="title">
              <i class="fa fa-globe" />
              <span>{{ lang == 'mn' ? 'Хаягын дэлгэрэнгүй' : 'Address' }}</span>
            </div>
            <div class="content">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <!-- <p v-html="temp.name" /> -->
              <p>{{ lang == 'mn' ? temp.name : temp.nameEn }}</p>
              <p>{{ lang == 'mn' ? 'Утас:' : 'Phone:' }} {{ temp.phone }}</p>
              <p>{{ lang == 'mn' ? 'И-мэйл:' : 'Email:' }} {{ temp.Email }}</p>
            </div>
          </div>
          <div class="column">
            <div class="title">
              <i class="fa fa-map-marker" />
              <span>{{ lang == 'mn' ? 'Байршил' : 'Location' }}</span>
            </div>
            <div class="con  tent">
              <iframe
                :src="temp.iframe"
                width="100%"
                height="150"
                frameborder="0"
                style="border:0;"
                allowfullscreen=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddressServices from '../../frontend/services/AddressServices'
import SiteRequestService from '../../frontend/services/SiteRequestService'
import GroupTitle from '~/components/custom/GroupTitle.vue'
export default {
  name: '',
  components: {
    GroupTitle
  },
  data () {
    return {
      temp: {},
      lang: '',
      request: []
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
    this.refDatas()
    this.getData()
  },
  destroyed () {},
  methods: {
    async refDatas () {
      const data = (await AddressServices.index()).data
      if (data) {
        this.temp = data[0]
      }
    },
    async getData () {
      this.request = (await SiteRequestService.index()).data
    }
  }
}
</script>
<style lang="scss" scoped>
.hero {
  .hero-body {
    .container {
      .columns {
        .column {
          .title {
            i {
              color: white;
              font-size: 22px;
            }
            span {
              font-size: 22px;
              color: white;
              text-transform: uppercase;
            }
          }
          .content {
            padding: 20px;
            color: white;
            font-size: 14px;
            .customNumber {
              text-align: center;
              font-size: 35px;
              font-weight: bold;
            }
            .customText {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
