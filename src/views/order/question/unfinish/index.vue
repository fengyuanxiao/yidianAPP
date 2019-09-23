<template>
  <div class="questionUnfinish">
    <user-header :title="'问答任务未完成'"></user-header>
    <tab bar-active-color="#1890ff" active-color="#1890ff" :line-width="3">
      <tab-item selected @on-item-click="getquestionList(5)">所有</tab-item>
      <tab-item @on-item-click="getquestionList(0)">商家审核</tab-item>
      <tab-item @on-item-click="getquestionList(1)">提交问答</tab-item>
      <tab-item @on-item-click="getquestionList(4)">返回佣金</tab-item>
    </tab>
    <div class="orderInfo" v-if="question.length">
      <question-task v-for="item in question" :key="item.order_id" :task="item"></question-task>
    </div>
    <template v-else>
      <div class="noInfo">还没有任务噢,快去任务大厅看看吧^-^</div>
      <x-button mini style="display:block;margin:0 auto;" type="primary" link="/h5/main">立即前往</x-button>
    </template>
  </div>
</template>
<script>
import QuestionTask from "@/components/task/QuestionTask.vue";
export default {
  data() {
    return {
      question: []
    };
  },
  components: {
    QuestionTask
  },
  mounted() {
    this.getquestionList(5);
  },
  methods: {
    async getquestionList(val) {
      let result = await this.axios.post("/api/task/mytaskanswerlist", {
        status: val
      });
      this.question = result.data.task_list;
      // console.log(this.question);
    }
  }
};
</script>
</script>
