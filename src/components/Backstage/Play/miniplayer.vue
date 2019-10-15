<template>
    <div style="display:flex; height:100%; font-weight:300; font-size:18px;">
 <div style="margin-top:8px;">{{duration}}</div>
        <div>
        <transition name="bounce">
            <img @mouseenter="mousePlay = true" @mouseleave="mousePlay = false" v-if="!play" @click="openPlayer"
            :src="mousePlay ? require('../../../assets/icons/Backstage_play2.png') :
            require('../../../assets/icons/Backstage_play.png')" :class="mousePlay ? 'icontrue' : 'iconfalse'" :style="{ width: widthx }">
        </transition>
        <transition name="bounce">
             <img @mouseenter="mousePlay = true" @mouseleave="mousePlay = false" v-if="play" @click="closePlayer"
            :src="mousePlay ? require('../../../assets/icons/Backstage_pause2.png') :
            require('../../../assets/icons/Backstage_pause.png')" :class="mousePlay ? 'icontrue' : 'iconfalse'" :style="{ width: widthx }">
        </transition>
        </div>
        <audio :src="audio_src" :id="audio_id" @pause="pauseEnd">
            <source :src="audio_src"/>
        </audio>
    </div>
</template>

<script>
export default {
  name: 'miniplayer',
  props: {
    src: String,
    id: String,
    width: { type: String, default: '30px' }
  },
  data () {
    return {
      audio_src: this.src,
      audio_id: 'audio' + this.id,
      duration: '',
      widthx: this.width,
      play: false,
      mousePlay: false
    }
  },
  mounted () {
    let that = this
    let _audio = $(`#${this.audio_id}`)[0]
    if (_audio != null) {
      _audio.load()
      _audio.oncanplay = function () {
        let time = _audio.duration
        // 分钟
        let minute = time / 60
        let minutes = parseInt(minute)
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        // 秒
        let second = time % 60
        let seconds = Math.round(second)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        let duration = ''
        duration = minutes + ':' + seconds
        that.duration = duration
      }
    }
  },
  methods: {
    playAudio (_audio) {

    },
    stop (_audio) {

    },
    openPlayer () {
      this.$emit('onlyOnePlay')
      this.play = true
      $(`#${this.audio_id}`)[0].play()
    },
    closePlayer () {
      this.play = false
      $(`#${this.audio_id}`)[0].pause()
    },
    pauseEnd () {
      this.play = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/togerher.scss';

  .iconfalse {
    padding:4px 5px 5px 5px; background-color:#fff; position: absolute; margin-left: 20px;
    width:30px; height:auto; border-radius:30px; transition: all 0.5s;
  }
  .icontrue {
    padding:4px 5px 5px 5px; background-color:$maincolor; position: absolute; margin-left: 20px;
    width:30px; height:auto; border-radius:30px; box-shadow: 0px 12px 12px -9px;
    transition: all 0.5s;
  }
</style>
