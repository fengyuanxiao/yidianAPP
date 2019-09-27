<template>
  <div>
    <user-header :title="'追加评论'"></user-header>
    <div v-if="orderInfo">
      <div class="goodPingJia-box">
        <h2>注意：务必按照商家要求追加评论!</h2>
        <p>商家要求的追评内容</p>
        <div class="goodPingJia-box-child">
          <p>追评文字图片</p>
          <p>
            <template v-if="orderInfo.template_pic">
              <img
                v-for="(item,ind) in orderInfo.template_pic"
                :key="ind"
                style="max-width: 100%"
                :src="item"
                alt="文字图片"
              />
            </template>
          </p>
          <p>追评图片</p>
          <p>
            <template v-if="orderInfo.additional_pic">
              <img
                v-for="(item,ind) in orderInfo.additional_pic"
                :key="ind"
                style="max-width: 100%;padding-top: 0.5rem"
                :src="item"
                alt="文字图片"
              />
            </template>
          </p>
        </div>
        <p>第二步 上传评价及物流截图</p>
        <div class="upicFlex" style="padding:10px;">
          <div class="upic" v-for="(item,ind) in pic_uploads_box" :key="ind">
            <div class="uadd">+</div>
            <img v-if="item.uploadSrc" :src="item.uploadSrc" alt />
            <!-- 图片 -->
            <input
              @change="uploadPhoto($event,item,ind)"
              ref="tu1"
              type="file"
              class="ufile"
              accept="image/*"
            />
          </div>
        </div>
        <p>
          注：请上传
          <span style="font-weight:bold;font-size:1rem;color:red">追评截图</span>
        </p>
      </div>
      <group style="margin:10px;">
        <x-button type="primary" class="login-form-button" @click.native="sureAddGood">确认评价</x-button>
      </group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pic_uploads_box: [{ uploadSrc: "" }, { uploadSrc: "" }],
      chat_pay_content: ["", ""],
      orderInfo: null
    };
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    async getOrderInfo() {
      const result = await this.axios.post("/api/task/additionalTask", {
        order_id: this.$route.params.id //订单ID
      });
      this.orderInfo = result.data || {};
    },
    async uploadPhoto(e, item, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(item, "uploadSrc", url);
        this.chat_pay_content.splice(ind, 1, url);
      }
      // console.log(this.chat_pay_content);
    },
    // 提交任务
    async sureAddGood() {
      if (this.isEmptyArr().length !== this.chat_pay_content.length) {
        return this.$vux.toast.text("所有的截图都必须上传");
      }
      await this.axios.post("/api/task/additioncommit", {
        order_id: this.$route.params.id,
        addition_pic: this.chat_pay_content
      });
      this.$vux.toast.show({
        type: "success",
        text: "提交成功"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    },
    // 判断数组元素是否有为空的情况
    isEmptyArr() {
      return this.chat_pay_content.filter(e => e.length);
    }
  }
};
</script>
<style>
@import "./goodPingjia.css";
</style>