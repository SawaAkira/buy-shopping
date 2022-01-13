<template>
  <div class="personal">
    <div class="personal_bg"  v-if="$store.state.isPersonalShow">
      <div class="bg_top"></div>
      <div class="bg_bottom"></div>
    </div>
    <div class="personal_top" v-if="$store.state.isPersonalShow">
      <div class="uesrInfo">
        <div class="userImgBox">
          <img :src="userInfo.avatar" alt="">
        </div>
        <div class="usertext">
          <div class="userName">
            <span class="text_ellipsis">{{userInfo.nickname}}</span>
            <i class="bi bi-pencil-square" @click="$router.push('/user/info')"></i>
          </div>
          <div class="userId">ID:{{userInfo.uid}}</div>
        </div>
      </div>
      <div class="setUp" @click="$router.push('/user/info')"></div>
    </div>
    <div class="wrapper" v-if="$store.state.isPersonalShow">
      <div class="wealth">
        <div class="balance">
          <div class="name">我的钱包</div>
          <div class="num">{{userInfo.now_money}}</div>
        </div>
        <div class="commission">
          <div class="name">优惠券</div>
          <div class="num">{{userInfo.couponCount}}</div>
        </div>
        <router-link class="discount" to="user/collect">
          <div class="name">我的收藏</div>
          <div class="num">······</div>
        </router-link>
      </div>
      <user-order></user-order>
    </div>
    <span class="loading" v-if="!$store.state.isPersonalShow"></span>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import UserOrder from "@/components/comp-userorder";
export default {
  data(){
    return{
      userInfo: "",
      userOrderList: [],
    }
  },
  components: {
    UserOrder,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      get("../data/userOrder.json")
        .then((response) => {
          let res = response.data;
          if (res.status == 200) {
            let data = res.data;
            this.userOrderList = data;
            this.getInfo();
          }
        });
      
    },
    getInfo(){
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/user`,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200){
          this.userInfo = data.data.data;
          this.$store.dispatch("personal/setUserInfoAsync", this.userInfo);
          this.addNum();
        } else {
          if(data.data.msg == "登录已过期,请重新登录"){
            localStorage.removeItem("token");
          }
        }
      });
    },
    addNum(){
      let list = this.userOrderList.list;
      let {unpaid_count,unshipped_count,received_count,evaluated_count,refund_count} = this.userInfo.orderStatusNum;
      let arr = [unpaid_count,unshipped_count,received_count,evaluated_count,refund_count];
      list.forEach((item,index) => {
        item.num = arr[index];
        item.link = "/user/order/" + index;
      });
      this.userOrderList.list = list;
      this.$store.dispatch("setPersonalShowAsync", true);
      this.$store.dispatch("personal/setUserOrderAsync", this.userOrderList);
    },
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      document.title = to.meta.title;
      next();
    } else {
      sessionStorage.setItem("toPath", to.path);
      next({ path: "/login" });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setPersonalShowAsync", false);
    next();
  },
};
</script>

<style lang="less">
@import "../../assets/less/variable.less";
.personal {
  background-color: @bgColor4;
  position: relative;
  height: 100%;

  .personal_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;

    .bg_top {
      width: 100%;
      height: 100px;
      background-color: @bgColor3;
    }

    .bg_bottom {
      width: 100%;
      height: 30px;
      border-radius: 0 0 30px 30px;
      background-color: @bgColor3;
    }
  }
  .loading{
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../assets/loader.gif) no-repeat 0 0/cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.personal_top{
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding: @padding3;

  .uesrInfo{
    display: flex;
    align-items: center;
    
  }

  .userImgBox{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: @margin3;

      img{
        width: 100%;
        height: 100%;
        display: block;
      }
  }

  .usertext{
    font-size: 16px;
    width: 200px;
    overflow: hidden;

    .userName{
      display: flex;
      align-items: flex-end;
      color: @color2;
    }

    .userId{
      color: @color5;
      font-size: 13px;
      margin-top: @margin1;
    }

    i{
      flex: none;
      font-size: 12px;
      margin-left: @margin1;
    }

    span{
      display: block;
    }
  }

  .setUp{
    width: 25px;
    height: 25px;
    background: url(../../assets/img/personal/setup.png) no-repeat 0 0/cover;
  }
}
.wrapper{
  padding: 0 @padding2;
  
  & >div:nth-child(2){
    margin-top: @margin2;
  }
}
.wealth{
  position: relative;
  z-index: 1;
  display: flex;
  background-color: @bgColor2;
  border-radius: 5px;

  .balance,
  .commission,
  .discount{
    flex: 1;
    text-align: center;
    padding: @padding3 0;
    position: relative;

    .name{
      font-size: 14px;
      color: @color5;
    }

    .num{
      font-size: 18px;
      color: @color1;
    }
  }

  .balance::after,
  .commission::after{
    content: "";
    display: block;
    width: 0;
    height: 40px;
    border: 1px solid @borderColor1;
    position: absolute;
    right: -0.5px;
    top: calc(50% - 40px / 2);
  }
}
</style>