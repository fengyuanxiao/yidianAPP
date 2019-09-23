<template>
  <div class="tixianlist">
    <user-header :title="'提现记录'"></user-header>
    <div v-if="listInfo.length">
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr>
            <th>实际到账金额</th>
            <th>状态</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listInfo" :key="item.id">
            <td>{{item.to_account_money}}</td>
            <td>{{formateLabel(item.status)}}</td>
            <td>{{item.addtime}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div class="noInfo" v-else>当前无新账单信息哦</div>
  </div>
</template>
<script>
import { XTable } from "vux";
export default {
  components: {
    XTable
  },
  data() {
    return {
      listInfo: []
    };
  },
  mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      this.getTixian();
    }
  },
  methods: {
    async getTixian() {
      const result = await this.axios.post("/api/index/applycashlist");
      this.listInfo = result.data || [];
      console.log(result)
    },
    formateLabel(state) {
      switch (state) {
        case 1:
          return "已审核";
        case 0:
          return "审核中";
        default:
          return "未通过";
      }
    }
  }
};
</script>
<style lang="less">
.tixianlist {
  .vux-table th{
    font-weight:bold;
  }
}
</style>
