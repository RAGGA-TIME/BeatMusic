<template>
    <div class="radio-container">
      <div style="width: 200px;">
          <mybutton :id="'createRadio'" :forward="'NewRadio'" :name="'Create Radio + '"/>
      </div>
      <div>
        <el-table :data="RadioData" style="margin-top:30px;">
            <el-table-column prop="radio_cover_url" label="Cover">
            <template slot-scope="scope" >
                <img :src="scope.row.radio_cover_url" style="width:12vw; height:12vw;"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name">
            <template slot-scope="scope">
              <span style="font-size:18px; font-weight:bold">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="showNumber" label="ShowNumber">
            <template slot-scope="scope">
              {{scope.row.showNumber}}
            </template>
          </el-table-column>
          <el-table-column label="Operation">
            <template slot-scope="scope">
              <div style="display:flex;">
                <mybutton :id="scope.row._id + 'editRadio'" :forward="'EditRadio'" :clickData="scope.row" :name="'edit'" :typex="'Edit'"/>
                    <mybutton style="margin-left:10px;" :width="'70px'" :id="scope.row._id + 'deleteRadio'"
                    :name="'delete'" :typex="'Delete'" v-on:delete="removeRadio(scope.row._id)"/>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import mybutton from '../../components/Backstage/Button/myButton.vue'
export default {
  components: {
    mybutton
  },
  data () {
    return {
      RadioData: []
    }
  },
  async mounted () {
    this.getMyRadio()
  },
  methods: {
    async getMyRadio () {
      let userId = this.$store.state.userId
      let res = await this.$MusicHttp.GetMyRadio({ userId })
      this.RadioData = res
    },
    async removeRadio (radioId) {
      await this.$MusicHttp.RemoveRadio({ radioId: radioId })
      await this.getMyRadio()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/togerher.scss';

.radio-container {
  padding:50px 30px 30px 50px;
  font-size:20px;
}
</style>
