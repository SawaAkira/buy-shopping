<template>
  <div class="layout">
    <keep-alive exclude="DomTitle">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">></router-view>
    <!-- 底部tab栏 -->
    <tab-list></tab-list>
  </div>
</template>

<script>
import TabList from "@/components/comp-tablist";
export default {
  components: {
    TabList,
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.layout {
  height: 100%;
  position: relative;
  background-color: @bgColor2;

  & > div:nth-child(2) {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
  }
}
</style>



