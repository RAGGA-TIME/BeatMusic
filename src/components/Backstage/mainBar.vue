<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
import Bus from '../../assets/Bus.js'
export default {
  name: 'mainBar',
  computed: {
    key () {
      Bus.$emit('locationPathChange', this.$route.path)
      // console.log(this.$route.path)
      return this.$route.path
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100%;
  background-color:#fff;
  margin: 2% 1% 2% 1%;
  width: 98%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
