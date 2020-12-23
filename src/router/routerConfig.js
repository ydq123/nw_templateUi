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
{
  path: '/flowView',
  name: 'flowView',
  component: () => import( /* webpackChunkName: "about" */ '../pages/flowView.vue'),
},
];

export default routes;