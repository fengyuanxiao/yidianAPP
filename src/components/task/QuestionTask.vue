<template>
  <div class="questionTask" v-if="task">
    <flexbox :gutter="0">
      <flexbox-item :span="3">
        <img class="goodpic" :src="task.goodspic" alt />
      </flexbox-item>
      <flexbox-item :span="9">
        <div style="border-bottom:1px solid #ccc;padding-bottom:5px;">
          <p>
            <img class="tpic" :src="task.taskitem_pic" alt />
            <span>{{task.user_taobao}}</span>
          </p>
          <p style="margin-top:10px;">接单时间：{{task.addtime}}</p>
        </div>
        <p></p>
        <!-- <flexbox style="padding-top:10px;"> -->
        <flexbox-item :span="4">
          <p>{{task.platform}}{{task.task_type_text}}</p>
          <p class="price">￥{{task.commission}}</p>
          <!-- <p style="color: #999999">垫付{{task.need_principal}}元{{task.refundtext}}</p>
          <p v-if="isTimeout && !hideInfo">该任务已过期</p>-->
          <!-- <p class="count">
        <span>共{{task.common_orderitem_num}}单</span>
        <span>剩{{task.residue_order}}单</span>
          </p>-->
        </flexbox-item>
        <flexbox-item :span="8">
          <!-- <x-button
            type="primary"
            v-if="!hideInfo"
            @click.native="getTask()"
            :disabled="isTimeout"
          >{{isTimeout?'任务已过期':'待操作'}}</x-button>
          <x-button type="primary" v-if="type==='cancel'" :disabled="true">已撤销</x-button>-->
          <x-button
            type="primary"
            v-if="task.order_status==1"
            @click.native="$router.push('/h5/order/question/detail/task/'+task.order_id)"
          >{{task.order_status_texts}}</x-button>
        </flexbox-item>
        <!-- </flexbox> -->
        <!-- <p v-if="!isTimeout" style="color:#f00;">请在{{task.limittime}}前操作</p> -->
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, dateFormat } from "vux";

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    type: {
      type: String
    }
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  computed: {
    // hideInfo() {
    //   return this.type === "cancel" || this.type === "finish";
    // },
    // isTimeout() {
    //   return dateFormat(new Date(), "MM-DD HH:mm:ss") > this.task.limittime;
    // }
  },
  methods: {
    // async getTask() {
    //   this.$router.push("/h5/order/question/detail/" + this.task.order_id);
    // }
  }
};
</script>
<style lang="less">
.questionTask {
  padding: 11px 0;
  background: #fff;
  border-bottom: 1px solid #e1e1e1;
  .vux-flexbox {
    padding: 0 15px;
    .goodpic {
      display: block;
      width: 100%;
      height: auto;
      padding-right: 10px;
    }
    .tpic {
      display: inline-block;
      width: 32px;
      height: auto;
      vertical-align: middle;
      margin-right: 5px;
    }
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
  .weui-btn_primary {
    padding: 0;
    font-size: 14px;
  }
}
</style>
