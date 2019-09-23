<template>
  <div class="accountInfo">
    <user-header :title="'买号管理'"></user-header>
    <group :title="'账号绑定'">
      <cell :title="'绑定淘宝账号'" is-link :link="'/h5/user/taobaoAccountList'">
        <img slot="icon" src="@/assets/img/icon/account1.png" />
      </cell>
      <cell :title="'绑定京东账号'" is-link :link="'/h5/user/jingdongAccountList'">
        <img slot="icon" src="@/assets/img/icon/account2.png" />
      </cell>
      <cell :title="'绑定拼多多账号'" is-link :link="'/h5/user/pddAccountList'">
        <img slot="icon" src="@/assets/img/icon/account4.png" />
      </cell>
      <cell :title="'绑定唯品会账号'" is-link :link="'/h5/user/vphAccountList'">
        <img slot="icon" src="@/assets/img/icon/account7.png" />
      </cell>
    </group>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
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
