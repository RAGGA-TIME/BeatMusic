<template>
    <transition name="slide-fade">
        <div v-show="show" style="display:inline-block; position:relative; margin-left:30px;">
            <div v-if="showBigContext" id="overviewxShowBigContext" class="showBigContext">
                <div id="overviewBackDiv" @click="backTurn" class="backDiv">
                    <img src="../../../assets/icons/back.png" />
                    <span>back</span>
                </div>
                <div id="overviewxContext" class="overviewContext">
                    {{overviewd.introduction}}
                </div>
                <div id="overviewLast" style="position:absolute; display:flex; color:#fff; bottom:5vh; width:100%; text-align:center; font-size:14 px;">
                        <div style="width:33.3%">
                                <div style="font-size:40px; font-weight:bold;">01</div>
                                <div>Ablums</div>
                        </div>
                        <div style="width:33.3%">
                                <div style="font-size:40px; font-weight:bold;">01</div>
                                <div>Single</div>
                        </div>
                        <div style="width:33.3%">
                                <div style="font-size:40px; font-weight:bold;">2142</div>
                                <div>Listen</div>
                        </div>
                </div>
            </div>
            <!-- 常规大小 -->
            <div v-if="showNomalContext" id="overviewxShowNomalContext" class="showNomalContext">
                <div v-show="inside" class="overviewWebtitle" style="z-index: 9;">
                    <span>overview</span>
                    <div class="contexts">{{overviewd.introduction}}</div>
                    <div class="read_more">Read more</div>
                    <div style="margin-top:15px;">
                            <img @click="biger" style="width:25px; height:25px;" src="../../../assets/icons/more.png">
                    </div>
                </div>
            </div>
            <div id="overviewxclap" class="overviewclap"></div>
        </div>
    </transition>
</template>

<script>
import store from '../../../store.js'
export default {
  store,
  props: {
    show: Boolean,
    mobilex: { type: Boolean, default: false }
  },
  data () {
    return {
      showNomalContext: true,
      showBigContext: false,
      inside: true,
      overviewd: this.$store.state.nowMusician,
      albumNumber: this.$store.state.albumNumber,
      singleNumber: this.$store.state.singleNumber
    }
  },
  methods: {
    changeOverviewx () {
      this.overviewd = this.$store.state.nowMusician
      setTimeout(() => {
        this.albumNumber = this.$store.state.albumNumber
        this.singleNumber = this.$store.state.singleNumber
      }, 500)
    },
    biger () {
      this.$store.state.isCanClickBackGround = false
      this.$emit('getcancel', 'showoverview')
      this.inside = false
      setTimeout(() => {
        $('#overviewxShowNomalContext').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' }, () => {
          this.showNomalContext = false
          this.showBigContext = true
        })
        $('#overviewxclap').css('position', 'fixed').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' })
      }, 400)
    },
    backTurn () {
      this.showNomalContext = true
      this.showBigContext = false
      setTimeout(() => {
        $('#overviewxShowNomalContext').animate({ width: '190px', height: '240px', right: '', top: '' }, () => {
          this.inside = true
          this.$emit('getcancel', 'showoverview')
          $('#overviewxclap').css('position', 'absolute')
          $('#overviewxShowNomalContext').css({ right: '', top: '' })
          this.$store.state.isCanClickBackGround = true
        })
      }, 100)
      $('#overviewxclap').animate({ width: '190px', height: '240px', right: '0px', top: '0px' })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/togerher.scss";
@import "../../../assets/scss/together_animation.scss";

.showNomalContext {
    width:190px; height:240px; background-color:rgba(255,255,255,0.15); border-radius:8px;
}
.showBigContext {
    width:100vh; height:50vh; background-color:rgba(255,255,255, 0.15); position:fixed; top:50vh;
}

.overviewContext {
    width:80vw; line-height:3.5vh; height:21vh; overflow-y:scroll; margin-left:10vw;
    color:#fff; position:absolute; top:13vh; white-space: normal;
}
.overviewContext::-webkit-scrollbar{
        display:none;
}

.overviewWebtitle {
    padding-top:22px; margin-left:20px; font-size:14px; color:#fff; opacity:1; font-weight:bold; position:absolute;
    .contexts {
        font-weight:200; font-size:12.5px; width:160px; color:#fff;
        margin-top:25px; line-height:20px; height:100px; overflow:hidden;
        white-space: normal;
    }
    .read_more {
        font-size:10px; opacity:0.5; font-weight:100; margin-top:10px
    }
}
.play {
    width:35px; height:35px; position:absolute; left:20px; top:75px;
}
.firstSongName {
    top:120px; left:20px; position:absolute; font-size:25px; color:#fff; font-weight:bold;
}
.albumTitle {
    top:155px; left:22px; position:absolute; font-size:15px; color:#fff;
}
.more {
    display:flex; top:180px; left:22px; position:absolute;
    .imgxx {
        width:48px; height:48px; background-color:#fff; border-radius:10px;
    }
}
.backDiv {
    position: absolute;
    left: 5vw;
    top: 7vh;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    img {
        width: 35px;
        height: 23px;
    }
    span {
        margin-top: 3px;
        margin-left: 14px;
    }
}

.overviewclap {
  position: absolute;
  z-index: -1;
  width: 190px;
  height: 240px;
  top:0px;
  right:0px;
  overflow: hidden;
  border-radius: 8px;
}

.overviewclap:before {
  content:'';
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin:-30px;
  z-index:-1;
  -webkit-filter:blur(20px);
  filter:blur(20px);
  background:url("https://qiniu.rainwe.com/Swedish_House_Mafia__03.png") no-repeat center 0 / cover fixed;
}
</style>
