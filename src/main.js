import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { http } from '@/api'
import moment from 'moment'
  
Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

document.title = "Система жалоб и предложений";

const token = localStorage.getItem('user-token');
if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(undefined, err => new Promise(((resolve, reject) => {
  if (err.response.status === 401) {
    router.push({ name: 'home' }).catch(() => {});
  }
  reject(err);
})));