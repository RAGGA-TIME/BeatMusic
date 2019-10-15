<template>
      <div id="firstLoading" class="firstLoading">
        <img id="firstLogo" src="../../../assets/icons/logo.gif" class="firstLogo">
      </div>
</template>

<script>
export default {
  data () {
    return {
      curHeight: document.documentElement.clientHeight,
      screenWidth: document.body.clientWidth,
      logoleftx: 0,
      logotopx: 0
    }
  },

  mounted () {
    this.logoleftx = this.screenWidth * 0.5 - 250 + 'px'
    this.logotopx = this.curHeight * 0.5 - 117.5 + 'px'
  }
}
</script>

<style scoped lang="scss">
.firstLoading {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 24;
    display:flex;
    display: -webkit-flex; align-items:center; justify-content:center;
}

.firstLogo {
  min-width: 300px;
  min-height: 141px;
    width: 500px;
    height: 235px;
    z-index: 24;
    margin: 'auto';
    position:absolute;
    background-color: white;

}
</style>
