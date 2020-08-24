<template>
  <div>
    <a v-if="item.children && item.children.length>0 " :key="item.id" class="nested navbar-item dropdown">
      <div class="dropdown-trigger">
        <span class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span @click="$emit('click', item)">{{ lang == 'mn' ? item.label : item.labelEn }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-right" aria-hidden="true" />
          </span>
        </span>
      </div>
      <div id="dropdown-menu" class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <template v-for="k in item.children">
            <c-navbar-menu :item="k" :key="k.id" @click="$emit('click', $event)" />
          </template>
        </div>
      </div>
    </a>
    <a v-else :key="item.id" class="navbar-item" @click="$emit('click', item)">{{ lang == 'mn' ? item.label : item.labelEn }}</a>
  </div>
</template>
<script>
export default {
  name: 'CNavbarMenu',
  props: {
    item: { type: Object, default: () => { return null } }
  },
  data() {
    return {
      lang: ''
    }
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
  }
}
</script>
<style lang="scss" scoped>
.mainMenu {
  // padding-right: 10px;
  // border:solid 1px red !important;
  .navbar-brand {
    margin: 0px;
    // display: none !important;
  }
  .navbar-menu {
    .navbar-start {
      // :first-child a{
      //   color: black !important;
      // }
      color: red;
      a:lang(mn) {
        // color:white;
        border-right: solid 1px #dcdfe6;
        text-transform: uppercase;
        padding: 5px 23.2px;
        &:hover {
          // color: #3b8beb;
        }
        &:after {
          display: none;
        }
        @media screen and (max-width: 1407px) {
          padding: 3px 15px;
          font-size: 15px;
        }
        @media screen and (max-width: 1215px) {
          // padding: 0px 5px;
          padding: 2px 10.4px;
          font-size: 13px;
        }
      }
      a:lang(en) {
        // color:white;
        border-right: solid 1px #dcdfe6;
        text-transform: uppercase;
        padding: 5px 8.4px;
        &:hover {
          // color: #3b8beb;
        }
        &:after {
          display: none;
        }
        @media screen and (max-width: 1407px) {
          padding: 3px 15px;
          font-size: 15px;
        }
        @media screen and (max-width: 1215px) {
          // padding: 0px 5px;
          padding: 2px 10.4px;
          font-size: 13px;
        }
      }
      a:last-child {
        border-right: none !important;
      }
      .navbar-item{
        :first-child a{
          border-top: 1px #ccc !important;
        }
      }
      .navbar-item:last-child a {
        border-right: none !important;
        border-top: 1px solid #f2f0ec !important;
      }
    }
  }
}
.nested.dropdown {
  &:hover > .dropdown-menu {
    display: block;
  }
  .dropdown-menu {
    top: -12px;
    margin-left: 100%;
    width: 120%;
    .dropdown-content {
      width: 120%;
      :first-child a{
        border-top: 1px #ccc !important
      }
    }
  }
  .dropdown-trigger {
    width: 190px;
    button::after {
      // content: '⦠'
    }
    .button{
      background-color: none !important;
      span {
        text-transform: none !important;
        background-color: unset !important;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.8;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: left;
      }
    }
    span {
      background-color: unset !important;
      padding: 0px 0px;
      border: 0px;
      font-size: 14px;
      font-weight: 400;
      text-align: initial;
      white-space: pre-line;
      height: auto;
      text-transform: none !important;
    }
  }
  .dropdown-menu {
    a {
      text-transform: none !important;
    }
  }
}
.navbar-item {
  border-top: 1px solid #f2f0ec;
  text-transform: none !important;
  text-align: initial;
  white-space: pre-line;
  width: 100%;
  :first-child a{
    border-top: 1px #ccc;
  }
}
</style>
