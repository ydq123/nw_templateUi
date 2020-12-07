<template>
  <div id="app">
    <nw-button size="large">large</nw-button>
    <!-- <nw-modal @on-ok="show3 = false" @on-cancel="show3 = false" :width="300" :isShow="show3"></nw-modal> -->
    <!-- <nw-module-top @click="show3 = true" size="large"></nw-module-top> -->
    <nw-uploader :fileInfo="fileInfo" :lookFileArr2="lookFileArr2" :baseUrl="baseUrl"></nw-uploader>
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
    return {
      baseUrl: "http://172.16.68.42:80",
			lookFileArr2: [],
      fileInfo: {},
      msg: "Welcome to nw-template-ui",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      size: "",
			vConsole: null
    };
  },
  mounted() {
		this.vConsole = new vConsole();
		this.fileInfo = {
			jobTypeCode: "SP_SS_HID_RECORD_FIND",
			objId: "8A27048FFC18434EAE5C1727C28BCD51"
		};
  },
  methods: {
    showSize(item) {
      this.size = item;
      this.show4 = true;
    }
  }
};
</script>

<style>
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
