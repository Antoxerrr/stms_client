import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Register.vue'),
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
});

export default router;
