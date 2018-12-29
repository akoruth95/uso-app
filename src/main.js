import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import '@babel/polyfill';
import '@fortawesome/fontawesome-free/css/all.css';
import './plugins/logger';
import './plugins/vuetify';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
