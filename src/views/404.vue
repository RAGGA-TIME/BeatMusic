<template>
  <div class="x404b">
        <div>Why Am I Here?
            <div @mouseenter="lignt = true" @mouseleave="lignt = false"
             :class="lignt ? 'spanx2' : 'spanx'" @click="takeMeHome">Take Me Home</div>
        </div>
</div>
</template>

<script>
export default {
  name: 'NotFount',
  data () {
    return {
      lignt: false
    }
  },
  methods: {
    takeMeHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/togerher.scss';
.x404b {
    font-size:80px; text-align:center; width:100vw; font-family: $font-family; font-weight:bold;clear:both;
    margin: auto; height:100vh; display: flex; display: -webkit-flex; align-items:center; justify-content:center;
    .spanx {
        font-size:30px; margin-top:30px; transition: all .5s; border-radius:50px;margin: auto;
         background-color:#fff; color:#2c2c2c; width: 300px; padding: 5px;
    }
    .spanx2 {
        font-size:30px; margin-top:30px; transition: all .5s; border-radius:50px;margin: auto;
        background-color:#2c2c2c; color:#fff; width: 300px; padding: 5px;
    }
}

</style>
