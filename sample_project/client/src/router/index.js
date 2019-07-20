import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import SampleVueFile from '../components/sampleVueFile';

Vue.use (Router);

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'SampleVueFile',
      component: SampleVueFile,
    },
    // {
    //   path: '/samplepage',
    //   name: 'SampleVueFile',
    //   component: SampleVueFile,
    // },
  ],
});
