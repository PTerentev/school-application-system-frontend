import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
    name: 'Authority',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authority.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
