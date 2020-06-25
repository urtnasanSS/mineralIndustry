<template>
  <div
    style="
     background: url(/img/loginBg.jpg);
    display: flex;
    width: 100%;
    background-position: center;
    text-align: center !important;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;"
  >
    <form
      class="form-signin"
      style="width: 100%; max-width: 330px; padding: 25px;  margin: auto; background-color: white; border-radius: 10px;"
    >
      <img src="/img/logoUurhai.png" alt width="120" height="120">
      <h1 class="title" style="margin: 30px 0px;">
        Нэвтрэх хэсэг
      </h1>
      <label for="inputEmail" class="sr-only" @keyup.enter="handleClickLogin">Хэрэглэгчийн нэр</label>
      <input
        id="inputEmail"
        v-model="userName"
        type="email"
        class="input"
        placeholder="Хэрэглэгчийн нэр"
        style="margin-bottom:10px;"
        required
        autofocus
      >

      <label for="inputPassword" class="sr-only">Нууц үг</label>
      <input
        id="inputPassword"
        v-model="password"
        type="password"
        class="input"
        style="margin-bottom:10px;"
        placeholder="Нууц үг"
        required
      >
      <label class="checkbox">
        <input type="checkbox">
        Намайг сана
      </label>
      <a
        class="button is-primary is-fullwidth"
        :loading="loading"
        style="margin: 20px 0px"
        @click="handleClickLogin"
      >Нэвтрэх</a>
      <p class="mt-5 mb-3 text-muted">
        © Уул уурхай, хүнд үйлдвэрийн яам
      </p>
    </form>
  </div>
</template>

<script>
// import cookie from 'cookiejs'
import AuthenticationService from '../services/AuthenticationService'
export default {
  middleware: 'login',
  components: {},
  data () {
    return {
      // valid: true,
      bodyImage: true,
      userName: '',
      password: '',
      intervalId: 0,
      loading: false
    }
  },
  mounted () {
    const self = this
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        self.handleClickLogin()
      }
    })
  },
  methods: {
    checkFields(userName, password) {
      if ((userName !== '' && userName.trim()) && (password !== '' && password.trim())) {
        return true
      } else {
        this.$message({ message: 'Хэрэглэгчийн нэр эсвэл нууц үг бичнэ үү', type: 'warning' })
        return false
      }
    },
    handleClickLogin() {
      const { userName, password } = this
      if (this.checkFields(userName, password)) {
        AuthenticationService.login({ userName, password }).then((response) => {
          const data = Object.assign({}, response.data)
          const userKey = Object.assign({}, data.user, { token: data.token })
          this.$store.dispatch('SetUserInfo', userKey).then((c) => {
            this.$nuxt.$router.replace({ path: '/admin/dashboard' })
          })
        }).catch((error) => {
          if (error.response && error.response.data) {
            this.$message({ message: error.response.data.error, type: 'warning' })
          } else {
            this.$message({ message: 'Системд нэвтрэх боломжгүй байна. Та түр хүлээгээд дахин оролдоно уу!.', type: 'error' })
          }
        })
      }
    }
  }
}
</script>

<style></style>
