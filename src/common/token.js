import Vue from 'vue';

const TOKEN_KEY = 'access_token';

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  window.localStorage.getItem(TOKEN_KEY);
};

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const setHeader = () => {
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
};

export default {
  saveToken, getToken, destroyToken, setHeader,
};
