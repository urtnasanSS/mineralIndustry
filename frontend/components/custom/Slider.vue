<template>
  <div id="slider" :style="`height: ${height};width: ${width};`">
    <div title="previous image" class="arrowLeft" @click="arrowLeft()" />
    <Slides :image="images[chosenImage]" @handleClickTitle="handleClickTitle" />
    <div title="next image" class="arrowRight" @click="arrowRight()" />
    <div class="controls">
      <div class="squares">
        <div
          v-for="image in images"
          :key="image.id"
          :title="'Goto image ' + image.id"
          :class="'indicator ' + (image.id == chosenImage + 1 ? 'active' : '')"
        />
        <!-- @click="squares(image.id - 1)" -->
      </div>
    </div>
  </div>
</template>

<script>
import Slides from './Slides.vue'
export default {
  components: {
    Slides
  },
  // props: ['images', 'intervalDuration', 'height', 'width'],
  props: {
    images: { type: Array, default: () => ([]) },
    intervalDuration: { type: Number, default: 0 },
    height: { type: String, default: '' },
    width: { type: String, default: '' }
  },
  data () {
    return {
      chosenImage: 0,
      intervalObject: null,
      pauseplayToggle: false // false - play, true - pause
    }
  },
  created () {
    this.setIntervalSlider('right')
  },
  methods: {
    handleClickTitle (id) {
      this.$emit('handleClickTitle', id)
    },
    squares (id) {
      this.chosenImage = id
      clearInterval(this.intervalObject)
      this.setIntervalSlider('right')
      this.pauseplayToggle = false
    },
    arrowLeft () {
      clearInterval(this.intervalObject)
      this.moveLeft()
      this.setIntervalSlider('left')
    },
    arrowRight () {
      clearInterval(this.intervalObject)
      this.moveRight()
      this.setIntervalSlider('right')
    },
    moveLeft () {
      let flag = this.chosenImage
      flag--
      if (flag < 0) {
        flag = this.images.length - 1
      }
      this.chosenImage = flag
      this.pauseplayToggle = false
    },
    moveRight () {
      let flag = this.chosenImage
      flag++
      if (flag >= this.images.length) {
        flag = 0
      }
      this.chosenImage = flag
      this.pauseplayToggle = false
    },
    pauseplay (action) {
      // console.log('in pauseplay method ', action)
      if (action === 'play') {
        this.arrowRight()
        this.pauseplayToggle = false
      } else if (action === 'pause') {
        clearInterval(this.intervalObject)
        this.pauseplayToggle = true
      }
    },
    setIntervalSlider (direction) {
      const self = this
      this.intervalObject = setInterval(() => {
        if (direction === 'right') {
          self.moveRight()
        } else if (direction === 'left') {
          self.moveLeft()
        }
      }, this.intervalDuration)
    }
  }
}
</script>

<style lang="scss">
$color-arrow: rgba(0, 136, 204, 0.486);
$color-slideindicator: rgba(88, 88, 79, 0.522);
$color-playbutton: rgba(0, 136, 204, 0.486);
$color-pausebutton: rgba(0, 136, 204, 0.486);
$controls-height-width: 10px;
$controls-innerchild-right-margin: 10px;
$controls-pauseplay-topdown-margin: 5px;
$controls-pauseplay-font-size: 20px;
$controls-squares-font-size: 15px;
$controls-squares-active-backgroundcolor: rgba(0, 136, 204, 0.486);
$controls-squares-active-font-color: white;
#slider {
  position: relative;
  overflow: hidden;
  // height: 200px;
  // width: 100%;
  .arrowLeft,
  .arrowRight {
    z-index: 3 !important;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 15px solid transparent;
    cursor: pointer;
  }
  .arrowLeft {
    border-right-color: $color-arrow;
    z-index: 1;
  }
  .arrowRight {
    right: 0;
    border-left-color: $color-arrow;
  }
  .controls {
    z-index: 3 !important;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    .squares {
      div {
        margin-bottom: 10px;
        height: $controls-height-width;
        width: $controls-height-width;
        line-height: $controls-height-width;
        text-align: center;
        margin-right: $controls-innerchild-right-margin;
        display: inline-block;
        background-color: $color-slideindicator;
        border-radius: 50%;
        cursor: pointer;
        font-size: $controls-squares-font-size;
      }
      .active {
        background-color: $controls-squares-active-backgroundcolor;
        color: $controls-squares-active-font-color;
      }
    }
    .pauseplay {
      display: flex;
      justify-content: center;
      margin: $controls-pauseplay-topdown-margin 0;
      font-size: $controls-pauseplay-font-size;
      div {
        display: inline-block;
        height: $controls-height-width;
        line-height: $controls-height-width;
        width: $controls-height-width;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        margin-right: $controls-innerchild-right-margin;
      }
      .play {
        color: $color-playbutton;
      }
      .pause {
        color: $color-pausebutton;
      }
    }
  }
}
</style>
