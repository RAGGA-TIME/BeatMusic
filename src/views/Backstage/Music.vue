<template>
  <div class="music-container">
    <el-row style="text-align:left; font-weight:bold; display:flex;">
      <div style="width:50%;"> Music Library(20)</div>
      <div @click="uploadMusic" @mouseenter="uploadTurn = true" @mouseleave="uploadTurn = false"
      :class="uploadTurn ? 'uploadChange' : 'upload'"><span>Upload + </span></div>
    </el-row>
    <el-row>
      <el-table :data="musicData" style="width: 95%; margin-top:30px; font-size:18px; font-weight:bold;">
          <el-table-column prop="cover_url" label="musicCover">
            <template slot-scope="scope" >
                <img :src="scope.row.cover_url" style="width:12vw; height:12vw;"/>
            </template>
          </el-table-column>
          <el-table-column sortable prop="name" label="musicName">
          </el-table-column>
          <el-table-column sortable prop="release_date" label="musicDate">
          </el-table-column>
          <el-table-column sortable prop="listen" label="listen">
          </el-table-column>
          <el-table-column sortable label="info">
            <template slot-scope="scope" >
                <miniplayer :src="scope.row.music_url" :id="scope.row._id" @onlyOnePlay="onlyOnePlay"/>
            </template>
          </el-table-column>
          <el-table-column label="operation">
            <template slot-scope="scope">
                <div style="display:flex; ">
                  <myButton style="margin-left:8px;" :id="scope.row._id" :name="'Edit'" :forward="'EditMusic'" :typex="'Edit'" :clickData="scope.row"/>
                  <myButton style="margin-left:8px;" :id="scope.row._id" :name="'Delete'" :typex="'Delete'"
                  v-on:delete="deleteMusic"/>
                </div>

            </template>
          </el-table-column>
    </el-table>
    </el-row>

  </div>
</template>

<script>
import myButton from '../../components/Backstage/Button/myButton.vue'
import miniplayer from '../../components/Backstage/Play/miniplayer.vue'
export default {
  components: {
    myButton,
    miniplayer
  },
  data () {
    return {
      musicData: [],
      uploadTurn: false
    }
  },
  mounted () {
    this.getMyMusic()
  },
  methods: {
    async getMyMusic () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.GetMyMusic({ userId })
      console.log(res)
      this.musicData = res
    },
    async deleteMusic (musicId) {
      let res = await this.$MusicHttp.DeleteMusic({ musicId: musicId })
      console.log(res)
      await this.getMyMusic()
    },
    uploadMusic () {
      this.$router.push({ name: 'UploadMusic' })
    },
    onlyOnePlay () {
      this.musicData.forEach((e, v) => {
        $(`#audio${e._id}`)[0].pause()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/togerher.scss';

.music-container {
  padding:50px 30px 30px 50px;
  font-size:20px;
}
.upload {
  width:50%; text-align:right; padding-right:40px;
    span {
       border-radius:30px; background-color:#fff; color:$maincolor; padding:5px 15px 5px 15px; transition: all 0.5s;
    }
}
.uploadChange {
  width:50%; text-align:right; padding-right:40px;
      span {
       border-radius:30px; background-color:$maincolor; color:#fff; padding:5px 15px 5px 15px;  transition: all 0.5s;
    }
}
</style>
