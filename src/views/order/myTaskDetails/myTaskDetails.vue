<template>
  <div>
    <user-header :title="'垫付任务详情'"></user-header>
    <!-- 商品成交价格、件数 -->
    <!-- <DetailsPouduct /> -->
    <details-pouduct :order-info="orderInfo.task_detail"></details-pouduct>
    <task-state :order-info="orderInfo.task_detail" :order="orderInfo"></task-state>
    <!-- 任务状态 -->
    <task-plan :order-info="orderInfo.task_detail"></task-plan>
    <!-- 任务进度 -->
    <!-- { datas ? <TaskPlan platformname={platformname} addition_pic={addition_pic} is_addcomments={is_addcomments} receive_evaluate_content={receive_evaluate_content} taobao_ordersn={taobao_ordersn} order_status={order_status} order_id={order_id} user_taobao={user_taobao} chat_pay_content={chat_pay_content} need_principal={need_principal} addtime={addtime} itemprice={itemprice} itemnum={itemnum} /> : "" } -->
    <!-- tabs -->
  </div>
</template>
<script>
import DetailsPouduct from "./detailsProduct/detailsProduct";
import TaskState from "./taskState/taskState";
import TaskPlan from "./taskPlan/taskPlan";
export default {
  data() {
    return {
      orderInfo: {}
    };
  },
  components: {
    DetailsPouduct,
    TaskState,
    TaskPlan
  },
  mounted() {
    this.getDianfuDetail();
  },
  methods: {
    async getDianfuDetail() {
      const result = await this.axios.post("/api/task/myTaskDetail", {
        order_id: this.$route.params.id
      });
      this.orderInfo = result.data || {};
    }
  }
};
</script>
<style>
@import "./myTaskDetails.css";
</style>