import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VeeValidate from 'vee-validate';
import Toasted from 'vue-toasted';
import './assets/styles/css/v-calendar-custom.css';
import './assets/styles/css/vue2Dropzone.css';
// DemoProject\src\assets\styles\css\vue2Dropzone.css
import VCalendar from 'v-calendar';
import '@/../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
import * as dictionary from './static/dictionary';
Vue.use (VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
});

axios.defaults.baseURL = '/server/';

import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
let toastedoptions = {
  theme: 'bubble',
  duration: 6000,
  singleton: false,
};
Vue.use (Toasted, toastedoptions);
Vue.use (Toasted);

Vue.config.productionTip = false
Vue.use (VeeValidate, {
  locale: 'en',
  fieldsBagName: 'vFields',
  dictionary: dictionary.default.dictionary,
});

Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
