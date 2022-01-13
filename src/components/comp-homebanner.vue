<template>
  <swiper class="swiper homeBanner" :options="swiperOption" v-if="showSwiper">
    <swiper-slide v-for="item in bannerList" :key="item.id">
      <router-link :to="getLink(item)">
        <img :src="item.src" alt="">
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/swiper-bundle.css';
  import Swiper2, {Navigation, Pagination, Autoplay} from 'swiper';
  Swiper2.use([Navigation, Pagination, Autoplay]);
  export default {
    name: 'swiper-banner',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          loop : true,
          initialSlide :0,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        }
      }
    },
    props: ['bannerList'],
    computed: {
      showSwiper(){
        return this.bannerList.length
      }
    },
    methods: {
      getLink(val){
        let str = val.url;
        let res = "detail/"+ str.slice(str.lastIndexOf("/") + 1);
        return res
      }
    }
  }
</script>

<style lang="less">
@import "../assets/less/variable.less";
.homeBanner{
background-color: @bgColor2;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .swiper-pagination{
    bottom: 0;
  }

  .swiper-pagination-bullet{
    width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 25px));
    height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 4px));
    border-radius: 4px;
  }
}
</style>