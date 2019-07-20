import './assets/plugins/font-awesome/css/font-awesome.css';
// import './assets/styles/scss/template.scss';
import './assets/styles/css/bootstrap.min.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';

import BootstrapVue from 'bootstrap-vue';
Vue.use (BootstrapVue);

Vue.use (VueRouter);

let vm = new Vue({
  el: '#app',
  router: router,
  // render: h => h(App),
   template: '<App/>',
   components: {
    App
  },
})

window.app = vm