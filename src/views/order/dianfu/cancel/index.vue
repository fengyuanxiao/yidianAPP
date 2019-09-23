<template>
  <div class="dianfuUnfinish">
    <user-header :title="'垫付任务已撤销'"></user-header>
    <div class="orderInfo" v-if="dianfu.length">
      <dianfu-task type="cancel" v-for="item in dianfu" :key="item.order_id" :task="item"></dianfu-task>
    </div>
    <template v-else>
      <div class="noInfo">还没有任务噢,快去任务大厅看看吧^-^</div>
      <x-button mini style="display:block;margin:0 auto;" type="primary" link="/h5/main">立即前往</x-button>
    </template>
  </div>
</template>
<script>
import DianfuTask from "@/components/task/DianfuTask.vue";
export default {
  data() {
    return {
      dianfu: []
    };
  },
  components: {
    DianfuTask
  },
  mounted() {
    this.getDianfuList(10);
  },
  methods: {
    async getDianfuList(val) {
      let result = await this.axios.post("/api/task/mytasklist", {
        status: val
      });
      this.dianfu = result.data.task_list;
      // console.log(this.dianfu);
    }
  }
};
</script>