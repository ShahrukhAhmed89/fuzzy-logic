import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '../public/base.css';
import '../public/catalog.css';
import '../public/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
