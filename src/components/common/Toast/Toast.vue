<template>
<div :id="id">
  <transition name="bounce">
      <div v-if="visible" class="BackgroundToast">
          <div class="DivCenter" style="margin-top:38px;">
              <img :src="imgSrc">
          </div>
          <div class="DivCenter" style="margin-top:10px;">{{content}}</div>
      </div>
  </transition>
    <transition name="fade">
        <div v-if="visible && Mask" class="Mask"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MyToast',
  data () {
    return {
      content: '',
      time: 0,
      visible: false,
      type: 'info', // 'success','warning','error','loading'
      hasClose: false,
      Mask: true,
      id: '',
      imgSrc: 'http://img.ragga-time.com/loadingGif.gif'
    }
  },
  mounted () {
    // if (this.type === 'success') {
    //   this.imgSrc = 'http://img.ragga-time.com/success1.png'
    // }
    this.close()
  },
  methods: {
    close () {
      let that = this
      setTimeout(() => {
        that.visible = false
      }, that.time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/togerher.scss';
.BackgroundToast {
    position:fixed; z-index:1888; background-color:rgba(0,0,0,0.75);
    border-radius:12px; width: 150px; height:150px; top: 40vh; left:calc(50vw - 75px);
}
.DivCenter {
    display:flex; justify-content: center; align-items: center; width: 150px; text-align:center; color:#fff;
    img {
        width:50px; height:50px;
    }
}
.Mask {
  width:100vw; height:100vh; background-color:rgba(0,0,0,0.25); position:fixed; left:0px; top:0px; z-index:888;
}
</style>
