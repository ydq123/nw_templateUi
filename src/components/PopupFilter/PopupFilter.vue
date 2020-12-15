<template>
  <div class="popup-container">
    <div class="popup-wrap"></div>
    <div class="popup-main"></div>
  </div>
</template>

<script>
export default {

}
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
.popup-main {}
}
</style>