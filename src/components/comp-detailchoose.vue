<template>
  <div class="typeChoose">
    <div class="close" @click="userChoose(false)">
      <i class="bi bi-x-lg"></i>
    </div>
    <div class="goodsInfo">
      <div class="imgBox">
        <img :src="image" alt="" />
      </div>
      <div class="textBox">
        <p class="text_ellipsis">
          {{ $store.state.detail.storeInfo.store_name }}
        </p>
        <div>
          ￥{{ $store.state.detail.storeInfo.price
          }}<span>库存：{{ stock }}</span>
        </div>
      </div>
    </div>
    <div class="chooseBox">
      <choose-item
        v-for="(item, index) in $store.state.detail.allInfo.productAttr"
        :key="index"
        :citem="item"
        :cindex="index"
      ></choose-item>
      <detail-count></detail-count>
    </div>
  </div>
</template>

<script>
import ChooseItem from "@/components/comp-detailchooseitem.vue";
import DetailCount from "@/components/comp-detailcount.vue";
export default {
  data() {
    return {
      stock: this.$store.state.detail.storeInfo.stock,
      image: this.$store.state.detail.storeInfo.image,
    };
  },
  components: {
    ChooseItem,
    DetailCount,
  },
  methods: {
    userChoose(val) {
      this.$store.dispatch("setDetailMaskShowAsync", val);
      this.$store.dispatch("detail/setIsChooseAsync", val);
    },
  },
  watch: {
    "$store.state.detail.unique": {
      handler(newVal, oldVal) {
        let obj = this.$store.state.detail.allInfo.productValue;
        let unique = this.$store.state.detail.unique;
        if (unique !== 0) {
          if (obj.length != 0) {
            for (let key in obj) {
              if (obj[key].unique == unique) {
                this.stock = obj[key].stock;
                this.image = obj[key].image;
              }
            }
          }
        } else {
            this.stock = 0;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.typeChoose {
  position: fixed;
  left: 0;
  bottom: 50px;
  width: 100%;
  background-color: @bgColor2;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  padding: @padding3;
  box-sizing: border-box;

  .close {
    position: absolute;
    display: inline-block;
    top: 10px;
    right: 15px;
  }

  .goodsInfo {
    display: flex;
    font-size: 14px;
    .imgBox {
      flex: none;
      width: 75px;
      height: 75px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: @margin3;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .textBox {
      color: @color1;
      width: 200px;
      > p {
        font-size: 15px;
        margin: @margin2 0 @margin3;
      }

      > div {
        font-size: 16px;
        color: @color6;

        > span {
          margin-left: @margin3;
          font-size: 12px;
          color: @color7;
        }
      }
    }
  }

  .chooseBox {
    padding: @padding3 0 0;
  }
}
</style>