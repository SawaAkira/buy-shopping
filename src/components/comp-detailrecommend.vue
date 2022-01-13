<template>
  <div class="detailRecommend">
    <div class="title">
      <i class="bi bi-hand-thumbs-up"></i>
      <span><slot>优品推荐</slot></span>
      <i class="bi bi-hand-thumbs-up"></i>
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in $store.state.detail.allInfo.good_list" :key="item.id">
          <router-link class="storeItem" :to="'/detail/'+item.id" @click.native="refresh">
              <div class="imgBox">
                  <img :src="item.image" :onerror="errorImg" alt="">
              </div>
              <p class="text_ellipsis">{{item.store_name}}</p>
              <span>￥{{item.price}}</span>
          </router-link>
    </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper2, {Pagination, Grid } from "swiper";
Swiper2.use([Pagination, Grid]);

export default {
  name: "swiper-loop-group",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      errorImg: 'this.src="' + require('../assets/error.gif') + '"',
      swiperOption: {
        autoHeight: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          fill: "row",
          rows: 2,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  methods: {
      refresh(){
          this.$router.go(0);
      }
  }
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.detailRecommend {
  background-color: @bgColor2;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: @margin2;
  }

  .title>span {
    color: @color4;
    font-size: 15px;
    margin: 0 @margin3;
  }

  .title>i {
    color: @color4;
    font-size: 13px;
  }

  .storeItem{
      display: block;
      overflow: hidden;
      margin-bottom: 8px;
      width: 107.5px;

      .imgBox{
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          height: 107.5px;
          margin-bottom: 3px;
      }

      img{
          width: 100%;
          height: auto;
          display: block;
      }

      >p{
          color: @color1;
          font-size: 13px;
      }

      >span{
          display: block;
          color: @color4;
          font-size: 13px;
      }
  }

  .swiper{
      height: 330px;
  }
}
</style>