<template>
      <div class="album-container">
    <el-row :gutter="10">
      <el-col style="display:flex; justify-content: center; align-items: center;">
        <myImgUpload ref="m1" :intro="'Select The Album Cover'" :iconType="'Album'"/>
      </el-col>
        <el-col>
        <div class="divCenter" style="margin-top:40px;">
            <myInput v-on:getInput="getAlbumName" :name="'albumName'" :id="'albumNamex1'" :inputWidth="'20vw'" :inputData="albumName"/>
        </div>
        <div class="divCenter" style="margin-top:30px;">
            <myInput v-on:getInput="getReleaseDate" :name="'releaseDate'" :id="'releaseDatex1'" :inputWidth="'20vw'" :inputData="releaseDate"/>
        </div>

        <div style="display:flex; justify-content: center; align-items: center; text-align:left; margin-top:40px;">
            <template>
                    <el-transfer
                        filterable
                        :filter-method="filterMethod"
                        filter-placeholder="enter search content"
                        :titles="['Music Library', 'Album Contains']"
                        v-model="value"
                        :data="data">
                    </el-transfer>
            </template>
        </div>

        <div class="divCenter" style="margin-top:30px;">
            <div style="width: 140px;" @click="upload">
                <myButton ref="m2" :name="'create album'" :id="'x'" :typex="'confirm'"/>
            </div>
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
  name: 'NewAlbum',
  components: {
    myInput,
    myButton,
    myImgUpload
  },
  data () {
    const generateData = _ => {
      const data = []
      let cities = []
      cities = ['shenzhen', 'shanghai']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      albumSongs: [],
      filterMethod (query, item) {
        return item.label.indexOf(query) > -1
      },
      albumName: '',
      releaseDate: '',
      musicCoverUrl: ''
    }
  },
  watch: {
  },
  created () {
  },
  async mounted () {
    this.data = []
    let res = await this.getMyMusic()
    res.forEach((e, v) => {
      this.data.push({
        _id: e._id,
        label: e.name,
        key: v
      })
    })
  },
  methods: {
    getAlbumName (data) {
      this.albumName = data
    },
    getReleaseDate (data) {
      this.releaseDate = data
    },
    async upload () {
      let that = this
      for (let key in this.$data) {
        if (key === 'musicCoverUrl' || key === 'data' || key === 'filterMethod') { } else {
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
        let res = await this.newAlbum()
        this.$router.push({ name: 'Album' })
      } catch (err) {
        this.$my_message(err.message)
      }
    },
    async getMyMusic () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.GetMyMusic({ userId })
      return res
    },
    async newAlbum () {
      this.value.forEach((e, v) => {
        this.albumSongs.push(this.data[e]._id)
      })
      console.log(this.albumSongs)
      let res = await this.$MusicHttp.NewAlbum({
        have_music: this.albumSongs,
        release_date: this.releaseDate,
        albumname: this.albumName,
        album_cover_url: this.musicCoverUrl,
        belong_user: this.$store.state.userId
      })
      return res
    }
  }

}
</script>

<style lang="scss" scoped>
.album-container {
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
