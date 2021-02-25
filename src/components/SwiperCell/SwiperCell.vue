<template>
  <div class="swiperCell">
    <van-swipe-cell>
      <slot name="cell-content">左滑删除默认内容</slot>
      <template #right>
        <van-button
          @click="emitClickHandle(item.clickHandle, item)"
          class="delete-button"
          v-for="(item, index) in btnList"
          :key="index"
          square
          :text="item.text"
          :color="item.color"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "swiperCell",
  data() {
    return {};
  },
  props: {
    btnList: {
      type: Array,
      default: () => [
        {
          color: "#1E87F0",
          text: "操作",
          clickHandle: "aa",
        },
        {
          color: "#ED2C19",
          text: "删除",
          clickHandle: "delete",
        }
      ]
    }
  },
  methods: {
    emitClickHandle(handleName, data) {
      this.$across.$emit(handleName, data);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.swiperCell {
  .delete-button {
    height: 100%;
  }
}
</style>
