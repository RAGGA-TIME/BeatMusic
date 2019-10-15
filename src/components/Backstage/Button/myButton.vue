<template>
<div>
  <div :id="idd" @mouseenter="enterMouse" @mouseleave="leaveMouse" :class="typexx === 'Delete' ? 'deleteButton' :
  'editButton'" @click="getClick" :style="{ width: widthx, height: heightx }">{{name}}</div>
  <div v-if="typexx === 'Upload'" >
    <input @change="getFile" single :id="fileTypexx" v-show="false" type="file" accept="audio/*"/>
    <div style="font-size:15px; margin-top:15px;">{{inputSelect}}</div>
    <div style="font-size:15px; margin-top:15px;" >File supported format: .mp3 / .wav / .m4a</div>
  </div>
</div>
</template>

<script>
// import { ErrorModel } from '../../../assets/model/promiseModel.js'
export default {
  name: 'myButton',
  props: {
    typex: String,
    id: String,
    name: String,
    width: { type: String, default: 'auto' },
    height: { type: String, default: '35px' },
    fileTypex: { type: String, default: 'file' },
    showMouse: { type: Boolean, default: false },
    inputSelectx: { type: String, default: 'No files have been selected' },
    clickData: Object,
    forward: String //  跳转页面名称
  },
  data () {
    return {
      idd: 'myButton' + this.id + this.typex,
      fileTypexx: this.fileTypex + Math.floor(Math.random() * 1000),
      typexx: this.typex,
      widthx: this.width,
      heightx: this.height,
      Mouse: this.showMouse,
      clickNowData: this.clickData,
      fontColorx: '#fff',
      backColorx: '#2c2c2c',
      inputSelect: this.inputSelectx,
      forwardx: this.forward,
      musicFile: {}
    }
  },
  mounted () {
    if (this.typexx === 'Delete') { this.fontColorx = '#fff'; this.backColorx = 'red' }
  },
  methods: {
    enterMouse () {
      $(`#${this.idd}`).css('background', this.backColorx)
      $(`#${this.idd}`).css('color', this.fontColorx)
    },
    leaveMouse () {
      $(`#${this.idd}`).css('background', '#fff')
      $(`#${this.idd}`).css('color', this.backColorx)
    },
    getClick () {
      if (this.typexx === 'Upload') {
        $(`#${this.fileTypexx}`).click()
      } else if (this.typexx === 'confirm') {
        this.$emit('confirm')
      } else if (this.typexx === 'none') {
      } else if (this.typexx === 'Delete') {
        this.open()
      } else if (this.typexx === 'Edit') {
        this.$router.push({ name: this.forwardx, params: this.clickData })
      } else {
        this.$router.push({ name: this.forwardx, params: this.clickData })
      }
    },
    getFile () {
      this.musicFile = $(`#${this.fileTypexx}`)[0].files[0]
      if (!this.musicFile) {
        this.inputSelect = 'No files have been selected'
        this.$emit('getFile', '')
        return
      }
      this.inputSelect = this.musicFile.name
      this.$emit('getFile', this.musicFile)
    },
    open () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', this.id)
      })
    }

  }

}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/togerher.scss';

.editButton {
  width:auto; height:35px; background-color:#fff; border-radius:10px; font-size:18px;
  font-weight:bold; color:$maincolor; text-align:center; line-height:37px; padding: 0px 10px 0px 10px;
  transition: all .5s;
}

.deleteButton {
  width:auto; height:35px; background-color:#fff; border-radius:10px; font-size:18px;
  font-weight:bold; color:red; text-align:center; line-height:37px;
  transition: all .5s;
}

</style>
