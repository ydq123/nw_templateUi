<template>
  <div id="app">
    <nw-button @click="show3 = true" size="large">large</nw-button>
    <nw-modal @on-ok="show3 = false" @on-cancel="show3 = false" :width="300" :isShow="show3"></nw-modal>
  </div>
</template>

<script>
// import Button from '@/components/Button/Button'
// import Modal from '@/components/Modal/Modal'
export default {
  name: 'app',
  // components: {
  //   ywButton: Button,
  //   ywModal: Modal,
  // },
  data() {
    return {
      msg: 'Welcome to nw-template-ui',
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      size: ''
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
