<template>
  <div
    class="jumpPoint"
    ref="jumpPoint"
    @touchstart="pointDown"
    @touchmove="pointMove"
  >
    <div class="pointImgBox" @click="pointToggle = !pointToggle">
      <img src="../assets/img/classify_white.png" alt="" />
    </div>
    <div :style="`width:${pointToggle == false ? '0px' : '320%'}`">
      <div class="jumpList">
        <keep-alive>
          <router-link to="/home" active-class="active">
            <div class="tabImgBox"></div>
          </router-link>
        </keep-alive>
        <router-link to="/cart" active-class="active">
          <div class="tabImgBox"></div>
        </router-link>
        <router-link to="/personal" active-class="active">
          <div class="tabImgBox"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointToggle: false,
      mouseP: 0,
    };
  },
  methods: {
    pointDown(e) {
      let ot = this.$refs.jumpPoint.offsetTop;
      let cy = e.targetTouches[0].clientY;
      this.mouseP = cy - ot;
    },
    pointMove(e) {
      e.preventDefault();
      let cy = e.targetTouches[0].clientY;
      let ch = document.documentElement.clientHeight;
      if (cy >= ch * 0.1 && cy <= ch * 0.9) {
        this.$refs.jumpPoint.style.top =
          e.targetTouches[0].clientY - this.mouseP + "px";
      }
    },
  },
};
</script>


<style lang="less">
@import "../assets/less/variable.less";
.jumpPoint {
  background-color: @bgColor3;
  border-radius: 50%;
  position: relative;

  .pointImgBox {
    width: 32px;
    height: 32px;
    padding: @padding1;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }

  & > div:nth-child(2) {
    position: absolute;
    top: 0;
    right: 50px;
    background-color: @bgColor3;
    border-radius: 42px;
    transition: all 0.2s linear;
    overflow: hidden;
  }

  .jumpList {
    padding: @padding1;
    display: flex;
    justify-content: space-around;

    a {
      display: flex;
      width: 32px;
      height: 32px;
      align-items: center;
    }

    .tabImgBox {
      width: 24px;
      height: 24px;
      margin: 0 auto;
    }

    a.active {
      background-color: @bgColor2;
      border-radius: 50%;
    }

    a:nth-child(1) .tabImgBox {
      background: url(../assets/img/home_white.png) no-repeat 0 0 / cover;
    }

    a:nth-child(2) .tabImgBox {
      background: url(../assets/img/cart_white.png) no-repeat 0 0 / cover;
    }

    a:nth-child(3) .tabImgBox {
      background: url(../assets/img/personal_white.png) no-repeat 0 0 / cover;
    }

    a:nth-child(1).active .tabImgBox {
      background: url(../assets/img/home_blue.png) no-repeat 0 0 / cover;
    }

    a:nth-child(2).active .tabImgBox {
      background: url(../assets/img/cart_blue.png) no-repeat 0 0 / cover;
    }

    a:nth-child(3).active .tabImgBox {
      background: url(../assets/img/personal_blue.png) no-repeat 0 0 / cover;
    }
  }
}
</style>