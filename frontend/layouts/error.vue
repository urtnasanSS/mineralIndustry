<template>
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
        <button type="button" @click="$nuxt.$router.replace({path: '/'})">
          Эхлэл хуудасруу очих
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$c-1: #203075;
$c-2: lighten($c-1, 5%);

.outer1,
.outer2 {
  height: 100vh;
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
    position: relative;
  background: linear-gradient($c-1, $c-2);
  overflow: hidden;
  &:before {
    height: 105vmax;
    width: 105vmax;
    z-index: -4;
  }
  &:after {
    height: 80vmax;
    width: 80vmax;
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
    height: 60vmax;
    width: 60vmax;
    z-index: -2;
  }
  &:after {
    height: 40vmax;
    width: 40vmax;
    z-index: -1;
  }
}

.main {
  text-align: center;
  z-index: 5;
}

p {
  font-size: 18px;
  margin-top: 0;
}

h1 {
  font-size: 125px;
  margin: 0;
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
  font:  16px/2.5 Nunito, "Varela Round", Sans-serif;
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
    top: 15vh;
    left: 15vw;
    height: 22vmin;
    width: 22vmin;
    &:before {
      width: 13vmin;
      height: 13vmin;
      bottom: -25vh;
      right: -10vmin;
    }
  }
  &:nth-child(2) {
    top: 20vh;
    left: 38vw;
    height: 10vmin;
    width: 10vmin;
    &:before {
      width: 5vmin;
      height: 5vmin;
      bottom: -10vh;
      left: -8vmin;
    }
  }
  &:nth-child(3) {
    top: 12vh;
    right: 30vw;
    height: 13vmin;
    width: 13vmin;
    &:before {
      width: 3vmin;
      height: 3vmin;
      bottom: -15vh;
      left: -18vmin;
      z-index: 6;
    }
  }
  &:nth-child(4) {
    top: 25vh;
    right: 18vw;
    height: 18vmin;
    width: 18vmin;
    &:before {
      width: 7vmin;
      height: 7vmin;
      bottom: -10vmin;
      left: -15vmin;
    }
  }
  &:nth-child(5) {
    top: 60vh;
    right: 18vw;
    height: 28vmin;
    width: 28vmin;
    &:before {
      width: 10vmin;
      height: 10vmin;
      bottom: 5vmin;
      left: -25vmin;
    }
  }
}
</style>
