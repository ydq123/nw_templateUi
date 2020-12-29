<template>
  <div id="app">
    <router-view></router-view>
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

<style>
/* 解决悬浮球导致页面报错 */
html {
  height: 100%;
  box-sizing: border-box;
	touch-action: pan-y;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-bottom: 200px;
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
