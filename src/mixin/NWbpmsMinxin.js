/* 工作流-混入 */
import jQuery from 'jquery';
import axiosSdk from '../moduleAPI/nw_request.js';
import Vue from 'vue';
import mdpWorkflow from '../plugin/workFlow/mdp.workflow.umd.min.js';
export const NWbpmsMinxin = {
  data() {
    return {

    }
  },
  mounted() {
    this.$bpmsWorkflowInit('', '', '');//初始化工作流组件
  },
  methods: {
    $bpmsWorkflowInit: function(jqObj, rootPath, projectCode) {
      window.NW_BPMSIP = window.NW_BASEURL || '/moduleIp'; //设置平台bpms工作流接口ip
      // 设置业务窗体方法
      // 业务必须自定义alert、confirm方法
      let that = this;
      mdpWorkflow.setPopup({
        // 消息提示
        alert({
          type,
          message
        }) {
          if (type == 'correct') {
            that.$textThen(message);
          } else {
            that.$textCatch(message);
          }
        },
        // 确认弹框
        confirm(message, callbacks) {
          that.$msgThenCatch({
            msg: message,
            title: '提示'
          }, callbacks.onConfirm, callbacks.onCancel);
        },
      });
      // 注册到全局使用
      Vue.prototype.$mdpWorkflow = mdpWorkflow;
      // 设置项目业务路径
      mdpWorkflow.setBizCommonUtils({
        rootPath: rootPath || 'gmp',
        projectCode: projectCode || '/sp',
      });
      this.$bpmsSetUserInfo('');
      mdpWorkflow.init(jqObj || jQuery,axiosSdk); //初始化平台工作流
    },
    /* 上报 -选人*/
    $bpmsReportShow: function(obj, callback) {
      // 注册参数回调函数
      this.setDataType();
      this.$bpmsSetOpenWindow();
      /* false显示选人界面  true默认选中第一个不显示选人界面 */
      // this.$bpmsGetData(obj)为组装工作流组件需要的请求参数，
      // callback方法为调用流程接口成功或失败后的回调函数
      mdpWorkflow.operate.report(false, () => this.$bpmsGetData(obj), callback);
    },
    /* 上报 -静默*/
    $bpmsReportHid: function(obj, callback) {
      // 注册参数回调函数
      this.setDataType();
      this.$bpmsSetAutoConfirm();
      mdpWorkflow.operate.report(false, () => this.$bpmsGetData(obj), callback);
    },
    /* 撤回 */
    $bpmsUndo: function(obj, callback) {
      console.log('undo')
      this.setDataType();
      mdpWorkflow.operate.undo(false, () => this.$bpmsGetData(obj), callback);
    },
    /* 回退 */
    $bpmsBack: function(obj, callback) {
      this.setDataType();
      this.$bpmsSetOpenWindow()
      mdpWorkflow.operate.back(false, () => this.$bpmsGetData(obj), callback);
    },
    /* 发送 -选人 */
    $bpmsSendShow: function(obj, callback) {
      // 注册参数回调函数
      this.setDataType();
      this.$bpmsSetOpenWindow();
      mdpWorkflow.operate.send(false, () => this.$bpmsGetData(obj), callback);
    },
    /* 发送 -静默 */
    $bpmsSendHid: function(obj, callback) {
      this.setDataType();
      this.$bpmsSetAutoConfirm();
      mdpWorkflow.operate.send(true, () => this.$bpmsGetData(obj), callback);
    },
    /* 转发 */
    $bpmsReassign: function(obj, callback) {
      this.setDataType();
      this.$bpmsSetOpenWindow()
      mdpWorkflow.operate.reassign(false, () => this.$bpmsGetData(obj), callback);
    },
    $bpmsGetData: function(obj) {
      /* 解决有些流程没有用户id问题*/
      var retObj = this.$baseGetData('bpmsUuseObj');
      if (this.$refs.workflowSelectPage) {
        if (this.$refs.workflowSelectPage.orgId) {
          this.$refs.workflowSelectPage.orgId = retObj.orgId;
        }
      } else {
        this.$refs.workflowSelectPage = window.$NW_workflowSelectPage;
        this.$refs.workflowSelectPage.orgId = retObj.orgId;
      }


      mdpWorkflow.config.subSystemRoot = obj.bpmsSubSystemRoot;
      return [obj];;
    },
    // 跳转人员选择页面
    $bpmsSetOpenWindow() {
      var workflowSelectPageObj = this.$refs.workflowSelectPage || window.$NW_workflowSelectPage;
      mdpWorkflow.extend({
        openBizWfWindow(data, nodeinfolist) {
          console.log(data, 'data');
          console.log(nodeinfolist, 'nodeinfolist');
          // 通过通用页面跳转
          workflowSelectPageObj.show({
            data,
            nodeinfolist,
          });
        },
      });
    },
    /* 静默发送，上报 */
    $bpmsSetAutoConfirm() {
      var workflowSelectPageObj = this.$refs.workflowSelectPage || window.$NW_workflowSelectPage;
      mdpWorkflow.extend({
        openBizWfWindow(data, nodeinfolist) {
          console.log(data, 'data');
          console.log(nodeinfolist, 'nodeinfolist');
          // 通过通用页面跳转
          workflowSelectPageObj.autoConfirm(data, nodeinfolist);
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
      // console.log(retObj.msg)
      // Vue.prototype.$mdpWorkflowSelectPage = this.$refs.workflowSelectPage||window.$NW_workflowSelectPage; // 保存跳转人员选择页面的ref
      mdpWorkflow.setBpmsUserInfo(bpmsUuseObj); //动态更新工作流需要的用户信息
    },
    /*处理网络请求数据格式 */
    setDataType: function() {
      mdpWorkflow.resetWorkflowAjaxSettingsByBiz(function(targetAjaxSettings) {
        const callbacks = targetAjaxSettings.success;
        Object.assign(targetAjaxSettings, {
          success: (response) => {
            console.log(7777777)
            console.log(response);
            if (response) {
              if (response.msg) {
                response = response.data;
              }
            }
            console.log(88888)
            console.log(response);
            callbacks(response);
          }
        });
        return targetAjaxSettings;
      })
    }

  }
}
