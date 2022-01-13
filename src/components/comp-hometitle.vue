<template>
    <div class="homeTitle">
        <h3><slot></slot></h3>
        <router-link :to="link">更多<i class="bi bi-chevron-right"></i></router-link>
    </div>
</template>

<script>
export default {
    props: ['link']
}
</script>


<style lang="less">
@import "../assets/less/variable.less";
.homeTitle{
    display: flex;
    justify-content: space-between;
    padding: @padding2 0;
    font-size: 13px;

    h3{
        font-size: 15px;
    }

    a{  
        display: block;
        color: @color3;
    }
}
</style>