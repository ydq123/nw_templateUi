<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    	<keep-alive>
    		<router-view v-if="$route.meta.keepAlive" ></router-view>
    	</keep-alive>
    	<router-view  v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import Button from '@/components/Button/Button'
// import Modal from '@/components/Modal/Modal'
import vConsole from "vconsole";
export default {
  name: "app",
  // components: {
  //   ywButton: Button,
  //   ywModal: Modal,
  // },
  data() {
    return {};
  },
  mounted() {
    // this.vConsole = new vConsole();
  },
  methods: {}
};
</script>

<style lang="less">
  @import "~@/assets/less/all.less";
/* 解决悬浮球导致页面报错 */
html {
  height: 100%;
  box-sizing: border-box;
	touch-action: pan-y;
}

.pt48,
.py48 {
  padding-top: 48px;
}

.pb48,
py48 {
  padding-bottom: 48px;
}

.underline {
  border-bottom: 1px solid #ccc;
}
</style>
