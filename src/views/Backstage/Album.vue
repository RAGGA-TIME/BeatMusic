<template>
  <div class="album-container">

      <el-dialog title="Add Songs" :visible.sync="dialogVisible" :modal-append-to-body='false'>

          <div v-if="albumData.length > 0">
              <el-table :data="musicLibary" height="300px" @selection-change="handleSelectionChange">
                  <el-table-column label="Choose" prop="_id" type="selection">
                  </el-table-column>
                  <el-table-column label="Cover" prop="cover_url">
                      <template slot-scope="scope">
                          <img :src="scope.row.cover_url" style="width: 80px; height:80px;">
                      </template>
                  </el-table-column>
                  <el-table-column label="Name" prop="name">
                  </el-table-column>
                  <el-table-column label="Release_date" prop="release_date">
                  </el-table-column>
              </el-table>
          </div>

          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSongs">确 定</el-button>
          </span>

      </el-dialog>

    <div class="addAlbumButton">
      <myButton :width="'200px'" :id="'upload_Album'" :name="'Add album + '" :forward="'NewAlbum'" :typex="'Edit'" :clickData="editData"/>
    </div>
    <div v-if="albumData.length > 0">
        <div v-for="item in mainAlbumInfo" :key="item._id" style="margin-top:50px; width:87vw; justify-content:center;"
        :style="{ display: widthChange }">
            <template style="height:auto;">
                <div class="mainAlbum">
                    <span>
                        <i v-if="!changeAlbumName">{{item.name}}</i>
                        <i @click="changeAlbumName = true" v-if="!changeAlbumName" class="el-icon-edit"
                        style="margin-left:10px;font-size:30px;"></i>
                        <myInput v-if="changeAlbumName" :id="item._id" :name="'AlbumName'" :inputData="item.name" style="margin-left:40px;"/>
                    </span>

                    <img :src="item.album_cover_url" class="imgSrc">
                    <img src="../../assets/icons/Album_Background2.png" class="imgBack">
                </div>
                <div>
                    <el-table :data="item.have_music" style="width:45vw; margin-left:40px; margin-top:45px;"
                    :style="{ width: widthx, marginLeft: marginLeftx }" height="250">
                        <el-table-column sortable prop="name" label="musicName">
                        </el-table-column>
                        <el-table-column sortable prop="release_date" label="musicDate">
                        </el-table-column>
                        <el-table-column sortable label="info">
                            <template slot-scope="scope" >
                                <miniplayer :src="scope.row.music_url" :id="scope.row._id" @onlyOnePlay="onlyOnePlay" :width="'20px'"/>
                            </template>
                        </el-table-column>
                        <el-table-column width="100" label="operation">
                        <template slot-scope="scope">
                            <my-button v-on:delete="removeSong" :name="'remove'" :id="scope.row._id" :typex="'Delete'"/>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div style="width:100%; display:flex; justify-content: center; align-items: center;">
                        <div @click="dialogVisible = true" style="margin-top:20px; width:150px;">
                            <my-button :typex="'none'" :name="'Add Songs'"/>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

    <div v-if="albumData.length > 0" style="margin-top:50px;">
        <template style="height:auto;" v-for="itemt in albumData">
        <span :key="itemt._id" class="albumSection">{{itemt.name}}</span>
        <img @click="changeMainAlbumData(itemt)" :key="itemt._id + 'img'" :src="itemt.album_cover_url" class="albumSectionImg">
            <img @click="changeMainAlbumData(itemt)" :key="itemt._id + 'img2'" src="../../assets/icons/Album_Background2.png" class="albumSectionBackground">
        </template>
    </div>

  </div>
</template>

<script>
import myInput from '../../components/Backstage/Input/myInput.vue'
import myButton from '../../components/Backstage/Button/myButton.vue'
import miniplayer from '../../components/Backstage/Play/miniplayer.vue'
export default {
  components: {
    myInput,
    myButton,
    miniplayer
  },
  data () {
    return {
      screenWidths: document.body.clientWidth,
      widthChange: 'flex',
      widthx: '45vw',
      marginLeftx: '40px',
      changeAlbumName: false,
      dialogVisible: false,
      albumData: [],
      musicLibary: [],
      multipleSelection: '',
      editData: {
        goName: 'NewAlbum',
        goParams: {}
      },
      deleteData: {
        goName: 'deleteMusic',
        goParams: {}
      },
      uploadTurn: false,
      mainAlbumInfo: []
    }
  },
  async mounted () {
    if (this.screenWidths < 1200) { this.widthChange = ''; this.widthx = '77vw'; this.marginLeftx = '0px' }
    await this.getMyAlbum()
    await this.getMyMusic()
  },
  methods: {
    async getMyAlbum () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.GetMyAlbum({ belong_user: userId })
      console.log(res)
      this.albumData = res
      console.log(this.albumData)
      this.mainAlbumInfo.pop()
      this.mainAlbumInfo.push(this.albumData[0])
    },
    async getMyMusic () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.GetMyMusic({ userId })
      this.musicLibary = res
    },
    async addSongs () {
      if (this.multipleSelection === '') { return }
      let albumId = this.mainAlbumInfo[0]._id
      await this.$MusicHttp.AddSongs({ albumId: albumId, addMusicIdArray: this.multipleSelection })
      this.dialogVisible = false
      this.multipleSelection = ''
      await this.getMyAlbum()
    },
    async removeSong (removeMusicId) {
      let albumId = this.mainAlbumInfo[0]._id
      await this.$MusicHttp.RemoveSong({ albumId: albumId, removeMusicId: removeMusicId })
      await this.getMyAlbum()
    },
    onlyOnePlay () {
      this.mainAlbumInfo[0].have_music.forEach((e, v) => {
        $(`#audio${e._id}`)[0].pause()
      })
    },
    changeMainAlbumData (itemt) {
      this.mainAlbumInfo.pop()
      this.mainAlbumInfo.push(itemt)
    },
    handleClose () {

    },
    handleSelectionChange (val) {
      let idCollection = []
      val.forEach((e, v) => {
        idCollection.push(e._id)
      })
      this.multipleSelection = idCollection
    }
  }
}
</script>

<style lang="scss" scoped>

.album-container {
  padding:50px 30px 30px 50px;
  font-size:20px;
}

.addAlbumButton {
  display:flex; justify-content: center; align-items: center;
}

.albumSection {
  position:absolute; margin-top:245px; font-weight:bold; text-align:center; width:300px;
}

.albumSectionImg {
  width:186px; height:185px; margin-left:39px; margin-top:44px; position:absolute;
}

.albumSectionBackground {
  width:300px; height:213px; margin-bottom:30px; margin-top:30px;
}

.mainAlbum {
  span {
    position:absolute; margin-top:315px; font-weight:bold; text-align:center; width:398px; font-size:25px;
  }
  .imgSrc {
    width:249px; height:249px; margin-left:49px; margin-top:49px; position:absolute;
  }
  .imgBack {
    width:398px; height:282px; margin-bottom:30px; margin-top:30px;
  }
}
</style>
