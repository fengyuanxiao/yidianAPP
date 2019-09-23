<template>
  <div class="tongzhi">
    <user-header :title="'通知公告详情'"></user-header>
    <div class="tongZhiChild">
      <h3>{{d.title}}</h3>
      <div v-html="showHtml"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      d: {}
    };
  },
  mounted() {
    this.getGonggaoInfo();
  },
  computed: {
    showHtml() {
      return this.d.content
        .replace(this.d.content ? /&(?!#?\w+;)/g : /&/g, "&amp;")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  },
  methods: {
    async getGonggaoInfo() {
      const result = await this.axios.post("/api/help/noticeDetail", {
        notice_id: this.$route.params.notice_id
      });
      this.d = result.data || [];
    }
  }
};
</script>
<style lang="less">
.tongzhi {
  .tongZhiChild {
    padding: 1rem 0.7rem 0 0.7rem;
  }
  .tongZhiChild > h3 {
    text-align: center;
    padding-bottom: 1rem;
  }
  .tongZhiChild > p {
    padding-bottom: 0.7rem;
  }
  .tongZhiChild > img {
    width: 100%;
    padding-bottom: 0.7rem;
  }
}
</style>
