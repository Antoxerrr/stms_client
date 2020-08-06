import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { CHECK_AUTH, LOGOUT } from '@/store/actions.type';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(LOGOUT);
    } else {
      console.log(error);
    }
    return error;
  },
);

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.VUE_APP_BACKEND_DOMAIN;

router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
