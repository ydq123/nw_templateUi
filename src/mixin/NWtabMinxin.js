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
    //直接返回当前页的上一页，数据全部消息，是个新页面
    $nwBack(nub) {
      this.$tabBack(nub);
    },
    $tabBack: function(nub) {
      this.$router.go(nub);
    },
    $nwBackHome: function(winName) {
      var homeName = window.NW_HOME_NAME || winName; //项目入口的名称
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
      this.$tabBackHome(homeName || 'root_tab');
    },
    $tabBackHome: function(winName) {
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
      this.$tabOpenWin(obj, pageData);
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
    $nwPageData: function() {
      return this.$tabPageData();
    },
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
    $tabOnPageFun: function(funName, callback) {
      /* 销毁跨页面通讯*/
      this.$tabOffPageFun([funName]);
      /*跳页面前再挂载-跨页面通讯*/
      this.$across.$on(funName, (obj) => {
        callback(obj);
      });
    },
    /* 触发跨页面通讯*/
    $tabEmitPageFun: function(funName, obj) {
      this.$across.$emit(funName, obj);
    },
    /* 销毁跨页面通讯*/
    $tabOffPageFun(Things) {
      /* 销毁跨页面通讯*/
      for (var i = 0; i < Things.length; i++) {
        var funName = Things[i];
        this.$across.$off(funName);
      };
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
