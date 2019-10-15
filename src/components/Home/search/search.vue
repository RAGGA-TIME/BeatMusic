<template>
  <div id="searchDiv" style="position:absolute; z-index:7; top:10.5vh; left:calc(50vw - 65px); height:40px;
  display:flex; justify-content: center; align-items: center;">
      <img id="iconsearch" style="width:23px; height:23px;" src="../../../assets/icons/search.png">
      <div style="margin-top:10px;">
            <input id="searchInput" @click="addline" @keydown.enter="searchSomething" @mouseleave="outline" placeholder="search..."
            placeholder-style="color:#fff;" class="inputx" v-model="searchImage.name" >
            <div id="inputline" style="width:0px; opacity:0; height:1px; background-color:#fff; margin-top:12px; margin-left:-24px;"></div>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      searchImage: {
        listen: 0,
        introduction: '',
        name: '',
        bigurl: 'http://img.ragga-time.com/searchsometing.jpg'
      }
    }
  },
  methods: {
    addline () {
      $('#inputline').animate({
        width: '200px',
        opacity: 1
      }, 'slow')
    },
    outline () {
      $('#inputline').animate({
        width: '0px',
        opacity: 0
      }, 'slow')
    },
    searchSomething () {
      console.log(this.searchImage.name)
      this.$emit('changMoreMusicers', this.searchImage)
    }
  }
}
</script>

<style scoped lang="scss">
$red:255;
$green:255;
$blue:255;
$alpha:0.15;
$percent4:0.4;
$font_family: 'Century Gothic';
.inputx {
    font-family: $font_family;outline: none; font-size:20px; margin-left:30px; font-weight:600;
    background-color:rgba(255,255,255,0); border: none ; height:20px; width:130px; color:#fff;
}

.inputx::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #fff;
}

</style>
