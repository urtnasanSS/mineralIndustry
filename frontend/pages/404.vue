<template>
  <!-- <div class="outer1">
    <div class="outer2">
      <div class="bubble" />
      <div class="bubble" />
      <div class="bubble" />
      <div class="bubble" />
      <div class="bubble" />
      <div class="main">
        <h1>404</h1>
        <p style="margin-bottom:20px;">
          Хуудас олдсонгүй
        </p>
        <button type="button" @click="$nuxt.$router.replace({path: '/home'})">
          Эхлэл хуудасруу очих
        </button>
      </div>
    </div>
  </div> -->
  <div>
    <client-only>
      <HeaderWithNavbar />
      <div class="container">
        <div class="empty">
          <div class="outer1">
            <div class="outer2">
              <div class="bubble" />
              <div class="bubble" />
              <div class="bubble" />
              <div class="bubble" />
              <div class="bubble" />
              <div class="main">
                <h1>404</h1>
                <p style="margin-bottom:20px;">
                  Хуудас олдсонгүй
                </p>
                <button type="button" @click="$nuxt.$router.replace({path: '/home'})">
                  Эхлэл хуудасруу очих
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foother />
    </client-only>
  </div>
</template>
<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'

export default {
  components: {
    HeaderWithNavbar,
    foother
  }
}

</script>
<style lang="scss" scoped>
$c-1: #203075;
$c-2: lighten($c-1, 5%);
.empty {
  text-align: center;
  height: 400px;
  margin: 1.75rem 1.75rem 0.75rem 1.75rem;
}

.outer1,
.outer2 {
  height: 100%;
  &:before,
  &:after {
    content: "";
    background: linear-gradient($c-1, $c-2);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:before {
    background: linear-gradient($c-2, $c-1);
  }
}

.outer1 {
  background: linear-gradient($c-1, $c-2);
  overflow: hidden;
  &:before {
    z-index: -4;
  }
  &:after {
    z-index: -3;
  }
}

.outer2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Varela Round", Sans-serif;
  text-shadow: 0 30px 10px rgba(#000, 0.15);
  &:before {
    z-index: -2;
  }
  &:after {
    z-index: -1;
  }
}

.main {
  text-align: center;
  z-index: 5;
}

p {
  font-size: 18px;
}

h1 {
  font-size: 105px;
}

button {
  background: linear-gradient(#ffffff, #c4b9be);
  padding: 5px 22px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 30px 15px rgba(#000, 0.15);
  outline: none;
  color: #203075;
  font-weight: bold;
  font:  12px/2.5 Nunito, "Varela Round", Sans-serif;
  text-transform: uppercase;
  cursor: pointer;
}

.bubble {
  background: linear-gradient(#ffffff, #c4b9be);
  border-radius: 50%;
  box-shadow: 0 30px 15px rgba(#000, 0.15);
  position: absolute;
  &:before,
  &:after {
    content: "";
    background: linear-gradient(#ffffff, #c4b9be);
    border-radius: 50%;
    box-shadow: 0 30px 15px rgba(#000, 0.15);
    position: absolute;
  }
  &:nth-child(1) {
    top: 1vh;
    left: 15vw;
    &:before {
      width: 13vmin;
      height: 13vmin;
      bottom: -25vh;
      left: 10vmin;
    }
  }
  &:nth-child(2) {
    top: 20vh;
    left: 45vw;
    height: 10vmin;
    width: 10vmin;
    &:before {
      width: 5vmin;
      height: 5vmin;
      top: 1vh;
      left: 8vw;
    }
  }
  &:nth-child(3) {
    top: 5vh;
    right: 20vw;
    height: 13vmin;
    width: 13vmin;
    &:before {
      width: 3vmin;
      top: 1vh;
      right: 20vw;
      height: 3vmin;
      z-index: 6;
    }
  }
  &:nth-child(4) {
    top: 2vh;
    right: 55vw;
    height: 18vmin;
    width: 18vmin;
  }
  // &:nth-child(5) {
  //   top: 6vh;
  //   right: 18vw;
  //   height: 28vmin;
  //   width: 28vmin;
  //   &:before {
  //     width: 10vmin;
  //     height: 10vmin;
  //     bottom: 5vmin;
  //     left: -25vmin;
  //   }
  // }
}
</style>
