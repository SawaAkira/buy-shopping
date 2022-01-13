<template>
    <div class="homeBenefit">
        <home-title :link="'/classify'">促销单品</home-title>
        <div class="benefitBox">
            <router-link class="benefitItem" v-for="item in $store.state.home.benefitList" :key="item.id" :to="'detail/'+ item.id">
                <div class="benefitImgBox">
                    <img :src="item.src" alt="">
                </div>
                <div class="benefitInfo">
                    <div class="title text_ellipsis">{{item.title}}</div>
                    <div class="now_price">促销价: ￥{{item.price}}</div>
                    <div class="bottomInfo">
                        <div class="old_price">日常价：￥{{item.ot_price}}</div>
                        <div class="num">仅剩：{{item.stock}}{{item.unit}}</div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import HomeTitle from "@/components/comp-hometitle.vue";
export default {
  components: {
    HomeTitle,
  },
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.homeBenefit{
    background-color: @bgColor2;

    .benefitBox{
        padding-bottom: @padding2;
    }

    .benefitItem{
        display: flex;
        // justify-content: space-between;
        padding-bottom: @padding3;
        border-bottom: 1px solid @borderColor1;
    }

    .benefitItem:not(:first-child){
        padding-top: @padding3;
    }

    .benefitImgBox{
        flex: none;
        width: 94px;
        height: 94px;
        margin-right: @margin3;

        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    .benefitInfo{
        flex: 1;
        width: 236px;
        font-size: 14px;
        color: @color1;
    }

    .now_price{
        display: inline-block;
        font-size: 12px;
        color: @color2;
        background-color: @bgColor3;
        padding: 4px @padding1;
        border-radius: 12px 0 12px 0;
        margin: 25px 0 @margin2;
    }

    .bottomInfo{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: @color3;

        .old_price{
            text-decoration: line-through;
        }
    }
}
</style>