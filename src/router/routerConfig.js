const routes = [{
  path: '/',
  redirect: '/demoPage',
},
{
  path: '/demoPage',
  name: 'demoPage',
  component: () => import( /* webpackChunkName: "about" */ '../pages/demoPage.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI首页',
  },
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
{
  path: '/searchCheckPerson',
  name: 'searchCheckPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/searchCheckPerson.vue'),
},
{
  path: '/tabSearchPerson',
  name: 'tabSearchPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/tabSearchPerson.vue'),
},
{
  path: '/checkUnit',
  name: 'checkUnit',
  component: () => import( /* webpackChunkName: "about" */ '../pages/checkUnit.vue'),
},
];

export default routes;
