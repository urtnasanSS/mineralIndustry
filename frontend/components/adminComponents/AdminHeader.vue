<template>
  <header class="topbar">
    <nav class="navbar is-info">
      <div class="navbar-brand">
        <a class="navbar-item" href="/home">
          <img src="/img/logoUurhai.png" alt="Ухаалаг шийдэл" width height="35">
          <span>Нүүр хуудас</span>
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
            <a class="navbar-link">Бусад</a>
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
    }
  }
}
</script>
<style lang="scss" scoped>
.topbar {
  // background: #1e88e5;
  position: sticky;
  top: 0px;
  z-index: 50;
  -webkit-box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.5);
  .navbar {
    // background-color: unset !important;
    .navbar-brand {
      background: #68b4f757;
      a {
        padding: 0px 34px;
        span {
          font-family: "Roboto Condensed";
          padding-left: 10px;
          text-transform: uppercase;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
