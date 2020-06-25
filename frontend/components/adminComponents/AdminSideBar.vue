<template>
  <aside class="left-sidebar in menu">
    <!-- <pre>{{ adminMenus }}</pre> -->
    <div v-for="item in adminMenus" :key="item.id" style="margin-bottom:10px;">
      <p class="menu-label">
        {{ item.title }}
      </p>
      <ul class="menu-list">
        <li v-for="subitem in item.items" :key="subitem.id">
          <a :class="{ 'is-active': pathname === subitem.name }" @click="handleClickMenu(subitem)">
            <!-- <i :class="`fa fa-${subitem.icon}`"/> -->
            <span style="color:gainsboro">-</span>
            {{ subitem.title }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['adminMenus']),
    pathname () {
      // if (this.$route.matched) {
      //   const splited = this.$route.matched[0].path.split('/')
      //   return splited[2]
      // } else {
      //   return undefined
      // }
      return ''
    }
  },
  watch: {},
  created () {},
  destroyed () {},
  methods: {
    handleClickMenu (subitem) {
      this.$nuxt.$router.replace({
        path: '/admin/' + subitem.name,
        params: { title: subitem.title }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left-sidebar {
  // border: solid 1px red;
  // overflow: visible;
  // position: fixed;
  // position: absolute;
  position: fixed;
  width: 234px;
  height: calc(100% - 50px);
  // top: 0px;
  z-index: 20;
  padding: 10px;
  // padding-top: 70px;
  background: #fff;
  -webkit-box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
