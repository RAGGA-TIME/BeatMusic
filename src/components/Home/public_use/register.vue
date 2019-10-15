<template>
    <transition name="fade">
        <div v-if="isOpen" class="registerOutDiv">
            <div v-if="isOpen" class="registerContextDiv">
                <div class="mainContextDiv">
                    <myImgUpload
                        ref="Img1"
                        :intro="'Select Your Poster'"
                        style="margin-top:30px; margin-left:6px;"
                        :iconType="'HeadUrl'"
                    />
                    <myImgUpload
                        ref="Img2"
                        :intro="'Select Your Avatar'"
                        style="margin-top:15px; margin-left:6px;"
                        :width="'120px'"
                        :iconType="'HeadUrl'"
                        :height="'120px'"
                        :fontSize="'11px'"
                        :iconSize="'40px'"
                        :gutter="'30px'"
                    />
                    <myInput
                        style="margin-top:15px; margin-left:6px; align-self:center;"
                        v-on:getInput="newName"
                        :name="'nickyname'"
                        :inputData="''"
                        :id="'newnickyname'"
                        :inputWidth="'150px'"
                    />
                    <div style="display:flex; margin-top:15px; ">
                        <myInput
                            style="margin-left:6px; align-self:center;"
                            v-on:getInput="newUserName"
                            v-on:loseFocus="checkUserName"
                            :name="'username'"
                            :inputData="''"
                            :id="'newUsername'"
                            :inputWidth="'150px'"
                        />
                    </div>
                    <myInput
                        style="margin-top:15px; margin-left:6px; align-self:center;"
                        v-on:getInput="newUserPassword"
                        :name="'password'"
                        :inputData="''"
                        :id="'newPassword'"
                        :inputWidth="'150px'"
                        :type="'password'"
                    />
                    <myInput
                        style="margin-top:15px; margin-left:6px; align-self:center;"
                        v-on:getInput="checkUserPassword"
                        :name="'confirmPassword'"
                        :inputData="''"
                        :id="'checkUserPassword'"
                        :inputWidth="'150px'"
                        :type="'password'"
                    />
                    <myTextArea
                        style="margin-top:15px;"
                        :name="'Introduction'"
                        v-on:getTextArea="newIntroduction"
                        :textAreaWidth="'200px'"
                        :textAreaHeight="'120px'"
                    />
                    <div style="display:flex;">
                        <myInput
                            style="margin-top:15px;"
                            v-on:getInput="newPhone"
                            :name="'phoneNumber'"
                            :realWidth="'130px'"
                            :inputData="''"
                            :id="'phone'"
                            :inputWidth="'70px'"
                        />
                        <mybutton
                            v-show="!isSend"
                            style="margin-left:10px; margin-top:24px;"
                            :typex="'confirm'"
                            v-on:confirm="sendMessage"
                            :name="'Send'"
                            :id="'Send'"
                        />
                        <div
                            v-show="isSend"
                            style="width:50px; color:#2c2c2c; height:50px; margin-left:10px; font-weight:bold; margin-top:15px; padding-top:4px;"
                            id="disableSend">
                            {{countTime}}s After
                        </div>
                        <my-input
                            style="margin-top:15px; margin-left:10px;"
                            v-on:getInput="checkVerificationCode"
                            :name="'authCode'"
                            :inputData="''"
                            :id="'VerificationCode'"
                            :inputWidth="'25px'"
                        />
                    </div>
                    <div class="insideButton">
                        <mybutton
                            :typex="'confirm'"
                            v-on:confirm="register"
                            :name="'confirm'"
                            :id="'confirm'"
                        />
                        <mybutton
                            style="margin-left:30px;"
                            :typex="'confirm'"
                            v-on:confirm="cancel"
                            :name="'cancel'"
                            :id="'cancel'"
                        />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import myInput from '../../Backstage/Input/myInput.vue'
