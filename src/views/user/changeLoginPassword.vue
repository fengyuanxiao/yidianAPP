<template>
  <div class="commonForm changepassword">
    <user-header :title="'修改登录密码'"></user-header>
    <div class="loginForm">
      <group title>
        <x-input
          title="原密码"
          v-model.trim.trim="userInfo.password"
          type="password"
          placeholder="请输入原登录密码"
        >
          <!-- <span class="font-suo" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input
          title="新密码"
          v-model.trim.trim="userInfo.new_password"
          type="password"
          placeholder="请输入新登录密码"
        >
          <!-- <span class="font-suo" slot="label"></span> -->
        </x-input>
      </group>
      <group title>
        <x-input
          title="确认密码"
          v-model.trim.trim="userInfo.re_new_password"
          type="password"
          placeholder="请输入确认密码"
        >
          <!-- <span class="font-querenmima" slot="label"></span> -->
        </x-input>
      </group>
      <x-button type="primary" @click.native="changepassword" class="loginbtn">立即修改</x-button>
      <!-- <x-button @click.native="$router.push('/h5/register')" class="loginbtn">免费注册</x-button> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        password: "",
        new_password: "",
        re_new_password: ""
      },
      error: false
    };
  },
  methods: {
    async changepassword() {
      if (this.userInfo.password === "") {
        this.$vux.toast.text("请输入原密码");
      } else if (this.userInfo.new_password === "") {
        this.$vux.toast.text("请输入新密码");
      } else if (this.userInfo.re_new_password === "") {
        this.$vux.toast.text("请再次输入新密码");
      } else if (this.userInfo.new_password !== this.userInfo.re_new_password) {
        this.$vux.toast.text("两次输入的新密码不一致");
      } else {
        let result = await this.axios.post(
          "/api/index/updatepwd",
          this.userInfo
        );
        if (result && result.status) {
          this.$vux.toast.show({
            text: "修改成功",
            type: "success"
          });
          setTimeout(_ => {
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
.changepassword {
}
</style>
