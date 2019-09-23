<template>
  <div class="questionUnfinish">
    <user-header :title="'问答任务已完成'"></user-header>
    <div class="orderInfo" v-if="question.length">
      <question-task type="cancel" v-for="item in question" :key="item.order_id" :task="item"></question-task>
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
    this.getquestionList(9);
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
