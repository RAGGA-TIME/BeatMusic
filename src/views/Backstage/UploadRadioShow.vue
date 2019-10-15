<template>
    <div class="upload-container">
      <el-row>
          <el-col>
              <!-- 隶属电台 -->
              <el-table :data="RadioData" style="width:100%;">
                  <el-table-column prop="radio_cover_url" label="Cover" width="180">
                    <template slot-scope="scope">
                        <img style="width:12vw; height:12vw;" :src="scope.row.radio_cover_url">
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="Name"></el-table-column>
              </el-table>
          </el-col>
      </el-row>
        <el-row :gutter="10">
          <div style=" margin-top:40px; font-weight:bold;">-- uploading list --</div>
              <el-table :data="RadioShowData" style="width:100%;">

                  <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div style="width:100%; display:flex; justify-content: center; align-items: center;">
                            <div style="display:flex; justify-content: center; align-items: center; text-align:center">
                                <myImgUpload ref="m1" :intro="'Select RadioShow Cover'" :iconType="'Radio'" :width="'120px'" :height="'120px'"
                                :fontSize="'13px'" :iconSize="'40px'" :gutter="'20px'" :imgSrc="scope.row.audio_cover_url"/>
                            </div>
                            <div style="margin-left:30px;">
                                <myInput style="margin-top:5px;" v-on:getInput="getAudioName" :name="'audioName'"
                                :inputWidth="'20vw'" :realWidth="'16vw'" :inputData="scope.row.audioName" :id="'Name' + scope.row._id"/>
                                <myInput style="margin-top:15px;" v-on:getInput="getCreateDate" :name="'create_Date'"
                                :inputWidth="'20vw'" :realWidth="'16vw'" :inputData="scope.row.create_date" :id="'Date' + scope.row._id"/>
                            </div>
                            <div class="divCenter"  style="margin-left:30px; ">
                              <myTextArea :textAreaWidth="'450px'" :id="'intro' + scope.row._id" :realHeight="'70px'"
                              :textAreaHeight="'100px'" v-on:getTextArea="getIntroduction" :realWidth="'405px'"/>
                            </div>
                        </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="audioName"></el-table-column>

                  <el-table-column>
                      <template slot-scope="scope">
                         <el-progress :percentage="scope.row.progress" :color="colors"></el-progress>
                      </template>
                  </el-table-column>

                  <el-table-column>
                      <template slot-scope="scope">
                          <div style="display:flex; justify-content: center; align-items: center;">
                              <my-button :id="scope.row._id" :width="'100px'" :name="'delete'"
                              v-on:delete="removeAudio" :typex="'Delete'"/>
                          </div>
                      </template>
                  </el-table-column>

              </el-table>
                  <div class="divCenter" style="margin-top:40px;">
                      <myButton :id="'1'" :name="'Select RadioShow File 🎧'" v-on:getFile="addAudio" :typex="'Upload'"/>
                  </div>
        <el-col>
          <div class="divCenter" style="margin-top:50px;">
            <myButton ref="m2" :name="'confirm upload'" :confirm="upload" :id="'x'" :typex="'confirm'"/>
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
  name: 'UploadRadioShow',
  components: {
    myInput,
    myButton,
    myTextArea,
    myImgUpload
  },
  data () {
    return {
      colors: '#2c2c2c',
      numxx: 0,
      bb: [],
      RadioData: [],
      RadioShowData: []
    }
  },
  watch: {
    RadioShowData () {
      console.log(this.RadioShowData)
      this.progressxx()
    }
  },
  methods: {
    getAudioName (data, _id) {
      _id = _id.replace('Name', '')
      this.RadioShowData.forEach((e, v) => {
        if (this.RadioShowData[v]._id === _id) {
          this.RadioShowData[v].audioName = data
        }
      })
    },
    getCreateDate (data, _id) {
      _id = _id.replace('Date', '')
      this.RadioShowData.forEach((e, v) => {
        if (this.RadioShowData[v]._id === _id) {
          this.RadioShowData[v].create_Date = data
        }
      })
    },
    getIntroduction (data, _id) {
      _id = _id.replace('intro', '')
      this.RadioShowData.forEach((e, v) => {
        if (this.RadioShowData[v]._id === _id) {
          this.RadioShowData[v].introduction = data
        }
      })
    },
    removeAudio (_id) {
      console.log(_id)
      this.RadioShowData.forEach((e, v) => {
        if (this.RadioShowData[v]._id === _id) {
          this.RadioShowData.splice(v, 1)
          clearInterval(this.bb[v])
        }
      })
    },
    addAudio (data) {
      if (data !== '') {
        this.RadioShowData.push({
          _id: '' + Math.floor(Math.random() * 10000),
          audioName: this.RadioData[0].name + ' No.' + this.RadioShowData.length + 1,
          introduction: '',
          create_date: '',
          audio_url: data,
          audio_cover_url: '',
          progress: 0,
          belong_radio: this.RadioData[0]._id
        })
      }
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
        let resultres = await that.$refs.m1.triggerUpload(true, this.RadioShowData)
        this.musicCoverUrl = resultres
        // eslint-disable-next-line no-unused-vars
        let res = await this.uploadMusic()
        this.$router.push({ name: 'Music' })
      } catch (err) {
        this.$my_message(err.message)
      }
    },
    progressxx () {
      let that = this
      that.RadioShowData.forEach((e, v) => {
        if (that.RadioShowData[v].progress >= 100) { clearInterval(that.bb[v]) } else {
          that.bb.push(
            setInterval(function () {
              that.RadioShowData[v].progress++
              if (that.RadioShowData[v].progress >= 100) {
                clearInterval(that.bb[v])
              }
            }, 100)
          )
        }
      })
    }
  },
  created () {
    this.RadioData.push(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
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
