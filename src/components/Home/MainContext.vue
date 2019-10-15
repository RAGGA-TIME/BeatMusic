<template>
<body>
    <gotoBack/>
    <!-- 播放器 -->
    <playPc v-if="playerPc"/>
    <!-- 播放器 -->
    <play v-if="!playerPc"/>
     <!-- 页面按钮 -->
    <lotsbutton v-on:changeBackAndBlur="changeBackAndBlurx"/>
    <!-- 开场 -->
    <begin/>

    <!-- 移动端 -->
      <div v-show="panel" id="matter" style="overflow-x:scroll; white-space:nowrap; overflow-y: hidden; position:fixed; width: 100vw; top:50vh; z-index:11;">
          <!-- 电台部分 -->
          <radio v-if="mobilex" :show="showradio" v-on:getcancel="cancelOther" ref="rax1"/>
          <!-- 歌曲部分 -->
          <music v-if="mobilex" :show="showmusic" v-on:getcancel="cancelOther" ref="mux1"/>
          <!-- 视频部分 -->
          <videos v-if="mobilex" :show="showvideos" v-on:getcancel="cancelOther"/>
          <!-- 概述部分 -->
          <overview v-if="mobilex" :show="showoverview" v-on:getcancel="cancelOther" ref="ovx1"/>
      </div>

    <!-- Web端 -->
    <!-- 电台部分 -->
    <radioWeb v-if="!mobilex" :show="showradio" v-on:getcancel="cancelOther" ref="raweb1"/>
    <!-- 歌曲部分 -->
    <musicWeb v-if="!mobilex" :show="showmusic" v-on:getcancel="cancelOther" ref="muweb1"/>
    <!-- 视频部分 -->
    <videosWeb v-if="!mobilex" :show="showvideos" v-on:getcancel="cancelOther"/>
    <!-- 概述部分 -->
    <overviewWeb v-if="!mobilex" :show="showoverview" v-on:getcancel="cancelOther" ref="ovweb1"/>

     <!-- 艺名 -->
    <mainchanges :otherProperty="{...mainData}" v-on:listenToEventx="nextAndUp" :showmain="{...showmain}"
    v-on:listenToEvent="changemusicer" v-on:listenToEventts="Ismoblie" v-on:playerState="playerState"/>

  </body>
</template>
<script>
import $ from 'jquery'
import Bus from '../../assets/Bus.js'

