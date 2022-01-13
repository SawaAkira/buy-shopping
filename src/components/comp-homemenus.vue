<template>
  <div class="homeMenus">
    <div class="menuItem" v-for="item in $store.state.home.menusList" :key="item.id">
      <div class="menuImgBox">
        <img :src="item.src" alt="">
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.homeMenus{
  background-color: @bgColor2;
  display: flex;
  flex-wrap: wrap;
  .menuItem{
    padding: @padding2 0;
    width: 25%;

    span{
      display: block;
      font-size: 13px;
      text-align: center;
      margin-top: @margin1;
    }
  }

  .menuImgBox{
      width: 45px;
      overflow: hidden;
      border-radius: 50%;
      margin: 0 auto;

    img{
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
  }
}
</style>