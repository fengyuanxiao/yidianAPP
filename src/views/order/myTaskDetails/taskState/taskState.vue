<template>
  <section class="taskDetail-state" v-if="order && orderInfo">
    <!-- <img :src="order.tasktype_pic" alt="taobaoImg" /> -->
    <span style="font-size: 15px">任务状态：<span style="color:red">{{order.ordertatusText}}</span></span>
    <span style="font-size: 15px;padding-top: 5px;">接受任务：{{orderInfo.addtime}}</span>
    <span style="color:#FF9642;font-size:15px;padding-top: 5px;">
      <span v-if="!orderInfo.order_status">
      <span style="color:#444">提交倒计时：</span>
        <b>{{cuttime}}</b>(未在截止时间之前提交将扣1元手续费)
      </span>
    </span>
    <div v-if="orderInfo.remark_pic.length !==0" style="display: inline-block;margin-top: 5px;">商家要求：
      <img
        style="max-width:100%;margin-bottom:0.3rem"
        v-for="(item,index) in orderInfo.remark_pic"
        :key="index"
        :src="item"
        alt="要求图"
      />
    </div>
    <p v-if="orderInfo.order_message !==''" style="margin-top: 5px;">订单要求：{{orderInfo.order_message}}</p>
    <div class="start-task-btn">
      <button class="tasktn" @click="cancelTask">取消任务</button>
      <template v-if="!orderInfo.order_status && order.is_appeal!=1">
        <button v-if="orderInfo.shop_around_time" class="stateBtns">
          <router-link :to="'/h5/order/dianfu/detail/taskStateChild/'+orderInfo.order_id">操作任务</router-link>
        </button>
        <button v-else class="stateBtns">
          <router-link
            :to="orderInfo.is_muti_keyword === 1 ? '/h5/order/dianfu/detail/taskStateChilds/'+orderInfo.order_id :'/h5/order/dianfu/detail/taskStateChild/'+orderInfo.order_id"
          >操作任务</router-link>
        </button>
      </template>
      <button v-if="orderInfo.order_status ===6" class="tasktn" style="background:linear-gradient(0deg,rgba(255,122,70,1),rgba(255,187,160,1));">
        <p style="padding: 0px 7px;" @click="popUp">待审核</p></button>
      <button v-if="orderInfo.order_status !==0" class="tasktn" style="background:linear-gradient(0deg,rgba(255,150,66,1),rgba(255,195,75,1));">
        <router-link :to="'/h5/shensu/appealTask?id='+orderInfo.order_id">申诉任务</router-link>
      </button>
    </div>
    <actionsheet v-model.trim="showCancel" :menus="menusTask" show-cancel @on-click-menu="sureCancel"></actionsheet>
  </section>
</template>
<script>
import { Actionsheet } from "vux";
export default {
  components: {
    Actionsheet
  },
  props: ["orderInfo", "order"],
  data() {
    return {
      showCancel: false,
      cuttime: "",
      timer: null,
      menusTask: [
        {
          label: "商品找不到",
          type: "1"
        },
        {
          label: "用户主动撤销，不想做了",
          type: "2"
        },
        {
          label: "达不到商家备注要求",
          type: "3"
        },
        {
          label: "问题任务",
          type: "5"
        }
      ]
    };
  },
  mounted() {
    clearInterval(this.timer);
    this.getTime();
  },
  watch: {
    order(cur) {
      clearInterval(this.timer);
      this.getTime();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    cancelTask() {
      this.showCancel = true;
    },
    popUp(){
      this.$vux.toast.show({
          text: "任务审核中请耐心等待",
        });
    },
    async sureCancel(key, item) {
      if (key !== "cancel") {
        await this.axios.post("/api/task/cancleTask", {
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
    },
    getTime() {
      let time = this.order.time; //获取父组件父组件传递拖来的时间戳
      this.timer = setInterval(() => {
        var hour = 0,
          minute = 0,
          second = 0; //时间默认值
        if (time > 0) {
          hour = Math.floor(time / (60 * 60));
          minute = Math.floor(time / 60) - hour * 60;
          second = Math.floor(time) - hour * 60 * 60 - minute * 60;
        }

        if (hour <= 9) hour = "0" + hour;
        if (minute <= 9) minute = "0" + minute;
        if (second <= 9) second = "0" + second;
        //
        this.cuttime = hour + ":" + minute + ":" + second;
        // console.log(cuttime);
        // 时时更换的时间
        time--;
      }, 1000);
      if (time <= 0) {
        clearInterval(this.timer);
      }
    }
  }
};
</script>