export default {
  name: 'MainContext',
  components: {
    begin: () => import('./begin/begin.vue'),
    play: () => import('./play/play.vue'),
    playPc: () => import('./play/playPc.vue'),
    music: () => import('./musicer/music.vue'),
    radio: () => import('./musicer/radio.vue'),
    videos: () => import('./musicer/videos.vue'),
    overview: () => import('./musicer/overview.vue'),
    musicWeb: () => import('./musicer/musicWeb.vue'),
    radioWeb: () => import('./musicer/radioWeb.vue'),
    videosWeb: () => import('./musicer/videosWeb.vue'),
    overviewWeb: () => import('./musicer/overviewWeb.vue'),
    gotoBack: () => import('./public_use/gotoBack.vue'),
    lotsbutton: () => import('./public_use/lotsbutton.vue'),
    mainchanges: () => import('./public_use/mainchanges.vue')
  },
  props: {
    propsproperty: { lun_arr: [] }
  },
  data () {
    return {
      showmusic: false,
      showvideos: false,
      showoverview: false,
      showradio: false,
      panel: false,
      showmain: {
        showload: true,
        showname: true,
        showup: true,
        shownext: true,
        showleft: true,
        showright: true
      },
      timer: {},
      shufflingArray: [],
      mainData: {},
      mobilex: false,
      playerPc: false
    }
  },
  mounted () {
    let that = this
    that.timer = setInterval(this.changeState, 9000)
    Bus.$on('listenToEvents', (data) => {
      this.changemusicer(data)
    })
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.showmain.showload = !this.showmain.showload
        this.showmain.showup = !this.showmain.showup
        this.showmain.shownext = !this.showmain.shownext
        this.showmain.showleft = !this.showmain.showleft
        this.showmain.showright = !this.showmain.showright
        clearInterval(this.timer)
      } else {
        this.showmain.showload = !this.showmain.showload
        this.showmain.showup = !this.showmain.showup
        this.showmain.shownext = !this.showmain.shownext
        this.showmain.showleft = !this.showmain.showleft
        this.showmain.showright = !this.showmain.showright
        if (this.showmusic) { return }
        this.timer = setInterval(this.changeState, 9000)
      }
    })
  },
  watch: {
    shufflingArray () {
      //    console.log(this.shufflingArray)
    },
    propsproperty () {
      //    console.log(this.propsproperty)
      this.mainData = this.propsproperty.lun_arr[0]
      this.mainData.thimgNext = this.propsproperty.lun_arr[1].bigurl
      this.mainData.thimgUp = this.propsproperty.lun_arr[this.propsproperty.lun_arr.length - 1].bigurl
      this.mainData.nowIndex = 0
      this.mainData.thimgNextIndex = 1
      this.mainData.thimgUpIndex = this.propsproperty.lun_arr.length - 1
      this.$store.state.nowMusician = this.mainData
      this.changeBackUrl('url(' + this.mainData.bigurl + ') no-repeat center 0/cover fixed')
      setTimeout(async () => {
        this.changeBackBlur(this.mainData.bigurl)
        this.triggerSelect()
      }, 800)
      this.shufflingArray = this.propsproperty.lun_arr
    }
  },
  beforeDestroy () { clearInterval(this.timer) },
  methods: {
    addLun (directions) {
      let nowIndex = this.mainData.nowIndex
      let thimgNextIndex = this.mainData.thimgNextIndex
      let thimgUpIndex = this.mainData.thimgUpIndex
      if (directions === 'up') {
        if (nowIndex - 1 < 0) { nowIndex = this.shufflingArray.length }
        if (thimgUpIndex - 1 < 0) { thimgUpIndex = this.shufflingArray.length }
        if (thimgNextIndex - 1 < 0) { thimgNextIndex = this.shufflingArray.length }
        this.mainData = this.shufflingArray[--nowIndex]
        this.mainData.thimgNext = this.shufflingArray[--thimgNextIndex].bigurl
        this.mainData.thimgUp = this.shufflingArray[--thimgUpIndex].bigurl
        this.mainData.thimgUpIndex = thimgUpIndex
        this.mainData.nowIndex = nowIndex
        this.mainData.thimgNextIndex = thimgNextIndex
      } else {
        if (nowIndex + 1 >= this.shufflingArray.length) { nowIndex = -1 }
        if (thimgUpIndex + 1 >= this.shufflingArray.length) { thimgUpIndex = -1 }
        if (thimgNextIndex + 1 >= this.shufflingArray.length) { thimgNextIndex = -1 }
        this.mainData = this.shufflingArray[++nowIndex]
        this.mainData.thimgNext = this.shufflingArray[++thimgNextIndex].bigurl
        this.mainData.thimgUp = this.shufflingArray[++thimgUpIndex].bigurl
        this.mainData.thimgUpIndex = thimgUpIndex
        this.mainData.nowIndex = nowIndex
        this.mainData.thimgNextIndex = thimgNextIndex
      }
    },
    changeState (directions) {
      let that = this
      this.addLun(directions)
      let nowBack = 'url(' + this.mainData.bigurl + ') no-repeat center 0/cover fixed'
      let nextBack = 'url(' + this.mainData.thimgNext + ') no-repeat center 0/cover'
      let upBack = 'url(' + this.mainData.thimgUp + ') no-repeat center 0/cover'

      that.changeBackUrl(nowBack)
      //  名字 / 上一张图 / 下一张图出现
      setTimeout(async () => {
        $('#Name').animate({ bottom: '12%', opacity: '1' })
        $('#next').css('background', nextBack)
        $('#next').animate({ right: '10%', opacity: '1' })
        $('#up').css('background', upBack)
        $('#up').animate({ left: '-2%', opacity: '1' })
        this.$store.state.nowMusician = this.mainData
        this.triggerSelect()
        this.shufflingArray = this.propsproperty.lun_arr
      }, 400)

      //  名字 / 上一张图 / 下一张图消失
      $('#Name').animate({ bottom: '13%', opacity: '0.1' })
      $('#next').animate({ right: '9%', opacity: '0.2' })
      $('#up').animate({ left: '-3%', opacity: '0.2' })

      // 变换模糊背景
      this.changeBackBlur(this.mainData.bigurl)
    },
    changemusicer (linkx) {
      var that = this
      if (linkx === 5) {
        setTimeout(function () {
          //  控制主面板各式按钮
          that.showmain.showload = !that.showmain.showload
          that.showmain.showup = !that.showmain.showup
          that.showmain.shownext = !that.showmain.shownext
          that.showmain.showleft = !that.showmain.showleft
          that.showmain.showright = !that.showmain.showright
          if (that.panel && that.showradio && that.showmusic && that.showvideos && that.showoverview) {
            setTimeout(() => { that.panel = !that.panel }, 1000)
          } else { that.panel = !that.panel }
          if (!that.showmain.showload) {
            if (that.mobilex) {
              $('#Name').animate({ width: '75vw', fontSize: '60px', bottom: '50%' }, 'slow'); clearInterval(that.timer)
            } else {
              $('#Name').animate({ width: '75vw', fontSize: '60px' }, 'slow'); clearInterval(that.timer)
            }
          } else {
            if (that.mobilex) {
              $('#Name').animate({ width: '75vw', fontSize: '60px', bottom: '12%' }, 'slow')
              that.timer = setInterval(that.changeState, 9000)
            } else {
              $('#Name').animate({ width: '75vw', fontSize: '60px' }, 'slow')
              that.timer = setInterval(that.changeState, 9000)
            }
          }
        }, 0)
        //  控制资源信息页
        setTimeout(function () { that.showradio = !that.showradio }, 0)
        setTimeout(function () { that.showmusic = !that.showmusic }, 0)
        setTimeout(function () { that.showvideos = !that.showvideos }, 0)
        setTimeout(function () { that.showoverview = !that.showoverview }, 0)
      }
    },
    Ismoblie (mobilex) { this.mobilex = mobilex },
    nextAndUp (active) { this.changeState(active) },
    cancelOther (linkx) {
      let that = this
      for (let variable in that.$data) {
        if (variable === linkx) {
        } else if (variable === 'showmain' || variable === 'timer' || variable === 'mainData' ||
        variable === 'panel' || variable === 'mobilex' || variable === 'playerPc' || variable === 'shufflingArray') {
        } else { that[variable] = !that[variable] }
      }
    },
    changeBackUrl (nowBack) {
      $('#backgounx').fadeOut('slow', () => { $('#backgounx').css('background', nowBack); $('#backgounx').fadeIn('slow') })
    },
    changeBackBlur (url) {
      let allBackground = [ 'musicxclap', 'radioxclap', 'videosxclap', 'overviewxclap', 'musicclap', 'radioclap', 'videosclap', 'overviewclap' ]
      allBackground.forEach((e, v) => {
        $(`#${e}`).append(`<style>#${e}:before{ background:url(${url}) no-repeat center 0 / cover fixed; }</style>`)
      })
    },
    async triggerSearch () {
      if (this.mobilex) {
        this.$refs.ovx1.changeOverviewx()
        await this.$refs.mux1.searchAlbum()
        await this.$refs.mux1.searchMusic()
        await this.$refs.rax1.searchRadioAndAudio()
      } else {
        this.$refs.ovweb1.changeOverview()
        await this.$refs.muweb1.searchAlbum()
        await this.$refs.muweb1.searchMusic()
        await this.$refs.raweb1.searchRadioAndAudio()
      }
    },
    async triggerSelect () {
      if (this.mobilex) {
        this.$refs.ovx1.changeOverviewx()
        await this.$refs.mux1.getMyAlbum()
        await this.$refs.mux1.getMyMusic()
        await this.$refs.rax1.getMyRadioAndAudio()
      } else {
        this.$refs.ovweb1.changeOverview()
        await this.$refs.muweb1.getMyAlbum()
        await this.$refs.muweb1.getMyMusic()
        await this.$refs.raweb1.getMyRadioAndAudio()
      }
    },
    async changeBackAndBlurx (item, isSerach) {
      this.showmain.showload = !this.showmain.showload
      clearInterval(this.timer)
      let nowIndex = this.mainData.nowIndex
      let thimgNextIndex = this.mainData.thimgNextIndex
      let thimgUpIndex = this.mainData.thimgUpIndex
      this.mainData = {}
      item.nowIndex = nowIndex
      item.thimgNextIndex = thimgNextIndex
      item.thimgUpIndex = thimgUpIndex
      this.mainData = item
      this.$store.state.nowMusician = this.mainData
      this.changeBackUrl('url(' + this.mainData.bigurl + ') no-repeat center 0/cover fixed')
      this.changeBackBlur(this.mainData.bigurl)
      if (isSerach) {
        this.triggerSearch()
      } else {
        this.triggerSelect()
      }
      setTimeout(() => {
        this.showmain.showload = !this.showmain.showload
        this.timer = setInterval(this.changeState, 9000)
      }, 50)
    },
    playerState (state) { this.playerPc = state }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/MainContext.scss";

</style>
