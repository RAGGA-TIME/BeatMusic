<template>
  <div class="upload-container">
    <el-row :gutter="10">
      <el-col style="display:flex; justify-content: center; align-items: center;">
        <myImgUpload ref="m1"/>
      </el-col>
    <el-col>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getMusicName" :name="'musicName'" :id="'musicNamex'" :inputWidth="'20vw'" :inputData="musicName"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getReleaseDate" :name="'releaseDate'" :id="'releaseDatex'" :inputWidth="'20vw'" :inputData="releaseDate"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
          <myButton :id="'1'" v-on:getFile="getMusicFile" :name="'Select Music File 🎵'" :typex="'Upload'" />
      </div>
      <div class="divCenter" @click="upload" style="margin-top:40px;">
        <myButton :name="'confirm upload'" :id="'x'" :typex="'confirm'"/>
      </div>
      </el-col>

  </el-row>
  </div>
</template>

<script>
import myInput from '../../components/Backstage/Input/myInput.vue'
import myButton from '../../components/Backstage/Button/myButton.vue'
import myImgUpload from '../../components/Backstage/Button/myImgUpload.vue'
export default {
  name: 'UploadMusic',
  components: {
    myInput,
    myButton,
    myImgUpload
  },
  data () {
    return {
      musicName: '',
      releaseDate: '',
      musicFileUrl: '',
      musicCoverUrl: ''
    }
  },
  methods: {
    getMusicName (data) {
      this.musicName = data
    },
    getReleaseDate (data) {
      this.releaseDate = data
    },
    getMusicFile (data) {
      this.musicFileUrl = data
    },
    async upload () {
      let that = this
      for (let key in this.$data) {
        if (key === 'musicCoverUrl') { } else {
          if (this.$data[key] === '') {
            this.$my_message(`${key} can't be empty`)
            return
          }
        }
      }

      try {
        let resultres = await that.$refs.m1.triggerUpload()
        this.musicCoverUrl = resultres
        // eslint-disable-next-line no-unused-vars
        let res = await this.uploadMusic()
        this.$router.push({ name: 'Music' })
      } catch (err) {
        this.$my_message(err.message)
      }
    },
    async uploadMusic () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.UploadMusic({
        musicfile: this.musicFileUrl,
        release_date: this.releaseDate,
        musicname: this.musicName,
        coverfile: this.musicCoverUrl,
        belong_user: userId
      }, true)
      return res
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/togerher.scss';
.upload-container {
  padding: 70px 50px 30px 50px;
  font-size:20px;
}
  .el-col {
    border-radius: 4px;
  }
.divCenter {
  display:flex; justify-content: center; align-items: center; text-align:center;
}

</style>
