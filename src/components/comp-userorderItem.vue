<template>
  <div class="orderItem">
    <div class="header">
      <div class="time">{{citem._add_time}}</div>
      <div class="state">{{citem._status._title}}</div>
    </div>
    <div class="goodsItem" v-for="item in citem.cartInfo" :key="item.id">
        <div class="imgBox">
            <img :src="item.productInfo.image" :onerror="errorImg" alt="">
        </div>
        <div class="textBox">
            <div class="title"><span class="text_ellipsis2">{{item.productInfo.store_name}}</span></div>
            <div class="quantity">
                <div class="price">￥{{item.productInfo.price}}</div>
                <div class="num">×{{item.cart_num}}</div>
            </div>
        </div>
    </div>
    <div class="total">共{{citem.cartInfo.length}}件商品，总金额<span>￥{{citem.total_price}}</span></div>
    <div class="btnBox">
      <div class="moreBtn">查看详细</div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            errorImg: 'this.src="' + require('../assets/error.gif') + '"',
        }
    },
    props: ['citem'],
}
</script>

<style lang="less">
@import "../assets/less/variable.less";
.orderItem{
    background-color: @bgColor2;
    padding: 0 @padding3;
    margin-bottom: @margin2;
    border-radius: 5px;
    .header{
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        padding: @padding2 0;
        margin-bottom: @margin2;
        box-sizing: border-box;
        border-bottom: 1px solid @borderColor1;

        .time{
            color: @color1;
        }

        .state{
            color: @color4;
        }
    }

    .goodsItem{
        display: flex;
        padding-bottom: @padding2;
    }

    .imgBox{
        flex: none;
        width: 60px;
        height: 60px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: @margin2;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    .textBox{
        display: flex;
        flex: 1;
    }

    .title{
        flex: none;
        width: 160px;
        color: @color1;
        font-size: 14px;
    }

    .quantity{
        flex: 1;
        color: @color7;
        font-size: 14px;
        text-align: right;
    }

    .total{
        font-size: 14px;
        text-align: right;
        padding: @padding2 0;
        box-sizing: border-box;
        border-bottom: 1px solid @borderColor1;

        span{
            color: @color4;
            margin-left: @margin1;
        }
    }
    .btnBox{
        display: flex;
        justify-content: flex-end;
        padding: @padding2 0;
    }
    .moreBtn{
        font-size: 15px;
        color: @color2;
        background-color: @bgColor3;
        padding: @padding1 @padding3;
        border-radius: 15px;
    }
}
</style>