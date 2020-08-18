<template>
  <header class="topbar">
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <a class="navbar-item" href="/home">
          <img src="/img/logo2_mmhi.png" style="max-height: 60px; width: auto">
        </a>
        <div
          class="navbar-burger burger"
          :class="{ 'is-active': showNav }"
          data-target="navbarExampleTransparentExample"
          @click="showNav = !showNav"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div
        id="navbarExampleTransparentExample"
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
      >
        <div class="navbar-start" />
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <img src="/img/login.png" style="max-height: 45px;">
            </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item" @click="personInfo()">Хувийн мэдээлэл</a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="handleLogout()">Гарах</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Adminheader',
  data () {
    return {
      showNav: false
    }
  },
  watch: {},
  created () {},
  destroyed () {},
  methods: {
    handleLogout() {
      this.$confirm('Та системээс гарахдаа итгэлтэй байна уу?', { type: 'warning' }).then((c) => {
        this.$store.dispatch('user_logout').then((c) => {
          this.$nuxt.$router.replace({ path: '/login' })
        }).catch(() => {
          this.$message({ message: 'Системийн алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.', type: 'warning' })
        })
      })
    },
    personInfo() {
      this.$nuxt.$router.replace({
        path: '/admin/userInfo'
      })
    },
    personInfo2() {
      this.$nuxt.$router.replace({
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.topbar {
  background-color: #1a3675;
  position: sticky;
  top: 0px;
  z-index: 50;
  -webkit-box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
  .navbar {
    background-color: #1a3675;
    .navbar-brand {
      background-color: #1e5489;
    }
    .navbar-brand {
      background: #1a3675;
      width: 235px;
      a {
        padding: 0px 25px;
        width: 234px;
      }
    }
  }
}
</style>
