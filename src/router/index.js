import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated, isNotAuthenticated } from '@/router/guards';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/stms_client/' : '/',
});

export default router;
