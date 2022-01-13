<template>
  <div class="chooseItem">
    <div class="chooseName">{{ citem.attr_name }}</div>
    <div class="chooseList">
      <span
        v-for="(item, i) in citem.attr_values"
        :key="i"
        @click="index = i;chooseItem(i)"
        :class="{active:index == i}"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  props: ["citem","cindex"],
  methods: {
    chooseItem(val) {
      let allInfo = this.$store.state.detail.allInfo;
      let arr = this.$store.state.detail.allInfo.productAttr[this.cindex].attr_value;
      arr.forEach(item => {
          item.check = false;
      })
      arr[val].check = true;
      allInfo.productAttr[this.cindex].attr_value = arr;
      this.$store.dispatch("detail/setAllInfoAsync", allInfo);
    },
  },
  created(){
      let arr = this.citem.attr_value;
      arr.forEach((item,index) => {
          if(item.check){
              this.index = index;
          }
      })
  }
};
</script>

<style lang="less">
@import "../assets/less/variable.less";
.chooseItem {
  font-size: 15px;
  margin-bottom: @margin3;
  .chooseName {
    color: @color7;
    margin-bottom: @margin1;
  }

  .chooseList {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 3px;

    span {
      font-size: 13px;
      display: block;
      padding: 3px @padding3;
      background-color: @bgColor2;
      box-sizing: border-box;
      border: 1px solid @color5;
      border-radius: 3px;
      color: @color1;
      margin-right: @margin1;
    }

    .active {
      color: @color2;
      background-color: @bgColor3;
      border: 1px solid @borderColor2;
    }
  }
}
</style>