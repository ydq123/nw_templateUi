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

export default routes;