<template>
  <div class="liulanUnfinish">
    <user-header :title="'浏览任务未完成'"></user-header>
    <tab bar-active-color="#1890ff" active-color="#1890ff" :line-width="3">
      <tab-item selected>所有</tab-item>
      <tab-item>待操作</tab-item>
      <tab-item>待确认</tab-item>
    </tab>
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