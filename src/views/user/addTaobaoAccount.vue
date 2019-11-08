<template>
  <div class="addTaobaoAccount">
    <user-header :title="'淘宝账户信息'"></user-header>
    <div class="addUser">
      <div class="userInfoForm">
        <!-- 账号信息 -->
        <div class="accountInfo">
          <h2
            style="font-size:20px;color:#444;text-align:center;border-bottom:1px solid #e0e0e0;dispaly:block;height:60px;line-height:60px;width: 90%;margin-left: 20px;margin-bottom:10px;"
          >账号信息</h2>
          <ul class="mui-table-view mui-noulbefore">
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label>淘宝账号</label>
                <x-input
                  type="text"
                  name="taobao_name"
                  v-model.trim="getAccount.Account"
                  class="mui-input-clear"
                  placeholder="请输入淘宝用户名"
                  data-input-clear="1"
                />
                <!--  style="width:50%;display:inline-block" -->
                <!-- <div style="display:inline-block;
                            float: right;
                            margin-top: 10px;
                            flex:1;
                            padding: 0 5px;
                            font-size: 12px;
                            height: 30px;
                            background: #1890FF;
                            border-radius: 5px;
                            line-height: 30px;
                            text-align: center;
                            color:white">验证信息</div> -->
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label style="white-space:nowrap">认证姓名</label>
                <x-input
                  type="text"
                  name="zfb_name"
                  v-model.trim="userInfo.alipay_name"
                  class="mui-input-clear"
                  placeholder="请输入支付宝姓名"
                  data-input-clear="2"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
             <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label style="white-space:nowrap">年龄</label>
                <datetime
                  format="YYYY"
                  name="year_name"
                  v-model.trim="userInfo.year"
                  class="mui-input-clear"
                  placeholder="请选择出生年份"
                  clear-text="选择年份"
                  :min-year="1950"
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
            <li class="mui-table-view-cell no-padding">
              <div class="mui-input-row bgwhite">
                <label style="white-space:nowrap">淘宝订单号</label>
                <x-input
                  type="text"
                  name="xx_city"
                  v-model.trim="userInfo.tb_order_sign"
                  class="mui-input-clear"
                  maxlength="18"
                  placeholder="请输入淘宝订单号"
                  data-input-clear="11"
                  style="width:50%;display:inline-block"
                />
                <div v-for="(item) in newup"
                    :key="item.value"
                    style="float: right;
                          display:inline-block;
                          margin-top: 10px;
                          flex:1;
                          padding: 0 5px;
                          font-size: 12px;
                          height: 30px;
                          background: #1890FF;
                          border-radius: 5px;
                          line-height: 30px;
                          text-align: center;">
                  <span style="color:white;"
                    class="example"
                    href="javascript:void(0);"
                    @click="item.showExample=true"
                  >查看示例</span>
                  <!-- 查看示例 -->
                  <x-dialog v-model.trim="item.showExample" class="dialogDemo">
                    <div class="img-box">
                      <img :src="item.exampleImg" style="max-width:100%" />
                    </div>
                    <div @click="item.showExample=false">
                      <img class="vux-close" src="@/assets/img/taobao/close_btn.png" alt />
                    </div>
                  </x-dialog>
                </div>
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
          </ul>
          
        </div>

        <!-- 收货地址 -->
        <div class="marginTop5">
          <h2
            style="font-size:20px;color:#444;text-align:center;border-bottom:1px solid #e0e0e0;dispaly:block;height:60px;line-height:60px;width: 90%;margin-left: 20px;margin-bottom:10px;"
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
                />
                <span class="mui-icon mui-icon-clear mui-hidden"></span>
              </div>
            </li>
          </ul>
        </div>

        <!-- 验证信息 -->
        <div class="ValidateInfo">
          <h2
            style="font-size:20px;color:#444;text-align:center;border-bottom:1px solid #e0e0e0;dispaly:block;height:60px;line-height:60px;width: 90%;margin:0px 0px 25px 20px;"
          >验证信息</h2>
          <div class="mui-row">
            <div
              class="mui-col-xs-4 "
              style="text-align:right;margin-left: 8px;height: 500px; width: 30%;"
              v-for="(item,ind) in uploadPhotoes"
              :key="item.value"
            >
            <!-- 示例图片 -->
            <p>
              <a
                class="example"
                style="color:#444;"
                href="javascript:void(0);"
                @click="item.showExample=true"
              >
                <img :src="item.exampleImg" style="max-width:100%" />
                <p style="padding-right: 14px;">{{item.exampleFont}}</p>
              </a>
            </p>
            <!-- 上传截图 -->
              <div class="z_photo z_photo_pic_1">
                <div class="z_add_img" data-show_tip="1">
                  <img :src="images[ind]||'/static/img/uploadImg.png'" />
                </div>
                <p class="no-margin">{{item.title}}</p>
              </div>
              <!-- 示例图片 -->
              <x-dialog v-model.trim="item.showExample" class="dialogDemo">
                <div class="img-box">
                  <img :src="item.exampleImg" style="max-width:100%" />
                </div>
                <div @click="item.showExample=false">
                  <img class="vux-close" src="@/assets/img/taobao/close_btn.png" alt />
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
              style="top: 260px;left: 2%;"
            />
            <!-- style="top: -260px;left: 2%;" -->
            <input
              @change="uploadPhoto($event,1)"
              ref="tu1"
              type="file"
              accept="image/*"
              class="mui-col-xs-4 kyc-passin"
              style="top: 260px;left: 35%"
            />
            <!-- style="top: -260px;left: 5%" -->
            <input
              @change="uploadPhoto($event,2)"
              ref="tu2"
              type="file"
              accept="image/*"
              class="mui-col-xs-4 kyc-passin"
              style="top: 260px;left: 69%;"
            />
            <!-- style="top: -260px;left: 9%;" -->
          </div>
        </div>
        <div class="mui-submite" style="margin:40px 10px">
          <x-button type="primary" style="border-radius:30px;" @click.native="bandTaobao">提交</x-button>
        </div>
      </div>
    </div>
    <!-- 注意事项弹窗 -->
      <x-dialog v-model.trim="showPop" class="dialog-demo demoDialog">
        <!-- <div class="img-box showBg"> -->
        <div class="img-box" style="background: rgba(0, 0, 0, 0.6);">

          <img src="~@/assets/img/warn.png" alt="">
          <div class="attentionTip">
            <p><span style="color:red">淘宝账号：</span>绑定的淘宝账号<span style="color:red;display:inline">需满六个月信誉2星以上且实名认证</span>，且要与本平台绑定的身份证相同；且半个月内有购买记录，无降权打标记录等；</p>
            <p><span style="color:red">淘宝订单号：</span>请登录绑定的淘宝账号复制任意一笔订单粘贴到输入框即可；</p>
            <p><span style="color:red">收货地址：</span>每个买号要求绑定不同收货信息且唯一 （填写的信息<span style="color:red">必须真实有效</span>，可以联系上本人或亲 戚朋友）；</p>
            <p><span style="color:red">验证信息：</span>请上传相对应的截图验证账号信息，上 传的图片需正确且<span style="color:red">不允许遮挡</span>，遮挡或填写的信息 不确认将会审核失败</p>
            <div class="spr_line"></div>
          </div>
        </div>
        <div @click="Mincount<=0?showPop=false : showPop=true">
          <x-button type="primary" style="border-radius:5px;background:#FF2741;" min>{{this.Mincount >0 ?"了解("+this.Mincount+")" : "了解"}}</x-button>
        </div>
      </x-dialog>
      <!-- 积分弹窗 -->
     <x-dialog v-model.trim="showPoint" class="dialog_demo">
        <group title>
          <p style="font-size: 24px;font-weight: 600;color:rgba(0,0,0,1);">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 20px 10px 15px;font-size: 15px;color: black;">该账号为可疑账号，请更换账号重新提交！如有疑问请加官方QQ：2324286706</p>
        </div>
        <div @click="showPoint=false" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
        </div>
      </x-dialog>
    <!-- 银行卡弹窗 -->
     <x-dialog v-model.trim="showBank" class="dialog_demo">
        <group title>
          <p style="font-size: 24px;font-weight: 600;color:rgba(0,0,0,1);">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding-top:20px;font-size: 18px;color: black;">未绑定银行卡</p>
        </div>
        <div @click="$router.push('/h5/user/bindBankCard?id=' + realnameStatus)" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>去绑定</x-button>
        </div>
      </x-dialog>
    <!-- 身份证弹窗 -->
     <x-dialog v-model.trim="showID" class="dialog_demo">
        <group title>
          <p style="font-size: 24px;font-weight: 600;color:rgba(0,0,0,1);">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding-top:20px;font-size: 18px;color: black;">未绑定身份证</p>
        </div>
        <div @click="$router.push('/h5/user/certification?id=1')" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>去绑定</x-button>
        </div>
      </x-dialog>
  </div>
