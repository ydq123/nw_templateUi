/* 按钮-混入 */
import {
  NWbaseMinxin,
} from './NWbaseMinxin.js'
import {
  NWvantMixin,
} from './NWvantMixin.js'
import {
  NWmyJsSdkMixin,
} from './NWmyJsSdkMixin.js'
import {
  NWaUiMinxin,
} from './NWaUiMinxin.js'
import {
  NWbpmsMinxin,
} from './NWbpmsMinxin.js'
import {
  NW_templateMixin,
} from './NW_templateMixin.js'
export const NWtabMinxin = {
  mixins: [NWbaseMinxin, NWvantMixin, NWmyJsSdkMixin, NWaUiMinxin, NWbpmsMinxin, NW_templateMixin], //混入公共类
  data() {
    return {
      tabPageData: '',
      tabScreenWidth: document.body.clientWidth, // 屏幕宽
      tabScreeHeight: document.body.clientHeight, //屏幕高度
      tabZzcStatu: false, //遮罩层状态-同时-是否允许底层滑动
    }
  },
  mounted() {
    this.tabPageData = this.$tabPageData(); //接受页面参数
  },
  methods: {
    /*************************************页面内***********************************/
    /* 获取主工程传递的信息*/
    $tabInitDataFun: function(callback, obj = {
      homeName: '', //重置首页路由-单个
      arr: '', //重置首页路由-多个
      pageData: '', //重置主工程传递的参数
    }) {
      var data = {};
      this.tabPageData = obj.pageData || this.$tabPageData();
      if (this.tabPageData.jsonStr) {
        var data = JSON.parse(this.tabPageData.jsonStr); //解析
        if (data.jdapUserInfo) {
          window.accessToken =data.jdapUserInfo.token; //挂载token
          window.NW_ACCESS_TOKEN = data.jdapUserInfo.token; //挂载token
          this.$store.commit("setJdapUserInfo", data.jdapUserInfo); //挂载到全局
          this.$baseSetData('jdapUserInfo', data.jdapUserInfo); //保存当前用户信息
          /* 给工作流组件赋值-当前用户信息 */
          this.$bpmsSetUserInfo(data.jdapUserInfo.userInfo);
        }
        /* 如果一个工程里面存在两个以上的模块的需要重定向本模块入口 */
        if (obj.homeName || obj.arr) {
          var arr = !obj.homeName ? obj.arr : [{
            name: obj.homeName,
            scrollY: 0
          }];
          this.$store.commit('setwxPageUrlObj', {
            keepNameArr: arr,
          });
          window.NW_HOME_NAME = arr[0].name; //项目入口的名称
        }
      }
      callback(data);
    },
    //直接返回当前页的上一页，数据全部消息，是个新页面
    $nwBack(nub, dhType) {
      /* 判断当前使用的是生产与移动的工程模板-页面跳转-就做特殊处理*/
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabBack(nub, dhType);
      } else {
        this.$router.go(nub);
      }
    },
    $tabBack: function(nub, dhType) {
      var keepNameArr = this.$store.getters.pageUrlObj.keepNameArr;
      var keepLeg = this.$store.getters.pageUrlObj.keepNameArr.length;
      this.$store.commit('setPageDataObj', {
        pageSlide: dhType || 'slide-right', //默认后退
      });
      var val = this.$baseIsTypeof(nub); //判断类型number、string、boolean、undefined、null、arr，obj、function
      var pageNub = -1;
      if (val == 'number') {
        //返回上 nub 页
        pageNub = nub;
        var jdzIndex = Math.abs(nub);
        if (keepLeg - jdzIndex - 1 < 0) {
          this.$nwBackHome('');
          return
        } else {
          var winName = keepNameArr[keepLeg - jdzIndex - 1].name;
        }

      } else if (val == 'string') {
        /* keepNameArr */
        var winName = nub;
        var retObj = this.$baseArrExchange(keepNameArr, 'name', winName);
        pageNub = -(keepLeg - 1 - Number(retObj.index));
      } else {
        this.$nwBackHome('');
        return
      }
      this.$store.commit('setPageUrlObj', {
        funType: 'keepBack', //删除缓存页面
        pageNub: pageNub,
      });
      var obj = {
        name: winName,
        params: '$tabBack'
      };
      this.$router.push(obj);
      // this.$router.go(pageNub);
    },
    $nwBackHome: function(winName, dhType) {
      /* window.NW_BASEURL*/
      if (window.NW_BASEURL) {
        this.$sdkCloseWxView(winName); //关闭当前模块
        return
      }
      var homeName = window.NW_HOME_NAME; //项目入口的名称
      if (!homeName) {
        var routes = this.$router.options.routes;
        var retObj = this.$baseArrExchange(routes || [], 'path', '/');
        if (retObj.itme) { //目标页面是否存在
          if (retObj.itme.redirect) {
            // @str 目标字符串 @key 用什么去分割字符串
            var retArr = this.$baseStrSplit(retObj.itme.redirect, '/');
            homeName = retArr[1];
          }
        };
      }
      /* 判断当前使用的是生产与移动的工程模板-页面跳转-就做特殊处理*/
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabBackHome(homeName || 'root_tab', dhType);
      } else {
        var obj = {
          name: homeName || 'nw_demoPage', //项目入口的名称
          params: '$nwBackHome'
        };
        this.$router.push(obj);
      }
    },
    $tabBackHome: function(winName, dhType) {
      this.$store.commit('setPageUrlObj', {
        funType: 'keepBackArr', //删除缓存页面
        pageNub: 0,
        winName: winName || window.NW_HOME_NAME || 'root_tab',
      });
      this.$store.commit('setPageDataObj', {
        pageSlide: 'slide-bottom', //默认前进
      });
      var obj = {
        name: winName || 'root_tab',
        params: '$tabBackHome'
      };
      this.$router.push(obj);
    },
    /* 路由跳转
    to:要去页面的name 或者path
    pageData:要传递的参数
    */
    $nwOpenWin: function(obj, pageData = {}) {
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabOpenWin(obj, pageData);
      } else {
        var retStr = this.$baseIsTypeof(obj);
        if (retStr == 'obj') {
          var {
            winName = '',
              pageData = {},
          } = obj;
        } else if (retStr == 'string') {
          var winName = obj;
        }
        var val = this.$baseIsTypeof(pageData); //判断类型number、string、boolean、undefined、null、arr，obj、function
        if (val == 'number' || val == 'boolean' || val == 'string' || val == 'arr') {
          pageData = {
            $default_dataVal: pageData, //默认值
            $default_dataMsg: '传的参数不是对象，方法自定义一个默认对象',
            $default_dataKeyStatus: true, //表示存在不带key 的参数
          };
        } else if (val == 'null' || val == 'function') {
          pageData = {}; //不传参数
        }
        var status = this.$baseIsIndexOf(winName, '/');
        if (status) {
          var routerObj = {
            path: winName,
            query: pageData
          };
        } else {
          var routerObj = {
            name: winName,
            params: pageData
          };
        }
        this.$router.push(routerObj);
      }
    },
    $tabOpenWin(obj, pageData = {}) {
      var retStr = this.$baseIsTypeof(obj);
      if (retStr == 'obj') {
        var {
          winName = '',
        } = obj;
      } else if (retStr == 'string') {
        var winName = obj;
      };
      /* 记录 */


      this.jcOpenWin(obj, pageData);
    },
    $tabSetkeepName: function(winName, moduleName) {
      this.$store.commit('setPageUrlObj', {
        moduleName: moduleName || this.$route.meta.moduleName,
        winName: winName || this.$route.name,
        type: 'push',
      });
    },
    /* 基础openWin*/
    jcOpenWin: function(obj, pageData = {}) {
      var retStr = this.$baseIsTypeof(obj);
      if (retStr == 'obj') {
        var {
          winName = '',
            pageData = {},
            dhType = pageData.dhType || 'slide-left',
        } = obj;
      } else if (retStr == 'string') {
        var winName = obj;
        var dhType = pageData.dhType || 'slide-left';
      }
      this.$store.commit('setPageDataObj', {
        pageSlide: dhType, //默认前进
      });
      this.$store.commit('setPageUrlObj', {
        funType: 'keepPush', //新增缓存页面
        winName: winName,
      });
      var val = this.$baseIsTypeof(pageData); //判断类型number、string、boolean、undefined、null、arr，obj、function
      if (val == 'number' || val == 'boolean' || val == 'string' || val == 'arr') {
        pageData = {
          $default_dataVal: pageData, //默认值
          $default_dataMsg: '传的参数不是对象，方法自定义一个默认对象',
          $default_dataKeyStatus: true, //表示存在不带key 的参数
        };
      } else if (val == 'null' || val == 'function') {
        pageData = {}; //不传参数
      }
      var status = this.$baseIsIndexOf(winName, '/');
      if (status) {
        var obj = {
          path: winName,
          query: pageData
        };
      } else {
        var obj = {
          name: winName,
          params: pageData
        };
      }
      this.$router.push(obj);
    },
    /*
    接受页面传递过来的参数
    */
    $tabPageData: function(obj) {
      var query = this.$route.query;
      var queryStatus = this.$baseIsEmptyObject(query); //判断是否是空对象

      var params = this.$route.params;
      var paramsStatus = this.$baseIsEmptyObject(params); //判断是否是空对象

      if (!paramsStatus) {
        return params;
      } else if (!queryStatus) {
        return query;
      } else {
        return obj || '';
      }
    },
    $tabClickInit: function() {
      $('body').on('touchstart', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).addClass('click-active');
      });
      $('body').on('touchmove', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('click-active')
      });
      $('body').on('touchend', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('click-active')
      });

      $('body').on('touchstart', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).addClass('btn-active');
      });
      $('body').on('touchmove', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('btn-active')
      });
      $('body').on('touchend', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('btn-active')
      });
    },
    /* 挂载跨页面通讯*/
    $tabOnPageFun: function(funName = 'funName', callback) {
      /* 销毁跨页面通讯*/
      this.$tabOffPageFun([funName]);
      /*跳页面前再挂载-跨页面通讯*/
      this.$across.$on(funName, (obj) => {
        callback(obj);
      });
    },
    /* 触发跨页面通讯*/
    $tabEmitPageFun: function(funName = 'funName', obj, isdlt = false) {
      this.$across.$emit(funName, obj);
      /* 销毁跨页面通讯*/
      if (!isdlt) {
        this.$tabOffPageFun([funName]);
      }
    },
    /* 销毁跨页面通讯*/
    $tabOffPageFun(nameArr) {
      /* 销毁跨页面通讯*/
      for (var i = 0; i < nameArr.length; i++) {
        var funName = nameArr[i];
        this.$across.$off(funName);
      };
    },
    /* 台账-变电 */
    $tabGetTransformBD: function(obj, callback) {
      /* 挂载跨页面通讯*/
      this.$tabOnPageFun(obj.funName || '$nwTzDdFun', (res) => {
        callback(res)
      });
      this.$nwOpenWin('nw_bd_page', {
        isCs: obj.isCs, //是否开启测试
        type: obj.type, //1变电站 2功能位置 3设备-必传
        bureauCode: obj.bureauCode, //局编码，多选以逗号隔开-必传
        vindicateOid: obj.vindicateOid, //运维班组-非必传
        funName: obj.funName || '$nwTzDdFun', //跨页面通信函数名字-必传
      });
    },
    /* 单位选择 */
    $tabNwCheckUnit: function(obj, callback) {
      /* 挂载跨页面通讯*/
      this.$tabOnPageFun(obj.exeMun || 'nwCheckUnitFun', (res) => {
        callback(res)
      });
      this.$nwOpenWin("nw_checkUnit", {
        type: obj.type, //1单选，2多选
        userInfo: obj.userInfo, //用户基本信息
        exeMun: obj.exeMun, //跨页面通讯name
      });
    },
    /* 人员选择*/
    $tabNwCheckPerson: function(obj, callback) {
      /* 挂载跨页面通讯*/
      this.$tabOnPageFun(obj.exeMun || 'nwcheckPersonFun', (res) => {
        callback(res)
      });
      this.$nwOpenWin("nw_checkPerson", {
        type: obj.type, //1：单选； 2：多选； 注：多选需要传：personalList数组为当前页面的人员-必传
        userInfo: obj.userInfo, //用户基本信息-必传
        exeMun: obj.exeMun, //跨页面通讯name-必传
        personalList: obj.personalList || [], //数据复现数据-非必传
        zdyObj: obj.zdyObj || {}, //自定义对象-非必传
      });
    },

  },
  computed: {

  },
  //过滤
  filters: {
    //保留两位小数
    $tabSetNub2: function(value) {
      if (value) {
        var key = Math.pow(10, 2); //10的若干次方
        if (value < 0) {
          var newVal = Math.abs(value); //取绝对值
          return -Math.floor(newVal * key) / key;
        } else if (value == 0) {
          return 0
        } else if (value > 0) {
          return Math.floor(value * key) / key;
        }
      } else {
        return 0;
      };
    },
  },
  watch: {
    tabZzcStatu: function(va1, va2) {
      if (va1) {
        /* 禁止底层滑动*/
        document.getElementsByTagName('body')[0].style.height = '100%';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        /* 允许底层滑动*/
        document.getElementsByTagName('body')[0].style.height = '';
        document.getElementsByTagName('body')[0].style.overflow = '';
      }
    }
  },
}
