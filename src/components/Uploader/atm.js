
import request from '../../moduleAPI/nw_request.js';
// 请求头
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; 
// 附件上传接口
export function uploader(params) {
	return request({
		baseURL: myQqt1,
		url: '/web/upload/api/top/atm/restClient/uploadAttachmentFile',
		method: 'post',
		data: params
	})
}

// 获取附件列表接口
export function getAttchmentByObjId(params) {
	return request({
		baseURL: myQqt1,
		url: '/web/api/top/atm/restClient/getAttchmentByObjId',
		method: 'post',
		data: params
	})
}

// 根据附件信息查询附件列表
export function queryAttachmentByCondition(params) {
	return request({
		baseURL: myQqt1,
		url: '/web/api/top/atm/restClient/queryAttachmentByCondition',
		method: 'post',
		data: params
	})
}

// 下载附件
export function downloadAttachmentByAttachmentId(params) {
	return request({
		baseURL: myQqt1,
		responseType:"blob",
		url: '/web/api/top/atm/restClient/downloadAttachmentByAttachmentId',
		method: 'post',
		data: params
	})
}

// 删除附件
export function deleteAttachmentById(params) {
	return request({
		baseURL: myQqt1,
		url: '/web/api/top/atm/restClient/deleteAttachmentById',
		method: 'post',
		data: params
	})
}
