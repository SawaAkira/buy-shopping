<template>
  <div class="login">
    <div class="login_bg"></div>
    <div class="logo"><img src="../assets/logo.png" alt="" /></div>
    <div class="loginInput">
      <div class="inputItem">
        <i class="bi bi-phone"></i>
        <input type="text" placeholder="请输入手机号码" v-model="uesrPhone" />
      </div>
      <div class="inputItem">
        <i class="bi bi-lock"></i>
        <input type="password" placeholder="请输入账户密码" v-model="uesrPwd" />
      </div>
      <div class="btn" @click="userLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/http";
export default {
  data() {
    return {
      uesrPhone: "",
      uesrPwd: "",
      toPath: "",
    };
  },
  methods: {
    userLogin() {
      if (this.uesrPhone && this.uesrPwd) {
        if (!/^1[3-9]\d{9}$/.test(this.uesrPhone)) {
          this.errorTip("手机号码输入错误");
        } else if (!/^[0-9A-Za-z]{6,11}$/.test(this.uesrPwd)) {
          this.errorTip("密码格式输入错误");
        } else {
          post("http://47.115.51.185/api/login", {
            account: this.uesrPhone,
            password: this.uesrPwd,
          }).then((response) => {
            let res = response.data;
            if (res.status == 200) {
              let token = res.data.token;
              let expires_time = res.data.expires_time;
              localStorage.setItem("expires_time", expires_time);
              localStorage.setItem("token", token);
              if(this.toPath != ""){
                this.$router.push({ path: this.toPath });
              } else {
                this.$router.push({ path: '/home' });
              }
            } else if (res.status == 400) {
              this.errorTip("账号或密码输入错误");
            }
          });
        }
      } else {
        this.errorTip("输入框不能为空");
      }
    },
    errorTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
        }
      }, 1500);
    },
  },
  created() {
    if (sessionStorage.getItem("toPath")) {
      this.toPath = sessionStorage.getItem("toPath");
      sessionStorage.removeItem("toPath");
    }
  },
  beforeRouteEnter(to, from, next) {
    document.title = to.meta.title;
    next();
  },
};
</script>



<style lang="less">
@import "../assets/less/variable.less";
.login {
  height: 100%;
  position: relative;
  background-image: linear-gradient(
    to bottom,
    #0787f3,
    #7fa1f6,
    #9caff7,
    #b5bef8,
    #cbcdfa,
    #deddfb,
    #ffffff
  );

  .login_bg {
    width: 100%;
    height: 150px;
    background: url(../assets/img/login_bg.png) no-repeat 0 0 / cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .logo {
    width: 200px;
    margin: 0 auto;
    padding: 100px 0 40px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .loginInput {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    padding: @padding3;
    border-radius: 10px;

    .inputItem {
      display: flex;
      padding: @padding3 0 @padding1;
      border-bottom: 1px solid @color5;
      margin-top: @margin1;
    }

    i {
      font-size: 16px;
      padding: 0 @padding2;
    }

    input {
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 16px;
      flex: 1;
    }

    .btn {
      text-align: center;
      color: @color2;
      font-size: 18px;
      font-weight: bold;
      padding: 8px 0;
      margin-top: 30px;
      border-radius: 20px;
      background-color: @bgColor3;
    }
  }
}
</style>