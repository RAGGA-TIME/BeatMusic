<template>
<el-container style="height:100vh;">
<my-loading :loadFlag="loadFlag"></my-loading>
    <el-aside :width="asideWidth">
          <aside-bar v-on:changeAsideBar="gotIt" :srcx="logoSrc"/>
    </el-aside>

    <el-container>

        <el-header height="65px">
            <header-bar/>
        </el-header>

        <el-main>
            <main-bar/>
        </el-main>

    </el-container>

</el-container>
</template>

<script>
import headerBar from '../components/Backstage/headerBar.vue'
import asideBar from '../components/Backstage/asideBar.vue'
import mainBar from '../components/Backstage/mainBar.vue'
export default {
  name: 'Backstage',
  components: {
    headerBar,
    asideBar,
    mainBar
  },
  data () {
    return {
      rotate: true,
      loadFlag: true,
      asideWidth: '65px',
      logoSrc: 'http://img.ragga-time.com/NewLogo4.png',
      screenWidth: document.body.clientWidth
    }
  },
  methods: {
    gotIt () {
      this.rotate = !this.rotate
      if (this.rotate === true) {
        this.asideWidth = '65px'
        $('#BackstageLogo').css('width', '65px')
        this.logoSrc = 'http://img.ragga-time.com/NewLogo4.png'
      } else {
        this.asideWidth = '250px'
        $('#BackstageLogo').css('width', '250px')
        this.logoSrc = 'http://img.ragga-time.com/NewLogo7.png'
      }
    },
    getTableData () {
      let that = this
      that.loadFlag = false
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        if (this.screenWidth < 890) { this.asideWidth = '5px'; $('#BackstageLogo').css('width', '5px') } else {
          if (this.asideWidth === '250px') { } else { this.asideWidth = '65px'; $('#BackstageLogo').css('width', '65px') }
        }
      })()
    }
    this.getTableData()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/togerher.scss';
@import "../assets/scss/backStage.scss";

</style>
