<template>
    <div>
        <transition name="slidey-fadey">
            <div v-show="$store.state.showPlayer" id="PlayerPc" class="Player">
            <!-- playlist -->
            <transition name="slidez-fadez">
            <div v-show="isPlayList" class="playlist_container">
                <div class="playlist">Playlist</div>
                <img @click="removeAll" style="width:25px; height:25px; position:absolute; right:27px; top:20px;" src="../../../assets/icons/empty.png">
                <div style="width:100%; height:40vh; overflow-y: scroll; ">
                    <div style="height:15px; width:1px;"></div>
                    <div v-show="playList.length <= 0" style="margin-left:45%;">No songs</div>
                    <div v-show="playList.length > 0" v-for="(item, index) in playList" :key="index">
                        <div style="width:100%; height:66px; display:flex; ">
                            <img v-if="item.isPlaying" src="http://img.ragga-time.com/isPlaying2.gif" style="width:25px; height:25px; margin-left:20px; margin-top:20px;">
                            <div v-if="!item.isPlaying" style="width:25px; height:25px; margin-left:20px; margin-top:20px;"></div>
                            <div style="margin-left:5%;width:75%; margin-top:20px;">{{item.name}} - {{item.author}}</div>
                            <div @click="removeOne(index, item)" style="font-size:20px; margin-top:20px;">x</div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
            <div v-show="isPlayList" @click="isPlayList = false" style="width:100%; height:100vh; background-color:rgba(0,0,0, 0.45); z-index:101; position:absolute; "></div>

                    <audio @ended="playEnded" id="winPlayPc" :src="nowPlaying[0] ? nowPlaying[0].music_url : ''"></audio>

              <div class="headBar"><img @click="$store.state.showPlayer = false" src="../../../assets/icons/Home_return.png">Songs</div>

              <div class="mainCover"  v-if="!nowPlaying[0]" style="background-color:#2c2c2c;"></div>
              <div id="mainCoverPc" class="mainCover" v-if="nowPlaying[0]" :style="{ background:'url(' + nowPlaying[0].cover_url + ') no-repeat center 0/cover' }">
              </div>
              <div id="shadowxPc" class="shadowx" v-if="nowPlaying[0]" :style="{ background:'url(' + nowPlaying[0].cover_url + ') no-repeat center 0/cover' }">
              </div>

              <div style="width:100%; text-align:center; position:absolute;; bottom:26.5vh; background-color:rgb(255,253,254);">
                <div v-if="!nowPlaying[0]" style="font-weight:bold; font-size:20px;">Without a song</div>
                <div v-if="nowPlaying[0]" style="font-weight:bold; font-size:20px;">{{nowPlaying[0].name}}</div>
                <div style="font-size:14px; opacity:0.7; margin-top:5px; z-idnex:100;">{{nowPlaying[0].author}}</div>
              </div>

              <div style="width:100%; height:70px; position:absolute; bottom:17vh; display:flex; background-color:rgb(255,253,254);">
                <span style="position:absolute; left:6.5%; margin-top:40px;">{{ nowDuration }}</span>
                <div @mousedown="proDown" style="width:58%; height:5px; background-color:#eeefef; margin-left:20%; margin-top:47.5px; overflow: hidden;">
                  <div id="moveOnPc" style="width:0px; height:5px; background-color:#2c2c2c;"></div>
                </div>
                <span style="position:absolute; right:7%; margin-top:40px;">{{ duration }}</span>
              </div>
              <div style="width:100%; height:70px; position:absolute; bottom:6vh;
              display:flex; justify-content: center; align-items: center; text-align:center; ">
                <img @click="changePlayMode" :src="require('../../../assets/icons/' + playModeSrc)" class="PlayMode" :style="{ width: '25px' }">

                <img @mouseenter="mouseUp = true" @mouseleave="mouseUp = false" @click="upSong"
                :src="mouseUp ? require('../../../assets/icons/Backstage_up2.png') :
                require('../../../assets/icons/Backstage_up.png')" :class="mouseUp ? 'uptrue' : 'upfalse'" :style="{ width: '25px' }">

                <!-- 播放暂停 -->
                  <transition name="bounce">
                      <img @mouseenter="mousePlay = true" @mouseleave="mousePlay = false" v-if="!play" @click="openPlayer"
                      :src="mousePlay ? require('../../../assets/icons/Backstage_play2.png') :
                      require('../../../assets/icons/Backstage_play.png')" :class="mousePlay ? 'playtrue' : 'playfalse'" :style="{ width: widthx }">
                  </transition>
                  <transition name="bounce">
                      <img @mouseenter="mousePlay = true" @mouseleave="mousePlay = false" v-if="play" @click="closePlayer"
                      :src="mousePlay ? require('../../../assets/icons/Backstage_pause2.png') :
                      require('../../../assets/icons/Backstage_pause.png')" :class="mousePlay ? 'playtrue' : 'playfalse'" :style="{ width: widthx }">
                  </transition>

                      <img @mouseenter="mouseNext = true" @mouseleave="mouseNext = false" @click="nextSong"
                      :src="mouseNext ? require('../../../assets/icons/Backstage_next2.png') :
                      require('../../../assets/icons/Backstage_next.png')" :class="mouseNext ? 'nexttrue' : 'nextfalse'" :style="{ width: '25px' }">

                <img @click="isPlayList = true" :src="require('../../../assets/icons/Home_playlist.png')" class="PlayList" :style="{ width: '25px' }">

              </div>
            </div>
        </transition>
        <transition name="fade">
            <div @click="$store.state.showPlayer = false" v-show="$store.state.showPlayer" style="width:100vw; height:100vh;
            background-color:#000; opacity:0.55; position:absolute; z-index:30;"></div>
        </transition>
    </div>
