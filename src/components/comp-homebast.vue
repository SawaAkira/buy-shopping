<template>
  <div class="homeBast">
    <home-title :link="'/classify'">精品推荐</home-title>
    <home-banner
      v-if="$store.state.isHomeShow"
      :bannerList="$store.state.home.bastBannerList"
    ></home-banner>
    <home-bastlist></home-bastlist>
  </div>
</template>

<script>
import HomeTitle from "@/components/comp-hometitle.vue";
import HomeBanner from "@/components/comp-homebanner.vue";
import HomeBastlist from "@/components/comp-homebastlist.vue";
export default {
  components: {
    HomeTitle,
    HomeBanner,
    HomeBastlist,
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.homeBast {
  margin-top: @margin1;
    background-color: @bgColor2;
    
  & > div:nth-child(1) {
    margin-bottom: @margin1;
  }
  & > div:nth-child(2) {
    height: 140px;
  }
}
</style>