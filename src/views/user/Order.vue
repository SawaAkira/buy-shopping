<template>
  <div class="orderPage" ref="order">
    <div class="orderBox">
      <div class="order_bg"></div>
      <div>
        <div class="orderHeader" v-if="isShow">
          <h3>订单信息</h3>
          <p>
            累计订单：{{ userInfo.order_count }}&nbsp;&nbsp;&nbsp; 总消费：￥{{
              userInfo.sum_price
            }}
          </p>
        </div>
        <div class="orderNav" v-if="isShow">
          <router-link to="/user/order/0" active-class="active">
            <div class="name">待付款</div>
            <div class="num">{{ userInfo.unpaid_count }}</div>
          </router-link>
          <router-link to="/user/order/1" active-class="active">
            <div class="name">待发货</div>
            <div class="num">{{ userInfo.unshipped_count }}</div>
          </router-link>
          <router-link to="/user/order/2" active-class="active">
            <div class="name">待收货</div>
            <div class="num">{{ userInfo.received_count }}</div>
          </router-link>
          <router-link to="/user/order/3" active-class="active">
            <div class="name">待评价</div>
            <div class="num">{{ userInfo.evaluated_count }}</div>
          </router-link>
          <router-link to="/user/order/5" active-class="active">
            <div class="name">已完成</div>
            <div class="num">{{ userInfo.complete_count }}</div>
          </router-link>
        </div>
        <router-view></router-view>
        <div
          class="moreLoading"
          v-if="$store.state.isOrderListShow && ismore"
          v-html="moreText"
        ></div>
        <div class="loading" v-if="!$store.state.isOrderListShow"></div>
      </div>
    </div>
    <div class="defaultTip" v-if="defaultTip"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
      orderList: "",
      defaultTip: false,
      isShow: false,
      ismore: false,
      moreText: "<span></span>正在加载，不要急~",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    getInfo() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/order/data`,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.userInfo = data.data.data;
          this.isShow = true;
        }
      });
    },
    handleScroll() {
      this.$nextTick(() => {
        if (this.$refs.order) {
          let ch = this.$refs.order.clientHeight;
          let st = this.$refs.order.scrollTop;
          let sh = this.$refs.order.scrollHeight;
          let d = setTimeout(() => {
            if (ch + st == sh) {
              let page = this.$store.state.detail.page;
              if (this.$store.state.detail.getPage) {
                page++;
                this.$store.dispatch("detail/setPageAsync", page);
              }
            }
          }, 300);
        }
      });
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    "$store.state.personal.orderList"(newVal, oldVal) {
      if (
        this.$store.state.personal.orderList.length <=
        this.$store.state.detail.times * 20
      ) {
        this.$store.dispatch("setOrderListShowAsync", true);
        if (this.$store.state.personal.orderList.length) {
          this.ismore = true;
          this.defaultTip = false;
          if (
            this.$store.state.personal.orderList.length <
            this.$store.state.detail.times * 20
          ) {
            this.$store.dispatch("detail/setGetPageAsync", false);
            this.moreText = "我是有底线的！！！";
          } else {
            this.$store.dispatch("detail/setGetPageAsync", true);
            this.moreText = "<span></span>正在加载，不要急~";
          }
        } else {
          this.ismore = false;
          this.defaultTip = true;
        }
      }
    },
    "$route.path"() {
      this.defaultTip = false;
    },
  },
  beforeRouteEnter(to, from, next){
    document.title = to.meta.title;
    next();
  }
};
</script>

<style lang="less">
@import "../../assets/less/variable.less";
.orderPage {
  height: 100%;
  position: relative;
  background-color: @bgColor4;
  overflow-y: scroll;

  .defaultTip {
    width: 150px;
    height: 150px;
    background: url(../../assets/img/cart_default.png) no-repeat 0 0 / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.orderBox {
  min-height: 100%;
  position: relative;
  background-color: @bgColor4;

  .order_bg {
    width: 100%;
    height: 150px;
    background-color: @bgColor3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .order_bg + div {
    padding: 0 @padding3;
    position: relative;
    z-index: 10;
  }

  .orderHeader {
    padding: 25px 0;
    h3 {
      font-size: 18px;
      color: @color2;
      margin-bottom: @margin2;
    }

    p {
      font-size: 14px;
      color: @color5;
    }
  }
  .orderNav {
    display: flex;
    background-color: @bgColor2;
    border-radius: 5px;
    margin-bottom: @margin2;

    & > a {
      flex: 1;
      font-size: 14px;
      text-align: center;
      color: @color1;
      padding: @padding3 0;
      position: relative;

      .num {
        margin-top: 3px;
      }
    }

    & > .active {
      font-weight: bold;
    }

    & > .active::after {
      content: "";
      display: block;
      width: 50%;
      height: 0;
      border-bottom: 3px solid @borderColor2;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
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
      background: url(../../assets/loader.gif) no-repeat 0 0 / cover;
    }
  }

  .loading {
    width: 80px;
    height: 80px;
    background: url(../../assets/loader.gif) no-repeat 0 0 / cover;
    margin: 50px auto;
  }
}
</style>