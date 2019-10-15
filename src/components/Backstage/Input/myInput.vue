<template>
  <div>
      <div @click="wakeUpInput" :class="getIt ? 'inputContainerChange' : 'inputContainer'" :style="{ width: inputWidthx }">

        <input :id="idx" v-model="datax" v-on:input="changeStyle" @blur="he" @focus="ha" :type="type"
        class="realInput" :style="{ width: realWidth }" v-show="showRealInput" @keyup.enter="commit">

        <div :class="getIt ? 'myinputChange' : 'myinput' " >{{namex}}</div>

        </div>
  </div>
</template>

<script>
export default {
  name: 'myInput',
  props: {
    inputData: String,
    type: { type: String, default: 'text' },
    id: { type: String, default: 'inputx' },
    name: { type: String, default: 'myInput' },
    inputWidth: { type: String, default: '200px' },
    realWidth: { type: String, default: '200px' }
  },
  data () {
    return {
      getIt: false,
      datax: this.inputData,
      inputWidthx: this.inputWidth,
      realWidthx: this.realWidth,
      showRealInput: false,
      namex: this.name,
      idx: this.id /* + Math.floor(Math.random() * 1000) */
    }
  },
  mounted () {
    if (this.datax !== '') { this.wakeUpInput() }
  },
  methods: {
    wakeUpInput () {
      this.showRealInput = true
      this.getIt = true
      let that = this
      setTimeout(function () {
        $(`#${that.idx}`).focus()
      }, 100)
    },
    changeStyle () {
      this.$emit('getInput', this.datax, this.idx)
    },
    ha () { },
    he () {
      if (this.datax == null || this.datax === '') {
        this.getIt = false
        this.showRealInput = false
      }
      this.$emit('loseFocus')
    },
    InputRules () {

    },
    commit () {
      console.log('提交了')
    }
  }

}
</script>

<style>
.inputContainer {
text-align:left; background-color:#fff; border-radius:8px; width:200px; transition: all .5s;
      border: 1.4px solid rgb(226,224,227);  font-weight:bold; color:rgb(95,95,95); padding:15px 75px 15px 25px;
}

.inputContainerChange {
text-align:left; background-color:#fff; border-radius:8px; width:200px; transition: all .5s;
      border: 1.4px solid rgb(95,95,95);  font-weight:bold; color:rgb(55,55,55); padding:15px 75px 15px 25px;
}

.myinput {
background-color:#fff; position:relative; top:0px; left:0px; transition: all .5s;display:inline; padding-right:50px;
}

.myinputChange {
background-color:#fff; position:relative; top:-28px; left:-15px; font-size:15px;
        display:inline; padding-left:12px; padding-right:12px;  transition: all .5s;
}

.realInput {
  position:absolute; outline:none; border: none; font-size:20px;
}

</style>
