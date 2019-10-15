<template>
  <div class="certification">
    <user-header :title="'实名认证'"></user-header>
    <div class="addUser">
      <div class="warning">
        <div class="bgwhite bindJdStyle" style="border-bottom:2px solid #e0e0e0;">
          <img style="width:15px;" src="@/assets/img/icon/warning.png" alt />&nbsp;注意事项
        </div>
        <div class="pad5 bgwhite" style="border-bottom:4px solid #e0e0e0;">
          <p>
            <span style="float:left;">1、</span>
            <span
              style="float:left;word-break: break-all;width:90%;"
            >绑定的身份证名字须和支付宝实名认证一致，请认真核对，填写不正确将导致返款失败！</span>
          </p>
          <p style="clear:both;">
            <span style="float:left;">2、</span>
            <span
              style="float:left;word-break: break-all;width:90%;"
            >您的信息仅用于返款用途，一点挣钱将保证信息安全不泄露，不用于其他用途。</span>
          </p>
          <div style="clear:both;"></div>
          <p></p>
        </div>
      </div>
      <div class="userInfoForm">
        <group title>
          <x-input
            title="姓名"
            v-model.trim="userInfo.realName"
            placeholder="请输入姓名"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <group title>
          <x-input
            title="身份证号"
            v-model.trim="userInfo.cardno"
            placeholder="请输入身份证号"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <div>
          <p class="pad10">
            <span>上传图片（点击可更换图片)</span>
            <!-- <a href="http://help.lamagouwu.com/archives/133" class="mui-right">查看截图示例</a> -->
          </p>
          <div class="mui-row">
            <div
              class="mui-col-xs-4"
              style="text-align:center"
              v-for="(item,ind) in uploadPhotoes"
              :key="item.value"
            >
              <div class="z_photo z_photo_pic_1">
                <div class="z_add_img" data-show_tip="1">
                  <img :src="images[ind]||'/static/img/upload.png'" />
                </div>
              </div>
              <p class="no-margin">{{item.title}}</p>
            </div>
            <!-- 图片 -->
            <input
              @change="uploadPhoto($event,0)"
              ref="tu1"
              type="file"
              accept="image/*"
              class="mui-col-xs-4 kyc-passin"
            />
            <input
              @change="uploadPhoto($event,1)"
              ref="tu2"
              type="file"
              accept="image/*"
              class="mui-col-xs-4 kyc-passin"
            />
          </div>
        </div>
        <div class="mui-submite" style="margin:40px 10px">
          <x-button type="primary" @click.native="certification" style="border-radius:30px;">提交</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        realName: "",
        cardno: ""
      },
      images: ["", ""],
      uploadPhotoes: [
        { value: 1, title: "上传身份证正面图" },
        { value: 2, title: "上传身份证反面图" }
      ]
    };
  },
  methods: {
    // 触发对应的上传
    async uploadPhoto(e, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(this.images, ind, url);
      }
      // console.log(this.images);
    },
    async certification() {
      if (this.userInfo.realName === "") {
        return this.$vux.toast.text("请输入姓名");
      }
      if (this.userInfo.cardno === "") {
        return this.$vux.toast.text("请输入身份证号");
      }
      if (this.images[0].length === 0) {
        return this.$vux.toast.text("请输入身份证正面截图");
      }
      if (this.images[1].length === 0) {
        return this.$vux.toast.text("请输入身份证反面截图");
      }
      const reuslt = await this.axios.post(
        "/api/index/realnamecommit",
        Object.assign(this.userInfo, { images: this.images })
      );
      this.$vux.toast.show({
        text: "提交成功，等待审核",
        type: "success"
      });
      setTimeout(_ => {
        if(this.$route.query.id==1){
          this.$router.push('/h5/user/main')
        }else{
          this.$router.back();
        }
      }, 1500);
    }
  }
};
</script>
<style lang="less">
.certification {
  .weui-input {
    text-align: right;
  }
  .addUser {
    background-color: #fff;
    padding: 10px;
    .warning {
      p {
        font-size: 13px;
        margin-top: 0;
        margin: 5px 0;
        color: #8f8f94;
      }
      .bgwhite {
        background: #ffffff !important;
      }
      .bindJdStyle {
        height: 40px;
        font-size: 15px;
        font-weight: 600;
        line-height: 40px;
        margin-bottom: 5px;
        color: black;
        padding-left: 20px;
      }
    }
    .userInfoForm {
      .vux-x-input.weui-cell {
        border-bottom: 1px solid #c8c7cc;
      }
      .weui-label {
        margin-left: 10px;
      }
      .pad10 {
        margin: 20px 0 20px 10px;
        color: #515a6e;
        font-size: 16px;
      }
      //   .mui-right {
      //     float: right;
      //   }

      //   a {
      //     background: transparent;
      //     text-decoration: none;
      //     color: #00a1fe;
      //   }
      .mui-row {
        height: auto;
        overflow: hidden;
        position: relative;
      }
      .mui-row:before,
      .mui-row:after {
        display: table;
        content: " ";
      }
      .mui-row > [class*="mui-col-"] {
        float: left;
      }
      .kyc-passin {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 110px;
        opacity: 0;
        &:last-child {
          left: 50%;
        }
      }
      .mui-col-xs-4 {
        width: 50%;
      }
      .mui-col-xs-1,
      .mui-col-sm-1,
      .mui-col-xs-2,
      .mui-col-sm-2,
      .mui-col-xs-3,
      .mui-col-sm-3,
      .mui-col-xs-4,
      .mui-col-sm-4,
      .mui-col-xs-5,
      .mui-col-sm-5,
      .mui-col-xs-6,
      .mui-col-sm-6,
      .mui-col-xs-7,
      .mui-col-sm-7,
      .mui-col-xs-8,
      .mui-col-sm-8,
      .mui-col-xs-9,
      .mui-col-sm-9,
      .mui-col-xs-10,
      .mui-col-sm-10,
      .mui-col-xs-11,
      .mui-col-sm-11,
      .mui-col-xs-12,
      .mui-col-sm-12 {
        position: relative;
        min-height: 1px;
      }
      .z_photo {
        overflow: auto;
        clear: both;
        width: 100%;
        background-size: cover;
        padding: 3px 10px;
        overflow: hidden;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #ffffff;
      }
      .z_file {
        background: url(/static/img/upload.png) no-repeat;
        background-size: 100% 100%;
        width: 80px;
        height: 80px;
        display: inline-block;
        position: relative;
        margin-right: 10px;
        margin-bottom: 5px;
        vertical-align: top;
      }
      .z_photo img {
        width: 80px;
        height: 80px;
      }
      img {
        border: 0;
      }
      .no-margin {
        margin: 0 !important;
        font-size: 13px;
        color: #8f8f94;
      }
    }
  }
}
</style>

