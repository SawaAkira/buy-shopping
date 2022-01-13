<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item,index) in $store.state.detail.storeInfo.slider_image" :key="index">
        <img :src="item" :onerror="errorImg" alt="">
    </swiper-slide>
    <div class="imgIndex">{{index+1}}/{{$store.state.detail.storeInfo.slider_image.length}}</div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper2, { EffectFade } from "swiper";
Swiper2.use([EffectFade]);
let vm = null;

export default {
  name: "swiper-fade-effect",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      errorImg: 'this.src="' + require('../assets/error.gif') + '"',
      index: 0,
      swiperOption: {
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        on: {
          slideChange: function () {
            vm.getIndex(this.realIndex);
          },
        },
      },
    };
  },
  methods: {
      getIndex(index){
          this.index = index;
      }
  },
  created() {
    vm = this;
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.swiper {
  height: 375px;

  .swiper-slide {
      img{
          width: 100%;
          height: 100%;
      }
  }

  .imgIndex{
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 14px;
      z-index: 50;
      background-color: @bgColor2;
      color: @color4;
      border: 1px solid @borderColor2; 
      box-sizing: border-box;
      border-radius: 3px;
      padding: 0 @padding1;
  }
}
</style>