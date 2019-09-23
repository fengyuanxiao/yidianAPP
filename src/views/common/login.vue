<template>
  <div class="commonForm loginBox">
    <div class="userImg">
      <img src="@/assets/img/xhxlogo.png" alt />
    </div>
    <div class="loginForm">
      <group title>
        <x-input title v-model.trim.trim="userInfo.mobile" type="tel" placeholder="请输入您的手机号">
          <span class="font-icon" slot="label"></span>
        </x-input>
      </group>
      <group title>
        <x-input title v-model.trim="userInfo.password" type="password" placeholder="请输入您的密码">
          <span class="font-suo" slot="label"></span>
        </x-input>
      </group>
      <group>
        <x-switch title="记住密码" v-model="remember" @on-change="changeRem"></x-switch>
      </group>
      <x-button type="primary" @click.native="login" class="loginbtn">登录</x-button>
      <div class="goInfo">
        <router-link to="/h5/forgetpsw" class="go">忘记密码？</router-link>
        <span>|</span>
        <router-link to="/h5/register" class="go">免费注册</router-link>
      </div>
      <!-- <x-button @click.native="$router.push('/h5/register')" class="loginbtn">免费注册</x-button> -->
    </div>
  </div>
</template>
<script>
import { XSwitch } from "vux";
export default {
  components: {
    XSwitch
  },
  data() {
    return {
      remember:false,
      userInfo: {
        mobile: "",
        password: ""
      },
      error: false,
      ico: {
        username: require("@/assets/img/username.png"),
        lock: require("@/assets/img/lock.png")
      }
    };
  },
  async mounted() {
    const formData=JSON.parse(this.$utils.storage.get('remember')||'{}')
    if(formData.mobile){
      this.remember=true
      this.userInfo=formData
    }else{
      this.remember=false
    }
    const uuid = localStorage.getItem("unique_code");
    if (!uuid) {
      this.$utils.tools.getUnique_code();
    }
    const user_address_book = localStorage.getItem("user_address_book");
    if (!user_address_book) {
      this.$utils.tools.getPhoneList();
    }
    let token = this.$utils.cookies.getCookie("token");
    if (token) {
      this.$router.replace("/h5/main");
    }
  },
  methods: {
    changeRem(val){
      if(val){
         this.$utils.storage.set('remember',JSON.stringify(this.userInfo))
      }else{
        this.$utils.storage.remove('remember')
      }
    },
    async login() {
      if (this.userInfo.mobile === "") {
        this.$vux.toast.text("请输入手机号");
      } else if (this.userInfo.password === "") {
        this.$vux.toast.text("请输入密码");
      } else {
        this.changeRem(this.remember)
        let result = await this.axios.post("/api/user/login", this.userInfo);
        if (result && result.status) {
          this.$utils.cookies.setCookie(
            "userInfo",
            JSON.stringify(result.user_info)
          );
          this.$utils.cookies.setCookie("token", result.token);
          this.$router.replace("/h5/main");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.loginBox {
}
</style>
