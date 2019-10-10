<template>
  <div class="system">
    <user-header :title="'设置'"></user-header>
    <group>
      <cell :title="'当前版本（'+$baseConfig.version+'）'">
        <img slot="icon" src="@/assets/img/icon/set4.png" />
      </cell>
      <cell :title="'关于一点挣钱'" is-link @click.native="$vux.toast.text('敬请期待')">
        <img slot="icon" src="@/assets/img/icon/set1.png" />
      </cell>
      <cell :title="'问题反馈'" is-link @click.native="$vux.toast.text('敬请期待')">
        <img slot="icon" src="@/assets/img/icon/set2.png" />
      </cell>
    </group>
    <div class="btnbox">
      <x-button type="warn" @click.native="logout">退出登录</x-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$vux.confirm.show({
        title: "警告",
        content: "确定退出当前账号？",
        // 组件除show外的属性
        onCancel: () => {},
        onConfirm: () => {
          this.$utils.cookies.delAllCookie();
          this.$router.replace("/h5/login");
        }
      });
    }
  }
};
</script>
<style lang="less">
.system {
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
  .btnbox {
    padding: 50px 10px;
  }
}
</style>
