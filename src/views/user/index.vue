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
                <span style="font-size:16px;">我的邀请码:</span>
                <span style="color:#4D97FF">{{userInfo.invite_code}}</span>
                <!-- <img src="@/assets/img/icon/copy_btn.png" alt :data-clipboard-text="userInfo.invite_code" class="copy" @click="copy"/> -->
                <span :data-clipboard-text="userInfo.invite_code" class="copy" @click="copy">复制</span>
              </p>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="userAccountInfo">
        <!-- <grid :show-vertical-dividers="false" > -->
          
        <!-- </grid> -->
        <grid :show-vertical-dividers="false" >
          <p class="cashWithdrawal">提现</p>
          <div @click="$router.push('/h5/user/tixian')">
           <p class="canCash">可提现总余额(元)</p>
            <grid-item class="countBox" style="padding-bottom:5px;" >
              <strong slot="icon" style="font-size:25px;">{{userCenterInfo.total_commission||0.00}}元</strong>
            </grid-item>
             <grid-item  >
                <x-button
                mini
                type="primary"
                style="margin-top:-20px;"
                >提现</x-button>
            </grid-item>
          </div>
        </grid>
        <grid :show-vertical-dividers="false">
          <p class="canCash" style="display: inline-block;padding-top: 20px; width: 49%;">本金余额(元)</p>
          
          <p class="canCash" style="display: inline-block;">佣金余额(元)</p>
          <grid-item label="" style="width:49.6%">
            <strong slot="icon" style="font-size:19px;">{{userCenterInfo.money_account||0.00}}元</strong>
            <x-button
              mini
              type="primary"
              @click.native="getPay(1,userCenterInfo.money_account||0.00)"
            >转入到提现</x-button>
          </grid-item>
          <div style="width:1px;height:110px;background:#D9D9D9;float: left;margin-top: -20px;"></div>
          <grid-item label="" style="width:49.8%">
            <strong slot="icon" style="font-size:19px;">{{userCenterInfo.commission_account||0.00}}元</strong>
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
            icon: require("@/assets/img/icon/unpaid.png"),
            url: "/h5/order/dianfu/unfinish",
            label: "未垫付",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/not-browse.png"),
            url: "/h5/order/liulan/unfinish",
            label: "未浏览",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/no-quest.png"),
            url: "/h5/order/question/unfinish",
            label: "未问答",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_bill.png"),
            url: "/h5/user/commission",
            label: "账单管理",
            isBadge: false,
            badgeValue: 0
          }
        ],
        [
          {
            icon: require("@/assets/img/icon/my_cw.png"),
            url: "/h5/user/tixian",
            label: "我要提现",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_appeal.png"),
            url: "/h5/user/shensu",
            label: "申诉中心",
            isBadge: true,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_am.png"),
            url: "/h5/user/buyAccount",
            label: "买号管理",
            isBadge: true,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_ai.png"),
            url: "/h5/user/accountInfo",
            label: "账户信息",
            isBadge: false,
            badgeValue: 0
          }
        ],
        [
          {
            icon: require("@/assets/img/icon/my_notice.png"),
            url: "/h5/user/tongzhi",
            label: "通知公告",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_recommend.png"),
            url: "/h5/invite",
            label: "推荐有奖",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/help-center.png"),
            url: "/h5/user/help",
            label: "帮助中心",
            isBadge: false,
            badgeValue: 0
          },
          {
            icon: require("@/assets/img/icon/my_cs.png"),
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
    border-radius: 10px;
  }
  .countBox {
    .weui-grid__label {
      padding-top: 5px;
      font-size: 18px;
    }
  }
}
.userHead {
  color: #444;
  background: url(/static/img/myTop_bg.png) no-repeat 50% -1300%;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 20px 10px;
  position: relative;
  height: 300px;
  .vux-flex-row{
    border-radius: 20px;
    margin-top: 30px;
    background: #fff;
    height: 100px;
    padding-left: 20px;
  }
  .system {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 20px;
    height: auto;
  }
  .vux-flexbox-item {
    margin-left: 15px !important;
    &:first-child {
      min-width: 66px;
      flex: 0;
    .flex-demo{
      border: 1px solid #ddd;
      border-radius: 50%;
      max-width: 66px;
      max-height: 66px;
    }  
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
    color: black;
    font-size: 18px;
  }
  .copy {
    font-size: 14px;
    border: 1px solid #fff;
    border-radius: 20px;
    width: 55px;
    height: 30px;
    background: linear-gradient(0deg,rgba(255,150,66,1),rgba(255,195,75,1));
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
  }
}
.userAccountInfo {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 20px;
  background-color: white;
  background-clip: padding-box;
  margin-top: -140px;
  .cashWithdrawal{
    padding: 15px;
    color: #444;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
  }
  .weui-grid:after{
    border: none !important;
  }
  .canCash{
    font-size: 16px;
    font-weight: normal;
    color: rgba(68,68,68,1);
    width: 49%;
    text-align: center;
  }
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
    margin: 5px auto;
    width: 80%;
    padding: 3px 0;
    width: 50% !important;
  }
  .weui-btn_primary{
    background:linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1));
    border-radius:25px;
  }
}
.userOrderInfo {
  margin: 10px;
  border-radius: 20px;
  background-color: #fff;
  .vux-label{
    color: #444;
    font-size: 21px;
    font-family: PingFang SC;
    font-weight: 500;
  }
  .vux-label-desc {
    display: none;
  }
  .weui-cell__ft{
    font-size: 16px;
  }
  .weui-cell__ft:after{
    height: 8px !important;
    width: 8px !important;
  }
  .weui-grid__icon{
    width: 40px;
    height: 48px;
  }
  .weui-grid__icon img {
    width: 40px;
    height: auto;
    margin: 0 auto;
  }
  .weui-grids:before{
    border: none !important;
  }
  .weui-grid:after{
    border: none !important;
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
