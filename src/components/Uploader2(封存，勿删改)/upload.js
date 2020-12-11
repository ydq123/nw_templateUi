import {
	downloadAttachmentByAttachmentId,
	getAttchmentByObjId,
	deleteAttachmentById
} from './atm.js'
export default {
		// 附件下载--后端返回文件流格式
		$tabDownloadAttachment(id, callback) {
			let params = {
				attachmentId: id
			};
			downloadAttachmentByAttachmentId(params)
				.then(res => {
					callback(res)
				})
				.catch(err => {
					callback(err);
				});
		},
		// 获取附件列表以及下载列表图片展示在页面
		$tabAttchmentList(params, callback) {
			getAttchmentByObjId(params)
				.then(res => {
					console.log('success');
					callback(res);
				})
				.catch(err => {
					console.log('fail');
					callback(err);
				});
		},
		// 删除附件
		$tabDeleteAttachmentById(params, callback) {
			deleteAttachmentById(params)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(err);
				});
		},
}