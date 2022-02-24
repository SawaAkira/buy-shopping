<template>
  <div class="cart">
    <div class="cartTip" v-if="$store.state.isCartShow">
      <span><i class="bi bi-check-circle"></i>100%正品保证</span>
      <span><i class="bi bi-check-circle"></i>所有商品精挑细选</span>
      <span><i class="bi bi-check-circle"></i>售后无忧</span>
    </div>
    <div class="cartTitle" v-if="$store.state.isCartShow">
      <div class="total">购物车（{{ $store.state.cart.cartList.length }}）</div>
      <div class="manage" @click="isManage = !isManage">
        {{ isManage ? "取消" : "管理" }}
      </div>
    </div>
    <div class="cartBox" v-if="$store.state.isCartShow">
      <div :class="isShow ? 'cartList' : 'cartNull'">
        <cart-list
          v-for="item in $store.state.cart.cartList"
          :key="item.id"
          :citem="item"
        ></cart-list>
      </div>
    </div>
    <div class="cartBottom" v-if="$store.state.isCartShow">
      <label class="checkedAll">
        <i
          class="bi"
          :class="isCheckedAll ? 'bi-check-circle-fill' : 'bi-circle'"
          @click="clickAll(isCheckedAll)"
        ></i>
        <span>全选（{{ sumNum }}）</span>
      </label>
      <div :class="isManage ? 'btnBox' : 'payBox'">
        <div
          :class="isManage ? 'collect' : 'totalPrice'"
          @click="btn1click(isManage)"
        >
          {{ isManage ? "收藏" : "￥" + sumPrice }}
        </div>
        <div
          :class="isManage ? 'delete' : 'payBtn'"
          @click="btn2click(isManage)"
        >
          {{ isManage ? "删除" : "立即下单" }}
        </div>
      </div>
    </div>
    <span class="loading" v-if="!$store.state.isCartShow"></span>
  </div>
</template>


<script>
import CartList from "@/components/comp-cartlist.vue";
export default {
  data() {
    return {
      isShow: false,
      isCheckedAll: false,
      isManage: false,
      sumPrice: "0.00",
      sumNum: 0,
    };
  },
  components: {
    CartList,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/cart/list`,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.data.valid.length) {
          this.isShow = true;
          let cartData = data.data.data.valid;
          let cartList = [];
          for (let i in cartData) {
            let obj = {};
            obj.id = cartData[i].id;
            obj.num = cartData[i].cart_num;
            obj.isChecked = false;
            obj.price = cartData[i].productInfo.price;
            obj.attr = cartData[i].productInfo.attrInfo.suk;
            obj.name = cartData[i].productInfo.store_name;
            obj.goodsId = cartData[i].product_id;
            obj.src = cartData[i].productInfo.image;
            cartList.push(obj);
          }
          this.$store.dispatch("setCartShowAsync", true);
          this.$store.dispatch("cart/setCartListAsync", cartList);
        } else {
          this.isShow = false;
          this.$store.dispatch("setCartShowAsync", true);
        }
      });
    },
    clickAll(val) {
      let cartList = this.$store.state.cart.cartList;
      if (cartList.length) {
        this.isCheckedAll = !val;
        cartList.forEach((item) => {
          item.isChecked = !val;
        });
        this.$store.dispatch("cart/setCartListAsync", cartList);
      }
    },
    btn1click(val) {
      let token = this.$store.state.token;
      if (val) {
        let cartList = this.$store.state.cart.cartList;
        let arr = [];
        cartList.forEach((item) => {
          if (item.isChecked) {
            arr.push(item.goodsId);
          }
        });
        if (arr.length) {
          axios({
            method: "POST",
            url: `http://47.115.51.185/api/collect/all`,
            headers: {
              "Authori-zation": "Bearer " + token,
            },
            data: {
              id: arr,
              category: "product",
            },
          }).then((data) => {
            if (data.data.status == 200) {
              this.errorTip(data.data.msg);
            }
          });
        } else {
          this.errorTip("未选中任何商品");
        }
      }
    },
    btn2click(val) {
      let token = this.$store.state.token;
      if (val) {
        let cartList = this.$store.state.cart.cartList;
        let arr = [];
        cartList.forEach((item) => {
          if (item.isChecked) {
            arr.push(item.id);
          }
        });
        if (arr.length) {
          cartList = cartList.filter((item) => !item.isChecked);
          this.$store.dispatch("cart/setCartListAsync", cartList);
          axios({
            method: "POST",
            url: `http://47.115.51.185/api/cart/del`,
            headers: {
              "Authori-zation": "Bearer " + token,
            },
            data: {
              ids: arr,
            },
          }).then((data) => {
            if (data.data.status == 200) {
              this.errorTip("删除成功");
            }
          });
          if (cartList.length) {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
        } else {
          this.errorTip("未选中任何商品");
        }
      }
    },
    errorTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
        }
      }, 1500);
    },
  },
  watch: {
    "$store.state.cart.cartList": {
      handler(newValue, oldValue) {
        let sum = 0;
        let checkedNum = 0;
        newValue.forEach((item) => {
          if (item.isChecked) {
            let num = item.num;
            let price = item.price;
            sum += num * price;
            checkedNum++;
          }
        });
        this.sumPrice = sum.toFixed(2);
        this.sumNum = checkedNum;
        if (this.sumNum < newValue.length) {
          this.isCheckedAll = false;
        } else {
          this.isCheckedAll = true;
        }
        if (!newValue.length) {
          this.isCheckedAll = false;
        }
      },
      deep: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      document.title = to.meta.title;
      next();
    } else {
      sessionStorage.setItem("toPath", to.path);
      next({ path: "/login" });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setCartShowAsync", false);
    next();
  },
};
</script>


