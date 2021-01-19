import Vue from 'vue';
// import { Toast, Dialog } from 'ares-ui';
import mdpWorkflow from './mdp.workflow.umd.min';

// Vue.use(Toast);
// Vue.use(Dialog);


// 设置项目业务路径
mdpWorkflow.setBizCommonUtils({
  rootPath: 'gmp',
  projectCode: '/sp',
});


// 设置业务窗体方法
// 业务必须自定义alert、confirm方法
let that = this;
mdpWorkflow.setPopup({
  // 消息提示
  alert({ type, message }) {
    if(type=='correct') {
      that.$toast.success(message);
    }else {
      that.$toast.fail(message);
    }
  },
  // 确认弹框
  confirm(message, callbacks) {
    Dialog.$create({
      type: 'confirm',
      icon: 'aresic-alert',
      title: message || '提示',
      confirmBtn: {
        text: '确定',
        active: true,
        disabled: false,
      },
      cancelBtn: {
        text: '取消',
        active: false,
        disabled: false,
      },
      onConfirm: callbacks.onConfirm,
      onCancel: callbacks.onCancel,
    }).show();
  },
});
// 注册到全局使用
Vue.prototype.$mdpWorkflow = mdpWorkflow;
