<template>
  <div class="cartItem">
    <label>
      <i
        class="bi"
        :class="citem.isChecked ? 'bi-check-circle-fill' : 'bi-circle'"
        @click="checkboxClick(citem.isChecked)" 
      ></i>
    </label>
    <router-link class="cartImgBox" :to="'detail/'+citem.goodsId">
      <img :src="citem.src?citem.src:loadImg" :onerror="errorImg" alt="" />
    </router-link>
    <div class="cartInfo">
      <div class="title text_ellipsis">{{ citem.name }}</div>
      <div class="attr">属性：{{ citem.attr }}</div>
      <div class="infoBottom">
        <div class="price">￥ {{ citem.price }}</div>
        <cart-count :citem="citem"></cart-count>
      </div>
    </div>
  </div>
</template>

<script>
import CartCount from "@/components/comp-cartcount";
export default {
  data() {
    return {
      isChecked: false,
      item: "",
      id: 0,
      loadImg: require('../assets/loader.gif'),
      errorImg: 'this.src="' + require('../assets/error.gif') + '"',
    };
  },
  components: {
    CartCount,
  },
  methods: {
    checkboxClick(val){
      let cartList = this.$store.state.cart.cartList;
      cartList.forEach((item) => {
        if (item.id == this.citem.id) {
          item.isChecked = !val;
        }
      });
      this.$store.dispatch("cart/setCartListAsync", cartList);
    }
  },
  props: ["citem"],
};
</script>


<style lang="less">
@import "../assets/less/variable.less";
.cartList {
  .cartItem {
    background-color: @bgColor2;
    display: flex;
    align-items: center;
    padding: @padding2 @padding3;
    margin-bottom: 8px;

    label {
      display: flex;
      margin-right: @margin3;
    }

    i {
      font-size: 18px;
    }

    .bi-check-circle-fill {
      color: @color4;
    }
    .bi-circle {
      color: @color5;
    }
  }

  .cartItem:nth-child(1) {
    margin-top: @margin2;
  }

  .cartImgBox {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: @margin3;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .cartInfo {
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    align-self: start;

    .title {
      color: @color1;
    }

    .attr {
      font-size: 12px;
      color: @color3;
      margin-top: 8px;
    }
  }

  .infoBottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 14px;
    font-size: 16px;
  }
}
</style>