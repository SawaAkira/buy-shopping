<template>
  <div class="bastList">
    <router-link class="bastItem" v-for="item in $store.state.home.bastList" :key="item.id" :to="'detail/'+ item.id">
      <div class="itemImgBox">
        <img :src="item.src" alt="" />
      </div>
      <div class="itemInfo">
          <div class="title">{{item.title}}</div>
          <div class="vip_price">￥{{item.vip_price}}<span>VIP</span></div>
          <div class="price">￥{{item.price}}</div>
          <div class="sell">已售{{item.sales}}{{item.unit}}</div>
          <div class="tocart"><img src="../assets/img/cart_white.png" alt=""></div>
      </div>
    </router-link >
  </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.bastList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: @margin3;

    .bastItem{
        flex: none;
        width: 168px;
        margin-bottom: @margin2;
        background-color: @bgColor2;
        box-sizing: border-box;
        border: 1px solid @borderColor1;
        box-shadow: 1px 1px 3px @borderColor1;
        border-radius: 5px;
        overflow: hidden;
    }
    .itemImgBox{
        width: 168px;
        height: 168px;

        img{
            width: 100%;
            height: 100%;
        }
    }

    .itemInfo{
        padding: @padding1;
        position: relative;
    }

    .title{
        color: @color1;
        font-size: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .vip_price{
        font-size: 15px;
        font-weight: bold;
        color: @color6;
        margin-top: @margin3;

        span{
            display: inline-block;
            font-size: 12px;
            color: @color4;
            border: 1px solid @borderColor2;
            font-weight: normal;
            border-radius: 4px;
            padding: 0 2px;
            margin-left: @margin1;
        }
    }

    .price{
        font-size: 13px;
        color: @color1;
        margin-top: @margin1;
    }

    .sell{
        font-size: 12px;
        color: @color3;
        margin: @margin1 0;
    }

    .tocart{
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        padding: 4px;
        border-radius: 50%;
        background-color: @bgColor3;

        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>