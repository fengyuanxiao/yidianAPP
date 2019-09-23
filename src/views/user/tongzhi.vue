<template>
  <div class="tongzhi">
    <user-header :title="'通知公告'"></user-header>
    <div class="taskInfo" v-if="tongzhiInfo.length">
      <ul class="tongZhi-box">
        <li
          v-for="item in tongzhiInfo"
          :key="item.notice_id"
          @click="gonggaoDetail(item.notice_id)"
        >
          <div>
            <span>{{item.title}}</span>
            <span>{{formateTime(item.dt_add)}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="noInfo" v-else>当前无公告</div>
  </div>
</template>
<script>
import { dateFormat } from "vux";
export default {
  data() {
    return {
      tongzhiInfo: []
    };
  },
  mounted() {
    this.getGonggaoInfo();
  },
  methods: {
    async getGonggaoInfo() {
      const result = await this.axios.post("/api/help/noticeList");
      this.tongzhiInfo = result.data || [];
    },
    formateTime(val) {
      return dateFormat(new Date(val), "YYYY-MM-DD HH:mm");
    },
    gonggaoDetail(id) {
      this.$router.push("/h5/user/tongzhi/" + id);
    }
  }
};
</script>
<style lang="less">
.tongzhi {
  .tongZhi-box > li {
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    background-color: #fff;
    margin-bottom: 0.5rem;
  }
  .tongZhi-box > li > div {
    padding: 0.6rem 0.8rem;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tongZhi-box > li > div > span:last-child {
    display: block;
    padding: 0.2rem 0.4rem;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    font-size: 0.6rem;
  }
}
</style>
