<template>
  <div class="p0 m0">
    <img src="@/assets/images/fileTypeImg/video.png" />
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      uploaderFun: null,
      startPosition: 0,
      showPreview: false,
      videoPng: `${require("../../assets/images/fileTypeImg/video.png")}`,
      dltPng: `${require("../../assets/images/dlt.png")}`,
      dltPng2: `${require("../../assets/images/dlt.png")}`,
      dltPng3: require("../../assets/images/dlt.png"),
      dltPng4: require("../../assets/images/dlt.png"),
      upFileArr: [],
      lookFileArr: []
    };
  },
  watch: {},
  created() {},
  mounted() {
    // this.lookFileArr = this.lookFileArr2;
    // this.$toast.success('成功文案');
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="less">
.fill_Upimg_list_item {
  position: relative;
  height: 70px;
  width: 70px;
  margin-right: 12px;
  margin-top: 12px;
  /* background-size: cover; */
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px #f9f9f9 solid;

  .pathName {
    width: 69px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 4px 0;
    background: rgba(0, 0, 0, 0.5);

    div {
      width: 90%;
    }
  }

  .pathStatus {
    height: 70px;
    width: 70px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .imgdlt {
    position: absolute;
    right: -6px;
    top: -6px;
    height: 16px;
    width: 16px;
  }
}
</style>
