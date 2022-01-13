<template>
  <div class="detail" ref="detail">
    <div class="detailBox">
      <detail-banner v-if="storeInfo" id="detail1"></detail-banner>
      <detail-info v-if="storeInfo"></detail-info>
      <template v-if="storeInfo">
        <div
          class="userChoose"
          @click="userChoose(true)"
          v-show="
            JSON.stringify($store.state.detail.allInfo.productValue) != '[]'
          "
        >
          <div class="chose">
            已选择：<span>{{ chose }}</span>
          </div>
          <i class="bi bi-chevron-right"></i>
        </div>
      </template>
      <div class="userScore" v-if="storeInfo" id="detail2">
        <div class="scoreNum">
          用户评价({{ $store.state.detail.allInfo.replyCount }})
        </div>
        <div class="praise">
          <span>{{ $store.state.detail.allInfo.replyChance }}%</span>好评率<i
            class="bi bi-chevron-right"
          ></i>
        </div>
      </div>
      <detail-recommend v-if="storeInfo" id="detail3"></detail-recommend>
      <detail-introduce v-if="storeInfo" id="detail4"></detail-introduce>
      <div class="storeNav" :style="'opacity:' + opacity" v-if="navShow">
        <span
          :class="{ active: navIndex == 0 }"
          @click="
            navIndex = 0;
            clickTo(navIndex);
          "
          >商品</span
        >
        <span
          :class="{ active: navIndex == 1 }"
          @click="
            navIndex = 1;
            clickTo(navIndex);
          "
          >评价</span
        >
        <span
          :class="{ active: navIndex == 2 }"
          @click="
            navIndex = 2;
            clickTo(navIndex);
          "
          >推荐</span
        >
        <span
          :class="{ active: navIndex == 3 }"
          @click="
            navIndex = 3;
            clickTo(navIndex);
          "
          >详情</span
        >
      </div>
      <div
        class="mask"
        v-if="$store.state.isDetailMaskShow"
        @click.self="userChoose(false)"
      >
        <detail-choose></detail-choose>
      </div>
      <detail-bottom v-if="storeInfo" id="detail4"></detail-bottom>
      <span class="loading" v-if="!storeInfo"></span>
    </div>
  </div>
</template>

