<template>
    <div class="radio-container">
    <el-row :gutter="10">
      <el-col style="display:flex; justify-content: center; align-items: center;">
        <myImgUpload ref="m1" :intro="'Select The Radio Cover'" :iconType="'Radio'"/>
      </el-col>
    <el-col>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getRadioName" :name="'radioName'" :inputWidth="'20vw'" :inputData="radioName"/>
      </div>
      <div class="divCenter" style="margin-top:30px;">
        <myInput v-on:getInput="getReleaseDate" :name="'releaseDate'" :inputWidth="'20vw'" :inputData="releaseDate"/>
      </div>
      <div class="divCenter"  style="margin-top:30px;">
        <myTextArea v-on:getTextArea="getRadioIntroduction" :textAreaWidth="'450px'" :textAreaHeight="'120px'" />
      </div>

      <div class="divCenter" style="margin-top:30px;">
          <div @click="upload" style="width: 140px;">
              <myButton ref="m2" :name="'create radio'" :id="'x'" :typex="'confirm'"/>
          </div>
      </div>
      </el-col>

  </el-row>
  </div>
</template>

<script>
import myInput from '../../components/Backstage/Input/myInput.vue'
import myButton from '../../components/Backstage/Button/myButton.vue'
import myTextArea from '../../components/Backstage/TextArea/myTextArea.vue'
import myImgUpload from '../../components/Backstage/Button/myImgUpload.vue'

export default {
  name: 'NewRadio',
  components: {
    myInput,
    myButton,
    myImgUpload,
    myTextArea
  },
  data () {
    return {
      typex: '',
      radioName: '',
      releaseDate: '',
      radioCoverUrl: '',
      radioIntroduction: ''
    }
  },
  methods: {
    getRadioName (data) {
      this.radioName = data
    },
    getReleaseDate (data) {
      this.releaseDate = data
    },
    getRadioIntroduction (data) {
      this.radioIntroduction = data
    },
    async uploadRadio () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.UploadRadio({
        name: this.radioName,
        introduction: this.radioIntroduction,
        create_date: this.releaseDate,
        radio_cover_url: this.radioCoverUrl,
        belong_user: userId
      })
      return res
    },
    async upload () {
      let that = this
      for (let key in this.$data) {
        if (key === 'typex' || key === 'radioCoverUrl') { } else {
          if (this.$data[key] === '') {
            this.$my_message(`${key} can't be empty`)
            return
          }
        }
      }

      try {
        let resultres = await that.$refs.m1.triggerUpload()
        this.radioCoverUrl = resultres
        // eslint-disable-next-line no-unused-vars
        let res = await this.uploadRadio()
        this.$router.push({ name: 'Radio' })
      } catch (err) {
        this.$my_message(err.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.radio-container {
  padding:50px 30px 30px 50px;
  font-size:20px;
}

  .el-col {
    border-radius: 4px;
  }
.divCenter {
  display:flex; justify-content: center; align-items: center; text-align:center;
}
</style>
