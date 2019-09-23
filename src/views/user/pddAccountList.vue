<template>
  <div class="taobaoAccountList">
    <user-header :title="'拼多多买号信息'"></user-header>
    <group v-for="item in pddList" :key="item.value">
      <card @click.native="goUpdate(item)">
        <div slot="header" class="cardHeader">
          <img slot="icon" src="@/assets/img/icon/wangwang.png" />
          <span class="storeName">{{item.nickname}}</span>
          <div class="hearderRight">
            <a class="update" v-if="item.status==3">重新編輯</a>
            <span class="state" v-if="item.status==1">已审核</span>
            <span class="state" v-if="item.status==2">审核中</span>
            <span class="state" v-if="item.status==3">未通过</span>
            <span class="state" v-if="item.status==4">已冻结</span>
          </div>
        </div>
        <div slot="content" class="cardContent">
          <p>收货地址：{{item.receiver_address}}</p>
          <p>联系电话：{{item.receiver_mobile}}</p>
          <p>联系人：{{item.receiver}}</p>
        </div>
        <!-- <div slot="footer" class="cardFooter">
          <p>可接单数：今日{{item.status}}单</p>
        </div>-->
      </card>
    </group>
    <x-button class="addAccount" :link="'/h5/user/addPddAccount'">+ 新增一个拼多多账号</x-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pddList: []
    };
  },
  mounted() {
    this.getPddList();
  },
  methods: {
    goUpdate(item) {
      if (item.status == 3) {
        this.$router.push("/h5/user/addPddAccount?id=" + item.id);
      }
    },
    async getPddList() {
      let result = await this.axios.post("/api/index/bind_list", {
        bind_type: "5"
      });
      this.pddList = result.data;
      if (this.pddList.status == 0) {
        this.isCertified = "未绑定";
      } else if (this.pddList.status == 1) {
        this.isCertified = "已审核";
      } else if (this.pddList.status == 2) {
        this.isCertified = "审核中";
      } else if (this.pddList.status == 3) {
        this.isCertified = "未通过";
      } else {
      }
    }
  }
};
</script>
<style lang="less">
.taobaoAccountList {
  .cardHeader {
    padding: 11px 15px;
    border-bottom: 1px solid #e1e1e1;
    img {
      width: 20px;
      display: inline-block;
      // margin-right: 5px;
      vertical-align: middle;
    }
    .storeName {
      font-size: 14px;
      line-height: 18px;
      color: #000;
      vertical-align: middle;
    }
    .hearderRight {
      float: right;
    }
    .update {
      font-size: 13px;
      color: #00a1fe;
      line-height: 24px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .state {
      font-size: 13px;
      color: #00a1fe;
      line-height: 24px;
      vertical-align: middle;
    }
  }
  .cardContent {
    position: relative;
    overflow: hidden;
    padding: 11px 15px;
    p {
      font-size: 13px;
      color: #666;
      margin: 5px 0;
    }
  }
  .cardFooter {
    background-color: #00a1fe;
    padding: 2px 5px;
    margin: 0;
    p {
      font-size: 13px;
      color: #ffffff;
      margin: 5px 0 5px 10px;
    }
  }
  .addAccount {
    color: #228bec;
    margin: 20px 0 50px 0;
    border: none;
    border-radius: 0;
    font-size: 16px;
  }
  .weui-btn:after {
    border: none;
    border-radius: 0;
  }
}
</style>