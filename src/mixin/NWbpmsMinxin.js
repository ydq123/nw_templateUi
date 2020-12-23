/* 工作流-混入 */
import jQuery from 'jquery';
import Vue from 'vue';
// import setData from "@/moduleAPI/setData";
// import {
// 	Toast,
// 	Dialog
// } from 'ares-ui';
import mdpWorkflow from '@/plugin/workFlow/mdp.workflow.umd.min.js';
export const NWbpmsMinxin = {
	data() {
		return {

		}
	},
	mounted() {
		this.$bpmsWorkflowInit('','','');
		// Vue.use(Toast);
		// Vue.use(Dialog);
	},
	methods: {
		$bpmsWorkflowInit: function(jqObj,rootPath,projectCode) {
			window.NW_BPMSIP = window.NW_BASEURL || '/moduleIp'; //设置平台bpms工作流接口ip
			// 设置业务窗体方法
			// 业务必须自定义alert、confirm方法
			mdpWorkflow.setPopup({
				// 消息提示
				alert({
					type,
					message
				}) {
					if(type=='correct') {
						this.$toast.success(message);
					}else {
						this.$toast.fail(message);
					}
				},
				// 确认弹框
				confirm(message, callbacks) {
					this.$msgThenCatch({msg: message, title: '提示'},callbacks.onConfirm,callbacks.onCancel);
				},
			});
			// 注册到全局使用
			Vue.prototype.$mdpWorkflow = mdpWorkflow;
			// 设置项目业务路径
			this.$mdpWorkflow.setBizCommonUtils({
				rootPath: rootPath||'gmp',
				projectCode: projectCode||'/sp',
			});
			this.$bpmsSetUserInfo('');
			this.$mdpWorkflow.init(jqObj||jQuery); //初始化平台工作流
		},
		/* 上报 -选人*/
		$bpmsReportShow: function(obj, callback) {
			// 注册参数回调函数
			this.$bpmsSetOpenWindow();
			/* false显示选人界面  true默认选中第一个不显示选人界面 */
			// this.$bpmsGetData(obj)为组装工作流组件需要的请求参数，
			// callback方法为调用流程接口成功或失败后的回调函数
			this.$mdpWorkflow.operate.report(false, () => this.$bpmsGetData(obj), callback);
		},
		/* 上报 -静默*/
		$bpmsReportHid: function(obj, callback) {
			// 注册参数回调函数
			this.$bpmsSetAutoConfirm();
			this.$mdpWorkflow.operate.report(false, () => this.$bpmsGetData(obj), callback);
		},
		/* 撤回 */
		$bpmsUndo: function(obj, callback) {
			console.log('undo')
			this.$mdpWorkflow.operate.undo(false, () => this.$bpmsGetData(obj), callback);
		},
		/* 回退 */
		$bpmsBack: function(obj, callback) {
			this.$bpmsSetOpenWindow()
			this.$mdpWorkflow.operate.back(false, () => this.$bpmsGetData(obj), callback);
		},
		/* 发送 -选人 */
		$bpmsSendShow: function(obj, callback) {
			this.$mdpWorkflow.operate.send(false, () => this.$bpmsGetData(obj), callback);
		},
		/* 发送 -静默 */
		$bpmsSendHid: function(obj, callback) {
			this.$bpmsSetAutoConfirm();
			this.$mdpWorkflow.operate.send(true, () => this.$bpmsGetData(obj), callback);
		},
		/* 转发 */
		$bpmsReassign: function(obj, callback) {
			this.$bpmsSetOpenWindow()
			this.$mdpWorkflow.operate.reassign(false, () => this.$bpmsGetData(obj), callback);
		},
		$bpmsGetData: function(obj) {
			this.$mdpWorkflow.config.subSystemRoot = obj.bpmsSubSystemRoot;
			return [obj];;
		},
		// 跳转人员选择页面
		$bpmsSetOpenWindow() {
			const that = this;
			this.$mdpWorkflow.extend({
				openBizWfWindow(data, nodeinfolist) {
					console.log(data, 'data');
					console.log(nodeinfolist, 'nodeinfolist');
					// 通过通用页面跳转
					that.$mdpWorkflowSelectPage.show({
						data,
						nodeinfolist,
					});
				},
			});
		},
		/* 静默发送，上报 */
		$bpmsSetAutoConfirm() {
			const that = this;
			this.$mdpWorkflow.extend({
				openBizWfWindow(data, nodeinfolist) {
					console.log(data, 'data');
					console.log(nodeinfolist, 'nodeinfolist');
					// 通过通用页面跳转
					that.$mdpWorkflowSelectPage.autoConfirm(data, nodeinfolist);
				},
			});
		},
		/*动态更新工作流需要的用户信息*/
		$bpmsSetUserInfo: function(ysObj) {
			if (ysObj) {
				var bpmsUuseObj = {};
				bpmsUuseObj.userId = ysObj.userId;
				bpmsUuseObj.userName = ysObj.employeeName;
				bpmsUuseObj.deptId = ysObj.orgId;
				bpmsUuseObj.deptPath = ysObj.orgName;
				var retObj = this.$baseSetData('bpmsUuseObj', bpmsUuseObj); //保存工作流需要的用户信息
			} else {
				var retObj = this.$baseGetData('bpmsUuseObj');
				if (retObj.status) {
					var bpmsUuseObj = retObj.data;
				}
			}
			console.log(retObj.msg)
			Vue.prototype.$mdpWorkflowSelectPage = this.$refs.workflowSelectPage; // 保存跳转人员选择页面的ref
			this.$mdpWorkflow.setBpmsUserInfo(bpmsUuseObj); //动态更新工作流需要的用户信息
		},
		/*回掉函数 */
		// flowOperateCallback:function(ret){
		// 	console.log(22222222222222)
		// 	console.log(ret)
		// }

	}
}