import mybutton from '../../Backstage/Button/myButton.vue'
import myTextArea from '../../Backstage/TextArea/myTextArea.vue'
import myImgUpload from '../../Backstage/Button/myImgUpload.vue'
export default {
  name: 'register',
  components: {
    myInput,
    mybutton,
    myImgUpload,
    myTextArea
  },
  props: {
    isOpen: Boolean
  },
  data () {
    return {
      isSend: false,
      isSame: false,
      Available: false,
      unAvailable: false,
      countTime: 60,
      countDown: {},
      code: '',
      VerificationCode: '',
      registerData: {
        username: '',
        password: '',
        name: '',
        bigurl: '',
        headurl: '',
        introduction: '',
        phone: ''
      },
      re: /^1\d{10}$/,
      uPattern: /^[a-zA-Z0-9_-]{4,25}$/
    }
  },
  methods: {
    newName (data) {
      this.registerData.name = data
    },
    newIntroduction (data) {
      this.registerData.introduction = data
    },
    newUserName (data) {
      this.registerData.username = data
    },
    newUserPassword (data) {
      this.registerData.password = data
    },
    newPhone (data) {
      this.registerData.phone = data
    },
    checkUserPassword (data) {
      if (this.registerData.password === data) {
        this.isSame = true
      } else {
        this.isSame = false
      }
    },
    checkVerificationCode (data) {
      this.VerificationCode = data
    },
    countTimex () {
      this.countDown = setInterval(() => {
        this.countTime--
        if (this.countTime <= 0) {
          this.isSend = false
          clearInterval(this.countDown)
        }
      }, 1000)
    },
    async musiciansRegister () {
      //    let res = await this.$MusicHttp.MusiciansRegister(this.registerData)
      //    return res
    },
    async sendMessage () {
      if (!this.re.test(this.registerData.phone)) {
        this.$my_message(`phoneNumber format error！`)
        return
      }
      //    let res = await this.$MusicHttp.SendMessage({ phone: this.registerData.phone })
      this.$my_message(`Send a success！假通知..`)
      this.isSend = true
      this.countTimex()
    },
    async checkUserName () {
      if (!this.uPattern.test(this.registerData.username)) {
        this.Available = false
        this.unAvailable = true
        this.$my_message(`username format error！`)
      }
      //    let result = await this.$MusicHttp.CheckUserName({ username: this.registerData.username })
    //   if (result.code) {
    //     this.unAvailable = false
    //     this.Available = true
    //     return
    //   }
    //   this.$my_message(`this UserName Already registered`)
    //   this.Available = false
    //   this.unAvailable = true
    },
    async register () {
      for (let key in this.registerData) {
        if (key === 'bigurl' || key === 'headurl') { } else {
          if (this.registerData[key] === '') {
            this.$my_message(`${key} can't be empty`)
            return
          }
          if (!this.re.test(this.registerData.phone)) {
            this.$my_message(`phoneNumber format error！`)
            return
          }
          if (!this.isSame) {
            this.$my_message(`Password misMatch！`)
            return
          }
          if (this.VerificationCode === '') {
            this.$my_message(`VerificationCode error！`)
            return
          }
        }
      }
      // let resultres1 = await this.$refs.Img1.triggerUpload()
      // this.registerData.bigurl = resultres1
      // let resultres2 = await this.$refs.Img2.triggerUpload()
      // this.registerData.headurl = resultres2
      if (this.registerData.bigurl === null || this.registerData.headurl === null) {
        this.$my_message('Poster Or Avatar Not Select！')
        return
      }
      // let res = await this.musiciansRegister()
      this.$my_message('Registration successful!假通..')
      Object.assign(this.$data, this.$options.data())
      this.$emit('checkRegister')
    },
    cancel () {
      Object.assign(this.$data, this.$options.data())
      this.$emit('checkRegister')
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}

.registerOutDiv {
    width: 100vw;
    height: 100vh;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 32;
    .registerContextDiv {
        width:50vw;
        min-width:350px;
        background-color:#fff;
        border-radius:20px;
        height:600px;
        padding:30px;
        overflow-y:scroll;
        position:fixed;
        z-index:34;
        .isAlive {
            position:absolute;
            margin-top:13px;
            margin-left:275px;
        }
        .mainContextDiv {
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            text-align:center;
        }
    }
    .insideButton {
        display: flex;
        text-align: center;
        margin-top: 20px;
        align-items: center;
        justify-content: center;
    }
}
</style>
