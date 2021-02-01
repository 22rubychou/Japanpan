import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import VueSmoothScroll from 'vue2-smooth-scroll'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCarousel from 'vue-carousel'
import App from './App.vue'
import router from './router'
import store from './store'

import { faHeart, faTrashAlt, faShoppingCart, faCartPlus, faEdit, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faHeart, faTrashAlt, faShoppingCart, faCartPlus, faEdit, faSearchPlus)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.component('ImgInputer', ImgInputer)
Vue.use(VueSmoothScroll)
Vue.use(VueFormWizard)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueI18n)
Vue.component('Loading', Loading)
Vue.use(VueSweetalert2)
Vue.use(VueCarousel)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
})

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  router,
  store,
  i18n,
  created () {
    AOS.init({
      duration: 1000,
      easing: 'ease-in'
    })
  },
  render: h => h(App)
}).$mount('#app')
