<template>
  <div class="cardCount">
    <div
      class="reduce"
      @click="reduceNum"
      :class="isDisabled ? 'disabled' : ''"
    >
      -
    </div>
    <div class="num">
      <input type="number" v-model="num" @blur="changeNum" />
    </div>
    <div class="plus" @click="plusNum">+</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      id: "",
      isDisabled: false,
    };
  },
  methods: {
    changeNum() {
      if (!/^\d*$/.test(this.num)) {
        this.num = 1;
      } else if (!this.num || this.num < 1) {
        this.num = 1;
      }
      if (this.num > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      this.saveNum(this.num);
    },
    plusNum() {
      this.num++;
      if (this.num > 1) {
        this.isDisabled = false;
      }
      this.saveNum(this.num);
    },
    reduceNum() {
      this.num--;
      if (this.num <= 1) {
        this.num = 1;
        this.isDisabled = true;
      } else {
        this.saveNum(this.num);
      }
    },
    saveNum(num) {
      let token = this.$store.state.token;
      axios({
        method: "POST",
        url: `http://47.115.51.185/api/cart/num`,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
        data: {
          id:this.id,
          number:num,
        },
      }).then((data) => {
        if(data.data.status == 400){
          this.errorTip("库存不足");
          this.num = 1;
          this.isDisabled = true;
        }
      });
      let cartList = this.$store.state.cart.cartList;
      cartList.forEach((item) => {
        if (item.id == this.citem.id) {
          item.num = num;
        }
      });
      this.$store.dispatch("cart/setCartListAsync", cartList);
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
  props: ["citem"],
  created() {
    this.id = this.citem.id;
    this.num = this.citem.num;
    if (this.num == 1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  },
};
</script>


<style lang="less">
@import "../assets/less/variable.less";
.cardCount {
  display: flex;

  .reduce,
  .plus,
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    box-sizing: border-box;
    color: @color4;
    border: 1px solid @color4;
  }

  .reduce {
    border-right: 0;
    border-radius: 2px 0 0 2px;
  }

  .plus {
    border-left: 0;
    border-radius: 0 2px 2px 0;
  }

  .num {
    input {
      color: @color4;
      display: block;
      width: 100%;
      outline: none;
      border: none;
      text-align: center;
    }
  }

  .disabled {
    color: @color5;
    border: 1px solid @color5;
    border-right: 0;
  }
}
</style>