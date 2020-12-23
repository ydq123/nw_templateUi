import request from './request.js';
// 请求头
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; //隐患-自定义请求头-本地开发写法



// 示列
export function queryTodoDefectListPagination(params) {
  return request({
    baseURL: myQqt1,
    url: '/gmp/sp/operationmaintenaceservice/defect/queryTodoDefectListPagination',
    method: 'post',
    headers: {},
    data: params
  })
}
