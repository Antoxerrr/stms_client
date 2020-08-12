import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import loading from './loading.module';
import account from './account.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    loading,
    account,
  },
});
