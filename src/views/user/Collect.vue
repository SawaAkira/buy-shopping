<template>
  <div class="userCollect" ref="collect">
    <div class="collectBox">
      <router-link
        class="collectItem"
        v-for="item in collectInfo"
        :key="item.pid"
        :to="'/detail/' + item.pid"
      >
        <div class="c_imgBox">
          <img :src="item.image" :onerror="errorImg" alt="" />
        </div>
        <div class="c_textBox">
          <div class="title text_ellipsis">{{ item.store_name }}</div>
          <div class="textBottom">
            <div class="price">￥{{ item.price }}</div>
            <div class="btn" @click.prevent="delCollect(item.pid)">
              取消收藏
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="defaultTip" v-if="defaultTip"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 20,
      collectInfo: [],
      times: 0,
      errorImg: 'this.src="' + require('../../assets/error.gif') + '"',
      defaultTip: false,
    };
  },
  methods: {
    getCollect() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/collect/user`,
        params: {
          page: this.page,
          limit: this.limit,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.times++;
          if (!this.collectInfo.length) {
            this.collectInfo = data.data.data;
          } else {
            this.collectInfo = [...this.collectInfo, ...data.data.data];
          }
          if(!this.collectInfo.length){
              this.defaultTip = true;
          } else {
              this.defaultTip = false;
          }
        }
      });
    },
    delCollect(id) {
      let token = this.$store.state.token;
      axios({
        method: "POST",
        url: `http://47.115.51.185/api/collect/del`,
        data: {
          category: "product",
          id,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.delTip("取消成功");
          this.collectInfo.forEach((item, index) => {
            if (item.pid == id) {
              this.collectInfo.splice(index, 1);
            }
          });
          if(!this.collectInfo.length){
              this.defaultTip = true;
          } else {
              this.defaultTip = false;
          }
        }
      });
    },
    delTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
        }
      }, 2000);
    },
    handleScroll() {
      this.$nextTick(() => {
        if (this.$refs.collect) {
          let ch = this.$refs.collect.clientHeight;
          let st = this.$refs.collect.scrollTop;
          let sh = this.$refs.collect.scrollHeight;
          let d = setTimeout(() => {
            if (ch + st == sh) {
              if (this.collectInfo.length >= this.times * this.limit) {
                this.page++;
                this.getCollect();
              }
            }
          }, 300);
        }
      });
    },
  },
  created() {
    this.getCollect();
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less">
@import "../../assets/less/variable.less";
.userCollect {
  background-color: @bgColor4;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  
  .defaultTip {
    width: 150px;
    height: 150px;
    background: url(../../assets/img/cart_default.png) no-repeat 0 0 / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.collectBox {
  background-color: @bgColor2;
  padding: 0 @padding3;
  .collectItem {
    display: flex;
    font-size: 14px;
    overflow: hidden;
    padding: @padding3 0;
    box-sizing: border-box;
    border-bottom: 1px solid @borderColor1;
  }

  .c_imgBox {
    flex: none;
    height: 70px;
    width: 70px;
    margin-right: @margin3;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .c_textBox {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: @color1;
  }

  .textBottom {
    display: flex;
    justify-content: space-between;

    .price {
      color: @color6;
    }

    .btn {
      color: @color4;
      background-color: @bgColor2;
      border: 1px solid @borderColor2;
      box-sizing: border-box;
      padding: 2px @padding2;
      border-radius: 5px;
    }
  }
}
</style>