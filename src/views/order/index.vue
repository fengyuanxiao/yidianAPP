<template>
  <div class="menuBoxBottom order">
    <user-header :title="'我的任务'"></user-header>
    <div class="list">
      <group :title="'已接垫付任务'">
        <cell
          :title="'未完成'"
          :value="order.nocomplete_task_count"
          is-link
          link="/h5/order/dianfu/unfinish"
        >
          <span slot="icon" class="font-pdUnFinsh" style="color:#E6A23C;margin-right:10px;"></span>
        </cell>
        <cell
          :title="'已完成'"
          :value="order.complete_task_count"
          is-link
          link="/h5/order/dianfu/finish"
        >
          <span slot="icon" class="font-yiwancheng" style="color:#67C23A;margin-right:10px;"></span>
        </cell>
        <cell
          :title="'已撤销'"
          :value="order.cancel_task_count"
          is-link
          link="/h5/order/dianfu/cancel"
        >
          <span slot="icon" class="font-fenzucopy" style="color:#F56C6C;margin-right:10px;"></span>
        </cell>
      </group>
      <!-- <group :title="'已接浏览任务'">
        <cell :title="'未完成'" :value="order.nocomplete_flowtask_count" is-link link="/h5/order/liulan/unfinish">
          <span slot="icon" class="font-pdUnFinsh" style="color:#E6A23C;margin-right:10px;"></span>
        </cell>
        <cell :title="'已完成'" :value="order.complete_flowtask_count" is-link link="/h5/order/liulan/finish">
          <span slot="icon" class="font-yiwancheng" style="color:#67C23A;margin-right:10px;"></span>
        </cell>
        <cell :title="'已撤销'" :value="order.cancel_flowtask_count" is-link link="/h5/order/liulan/cancel">
          <span slot="icon" class="font-fenzucopy" style="color:#F56C6C;margin-right:10px;"></span>
        </cell>
      </group>-->
      <group :title="'已接问答任务'">
        <cell
          :title="'未完成'"
          :value="order.nocomplete_answertask_count"
          is-link
          link="/h5/order/question/unfinish"
        >
          <span slot="icon" class="font-pdUnFinsh" style="color:#E6A23C;margin-right:10px;"></span>
        </cell>
        <cell
          :title="'已完成'"
          :value="order.complete_answertask_count"
          is-link
          link="/h5/order/question/finish"
        >
          <span slot="icon" class="font-yiwancheng" style="color:#67C23A;margin-right:10px;"></span>
        </cell>
        <cell
          :title="'已撤销'"
          :value="order.cancel_answertask_count"
          is-link
          link="/h5/order/question/cancel"
        >
          <span slot="icon" class="font-fenzucopy" style="color:#F56C6C;margin-right:10px;"></span>
        </cell>
      </group>
    </div>
    <!-- 菜单 -->
    <tabbar-menu></tabbar-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {}
    };
  },
  mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      this.getOrderList();
    }
  },
  methods: {
    async getOrderList() {
      let result = await this.axios.post("/api/task/mytaskindex");
      this.order = result.data;
    }
  }
};
</script>
<style lang="less">
.order {
  .list {
    .vux-label-desc {
      display: none;
    }
    .weui-cells__title {
      color: #000;
      font-size: 16px;
      padding: 5px 15px;
    }
    .weui-cells {
      margin-top: 0;
    }
    .vux-label {
      font-size: 16px;
    }
    .weui-cell__hd img {
      width: 20px;
      display: block;
      margin-right: 10px;
    }
  }
}
</style>
