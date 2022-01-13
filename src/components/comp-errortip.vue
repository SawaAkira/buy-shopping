<template>
    <div class="errorTip">
        <slot></slot>
    </div>
</template>

<style lang="less">
@import "../assets/less/variable.less";
.errorTip{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 18px;
    color: @color2;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px 30px;
    border-radius: 10px;
    white-space: nowrap;
    z-index: 1000;
}
</style>