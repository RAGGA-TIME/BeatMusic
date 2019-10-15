<template>
    <div @click="wakeUpTextArea" :class="getIt ? 'TextAreaContainerChange' : 'TextAreaContainer'" :style="{ width: textAreaWidthx, height: textAreaHeightx }">

        <textarea class="realTextArea" :id="idx" v-model="datax" @blur="he" @focus="ha"
        :style="{ width: realWidthx, height: realHeightx }" v-show="showRealTextArea" @keyup.enter="commit">
        </textarea>
         <!--   -->
        <div :class="getIt ? 'myTextAreaChange' : 'myTextArea' ">{{namex}}</div>

    </div>
</template>

<script>
export default {
  name: 'myTextArea',
  props: {
    textAreaData: String,
    id: { type: String, default: 'textAreax' },
    name: { type: String, default: 'myTextArea' },
    textAreaWidth: { type: String, default: '200px' },
    textAreaHeight: { type: String, default: '100px' },
    realWidth: { type: String, default: '200px' },
    realHeight: { type: String, default: '120px' }
  },
  data () {
    return {
      getIt: false,
      datax: this.textAreaData,
      textAreaWidthx: this.textAreaWidth,
      textAreaHeightx: this.textAreaHeight,
      realWidthx: this.realWidth,
      realHeightx: this.realHeight,
      showRealTextArea: false,
      namex: this.name,
      idx: this.id + Math.floor(Math.random() * 1000)
    }
  },
  watch: {
    datax () {
      this.$emit('getTextArea', this.datax, this.id)
    }
  },
  mounted () {
    if (this.datax !== '') { this.wakeUpTextArea() }
  },
  methods: {
    wakeUpTextArea () {
      this.showRealTextArea = true
      this.getIt = true
      let that = this
      setTimeout(function () {
        $(`#${that.idx}`).focus()
      }, 100)
    },
    ha () { },
    he () {
      if (this.datax == null || this.datax === '') {
        this.getIt = false
        this.showRealTextArea = false
      }
    },
    TextAreaRules () {

    },
    commit () {
    }
  }
}
</script>

<style lang="scss" scoped>
.TextAreaContainer {
text-align:left; background-color:#fff; border-radius:8px; width:200px; transition: all .5s;
      border: 1.4px solid rgb(226,224,227);  font-weight:bold; color:rgb(95,95,95); padding:15px 75px 15px 25px;
}

.TextAreaContainerChange {
text-align:left; background-color:#fff; border-radius:8px; width:200px; transition: all .5s;
      border: 1.4px solid rgb(95,95,95);  font-weight:bold; color:rgb(55,55,55); padding:15px 75px 15px 25px;
}

.myTextArea {
background-color:#fff; position:relative; top:0px; left:0px; transition: all .5s;display:inline; padding-right:150px;
}

.myTextAreaChange {
background-color:#fff; position:relative; top:-28px; left:-15px; font-size:15px;
        display:inline; padding-left:12px; padding-right:12px;  transition: all .5s;
}

.realTextArea {
  position:absolute; outline:none; border: none; font-size:20px;
  overflow: auto; font-family: 'Century Gothic'; word-break: break-all; //解决兼容问题
}
</style>
