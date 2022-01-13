<template>
  <div class="homeNews">
    <div class="newsImgBox">
      <img src="../assets/img/news.png" alt="" />
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-item swiper-no-swiping" v-for="item in $store.state.home.newsList" :key="item.id"><span>{{item.name}}</span></swiper-slide>
    </swiper>
    <i class="bi bi-chevron-right"></i>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper";
Swiper2.use([Navigation, Pagination, Autoplay]);
export default {
  name: "swiper-example-vertical",
  title: "Vertical slider",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
    };
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.homeNews {
  display: flex;
  align-items: center;
  padding: 0 @padding3;
  position: relative;
  background-color: @bgColor2;

  .newsImgBox {
    width: 60px;
    height: 15px;
    padding-right: @padding3;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }

    &::after {
      content: "";
      width: 0;
      height: 100%;
      border-left: 1px solid #ccc;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  i {
    font-size: 16px;
    color: @color5;
    position: absolute;
    top: calc(50% - 16px / 2);
    right: @padding3;
  }
  .swiper {
    height: 35px;
    flex: 1;
    padding-left: @padding3;

    .swiper-item {
      display: flex;
      align-items: center;
    }

    span {
      display: block;
      font-size: 13px;
      color: @color3;
    }
  }
}
</style>