<template>
    <transition name="slide-fade">
        <div v-show="show" style="display:inline-block; position:relative; margin-left:30px;">
            <!-- 放大 -->
            <div v-if="showBigContext" id="musicShowBigContext" class="showBigContext">
                <div id="musicBackDiv" @click="backTurn" class="backDiv">
                    <img src="../../../assets/icons/back.png" />
                    <span>back</span>
                </div>
                <!-- 音乐列表 -->
                <div id="musicContext" class="musiclist">
                    <!-- 专辑子元素 -->
                    <!--  -->
                    <!-- 单曲子元素 -->
                    <div v-show="true" v-for="(itemf, index) in musics" :key="index" :id="itemf._id" class="musiclistson">
                        <div class="musiclisturl" :style="{ background :`url('${itemf.cover_url}') no-repeat center 0/cover` }"></div>
                        <div class="musiclisttext">
                            <span>{{itemf.name}}</span>
                            <div class="artist">Single</div>
                        </div>
                        <img @click="startPlay2(itemf)" class="inplay" src="../../../assets/icons/play.png" />
                    </div>
                </div>
            </div>
            <!-- 常规大小 -->
            <div v-if="showNomalContext" id="musicxShowNomalContext" class="showNomalContext">
                <div style="color:#fff; position:absolute; top:80px; left:20px" v-if="musics.length === 0">No resources</div>
                <div v-show="inside">
                    <div class="musicWebtitle">
                        <span>music</span>
                    </div>
                    <div v-if="musics.length !== 0" >
                        <div id="xx1">
                            <img @click="startPlay(albums[0].have_music[0])" class="play" src="../../../assets/icons/play.png">
                        </div>
                        <div class="firstSongName">{{albums[0].have_music[0].name}}</div>
                        <div class="albumTitle">{{albums[0].name}}</div>
                        <div class="more">
                            <img v-if="albums[0]" :src="albums[0].album_cover_url" class="imgxx">
                            <img v-if="albums[1]" class="imgxx" :src="albums[1].album_cover_url" style="margin-left:20px;">
                            <div @click="biger" class="imgxx" style="box-shadow: 0px 0px 8px -3px; margin-left:20px; font-size:20px; font-weight:bold;">
                            <div style="padding:11.5px;">+{{musics.length}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="musicxclap" class="musicclap"></div>
        </div>
    </transition>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  props: {
    show: Boolean,
    mobilex: { type: Boolean, default: false }
  },
  data () {
    return {
      showNomalContext: true,
      showBigContext: false,
      inside: true,
      musics: [],
      albums: []
    }
  },
  mounted () { },
  methods: {
    startPlay (music) {
      music.author = this.$store.state.nowMusician.name
      $('#xx1').prepend('<img id="webplay1" style="position:fixed; width:30px; height:30px; top:237px; right:217px; border-radius:10px;" src=' + this.albums[0].have_music[0].cover_url + '>')
      $('#webplay1').animate({ top: '10%', left: '5%', width: '0px', height: '0px' }, () => {
        $('#webplay1').remove()
        Bus.$emit('getSongx', music)
      })
    },
    startPlay2 (music) {
      music.author = this.$store.state.nowMusician.name
      Bus.$emit('getSongx', music)
    },
    biger () {
      this.$store.state.isCanClickBackGround = false
      this.$emit('getcancel', 'showmusic')
      this.inside = false
      setTimeout(() => {
        $('#musicxShowNomalContext').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' }, () => {
          this.showNomalContext = false
          this.showBigContext = true
          for (let i = 0; i < this.musics.length; i++) {
            (() => {
              setTimeout(() => { $('#' + this.musics[i]._id).animate({ marginLeft: '4vw', opacity: '1' }) }, 100 * i)
            })()
          }
        })
        $('#musicxclap').css('position', 'fixed').animate({ width: '100vw', height: '50vh', right: '0px', top: '50vh' })
      }, 400)
    },
    backTurn () {
      this.showNomalContext = true
      this.showBigContext = false
      setTimeout(() => {
        $('#musicxShowNomalContext').animate({ width: '190px', height: '240px', right: '', top: '' }, () => {
          this.inside = true
          this.$emit('getcancel', 'showmusic')
          $('#musicxclap').css('position', 'absolute')
          $('#musicxShowNomalContext').css({ right: '', top: '' })
          this.$store.state.isCanClickBackGround = true
        })
      }, 100)
      $('#musicxclap').animate({ width: '190px', height: '240px', right: '0px', top: '0px' })
    },
    async getMyMusic () {
      if (this.$store.state.nowMusician._id === '5d64a30c31ff308068700a7b') {
        let res = await this.$MusicHttp.GetFirstMusic()
        this.musics = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6489d37301853cd071761f') {
        let res = await this.$MusicHttp.GetSecondMusic()
        this.musics = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6489b27301853cd071761e') {
        let res = await this.$MusicHttp.GetThirdMusic()
        this.musics = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d64897b7301853cd071761d') {
        let res = await this.$MusicHttp.GetFourthMusic()
        this.musics = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6ddcb9df45f655e8dedfd3') {
        let res = await this.$MusicHttp.GetFifthMusic()
        this.musics = res
        this.$store.state.singleNumber = res.length
      }
    },
    async getMyAlbum () {
      if (this.$store.state.nowMusician._id === '5d64a30c31ff308068700a7b') {
        let res = await this.$MusicHttp.GetFirstAlbum()
        this.albums = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6489d37301853cd071761f') {
        let res = await this.$MusicHttp.GetSecondAlbum()
        this.albums = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6489b27301853cd071761e') {
        let res = await this.$MusicHttp.GetThirdAlbum()
        this.albums = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d64897b7301853cd071761d') {
        let res = await this.$MusicHttp.GetFourthAlbum()
        this.albums = res
        this.$store.state.singleNumber = res.length
      } else if (this.$store.state.nowMusician._id === '5d6ddcb9df45f655e8dedfd3') {
        let res = await this.$MusicHttp.GetFifthAlbum()
        this.albums = res
        this.$store.state.singleNumber = res.length
      }
    },
    async searchMusic () {
      let res = await this.$MusicHttp.SearchMusic({ searchContext: this.$store.state.nowMusician.name })
      this.musics = res
    },
    async searchAlbum () {
      let res = await this.$MusicHttp.SearchAlbum({ searchContext: this.$store.state.nowMusician.name })
      this.albums = res
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
    .musicWebtitle {
        padding-top:22px; margin-left:20px; font-size:14px; color:#fff; opacity:1; font-weight:bold; position:absolute;
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

.musiclist {
    width: 100vw;
    position: absolute;
    top: 12vh;
    height: 35vh;
    overflow-x: hidden;
    overflow-y: scroll;
    .musiclistson {
        width: 90vw;
        height: 100px;
        display: flex;
        opacity: 0;
        margin-left: 5vw;
        .musiclisturl {
            width: 45px;
            height: 45px;
            border-radius: 8px;
            margin-top: 27.5px;
        }
        .musiclisttext {
            color: #fff;
            width: 65vw;
            position: relative;
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

.musicclap {
  position: absolute;
  z-index: -1;
  width: 190px;
  height: 240px;
  top:0px;
  right:0px;
  overflow: hidden;
  border-radius: 8px;
}

.musicclap:before {
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
