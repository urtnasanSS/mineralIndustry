<template>
  <!-- <div class="breadcrumb level">
    <div class="level-left">
      <div class="level-item">
        <a class="button is-white" @click="$router.back()">
          <i class="fa fa-angle-left" aria-hidden="true" />
        </a>
      </div>
      <div class="level-item">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li v-for="(item, i) in crumbs" :key="i" :class="item.classes">
              <nuxt-link :to="item.path">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div> -->
  <div>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    contentTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    // crumbs () {
    //   const crumbs = []
    //   this.$route.matched.map((item, i, { length }) => {
    //     const crumb = {}
    //     crumb.path = item.path
    //     let name = ''
    //     if (item.name.includes('___mn')) {
    //       name = item.name.replace('___mn', '')
    //     } else if (item.name.includes('___en')) {
    //       name = item.name.replace('___en', '')
    //     } else {
    //       name = item.name
    //     }
    //     item.name = name
    //     crumb.name = this.$i18n.t('route.' + (item.name || item.path))
    //     // is last item?
    //     if (i === length - 1) {
    //       // is param route? .../.../:id
    //       if (item.regex.keys.length > 0) {
    //         crumbs.push({
    //           path: item.path.replace(/\/:[^/:]*$/, ''),
    //           name: this.$i18n.t('route.' + item.name.replace(/-[^-]*$/, ''))
    //         })
    //         crumb.path = this.$route.path
    //         crumb.name = this.$i18n.t('route.' + this.$route.name, [
    //           crumb.path.match(/[^/]*$/)[0]
    //         ])
    //       }
    //       crumb.classes = 'is-active'
    //     }

    //     crumbs.push(crumb)
    //   })

    //   return crumbs
    // }
  },
  created () {
  },
  methods: {
    getName (name) {
      if (name.includes('Нийтлэл') || name.includes('ContentItem')) {
        return this.contentTitle
      } else {
        return name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  // /deep/ a {
  //   @include transition();
  // }
}
</style>
