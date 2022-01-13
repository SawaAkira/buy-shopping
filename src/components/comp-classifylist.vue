<template>
  <div class="classifyList">
    <div class="classifyAside">
      <div
        class="asideItem"
        v-for="(item, index) in $store.state.classify.asideList"
        :key="item.id"
        :class="{ active: i == index }"
        @click="
          i = index;
          clickTo(index);
        "
      >
        {{ item.name }}
      </div>
    </div>
    <div class="classifyInfo">
      <div class="infoBox">
        <div
          class="infoItem"
          v-for="(item, index) in $store.state.classify.asideList"
          :key="item.id"
          :id="'index' + index"
        >
          <div class="title">
            <div class="line"></div>
            <div class="word">{{ item.name }}</div>
            <div class="line"></div>
          </div>
          <div class="itemBox">
            <div
              class="item"
              v-for="citem in item.children"
              :key="citem.id"
              @click="itemClick(citem)"
            >
              <div class="imgBox">
                <img :src="citem.pic" alt="" />
              </div>
              <div class="name">{{ citem.cate_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 0,
    };
  },
  methods: {
    clickTo(index) {
      document.querySelector("#index" + index).scrollIntoView(true);
    },
    itemClick(item) {
      this.$router.push({
        path: "/search",
        query: { id: item.id, title: item.cate_name },
      });
    },
  },
};
</script>


<style lang="less">
@import "../assets/less/variable.less";
.classifyList {
  background-color: @bgColor2;
  display: flex;
  overflow: hidden;

  .classifyAside {
    width: 90px;
    background-color: @bgColor4;
  }

  .asideItem {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: @bgColor4;
    box-sizing: border-box;
  }

  .active {
    border-left: 3px solid @borderColor2;
    background-color: @bgColor2;
    color: @color4;
  }

  .classifyInfo {
    flex: 1;
    overflow-y: scroll;
    scroll-behavior: smooth;
    background-color: @bgColor2;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: @padding2 0;

    .line {
      width: 60px;
      height: 1px;
      background-color: @color5;
      margin: 0 @margin2;
    }

    .word {
      color: @color1;
      font-size: 15px;
      font-weight: bold;
    }
  }

  .itemBox {
    display: flex;
    flex-wrap: wrap;
    margin: @margin2 0 @margin2 @margin1;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
    margin: @margin1 0;

    .name {
      color: @color1;
      font-size: 13px;
      text-align: center;
      margin-top: @margin1;
    }
  }

  .imgBox {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>