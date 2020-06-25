<template>
  <transition-group id="slides" name="fade" mode="out-in" tag="div">
    <div :key="image.id" class="slideParent">
      <div class="slideImage" :style="setBackgroundImage">
        <div class="slideTitle" @click="handleClickTitle(image.id)">
          {{ image.title }}
        </div>
        <div class="slideDescription">
          {{ image.description }}
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: { image: { type: Object, default: () => ({}) } },
  computed: {
    setBackgroundImage () {
      return { backgroundImage: 'url(' + this.image.url + ')' }
    }
  },
  methods: {
    handleClickTitle (id) {
      this.$emit('handleClickTitle', id)
    }
  }
}
</script>

<style lang="scss">
$color-slidetext: white;
$animation-zoom-duration: 20s;
$fontsize-slidetext: 40px;
#slides {
  height: inherit;
  width: inherit;
  .slideParent {
    width: 100%;
    height: 100%;
    .slideImage {
      height: 100%;
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      animation-fill-mode: forwards;
      .slideTitle {
        background-color: rgba(0, 0, 0, 0.521);
        padding: 5px 10px;
        color: $color-slidetext;
        font-size: 14px;
        position: absolute;
        bottom: 80px;
        left: 20px;
        text-transform: uppercase;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .slideDescription {
        font-size: 11px;
        bottom: 30px;
        left: 20px;
        position: absolute;
        color: white;
        right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.fade-enter-active {
  animation-name: fadeEnter;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
.fade-move {
  transition: all 1s;
}
.fade-leave-active {
  animation-name: fadeLeave;
  animation-duration: 1s;
  animation-iteration-count: 1;
  position: absolute;
}
@keyframes zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
@keyframes fadeEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeLeave {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
