<template>
  <div class="homefast">
    <home-title :link="'/classify'">快速选择</home-title>
    <div class="fastList">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="item in $store.state.home.fastList"
          :key="item.id"
        >
          <div>
            <div class="fastImgBox">
              <img :src="item.src" alt="" />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper";
Swiper2.use([Navigation, Pagination, Autoplay]);
import HomeTitle from "@/components/comp-hometitle.vue";
let vm = null;
export default {
  name: "swiper-multiple-slides-per-biew",
  components: {
    Swiper,
    SwiperSlide,
    HomeTitle,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 10,
        on: {
          click: function () {
             vm.itemClick(this.clickedIndex);
          },
        },
      },
    };
  },
  methods: {
    itemClick(index) {
        let item = this.$store.state.home.fastList[index];
        this.$router.push({ path: "/search", query: { id: item.id, title: item.name }});
    },
  },
  created(){
      vm = this;
  }
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.homefast {
  margin-top: @margin1;
  background-color: @bgColor2;

  .fastList {
    max-height: 135px;
    padding-bottom: @padding3;
    border-bottom: 1px solid @borderColor1;
  }

  .swiper-slide {
    width: 90px;
  }

  .fastImgBox {
    width: 100%;
    height: 90px;
    border-radius: 2px 2px 0 0;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  span {
    color: @color1;
    font-size: 13px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    padding: @padding1;
    border-left: 1px solid @borderColor1;
    border-right: 1px solid @borderColor1;
    border-bottom: 2px solid @borderColor2;
  }

  .swiper-slide:nth-child(3n-1) span {
    border-bottom: 2px solid yellowgreen;
  }

  .swiper-slide:nth-child(3n) span {
    border-bottom: 2px solid orange;
  }
}
</style>
