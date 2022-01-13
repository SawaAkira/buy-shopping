<template>
  <div :class="$store.state.search.isList ? 'searchList' : 'searchCascades'">
    <div class="searchItem" v-for="item in $store.state.search.searchInfo" :key="item.id" @click="toSearchItem(item.id)">
      <div class="imgBox">
        <img :src="item.image" :onerror="errorImg" alt="" />
      </div>
      <div class="textBox">
        <div class="title text_ellipsis">{{item.store_name}}</div>
        <div class="now_price">￥{{item.price}}</div>
        <div class="bottomBox">
            <div class="vip_price">￥{{item.vip_price}}<span>VIP</span></div>
            <div class="salesNum">已售{{item.sales}}件</div>
        </div>
      </div>
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
    methods: {
        toSearchItem(id){
            this.$router.push("/detail/" + id);
        }
    }
}
</script>

<style lang="less">
@import "../assets/less/variable.less";
.searchCascades {
    padding: 0 @padding2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  .searchItem{
      background-color: @bgColor2;
      width: 172.5px;
      margin-top: @margin2;
      border-radius: 5px;
      overflow: hidden;

      .imgBox{
          width: 100%;
          height: 172.5px;
          img{
              width: 100%;
              height: 100%;
          }
      }

      .textBox{
          color: @color1;
          padding: @padding2;
          font-size: 14px;
      }

      .now_price{
          color: @color6;
          font-size: 16px;
          font-weight: bold;
          margin-top: 2px;

          &::first-letter{
              font-size: 12px;
          }
      }

      .bottomBox{
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          margin-top: 3px;

          .salesNum{
              color: @color7;
          }
      }
      .vip_price{
          span {
              display: inline-block;
              color: @color4;
              background-color: @bgColor2;
              border: 1px solid @borderColor2;
              box-sizing: border-box;
              border-radius: 5px;
              padding: 0 3px;
              transform: scale(0.75);
          }
      }
  }
}
.searchList {
  background-color: @bgColor2;
  .searchItem{
      background-color: @bgColor2;
      overflow: hidden;
      display: flex;
      padding: @padding3 0;
      margin: 0 @margin2;
      box-sizing: border-box;
      border-bottom: 1px solid @borderColor1;

      .imgBox{
          flex: none;
          width: 90px;
          height: 90px;
          margin-right: @margin2;
          border-radius: 5px;
          overflow: hidden;
          img{
              width: 100%;
              height: 100%;
          }
      }

      .textBox{
          flex: 1;
          overflow: hidden;
          color: @color1;
          font-size: 14px;
      }

      .now_price{
          color: @color6;
          font-size: 16px;
          font-weight: bold;
          margin-top: 25px;

          &::first-letter{
              font-size: 12px;
          }
      }

      .bottomBox{
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          margin-top: @margin1;

          .salesNum{
              color: @color7;
          }
      }
      .vip_price{
          span {
              display: inline-block;
              color: @color4;
              background-color: @bgColor2;
              border: 1px solid @borderColor2;
              box-sizing: border-box;
              border-radius: 5px;
              padding: 0 3px;
              transform: scale(0.75);
          }
      }
  }
}
</style>