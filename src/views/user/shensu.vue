<template>
  <div class="shengsu">
    <user-header :title="'申诉列表'"></user-header>
    <tab bar-active-color="#1890ff" active-color="#1890ff" :line-width="3">
      <tab-item selected @on-item-click="getComplain(1)">我发起的申诉</tab-item>
      <tab-item @on-item-click="getComplain(2)">我收到的申诉</tab-item>
    </tab>
    <!-- 发起的申诉 -->
    <template v-if="activeIndex==='1'">
      <div class="shengsuInfo" v-if="shengsuInfo.length">
        <div class="bodyBox" v-for="item in shengsuInfo" :key="item.order_id" @click="getMyShensu(item)">
          <div class="childOne">
            <div>
              <span>{{item.complain_desc}}</span>
            </div>
            <template v-if="item.user_order_status">
              <div>
                <span>{{item.undo_time}}</span>
                <span>{{item.order_status_text}}</span>
                <span>原因：{{item.undo_desc}}</span>
              </div>
            </template>
          </div>
          <div class="childTwo">{{item.status}}</div>
        </div>
      </div>
      <!-- 收到的申诉 -->
      <div class="noInfo" v-else>当前无新账单信息哦</div>
    </template>
    <template v-else>
      <!-- 收到的申诉 -->
      <div class="shengsuInfo" v-if="shengsuInfo.length">
        <div v-for="item in shengsuInfo" :key="item.order_id" class="bodyBox">
          <div class="childOne">
            <div class="childOne_a">
              <span>{{item.complain_desc}}</span>
              <span>{{item.undo_time}}</span>
            </div>
            <div class="childOne_as">
              <span>{{item.order_status_text}}</span>
              <span>原因：{{item.undo_desc}}</span>
            </div>
          </div>
          <div class="childTwo">{{item.status}}</div>
        </div>
      </div>
      <div class="noInfo" v-else>当前无新账单信息哦</div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      shengsuInfo: []
    };
  },
  mounted() {
    this.getComplain(1);
  },
  methods: {
    async getComplain(val) {
      const result = await this.axios.post("/api/help/complainList", {
        typeid: val || 1
      });
      this.shengsuInfo = result.data || {};
    },
    // 我发起的
    getMyShensu(item){
      if(item.company_status==0){
        this.$router.push('/h5/user/shensu/detail/'+item.order_id)
      }
    }
  }
};
</script>
<style lang="less">
.shengsu {
  .bodyBox {
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .childOne {
    width: 80%;
    margin-right: 5%;
  }
  .childOne_a {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .childOne_as {
    color: red;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
  .childOne > div > span {
    font-size: 0.9rem;
  }
  .childTwo {
    width: 15%;
    text-align: center;
    padding: 0.2rem 0.1rem;
    background-color: #f0ad4e;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
  }
}
</style>
