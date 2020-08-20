import Vue from 'vue';
import { GET_PRODUCTS } from '@/store/actions.type';
import {
  UPDATE_PRODUCTS,
  START_LOADING,
  STOP_LOADING,
} from '@/store/mutations.type';

const state = {
  products: [],
};

const getters = {
  PRODS: (state) => state.products,
};

const actions = {
  [GET_PRODUCTS](context) {
    context.commit(START_LOADING);
    return new Promise(((resolve) => {
      Vue.axios.get('/products')
        .then((products) => {
          context.commit(UPDATE_PRODUCTS, products.data);
          resolve(products.data);
          context.commit(STOP_LOADING);
        })
        .catch((error) => {
          console.log(error);
          context.commit(STOP_LOADING);
          return error;
        });
    }));
  },
};

const mutations = {
  [UPDATE_PRODUCTS](state, products) {
    state.products = products;
  },
};

export default {
  state, actions, mutations, getters,
};
