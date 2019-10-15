<template>
  <div class="home">
    <MainContext id="MainContext" :propsproperty="{...propsproperty}"/>
  </div>
</template>

<script>
import MainContext from '@/components/Home/MainContext.vue'

export default {
  name: 'Home',
  components: {
    MainContext
  },
  data () {
    return {
      propsproperty: {
        lun_arr: []
      },
      checkIt: []
    }
  },
  async created () {
    await this.findSelect()
    setTimeout(() => {
      $('#firstLoading').fadeOut('slow')
    }, 1500)
  },
  methods: {
    async findSelect () {
      let res = await this.$MusicHttp.FindSelect()
      this.propsproperty.lun_arr = res.data
    }
  }
}

</script>
