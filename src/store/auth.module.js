import { CHECK_AUTH, LOGIN, LOGOUT } from '@/store/actions.type';
import Vue from 'vue';
import { PURGE_AUTH, SET_AUTH, SET_ERROR } from '@/store/mutations.type';
import {
  destroyToken, getToken, saveToken, setHeader,
} from '@/common/token';
import router from '@/router';

const state = {
  user: {},
  isAuthenticated: !!getToken(),
  wrongCredentials: false,
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      Vue.axios.post('token/', credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    router.push({ name: 'Auth' });
  },
};

const mutations = {
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.wrongCredentials = false;
    state.user = {};
    saveToken(data.access);
  },
  [SET_ERROR](state, response) {
    if (response.status === 401) {
      state.wrongCredentials = true;
      state.isAuthenticated = false;
      state.user = {};
    }
  },
  [PURGE_AUTH](state) {
    state.user = {};
    state.isAuthenticated = false;
    state.wrongCredentials = false;
    destroyToken();
  },
  [CHECK_AUTH](context) {
    if (getToken()) {
      setHeader();
    } else {
      context.commit(PURGE_AUTH);
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
