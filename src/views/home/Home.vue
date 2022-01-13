<template>
  <div class="home">
    <home-search v-if="$store.state.isHomeShow"></home-search>
    <home-banner v-if="$store.state.isHomeShow" :bannerList="$store.state.home.bannerList"></home-banner>
    <home-menus v-if="$store.state.isHomeShow"></home-menus>
    <home-news v-if="$store.state.isHomeShow"></home-news>
    <home-fast v-if="$store.state.isHomeShow"></home-fast>
    <home-bast v-if="$store.state.isHomeShow"></home-bast>
    <home-hot v-if="$store.state.isHomeShow"></home-hot>
    <home-benefit v-if="$store.state.isHomeShow"></home-benefit>
    <span class="loading" v-if="!$store.state.isHomeShow"></span>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import { mapState } from "vuex";
import HomeSearch from "@/components/comp-homesearch.vue";
import HomeBanner from "@/components/comp-homebanner.vue";
import HomeMenus from "@/components/comp-homemenus.vue";
import HomeNews from "@/components/comp-homenews.vue";
import HomeFast from "@/components/comp-homefast.vue";
import HomeBast from "@/components/comp-homebast.vue";
import HomeHot from "@/components/comp-homehot.vue";
import HomeBenefit from "@/components/comp-homebenefit.vue";

export default {
  components: {
    HomeSearch,
    HomeBanner,
    HomeMenus,
    HomeNews,
    HomeFast,
    HomeBast,
    HomeHot,
    HomeBenefit,
  },
  computed: {
    ...mapState(["home"]),
  },
  methods: {
    init() {
      let getData = (res) => {
        return new Promise((resolve, reject) => {
          if (res) {
            resolve(res);
          }
        });
      };
      get("http://47.115.51.185/api/index")
        .then((response) => {
          let res = response.data;
          if (res.status == 200) {
            let data = res.data;
            this.$store.dispatch("setHomeShowAsync", true);
            return getData(data);
          }
        })
        .then((data) => {
          let { banner } = data;
          let arr = [];
          banner.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.src = item.pic;
            obj.url = item.url;
            arr.push(obj);
          });
          this.$store.dispatch("home/setBannerAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { menus } = data;
          let arr = [];
          menus.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name =item.name;
            obj.src = item.pic;
            obj.url = item.url;
            arr.push(obj);
          });
          this.$store.dispatch("home/setMenusAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { roll } = data;
          let arr = [];
          roll.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name =item.info;
            obj.url = item.url;
            arr.push(obj);
          });
          this.$store.dispatch("home/setNewsAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { fastList } = data.info;
          let arr = [];
          fastList.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name =item.cate_name;
            obj.src = item.pic;
            arr.push(obj);
          });
          this.$store.dispatch("home/setFastAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { bastBanner } = data.info;
          let arr = [];
          bastBanner.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.src = item.img;
            obj.url = item.wap_link;
            arr.push(obj);
          });
          this.$store.dispatch("home/setBastBannerAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { bastList } = data.info;
          let arr = [];
          bastList.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.src = item.image;
            obj.title = item.store_name;
            obj.price = item.price;
            obj.vip_price = item.vip_price;
            obj.unit = item.unit_name;
            obj.sales = item.sales;
            arr.push(obj);
          });
          this.$store.dispatch("home/setBastListAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { likeInfo } = data;
          let arr = [];
          likeInfo.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.src = item.image;
            obj.title = item.store_name;
            obj.price = item.price;
            arr.push(obj);
          });
          this.$store.dispatch("home/setHotAsync", arr);
          return getData(data);
        })
        .then((data) => {
          let { benefit } = data;
          let arr = [];
          benefit.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.src = item.image;
            obj.title = item.store_name;
            obj.price = item.price;
            obj.ot_price = item.ot_price;
            obj.stock = item.stock;
            obj.unit = item.unit_name;
            arr.push(obj);
          });
          this.$store.dispatch("home/setBenefitAsync", arr);
          return getData(data);
        })
    },
  },
  created() {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next();
  },
};
</script>

<style lang="less">
@import "../../assets/less/variable.less";
.home {
  min-height: 100%;
  position: relative;
  padding-bottom: 60px;
  & > div:nth-child(2) {
    height: 180px;
  }
  & > div:nth-child(3) {
    border-bottom: 1px solid@borderColor1;
  }
  & > div:nth-child(4) {
    border-bottom: 1px solid@borderColor1;
    box-shadow: 0 4px 12px #f5f5f5;
  }
  & > div:nth-child(1),
  & > div:nth-child(5),
  & > div:nth-child(6),
  & > div:nth-child(7),
  & > div:nth-child(8) {
    padding: 0 @padding3;
  }

  .loading{
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../assets/loader.gif) no-repeat 0 0/cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
