<template>
  <div class="commission">
    <user-header :title="'我的账单'"></user-header>
    <tab bar-active-color="#1890ff" active-color="#1890ff" :line-width="3">
      <tab-item selected @on-item-click="getCommission(1)">本金账单</tab-item>
      <tab-item @on-item-click="getCommission(2)">佣金账单</tab-item>
    </tab>
    <div class="taskInfo" v-if="taskInfo.length">
      <ul class="commission-list">
        <li v-for="item in taskInfo" :key="item.id">
          <div>
            <span>{{item.log_content}}</span>
            <span class="moneys">{{item.money}}</span>
          </div>
          <div class="money-data">
            <span>{{item.dateline}}</span>
            <span>本金余额{{item.account_money}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="noInfo" v-else>当前无账单信息哦</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskInfo: []
    };
  },
  mounted() {
    this.getCommission(1);
  },
  methods: {
    async getCommission(val) {
      const result = await this.axios.post("/api/index/usermoneylog", {
        type: val || 1
      });
      this.taskInfo = result.data || {};
    }
  }
};
</script>
<style lang="less">
.commission {
  .commission-list {
    list-style-type: none;
  }
  .commission-list > li {
    padding: 0.6rem 0.6rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .commission-list > li > div {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
  }
  .moneys {
    font-weight: bold;
    font-size: 1.2rem;
    color: rgb(50, 200, 175);
  }
  .money-data {
    color: rgb(160, 160, 160);
    font-size: 1rem;
  }
}
</style>
