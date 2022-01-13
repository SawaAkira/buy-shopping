<template>
    <div class="userOrder">
        <div class="header">
            <div class="title">我的订单</div>
            <router-link class="more" to="/user/order/0">全部订单<i class="bi bi-chevron-right"></i></router-link>
        </div>
        <div class="orderList">
            <router-link class="orderNavItem" to="/user/order/0">
                <div class="itemImg">
                    <img src="../assets/img/personal/payment.png" alt="">
                </div>
                <span>{{numObj.unpaid_count}}</span>
                <div class="name">待付款</div>
            </router-link>
            <router-link class="orderNavItem" to="/user/order/1">
                <div class="itemImg">
                    <img src="../assets/img/personal/deliver.png" alt="">
                </div>
                <span>{{numObj.unshipped_count}}</span>
                <div class="name">待发货</div>
            </router-link>
            <router-link class="orderNavItem" to="/user/order/2">
                <div class="itemImg">
                    <img src="../assets/img/personal/receipt.png" alt="">
                </div>
                <span>{{numObj.received_count}}</span>
                <div class="name">待收获</div>
            </router-link>
            <router-link class="orderNavItem" to="/user/order/3">
                <div class="itemImg">
                    <img src="../assets/img/personal/evaluate.png" alt="">
                </div>
                <span>{{numObj.evaluated_count}}</span>
                <div class="name">待评价</div>
            </router-link>
            <router-link class="orderNavItem" to="/user/order/4">
                <div class="itemImg">
                    <img src="../assets/img/personal/refund.png" alt="">
                </div>
                <span>{{numObj.refund_count}}</span>
                <div class="name">售后/退款</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            numObj: this.$store.state.personal.userInfo.orderStatusNum,
        }
    }
}
</script>

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