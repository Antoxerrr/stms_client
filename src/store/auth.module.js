import { LOGIN, LOGOUT, REGISTER } from '@/store/actions.type';
import Vue from 'vue';
import {
  PURGE_AUTH, SET_AUTH, SET_ERROR,
  START_LOADING, STOP_LOADING,
} from '@/store/mutations.type';
import {
  destroyToken, getToken, saveToken,
} from '@/common/token';

const state = {
  user: {},
  isAuthenticated: !!getToken(),
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    context.commit(START_LOADING);
    return new Promise((resolve, reject) => {
      Vue.axios.post('token/', credentials)
        .then((response) => {
          context.commit(SET_AUTH, response.data);
          resolve(response);
          context.commit(STOP_LOADING);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error.response);
          reject(error.response.status);
          context.commit(STOP_LOADING);
        });
    });
  },
  [REGISTER](context, data) {
    context.commit(START_LOADING);
    return new Promise((resolve, reject) => {
      Vue.axios.post('accounts/register/', data)
        .then(() => {
          resolve();
          context.commit(STOP_LOADING);
        })
        .catch((error) => {
          reject(error);
          context.commit(STOP_LOADING);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
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
      state.isAuthenticated = false;
      state.user = {};
    }
  },
  [PURGE_AUTH](state) {
    state.account = {};
    state.isAuthenticated = false;
    state.wrongCredentials = false;
    destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
