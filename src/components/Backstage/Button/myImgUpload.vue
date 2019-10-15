<template>
    <div @mouseenter="mouseMusicCover = true" @mouseleave="mouseMusicCover = false"
    :class="mouseMusicCover ? 'musicCoverBackChange' : 'musicCoverBack'" @click="getFocus" :style="{ width: widthx, height: heightx }">
        <input :id="idd" @change="getValue" single v-show="false" type="file" accept="image/*"/>
        <img v-if="ifPhoto" style="border-radius:12px;" :style="{ width: widthx, height: heightx }" :src="imgUrl">
        <div v-if="!ifPhoto" style="width:1vw; height:8vw;" :style="{ height: gutterx }"></div>
        <img v-if="!ifPhoto" :src="mouseMusicCover ? require('../../../assets/icons/Backstage_' + iconType + 'Cover2.png'):
        require('../../../assets/icons/Backstage_' + iconType + 'Cover.png')" class="iconsize" :style="{ width: iconSizex, height: iconSizex }">
        <div v-if="!ifPhoto" :style="{ fontSize: fontSizex }">{{introo}}</div>
    </div>
</template>

<script>
import axios from 'axios'
import * as qiniu from '../../../extends_js/qiniu.js'
import { ErrorModel } from '../../../assets/model/promiseModel.js'
export default {
  name: 'myImgUpload',
  props: {
    id: { type: String, default: 'upload' },
    intro: { type: String, default: 'Select Upload Music Cover' },
    width: { type: String, default: '27vw' },
    height: { type: String, default: '27vw' },
    iconSize: { type: String, default: '7vw' },
    fontSize: { type: String, default: '2.8vw' },
    gutter: { type: String, default: '8vw' },
    iconType: { type: String, default: 'Music' },
    imgSrc: { type: String, default: '' },
    file: { type: String, default: '' }
  },
  data () {
    return {
      filex: this.file,
      widthx: this.width,
      heightx: this.height,
      iconSizex: this.iconSize,
      fontSizex: this.fontSize,
      gutterx: this.gutter,
      ifPhoto: false,
      introo: this.intro,
      mouseMusicCover: false,
      uploadToken: '',
      imgLoadPercent: 0,
      imgUrl: this.imgSrc,
      idd: this.id + Math.floor(Math.random() * 1000)
    }
  },
  watch: {
    imgUrl () {
      if (this.imgUrl === '') { this.ifPhoto = false } else { this.ifPhoto = true }
    }
  },
  mounted () {
    console.log(this.imgSrc)
    this.getToken()
    if (this.imgUrl === '') { this.ifPhoto = false } else { this.ifPhoto = true }
  },
  methods: {
    getFocus () {
      $(`#${this.idd}`).click()
    },
    async getToken () {
      let res = await this.$MusicHttp.GetToken()
      this.uploadToken = res
    },
    getValue (value) {
      // 获取文件
      this.filex = $(`#${this.idd}`)[0].files[0]
      let reader = new FileReader()
      // 正式读取文件
      reader.readAsDataURL(this.filex)
      let that = this
      reader.onloadend = function (e) {
        that.imgUrl = e.target.result
        that.ifPhoto = true
      }
    },
    async triggerUpload (ismore, files) {
    //   console.log(this.filex)
    //   console.log(typeof this.filex, typeof this.filex === 'string')
      if (typeof this.filex === 'string') {
        return null
      }
      if (this.filex === '' || !this.filex) {
        throw new ErrorModel('Checkout The Cover !')
      }
      if (ismore) {
        let result = await this.uploadMoreImgToQiniu(files)
        return result
      }
      let result = await this.uploadImgToQiniu(this.filex)
      return result
    },
    // 上传图片到七牛
    async uploadImgToQiniu (file) {
      this.$my_toast.show({ content: 'Upload Img...', time: 7000, id: 'axiosToast' })
      const axiosInstance = axios.create({ withCredentials: false }) // withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
      let data = new FormData()
      data.append('token', this.uploadToken) // 七牛需要的token，叫后台给，是七牛账号密码等组成的hash
      data.append('file', file)
      data.append('key', new Date().getTime() + file.name)
      let resultData = await axiosInstance({
        method: 'POST',
        url: 'https://upload-z2.qiniup.com', // 上传地址
        data: data,
        timeout: 30000, // 超时时间，因为图片上传有可能需要很久
        onUploadProgress: (progressEvent) => {
          // imgLoadPercent 是上传进度，可以用来添加进度条
          this.imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          console.log(this.imgLoadPercent)
        }
      })
      console.log(resultData)
      if (!resultData) {
        return false
      }
      this.$my_toast.hide()
      return qiniu.qiniuDomain + resultData.data['key']
    },
    async uploadMoreImgToQiniu (files) {
      let allresult = []
      this.$my_toast.show({ content: 'Upload Img...', time: 7000, id: 'axiosToast' })
      files.forEach(async (e, v) => {
        const axiosInstance = axios.create({ withCredentials: false }) // withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
        let data = new FormData()
        data.append('token', this.uploadToken) // 七牛需要的token，叫后台给，是七牛账号密码等组成的hash
        data.append('file', files[v].audio_url)
        data.append('key', new Date().getTime() + files[v].audio_url.name)
        let resultData = await axiosInstance({
          method: 'POST',
          url: 'https://upload-z2.qiniup.com', // 上传地址
          data: data,
          timeout: 30000, // 超时时间，因为图片上传有可能需要很久
          onUploadProgress: (progressEvent) => {
            // imgLoadPercent 是上传进度，可以用来添加进度条
            this.imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total)
            console.log(this.imgLoadPercent)
          }
        })
        console.log(resultData)
        if (!resultData) {
          return false
        }
        allresult.push(resultData.data['key'])
      })
      this.$my_toast.hide()
      return allresult
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/togerher.scss';

.musicCoverBack {
  width:27vw; height:27vw; font-weight:bold; font-size:20px; border-radius:12px;
  font-size:2.8vw; transition: all 0.5s;
  .iconsize {
    width:7vw; height:7vw;
  }
}

.musicCoverBackChange {
    width:27vw; height:27vw; font-weight:bold; font-size:20px; border-radius:12px; font-size:2.8vw;
    background-color:$maincolor; color:#fff; transition: all 0.5s;
  .iconsize {
    width:7vw; height:7vw;
  }
}

</style>
