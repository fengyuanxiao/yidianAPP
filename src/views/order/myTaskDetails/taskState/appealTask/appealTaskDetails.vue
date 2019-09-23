<template>
  <div>
    <user-header :title="'申诉详情'"></user-header>
    <div class="top_" v-if="orderInfo">
      <div class="_header">
        <div class="_headerImg">
          <img :src="orderInfo.goodspic||require('@/assets/img/img2.png')" alt="商品主图" />
        </div>
        <ul>
          <li>
            <p>订单编号</p>
            <p>{{orderInfo.order_id}}</p>
          </li>
          <li>
            <p>QQ号码</p>
            <p>{{orderInfo.seller_qq}}</p>
          </li>
          <li>
            <p>其他联系方式申请平台介入提供</p>
          </li>
        </ul>
      </div>
      <div class="quxiaoBtn">
        <x-button type="primary" @click.native="cancelTask">我不想做了，申请取消这个任务</x-button>
      </div>
      <p>注：商家同意后任务取消，平台返款的本金将返回到商家本金账户，任务佣金将扣回或取消</p>
      <div class="center_detail">
        <img src="@/assets/img/zhong.png" alt="图标" />
        <p>状态详情</p>
      </div>
      <div style="background:#fff;padding:0 5px;">
        <div class="shop-titles">
          <span>1</span>
          <span class="shop-titles_span">申诉内容 {{orderInfo.start_time}}</span>
          <div class="shensu_phones">
            <template v-if="orderInfo.images">
              <img v-for="(item,ind) in orderInfo.images" :key="ind" :src="item" alt="申诉图片" />
            </template>
            <img v-else src="@/assets/img/img2.png" alt="申诉图片" />
            <p>类型：{{orderInfo.complain_type}} 原因：{{orderInfo.complain_desc}}</p>
          </div>
        </div>
        <div class="shop-titles">
          <span
            :style="orderInfo.complain_consult ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'}"
          >2</span>
          <span class="shop-titles_span">协商处理</span>
          <div class="shensu_phones">
            <template v-if="orderInfo.complain_consult">
              <div v-for="(item,ind) in  orderInfo.complain_consult" :key="ind" class="xieshang">
                <p>{{item.addtime}}</p>
                <p>{{item.type}}：{{item.consult_desc}}</p>
              </div>
            </template>
          </div>
        </div>
        <div class="shop-titles">
          <span
            :style="orderInfo.complain_status === 1 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'}"
          >3</span>
          <span class="shop-titles_span">已完结</span>
          <div class="shensu_phones"></div>
        </div>
      </div>
      <div v-if="!orderInfo.complain_status" class="shensu_btns">
        <flexbox>
          <flexbox-item>
            <x-button type="default" @click.native="replay">回复申诉</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="okShengsu">完结申诉</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="warn" @click.native="enterPlatform">申请平台介入</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <actionsheet
      v-model.trim="showCancel"
      :menus="menusTask"
      show-cancel
      @on-click-menu="sureCancel"
    ></actionsheet>
  </div>
</template>
<script>
import { Actionsheet } from "vux";
export default {
  components: {
    Actionsheet
  },
  data() {
    return {
      menusTask: [
        {
          label: "拍错店铺或者商品",
          type: "1"
        },
        {
          label: "用户串号",
          type: "2"
        },
        {
          label: "用户已申请退款",
          type: "3"
        },
        {
          label: "未拍下或未付款",
          type: "5"
        },
        {
          label: "问题任务",
          type: "6"
        },
        {
          label: "用户操作不符合要求",
          type: "7"
        }
      ],
      showCancel: false,
      orderInfo: null
    };
  },
  mounted() {
    this.getShensuInfo();
  },
  methods: {
    async replay() {
      this.$vux.confirm.prompt("请输入回复的内容", {
        title: "申诉回复",
        content: "请输入回复的内容",
        onConfirm: async val => {
          if (val) {
            await this.axios.post("/api/task/replyComplain", {
              order_id: this.orderInfo.order_id, //订单ID
              consult_desc: val
            });
            this.$vux.toast.show({
              text: "回复成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.back();
            }, 1500);
          } else {
            this.$vux.toast.text("请输入回复的信息");
          }
        }
      });
    },
    async okShengsu() {
      await this.axios.post("/api/task/completeAppeal", {
        order_id: this.orderInfo.order_id
      });
      this.$vux.toast.show({
        text: "完结成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    },
    async enterPlatform() {
      await this.axios.post("/api/task/applyToPlatfrom", {
        order_id: this.orderInfo.order_id
      });
      this.$vux.toast.show({
        text: "申请成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    },
    async getShensuInfo() {
      const result = await this.axios.post("/api/task/appealTaskDetail", {
        order_id: this.$route.params.id
      });
      this.orderInfo = result.data || {};
    },
    cancelTask() {
      this.showCancel = true;
    },
    async sureCancel(key, item) {
      if (key !== "cancel") {
        await this.axios.post("/api/task/backoutTaskApply", {
          order_id: this.orderInfo.order_id, //订单ID
          backout_type: item.type, //撤销类型
          backout_cause: item.label
        });
        this.$vux.toast.show({
          text: "取消成功",
          type: "success"
        });
        setTimeout(() => {
          this.$router.back();
        }, 1500);
      }
    }
  }
};
</script>
<style>
@import "./appealTask.css";
</style>
