<template>
    <transition name="fade">
        <div v-if="forGot" class="outSideDiv">
            <div v-if="forGot" class="inSideDiv">
                <div style="margin-top:15px; display:flex; text-align:center; align-items: center; justify-content: center;">
                    <img style="width:250px; height:103px;" :src="step">
                </div>
                <div
                v-if="secondStep"
                style="text-align:center; align-items: center; justify-content: center; margin-top: 5px">
                    <div>
                        NickyName: <span style="font-weight:bold;">{{allName.name}}</span>
                    </div>
                    <div style="display:flex; text-align:center; align-items: center; justify-content: center;">
                        <myInput
                            style="margin-top:15px;"
                            v-on:getInput="newPassword"
                            :name="'newPassword'"
                            :realWidth="'170px'"
                            :inputData="''"
                            :type="'password'"
                            :id="'newPasswordx'"
                            :inputWidth="'170px'"
                        />
                    </div>
                    <div style="display:flex; text-align:center; align-items: center; justify-content: center;">
                        <myInput
                            style="margin-top:15px;"
                            v-on:getInput="checkPassword"
                            :name="'checkPassword'"
                            :realWidth="'170px'"
                            :inputData="''"
                            :type="'password'"
                            :id="'checkPasswordx'"
                            :inputWidth="'170px'"
                        />
                    </div>
                </div>
                <div v-if="firstStep">
                    <div style="display:flex; text-align:center; align-items: center; justify-content: center; margin-top: 25px">
                        <myInput
                            style="margin-top:15px;"
                            v-on:getInput="phonex"
                            :name="'phoneNumber'"
                            :realWidth="'170px'"
                            :inputData="''"
                            :id="'phone'"
                            :inputWidth="'170px'"
                        />
                    </div>
                    <div style="display:flex; text-align:center; align-items: center; justify-content: center;">
                        <my-input
                            style="margin-top:15px; margin-left:10px;"
                            v-on:getInput="checkVerificationCode"
                            :name="'authCode'"
                            :inputData="''"
                            :realWidth="'100px'"
                            :id="'VerificationCodex'"
                            :inputWidth="'100px'"
                        />
                        <mybutton
                            v-show="!isSend"
                            style="margin-left:15px; margin-top:15px;"
                            :typex="'confirm'"
                            v-on:confirm="sendMessage"
                            :name="'Send'"
                            :id="'Send'"
                        />
                        <div
                            v-show="isSend"
                            style="width:50px; color:#2c2c2c; height:50px;
                            margin-left:10px; font-weight:bold; margin-top:15px; padding-top:4px;"
                            id="disableSend">
                            {{countTime}}s After
                        </div>
                    </div>
                </div>

                <div class="insideButton">
                    <mybutton
                        v-if="firstStep"
                        :typex="'confirm'"
                        v-on:confirm="confirm"
                        :name="'confirm'"
                        :id="'confirmxx1'"
                    />
                    <mybutton
                        v-if="secondStep"
                        :typex="'confirm'"
                        v-on:confirm="confirmChangePassword"
                        :name="'modify'"
                        :id="'confirmxx2'"
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
    </transition>
</template>

<script>
import myInput from '../../Backstage/Input/myInput.vue'
import mybutton from '../../Backstage/Button/myButton.vue'
export default {
  props: {
    forGot: Boolean
  },
  components: {
    myInput,
    mybutton
  },
  data () {
    return {
      isSend: false,
      isSame: false,
      firstStep: true,
      secondStep: false,
      phone: '',
      countTime: 60,
      countDown: {},
      code: '',
      VerificationCode: '',
      allName: {},
      password: '',

      step: require('../../../assets/icons/Step1.png'),
      re: /^1\d{10}$/
    }
  },
  mounted () {

  },
  methods: {
    async confirm () {
      if (this.VerificationCode === '') {
        this.$my_message(`VerificationCode error！`)
        return
      }
      if (!this.re.test(this.phone)) {
        this.$my_message(`PhoneNumber error！`)
        return
      }
      this.step = require('../../../assets/icons/Step2.png')
      this.firstStep = false
      this.secondStep = true
    //   await this.findUserByPhone()
    },
    async confirmChangePassword () {
      if (!this.isSame) {
        this.$my_message(`Two passwords do not match！`)
        return
      }
      //   let result = await this.forGotPassword()
      Object.assign(this.$data, this.$options.data())
      this.$my_message(`Modified successfully!`)
      this.$emit('checkForGot')
    },
    checkVerificationCode (data) {
      this.VerificationCode = data
    },
    checkPassword (data) {
      if (this.password === data) {
        this.isSame = true
      } else {
        this.isSame = false
      }
    },
    newPassword (data) {
      this.password = data
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
    async findUserByPhone () {
      //    let res = await this.$MusicHttp.FindUserByPhone({ phone: this.phone })
      //    this.allName = res.allUserName
    },
    async forGotPassword () {
    //   let res = await this.$MusicHttp.ForGotPassword({
    //     _id: this.allName._id,
    //     newPassword: this.password
    //   })
    //   return res
    },
    async sendMessage () {
      if (!this.re.test(this.phone)) {
        this.$my_message(`phoneNumber format error！`)
        return
      }
      //   let res = await this.$MusicHttp.SendMessage({ phone: this.phone })
      //   if (res.result === 0) {
      //     this.code = res.codex
      //     this.$my_message(`Send a success！`)
      //   }
      this.$my_message(`Send a success！`)
      this.isSend = true
      this.countTimex()
    },
    phonex (data) {
      this.phone = data
    },
    cancel () {
      Object.assign(this.$data, this.$options.data())
      this.$emit('checkForGot')
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}
.outSideDiv {
    width: 100vw;
    height: 100vh;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 32;
    .inSideDiv {
        width:400px;
        min-width:350px;
        background-color:#fff;
        border-radius:20px;
        height:350px;
        padding:30px;
        overflow-y:scroll;
        position:fixed;
        z-index:34;
    }
    .insideButton {
        display: flex;
        text-align: center;
        margin-top: 35px;
        align-items: center;
        justify-content: center;
    }
}
</style>
