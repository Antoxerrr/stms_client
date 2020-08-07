import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated, isNotAuthenticated } from '@/router/guards';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    beforeEnter: isNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Register.vue'),
    beforeEnter: isNotAuthenticated,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/stms_client/' : '/',
});

export default router;
