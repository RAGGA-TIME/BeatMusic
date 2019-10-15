<template>
    <div class="radio-container">
    <el-row :gutter="10">
      <el-col style="display:flex; justify-content: center; align-items: center;">
        <myImgUpload ref="m1" :iconType="'Radio'" :file="radioCoverUrl" :imgSrc="radioCoverUrl"/>
      </el-col>
    <el-col>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getRadioName" :name="'radioName'" :id="'1radioName'" :inputWidth="'20vw'" :inputData="radioName"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
        <myInput v-on:getInput="getReleaseDate" :name="'releaseDate'" :id="'1releaseDate'" :inputWidth="'20vw'" :inputData="releaseDate"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
        <myTextArea :textAreaWidth="'450px'" :textAreaData="introduction" v-on:getTextArea="getIntroduction"
        :textAreaHeight="'120px'" :realWidth="'420px'"/>
      </div>
      <div class="divCenter" style="margin-top:40px;">
        <myButton ref="m2" :name="'save 💾'" v-on:confirm="edit" :id="'x'" :typex="'confirm'"/>
      </div>
      </el-col>

      <el-col>
          <!-- 所属节目 -->
        <el-table :data="sonMusic" style="margin-top:30px; width:100%;">
            <el-table-column type="expand" label="Cover" width="200" prop="audio_cover_url">

                    <template slot-scope="scope">
                        <div style="width:100%; display:flex; justify-content: center; align-items: center;">
                            <div style="display:flex; justify-content: center; align-items: center; text-align:center">
                                <myImgUpload ref="m1" :intro="'Select RadioShow Cover'" :width="'120px'" :height="'120px'"
                                :fontSize="'13px'" :iconSize="'40px'" :gutter="'20px'" :imgSrc="scope.row.audio_cover_url"/>
                            </div>
                            <div style="margin-left:30px;">
                                <myInput style="margin-top:5px;" v-on:getInput="getRadioName" :name="'radioName'"
                                :inputWidth="'20vw'" :inputData="scope.row.name" :id="'2radioName' + scope.row._id"/>
                                <myInput style="margin-top:15px;" v-on:getInput="getReleaseDate" :name="'releaseDate'"
                                :inputWidth="'20vw'" :inputData="scope.row.create_date" :id="'2releaseDate' + scope.row._id"/>
                            </div>
                            <div class="divCenter" style="margin-left:30px;">
                              <myTextArea :textAreaWidth="'450px'" :textAreaData="scope.row.introduction"
                              :textAreaHeight="'120px'" :realHeight="'75px'"/>
                            </div>
                        </div>
                        <div style="width:100%; display:flex; justify-content: center; align-items: center;">
                            <div style="width: 350px; margin-top:40px; text-align:center;">
                                <myButton :id="'2'" :name="'Replace RadioShow File 🎧'" :typex="'Upload'"/>
                            </div>
                        </div>
                    </template>

            </el-table-column>
            <el-table-column label="Name" prop="name">

            </el-table-column>

            <el-table-column label="Listen" prop="listen" width="100">

            </el-table-column>
            <el-table-column label="ShowInfo" prop="audio_url" width="160">
                <template slot-scope="scope" >
                    <miniplayer :src="scope.row.audio_url" :id="scope.row._id" @onlyOnePlay="onlyOnePlay"/>
                </template>
            </el-table-column>

            <el-table-column label="operation" width="100">
                <template slot-scope="scope">
                    <my-button :id="scope.row._id" :typex="'Delete'" :name="'delete'"/>
                </template>
            </el-table-column>
        </el-table>
      </el-col>

      <el-col style="margin-top:30px; justify-content: center; align-items: center; display:flex;">
          <div style="width:220px;">
              <my-button :name="'upload radioShow 📻'" :forward="'UploadRadioShow'" :clickData="RadioData"/>
          </div>
      </el-col>

  </el-row>
  </div>
</template>

<script>
import myInput from '../../components/Backstage/Input/myInput.vue'
import myButton from '../../components/Backstage/Button/myButton.vue'
import miniplayer from '../../components/Backstage/Play/miniplayer.vue'
import myTextArea from '../../components/Backstage/TextArea/myTextArea.vue'
import myImgUpload from '../../components/Backstage/Button/myImgUpload.vue'
export default {
  name: 'NewRadio',
  components: {
    myInput,
    myButton,
    miniplayer,
    myTextArea,
    myImgUpload
  },
  data () {
    return {
      typex: '',
      radioId: '',
      radioName: '',
      releaseDate: '',
      introduction: '',
      radioCoverUrl: '',
      RadioData: [],
      sonMusic: []
    }
  },
  methods: {
    getRadioName (data) {
      this.radioName = data
    },
    getReleaseDate (data) {
      this.releaseDate = data
    },
    getIntroduction (data) {
      this.introduction = data
    },
    async getRadioShow () {
      let radioId = this.radioId
      let res = await this.$MusicHttp.GetRadioShow({ radioId })
      this.sonMusic = res
    },
    async edit () {
      let that = this
      for (let key in this.$data) {
        if (key === 'radioCoverUrl' || key === 'typex' || key === 'radioId') { } else {
          if (this.$data[key] === '') {
            this.$my_message(`${key} can't be empty`)
            return
          }
        }
      }
      try {
        let resultres = await that.$refs.m1.triggerUpload()
        if (resultres && resultres !== null) {
          this.radioCoverUrl = resultres
        }
        // eslint-disable-next-line no-unused-vars
        let res = await this.editRadio()
        this.$router.push({ name: 'Radio' })
      } catch (err) {
        this.$my_message(err.message)
      }
    },
    async editRadio () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.EditRadio({
        introduction: this.introduction,
        create_date: this.releaseDate,
        radioname: this.radioName,
        radio_cover_url: this.radioCoverUrl,
        belong_user: userId,
        radioId: this.radioId
      })
      return res
    },
    onlyOnePlay () {
      this.sonMusic.forEach((e, v) => {
        $(`#audio${e._id}`)[0].pause()
      })
    }
  },
  async created () {
    this.radioId = this.$route.params._id
    this.radioName = this.$route.params.name
    this.releaseDate = this.$route.params.create_date
    this.radioCoverUrl = this.$route.params.radio_cover_url
    this.introduction = this.$route.params.introduction
    this.RadioData = this.$route.params
    await this.getRadioShow()
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