</template>
<script>
import { XAddress, ChinaAddressV4Data, Datetime  } from "vux";
export default {
  data() {
    return {
      userInfo: {
        Account: "",
        alipay_name: "",
        GoodsName: "",
        GoodsPhone: "",
        provinces: [],
        address: "",
        tb_order_sign: "",
        year:""
      },
      getAccount:{
        Account: "",
      },
      addressData: ChinaAddressV4Data,
      images: ["","", ""],
      newup:null,
      showPop: true,
      showPoint:false,
      showBank:false,
      showID:false,
      realnameStatus:null,
      Mincount:5,
      timer: null,
      showPopPic:[
        {
          value: 0,
          title: "上传淘气值截图",
          showExample: false,
          exampleImg: require("@/assets/img/taobao/alipayOrder.png"),
          exampleFont:"订单示例图"
        },
      ],
      uploadPhotoes: [
        {
          value: 0,
          title: "上传淘气值截图",
          showExample: false,
          exampleImg: require("@/assets/img/taobao/taoqizhi.png"),
          exampleFont:"淘气值示例图"
        },
        {
          value: 1,
          title: "上传支付宝截图",
          showExample: false,
          exampleImg: require("@/assets/img/taobao/myzhifubao.png"),
          exampleFont:"支付宝示例图"
        },
        {
          value: 2,
          title: "上传淘宝订单截图",
          showExample: false,
          exampleImg: require("@/assets/img/taobao/dingdan.png"),
          exampleFont:"淘宝订单示例图"
        }
      ],
    };
  },
  components: {
    XAddress,
    Datetime 
  },
  mounted() {
    this.getCodeTime();
    if (this.$route.query && this.$route.query.id) {
      this.getDetail();
    }
    // 查看示例
    let newup = this.showPopPic.filter(item=> {
        return item.value==0
    })
    this.newup=newup
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
    // 获取详情
    async getDetail() {
      const reuslt = await this.axios.post("/api/index/get_bind", {
        id: this.$route.query.id
      });
      const temp = reuslt.data || {};
      this.userInfo = {
        id: this.$route.query.id,
        alipay_name: temp.alipay_name,
        Account: temp.nickname,
        GoodsName: temp.receiver,
        GoodsPhone: temp.receiver_mobile,
        provinces: [temp.province + "", temp.city + "", temp.region + ""],
        address: temp.receiver_address,
        tb_order_sign: temp.tb_order_sign
      };
      this.images = [
        this.$url+temp.account_img_url,
        this.$url + temp.alipay_img_url,
        this.$url + temp.shopping_img_url
      ];
      this.getAccount={
        Account: temp.nickname,
      }
    },
    async bandTaobao() {
      if (this.getAccount.Account === "") {
        return this.$vux.toast.text("请输入淘宝用户名");
      }
      if (this.userInfo.alipay_name === "") {
        return this.$vux.toast.text("请输入支付宝姓名");
      }
      if (!this.userInfo.year) {
        return this.$vux.toast.text("请选择出生年份");
      }
      if(this.userInfo.year > 2004){
        return this.$vux.toast.text("请正确提交实名认证人的真实年龄哦！");
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
      if (this.userInfo.address === "") {
        return this.$vux.toast.text("请输入详细地址");
      }
      if (!this.userInfo.tb_order_sign) {
        return this.$vux.toast.text("请输入淘宝订单号");
      }
       if (this.images[0].length === 0) {
        return this.$vux.toast.text("请输入淘气值截图");
      }
      if (this.images[1].length === 0) {
        return this.$vux.toast.text("请输入支付宝认证截图");
      }
      if (this.images[2].length === 0) {
        return this.$vux.toast.text("请输入淘宝订单截图");
      }
      // 是重新提交的绑定
      if(this.$route.query.id){
          const reuslt1 = await this.axios.post(
            "/api/index/updatetb_bind",
          Object.assign(this.getAccount, {
            Account:this.getAccount.Account,
            images: this.images,
          }
          )
        );
        if (reuslt1.data.point>=80 || reuslt1.data.point ==0) {
          const reuslt = await this.axios.post(
            "/api/index/updatetb_bind",
            Object.assign(this.userInfo, {
              Account:this.getAccount.Account,
              images: this.images,
              AlipayName: this.userInfo.alipay_name
              }
              )
            );
          this.$vux.toast.show({
              text: "提交成功，等待审核",
              type: "success"
            });
            setTimeout(_ => {
              this.$router.back();
          }, 2000);
        }else{
          this.showPoint=true
        }
        // 首次提交验证分数
      }else{
           const reuslt1 = await this.axios.post(
           "/api/index/tbOperate",
          Object.assign(this.getAccount, {
            images: this.images,
            AlipayName: this.userInfo.alipay_name
          }
          )
        );

        if (reuslt1.data.point>=80 || reuslt1.data.point ==0) {
          const reuslt = await this.axios.post(
            "/api/index/tbOperate",
            Object.assign(this.userInfo, {
              Account:this.getAccount.Account,
              images: this.images,
              AlipayName: this.userInfo.alipay_name
              }
              )
            );
            this.$vux.toast.show({
              text: "提交成功，等待审核",
              type: "success"
            });
            let realname_status=reuslt.data.realname_status
            this.realnameStatus=realname_status

            // 弹框
            setTimeout(_ => {
              if (reuslt.data.bank_status===0) {
                this.showBank=true
              }else{
                this.showBank=false
              }
              if (reuslt.data.bank_status===1 && reuslt.data.realname_status===0) {
                this.showID=true
              }else{
                this.showID=false
              }
              if (reuslt.data.bank_status===1 && reuslt.data.realname_status===1) {
                this.$router.back();
              }
            }, 2000);

        }else{
            this.showPoint=true
        }

      }    
      
    },
    // 短信倒计时
    async getCodeTime() {
      this.timer = setInterval(_ => {
        if (this.Mincount > 0) {
          this.Mincount--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
        
    },
  }
};
</script>
<style lang="less">
.addTaobaoAccount {
  .addUser {
    background-color: #f5f5f5;
    padding: 10px;
    .userInfoForm {
      .accountInfo{
        width:100%;
        height:295px;
        background:rgba(255,255,255,1);
        box-shadow: 5px 5px 10px #cccccc;
        border-radius:15px;
        margin-top: 5px;
        border: 1px solid #ddd;
      }
      .marginTop5{
        width:100%;
        height:296px;
        background:rgba(255,255,255,1);
        box-shadow: 5px 5px 10px #cccccc;
        border-radius:15px;
        margin-top:15px;
        border: 1px solid #ddd;
      }
      .ValidateInfo{
        width:100%;
        height:600px;
        background:rgba(255,255,255,1);
        box-shadow: 5px 5px 10px #cccccc;
        border-radius:15px;
        margin-top:15px;
        border: 1px solid #ddd;
      }
      
      .vux-popup-picker-select{
        border:1px solid rgba(229,229,229,1);
        border-radius:5px;
        height: 36px;
        margin-left: 0px !important;
        text-align:left !important;
        padding-left: 10px;
        line-height: 36px;
        width: 100%;
      }
      .weui-input{
        border:1px solid rgba(229,229,229,1);
        border-radius: 20px;
        padding: 10px 10px !important;
        height: 34px;
      }
      .weui-dialog {
        height: 73%;
        overflow: scroll;
        z-index: 999999;
      }
      .vux-datetime-value{
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        margin-left: 0px !important;
        text-align: left !important;
        padding-left: 10px;
        line-height: 36px;
        width: 100%;
        margin-top: 5px;
      }
      .vux-cell-placeholder{
        color: #777;
      }
      .dp-header{
        color: black;
        font-weight: bold;
      }
      .vux-cell-value{
        color: #515a6e;
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
        margin-top: 30px;
        width: 40px;
        height: 40px;
      }
      .weui-cell {
        padding: 0;
        display: flex;
        align-items: center;
        font-size: 13px;
      }
      .weui-cell:before{
        border-top: none;
      }
      .vux-popup-picker-placeholder {
        font-size: 13px;
        padding-right: 5px;
        color:#777;
      }
      .weui-cell__ft{
        padding-right: 1px;
      }
      .weui-cell_access .weui-cell__ft:after {
        content: " ";
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 1px 1px 0 0;
        border-color: #1890FF;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -3px;
        right: 15px !important;
      }
      .example {
        font-size: 12px;
        margin-top: 2px;
        text-align: center;
      }
      .mui-table-view {
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
        background-color: #fff;
        margin-left: 20px;
        width: 90%;
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
        height: 50px !important;
        line-height: 50px !important;
        -webkit-touch-callout: none;
      }
      .mui-table-view-cell:after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0px;
        content: "";
        height:0px !important;
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
        line-height: 34px !important;
        float: left;
        padding: 10px 0 !important;
        padding-right: 16px;
        width: 80px !important;
        font-size: 15px;
        color: #323232;
            margin-right: 5px;
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
        color:#444;
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
        position: relative !important;
        top: 0;
        left: 0;
        height: 190px !important;
        opacity: 0;
        width: 30%!important;
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
        width: 100% !important;
        background-size: cover;
        padding: 3px 5px !important;
        overflow: hidden;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #ffffff;
        position: absolute;
        left: 0px;
        margin-top: 15px;
      }
      .z_file {
        background: url(/static/img/uploadImg.png) no-repeat;
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
        width: 100% !important;
        height:190px !important;
      }
      img {
        border: 0;
      }
      .no-margin {
        margin: 0 !important;
        font-size: 12px !important;
        color: #444 !important;
        text-align: center;
      }
    }
  }
  .dialog-demo .weui-dialog {
      height: auto !important;
      width: 85%;
  }
  .dialog_demo{
    height: auto !important;
  }
  .attentionTip{
    margin-bottom:0;
    text-align: left;
    height: 100%;
    overflow: auto;
    padding: 10px 15px;
    line-height: 22px;
    margin-top: -470px;
  }
  .spr_line{
      height: 1px;
      background: #E5E5E5;
      width: 100%;
      margin-top: 15px;
  }
}
</style>

