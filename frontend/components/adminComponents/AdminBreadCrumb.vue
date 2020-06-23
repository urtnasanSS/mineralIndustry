<template>
  <div class="breadcrumb is-gapless is-marginless">
    <!-- <el-page-header @back="goBack" >
      <div slot="title">
      </div> -->
    <div slot="content">
      <div>
        <h4 class="title is-4 text-themecolor">
          {{ name }}
        </h4>
      </div>
      <h6 class="subtitle is-6">
        {{ groupName }}
      </h6>
    </div>
    <!-- </el-page-header> -->
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      groupName: '',
      name: ''
    }
  },
  computed: {
    // groupName () {
    //   if (this.$route.matched && this.$route.matched.length > 0) {
    //     const splited = this.$route.matched[0].path.split('/')
    //     return splited[1]
    //   } else {
    //     return undefined
    //   }
    // },
    // name () {
    //   if (this.$route.matched && this.$route.matched.length > 0) {
    //     const splited = this.$route.matched[0].path.split('/')
    //     return splited[2]
    //   } else {
    //     return undefined
    //   }
    // }
  },
  watch: {
    '$route.path' (val) {
      this.setName(val)
    }
  },
  created () {
    this.setName(this.$route.path)
  },
  destroyed () {},
  methods: {
    setName(val) {
      const menus = this.$store.getters.adminMenus
      this.groupName = ''
      this.name = ''
      for (const i of menus) {
        if (i.to && val.includes(i.to)) {
          this.name = i.to.title
        } else {
          this.groupName = i.title
          for (const k of i.items) {
            if (val.indexOf(k.to) !== -1) {
              this.name = k.title
              return
            }
          }
        }
      }
    }
    // goBack () {
    //   this.$nuxt.$router.go(-1)
    // }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  background: white;
  padding: 20px;
  .text-themecolor {
    color: #1e88e5 !important;
    font-size: 18px;
    text-transform: uppercase;
  }
  .subtitle {
    padding: 0px;
    background: transparent;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    list-style: none;
    font-size: 12px;
  }
}
</style>
