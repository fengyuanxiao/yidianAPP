<template>
  <div class="addVphAccount">
    <user-header :title="'唯品会买号信息'"></user-header>
    <div class="addUser">
      <div class="warning">
        <div class="bgwhite bindJdStyle" style="border-bottom:2px solid #e0e0e0;">
          <img style="width:15px;" src="@/assets/img/icon/warning.png" alt />&nbsp;注意事项
        </div>
        <div class="pad5 bgwhite" style="border-bottom:4px solid #e0e0e0;">
          <p>
            账号审核时间
            <span class="red-text">周一至周日9:00－21:00</span>,账号提交后一个工作日内完成审核，如遇周末或节假日顺延，审核工作人工进行，用户请耐心等待，新手务必查看
            <span class="red-text">截图示例！</span>
          </p>
          <div style="clear:both;"></div>
          <p></p>
        </div>
      </div>
      <div class="userInfoForm">
        <div>
          <h2
            style="font-size:15px;color:black;padding-left:10px;border-bottom:1px solid #e0e0e0;dispaly:block;height:35px;line-height:35px;"
          >账号信息</h2>
          <ul class="mui-table-view mui-noulbefore">
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label>唯品会账号</label>
                <x-input
                  type="text"
                  name="taobao_name"
                  v-model.trim="userInfo.Account"
                  class="mui-input-clear"
                  placeholder="请输入唯品会用户名"
                  data-input-clear="3"
                  text-align="right"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="marginTop5">
          <h2
            style="padding-left:10px;font-size:15px;color:black;border-top:1px solid #e0e0e0;display:block;height:35px;line-height:35px;"
          >收货地址</h2>
          <ul class="mui-table-view mui-noulbefore">
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label>收货人</label>
                <x-input
                  type="text"
                  name="sh_name"
                  v-model.trim="userInfo.GoodsName"
                  class="mui-input-clear"
                  placeholder="请输入收货人姓名"
                  data-input-clear="3"
                  text-align="right"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label>收货人手机</label>
                <x-input
                  type="tel"
                  name="sh_phone"
                  v-model.trim="userInfo.GoodsPhone"
                  class="mui-input-clear"
                  placeholder="请输入收货人手机号码"
                  maxlength="11"
                  data-input-clear="4"
                  text-align="right"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <x-address
                  title="请选择城市"
                  v-model.trim="userInfo.provinces"
                  :list="addressData"
                  placeholder="请选择地址"
                ></x-address>
              </div>
            </li>
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label>详细地址</label>
                <x-input
                  type="text"
                  name="xx_city"
                  v-model.trim="userInfo.address"
                  class="mui-input-clear"
                  placeholder="输入详细地址，具体到门牌号"
                  data-input-clear="11"
                  text-align="right"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <p class="pad10" style="color:#323232;">
            <span>上传图片（点击可更换图片)</span>
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
              <p>
                <a
                  class="example"
                  href="javascript:void(0);"
                  @click="item.showExample=true"
                >查看截图示例>></a>
              </p>
              <x-dialog v-model.trim="item.showExample" class="dialog-demo">
                <div class="img-box">
                  <img :src="item.exampleImg" style="max-width:100%" />
                </div>
                <div @click="item.showExample=false">
                  <span class="vux-close">X</span>
                </div>
              </x-dialog>
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
          <x-button type="primary" style="border-radius:30px;" @click.native="bandWph">提交</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XAddress, ChinaAddressV4Data } from "vux";
