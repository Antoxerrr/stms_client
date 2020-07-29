import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.BACKEND_DOMAIN;

Vue.use(Vuelidate);

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
