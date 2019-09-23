<template>
  <div class="commonForm registerBox">
    <div class="userImg">
      <img src="@/assets/img/xhxlogo.png" alt />
    </div>
    <div class="loginForm">
      <group title>
        <x-input title="手机号码" v-model.trim.trim="userInfo.mobile" type="tel" placeholder="请输入您的手机号">
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
        <x-input title="短信验证码" v-model.trim="userInfo.smscode" placeholder="短信验证码">
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
        <x-input title="新密码" v-model.trim="userInfo.password" type="password" placeholder="请输入登录密码">
          <!-- <span class="font-suo" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input
          title="确认密码"
          v-model.trim="userInfo.repassword"
          type="password"
          placeholder="请输入确认密码"
        >
          <!-- <span class="font-querenmima" slot="label"></span> -->
        </x-input>
      </group>
      <x-button type="primary" @click.native="forgetPsd" class="loginbtn">找回密码</x-button>
      <div class="goInfo">
        <router-link to="/h5/register" class="go">没有账号？立即注册</router-link>
        <span>|</span>
        <router-link to="/h5/login" class="go">立即登录</router-link>
      </div>
      <!-- <x-button @click.native="$router.push('/h5/register')" class="loginbtn">免费注册</x-button> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 60,
      dxcode: "获取验证码",
      code_capt: {},
      userInfo: {
        mobile: "",
        password: "",
        repassword: "",
        smscode: "",
        captcha: ""
      },

      timer: null,
      ico: {
        username: require("@/assets/img/username.png"),
        lock: require("@/assets/img/lock.png")
      }
    };
  },
  async mounted() {
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
    async getCodeUrl() {
      let result = await this.axios.get("/api/user/getcaptcha");
      if (result && result.status) {
        this.code_capt = result.data;
      }
    },
    //获取短信验证码
    async getDuanxinCode() {
      if (this.count === 60) {
        await this.axios.post("/api/user/sendcode", {
          sid: this.code_capt.sid,
          tuCode: this.userInfo.captcha,
          phoneNum: this.userInfo.mobile
        });
        this.getCodeTime();
        this.$vux.toast.show({
          text: "短信验证码已发送",
          type: "success"
        });
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
    async forgetPsd() {
      if (this.userInfo.mobile === "") {
        this.$vux.toast.text("请输入手机号");
      } else if (this.userInfo.captcha === "") {
        this.$vux.toast.text("请输入图形验证码");
      } else if (this.userInfo.smscode === "") {
        this.$vux.toast.text("请输入短信验证码");
      } else if (this.userInfo.password === "") {
        this.$vux.toast.text("请输入密码");
      } else if (this.userInfo.repassword === "") {
        this.$vux.toast.text("请输入确认密码");
      } else if (this.userInfo.repassword !== this.userInfo.password) {
        this.$vux.toast.text("两次密码不一致");
        this.userInfo.password = "";
        this.userInfo.repassword = "";
      } else {
        let result = await this.axios.post(
          "/api/user/forgetPwd",
          this.userInfo
        );
        if (result && result.status) {
          this.$vux.toast.show({ text: "密码修改成功", type: "success" });
          setTimeout(() => {
            this.$router.replace("/h5/login");
          }, 1500);
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
</style>
