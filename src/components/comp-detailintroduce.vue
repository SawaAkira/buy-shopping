<template>
    <div class="detailIntroduce">
        <div class="title">产品介绍</div>
        <div class="mainInfo" v-html="$store.state.detail.storeInfo.description"></div>
    </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.detailIntroduce{

    .title{
        background-color: @bgColor2;
        text-align: center;
        font-size: 15px;
        padding: @padding2 0;
    }

    .mainInfo{
        width: 375px;
        overflow: hidden;
        div,span{
            width: 375px!important;
        }

        ul{
            font-size: 12px;
        }

        a{
            display: block;
            width: 100%;
        }

        img{
            width: 375px;
            height: auto;
        }
        
    }
}
</style>