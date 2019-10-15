<template>
        <div>
                <moremusicers :showMoreMusicer="showMoreMusicer" v-on:changMoreMusicers="turnOff" />
                <!-- <img id="logo" class="logo" src="../../../assets/icons/logo.png"> -->
                <img @click="openPlayer" id="menu" class="menu" :src="imgSrcc">
                <img id="more" @click="MoreMusicer" :class="[rotate?'go':'aa']" @mouseenter="rotate = true"
                @mouseleave="rotate = false" class="more" src="../../../assets/icons/menu2.png">
                <!-- 搜索 -->
                <search v-on:changMoreMusicers="serachOpen"/>
        </div>
</template>

<script>
import Bus from '../../../assets/Bus.js'
import search from '../search/search.vue'
import moremusicers from '../moremusicers/moremusicers.vue'
export default {
  components: {
    moremusicers,
    search
  },
  props: {
    propsproperty: {
    }
  },
  data () {
    return {
      imgSrcc: require('../../../assets/icons/menu.png'),
      rotate: false,
      showMoreMusicer: false,
      loginForm: {
        username: 'user_Gesaffelstein',
        password: 'woshiGesaffelstein'
      }
    }
  },
  mounted () {
    Bus.$on('iconChange', (data) => {
      this.imgSrcc = data
    })
  },
  methods: {
    MoreMusicer () {
      this.showMoreMusicer = !this.showMoreMusicer
    //   Bus.$emit('listenToEvents')
    },
    turnOff (item) {
      this.showMoreMusicer = !this.showMoreMusicer
      this.$emit('changeBackAndBlur', item)
    },
    serachOpen (item) {
      this.$emit('changeBackAndBlur', item, 'search')
    },
    openPlayer () {
      this.$store.state.showPlayer = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/togerher.scss";
.more {
    width: 35px;
    height: auto;
    position: absolute;
    top:10%;
    right: 4vw;
    z-index: 13;
}

.menu {
    width:25px;
    height: auto;
    position: absolute;
    top: 10%;
    left:5%;
    z-index: 13;
}

.logo {
    position: absolute;
    width: 119px;
    height: auto;
    background-color: white;
    top:10%;
    left:10%;
    z-index: 13;
}

.aa{
    transform:rotate(0deg);
    transition: all 0.5s;
}
.go{
    transform:rotate(90deg);
    transition: all 0.5s;
}
</style>
