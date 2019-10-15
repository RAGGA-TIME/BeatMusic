import Loading from './loading.vue'

Loading.install = function (Vue) {
  Vue.component(Loading.name, Loading) //  组件名称取组件的name
}

export default Loading
