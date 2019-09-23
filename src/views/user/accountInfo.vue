<template>
  <div class="accountInfo">
    <user-header :title="'账户信息'"></user-header>
    <group :title="'个人资料'">
      <cell title="手机号码" :value="userInfo.mobile"></cell>
      <cell title="邀请码" :value="userInfo.invite_code"></cell>
      <cell title="QQ账号" :value="userInfo.user_qq"></cell>
    </group>
    <group :title="'账号信息'">
      <cell :title="'修改手机绑定'" is-link :link="'/h5/user/changePhoneBind'">
        <span class="font-icon" slot="icon" style="color:#F56C6C;margin-right: 10px;"></span>
      </cell>
      <cell :title="'修改登录密码'" is-link :link="'/h5/user/changeLoginPassword'">
        <span class="font-suo" slot="icon" style="color:#E6A23C;margin-right: 10px;"></span>
      </cell>
      <cell :title="'修改QQ号码'" is-link :link="'/h5/user/changeQQNumber'">
        <span class="font-qq1" slot="icon" style="color:#409EFF;margin-right: 10px;"></span>
      </cell>
      <cell :title="'实名认证'" :value="isCertified" is-link @click.native="goCertified">
        <span class="font-webicon301" slot="icon" style="color:#67C23A;margin-right: 10px;"></span>
      </cell>
    </group>
    <group :title="'提现账号信息'">
      <cell :title="'修改提现密码'" is-link :link="'/h5/user/changeWithdrawPassword'">
        <span class="font-mima" slot="icon" style="color:#E6A23C;margin-right: 10px;"></span>
      </cell>
      <cell :title="'绑定银行卡'" :value="isBindCard" is-link @click.native="goCard">
        <img slot="icon" src="@/assets/img/icon/account3.png" />
      </cell>
    </group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: { mobile: "", invite_code: "", qq: "" },
      isCertified: "",
      isBindCard: ""
    };
  },
  mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      this.userInfo = JSON.parse(
        this.$utils.cookies.getCookie("userInfo") || "{}"
      );
      this.getUserInfo();
    }
  },
  methods: {
    goCard() {
      if (this.isBindCard === "未绑定" || this.isBindCard === "未通过") {
        this.$router.push("/h5/user/bindBankCard");
      } else {
        this.$vux.toast.text(this.isBindCard);
      }
    },
    goCertified() {
      if (this.isCertified === "未绑定" || this.isCertified === "未通过") {
        this.$router.push("/h5/user/certification");
      } else {
        this.$vux.toast.text(this.isCertified);
      }
    },
    async getUserInfo() {
      let result = await this.axios.post("/api/index/userInfo");
      if (result.data.realname_status == 0) {
        this.isCertified = "未绑定";
      } else if (result.data.realname_status == 1) {
        this.isCertified = "已审核";
      } else if (result.data.realname_status == 2) {
        this.isCertified = "审核中";
      } else if (result.data.realname_status == 3) {
        this.isCertified = "未通过";
      } else {
      }
      if (result.data.bank_status == 0) {
        this.isBindCard = "未绑定";
      } else if (result.data.bank_status == 1) {
        this.isBindCard = "已审核";
      } else if (result.data.bank_status == 2) {
        this.isBindCard = "审核中";
      } else if (result.data.bank_status == 3) {
        this.isBindCard = "未通过";
      } else {
      }
    }
  }
};
</script>
<style lang="less">
.accountInfo {
  .vux-label-desc {
    display: none;
  }
  .weui-cells {
    margin-top: 0;
  }
  .vux-label {
    font-size: 16px;
  }
  .weui-cell__hd img {
    width: 20px;
    display: block;
    margin-right: 10px;
  }
}
</style>
