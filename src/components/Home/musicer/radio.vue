<template>
    <transition name="slide-fade">
        <div v-show="show" style="display:inline-block; position:relative; margin-left:30px;">
            <div v-if="showBigContext" id="radioxShowBigContext" class="showBigContext">
                <div id="radioxBackDiv" @click="backTurn" class="backDiv">
                    <img src="../../../assets/icons/back.png" />
                    <span>back</span>
                </div>
                <div id="radioxContext" class="radiolist">
                    <div v-for="(itemf, index) in radios" :key="index" :id="itemf._id">
                        <div v-for="(itemx, index) in itemf.have_radios" :key="index" :id="itemx._id" class="radiolistson">
                            <div class="radiolisturl" :style="{ background :`url('${itemx.audio_cover_url}') no-repeat center 0/cover` }"></div>
                            <div class="radiolisttext">
                                <span>{{itemx.name}}</span>
                                <div class="artist">{{itemf.name}}</div>
                            </div>
                            <img @click="startPlay(itemx)" class="inplay" src="../../../assets/icons/play.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showNomalContext" id="radioxShowNomalContext" class="showNomalContext">
                    <div v-show="inside">
                        <div class="radioWebtitle">
                            <span>radio</span>
                        </div>
                        <img v-if="radios.length > 0" @click="biger" class="play" style="z-index:12" src="../../../assets/icons/radio.png">
                        <div style="color:#fff; position:absolute; top:80px; left:20px" v-if="radios.length === 0">No resources</div>
                        <div v-if="radios[0]" style="position:absolute; top:115px; color:#fff; left:20px; font-size:18px; font-weight:bold; width:140px; overflow: hidden;">
                            {{radios[0].name}}
                        </div>
                        <div v-if="radios[0]" style="position:absolute; top:137px; color:#fff; left:20px; font-size:16px; font-weight:bold;">
                        <div v-if="radios[0].have_radios[0]" style="display:flex; margin-top:15px;">
                            <img :src="radios[0].have_radios[0].audio_cover_url" style="width:30px; height:30px; background-color:#fff; border-radius:6px;">
                            <span style="margin-left:11px; margin-top:3px; font-size:13px; width:80px; overflow: hidden;">{{radios[0].have_radios[0].name}}</span>
                            <img  @click="startPlay(radios[0].have_radios[0])" style="width:19px; height:20px; margin-top:5px; margin-left:10px;" src="../../../assets/icons/play.png">
                        </div>
                            <div v-if="radios[0].have_radios[1]" style="display:flex; margin-top:15px;">
                            <img :src="radios[0].have_radios[1].audio_cover_url" style="width:30px; height:30px; background-color:#fff; border-radius:6px;">
                            <span style="margin-left:11px; margin-top:3px; font-size:13px; width:80px; overflow: hidden;">{{radios[0].have_radios[1].name}}</span>
                            <img  @click="startPlay(radios[0].have_radios[1])" style="width:19px; height:20px; margin-top:5px; margin-left:10px;" src="../../../assets/icons/play.png">
                        </div>
                        </div>
                    </div>
            </div>
            <div id="radioxclap" class="radioclap"></div>
        </div>
    </transition>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  name: 'radio',
  props: {
    show: Boolean,
    mobilex: { type: Boolean, default: false }
  },
  data () {
    return {
      showNomalContext: true,
      showBigContext: false,
      inside: true,
      radios: []
    }
  },
  methods: {
    startPlay (music) {
      let newMusic = []
      newMusic.push({
        cover_url: music.audio_cover_url,
        music_url: music.audio_url,
        name: music.name,
        author: this.$store.state.nowMusician.name,
        _id: music._id
      })
      Bus.$emit('getSongx', newMusic[0])
    },
    biger () {
      this.$store.state.isCanClickBackGround = false
      this.$emit('getcancel', 'showradio')
      this.inside = false
      setTimeout(() => {
        $('#radioxShowNomalContext').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' }, () => {
          this.showNomalContext = false
          this.showBigContext = true
        })
        $('#radioxclap').css('position', 'fixed').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' })
      }, 400)
    },
    backTurn () {
      this.showNomalContext = true
      this.showBigContext = false
      setTimeout(() => {
        $('#radioxShowNomalContext').animate({ width: '190px', height: '240px', right: '', top: '' }, () => {
          this.inside = true
          this.$emit('getcancel', 'showradio')
          $('#radioxclap').css('position', 'absolute')
          $('#radioxShowNomalContext').css({ right: '', top: '' })
          this.$store.state.isCanClickBackGround = true
        })
      }, 100)
      $('#radioxclap').animate({ width: '190px', height: '240px', right: '0px', top: '0px' })
    },
    async getMyRadioAndAudio () {
      if (this.$store.state.nowMusician._id === '5d64a30c31ff308068700a7b') {
        let result = await this.$MusicHttp.GetFirstRadioAndAudio()
        this.radios = result
      } else if (this.$store.state.nowMusician._id === '5d6489d37301853cd071761f') {
        let result = await this.$MusicHttp.GetSecondRadioAndAudio()
        this.radios = result
      } else if (this.$store.state.nowMusician._id === '5d6489b27301853cd071761e') {
        let result = await this.$MusicHttp.GetThirdRadioAndAudio()
        this.radios = result
      } else if (this.$store.state.nowMusician._id === '5d64897b7301853cd071761d') {
        let result = await this.$MusicHttp.GetFourthRadioAndAudio()
        this.radios = result
      } else if (this.$store.state.nowMusician._id === '5d6ddcb9df45f655e8dedfd3') {
        let result = await this.$MusicHttp.GetFifthRadioAndAudio()
        this.radios = result
      }
    },
    async searchRadioAndAudio () {
      let result = await this.$MusicHttp.SearchRadioAndAudio()
      this.radios = result
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
    width:100vw; height:50vh; background-color:rgba(255,255,255,0.15); position:fixed; top:50vh;
}

    .radioWebtitle {
        padding-top:22px; margin-left:20px; font-size:14px; color:#fff; opacity:1; font-weight:bold; position:absolute;
    }
    .play {
        width:32px; height:32px; position:absolute; left:20px; top:65px;
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

.radiolist {
    width: 100vw;
    position: absolute;
    top: 12vh;
    height: 35vh;
    overflow-x: hidden;
    overflow-y: scroll;
    .radiolistson {
        width: 90vw;
        height: 100px;
        display: flex;
        opacity: 1;
        margin-left: 5vw;
        .radiolisturl {
            width: 45px;
            height: 45px;
            border-radius: 8px;
            margin-top: 27.5px;
        }
        .radiolisttext {
            color: #fff;
            position: relative;
            width: 65vw;
            overflow: hidden;
            margin-left: 20px;
            margin-top: 26px;
            font-size: 20px;
            font-weight: bold;
            .artist {
                font-weight: 100;
                font-size: 14px;
                opacity: 0.6;
                margin-top: 4px;
            }
        }
        .inplay {
            width: 30px;
            height: 30px;
            margin-top: 36px;
            position: absolute;
            right: 4vw;
        }
    }
}
.radiolist::-webkit-scrollbar {
    display: none;
}

.radioclap {
  position: absolute;
  z-index: -1;
  width: 190px;
  height: 240px;
  top:0px;
  right:0px;
  overflow: hidden;
  border-radius: 8px;
}

.radioclap:before {
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
