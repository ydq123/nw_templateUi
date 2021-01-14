const routes = [{
  path: '/',
  redirect: '/nw_demoPage',
},
{
  path: '/nw_demoPage',
  name: 'nw_demoPage',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_demoPage.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI首页',
  },
},
{
  path: '/nw_checkPerson',
  name: 'nw_checkPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_checkPerson.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI选择人员',
  },
},
{
  path: '/nw_flowView',
  name: 'nw_flowView',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_flowView.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI流程视图',
  },
},
{
  path: '/nw_searchCheckPerson',
  name: 'nw_searchCheckPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_searchCheckPerson.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI搜索人员',
  },
},
{
  path: '/nw_checkUnit',
  name: 'nw_checkUnit',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_checkUnit.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI选择单位',
  },
},
{
  path: '/nw_tz_map',
  name: 'nw_tz_map',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_tz_map.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: '台账选择地图',
  },
},
{
  path: '/nw_checkSubstation',
  name: 'nw_checkSubstation',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_checkSubstation.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: '台账组件',
  },
},
];

export default routes;
