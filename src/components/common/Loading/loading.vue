<template>
    <div>
        <transition name="fade">
            <div v-if="loadFlag" class="loading" :style="{ width: widthx + 'vw' }"></div>
        </transition>
        <transition name="fade">
            <div v-if="loadFlagx" class="loading" :style="{ width: 100 + 'vw' }"></div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'MyLoading', //  组件名称
  props: {
    loadFlag: { type: Boolean, default: false }
  },
  data () {
    return {
      widthx: 1,
      loadFlagx: false
    }
  },
  watch: {
    loadFlag () {
      if (this.loadFlag) {
        let that = this
        that.widthx = 1
        let loadingRun = setInterval(function () {
          that.widthx++; if (that.widthx >= 99) {
            clearInterval(loadingRun)
          }
        }, 80)
      }
      if (!this.loadFlag) {
        this.widthx = 100; this.loadFlagx = true; let that = this
        setTimeout(function () { that.loadFlagx = false }, 500)
      }
    }
  },
  created () {
    let that = this
    let loadingRun = setInterval(function () {
      that.widthx++; if (that.widthx >= 99) {
        clearInterval(loadingRun)
      }
    }, 50)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loading {
  width:1vw; height:1.5px; background-color:#2c2c2c;  transition: all .5s;
  position:fixed; z-index:999; top:0px; box-shadow: 1px 1px 1px #333333;
}
</style>
