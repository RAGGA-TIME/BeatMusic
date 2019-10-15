<template>
    <div>
        <forgotPwd :forGot="forGot" v-on:checkForGot="checkForGot"/>
        <register :isOpen="isOpen" v-on:checkRegister="checkRegister"/>
        <transition name="fade">
            <div v-if="login" @click="login = false; loginx = false" class="login">
                <transition name="bounce">
                    <div v-if="loginx" class="login-in" @click="outhere">
                        <div>
                            <div
                                style="display:flex; justify-content: center; align-items: center;"
                            >
                                <img
                                    src="../../../assets/icons/logo.gif"
                                    style="width:150px; height:71px;"
                                />
                            </div>
                            <myInput
                                style="margin-top:15px; margin-left:6px;"
                                v-on:getInput="getUserName"
                                :name="'username'"
                                :inputData="''"
                                :id="'username'"
                                :inputWidth="'150px'"
                            />
                            <div>
                                <myInput
                                    style="margin-top:15px; margin-left:6px;"
                                    v-on:getInput="getPassWord"
                                    :name="'password'"
                                    :inputData="''"
                                    :id="'password'"
                                    :inputWidth="'150px'"
                                    :type="'password'"
                                />
                            </div>
                            <div
                                style="display:flex; text-align:center; margin-top:20px;align-items:center; justify-content:center;"
                            >
                                <mybutton
                                    :typex="'confirm'"
                                    v-on:confirm="loginn"
                                    :name="'login'"
                                    :id="'username'"
                                />
                                <mybutton
                                    :name="'Tourists'"
                                    :id="'Tourists'"
                                    style="margin-left:20px;"
                                />
                                <mybutton
                                    :typex="'confirm'"
                                    v-on:confirm="openRegister"
                                    :name="'register'"
                                    :id="'xx'"
                                    style="margin-left:20px;"
                                />
                            </div>
                            <div @click="forGot = true"
                                style="font-size:13px; margin-top:15px; margin-left:-5px; text-align:center; color:#787878;"
                            ><u>Forgot password?</u></div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <div :class="x?'outDivs':'outDiv'">
            <div
                @mouseenter="x = true"
                @mouseleave="x = false"
                style="height:50px; display:flex;"
                @click="goBackstage"
            >
                <img :src="headUrl" />
                <span>Musicians Center</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import myInput from '../../Backstage/Input/myInput.vue'
import mybutton from '../../Backstage/Button/myButton.vue'
export default {
  name: 'gotoBack',
  data () {
    return {
      x: false,
      login: false,
      loginx: false,
      isOpen: false,
      forGot: false,
      username: '',
      password: '',
      userToken: '',

      headUrl: require('../../../assets/icons/xxx.png')
    }
  },
  components: {
    register: () => import('./register.vue'),
    forgotPwd: () => import('./forgotPwd.vue'),
    myInput,
    mybutton
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['changeLogin']),
    async loginn () {
      let _this = this
      if (this.username === '' || this.password === '') {
        this.$my_message('账号或密码不能为空')
      } else if (this.username === 'TestUser' && this.password === '123456') {
        let resx = await this.$MusicHttp.MusiciansLogin()
        _this.userToken = 'Bearer ' + resx.data
        _this.changeLogin({
          Authorization: _this.userToken,
          userInfo: resx.user
        })
        alert('登陆成功')
        _this.$router.push('/Backstage/Homepage')
      } else {
        this.$my_toast.show({ content: '账号或密码错误！', Mask: false, time: 1500, id: 'sxs' })
      }
    },
    outhere (e) {
      e.stopPropagation()
    },
    getUserName (data) {
      this.username = data
    },
    getPassWord (data) {
      this.password = data
    },
    checkRegister () {
      this.isOpen = false
    },
    checkForGot () {
      this.forGot = false
    },
    openRegister () {
      this.isOpen = true
    },
    goBackstage () {
      if (this.$store.state.userId) {
        $('#MainContext').animate(
          {
            marginTop: '-100%',
            opacity: 0
          },
          2000,
          () => {
            this.$router.push('/Backstage/Homepage')
          }
        )
        return
      }
      this.login = true
      setTimeout(() => {
        this.loginx = true
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/togerher.scss";
@import "../../../assets/scss/gotoBack.scss";
</style>
