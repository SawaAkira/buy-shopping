<template>
  <div class="searchPage" ref="search">
    <div class="searchBox">
      <info-search></info-search>
      <div class="searchNav">
        <router-link
          class="name"
          to="/classify"
          :class="{ active: navName != '默认' }"
          >{{ navName }}</router-link
        >
        <div class="price" @click="priceClick">
          价格<span :class="{ up: price == 1, down: price == 2 }"></span>
        </div>
        <div class="sales" @click="saleseClick">
          销量<span :class="{ up: sales == 1, down: sales == 2 }"></span>
        </div>
        <div class="new" :class="{ active: news == 1 }" @click="newClick">
          新品
        </div>
      </div>
      <search-list v-if="listShow"></search-list>
      <div class="moreLoading" v-if="moreShow" v-html="moreText">
        <span></span>
      </div>
      <span class="loading" v-if="!listShow"></span>
      <span class="defaultTip" v-if="defaultTip"></span>
    </div>
  </div>
</template>


<script>
import InfoSearch from "@/components/comp-infosearch";
import SearchList from "@/components/comp-searchlist";
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      keyword: "",
      sid: "",
      news: 0,
      priceOrder: "",
      salesOrder: "",

      navName: "默认",
      price: 0,
      sales: 0,

      listShow: false,
      defaultTip: false,
      times: 0,
      moreText: "<span></span>正在加载，不要急~",
      searchInfo: "",
      moreShow: false,
    };
  },
  components: {
    InfoSearch,
    SearchList,
  },
  methods: {
    priceClick() {
      this.price++;
      if (this.price >= 3) {
        this.price = 0;
      }
      if (this.price == 0) {
        this.priceOrder = "";
      } else if (this.price == 1) {
        this.priceOrder = "asc";
      } else if (this.price == 2) {
        this.priceOrder = "desc";
      }
      this.page = 1;
      this.getSearchData();
    },
    saleseClick() {
      this.sales++;
      if (this.sales >= 3) {
        this.sales = 0;
      }
      if (this.sales == 0) {
        this.salesOrder = "";
      } else if (this.sales == 1) {
        this.salesOrder = "asc";
      } else if (this.sales == 2) {
        this.salesOrder = "desc";
      }
      this.page = 1;
      this.getSearchData();
    },
    newClick() {
      if (this.news == 0) {
        this.news = 1;
      } else {
        this.news = 0;
      }
      this.page = 1;
      this.getSearchData();
    },
    getSearchData() {
      this.listShow = false;
      this.times = 0;
      this.moreShow = false;
      this.moreText = "<span></span>正在加载，不要急~";
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/products`,
        params: {
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
          sid: this.sid,
          news: this.news,
          priceOrder: this.priceOrder,
          salesOrder: this.salesOrder,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.times++;
          this.listShow = true;
          this.defaultTip = false;
          this.searchInfo = data.data.data;
          this.$store.dispatch("search/setSearchInfoAsync", this.searchInfo);
          if (this.searchInfo.length == 0) {
            this.defaultTip = true;
          }
          if (this.searchInfo.length < this.limit) {
            this.moreShow = false;
          } else {
            this.moreShow = true;
          }
        }
      });
    },
    getMoreData() {
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/products`,
        params: {
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
          sid: this.sid,
          news: this.news,
          priceOrder: this.priceOrder,
          salesOrder: this.salesOrder,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.times++;
          let oldInfo = this.$store.state.search.searchInfo;
          this.searchInfo = [...this.searchInfo, ...data.data.data];
          if (this.searchInfo.length == oldInfo.length) {
            this.moreText = "我是有底线的！！！";
          }
          this.$store.dispatch("search/setSearchInfoAsync", this.searchInfo);
        }
      });
    },
    handleScroll() {
      this.$nextTick(() => {
        if (this.$refs.search) {
          let ch = this.$refs.search.clientHeight;
          let st = this.$refs.search.scrollTop;
          let sh = this.$refs.search.scrollHeight;
          let d = setTimeout(() => {
            if (ch + st == sh) {
              if (
                this.$store.state.search.searchInfo.length >=
                this.times * this.limit
              ) {
                this.page++;
                this.getMoreData();
              } else {
                this.moreText = "我是有底线的！！！";
              }
            }
          }, 300);
        }
      });
    },
  },
  created() {
    if (this.$route.query.w) {
      this.keyword = this.$route.query.w;
    }
    if (this.$route.query.title) {
      this.navName = this.$route.query.title;
    }
    if (this.$route.query.id) {
      this.sid = this.$route.query.id;
    }
    this.getSearchData();
  },
  watch: {
    "$store.state.search.keyword": {
      handler: function (newVal, oldVal) {
        this.keyword = newVal;
        this.getSearchData();
      },
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next();
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.searchPage {
  height: 100%;
  overflow-y: scroll;
}
.searchBox {
  position: relative;
  background-color: @bgColor4;
  min-height: 100%;
  & > div:nth-child(1) {
    padding: 0 @padding3;
  }

  .searchNav {
    display: flex;
    font-size: 14px;
    background-color: @bgColor2;
    box-sizing: border-box;
    border-bottom: 1px solid @borderColor1;

    > div,
    > a {
      flex: 1;
      text-align: center;
      padding: @padding2 0;
    }
  }

  .price,
  .sales {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url(../assets/img/no_light.png) no-repeat 0 0 / cover;
    }

    .up {
      background: url(../assets/img/up_light.png) no-repeat 0 0 / cover;
    }

    .down {
      background: url(../assets/img/down_light.png) no-repeat 0 0 / cover;
    }
  }

  .active {
    color: @color4;
  }

  .loading {
    display: block;
    width: 100px;
    height: 100px;
    background: url(../assets/loader.gif) no-repeat 0 0 / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
  }
  .defaultTip {
    display: block;
    width: 150px;
    height: 150px;
    background: url(../assets/img/cart_default.png) no-repeat 0 0 / cover;
    margin: 30px auto;
  }
  .moreLoading {
    display: flex;
    font-size: 14px;
    justify-content: center;
    color: @color4;
    span {
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url(../assets/loader.gif) no-repeat 0 0 / cover;
    }
  }
}
</style>