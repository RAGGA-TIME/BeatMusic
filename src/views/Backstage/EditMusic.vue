<template>
  <div class="edit-container">
    <el-row :gutter="10">
      <el-col style="display:flex; justify-content: center; align-items: center;">
        <myImgUpload ref="m1" :imgSrc="musicCoverUrl" :file="musicCoverUrl"/>
      </el-col>
    <el-col>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getMusicName" :name="'musicName'" :inputWidth="'20vw'" :id="'1Name'" :inputData="musicName"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getReleaseDate" :name="'releaseDate'" :inputWidth="'20vw'" :id="'1Date'" :inputData="releaseDate"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
          <myButton :id="'1'" v-on:getFile="getMusicFile" :inputSelectx="musicFileUrl" :name="'Select Music File 🎵'" :typex="'Upload'" />
      </div>
      <div class="divCenter" @click="edit" style="margin-top:40px;">
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
  name: 'EditMusic',
  components: {
    myInput,
    myButton,
    myImgUpload
  },
  data () {
    return {
      musicId: '',
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
    async edit () {
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
        if (resultres && resultres !== null) {
          this.musicCoverUrl = resultres
        }
        // eslint-disable-next-line no-unused-vars
        let res = await this.editMusic()
        this.$router.push({ name: 'Music' })
      } catch (err) {
        this.$my_message(err.message)
      }
    },
    async editMusic () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.EditMusic({
        musicfile: this.musicFileUrl,
        release_date: this.releaseDate,
        musicname: this.musicName,
        coverfile: this.musicCoverUrl,
        belong_user: userId,
        _id: this.musicId
      }, true)
      return res
    }
  },
  created () {
    this.musicId = this.$route.params._id
    this.musicName = this.$route.params.name
    this.releaseDate = this.$route.params.release_date
    //  剔除网站信息
    this.musicFileUrl = this.$route.params.music_url.replace('http://www.ragga-time.com/music/', '')
    this.musicCoverUrl = this.$route.params.cover_url
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/togerher.scss';
.edit-container {
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
