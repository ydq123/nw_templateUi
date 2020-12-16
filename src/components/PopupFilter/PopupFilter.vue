<template>
  <div class="popup-container" v-show="popupState">
    <div class="popup-wrap" @click="hidePopup"></div>
    <div id="popup" class="popup-main" :style="{width: `${popupWidth}`}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: '80%'
    };
  },
  model: {
    prop: "popupState",
    event: "input"
  },
  props: {
    popupState: {
      type: Boolean,
      default: false
    },
    popupWidth: {
      type: String,
      default: '80%'
    }
  },
  watch: {
    popupState(newval) {
      if(newval) {
        var up = document.getElementById("popup");
        up.classList.add('up_content');
      }
    }
  },
  methods: {
    hidePopup() {
      this.$emit("input", false);
    }
  }
};
</script>

<style scoped lang="scss">
.popup-container {
  .popup-wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2001;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .popup-main {
    top: 0;
    right: 0;
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    z-index: 2004;
    height: 100%;
    transform: translateY(100%);
    transition: transform 2s;
  }
  .up_content{
    transform: translateY(0);
  }
  
}
</style>
