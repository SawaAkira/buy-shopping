<template>
    <div class="homeSearch">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <router-link class="search" to="/search">
            <i class="bi bi-search"></i>搜索商品
        </router-link>
    </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.homeSearch{
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: @bgColor2;
    
    .logo{
        width: 60px;

        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .search{
        flex: 1;
        padding: 6px 12px;
        margin-left: 15px;
        font-size: 14px;
        border-radius: 32px;
        background-color: @bgColor4;
        color: @color5;
    }

    i{  
        margin-right: @margin1;
    }
}
</style>