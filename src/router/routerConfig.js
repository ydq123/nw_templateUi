const routes = [{
  path: '/',
  redirect: '/nwtemplate/nw_demoPage',
},
{
  path: '/nwtemplate/nw_demoPage',
  name: 'nw_demoPage',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_demoPage.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI首页',
  },
},
{
  path: '/nwtemplate/nw_checkPerson',
  name: 'nw_checkPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_checkPerson.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI选择人员',
  },
},
{
  path: '/nwtemplate/nw_flowView',
  name: 'nw_flowView',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_flowView.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI流程视图',
  },
},
{
  path: '/nwtemplate/nw_searchCheckPerson',
  name: 'nw_searchCheckPerson',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_searchCheckPerson.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI搜索人员',
  },
},
{
  path: '/nwtemplate/nw_checkUnit',
  name: 'nw_checkUnit',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_checkUnit.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: 'nwTemplateUI选择单位',
  },
},
{
  path: '/nwtemplate/nw_tz_map',
  name: 'nw_tz_map',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_tz_map.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: '台账选择地图',
  },
},
{
  path: '/nwtemplate/nw_bd_pd_sd',
  name: 'nw_bd_pd_sd',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_bd_pd_sd.vue'),
  meta: {
  	keepAlive: true,
  	moduleName: 'nwTemplateUI',
  	title: '台账-集合',
  },
},
{
  path: '/nwtemplate/nw_bd_page',
  name: 'nw_bd_page',
  component: () => import( /* webpackChunkName: "about" */ '../pages/nw_bd_page.vue'),
  meta: {
  	keepAlive: false,
  	moduleName: 'nwTemplateUI',
  	title: '台账-itme',
  },
// {
//   path: '/nw_bd_checkSubstation',
//   name: 'nw_bd_checkSubstation',
//   component: () => import( /* webpackChunkName: "about" */ '../pages/nw_bd_checkSubstation.vue'),
//   meta: {
//   	keepAlive: true,
//   	moduleName: 'nwTemplateUI',
//   	title: '变电站',
//   },
// },
// {
//   path: '/nw_bd_functionalLocation',
//   name: 'nw_bd_functionalLocation',
//   component: () => import( /* webpackChunkName: "about" */ '../pages/nw_bd_functionalLocation.vue'),
//   meta: {
//   	keepAlive: true,
//   	moduleName: 'nwTemplateUI',
//   	title: '变电功能位置',
//   },
// },{
//   path: '/nw_bd_equipment',
//   name: 'nw_bd_equipment',
//   component: () => import( /* webpackChunkName: "about" */ '../pages/nw_bd_equipment.vue'),
//   meta: {
//   	keepAlive: false,
//   	moduleName: 'nwTemplateUI',
//   	title: '变电设备',
//   },
},
];

export default routes;
