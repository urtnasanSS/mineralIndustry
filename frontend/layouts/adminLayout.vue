<template>
  <div class="adminpanel">
    <adminheader />
    <adminsidebar />
    <div class="contentSide">
      <adminbreadcrumb />
      <nuxt style="padding:10px;" />
    </div>
  </div>
</template>

<script>
import adminheader from '~/components/adminComponents/AdminHeader.vue'
import adminsidebar from '~/components/adminComponents/AdminSideBar.vue'
import adminbreadcrumb from '~/components/adminComponents/AdminBreadCrumb.vue'
export default {
  middleware: 'auth',
  components: {
    adminheader,
    adminsidebar,
    adminbreadcrumb
  }
}
</script>

<style lang="scss" scoped>
.adminpanel {
  // height: 100%;
  height: calc(100% - 50px);
  background: #eef5f9;
  .contentSide {
    margin-left: 234px;
    min-height: 287px;
    background: #eef5f9;
    // height: 100%;
    height: calc(100% - 2px);
    overflow: hidden;
    // padding-bottom: 60px;
  }
}
</style>
