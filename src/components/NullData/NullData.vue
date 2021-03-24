<!-- 无数据暂位图 -->
  <!--   用法  <null-data class="bg-f5">
    <p slot='nullText'>123</p>
  </null-data>-->
<template>
  <div class="nullData column al-c ju-c ">
    <slot name="nullImg"><img :src="nullImg" alt="" /></slot>
    <p>{{nullText}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // nullImg: require('../../assets/images/nullData2.png'), //默认暂位图
      };
    },
    props: {
      customState: {
        type: String,
        default: ''
      },
      nullText: {
        type: String,
        default: '暂无数据'
      }
    },
    computed: {
      nullImg() {
        if(!this.customState) {
          return require('../../assets/images/nullData2.png')
        }else if(this.customState == '404') {
          return require('../../assets/images/404.png')
        }else if(this.customState == '500') {
          return require('../../assets/images/500.png')
        }else if(this.customState == 'error') {
          return require('../../assets/images/error.png')
        }
      }
    },
    name: 'null-data',
    methods: {}
  };
</script>
<style lang="less" scoped>
  .nullData {
    // height: 100%;
    text-align: center;
    color: #b5b5b5;
    font-size: 15px;

    img {
      width: 150px;
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
</style>
