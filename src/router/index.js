import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/success',
    name: 'success',
    component: () => import(/* webpackChunkName: "about" */ '../views/ApplicationSuccess.vue')
  },
  {
    path: '/register-success',
    name: 'registerSuccess',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterSuccess.vue')
  },
  {
    path: '/published',
    name: 'published',
    component: () => import(/* webpackChunkName: "about" */ '../views/PublishedApplications.vue')
  },
  {
    path: '/editorial',
    name: 'editorial',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editorial.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/authority',
    name: 'authority',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authority.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
