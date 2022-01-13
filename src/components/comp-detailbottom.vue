<template>
  <div class="storeBottom">
    <div class="service" @click="errorTip('当前服务不可用')">
      <i class="bi bi-headset"></i>
      <span>客服</span>
    </div>
    <div class="collect" @click="clickCollect">
      <i
        class="bi"
        :class="
          $store.state.detail.storeInfo.userCollect ? 'bi-star-fill' : 'bi-star'
        "
      ></i>
      <span>收藏</span>
    </div>
    <router-link class="toCart" to="/cart">
      <i class="bi bi-cart4"></i>
      <span>购物车</span>
    </router-link>
    <div class="btn">
      <div class="addToCart" @click="isToCart">加入购物车</div>
      <div class="toBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickCollect() {
      if (localStorage.getItem("token")) {
        let storeInfo = this.$store.state.detail.storeInfo;
        storeInfo.userCollect = !this.$store.state.detail.storeInfo.userCollect;
        this.$store.dispatch("detail/setStoreInfoAsync", storeInfo);
        let token = this.$store.state.token;
        let id = storeInfo.id;
        if (storeInfo.userCollect) {
          axios({
            method: "POST",
            url: `http://47.115.51.185/api/collect/add`,
            headers: {
              "Authori-zation": "Bearer " + token,
            },
            data: {
              id,
              category: "product",
            },
          }).then((data) => {
            if (data.data.status == 200) {
              this.errorTip("收藏成功");
            }
          });
        } else {
          axios({
            method: "POST",
            url: `http://47.115.51.185/api/collect/del`,
            headers: {
              "Authori-zation": "Bearer " + token,
            },
            data: {
              id,
              category: "product",
            },
          }).then((data) => {
            if (data.data.status == 200) {
              this.errorTip("已取消收藏");
            }
          });
        }
      } else {
        this.$router.push("/login");
      }
    },
    isToCart() {
      if (localStorage.getItem("token")) {
        if (this.$store.state.detail.isChoose) {
          this.addToCart();
        } else {
          this.$store.dispatch("setDetailMaskShowAsync", true);
          this.$store.dispatch("detail/setIsChooseAsync", true);
        }
      } else {
        this.$router.push("/login");
      }
    },
    addToCart() {
      if (this.$store.state.detail.unique !== 0) {
        let token = this.$store.state.token;
        let obj = this.$store.state.detail.allInfo.productValue;
        let cartNum = this.$store.state.detail.chooseNum;
        let uniqueId = "";
        if (this.$store.state.detail.unique) {
          uniqueId = this.$store.state.detail.unique;
        }
        let productId = "";
        let imgUrl = "";
        if (obj.length != 0) {
          for (let key in obj) {
            if (obj[key].unique == uniqueId) {
              productId = obj[key].product_id;
              imgUrl = obj[key].image;
            }
          }
        } else {
          productId = this.$store.state.detail.storeInfo.id;
          imgUrl = this.$store.state.detail.storeInfo.image;
        }

        axios({
          method: "POST",
          url: `http://47.115.51.185/api/cart/add`,
          headers: {
            "Authori-zation": "Bearer " + token,
          },
          data: {
            cartNum,
            new: 0,
            productId,
            uniqueId,
            imgUrl,
          },
        }).then((data) => {
          if (data.data.status == 200) {
            this.$store.dispatch("setDetailMaskShowAsync", false);
            this.$store.dispatch("detail/setIsChooseAsync", false);
            this.errorTip("添加成功");
          } else {
            this.$store.dispatch("setDetailMaskShowAsync", false);
            this.$store.dispatch("detail/setIsChooseAsync", false);

            this.errorTip(data.data.msg);
          }
        });
      } else {
        this.errorTip("库存不足")
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
      }, 2000);
    },
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.storeBottom {
  display: flex;
  font-size: 15px;
  height: 50px;
  box-sizing: border-box;
  background-color: @bgColor2;
  border-top: 1px solid @borderColor1;
  padding: 0 @padding2;
  align-items: center;
  justify-content: space-between;

  .service,
  .collect,
  .toCart {
    display: flex;
    flex-direction: column;
    width: 40px;
    text-align: center;
    color: @color7;
    i {
      font-size: 20px;
    }

    span {
      font-size: 12px;
    }
  }

  .btn {
    display: flex;
    align-items: center;
  }

  .addToCart,
  .toBuy {
    flex: none;
    width: 110px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
  }

  .addToCart {
    color: @color4;
    background-color: @bgColor2;
    border: 1px solid @borderColor2;
    border-radius: 19px 0 0 19px;
  }

  .toBuy {
    color: @color2;
    background-color: @bgColor3;
    border: 1px solid @borderColor2;
    border-radius: 0 19px 19px 0;
  }

  .bi-star-fill {
    color: @color4;
  }
}
</style>