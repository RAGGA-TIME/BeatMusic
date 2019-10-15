<template>
<transition name="fade">
        <div id="moreBack" class="moreBack" v-if="showMoreMusicer && !isMobile">
                <transition name="fade">
                        <div v-show="moreBackground" id="moreBackground" style="position:absolute; width:100vw; height:100vh;"></div>
                </transition>
                <div class="insideBack">
                        <div class="fatherDiv">
                                <div :id="index" @mouseenter="mouseDiv(index,item.bigurl)" @click="clickDiv(item)"
                                @mouseleave="mouseDivx(index)" v-for="(item, index) in moreData" :key="index" class="sonDiv">
                                        <span class="sonDivFont">{{item.name}}</span>
                                        <div :id="index + 'in'" style="position:absolute; width:100%; height:100%;"></div>
                                </div>
                        </div>

                </div>
        </div>
        <div id="moreBackMobile" class="moreBackMobile" v-if="showMoreMusicer && isMobile">
                <transition name="fade">
                        <div v-show="moreBackground" id="moreBackground" style="position:absolute; width:100vw; height:100vh;"></div>
                </transition>
                <div class="insideBackMobile">
                        <div class="fatherDivMobile">
                                <div :id="index" @mouseenter="mouseDiv(index,item.bigurl)" @click="clickDiv(item)"
                                @mouseleave="mouseDivx(index)" v-for="(item, index) in moreData" :key="index" class="sonDivMobile">
                                        <span class="sonDivFontMobile">{{item.name}}</span>
                                        <div :id="index + 'in'" style="position:absolute; width:100%; height:100%;"></div>
                                </div>
                        </div>

                </div>
        </div>
</transition>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  props: {
    showMoreMusicer: Boolean
  },
  data () {
    return {
      topsx: 0,
      isMobile: false,
      marginXs: 0,
      moreData: [
        { _id: 'cweh3r', listen: '', introduction: 'Dannic', name: 'Dannic', bigurl: 'https://qiniu.rainwe.com/Dannic_01.png' },
        { _id: 'cwe43r', listen: '', introduction: 'Blasterjaxx', name: 'Blasterjaxx', bigurl: 'https://qiniu.rainwe.com/Blasterjaxx_01.jpg' },
        { _id: 'cweb3r', listen: '', introduction: 'Clavin', name: 'Clavin Harris', bigurl: 'https://qiniu.rainwe.com/Clavin_Harris.png' },
        { _id: 'cwen3r', listen: '', introduction: 'Kaaze', name: 'Kaaze', bigurl: 'https://qiniu.rainwe.com/KAAZE_01.jpg' },
        { _id: 'cwee3r', listen: '', introduction: 'Nicky Romero', name: 'Nicky Romero', bigurl: 'https://qiniu.rainwe.com/Nicky_Romero_01.jpg' },
        { _id: 'cwex3r', listen: '', introduction: 'Ophidian', name: 'Ophidian', bigurl: 'https://qiniu.rainwe.com/Ophidian.jpg' },
        { _id: 'cwei3r', listen: '', introduction: 'Purple Haze', name: 'Purple Haze', bigurl: 'https://qiniu.rainwe.com/Purple_Haze_01.jpg' },
        { _id: '5d6489b27301853cd071761e', listen: '', introduction: 'Steve Angello', name: 'Steve Angello', bigurl: 'https://qiniu.rainwe.com/Steve_Angello_01.png' },
        { _id: 'cwep3r', listen: '', introduction: 'Swedish House Mafia', name: 'Swedish House Mafia', bigurl: 'https://qiniu.rainwe.com/Swedish_House_Mafia__03.png' },
        { _id: 'cwel3r', listen: '', introduction: 'Hardwell', name: 'Hardwell', bigurl: 'https://qiniu.rainwe.com/Hardwell_01.png' },
        { _id: 'cwem3r', listen: '', introduction: 'Gesaffelstein', name: 'Gesaffelstein', bigurl: 'https://qiniu.rainwe.com/Gesaffelstein_01.png' },
        { _id: 'cwey3r', listen: '', introduction: 'Eric Prydz', name: 'Eric Prydz', bigurl: 'https://qiniu.rainwe.com/Eric-Pyrdz.png' }
      ],
      moreBackground: false
    }
  },
  mounted () {
    this.topsx = this.curHeight * 0.2071759
    this.marginXs = this.curHeight * 0.042824
    Bus.$on('moremusicerx', () => {
      this.isMobile = true
    })
  },
  methods: {
    mouseDiv (index, url) {
      let changeurl = 'url(' + url + ') no-repeat center 0/cover fixed'
      this.moreBackground = true
      $('#' + index).css('background-color', 'rgba(255,255,255,0.2)')
      $('#moreBackground').css('background', changeurl)
    },
    mouseDivx (index) {
      this.moreBackground = false
      $('#moreBackground').css('background', '')
      $('#' + index).removeAttr('style')
      $('#' + index + 'in').removeAttr('style')
    },
    clickDiv (item) {
      this.$emit('changMoreMusicers', item)
    }
  }
}
</script>

<style scoped lang="scss">
.moreBack {
overflow:hidden; width:100vw; height:100vh;background-color:black;
  position:fixed; z-index:13;
}
.insideBack {
  width:93.4668vw; height:79.2824vh; margin-top:20.71759vh; margin-left:3.26157vw;
}

.fatherDiv {
  display:flex; flex-wrap: wrap; width:93.4768vw;
    .sonDiv {
    height:20.71759vh; width:21.00456vw; margin-top:4.2824vh; margin-left:1.89171vw; position:relative; border-radius:5px; overflow:hidden;
        .sonDivFont {
          font-size:25px; font-weight:bold; color:#fff; position:absolute; top:60%; left:15%;
        }
    }
}

.moreBackMobile {
width:100vw; height:100vh;background-color:black;
  position:fixed; z-index:13;
}
.insideBackMobile {
  width:93.4668vw; height:79.2824vh; margin-top:20.71759vh; margin-left:3.26157vw;
}

.fatherDivMobile {
  width:93.4768vw; overflow-y:scroll; height:100vh;
    .sonDivMobile {
    height:24vh; width:80vw; margin-top:4.2824vh; margin-left:1.89171vw; position:relative; border-radius:5px; overflow:hidden;
        .sonDivFontMobile {
          font-size:28px; font-weight:bold; color:#fff; position:absolute; top:60%; left:15%;
        }
    }
}

::-webkit-scrollbar{
    display:none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
