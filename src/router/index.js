import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/demoPage',
  },
  {
    path: '/demoPage',
    name: 'demoPage',
    component: () => import( /* webpackChunkName: "about" */ '../pages/demoPage.vue'),
  },
  {
    path: '/checkPerson',
    name: 'checkPerson',
    component: () => import( /* webpackChunkName: "about" */ '../pages/checkPerson.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
