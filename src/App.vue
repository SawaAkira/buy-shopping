<template>
  <div id="container">
    <router-view></router-view>
    <jump-point v-if="isShow"></jump-point>
    <error-tip v-if="$store.state.isErrorTipShow">{{
      $store.state.errorTip
    }}</error-tip>
  </div>
</template>

<script>
import JumpPoint from "@/components/comp-jumppoint";
import ErrorTip from "@/components/comp-errortip";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    JumpPoint,
    ErrorTip,
  },
  created() {
    console.log("账号：13565659698，密码：admin8899");
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("expires_time")) {
        let date = new Date();
        let expires_time = new Date(localStorage.getItem("expires_time"));
        if (expires_time.getTime() < date.getTime()) {
          localStorage.removeItem("token");
          localStorage.removeItem("expires_time");
          this.$router.go(0);
        } else {
          let token = localStorage.getItem("token");
          this.$store.dispatch("setTokenAsync", token);
        }
      } else {
        localStorage.removeItem("token");
      }
    }
    let d = setTimeout(() => {
      this.isShow = true;
      if (this.isShow) {
        clearTimeout(d);
      }
    }, 100);
  },
};
</script>

<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/less/variable.less";
html,
body {
  height: 100%;
}
#container {
  width: 100%;
  height: 100%;
  max-width: 750px;
  min-width: 300px;
  margin: 0 auto;
  position: relative;
  background-color: @bgColor2;

  & > div:nth-child(2) {
    position: fixed;
    right: 10px;
    top: 80%;
    z-index: 1000;
  }
}
</style>