<style lang="less">
@import "../../assets/less/variable.less";
.cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  background-color: @bgColor4;
  .cartTip {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    background-color: @bgColor4;
    padding: 0 @padding3;

    span {
      color: @color3;
      padding: @padding2;
    }

    i {
      color: @color3;
      margin-right: 3px;
    }
  }

  .cartTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @bgColor2;
    padding: 7px @padding3;
    box-sizing: border-box;
    border-bottom: 1px solid @borderColor1;

    .total {
      font-size: 16px;
      color: @color1;
    }

    .manage {
      font-size: 14px;
      padding: 3px @padding3;
      color: @color4;
      border: 1px solid @borderColor2;
      border-radius: 5px;
    }
  }
  .cartBox {
    flex: 1;
    position: relative;
    overflow-y: scroll;
  }

  .cartNull {
    background: url(../../assets/img/cart_default.png) no-repeat 0 0 / cover;
    width: 150px;
    height: 150px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .cartBottom {
    display: flex;
    justify-content: space-between;
    padding: 0 @padding3;
    background-color: @bgColor5;
    box-sizing: border-box;
    border-top: 1px solid @borderColor1;
  }
  .checkedAll {
    height: 45px;
    display: flex;
    align-items: center;

    i {
      font-size: 18px;
      margin-right: @margin3;
    }

    .bi-check-circle-fill {
      color: @color4;
    }
    .bi-circle {
      color: @color5;
    }

    span {
      font-size: 15px;
    }
  }

  .payBox,
  .btnBox {
    display: flex;
    align-items: center;
    font-size: 15px;

    .totalPrice {
      color: @color6;
      margin-right: @margin2;
    }

    .payBtn {
      color: @color2;
      background-color: @bgColor3;
      padding: 6px @padding3;
      border-radius: 16px;
    }

    .collect,
    .delete {
      padding: 4px 25px;
      border-radius: 15px;
      box-sizing: border-box;
      color: @color4;
      border: 1px solid @borderColor2;
    }

    .delete {
      color: #999999;
      border: 1px solid #999999;
      margin-left: @margin2;
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }

  .loading {
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../assets/loader.gif) no-repeat 0 0 / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
