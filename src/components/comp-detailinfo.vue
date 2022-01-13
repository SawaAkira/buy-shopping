<template>
    <div class="storeInfo">
        <div class="storePrice">
            <div class="price">￥{{$store.state.detail.storeInfo.price}}</div>
            <div class="vip_Price">￥{{$store.state.detail.storeInfo.vip_price}}</div>
            <div class="vip"><span>VIP</span></div>
        </div>
        <div class="storeName">{{$store.state.detail.storeInfo.store_name}}</div>
        <div class="storeOther">
            <span>原价:￥{{$store.state.detail.storeInfo.ot_price}}</span>
            <span>库存:{{$store.state.detail.storeInfo.stock + $store.state.detail.storeInfo.unit_name}}</span>
            <span>销量:{{$store.state.detail.storeInfo.fsales + $store.state.detail.storeInfo.unit_name}}</span>
        </div>
    </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.storeInfo{
    background-color: @bgColor2;
    .storePrice{
        display: flex;
        align-items: baseline;

        .price{
            font-size: 23px;
            font-weight: bold;
            color: @color6;
        }

        .price::first-letter{
            font-size: 14px;
            font-weight: normal;
        }

        .vip_Price{
            color: @color1;
            font-size: 14px;
            margin-left: @margin2;
        }

        .vip{
            transform:scale(0.75);
        }

        span{
            font-size: 12px;
            color: @color4;
            border: 1px solid @borderColor2;
            border-radius: 4px;
            padding: 0 2px;
            margin-left: @margin1;
        }
    }

    .storeName{
        color: @color1;
        font-size: 16px;
        margin-top: 3px;
    }

    .storeOther{
        display: flex;
        justify-content: space-between;
        color: @color7;
        font-size: 12px;
        margin-top: 8px;
    }
}
</style>