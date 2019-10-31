<template>
  <div class="bindBankCard">
    <user-header :title="'绑定银行卡'"></user-header>
    <div class="addUser">
      <div class="warning">
        <div class="bgwhite bindJdStyle" style="border-bottom:2px solid #e0e0e0;">
          <img style="width:15px;" src="@/assets/img/icon/warning.png" alt />&nbsp;注意事项
        </div>
        <div class="pad5 bgwhite" style="border-bottom:4px solid #e0e0e0;">
          <p>
            <span style="float:left;">1、</span>
            <span style="float:left;word-break: break-all;width:90%;">柜台登记的<span style="color:red">手机号码、姓名卡号、身份证号，必须一致！</span></span>
          </p>
          <p style="clear:both;">
            <span style="float:left;">2、</span>
            <span
              style="float:left;word-break: break-all;width:90%;"
            >姓名必须与绑定的身份证号码和支付宝实名认证一致，请认真核对，填写不正确将导致退款失败！</span>
          </p>
          <p style="clear:both;">
            <span style="float:left;">3、</span>
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
            placeholder="请输入办卡姓名"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <group title>
          <x-input
            title="手机号"
            v-model.trim="userInfo.bankTel"
            placeholder="请输入办卡预留手机号"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <group title>
          <x-input
            title="身份证号"
            v-model.trim="userInfo.cardid"
            placeholder="请输入办卡身份证号"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <group title>
          <x-input
            title="银行卡号"
            v-model.trim="userInfo.BankCode"
            placeholder="请输入银行卡号"
            placeholder-align="right"
            @on-blur="showBankName"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
        <group title>
          <selector
            placeholder="请选择银行"
            v-model.trim="userInfo.Bank"
            title="请选择银行"
            name="district"
            direction="rtl"
            :options="bankNameList"
          ></selector>
        </group>
         
        <group title>
          <!-- <selector
            placeholder="请选择开户行"
            v-model.trim="openBank"
            title="开户行"
            name="district"
            direction="rtl"
            :options="openBankList"
          ></selector>-->
          <x-address
            title="开户行"
            v-model.trim="userInfo.provinces"
            :list="addressData"
            placeholder="请选择地址"
          ></x-address>
        </group>
        <group title>
          <x-input
            title="开户行支行名称"
            v-model.trim="userInfo.ZhiHangName"
            placeholder="请输入开户行支行名称"
            placeholder-align="right"
          >
            <!-- <span class="font-suo" slot="label"></span> -->
          </x-input>
        </group>
       
        <div>
          <p class="pad10">
            <span>银行卡截图（点击可更换图片)</span>
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
                <!-- <div class="z_file z_file_pic_1" style> -->
                <!-- <input
                    type="file"
                    name="file"
                    value
                    accept="image/*"
                    onchange="setImagePreview(this, 0);"
                    uploaded="0"
                    base64
                    id="alipay_img"
                />-->
                <!-- </div> -->
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
          <x-button type="primary" @click.native="bandCard" style="border-radius:30px;">确认绑定</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Selector, XAddress, ChinaAddressV4Data } from "vux";
import axios from 'axios'
export default {
  data() {
    return {
      newup:null,
      userInfo: {
        realName: "",
        Bank: "",
        provinces: [],
        ZhiHangName: "",
        BankCode: "",
        bankTel: "",
        cardid:"",
      },
      images: ["", ""],
      addressData: ChinaAddressV4Data,
      bankNameList: [
        {
          value: "中国农业银行",
          key: "ABC"
        },
        {
          value: "中国银行",
          key: "BOC"
        },
        {
          value: "招商银行",
          key: "CMB"
        },
        {
          value: "交通银行",
          key: "COMM"
        },
        {
          value: "中国工商银行",
          key: "ICBC"
        },
        {
          value: "中国邮政储蓄银行",
          key: "PSBC"
        },
        {
          value: "上海浦东发展银行",
          key: "SPDB"
        },
        {
          value: "平安银行",
          key: "SPABANK"
        },
        {
          value: "中国建设银行",
          key: "CCB"
        },
        {
          value: "中国民生银行",
          key: "CMBC"
        },
        {
          value: "中信银行",
          key: "CITIC"
        },
        {
          value: "中国光大银行",
          key: "CEB"
        },
        {
          value: "兴业银行",
          key: "CIB"
        },
        {
          value: "广发银行",
          key: "广发银行"
        },
        {
          value: "华夏银行",
          key: "HXBANK"
        },
        {
          value: "上海银行",
          key: "SHBANK"
        },
        {
          value: "北京银行",
          key: "BJBANK"
        },
        {
          value: "渤海银行",
          key: "BOHAIB"
        }
      ],
      openBankList: [],
      uploadPhotoes: [
        { value: 1, title: "上传银行卡正面图" },
        { value: 2, title: "上传银行卡反面图" }
      ]
    };
  },
  components: {
    Selector,
    XAddress
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
    },
    // 银行卡归属银行接口
    async showBankName(){
    let result1=await this.axios.get('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo='+this.userInfo.BankCode+'&cardBinCheck=true')
    this.userInfo.Bank=result1.bank
    },
    // 提交
    async bandCard() {
      if (this.userInfo.realName === "") {
        return this.$vux.toast.text("请输入姓名");
      }
      if (this.newup === "") {
        return this.$vux.toast.text("请选择银行");
      }
      if (this.userInfo.provinces.length === 0) {
        return this.$vux.toast.text("请选择开户地址");
      }
      if (this.userInfo.ZhiHangName === "") {
        return this.$vux.toast.text("请输入支行名称");
      }
      if (this.userInfo.BankCode === "") {
        return this.$vux.toast.text("请输入银行卡号");
      }
      if (this.images[0].length === 0) {
        return this.$vux.toast.text("请输入银行卡正面截图");
      }
      if (this.images[1].length === 0) {
        return this.$vux.toast.text("请输入银行卡反面截图");
      }
      if (this.userInfo.bankTel === "") {
        return this.$vux.toast.text("请输入预留手机号");
      }
      if (this.userInfo.cardid === "") {
        return this.$vux.toast.text("请输入身份证号");
      }
       let newup =this.bankNameList.filter(item=> {
          return item.key==this.userInfo.Bank
      })
      this.newup=newup[0].value

      const saveParams = Object.assign(this.userInfo, { images: this.images,Bank:this.newup });
      const reuslt = await this.axios.post(
        "/api/index/bankcardcommit",
        saveParams
      );
      this.$vux.toast.show({
        text: "提交成功，等待审核",
        type: "success"
      });

      // 绑定淘宝页面验证是否绑定身份证
      setTimeout(_ => {
        if(this.$route.query.id == 0){
          this.$router.push('/h5/user/certification?id=1')
        }else if(this.$route.query.id == 1){
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
.bindBankCard {
  .weui-select,
  .vux-cell-value {
    color: #515a6e !important;
  }
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
      .vux-x-input.weui-cell,
      .vux-selector,
      .vux-cell-box {
        border-bottom: 1px solid #c8c7cc;
      }
      .vux-cell-box {
        .weui-cell {
          padding-left: 0px;
        }
      }
      .weui-label {
        margin-left: 10px;
      }
      .vux-selector.weui-cell_select-after {
        padding-left: 0;
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