<script>
import DetailBanner from "@/components/comp-detailbanner.vue";
import DetailInfo from "@/components/comp-detailinfo.vue";
import DetailRecommend from "@/components/comp-detailrecommend.vue";
import DetailIntroduce from "@/components/comp-detailintroduce.vue";
import DetailBottom from "@/components/comp-detailbottom.vue";
import DetailChoose from "@/components/comp-detailchoose.vue";
export default {
  data() {
    return {
      storeId: 0,
      storeInfo: "",
      navIndex: 0,
      opacity: 0,
      navShow: false,
      chose: "",
      choseShow: false,
      unique: "",
    };
  },
  components: {
    DetailBanner,
    DetailInfo,
    DetailRecommend,
    DetailIntroduce,
    DetailBottom,
    DetailChoose,
  },
  methods: {
    init() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/product/detail/` + this.storeId,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.storeInfo = data.data.data.storeInfo;
          let allInfo = data.data.data;
          if (data.data.data.productValue.length != 0) {
            let arr = data.data.data.productAttr;
            let chooseArr = [];
            arr.forEach((item) => {
              chooseArr.push(item.attr_values[0]);
              item.attr_value[0].check = true;
            });
            allInfo.productAttr = arr;
            let obj = data.data.data.productValue;
            this.chose = chooseArr.join(",");
            if (obj[chooseArr.join(",")]) {
              this.unique = obj[chooseArr.join(",")].unique;
            } else {
              this.unique = 0;
            }
            this.$store.dispatch("detail/setUniqueAsync", this.unique);
          }
          this.$store.dispatch("detail/setAllInfoAsync", allInfo);
          this.$store.dispatch("detail/setStoreInfoAsync", this.storeInfo);
          document.title = this.$store.state.detail.storeInfo.store_name;
        }
      });
    },
    userChoose(val) {
      this.$store.dispatch("setDetailMaskShowAsync", val);
      this.$store.dispatch("detail/setIsChooseAsync", val);
    },
    errorTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
          this.$router.push("/");
        }
      }, 1500);
    },
    handleScroll() {
      this.$nextTick(() => {
        if (document.querySelector("#detail1") != null) {
          let st = 0;
          if(this.$refs.detail){
            st = this.$refs.detail.scrollTop;
          }
          let ot4 = document.querySelector("#detail4").offsetTop;
          let ot2 = document.querySelector("#detail2").offsetTop;
          let ot3 = document.querySelector("#detail3").offsetTop;
          if (st == 0) {
            this.navShow = false;
          } else {
            this.navShow = true;
          }
          if (st <= 200) {
            this.opacity = st / 200;
          } else {
            this.opacity = 1;
          }

          if (st < ot2 - 51) {
            this.navIndex = 0;
          } else if (st >= ot2 - 51 && st < ot3 - 51) {
            this.navIndex = 1;
          } else if (st >= ot3 - 51 && st < ot4 - 51) {
            this.navIndex = 2;
          } else if (st >= ot4 - 51) {
            this.navIndex = 3;
          }
        }
      });
    },
    clickTo(index) {
      if (document.querySelector("#detail" + (index + 1)).offsetTop) {
        this.$refs.detail.scrollTop =
          document.querySelector("#detail" + (index + 1)).offsetTop - 51;
      } else {
        this.$refs.detail.scrollTop = document.querySelector(
          "#detail" + (index + 1)
        ).offsetTop;
      }
    },
  },
  watch: {
    unique(val) {
      let obj = this.$store.state.detail.allInfo.productValue;
      for (let key in obj) {
        if (obj[key].unique == val) {
          this.chose = key;
        }
      }
    },
    "$store.state.detail.allInfo.productAttr": {
      handler(newVal, oldVal) {
        if (this.$store.state.detail.allInfo.productAttr.length) {
          let arr = this.$store.state.detail.allInfo.productAttr;
          let chooseArr = [];
          arr.forEach((item) => {
            item.attr_value.forEach((citems) => {
              if (citems.check) {
                chooseArr.push(citems.attr);
              }
            });
          });
          let obj = this.$store.state.detail.allInfo.productValue;
          this.chose = chooseArr.join(",");
          if (obj[chooseArr.join(",")]) {
            this.unique = obj[chooseArr.join(",")].unique;
          } else {
            this.unique = 0;
          }
          this.$store.dispatch("detail/setUniqueAsync", this.unique);
        }
      },
      deep: true,
    },
  },
  created() {
    this.storeId = this.$route.params.id;
    this.init();
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  beforeRouteLeave(to, from, next){
    this.$store.dispatch("detail/setUniqueAsync", "");
    next();
  }
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.detail{
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.detailBox {
  min-height: 100%;
  background-color: @bgColor4;
  position: relative;
  & > div:nth-child(2) {
    padding: @padding2 @padding3;
  }
  & > div:nth-child(3) {
    padding: @padding2 @padding3;
    margin-top: @margin2;
  }
  & > div:nth-child(4) {
    padding: @padding2 @padding3;
    margin-top: @margin2;
  }

  & > div:nth-child(5) {
    padding: @padding2 @padding3 0;
    margin-top: @margin2;
  }

  & > div:nth-child(6) {
    margin-top: @margin2;
    margin-bottom: 50px;
  }

  & > div:last-child {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 50;
  }

  .storeNav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 15px;
    background-color: @bgColor2;
    box-sizing: border-box;
    border-bottom: 1px solid @borderColor1;

    span {
      width: 70px;
      text-align: center;
      padding: @padding3 0;
      position: relative;
    }

    span.active::after {
      content: "";
      display: block;
      width: 50%;
      height: 0;
      border-bottom: 3px solid @color4;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .userChoose {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background-color: @bgColor2;

    .chose {
      color: @color7;

      span {
        color: @color1;
      }
    }

    i {
      color: @color7;
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  .userScore {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background-color: @bgColor2;

    .scoreNum {
      color: @color1;
    }

    .praise {
      color: @color7;
    }

    span {
      color: @color4;
      margin-right: 3px;
    }

    i {
      margin-left: 3px;
    }
  }
  .loading {
    display: block;
    width: 120px;
    height: 120px;
    background: url(../assets/loader.gif) no-repeat 0 0 / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>