</template>

<script>
import Bus from '../../../assets/Bus.js'
export default {
  name: 'playPc',
  components: {
  },
  data () {
    return {
      play: false,
      widthx: '40px',

      mousePlay: false,
      mouseNext: false,
      mouseUp: false,

      gapX: '',
      startx: '',
      screenWidth: document.body.clientWidth,

      duration: '00:00',
      durationSeconds: 0,
      nowDuration: '00:00',
      nowDurationSeconds: 0,
      runTime: '',
      playList: [
        {
          _id: '5d6890b18bfcee23442eaasfc',
          name: 'Starboy',
          author: 'The Weeknd',
          isPlaying: false,
          cover_url: 'http://img.ragga-time.com/Starboy.jpg',
          music_url: 'http://www.ragga-time.com/music/The Weeknd - Starboy (OFFICIAL INSTRUMENTAL).Mp3'
        },
        {
          _id: '5d85c1541d82a261342d902f',
          name: 'Stay with me',
          author: 'Eric Prydz(Pryda)',
          isPlaying: false,
          cover_url: 'http://www.ragga-time.com/MusicCover/Stay%20With%20Me.jpg',
          music_url: 'http://www.ragga-time.com/music/Stay With Me (Original Mix) - Pryda.mp3'
        },
        {
          _id: '5d6890b18bfcee23442ea2da',
          name: 'Generate',
          author: 'Eric Prydz',
          isPlaying: false,
          cover_url: 'http://www.ragga-time.com/MusicCover/Opus.jpg',
          music_url: 'http://www.ragga-time.com/music/Generate - Eric Prydz.mp3'
        },
        {
          _id: '5d6890b18bfcee23442e44fwc',
          name: 'CO2',
          author: 'Mawi',
          isPlaying: false,
          cover_url: 'http://img.ragga-time.com/CO2.png',
          music_url: 'http://www.ragga-time.com/music/CO2 - Mawi.mp3'
        },
        {
          _id: '5d6890b18bfcee234432tgrbfs',
          name: 'Totoro (Path Of The Wind)',
          author: 'Julian Calor',
          isPlaying: false,
          cover_url: 'http://img.ragga-time.com/Totoro%20%28Path%20Of%20The%20Wind%29%20-%20Julian%20Calor.jpg',
          music_url: 'http://www.ragga-time.com/music/Totoro (Path Of The Wind) - Julian Calor.mp3'
        }
      ],
      nowPlaying: [],
      playIndex: 0,
      playMode: 'random',
      playModeSrc: 'Backstage_RandomPlay.png',
      playModeIndex: 0,

      isPlayList: false
    }
  },
  created () {
    this.nowPlaying = []
    this.nowPlaying.push(this.playList[0])
  },
  mounted () {
    Bus.$on('getSongx', (data) => {
      this.openPlayer()
      this.playList.forEach((e, v) => {
        if (this.playList[v]._id === data._id) { this.playList.splice(v, 1) }
      })
      this.playList.forEach((e, v) => { this.playList[v].isPlaying = false })
      data.isPlaying = true
      this.playList.push(data)
      this.nowPlaying = []
      this.nowPlaying.push(data)
      if (this.play === false) {
        setTimeout(() => {
          this.openPlayer()
          this.$store.state.isFirstPlay = false
        }, 150)
      }
    })
    $('#mainCoverPc').addClass('rotate-pause')
    $('#winPlayPc')[0].oncanplay = () => {
      this.durationSeconds = $('#winPlayPc')[0].duration
      this.duration = this.countmusicTime(this.durationSeconds)
      if (this.play === true) {
        $('#winPlayPc')[0].play()
      }
    }
    $('#winPlayPc')[0].onplaying = () => {
      Bus.$emit('iconChange', 'http://img.ragga-time.com/isplaying.gif')
      this.play = true
      this.playList.forEach((e, v) => {
        if (this.playList[v].name === this.nowPlaying[0].name) {
          this.playList[v].isPlaying = true
        }
      })
      $('#mainCoverPc').removeClass('rotate-pause').addClass('rotate-running')
    }
    $('#winPlayPc')[0].onpause = () => {
      this.play = false
      Bus.$emit('iconChange', require('../../../assets/icons/menu.png'))
      $('#mainCoverPc').removeClass('rotate-running').addClass('rotate-pause')
    }
  },
  methods: {
    playEnded (e) {
      this.play = true
      this.switchSong(this.playMode)
    },
    switchSong (playMode, upOrNext = '') {
      this.playList.forEach((e, v) => { this.playList[v].isPlaying = false })
      $('#winPlayPc')[0].loop = ''
      if (playMode === 'random') {
        while (true) {
          let allRandomNumber = this.playList.length
          let prevIndex = this.playIndex
          this.playIndex = Math.floor(Math.random() * allRandomNumber)
          if (prevIndex !== this.playIndex) {
            this.nowPlaying = []
            this.nowPlaying.push(this.playList[this.playIndex])
            return
          }
        }
      } else if (playMode === 'order' && upOrNext === '') {
        this.playIndex++
      } else if (playMode === 'order' && upOrNext === 'Up') {
        this.playIndex--
        if (this.playIndex < 0) { this.playIndex = this.playList.length - 1 }
      } else { $('#winPlayPc')[0].loop = 'loop' }
      if (this.playIndex >= this.playList.length) { this.playIndex = 0 }
      this.nowPlaying = []
      this.nowPlaying.push(this.playList[this.playIndex])
    },
    openPlayer () {
      console.log('被播放')
      if (this.nowPlaying.length <= 0) { return }
      $('#winPlayPc')[0].currentTime = this.nowDurationSeconds
      $('#winPlayPc')[0].play()
      this.runTime = setInterval(() => {
        this.nowDurationSeconds = $('#winPlayPc')[0].currentTime
        if (!$('#winPlayPc')[0].currentTime) {
          clearInterval(this.runTime)
        }
        this.nowDuration = this.countmusicTime(this.nowDurationSeconds)
        let changeWidth = (this.nowDurationSeconds / this.durationSeconds)
        $('#moveOnPc').css('width', 249.4 * changeWidth + 'px')
      }, 500)
    },
    closePlayer () {
      console.log('被暂停')
      $('#mainCoverPc').toggleClass('rotate-pause')
      $('#winPlayPc')[0].pause()
      clearInterval(this.runTime)
    },
    countmusicTime (secondx) {
      let time = secondx
      let minute = time / 60 // 分钟
      let minutes = parseInt(minute)
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      let second = time % 60 // 秒
      let seconds = Math.round(second)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      let duration = ''
      duration = minutes + ':' + seconds
      return duration
    },
    proDown (e) {
      if (e.button === 0) { // 判断是否点击鼠标左键
        this.gapX = e.clientX
        this.startx = $(window).scrollLeft() // scroll的初始位置
        //  计算变动时间
        let nowPercent = (this.gapX - 86) / 249.4
        this.nowDurationSeconds = this.durationSeconds * nowPercent
        this.nowDuration = this.countmusicTime(this.nowDurationSeconds)
        $('#winPlayPc')[0].currentTime = this.nowDurationSeconds
        $('#moveOnPc').css('width', this.gapX - 86 + 'px')
        $(document).bind('mousemove', this.proMove)
        $(document).bind('mouseup', this.proStop)
      }
      return false// 阻止默认事件或冒泡
    },
    proMove (e) {
      $(window).scrollLeft(e.clientX)
      //  计算变动时间
      let nowPercent = (e.clientX - 86) / 249.4
      this.nowDurationSeconds = this.durationSeconds * nowPercent
      this.nowDuration = this.countmusicTime(this.nowDurationSeconds)
      $('#moveOnPc').css('width', e.clientX - 86 + 'px')
      return false // 阻止默认事件或冒泡
    },
    proStop (e) {
      // 解绑定，这一步很必要，前面有解释
      $('#winPlayPc')[0].currentTime = this.nowDurationSeconds
      $(document).unbind('mousemove', this.proMove)
      $(document).unbind('mouseup', this.proStop)
    },
    changePlayMode () {
      let srcArray = [
        { src: 'Backstage_RandomPlay.png', name: 'random' },
        { src: 'Backstage_OrderPlay.png', name: 'order' },
        { src: 'Backstage_OnlyPlay.png', name: 'only' }
      ]
      this.playModeIndex++
      if (this.playModeIndex >= 3) { this.playModeIndex = 0 }
      this.playModeSrc = srcArray[this.playModeIndex].src
      this.playMode = srcArray[this.playModeIndex].name
    },
    nextSong () {
      $('#moveOnPc').css('width', '0px')
      this.nowDuration = '00:00'; this.nowDurationSeconds = 0; this.switchSong(this.playMode)
    },
    upSong () {
      $('#moveOnPc').css('width', '0px')
      this.nowDuration = '00:00'; this.nowDurationSeconds = 0; this.switchSong(this.playMode, 'Up')
    },
    removeOne (index, item) {
      this.playList.splice(index, 1)
      if (this.nowPlaying[0]._id === item._id) {
        this.nowPlaying = []
      }
    },
    removeAll () {
      this.closePlayer()
      this.nowPlaying = []
      this.playList = []
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/scss/togerher.scss';
@import '../../../assets/scss/playPc.scss';
::-webkit-scrollbar{
    display:none;
}
</style>
