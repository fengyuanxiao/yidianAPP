<template>
  <div class="commonForm changePhoneBind">
    <user-header :title="'修改手机绑定'"></user-header>
    <div class="loginForm">
      <template v-if="first">
        <group title>
          <x-input title="原手机号码" v-model.trim.trim="userInfo.mobile" type="tel" placeholder="请输入原手机号">
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
          <x-input title="短信验证码" v-model.trim="userInfo.scode" placeholder="短信验证码">
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
        <x-button type="primary" @click.native="nextChangePhone" class="loginbtn">下一步</x-button>
      </template>
      <template v-else>
        <group title>
          <x-input title="新手机号码" v-model.trim.trim="userInfo.mobile" type="tel" placeholder="请输入新手机号">
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
          <x-input title="登录密码" v-model.trim="userInfo.password" type="password" placeholder="登录密码"></x-input>
        </group>
        <x-button type="primary" @click.native="changePhone" class="loginbtn">立即修改</x-button>
      </template>
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
      first: true,
      loginUserInfo: {},
      userInfo: {
        mobile: "",
        scode: "",
        captcha: "",
        password: "",
        smscode: ""
      },
      timer: null
    };
  },
  async mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (token) {
      this.loginUserInfo = JSON.parse(
        this.$utils.cookies.getCookie("userInfo") || "{}"
      );
      this.getCodeUrl();
    }
  },
  beforeDestroy () {
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
    // 第二步
    async changePhone() {
      if (this.userInfo.mobile === "") {
        this.$vux.toast.text("请输入新手机号");
      } else if (this.userInfo.captcha === "") {
        this.$vux.toast.text("请输入图形验证码");
      } else if (this.userInfo.smscode === "") {
        this.$vux.toast.text("请输入短信验证码");
      } else if (this.userInfo.password === "") {
        this.$vux.toast.text("请输入登录密码");
      } else {
        let result = await this.axios.post(
          "/api/index/changemobileTwo",
          this.userInfo
        );
        if (result && result.status) {
          this.$vux.toast.show({ text: "手机号修改成功", type: "success" });
          this.$set(this.loginUserInfo, "mobile", this.userInfo.mobile);
          this.$utils.cookies.setCookie(
            "userInfo",
            JSON.stringify(this.loginUserInfo)
          );
          setTimeout(_ => {
            this.first = true;
            this.$router.back();
          }, 1500);
        }
      }
    },
    // 第一步
    async nextChangePhone() {
      if (this.userInfo.mobile === "") {
        this.$vux.toast.text("请输入原手机号");
      } else if (this.userInfo.captcha === "") {
        this.$vux.toast.text("请输入图形验证码");
      } else if (this.userInfo.scode === "") {
        this.$vux.toast.text("请输入短信验证码");
      } else {
        let result = await this.axios.post("/api/index/changemobile", {
          smscode: this.userInfo.scode
        });
        if (result && result.status) {
          this.first = false;
          this.userInfo.mobile = "";
          this.userInfo.captcha = "";
          clearInterval(this.timer);
          this.count = 60;
          this.dxcode = "获取验证码";
          await this.getCodeUrl();
        }
      }
    }
  }
};
</script>
<style lang="less">
.changePhoneBind {
}
</style>
