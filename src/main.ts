import '@/assets/styles/global.scss'

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

import App from './App.vue'
import { router } from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
