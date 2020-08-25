import Vue from 'vue';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from '@/store/actions.type';
import {
  UPDATE_PRODUCTS,
  START_LOADING,
  STOP_LOADING,
  MOVE_TO_CART,
  REMOVE_FROM_CART,
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
    context.commit(MOVE_TO_CART, product);
  },
  [DELETE_FROM_CART](context, index) {
    context.commit(REMOVE_FROM_CART, index);
  },
};

const mutations = {
  [UPDATE_PRODUCTS](state, products) {
    state.products = products;
  },
  [MOVE_TO_CART](state, product) {
    if (state.cart.length) {
      let isProdExists = false;
      state.cart.map((item) => {
        if (item.id === product.id) {
          isProdExists = true;
        }
        return isProdExists;
      });
      if (!isProdExists) {
        state.cart.push(product);
      }
    } else {
      state.cart.push(product);
    }
  },
  [REMOVE_FROM_CART](state, index) {
    state.cart.splice(index, 1);
  },
};

export default {
  state, actions, mutations, getters,
};
