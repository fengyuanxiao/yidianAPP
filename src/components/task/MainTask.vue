<template>
  <div class="mainTask">
    <flexbox :gutter="0">
      <flexbox-item :span="3">
        <img :src="task.goodspic" alt />
      </flexbox-item>
      <flexbox-item :span="6">
        <p>{{task.platform}}{{task.task_type_text}}</p>
        <p class="price">佣金：￥{{task.commission}}</p>
        <p style="color: #999999">垫付：{{task.itemprice}}元</p>
        <p class="count">
          <span>共{{task.common_orderitem_num}}单</span>
          <span>剩{{task.residue_order}}单</span>
        </p>
      </flexbox-item>
      <flexbox-item :span="3">
        <x-button type="primary" :disabled="no_task==='1'" @click.native="getTask()">领取任务</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    address_info: {
      default: "false"
    },
    no_task: {
      default: ""
    }
  },
  data() {
    return {
      unique_code: "",
      user_address_book: ""
    };
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  mounted() {
    this.getPhoneUuid();
  },
  methods: {
    async getTask() {
      // alert("task_id为：" + this.task.task_id);
      // alert("address_book" + this.user_address_book);
      // alert("unique_code为：" + this.unique_code);
      // alert("address_info为：" + this.address_info);
      if (this.task.task_type_text == "垫付任务") {
        await this.getGrabTask();
      } else if (this.task.task_type_text == "问答任务") {
        await this.getGrabquestask();
      }
    },
    // 抢垫付任务的单子
    async getGrabTask() {
      // 获取缓存通讯录
      const result = await this.axios.post("/api/task/grabTask", {
        task_id: this.task.task_id,
        address_book: this.user_address_book || "",
        unique_code: this.unique_code,
        address_info: this.address_info
      });
      this.$vux.toast.show({
        type: "success",
        text: "领取成功"
      });
      this.$router.push("/h5/order/dianfu/detail/" + result.data.order_id);
    },
    // 抢问答任务的单子
    async getGrabquestask() {
      const result = await this.axios.post("/api/task/grabquestask", {
        task_id: this.task.task_id,
        address_book: this.user_address_book || "",
        unique_code: this.unique_code,
        address_info: this.address_info
      });
      this.$vux.toast.show({
        type: "success",
        text: "领取成功"
      });
      this.$router.push("/h5/order/question/detail/" + this.task.task_id);
    },
    // 获取用户的通讯录和uuid
    getPhoneUuid() {
      this.unique_code = localStorage.getItem("unique_code");
      if (!this.unique_code) {
        this.$utils.tools.getUnique_code();
        this.unique_code = localStorage.getItem("unique_code");
      }
      this.user_address_book = localStorage.getItem("user_address_book");
      if (!this.user_address_book) {
        this.$utils.tools.getPhoneList();
        this.user_address_book = localStorage.getItem("user_address_book");
      }
    }
  }
};
</script>
<style lang="less">
.mainTask {
  padding: 11px 0;
  border-bottom: 1px solid #e1e1e1;
  .vux-flexbox {
    padding: 0 10px 0 5px;
  }
  .price {
    line-height: 18px;
    margin: 5px 0;
    font-weight: bold;
    color: #fe905f !important;
  }
  .count {
    span {
      background: #fe905f;
      color: #fff;
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 13px;
      margin-right: 5px;
      margin-top: 5px;
    }
  }
  .vux-flexbox-item:nth-child(2) {
    padding: 0 10px;
  }
  .weui-btn_primary {
    padding: 0;
    font-size: 14px;
  }
}
</style>
