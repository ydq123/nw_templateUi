import request from './nw_request.js';
// 请求头
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; //隐患-自定义请求头-本地开发写法

//变电站
export function querySubstationList(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubstationList',
    method: 'post',
    headers: {},
    data: params
  })
}
/* 查询变电站电压等级*/
export function querySubstationGroupByVoltage(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubstationGroupByVoltage',
    method: 'post',
    headers: {},
    data: params
  })
}

// 获取功能位置接口
export function querySubsIntervalById(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubsIntervalById?substationId=' + params.id,
    method: 'get',
    headers: {},
    data: params
  })
}
/* 根据设备类型分组设备*/
export function groupByDeviceOnClassify(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/groupByDeviceOnClassify',
    method: 'post',
    headers: {},
    data: params
  })
}
/* 设备查询 api/web/transform/queryDeviceList*/
export function queryDeviceList(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/queryDeviceList',
    method: 'post',
    headers: {},
    data: params
  })
}

/* 查询离我最近的变电站 queryNearestSubstation */
export function queryNearestSubstation(params) {
  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/queryNearestSubstation',
    method: 'post',
    headers: {},
    data: params
  })
}
