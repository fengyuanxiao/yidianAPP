<template>
  <div class="menuBoxBottom user">
    <div class="userInfo">
      <div class="userHead">
        <!-- 设置 -->
        <img
          src="@/assets/img/icon/system.png"
          class="system"
          alt
          @click="$router.push('/h5/user/system')"
        />
        <flexbox>
          <flexbox-item> 
            <div class="flex-demo">
              <img class="userHeaderImg" src="@/assets/img/xhxlogo.png" alt />
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <!-- <p class="mobile">{{userInfo.mobile}}</p> -->
              <p class="mobile">{{userInfo.mobile}}</p>
              <p class="code">
                <span style="font-size:14px;">我的邀请码:</span>
                <span>{{userInfo.invite_code}}</span>
                <span :data-clipboard-text="userInfo.invite_code" class="copy" @click="copy">复制</span>
              </p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="userAccountInfo">
        <grid :show-vertical-dividers="false" >
          <div @click="$router.push('/h5/user/tixian')">
            <grid-item class="countBox" label="可提现总余额" style="padding-bottom:5px;" >
              <strong slot="icon" style="font-size:36px;">{{userCenterInfo.total_commission||0.00}}元</strong>
            </grid-item>
          </div>
        </grid>
        <grid :show-vertical-dividers="false">
          <grid-item label="本金余额">
            <strong slot="icon">{{userCenterInfo.money_account||0.00}}元</strong>
            <x-button
              mini
              type="primary"
              @click.native="getPay(1,userCenterInfo.money_account||0.00)"
            >转入到提现</x-button>
          </grid-item>
          <grid-item label="佣金余额">
            <strong slot="icon">{{userCenterInfo.commission_account||0.00}}元</strong>
            <x-button
              mini
              type="primary"
              @click.native="getPay(2,userCenterInfo.commission_account||0.00)"
            >转入到提现</x-button>
          </grid-item>
        </grid>
      </div>
      <div class="userOrderInfo">
        <group>
          <cell title="待处理任务" value="全部任务" is-link link="/h5/order"></cell>
        </group>
        <grid v-for="(item,key) in userOrderInfo" :key="key" :show-vertical-dividers="false">
          <grid-item v-for="it in item" :label="it.label" :key="it.label" :link="it.url">
            <img slot="icon" :src="it.icon" />
            <badge v-bind:text="it.badgeValue" v-if="it.isBadge"></badge>
          </grid-item>
        </grid>
      </div>
    </div>
    <!-- 菜单 -->
    <tabbar-menu></tabbar-menu>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Flexbox, FlexboxItem, Badge } from "vux";
import { parse } from "path";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Badge
  },
  data() {
    return {
      userInfo: {},
      // userAccountInfo
      //  userOrderInfo
      userCenterInfo: {},
      userOrderInfo: [
        [
          {
            icon: require("@/assets/img/icon/gouwuche.png"),
            url: "/h5/order/dianfu/unfinish",
            label: "未垫付",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/waitorder.png"),
            url: "/h5/order/liulan/unfinish",
            label: "未浏览",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/waitok.png"),
            url: "/h5/order/question/unfinish",
            label: "未问答",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/waitbus.png"),
            url: "/h5/user/commission",
            label: "账单管理",
            isBadge: false,
            badgeValue: 0
          }
        ],
        [
          {
            icon: require("@/assets/img/icon/deal_7.png"),
            url: "/h5/user/tixian",
            label: "我要提现",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/deal_5.png"),
            url: "/h5/user/shensu",
            label: "申诉中心",
            isBadge: true,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/user_info.png"),
            url: "/h5/user/buyAccount",
            label: "买号管理",
            isBadge: true,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/xinshoujiaocheng.png"),
            url: "/h5/user/accountInfo",
            label: "账户信息",
            isBadge: false,
            badgeValue: 0
          }
        ],
        [
          {
            icon: require("@/assets/img/icon/weigui.png"),
            url: "/h5/user/tongzhi",
            label: "通知公告",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/deal_6.png"),
            url: "/h5/invite",
            label: "推荐有奖",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/help.png"),
            url: "/h5/user/help",
            label: "帮助中心",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/kefu.png"),
            url:
              "http://wpa.qq.com/msgrd?v=3&uin=2324286706&site=qq&menu=yes",
            label: "在线客服",
            isBadge: false,
            badgeValue: 0
          }
        ]
      ]
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
    copy() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        this.$vux.toast.text("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$vux.toast.text("复制失败，请手动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    getMoeny() {
      this.$router.push("/h5/user/tixian");
    },
    async getPay(type, money) {
      const result = await this.axios.post("/api/index/moneywithdraw", {
        type: type,
        money: money
      });
      await this.getUserInfo();
      this.$vux.toast.show({
        text: "转入成功",
        type: "success"
      });
    },
    // 获取个人中心的数据
    async getUserInfo() {
      const result = await this.axios.post("/api/index/index");
      this.userCenterInfo = result.data || {};
      this.userOrderInfo[1][1].badgeValue = result.data.complain_count;
      this.userOrderInfo[1][2].badgeValue = result.data.tbbind_count;
    }
  }
};
</script>
<style lang="less">
.user {
  .weui-cells {
    padding: 5px 0;
    font-size: 12px;
  }
  .countBox {
    .weui-grid__label {
      padding-top: 5px;
      font-size: 18px;
    }
  }
}
.userHead {
  color: #fff;
  background: #1890ff;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 20px 20px;
  position: relative;
  .system {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 20px;
    height: auto;
  }
  .vux-flexbox-item {
    &:first-child {
      min-width: 64px;
      flex: 0;
    }
  }
  .userHeaderImg {
    display: block;
    max-width: 64px;
    max-height: 64px;
    border-radius: 50%;
    background: #fff;
  }
  .mobile {
    margin-bottom: 10px;
  }
  .copy {
    font-size: 14px;
    padding: 2px 10px;
    border: 1px solid #fff;
    border-radius: 20px;
  }
}
.userAccountInfo {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  // 图标
  .weui-grid__icon {
    width: 100%;
    color: #fe905f;
    text-align: center;
    font-size: 16px;
    line-height: 18px;
  }
  .weui-grid__label {
    font-size: 13px;
    margin-top: 0;
    margin: 5px 0;
    color: #888;
  }
  .weui-btn {
    display: block;
    margin: 0 auto;
    width: 80%;
    padding: 3px 0;
  }
}
.userOrderInfo {
  margin-top: 10px;
  background-color: #fff;
  .vux-label-desc {
    display: none;
  }
  .weui-grid__icon img {
    width: 22px;
    height: auto;
    margin: 0 auto;
  }
  .weui-grid__label {
    font-size: 12px;
    line-height: 13px;
    display: block;
    width: 100%;
    height: 13px;
    margin-top: 8px;
    text-overflow: ellipsis;
    color: #777;
  }
  .vux-badge {
    position: absolute;
    top: 10px;
    right: 15px;
  }
}
</style>
