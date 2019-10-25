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
    <!-- 版本号弹窗 -->
     <x-dialog v-model.trim="showTip" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="goDown()" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
        </div>
      </x-dialog>
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
      showTip:false,
      showMsg:"",
      userInfo: {
        mobile: "",
        password: "",
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
    goDown() {
      try{
        plus.runtime.openURL("https://fir.im/na73?tdsourcetag=s_pcqq_aiomsg")
      }catch (e) {
      }
      // 测试下载地址：https://fir.im/j1g5
      //线上下载地址： "https://fir.im/na73?tdsourcetag=s_pcqq_aiomsg"
      // "https://dowmload.kouziapp.com/Hp_yidianzhengqian/downloadWeb.html";
    },
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
        let result = await this.axios.post(
          "/api/user/login",
          Object.assign(this.userInfo, {
            app_version:this.$baseConfig.version,
          }
        )
        );
        this.showMsg=result.msg
        if(result.data.code ==4){
          this.showTip=true
        }else if(result.data.code ==5){
           try {
              plus.cache.clear(() => {
                console.log('success')
              });
            } catch (e) {
              console.log('fail')
            }
            setTimeout(_ => {
                if (result && result.status) {
                this.$utils.cookies.setCookie(
                  "userInfo",
                  JSON.stringify(result.user_info)
                );
                this.$utils.cookies.setCookie("token", result.token);
                this.$router.replace("/h5/main");
              }
            }, 1500);
          
        }else{
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
  }
};
</script>
<style lang="less" scoped>
.loginBox {
  .showAttention{
    font-size: 24px;
    font-weight: 600;
    color:rgba(0,0,0,1);
  }
}
</style>
