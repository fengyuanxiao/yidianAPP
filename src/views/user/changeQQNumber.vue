<template>
  <div class="commonForm" id="changeQQNumber">
    <user-header :title="'修改QQ号码'"></user-header>
    <div class="loginForm">
      <group title>
        <x-input title="原QQ号" :value="user_qq" :disabled="true" placeholder="请输入原QQ号">
          <span class="font-qq" slot="label"></span>
        </x-input>
      </group>
      <group title>
        <x-input title="新QQ号" v-model.trim="userInfo.qq" placeholder="请输入新QQ号">
          <span class="font-qq" slot="label"></span>
        </x-input>
      </group>
      <x-button type="primary" @click.native="changeQQNumber" class="loginbtn">立即修改</x-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        qq: ""
      },
      loginUserInfo: {},
      user_qq: ""
    };
  },
  mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      this.loginUserInfo = JSON.parse(
        this.$utils.cookies.getCookie("userInfo") || "{}"
      );
      this.user_qq = this.loginUserInfo.user_qq || "";
    }
  },
  methods: {
    async changeQQNumber() {
      if (this.userInfo.qq === "") {
        this.$vux.toast.text("请输入新QQ号码");
      } else {
        let result = await this.axios.post(
          "/api/index/changeQQ",
          this.userInfo
        );
        if (result && result.status) {
          this.$vux.toast.show({
            text: "修改成功",
            type: "success"
          });
          this.$set(this.loginUserInfo, "user_qq", this.userInfo.qq);
          this.$utils.cookies.setCookie(
            "userInfo",
            JSON.stringify(this.loginUserInfo)
          );
          setTimeout(_ => {
            this.userInfo.qq = "";
            this.$router.back();
          }, 1500);
        } else {
          this.$vux.toast.text("修改失败");
        }
      }
    }
  }
};
</script>
<style lang="less">
#changeQQNumber {
  .font-qq {
    margin-right: 10px;
    color: rgb(64, 158, 255);
    font-size: 20px;
  }
}
</style>
