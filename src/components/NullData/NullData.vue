<!-- 无数据暂位图 -->
<template>
  <!--   用法  <null-data class="bg-f5">
          <p slot='nullText'>123</p>
        </null-data>-->
  <div class="nullData column al-c ju-c ">
    <slot name="nullImg"><img :src="nullImg" alt="" /></slot>
    <slot name="nullText">
      <p>暂无数据</p>
    </slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nullImg: require('@/assets/images/nullData.png'), //默认暂位图
      };
    },
    name: 'null-data',
    methods: {}
  };
</script>
<style lang="scss" scoped>
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
