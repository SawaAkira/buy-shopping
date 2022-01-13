<template>
  <div class="userInfo">
    <div class="userHeader" v-if="$store.state.isUserInfoShow">
      <p>管理我的账号</p>
      <div class="userBox">
        <label class="imgbox">
          <img :src="image" alt="" />
          <input
            type="file"
            name="file"
            accept="image/*"
            @change="getPhoto"
            ref="image"
          />
          <i class="bi bi-pencil-square"></i>
        </label>
        <div class="textBox">
          <div class="userName">{{ userInfo.nickname }}</div>
          <div class="phone">绑定手机号：{{ userInfo.phone }}</div>
        </div>
        <span>当前账号</span>
      </div>
    </div>
    <div class="userMain" v-if="$store.state.isUserInfoShow">
      <div class="name">
        <span>昵称</span>
        <input type="text" placeholder="请输入昵称" v-model="userName" />
      </div>
      <div class="uid">
        <span>ID</span>
        <p>{{ userInfo.uid }}<i class="bi bi-lock"></i></p>
      </div>
      <div class="phone">
        <span>手机号码</span>
        <p>{{ userInfo.phone }}<i class="bi bi-lock"></i></p>
      </div>
      <div class="password">
        <span>密码</span>
        <p>点击修改密码<i class="bi bi-chevron-right"></i></p>
      </div>
      <div class="address">
        <span>收货地址</span>
        <p>点击修改收货地址<i class="bi bi-chevron-right"></i></p>
      </div>
    </div>
    <div class="saveInfo" v-if="$store.state.isUserInfoShow" @click="saveInfo">
      保存修改
    </div>
    <div class="logOut" v-if="$store.state.isUserInfoShow" @click="logOut">
      退出登录
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
      image: "",
      userName: "",

      oldName: "",
      isImgChange: false,
      isNameChange: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$store.state.personal.userInfo.length != 0) {
        this.$store.dispatch("setUserInfoShowAsync", true);
        this.userInfo = this.$store.state.personal.userInfo;
        this.image = this.$store.state.personal.userInfo.avatar;
        this.userName = this.$store.state.personal.userInfo.nickname;
        this.oldName = this.userName;
      } else {
        this.getInfo();
      }
    },
    getInfo() {
      let token = this.$store.state.token;
      axios({
        method: "GET",
        url: `http://47.115.51.185/api/user`,
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.userInfo = data.data.data;
          this.image = this.userInfo.avatar;
          this.userName = this.userInfo.nickname;
          this.oldName = this.userName;
          this.$store.dispatch("setUserInfoShowAsync", true);
          this.$store.dispatch("personal/setUserInfoAsync", this.userInfo);
        }
      });
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("expires_time");
      this.$router.push("/login");
    },
    getPhoto() {
      this.isImgChange = true;
      // 上传头像
      let file = this.$refs.image.files[0];
      let formData = new FormData();
      formData.append("file", file);
      let token = this.$store.state.token;
      axios({
        method: "POST",
        url: `http://47.115.51.185/api/upload/image`,
        data: formData,
        headers: {
          "Authori-zation": "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.image = data.data.data.url;
        }
      });
    },
    saveInfo() {
      if (this.oldName == this.userName && !this.isImgChange) {
        this.noSaveTip("没有发现修改内容");
      } else {
        this.oldName = this.userName;
        this.isImgChange = false;
        let token = this.$store.state.token;
        axios({
          method: "POST",
          url: `http://47.115.51.185/api/user/edit`,
          data: {
            avatar: this.image,
            nickname: this.userName,
          },
          headers: {
            "Authori-zation": "Bearer " + token,
          },
        }).then((data) => {
          if (data.data.status == 200) {
            this.saveTip("保存成功");
          }
        });
      }
    },
    saveTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
          this.$router.go(0);
        }
      }, 1000);
    },
    noSaveTip(tip) {
      this.$store.dispatch("setErrorTipShowAsync", true);
      this.$store.dispatch("setErrorTipAsync", tip);
      let d = setTimeout(() => {
        this.$store.dispatch("setErrorTipShowAsync", false);
        if (!this.$store.state.isErrorTipShow) {
          clearInterval(d);
        }
      }, 1000);
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
};
</script>


<style lang="less">
@import "../../assets/less/variable.less";
.userInfo {
  height: 100%;
  background-color: @bgColor4;
  .userHeader {
    background-color: @bgColor2;
    padding: @padding3;

    p {
      color: @color1;
      font-size: 16px;
    }
  }

  .userBox {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid @borderColor2;
    background-color: rgba(7, 135, 243, 0.2);
    padding: @padding3;
    border-radius: 10px;
    margin-top: @margin3;
    position: relative;
    overflow: hidden;

    span {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      padding: 3px 8px;
      font-size: 12px;
      color: @color4;
      background-color: rgba(7, 135, 243, 0.2);
      border-radius: 0 10px 0 10px;
    }
  }

  .imgbox {
    width: 50px;
    height: 50px;
    margin-right: @margin2;
    position: relative;

    input {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
      border-radius: 50%;
    }

    i{
      color: @color4;
      background-color: @bgColor2;
      font-size: 12px;
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 0 2px;
      border-radius: 50%;
    }
  }

  .textBox {
    .userName {
      color: @color1;
      font-size: 15px;
    }

    .phone {
      color: @color7;
      font-size: 12px;
      margin-top: @margin1;
    }
  }

  .userMain {
    margin-top: @margin1;
    padding: 0 @padding3;
    background-color: @bgColor2;

    input {
      color: @color7;
      outline: none;
      border: none;
      text-align: right;
      font-size: 16px;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      padding: @padding3 0;
      box-sizing: border-box;
      border-bottom: 1px solid @borderColor1;

      span {
        color: @color1;
        font-size: 16px;
      }

      p {
        color: @color7;
        font-size: 16px;
      }

      i {
        margin-left: @margin2;
      }
    }
  }
  .saveInfo {
    color: @color4;
    background-color: @bgColor2;
    box-sizing: border-box;
    border: 1px solid @borderColor2;
    margin: 40px @margin3 0;
    padding: @padding2 0;
    font-size: 18px;
    text-align: center;
    border-radius: 22px;
  }
  .logOut {
    color: @color2;
    background-color: @bgColor3;
    margin: 15px @margin3 0;
    padding: @padding2 0;
    font-size: 18px;
    text-align: center;
    border-radius: 22px;
  }
}
</style>