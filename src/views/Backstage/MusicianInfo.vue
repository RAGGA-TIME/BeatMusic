<template>
  <div class="container">
        <div class="registerOutDiv">
            <div class="registerContextDiv">
                <div class="mainContextDiv">
                    <myImgUpload
                        v-if="haveBigUrl"
                        ref="Img1"
                        :intro="'Select Your Poster'"
                        :imgSrc="registerData.bigurl"
                        :file="registerData.bigurl"
                        style="margin-top:30px; margin-left:6px;"
                        :iconType="'HeadUrl'"
                    />
                    <myImgUpload
                        v-if="haveHeadUrl"
                        ref="Img2"
                        :intro="'Select Your Avatar'"
                        :imgSrc="registerData.headurl"
                        :file="registerData.headurl"
                        style="margin-top:15px; margin-left:6px;"
                        :width="'120px'"
                        :iconType="'HeadUrl'"
                        :height="'120px'"
                        :fontSize="'11px'"
                        :iconSize="'40px'"
                        :gutter="'30px'"
                    />
                    <myInput
                        v-if="haveName"
                        style="margin-top:30px; margin-left:6px; align-self:center;"
                        v-on:getInput="newName"
                        :inputData="registerData.userName"
                        :name="'nickyname'"
                        :id="'newnickyname'"
                        :inputWidth="'150px'"
                    />
                    <myTextArea
                        v-if="haveIntro"
                        style="margin-top:30px;"
                        :name="'Introduction'"
                        :textAreaData="registerData.introduction"
                        v-on:getTextArea="newIntroduction"
                        :textAreaWidth="'350px'"
                        :realWidth="'350px'"
                        :textAreaHeight="'120px'"
                    />
                    <myInput
                        v-if="havePhone"
                        style="margin-top:30px;"
                        :inputData="registerData.phone"
                        v-on:getInput="newPhone"
                        :name="'phoneNumber'"
                        :realWidth="'180px'"
                        :id="'phone'"
                        :inputWidth="'130px'"
                    />
                    <div class="insideButton">
                        <mybutton
                            :typex="'confirm'"
                            v-on:confirm="updateMusicianInfo"
                            :name="'confirm'"
                            :id="'confirm'"
                        />
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

export default {
  components: {
    myInput: () => import('../../components/Backstage/Input/myInput.vue'),
    mybutton: () => import('../../components/Backstage/Button/myButton.vue'),
    myTextArea: () => import('../../components/Backstage/TextArea/myTextArea.vue'),
    myImgUpload: () => import('../../components/Backstage/Button/myImgUpload.vue')
  },
  data () {
    return {
      havePhone: false,
      haveIntro: false,
      haveName: false,
      haveBigUrl: false,
      haveHeadUrl: false,
      registerData: {
        userId: '',
        userName: '',
        bigurl: '',
        headurl: '',
        introduction: '',
        phone: ''
      }
    }
  },
  created () {
    this.findOneMusicianInfo()
  },
  methods: {
    newName (data) {
      this.registerData.name = data
    },
    newIntroduction (data) {
      this.registerData.introduction = data
    },
    newPhone (data) {
      this.registerData.phone = data
    },
    async findOneMusicianInfo () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.FindOneMusicianInfo({ id: userId })
      this.registerData = res
      this.havePhone = true
      this.haveIntro = true
      this.haveName = true
      this.haveBigUrl = true
      this.haveHeadUrl = true
      console.log(this.registerData)
    },
    async editMusicianInfo () {
      let res = await this.$MusicHttp.EditMusicianInfo({ user: this.registerData })
      return res
    },
    async updateMusicianInfo () {
      for (let key in this.registerData) {
        if (key === 'bigurl' || key === 'headurl') { } else {
          if (this.registerData[key] === '') {
            this.$my_message(`${key} can't be empty`)
            return
          }
        }
      }
      try {
        let resultres1 = await this.$refs.Img1.triggerUpload()
        if (resultres1 && resultres1 !== null) {
          this.registerData.bigurl = resultres1
        }
        let resultres2 = await this.$refs.Img2.triggerUpload()
        if (resultres2 && resultres2 !== null) {
          this.registerData.headurl = resultres2
        }
        if (this.registerData.bigurl === null || this.registerData.headurl === null) {
          this.$my_message('Poster Or Avatar Not Select！')
          return
        }
        let res = await this.editMusicianInfo()
        console.log(res)
        if (res.code === 200) {
          this.$my_message('Update successful!')
          this.$router.push({ name: 'Homepage' })
        }
      } catch (err) {
        this.$my_message(err.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding:50px 30px 30px 50px;
  font-size:20px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}

.registerOutDiv {
    width: 100%;
    height: auto;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    .registerContextDiv {
        width:50vw;
        min-width:350px;
        border-radius:20px;
        padding:30px;
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
