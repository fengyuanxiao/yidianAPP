<template>
  <div>
    <user-header :title="'确认收货并好评'"></user-header>
    <div v-if="orderInfo">
      <div class="goodPingJia-box">
        <h2>注意：务必等待物流签收后再评价，否则拉入黑名单!</h2>
        <p>第一步 去{{orderInfo.platformname}}评价并截图</p>
        <div class="goodPingJia-box-child">
          <p style="padding-top: 0rem;">1. 文字要求(在{{orderInfo.platformname}}评价里必须按以下文字要求评价)</p>

          <img
            @click="isShow=true"
            v-if="orderInfo.keyword_types>1 && orderInfo.keywords_text==''"
            style="max-width: 100%"
            :src="orderInfo.keywords_pic[0]"
            alt="tu"
          />      
          <p v-if="orderInfo.keywords_text!=='' && orderInfo.keyword_types===2">{{orderInfo.keywords_text}}</p>
          <p v-if="orderInfo.pic_text!==''&& orderInfo.keyword_types===3">{{orderInfo.pic_text}}</p>   
          <span v-if="(orderInfo.keywords_text==='' && orderInfo.keyword_types===1) ||(orderInfo.pic_text===''&& orderInfo.keyword_types !==3)" style="color: #444;padding-left: 0.5rem;">自行发挥相关评价十五字以上</span>         

          <p>2. 图片要求(在{{orderInfo.platformname}}评价里必须上传以下图片)</p>
          <template v-if="orderInfo.keyword_types>2 && orderInfo.pic_text ==''">
            <img
              v-for="(item,ind) in orderInfo.pic_content"
              :key="ind"
              style="max-width: 100%"
              :src="item"
              alt="tu"
              @click="showBigImg(item)"
            />
          </template>
          <span v-else style="background-color: #fff;color: #444;padding-left: 0.5rem;">无需图片</span>
        </div>
        <p>第二步 上传评价及物流截图</p>
        <div class="upicFlex" style="margin: 5px 0px 8px;text-align: center;">
          <div class="upic"
              v-for="(item,ind) in pic_uploads_box" 
              :key="ind"
              style="background:#F8F8F8;margin:10px 10px;width: 35%;"
              >
            <div class="uadd" style="margin:0px;background: #F8F8F8;width: 100%;font-size: 60px;color:#E5E5E5">+</div>
            <img v-if="item.uploadSrc" :src="item.uploadSrc" alt style="width:100%;margin:0px"/>
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
        <p style="padding-bottom: 10px;">
          注：请上传
          <span style="font-weight:bold;font-size:1rem;color:red">物流图 </span> 和
          <span style="font-weight:bold;font-size:1rem;color:red">好评图</span>
        </p>
      </div>
      <group style="margin: 10px 10px">
        <x-button type="primary" class="login-form-button" @click.native="sureGood">确认评价</x-button>
      </group>
    </div>
    <x-dialog
      v-model.trim="isShow"
      class="demoDialog"
      v-if="orderInfo && orderInfo.keyword_types>1&& orderInfo.keywords_text==''"
    >
      <div class="img-box">
        <img class="shilitu" :src="orderInfo.keywords_pic[0]" alt="好评截图" />
      </div>
      <div style="display: flex;">
        <x-button type="default" style="border-radius:0;" min @click.native="isShow=false">关闭</x-button>
        <x-button
          type="primary"
          style="border-radius:0;margin-top:0"
          min
          @click.native="$utils.tools.savePic(orderInfo.keywords_pic[0])"
        >保存图片</x-button>
      </div>
    </x-dialog>
    <!-- 图片要求 -->
     <x-dialog
      v-model.trim="isImgShow"
      class="demoDialog"
      v-if="orderInfo && orderInfo.keyword_types>2 && orderInfo.pic_text =='' && orderInfo.pic_content.length"
    >
      <div class="img-box">
        <img class="shilitu" :src="isImgShowSrc" alt="好评截图" />
      </div>
      <div style="display: flex;">
        <x-button type="default" style="border-radius:0;" min @click.native="isImgShow=false">关闭</x-button>
        <x-button
          type="primary"
          style="border-radius:0;margin-top:0"
          min
          @click.native="$utils.tools.savePic(isImgShowSrc)"
        >保存图片</x-button>
      </div>
    </x-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      isImgShow:false,
      isImgShowSrc:'',
      pic_uploads_box: [{ uploadSrc: "" }, { uploadSrc: "" }],
      chat_pay_content: ["", ""],
      orderInfo: null
    };
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    showBigImg(src){
      this.isImgShowSrc=src;
      this.isImgShow=true;
    },
    async getOrderInfo() {
      const result = await this.axios.post("/api/task/receivetask", {
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
    async sureGood() {
      if (this.isEmptyArr().length !== this.chat_pay_content.length) {
        return this.$vux.toast.text("所有的截图都必须上传");
      }
      await this.axios.post("/api/task/receivetaskcommit", {
        order_id: this.$route.params.id,
        receive_evaluate_content: this.chat_pay_content
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
