<template>
<div>
        <div @click="clickRender(index)"  @mouseenter="iconenter(index)"
                @mouseleave="iconleave(index)" v-for="(item, index) in col" v-show="!item.hidden"
                :key="item.name">
                <el-col :class="item.show ? 'grid-content-change' : 'grid-content'">
                    <div :class="item.mouseshow ? 'aa':'gx'"></div>
                    <img v-if="!item.show" :src="require( '../../assets/icons/' + item.meta.icon + '.png')" class="iconfalse">
                <transition name="bounce">
                    <img v-if="item.show" :src="require( '../../assets/icons/' + item.meta.icon + '2' + '.png')" class="icontrue">
                </transition>
                <div :class="showName ? 'itemName' : 'itemNameFalse' " id="itemName">
                     {{item.name}}
                    <i v-show="item.children" :class="item.haveChildren ? 'el-icon-arrow-down addit' :
                    'el-icon-arrow-down addit lowout' " style="position:relative; margin-left:10px;"></i>
                    </div>
                </el-col>
                <transition name="slide-fade">
                  <recursiveRouter style="position:relative; padding-left:-10px; opacity:0.7;" v-if="item.haveChildren" :col="item.children"
                  :showName="showName"></recursiveRouter>
                </transition>
        </div>
</div>
</template>

<script>
export default {
  name: 'recursiveRouter',
  props: {
    col: Array,
    showName: Boolean
  },
  data () {
    return {
      asideItem: this.$router.options.routes[1].children
    }
  },
  methods: {
    clickRender (index) {
      // this.emptyChoose(this.asideItem)
      this.col = this.findFinalRoute(this.col, index)
    },
    findFinalRoute (array, index) {
      let that = this
      array.forEach((e, v) => {
        array[v].mouseshow = false
        array[v].show = false
      })
      //  console.log(array[index])
      array[index].show = true
      //  console.log(array[index].name)
      if (array[index].children) {
        array[index].show = !array[index].haveChildren
        array[index].haveChildren = !array[index].haveChildren
        return array
      }
      //  console.log('它跳转到了', array[index].name)
      that.$router.push({ name: array[index].name })
      return array
    },
    iconenter (index) { this.col[index].mouseshow = true },
    iconleave (index) { this.col[index].mouseshow = false },
    //  清空选择状态
    emptyChoose (AsideItem) {
      AsideItem.forEach((e, v) => {
        AsideItem[v].show = false
        AsideItem[v].mouseshow = false
        if (AsideItem[v].children) {
          this.emptyChoose(AsideItem[v].children)
        }
      })
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
  .iconfalse {
    position:absolute; padding:15px; left:6px; margin-top:6px; width:23px; height:auto;
    transition: border 0.5s;
  }
  .icontrue {
    position:absolute; padding:15px; background-color:$maincolor;
    left:6px; width:23px; height:auto; border-radius:12px; margin-top:6px; box-shadow: 0px 12px 12px -9px;
    transition: all 0.5s;
  }
  .itemName {
    font-weight:bold; font-size:18px; margin-left:46px; padding-top:21px; transition: all 0.5s;
  }
  .itemNameFalse {
    font-weight:bold; font-size:0px; margin-left:0px; padding-top:21px; opacity: 0; transition: all 0.5s;
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

  .aa {
    position:absolute; width: 23px; height:23px; border: 1.5px solid $maincolor;
    border-radius: 12px; padding:14px; left:6px; margin-top:6px;
    transition: all 0.5s;
  }
  .gx {
    position:absolute; width: 23px; height:23px; padding:14px; left:6px; margin-top:6px; border-radius: 12px;
    transition: all 0.5s; border: 1.5px solid $maincolor2;
  }

.addit {
transition: all .4s;
}

.lowout {
  transform: rotate(180deg);
}
</style>
