<template>
    <transition name="slide-fade">
        <div v-show="show" style="display:inline-block; position:relative; margin-left:30px;">
            <div v-if="showNomalContext" id="radioxShowNomalContext" class="showNomalContext">
                    <div class="videosWebtitle" style="z-index: 9;">
                            <span>videos</span>
                            <div class="contexts">coming soon</div>
                    </div>
            </div>
            <div v-show="show" id="videosxclap" class=" clap"></div>
        </div>
    </transition>
</template>

<script>
import store from '../../../store.js'
export default {
  store,
  props: {
    show: Boolean
  },
  data () {
    return {
      showNomalContext: true,
      showBigContext: false
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/togerher.scss";
@import "../../../assets/scss/together_animation.scss";

    .showNomalContext {
        width:190px; height:240px; background-color:rgba(255,255,255,0.15); border-radius:8px;
    }
    .videosWebtitle {
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

.videosclap {
  position: absolute;
  z-index: -1;
  width: 190px;
  height: 240px;
  top:0px;
  right:0px;
  overflow: hidden;
  border-radius: 8px;
}

.videosclap:before {
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
