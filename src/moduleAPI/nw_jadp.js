import request from './nw_request.js';
// 请求头
// const myQqt1 = setData.ZS_BASS_URL||'/hiddenDanger'; //隐患-自定义请求头-本地开发写法
// const myQqt1 = 'http://172.16.68.42:80' || '/apiUrl'; //隐患-自定义请求头-本地开发写法
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; //隐患-自定义请求头-本地开发写法
//const myQqt1 = '/'; //操作票-自定义请求头-本地开发写法

// 登录接口
export function sessionHTTP(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/auth/session',
		method: 'post',
		headers: {
			'ctp-t-code': 'dwglpt'
		},
		data: params
	})
}
// 级联查询下级组织
export function cascadingQueryChildOrg(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/personnel/choose/cascadingQueryChildOrg',
		method: 'post',
		headers: {},
		data: params
	})
}
// 根据组织ID，查询直接下级组织[包括扩展属性]
export function queryOrganizationDirectlyChild(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/personnel/orgs/queryOrganizationDirectlyChild',
		method: 'get',
		headers: {},
		params
	})
}
// 查询指定组织的所有上级组织ids，包括指定组织自身
export function getAllSuperOrgIds(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/personnel/choose/getAllSuperOrgIds',
		method: 'get',
		headers: {},
		params
	})
}
// 用户信息列表
export function search(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/personnel/users/search',
		method: 'get',
		headers: {},
		params
	})
}
// 查询全部用户
export function fastQueryUser(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/personnel/choose/fastQueryUser',
		method: 'get',
		headers: {},
		params
	})
}

// 获取配置
export function getAllValue(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/cfg/config/getAllValue?fullcode=' + params.fullcode,
		method: 'get',
		headers: {},
		data: params,
	});
}

//根据recourceString判断登录用户是否拥有相应权限
export function verifyRight(params) {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/permission/func/verifyRight',
		method: 'post',
		data: params
	})
}

//查询用户拥有有权限的应用
export function queryUserFunc() {
	return request({
		baseURL: myQqt1,
		url: '/api/jadp/permission/func/queryUserFunc',
		method: 'get'
	})
}

//获取登录人所属单位
export function getDataDeptInfo(params) {
	return request({
	  baseURL: myQqt1,
	  url: '/gmp/sp/spcommonsservice/spComOrganizationInfo/queryUnitByOrgId',
	  method: 'post',
	  headers: {},
	  data: params
	})
  }
  
  // 查下级单位
  export function getDataNextDeptList(params) {
    return request({
      baseURL: myQqt1,
      url: '/daily/ecmSysOrg/queryLazyChildVOListExcludeShow',
      method: 'post',
      headers: {},
      data: params
    })
  }
  
  // 获取人员
  export function getPersonnel(params) {
    return request({
      baseURL: myQqt1,
      url: '/daily/ecmSysUser/jadpQueryVOListByPage',
      method: 'post',
      headers: {},
      data: params
    })
  }
