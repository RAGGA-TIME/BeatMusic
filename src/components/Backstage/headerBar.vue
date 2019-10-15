<template>
    <el-row :gutter="10"  type="flex" justify="left">
        <el-col :xs="4" :sm="4" :md="8" :lg="12" :xl="12">
          <transition name="slide-fade">
              <div v-if="changePath" class="crumbs" v-html="locationPath"></div>
          </transition>
          </el-col>
        <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="12">
          <div class="grid-content">
            <div style=""></div>
            <img src="../../assets/icons/Backstage_Message.png" style="width:25px; height:25px; margin-top:18.5px;">
            <img class="columnline">
            <img id="headerurl" class="header">
            <span>{{NickyName}}</span>
            <el-dropdown trigger="click">
            <i class="el-icon-arrow-down addit" style="font-size:16px;"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="MusicianInfo"><span>MusicianInfo</span></el-dropdown-item>
                          <el-dropdown-item @click.native="comeBackHome"><span>Home</span></el-dropdown-item>
                          <el-dropdown-item @click.native="Logout"><span>Log out</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
          </div>

          </el-col>
    </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
import Bus from '../../assets/Bus.js'
export default {
  name: 'headerBar',
  data () {
    return {
      locationPath: 'HomePage',
      changePath: false,
      NickyName: this.$store.state.NickyName
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    MusicianInfo () {
      this.$router.push({ name: 'MusicianInfo' })
    },
    comeBackHome () {
      this.$router.push({ name: 'home' })
    },
    Logout () {
      this.LOGOUT()
      this.$router.push({ name: 'home' })
    }
  },
  mounted () {
    let that = this
    that.changePath = true
    console.log(this.$store.state.headUrl)
    $('#headerurl').css('background', 'url(' + this.$store.state.headUrl + ') no-repeat center 0/cover')
    Bus.$on('locationPathChange', (data) => {
      if (data.indexOf('/Backstage/') === 0) {
        data = data.replace('/Backstage/', '')
        if (data.indexOf('/') > 0) {
          data = data.split('/')
          let moudun = []
          data.forEach((e, v) => {
            if (v === data.length - 1) { moudun.push(`<div style="margin-left:5px;">${e}</div>`) } else {
              moudun.push(`<div style="opacity: 0.6; margin-left:5px;">${e}</div>`)
            }
          })
          moudun = moudun.join('<div style="margin-left:5px;">/</div>')
          that.locationPath = moudun
          that.changePath = true
          return
        }
        that.locationPath = data
        that.changePath = true
      }
    })
    let firstRefresh = this.$route.path

    if (firstRefresh.indexOf('/Backstage/') === 0) {
      firstRefresh = firstRefresh.replace('/Backstage/', '')
      if (firstRefresh.indexOf('/') > 0) {
        firstRefresh = firstRefresh.split('/')
        let moudun = []
        firstRefresh.forEach((e, v) => {
          if (v === firstRefresh.length - 1) { moudun.push(`<div style="margin-left:5px;">${e}</div>`) } else {
            moudun.push(`<div style="opacity: 0.6; margin-left:5px;">${e}</div>`)
          }
        })
        moudun = moudun.join('<div style="margin-left:5px;">/</div>')
        that.locationPath = moudun
        that.changePath = true
        return
      }
      that.locationPath = firstRefresh
      that.changePath = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .crumbs {
    text-align:left; font-size:17px; line-height:62px; display:flex; font-weight:bold;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 65px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
      span {
        margin-top:20px; margin-left:20px;
      }
  }
  .addit {
    margin-top:23px; margin-left:18px; margin-right:8px;
  }
  .columnline {
    width:1px; height:50px; margin-top:7.5px; margin-left:45px; background-color:rgb(123,113,142); opacity:0.3;
  }
  .header {
    width:45px; height:45px; margin-top:10px; border-radius:8px; margin-left:35px;
    background: url('http://img.ragga-time.com/Gesaffelstein__01.png') no-repeat center 0/cover;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
