<template>
  <div class="tabList">
    <router-link to="/home" active-class="active">
      <div class="tabImgBox"></div>
      <span>首页</span>
    </router-link>
    <router-link to="/classify" active-class="active">
      <div class="tabImgBox"></div>
      <span>分类</span>
    </router-link>
    <router-link to="/cart" active-class="active">
      <div class="tabImgBox"></div>
      <span>购物车</span>
    </router-link>
    <router-link to="/personal" active-class="active">
      <div class="tabImgBox"></div>
      <span>我的</span>
    </router-link>
  </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.tabList {
  display: flex;
  box-sizing: border-box;
  border-top: 1px solid @borderColor1;
  background-color: @bgColor2;

  a {
    display: block;
    flex: 1;
  }

  .tabImgBox {
    width: 32px;
    height: 32px;
    margin: 3px auto;
  }

  span {
    color: @color3;
    font-size: 14px;
    display: block;
    text-align: center;
    padding-bottom: 2px;
  }

  & :nth-child(1) .tabImgBox {
    background: url(../assets/img/home_black.png) no-repeat 0 0 / cover;
  }

  & :nth-child(2) .tabImgBox {
    background: url(../assets/img/classify_black.png) no-repeat 0 0 / cover;
  }

  & :nth-child(3) .tabImgBox {
    background: url(../assets/img/cart_black.png) no-repeat 0 0 / cover;
  }

  & :nth-child(4) .tabImgBox {
    background: url(../assets/img/personal_black.png) no-repeat 0 0 / cover;
  }

  & .active:nth-child(1) .tabImgBox {
    background: url(../assets/img/home_blue.png) no-repeat 0 0 / cover;
  }

  & .active:nth-child(2) .tabImgBox {
    background: url(../assets/img/classify_blue.png) no-repeat 0 0 / cover;
  }

  & .active:nth-child(3) .tabImgBox {
    background: url(../assets/img/cart_blue.png) no-repeat 0 0 / cover;
  }

  & .active:nth-child(4) .tabImgBox {
    background: url(../assets/img/personal_blue.png) no-repeat 0 0 / cover;
  }

  & .active span{
      color: @color4;
  }
}
</style>