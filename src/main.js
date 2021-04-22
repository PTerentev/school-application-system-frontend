import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { http } from '@/api'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

const token = localStorage.getItem('user-token');
if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(undefined, err => new Promise(((resolve, reject) => {
  if (err.response.status === 401 && err.config.method !== 'get') {
    // TODO: logout
  }
  reject(err);
})));