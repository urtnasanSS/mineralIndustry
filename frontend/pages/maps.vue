<template>
  <div>
    <HeaderWithNavbar />
    <calculator />
    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import calculator from '~/components/calculator.vue'
import foother from '~/components/foother.vue'

export default {
  components: {
    HeaderWithNavbar,
    calculator,
    foother
  }
}

</script>
<style>
.center{display:block; margin-left:10% ; margin-right:10% ;padding:0%; }
.logo_mmhi {
  width: 263px;
  height: 82px;
  object-fit: contain;
}

.text{
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
  color: #000000
}
.title{
  font-weight: bold;
  font-style: normal
}

</style>
