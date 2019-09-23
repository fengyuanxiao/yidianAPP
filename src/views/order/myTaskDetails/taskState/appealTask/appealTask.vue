<template>
  <div>
    <user-header :title="'发起申诉'"></user-header>
    <div>
      <div class="shensu-box">
        <p class="_p" style="margin-bottom: 0">发起申诉</p>
      </div>
      <div class="shensu-box-child">
        <p class="_p" style="margin-bottom: 1rem">选择投诉类型</p>
        <group>
          <selector title placeholder="请选择类型" v-model.trim="appeal.complain_type" :options="options"></selector>
        </group>
        <p class="_p __p">填写投诉说明</p>
        <group>
          <x-textarea placeholder="请输入投诉说明" title v-model.trim="appeal.complain_desc"></x-textarea>
        </group>
        <p class="_p">上传图片证据</p>
        <div class="upic">
          <div class="uadd">+</div>
          <img v-if="appeal.images.length" :src="appeal.images[0]" alt />
          <!-- 图片 -->
          <input
            @change="uploadPhoto($event,0)"
            ref="tu1"
            type="file"
            class="ufile"
            accept="image/*"
          />
        </div>
      </div>
      <x-button type="primary" class="login-form-button" @click.native="apply">确认申诉</x-button>
    </div>
  </div>
</template>
<script>
import { Selector, XTextarea } from "vux";

export default {
  components: {
    Selector,
    XTextarea
  },
  data() {
    return {
      appeal: {
        complain_type: "",
        complain_desc: "",
        images: []
      },
      options: [
        {
          key: 1,
          value: "商品错误"
        },
        {
          key: 2,
          value: "返款问题"
        },
        {
          key: 3,
          value: "快递问题"
        },
        {
          key: 4,
          value: "其他"
        }
      ]
    };
  },
  methods: {
    // 触发对应的上传
    async uploadPhoto(e, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过5M");
      } else {
        this.$set(this.appeal, "images", [url]);
      }
      // console.log(this.images);
    },
    async apply() {
      if (!this.appeal.complain_type) {
        return this.$vux.toast.text("请选择投诉类型");
      }
      if (!this.appeal.complain_desc) {
        return this.$vux.toast.text("请输入投诉说明");
      }
      if (!this.appeal.images.length) {
        return this.$vux.toast.text("请上传投诉凭证");
      }
      const result = await this.axios.post(
        "/api/task/appealTaskCommit",
        Object.assign(this.appeal, {
          order_id: this.$route.query.id
        })
      );
      this.$vux.toast.show({
        text: "提交成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    }
  }
};
</script>

<style>
@import "./appealTask.css";
</style>
