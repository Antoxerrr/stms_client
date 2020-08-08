import { GET_ACCOUNT } from '@/store/actions.type';
import Vue from 'vue';
import { UPDATE_ACCOUNT } from '@/store/mutations.type';
import { getAccount, setAccount } from '../common/account';

const state = {
  account: getAccount(),
};

const getters = {};

const actions = {
  [GET_ACCOUNT](context) {
    return new Promise(((resolve) => {
      Vue.axios.get('accounts/profile/')
        .then(({ data }) => {
          context.commit(UPDATE_ACCOUNT, data);
          resolve(data);
        });
    }));
  },
};

const mutations = {
  [UPDATE_ACCOUNT](state, account) {
    setAccount(account);
    state.account = account;
  },
};

export default {
  state, actions, mutations, getters,
};
