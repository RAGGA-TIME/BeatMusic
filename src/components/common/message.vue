<template>
  <transition name="bounce">
    <div class="message" :class="type" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-'+type"></i>
      <div class="content">{{content}}
        <i v-if="hasClose" class="btn-close iconfont icon-close" @click="visible=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MyMessage',
  data () {
    return {
      content: '',
      time: 3000,
      visible: false,
      type: 'info', // 'success','warning','error'
      hasClose: false
    }
  },
  mounted () {
    this.close()
  },
  methods: {
    close () {
      window.setTimeout(() => {
        this.visible = false
      }, this.time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/togerher.scss';

.content {
  width:auto; transition: all .5s; padding:15px 27px 15px 27px;  font-size:20px; font-family: $font-family; font-weight: bold;
}

.message {
  position: fixed; z-index: 99;
  top: 5vh; left: calc(50vw - 150px);
  text-align: center; transition: all .5s
}

.iconfont {

}

.close {

}

.info {
  background-color:rgb(237,242,252); transition: all .5s;  border-radius: 6px;
}

.success {
  background-color:rgb(240,249,235); border-radius: 6px;
}

.warning {
  background-color:rgb(253,246,236); border-radius: 6px;
}

.error {
  width:200px; height:40px; background-color:rgb(254,240,240); border-radius: 6px;
}
</style>
