<template>
<!-- 艺名 -->
<div :style="{ 'width':'100vw','height': '100vh' }" style="overflow:hidden;
background-color:black;" id="bigsco">

    <transition name="slide-fadetop">
    <span @click="lookmore" v-if="showmain.showname" class="Name" id="Name">{{otherProperty.name}}</span>
    </transition>

    <!-- 上一页 下一页 -->
    <transition name="slide-faderight">
        <div @click="rightClick" @mouseover="mouseoverNext" @mouseleave="mouseleaveNext"
        v-if="showmain.shownext && isSee" class="next" id="next" :style="{ 'background':'url(' + otherProperty.thimgNext + ') no-repeat center 0/cover' }">
            <div id="nextDong" class="nextDong"></div>
        </div>
    </transition>

    <transition name="slide-fadeleft">
    <div @click="leftClick" @mouseover="mouseoverUp" @mouseleave="mouseleaveUp"
    v-if="showmain.showup && isSee" class="up" id="up" :style="{ 'background':'url(' + otherProperty.thimgUp + ') no-repeat center 0/cover' }">
        <div id="upDong" class="upDong"></div>
    </div>
    </transition>

    <!-- 加载条 -->
    <transition name="slide-fadetop">
    <div v-if="showmain.showload" class="loadItem" id="loadItem">
        <div class="items"></div>
    </div>
    </transition>

    <transition name="slide-faderight">
    <img v-if="showmain.showleft" id="left" @mouseover="mouseoverLeft" @mouseleave="mouseleaveLeft"
    @click="leftClick" class="left" src="../../../assets/icons/left.png">
    </transition>

    <transition name="slide-faderight">
    <img v-if="showmain.showright" id="right" @mouseover="mouseoverRight" @mouseleave="mouseleaveRight"
    @click="rightClick" class="right" src="../../../assets/icons/right.png">
    </transition>

    <div @click="lookmore" class="backgounx" id="backgounx"></div>
    <!-- :style="{ background: 'url(' + otherProperty.bigurl + ') no-repeat center 0/cover fixed' }" -->

</div>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  props: {
    showmain: {
      showload: Boolean,
      showname: Boolean,
      showup: Boolean,
      shownext: Boolean,
      showleft: Boolean,
      showright: Boolean
    },
    otherProperty: {
      name: String,
      thimgNext: String,
      thimgUp: String
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      isSee: true
    }
  },
  mounted () {
    this.WindowsChange()
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.WindowsChange()
      })()
    }
  },
  methods: {
    changeWidthAfter () {
      this.isSee = false
      $('#more').css({ 'width': '25px', 'right': '12vw' })
      $('#menu').css({ 'width': '20px', 'left': '10%' })
      $('#logo').css('display', 'none')
      $('#left, #right').css({ 'width': '35px', 'height': '35px' })
      $('#searchDiv').css({ 'top': '9.4vh' })
      $('#searchInput').css('font-size', '18px')
      $('#iconsearch').css({ 'width': '19px', 'height': '19px' })
    },
    WindowsChange () {
      if (this.screenWidth < 1200) { this.changeWidthAfter(); this.$emit('listenToEventts', false) }
      if (this.screenWidth < 900) { this.$emit('listenToEventts', true) }
      if (this.screenWidth < 600) {
        this.$emit('listenToEventts', true)
        Bus.$emit('moremusicerx')
        $('#firstLogo').css({ 'width': '300px', 'height': '141px' })
      }
      if (this.screenWidth > 600) { this.$emit('playerState', true) }
      if (this.screenWidth > 1200) { this.$emit('listenToEventts', false) }
    },
    lookmore () {
      let linkx = 5
      if (this.$store.state.isCanClickBackGround === false) { return }
      this.$emit('listenToEvent', linkx)
    },
    // left
    mouseoverLeft () { $('#left').fadeTo('fast', 0.5) },
    mouseleaveLeft () { $('#left').fadeTo('fast', 1) },
    leftClick () {
      let active = 'up'
      this.$emit('listenToEventx', active)
    },
    // right
    mouseoverRight () { $('#right').fadeTo('fast', 0.5) },
    mouseleaveRight () { $('#right').fadeTo('fast', 1) },
    rightClick () {
      let active = 'next'
      this.$emit('listenToEventx', active)
    },
    // up
    mouseoverUp () { $('#upDong').css('display', 'flex'); $('#upDong').animate({ width: '190px', opacity: '0' }) },
    mouseleaveUp () { $('#upDong').animate({ width: '0px', opacity: '1' }) },
    // next
    mouseoverNext () { $('#nextDong').css('display', 'flex'); $('#nextDong').animate({ width: '190px', opacity: '0' }) },
    mouseleaveNext () { $('#nextDong').animate({ width: '0px', opacity: '1' }) }
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/scss/togerher.scss";
@import "../../../assets/scss/mainchanges_animation.scss";
@import "../../../assets/scss/mainchanges_main.scss"
</style>
