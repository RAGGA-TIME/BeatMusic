import Toast from './Toast.vue'
import Vue from 'vue'

let instance

const ToastConstructor = Vue.extend(Toast)

const toast = {
  show (options = {}) {
    instance = new ToastConstructor({
      data: options
    }).$mount()
    instance.visible = false
    // 如果存在loading 不重复创建DOM
    if (document.getElementsByClassName('.BackgroundToast').length) return
    instance.visible = true
    document.body.appendChild(instance.$el)
  },
  hide () {
    instance.visible = false
    document.body.removeChild(instance.$el)
  }
}

export default {
  install () {
    if (!Vue.$my_toast) {
      Vue.$my_toast = toast
    }
    Vue.mixin({
      created () {
        this.$my_toast = Vue.$my_toast
      }
    })
  }
}
