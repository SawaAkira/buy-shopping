<template>
    <div class="userOrder">
        <div class="header">
            <div class="title">我的订单</div>
            <router-link class="more" to="/user/order/0">全部订单<i class="bi bi-chevron-right"></i></router-link>
        </div>
        <div class="orderList">
            <router-link class="orderNavItem" :to="item.link" v-for="(item,index) in $store.state.personal.userOrder.list" :key="index">
                <div class="itemImg">
                    <img :src="item.src" alt="">
                </div>
                <span v-if="item.num">{{item.num}}</span>
                <div class="name">{{item.name}}</div>
            </router-link>
        </div>
    </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.userOrder{
  background-color: @bgColor2;
  border-radius: 5px;
  font-size: 15px;

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @padding2 @padding3;
        border-bottom: 2px dotted @borderColor1;

        .title{
            color: @color1;
        }

        .more{
            font-size: 13px;
            color: @color3;
        }

        i{
            margin-left: @margin1;
        }
    }

    .orderList{
        display: flex;
    }

    .orderNavItem{
        flex: 1;
        position: relative;
        padding: @padding2 0 @padding3;

        .itemImg{
            margin: 0 auto;
            width: 32px;
            height: 32px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        .name{
            font-size: 13px;
            margin-top: @margin1;
            text-align: center;
        }

        span{
            font-size: 12px;
            color: @color4;
            background-color: @bgColor2;
            border: 1px solid @borderColor2;
            border-radius: 12px;
            padding: 0 @padding1;
            position: absolute;
            top: 7px;
            right: 10px;
        }
    }
}
</style>