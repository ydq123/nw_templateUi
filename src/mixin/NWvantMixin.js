/* 按钮-混入 */
export const NWvantMixin = {
  data() {
    return {

    }
  },
  methods: {
    /*************************************有赞轻提示框***********************************/
    $textShow: function(obj, callback = '') {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          text = '暂无数据', time = 2000, icon = '', overlay = false, forbidClick = true
        } = obj;
      } else {
        var newObj = {
          text: obj || '暂无数据',
        };
        var {
          text = '暂无数据', time = 2000, icon = '', overlay = false, forbidClick = true
        } = newObj;
      };
      return this.$toast({
        message: text, //文案
        icon: icon, //图片地址，ico-Name均可
        duration: time, //时长
        type: 'html', //纯文案
        overlay: overlay, //是否显示背景遮罩层
        forbidClick: forbidClick, //是否禁止背景点击
        onClose: callback, //关闭时的回调函数
      });
    },
    $textHid: function(el) {
      if (el) {
        el.clear(); //主动关闭提示框
      } else {
        this.$toast.clear(); //主动关闭提示框
      }
    },
    //成功提示框
    $textThen: function(obj, callback = '') {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          text = '上传成功', time = 2000, icon = '', overlay = false, forbidClick = true
        } = obj;
      } else {
        var newObj = {
          text: obj || '上传成功',
        };
        var {
          text = '上传成功', time = 2000, icon = '', overlay = false, forbidClick = true
        } = newObj;
      };
      return this.$toast({
        message: text, //文案
        icon: icon, //图片地址，ico-Name均可
        duration: time, //时长
        type: 'success', //类型-成功，
        overlay: overlay, //是否显示背景遮罩层
        forbidClick: forbidClick, //是否禁止背景点击
        onClose: callback, //关闭时的回调函数
      });
    },
    //失败提示框
    $textCatch: function(obj, callback = '') {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          text = '服务异常', time = 2000, icon = '', overlay = false, forbidClick = true
        } = obj;
      } else {
        var newObj = {
          text: obj || '服务异常',
        };
        var {
          text = '服务异常', time = 2000, icon = '', overlay = false, forbidClick = true
        } = newObj;
      };
      return this.$toast({
        message: text, //文案
        icon: icon, //图片地址，ico-Name均可
        duration: time, //时长
        type: 'fail', //类型-失败
        overlay: overlay, //是否显示背景遮罩层
        forbidClick: forbidClick, //是否禁止背景点击
        onClose: callback, //关闭时的回调函数
      });
    },
    //加载提示框
    $textLoading: function(obj) {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          text = '加载中...', time = 0, icon = '', overlay = false, forbidClick = true, loadingType = 'circular'
        } = obj;
      } else {
        var newObj = {
          text: obj || '加载中...',
        };
        var {
          text = '加载中...', time = 0, icon = '', overlay = false, forbidClick = true, loadingType = 'circular'
        } = newObj;
      };
      return this.$toast({
        message: text, //文案
        icon: icon, //图片地址，ico-Name均可
        duration: time, //时长
        loadingType: loadingType, //加载图标类型, 可选值为 circular或spinner
        type: 'loading', //类型-加载提示框
        overlay: overlay, //是否显示背景遮罩层
        forbidClick: forbidClick, //是否禁止背景点击
      });
    },
    //动态更新提示 倒计时
    $textSetTime: function(callback, time) {
      var text = '倒计时 ' + time + ' 秒';
      const toastObj = this.$textLoading(text);
      var second = time;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toastObj.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          toastObj.clear();
          callback(true)
        }
      }, 1000);
    },
    /* ****************************************指定挂载的节点 *******************************************************/
    //加载提示框
    textLoading: function(callback, obj) {
      var {
        text = '加载中...', time = 0, icon = '', overlay = false, forbidClick = true, loadingType = 'circular'
      } = obj;
      //console.log(overlay);
      var textObj = this.$textLoading(text, time, icon, overlay, forbidClick, loadingType);
      callback(textObj)
    },
    /* 消息确认弹框*/
    $msgThenCatch: function(obj, callback1 = '', callback2 = () => {}) {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          title = '提示', msg = '', thenText = '确定', catchText = '取消', showNo = true,yesColor="#287df5"
        } = obj;
      } else {
        var newObj = {
          msg: obj || '参数异常',
        };
        var {
          title = '提示', msg = '', thenText = '确定', catchText = '取消', showNo = true,yesColor="#287df5"
        } = newObj;
      };
      var msgType = this.$baseIsTypeof(msg);
      this.$dialog.confirm({
        confirmButtonColor:yesColor,//确认按钮颜色
        title: title, //标题
        message: msgType == 'obj' ? JSON.stringify(msg) : msg, //文案
        confirmButtonText: thenText, //确认按钮文案
        showCancelButton: showNo, //是否显示取消文案
        cancelButtonText: catchText
      }).then(callback1).catch(callback2);
    },
  }
}