export default {
  data() {
    return {
      userInfo: {
        Account: "",
        GoodsName: "",
        GoodsPhone: "",
        provinces: [],
        address: ""
      },
      addressData: ChinaAddressV4Data,
      images: ["", ""],
      uploadPhotoes: [
        {
          value: 1,
          title: "会员中心截图",
          showExample: false,
          exampleImg: require("@/assets/img/wph/wph1.jpg")
        },
        {
          value: 2,
          title: "购物订单截图",
          showExample: false,
          exampleImg: require("@/assets/img/wph/wph2.jpg")
        }
      ]
    };
  },
  components: {
    XAddress
  },
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      this.getDetail();
    }
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
    // 获取详情
    async getDetail() {
      const reuslt = await this.axios.post("/api/index/get_bind", {
        id: this.$route.query.id
      });
      const temp = reuslt.data || {};
      this.userInfo = {
        id: this.$route.query.id,
        Account: temp.nickname,
        GoodsName: temp.receiver,
        GoodsPhone: temp.receiver_mobile,
        provinces: [temp.province + "", temp.city + "", temp.region + ""],
        address: temp.receiver_address
      };
      this.images = [
        this.$url + temp.account_img_url,
        this.$url + temp.sex_img_url
      ];
    },
    async bandWph() {
      if (this.userInfo.Account === "") {
        return this.$vux.toast.text("请输入唯品会用户名");
      }
      if (this.userInfo.GoodsName === "") {
        return this.$vux.toast.text("请输入收货人姓名");
      }
      if (this.userInfo.GoodsPhone === "") {
        return this.$vux.toast.text("请输入收货人手机号");
      }
      if (this.$utils.tools.isPhone(this.userInfo.GoodsPhone)) {
        return this.$vux.toast.text("手机号不正确");
      }
      if (this.userInfo.provinces.length === 0) {
        return this.$vux.toast.text("请选择城市");
      }
      if (this.images[0].length === 0) {
        return this.$vux.toast.text("请输入会员中心截图");
      }
      if (this.images[1].length === 0) {
        return this.$vux.toast.text("请输入唯品会订单截图");
      }
      const reuslt = await this.axios.post(
        this.$route.query.id
          ? "/api/index/updatewph_bind"
          : "/api/index/wph_bind",
        Object.assign(this.userInfo, { images: this.images })
      );
      this.$vux.toast.show({
        text: "提交成功，等待审核",
        type: "success"
      });
      setTimeout(_ => {
        this.$router.back();
      }, 1500);
    }
  }
};
</script>
<style lang="less">
.addVphAccount {
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
      .red-text {
        color: #ff3b30 !important;
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
        padding-left: 0px;
      }
    }
    .userInfoForm {
      .weui-dialog {
        height: 80%;
        top: 30px;
        overflow: scroll;
        z-index: 999999;
      }
      .img-box {
        height: 95%;
        overflow-y: auto;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .vux-close {
        padding-top: 3px;
        font-size: 14px;
        color: #000;
      }
      .example {
        font-size: 12px;
        margin-top: 2px;
      }
      .weui-cell {
        padding: 0;
        display: flex;
        align-items: center;
        font-size: 13px;
      }
      .vux-popup-picker-placeholder {
        font-size: 13px;
        padding-right: 5px;
      }
      .weui-cell_access .weui-cell__ft:after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 2px;
      }
      .mui-table-view {
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
        background-color: #fff;
      }
      .mui-noulbefore.mui-table-view:before,
      .mui-noulbefore.mui-table-view:after,
      .mui-noliafter.mui-table-view-cell:after,
      .mui-noliactive.mui-active {
        background: none !important;
      }
      .mui-table-view:before {
        top: -1px;
      }
      .mui-table-view:before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 1px;
        content: "";
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #e1e1e1;
      }
      .mui-ios .mui-table-view-cell {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }
      .mui-table-view-cell {
        position: relative;
        overflow: hidden;
        height: 41px;
        line-height: 41px;
        -webkit-touch-callout: none;
      }
      .mui-table-view-cell:after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0px;
        height: 1px;
        content: "";
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #e1e1e1;
      }
      .no-padding {
        padding: 0 !important;
      }

      li {
        display: list-item;
        text-align: -webkit-match-parent;
      }
      .mui-input-row label {
        text-align: left;
        line-height: 21px;
        float: left;
        padding: 10px;
        padding-right: 16px;
        width: 32%;
        font-size: 13px;
        color: #323232;
      }
      .mui-input-row input {
        padding-right: 10px;
        font-size: 13px;
      }

      .mui-input-row label ~ input,
      .mui-input-row label ~ select,
      .mui-input-row label ~ textarea {
        float: right;
        margin-bottom: 0;
        padding-left: 0;
        border: 0;
      }
      .mui-input-row:last-child,
      .mui-input-row label + input,
      .mui-input-row .mui-btn + input {
        background: none;
      }
      .mui-input-row .mui-btn {
        line-height: 20px;
        float: right;
        width: 15%;
        padding: 10px 15px;
      }
      .mui-input-row input {
        width: 100%;
      }
      .vecode_input {
        padding-right: 100px !important;
      }
      .vecode {
        position: absolute !important;
        top: 0;
        right: 38px;
      }
      .mui-btn-link {
        padding-top: 6px;
        padding-bottom: 6px;
        color: #00a1fe;
        border: 0;
        background-color: transparent;
      }

      select,
      textarea,
      input[type="text"],
      input[type="search"],
      input[type="password"],
      input[type="datetime"],
      input[type="datetime-local"],
      input[type="date"],
      input[type="month"],
      input[type="time"],
      input[type="week"],
      input[type="number"],
      input[type="email"],
      input[type="url"],
      input[type="tel"],
      input[type="color"] {
        line-height: 21px;
        height: 40px;
        padding: 10px 15px;
        border-radius: 3px;
        outline: none;
        -webkit-appearance: none;
      }
      .pad10 {
        padding: 10px;
      }
      .mui-right {
        float: right;
      }

      a {
        background: transparent;
        text-decoration: none;
        color: #00a1fe;
      }
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
        height: 70px;
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
        width: 60px;
        height: 60px;
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

