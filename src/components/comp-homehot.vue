<template>
    <div class="homeHot">
        <div class="hot_bg">
            <img src="../assets/img/hot-bg.png" alt="">
        </div>
        <div class="hotBox">
            <home-title :link="'/classify'">热门榜单<span>根据销量、搜索、好评等综合得出</span></home-title>
            <div class="hotList">
                <router-link class="hotItem" v-for="item in $store.state.home.hotList" :key="item.id" :to="'detail/'+ item.id">
                    <div class="hotImgBox">
                        <img :src="item.src" alt="">
                    </div>
                    <div class="title text_ellipsis">{{item.title}}</div>
                    <div class="price">{{item.price}}</div>
                </router-link>
            </div>
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
.homeHot{
    position: relative;
    background-color: @bgColor2;
    padding-bottom: @padding1;
    .hot_bg{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .hotBox{
        position: relative;
        padding-bottom: @padding2;
        z-index: 1;
        
        & > div:nth-child(1) {
            color: @color2;

            a{
                color: @color2;
            }

            span{
                display: inline-block;
                font-size: 12px;
                font-weight: normal;
                margin-left: @margin2;
            }
        }
    }

    .hotList{
        display: flex;
        justify-content: space-between;
        padding: @padding1 @padding3;
        background-color: @bgColor2;
        border-radius: 10px;
        box-shadow: 0 0 5px -2px #aaa;
    }

    .hotItem{
        width: 100px;

        .title{
            font-size: 14px;
            color: @color1;
            margin-top: @margin2;
        }

        .price{
            color: @color6;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
        }
    }
    .hotImgBox{
        width: 100px;
        height: 100px;

        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>