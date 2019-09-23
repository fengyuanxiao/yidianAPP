<template>
  <div class="liulanUnfinish">
    <user-header :title="'浏览任务已完成'"></user-header>
    <div class="orderInfo" v-if="taskInfo.length"></div>
    <div class="noInfo" v-else>还没有任务噢,快去任务大厅看看吧^-^</div>
    <x-button mini style="display:block;margin:0 auto;" type="primary" link="/h5/main">立即前往</x-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskInfo: []
    };
  }
};
</script>