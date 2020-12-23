import request from './request.js';
// 请求头
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; //隐患-自定义请求头-本地开发写法

// 附件上传接口
export function queryAllTrackByProcessInsId(params) {
	return request({
		baseURL: myQqt1,
		url: '/web/trackService/queryAllTrackByProcessInsId',
		method: 'post',
		data: params,
		headers:{
		'ctp-t-code':'sp'
		}
	})
}



