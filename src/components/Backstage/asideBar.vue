<template>
            <div class="asideContainer">
              <img id="BackstageLogo" @click="changeAsideBar" class="changeWidth" :src="srcx">
                <el-row type="flex" style="flex-direction: column;" align="middle" class="row-bg" justify="top">
                  <el-col>
                    <recursiveRouter :col="asideItem" :showName="showName"/>
                  </el-col>
                </el-row>

            </div>
</template>

<script>
import recursiveRouter from './recursiveRouter.vue'
export default {
  components: {
    recursiveRouter
  },
  props: {
    srcx: { type: String, default: 'http://img.ragga-time.com/NewLogo4.png' }
  },
  data () {
    return {
      asideItem: [],
      showName: false,
      firstRefresh: this.$route.path
    }
  },
  mounted () {
    this.asideItem = this.$router.options.routes[1].children
    this.asideItem.forEach((e, v) => {
      if (e.hidden === true) { this.asideItem.splice(v, 1) } else {
        this.asideItem[v].show = false
        this.asideItem[v].mouseshow = false
      }
    })
    // console.log(this.asideItem)
    // console.log(this.$router.options.routes[1].children)
    this.firstRefresh = this.firstRefresh.replace('/Backstage/', '')
    if (this.firstRefresh.indexOf('/') > 0) { this.firstRefresh = this.firstRefresh.split('/') }
    this.checkRouter(this.asideItem, this.firstRefresh)
  },
  methods: {
    changeAsideBar () {
      this.$emit('changeAsideBar')
      this.showName = !this.showName
      this.asideItem.forEach((e, v) => {
        if (this.asideItem[v].haveChildren) {
          this.asideItem[v].haveChildren = false
        }
      })
    },
    checkRouter (AsideItem, FirstRefresh) {
      if (AsideItem instanceof Array) {
        AsideItem.forEach((e, v) => {
          if (FirstRefresh instanceof Array) {
            if (AsideItem[v].path === FirstRefresh[0]) {
              AsideItem[v].show = true
              FirstRefresh.splice(0, 1)
              this.checkRouter(AsideItem[v].children, FirstRefresh)
            }
          } else {
            if (AsideItem[v].path === FirstRefresh) {
              AsideItem[v].show = true
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/togerher.scss";
  .asideContainer {
    position:relative; width:100%; height: 100vh;
    background-color:$maincolor;justify-content: center; align-items: center;
  }
  .changeWidth {
    z-index:6; width:65px; height:65px; background-color:$maincolor2;position:fixed; top:0px; left:0px;
    transition: width 0.5s;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple {
    background: $maincolor2;
  }
  .grid-content {
    min-height: 85px;
    padding: 10px 0px 10px 0px;
    transition: all 0.5s;
  }
  .grid-content-change {
    min-height: 85px;
    padding: 10px 0px 10px 0px;
    transition: all 0.5s;
    background-color:#d5d5d5;
  }
  .row-bg {
    height: 100vh;
    margin-top: 8vh;
    background-color: $maincolor2;
  }

</style>
