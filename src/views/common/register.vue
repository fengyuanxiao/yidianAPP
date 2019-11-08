<template>
  <div class="commonForm registerBox">
    <div class="userImg">
      <img src="@/assets/img/xhxlogo.png" alt />
    </div>
    <div class="loginForm">
      <group title>
        <x-input @on-blur="showText" title="手机号码" v-model.trim="userInfo.phoneNum" type="tel" placeholder="请输入您申请银行卡时所预留手机号">
          <!-- <span class="font-icon" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input title="图形验证码" v-model.trim="userInfo.captcha" placeholder="图形验证码">
          <!-- <span class="font-yanzhengma" slot="label"></span> -->
          <img @click="getCodeUrl" slot="right-full-height" :src="code_capt.captcha_src" />
        </x-input>
      </group>
      <group title>
        <x-input title="短信验证码" v-model.trim="userInfo.tuCode" placeholder="短信验证码">
          <!-- <span class="font-mima" slot="label"></span> -->
          <x-button
            slot="right-full-height"
            mini
            plain
            @click.native="getDuanxinCode"
            type="primary"
          >{{dxcode}}</x-button>
        </x-input>
      </group>
      <group title>
        <x-input
          title="登录密码"
          v-model.trim="userInfo.loginpassword"
          type="password"
          placeholder="请输入登录密码"
        >
          <!-- <span class="font-suo" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input
          title="确认密码"
          v-model.trim="userInfo.aloginpassword"
          type="password"
          placeholder="请输入确认密码"
        >
          <!-- <span class="font-querenmima" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input
          title="邀请码"
          v-model.trim="userInfo.yqcode"
          placeholder="请输入邀请码"
          :disabled="Boolean($route.query.code)"
        >
          <!-- <span class="font-yaoqingma" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input title="QQ号" v-model.trim="userInfo.QQnum" placeholder="请输入QQ号">
          <!-- <span class="font-qq" slot="label"></span> -->
        </x-input>
      </group>
      <x-button type="primary" @click.native="register" class="loginbtn">立即注册</x-button>
      <div class="goInfo">
        <router-link to="/h5/forgetpsw" class="go">忘记密码？</router-link>
        <span>|</span>
        <router-link to="/h5/login" class="go">立即登录</router-link>
      </div>
      <!-- <x-button @click.native="$router.push('/h5/register')" class="loginbtn">免费注册</x-button> -->
    </div>
    <x-dialog v-model.trim="isShow" class="imgDialog" @click.native="goDown">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/hongbao.png" alt="实例" />
      </div>
    </x-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      count: 60,
      dxcode: "获取验证码",
      code_capt: {},
      userInfo: {
        phoneNum: "",
        loginpassword: "",
        aloginpassword: "",
        tuCode: "",
        yqcode: this.$route.query.code || "",
        captcha: "",
        QQnum: "",
        user_address_book: "",
        user_unique_code: "",
        register_from: 0,
        timer: null
      },
      error: false,
      ico: {
        username: require("@/assets/img/username.png"),
        lock: require("@/assets/img/lock.png")
      }
    };
  },
  async mounted() {
    const uuid = localStorage.getItem("unique_code");
    if (!uuid) {
      this.$utils.tools.getUnique_code();
    }
    this.userInfo.user_unique_code = localStorage.getItem("unique_code");
    const user_address_book = localStorage.getItem("user_address_book");
    if (!user_address_book) {
      this.$utils.tools.getPhoneList();
    }
    this.userInfo.user_address_book = localStorage.getItem("user_address_book");
    let token = this.$utils.cookies.getCookie("token");
    if (token) {
      this.$router.replace("/h5/main");
    } else {
      this.getCodeUrl();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    goDown() {
      window.location.href ="https://fir.im/mpgd"
        // "https://dowmload.kouziapp.com/Hp_yidianzhengqian/downloadWeb.html";
    },
    async showText(){
      this.$vux.toast.text("请输入您申请银行卡时所预留手机号");
    },
    async getCodeUrl() {
      let result = await this.axios.get("/api/user/getcaptcha");
      if (result && result.status) {
        this.code_capt = result.data;
      }
    },
    //获取短信验证码
    async getDuanxinCode() {
      if (this.count === 60) {
        let result=await this.axios.post("/api/user/sendcode", {
          sid: this.code_capt.sid,
          tuCode: this.userInfo.captcha,
          phoneNum: this.userInfo.phoneNum
        });
        
        if(result.status== false){
          this.$vux.toast.text(result.msg)
        } else if(result.status== true){
          this.getCodeTime();
          this.$vux.toast.show({
          text: "短信验证码已发送",
          type: "success"
          });
        }
       
      }
    },
    // 短信倒计时
    getCodeTime() {
      this.timer = setInterval(_ => {
        if (this.count > 0) {
          this.dxcode = this.count + "秒";
          this.count--;
        } else {
          clearInterval(this.timer);
          this.count = 60;
          this.dxcode = "重新获取";
        }
      }, 1000);
    },
    async register() {
      if (this.userInfo.phoneNum === "") {
        this.$vux.toast.text("请输入手机号");
      } else if (this.userInfo.captcha === "") {
        this.$vux.toast.text("请输入图形验证码");
      } else if (this.userInfo.tuCode === "") {
        this.$vux.toast.text("请输入短信验证码");
      } else if (this.userInfo.loginpassword === "") {
        this.$vux.toast.text("请输入密码");
      } else if (this.userInfo.aloginpassword === "") {
        this.$vux.toast.text("请输入确认密码");
      } else if (this.userInfo.aloginpassword !== this.userInfo.loginpassword) {
        this.$vux.toast.text("两次密码不一致");
        this.userInfo.loginpassword = "";
        this.userInfo.aloginpassword = "";
      } else if (this.userInfo.yqcode === "") {
        this.$vux.toast.text("请输入邀请码");
      } else if (this.userInfo.QQnum === "") {
        this.$vux.toast.text("请输入QQ号");
      } else {
        let result = await this.axios.post("/api/user/register", this.userInfo);
        if (result && result.status) {
          try {
            if (plus) {
              // this.$utils.cookies.setCookie(
              //   "userInfo",
              //   JSON.stringify(result.user_info)
              // );
              // this.$utils.cookies.setCookie("token", result.token);
              this.$vux.toast.show({ text: "注册成功", type: "success" });
              setTimeout(() => {
                this.$router.replace("/h5/login");
              }, 1500);
            } else {
              this.isShow = true;
            }
          } catch (e) {
            this.isShow = true;
          }
        }
      }
    }
  }
};
</script>
<style lang="less">
.registerBox {
  .userImg {
    padding-top: 20px;
  }
}
.imgDialog {
  width: 80%;
  .weui-dialog {
    background: transparent;
    border-radius: 16px;
  }
  img {
    display: block;
    width: 100%;
    border-radius: 16px;
  }
}
</style>
