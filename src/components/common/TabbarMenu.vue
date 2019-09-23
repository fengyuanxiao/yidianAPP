<template>
  <div class="tabBox">
    <tabbar>
      <tabbar-item
        v-for="item in menuBoxs"
        :key="item.url"
        :selected="$route.path==item.url"
        :link="item.url"
      >
        <!-- <img slot="icon" src="../assets/demo/icon_nav_button.png"> -->
        <span slot="icon" class="vux-x-icon" :class="['font-'+item.icon]"></span>
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      menuBoxs: [
        {
          url: "/h5/main",
          icon: "home",
          label: "首页"
        },
        {
          url: "/h5/invite",
          icon: "money",
          label: "邀请赚钱"
        },
        {
          url: "/h5/order",
          icon: "order",
          label: "我的任务"
        },
        {
          url: "/h5/user",
          icon: "user",
          label: "我的"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.tabBox {
  .weui-bar__item_on {
    .weui-tabbar__icon {
      background: #1890ff;
      border-radius: 50%;
    }
    .vux-x-icon {
      color: #fff;
    }
  }
}
</style>
