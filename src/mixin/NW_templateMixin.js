/* 按钮-混入 */
export const NW_templateMixin = {
  mixins: [], //混入公共类
  data() {
    return {
      tabPageScrollY: 0,
    }
  },
  mounted() {},
  methods: {},
  computed: {

  },
  //过滤
  filters: {},
  watch: {},
  beforeRouteLeave(to, form, next) {
    if (window.NW_MODULE_TYPE != 'scyyd_templateUI') {
      this.tabPageScrollY = document.documentElement.scrollTop || document.body.scrollTop;
    }
    next();
  },
  /* 进入页面前-复原导航条   */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (window.NW_MODULE_TYPE != 'scyyd_templateUI') {
        setTimeout(function() {
          window.scroll(0, vm.tabPageScrollY);
        }, 150)
      }
    });
  },
}
