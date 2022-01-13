<template>
  <div class="user">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.user {
  height: 100%;
  position: relative;
  background-color: @bgColor2;
}
</style>