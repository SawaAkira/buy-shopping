<template>
  <div class="classifySearch">
    <div class="classifySearchBox">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="搜索商品信息" v-model="keyword" />
      <div class="btn" @click="search(keyword)">搜索</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search(val) {
      if (val.replaceAll(" ", "")) {
        this.$router.push({ path: '/search', query: { w: val }});
      } else {
          this.errorTip("输入框不能为空")
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
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.classifySearch {
  background-color: @bgColor2;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid @borderColor1;
  box-sizing: border-box;

  .classifySearchBox {
    display: flex;
    flex: 1;
    background-color: @bgColor4;
    font-size: 16px;
    color: @color1;
    height: 32px;
    align-items: center;
    border-radius: 32px;
    margin: @margin2 0;

    i {
      color: @color5;
      padding: 0 @padding2;
    }

    input {
      outline: none;
      border: none;
      background-color: @bgColor4;
      flex: 1;
    }

    .btn {
      font-size: 15px;
      background-color: @bgColor3;
      color: @color2;
      height: 32px;
      line-height: 32px;
      padding: 0 @padding3;
      border-radius: 32px;
    }
  }
}
</style>