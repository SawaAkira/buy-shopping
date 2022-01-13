<template>
  <div class="detailCount">
    <div class="chooseName">数量</div>
    <div class="countBox">
      <div
        class="reduce"
        @click="reduceNum"
        :class="isDisabled ? 'disabled' : ''"
      >
        <i class="bi bi-dash"></i>
      </div>
      <div class="num">
        <input type="number" v-model="num" @blur="changeNum" />
      </div>
      <div class="plus" @click="plusNum"><i class="bi bi-plus"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      isDisabled: false,
    };
  },
  methods: {
    changeNum() {
      if (!/^\d*$/.test(this.num)) {
        this.num = 1;
      } else if (!this.num || this.num < 1) {
        this.num = 1;
      }
      if (this.num > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      this.saveNum(this.num);
    },
    plusNum() {
      this.num++;
      if (this.num > 1) {
        this.isDisabled = false;
      }
      this.saveNum(this.num);
    },
    reduceNum() {
      this.num--;
      if (this.num <= 1) {
        this.num = 1;
        this.isDisabled = true;
      }
      this.saveNum(this.num);
    },
    saveNum(num) {
        this.$store.dispatch("detail/setChooseNumAsync", num);
    },
  },
  created() {
    if (this.num == 1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  },
};
</script>


<style lang="less">
@import "../assets/less/variable.less";
.detailCount {
  .chooseName {
    font-size: 15px;
    color: @color7;
    margin-bottom: @margin1;
  }

  .countBox {
    display: flex;
  }

  .reduce,
  .plus,
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    box-sizing: border-box;
    color: @color4;
    border: 1px solid @color4;
    font-size: 16px;
    background-color: @bgColor2;
    padding: 3px 0;
  }

  .reduce {
    border-right: 0;
    border-radius: 2px 0 0 2px;
  }

  .plus {
    border-left: 0;
    border-radius: 0 2px 2px 0;
  }

  .num {
    input {
      color: @color4;
      display: block;
      width: 100%;
      outline: none;
      border: none;
      text-align: center;
    }
  }

  .disabled {
    color: @color5;
    border: 1px solid @color5;
    border-right: 0;
  }
}
</style>