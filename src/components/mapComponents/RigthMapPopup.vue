<template>
  <div>
    <van-popup
      v-model="currentShowRight"
      position="right"
      style="width: 80%; height: 100%"
    >
      <div class="f14">
        <div class="layer-item layer-theme">
          <div class="title">主题</div>
          <div class="flex">
            <div
              class="item"
              v-for="(item, index) in radios"
              :key="index"
              :class="{ selected: item.isChecked }"
              @click.stop="checkTheme(index, item)"
            >
              <div
                class="theme_img"
                :style="{ 'background-image': 'url(' + item.img + ')' }"
              >
                <div v-if="item.isChecked" class="radio">
                  <span class="radio_ selurl"></span>
                </div>
              </div>
              <div class="name" :class="{ selected: item.isChecked }">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <template>
        <slot name="boxContent"></slot>
      </template>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "RigthMapPopup",
  data() {
    return {
      currentShowRight: false,
      radios: [
        {
          label: "标准地图",
          value: "1",
          key: "standard",
          isChecked: true,
          img: require("../../assets/images/mapImg/layer_pic1.png"),
        },
        {
          label: "影像地图",
          value: "4",
          key: "satellite",
          isChecked: false,
          img: require("../../assets/images/mapImg/layer_pic2.png"),
        },
        {
          label: "栅格地图",
          value: "5",
          key: "raster",
          isChecked: false,
          img: require("../../assets/images/mapImg/layer_pic3.png"),
        },
      ],
    };
  },
  watch: {
 
   
  },
  mounted() {
  
  },
  methods: {
    checkTheme(index, item) {
      // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
      this.$emit('changeThemeStyle',item.key)
     
    },
    changePopup() {
      this.currentShowRight = !this.currentShowRight;
    },
  },
};
</script>

<style lang="less" scoped>
.layer-theme {
  .name {
    margin-top: 5px;
  }
  .theme_img {
    position: relative;
    margin: auto;

    background-repeat: no-repeat;
    background-position: center;

    background-size: cover;
    overflow: hidden;
    margin: 0 calc-size(10);
    height: 62px;
    // border: 2px solid transparent;
    border-radius: 8px;
    img {
      width: 100%;
      max-width: calc-size(6.5 * 16);
    }

    .radio {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 16px;
      line-height: 16px;
      text-align: center;
      background-color: #4784f3;

      span {
        width: 11px;
        height: 9px;
        display: inline-block;
        &.selurl {
          content: url(../../assets/images/mapImg/layer_choose.png);
        }
      }
    }
  }

  .selected .theme_img {
    box-shadow: inset 0 0 0px 2px #4784f3;
  }
}

.layer-item {
  .title {
    padding: 8px 0 8px 15px;
    font-size: calc-size(0.85 * 16);
    font-weight: 600;
    color: #121212;
    text-align: left;
  }

  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #121212;
    background: #fff;
    .item {
      padding: 15px 0;
      width: 28%;
      height: auto;

      &.selected {
        color: #2e67d0;
      }
    }
  }

  .name {
    font-size: calc-size(12);
    // margin-top: 8px;
    text-align: center;
  }

  &.layer-topology {
    .type_img {
      padding: 0 10px;
    }
  }

  &.layer-type {
    .type_img {
      padding: 0 8px;

      img {
        border: 1px solid #ddd;
        border-radius: 8px;
      }
    }
  }
}
</style>
