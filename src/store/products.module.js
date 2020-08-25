import Vue from 'vue';
import { GET_PRODUCTS, ADD_TO_CART } from '@/store/actions.type';
import {
  UPDATE_PRODUCTS,
  START_LOADING,
  STOP_LOADING,
  UPDATE_CART,
} from '@/store/mutations.type';

const state = {
  products: [],
  cart: [],
};

const getters = {
  PRODS: (state) => state.products,
  CART: (state) => state.cart,
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
  [ADD_TO_CART](context, product) {
    context.commit(UPDATE_CART, product);
  },
};

const mutations = {
  [UPDATE_PRODUCTS](state, products) {
    state.products = products;
  },
  [UPDATE_CART](state, product) {
    state.cart.push(product);
  },
};

export default {
  state, actions, mutations, getters,
};
