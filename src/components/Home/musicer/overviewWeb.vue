<template>
        <transition name="slide-fade">
            <div v-show="show" class="overviewWeb">
                <div v-if="showBigContext" id="overviewShowBigContext" class="showBigContext">
                    <div id="overviewBackDiv" @click="backTurn" class="backDiv">
                        <img src="../../../assets/icons/back.png" />
                        <span>back</span>
                    </div>
                        <div id="overviewContext" class="overviewContext">
                            {{overviewd.introduction}}
                        </div>
                        <div id="overviewLast" style="position:absolute; display:flex; color:#fff; top:88vh; width:100%; text-align:center; font-size:14 px;">
                                <div style="width:33.3%">
                                        <div style="font-size:40px; font-weight:bold;">{{albumNumber}}</div>
                                        <div>Ablums</div>
                                </div>
                                <div style="width:33.3%">
                                        <div style="font-size:40px; font-weight:bold;">{{singleNumber}}</div>
                                        <div>Single</div>
                                </div>
                                <div style="width:33.3%">
                                        <div style="font-size:40px; font-weight:bold;">{{overviewd.listen}}</div>
                                        <div>Listen</div>
                                </div>
                        </div>
                </div>
                <div v-if="showNomalContext" id="overviewShowNomalContext" class="showNomalContext">
                    <div v-show="inside" class="overviewWebtitle" style="z-index: 9;">
                            <span>overview</span>
                            <div class="contexts">{{overviewd.introduction}}</div>
                            <div class="read_more">Read more</div>
                            <div style="margin-top:15px;">
                                    <img @click="biger" style="width:25px; height:25px;" src="../../../assets/icons/more.png">
                            </div>
                    </div>
                </div>
                <div v-show="show" id="overviewclap" class="overviewclap"></div>
            </div>
        </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
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
  mounted () {
  },
  methods: {
    changeOverview () {
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
        $('#overviewShowNomalContext').animate({ width: '45vw', height: '100vh', right: '0px', top: '0px' }, () => {
          this.showNomalContext = false
          this.showBigContext = true
        })
        $('#overviewclap').css('position', 'fixed').animate({ width: '45vw', height: '100vh', right: '0px', top: '0px' })
      }, 400)
    },
    backTurn () {
      this.showNomalContext = true
      this.showBigContext = false
      setTimeout(() => {
        $('#overviewShowNomalContext').animate({ width: '190px', height: '240px', right: '80px', top: '425px' }, () => {
          this.inside = true
          this.$emit('getcancel', 'showoverview')
          $('#overviewclap').css('position', 'absolute')
          $('#overviewShowNomalContext').css({ right: '', top: '' })
          this.$store.state.isCanClickBackGround = true
        })
      }, 100)
      $('#overviewclap').animate({ width: '190px', height: '240px', right: '0px', top: '0px' })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/togerher.scss";
@import "../../../assets/scss/together_animation.scss";
.overviewWeb {
    position:absolute; width:190px; height:240px; top:425px; right:80px; z-index:10; border-radius:8px;
    .showNomalContext {
         position:fixed;z-index:12; background-color:rgba(255,255,255, 0.15); border-radius:8px; width:190px; height:240px;
    }
    .showBigContext {
        width:40vw; height:100vh; position:fixed; background-color:rgba(255,255,255, 0.15); right:0px; top:0px; z-index:11;
        .overviewContext {
            width:32vw; line-height:3.5vh; height:50vh; overflow-y:scroll; margin-left:6vw;
            color:#fff; position:absolute; top:24vh; white-space: normal;
        }
        .overviewContext::-webkit-scrollbar{
                display:none;
        }
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
        left: 4vw;
        top: 10.1vh;
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
