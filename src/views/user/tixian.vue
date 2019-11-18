<template>
  <div class="tixian">
    <user-header :title="'我要提现'" :righturl="'/h5/user/tixianjilu'" :righttitle="'提现记录'"></user-header>
    <div class="tongs">
      <span style="paddingRight:0.4rem" class="font-yanzhengma"></span>
      <span
        v-if="userCenterInfo.bank_status==1"
      >将提现到您尾号（{{userCenterInfo.bank_card_NO+' '+userCenterInfo.bank_name}}）</span>
      <span v-else-if="userCenterInfo.bank_status==0">
        请先绑定银行卡
        <router-link to="/h5/user/bindBankCard">立刻绑定</router-link>
      </span>
      <span v-else-if="userCenterInfo.bank_status==3">银行卡审核未通过</span>
      <span v-else>银行卡信息审核中，请等待</span>
    </div>
    <div class="tixianBox cash">
      <p>
        <span style="color:#01AAED">可提现总余额：</span>
        <span>￥ {{userCenterInfo.withdraw_account||0.00 }}元</span>
      </p>
      <div class="cash-money">
        <p>
          <x-input
            title="提现余额："
            :value="userCenterInfo.withdraw_account||0.00"
            placeholder="提现金额"
            :disabled="true"
          >
            <span slot="right">&nbsp;&nbsp;元</span>
          </x-input>
        </p>
      </div>
      <x-button
        type="primary"
        style="margin:1rem 0;padding:0"
        @click.native="withdrawMoney"
        :disabled="(userCenterInfo.bank_status!=1 || userCenterInfo.realname_status !=1)"
      >立即提现</x-button>
      <div class="cash-footer">
        <p>1.银行卡提现每天只能一次</p>
        <p>2.财务处理返款时间(如遇周日或节假日、节后第一个工作日打款)</p>
        <p>&nbsp;&nbsp;a.12:00(处理昨日18:00-今日12:00间的提现申请)</p>
        <p>&nbsp;&nbsp;b.18:00(处理今日12:00-今日18:00间的提现申请)</p>
        <p>实际到账时间以银行处理时间为准</p>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model.trim="show" class="dialog-demo">
        <div style="margin:10px 10px;">
          <group title>
            <x-input
              title="手机号码"
              type="tel"
              v-model.trim.trim="userCenterInfo.mobile"
              :disabled="true"
            >
              <!--  <span class="font-icon" slot="label"></span> -->
            </x-input>
          </group>
          <group title>
            <x-input title="图形验证码" v-model.trim="userInfo.captcha" placeholder="图形验证码">
              <!-- <span class="font-yanzhengma" slot="label"></span> -->
              <img @click="getCodeUrl" slot="right-full-height" :src="code_capt.captcha_src" />
            </x-input>
          </group>
          <group title>
            <x-input title="短信验证码" v-model.trim="userInfo.smscode" placeholder="短信验证码">
              <!-- <span class="font-mima" slot="label"></span> -->
              <x-button
                slot="right-full-height"
                mini
                plain
                @click.native="getDuanxinCode"
                type="primary"
              >{{dxcode}}</x-button>
            </x-input>
          </group>
          <x-button type="primary" class="loginbtn" @click.native="tixian">确定提现</x-button>
        </div>
        <div @click="show=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <!-- 银行卡弹窗 -->
     <x-dialog v-model.trim="showBank" class="dialog_demo">
       <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 0px 15px;font-size: 18px;color: black;">您未绑定提现银行卡，请绑定！</p>
        </div>
        <div @click="showBank=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/bindBankCard?id=' + realnameStatus)" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去绑定</div>
        <!-- <div @click="$router.push('/h5/user/bindBankCard?id=' + realnameStatus)" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>去绑定</x-button>
        </div> -->
      </x-dialog>
    <!-- 身份证弹窗 -->
     <x-dialog v-model.trim="showID" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="font-size: 18px;color: black;padding: 25px 0px 15px;">您未实名认证，请实名认证！</p>
        </div>
        <div @click="showID=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/certification?id=1')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去认证</div>
        <!-- <div @click="$router.push('/h5/user/certification?id=1')" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>去绑定</x-button>
        </div> -->
      </x-dialog>
      <!-- 审核弹窗 -->
      <x-dialog v-model.trim="showPop" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="font-size: 18px;color: black;padding: 25px 0px 15px;">您的银行卡或身份证正在审核，请耐心等待！</p>
        </div>
        <div @click="showPop=false" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
        </div>
      </x-dialog>
      <!-- 未通过弹窗 -->
      <x-dialog v-model.trim="showTip" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="font-size: 18px;color: black;padding: 25px 0px 15px;">您的银行卡或身份证未通过，请重新提交！</p>
        </div>
        <div @click="showTip=false" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
        </div>
      </x-dialog>
  </div>
</template>
<script>
import { TransferDomDirective as TransferDom, XDialog } from "vux";
export default {
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      showTip:false,
      showID:false,
      showPop:false,
      showBank:false,
      realnameStatus:null,
      count: 60,
      dxcode: "验证码",
      code_capt: {},
      show: false,
      userInfo: {
        mobile: "",
        smscode: "",
        captcha: ""
      },
      userCenterInfo: {}
    };
  },
  mounted() {
    this.getInfo();
    this.getCodeUrl();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async withdrawMoney() {
      var moneyNum = parseInt(this.userCenterInfo.withdraw_account);
      if (moneyNum < 50) {
        this.$vux.toast.show({
          text: "您的余额不足50元，不能提现",
          type: "warn"
        });
      } else {
        this.show = true;
      }
    },
    async getCodeUrl() {
      let result = await this.axios.get("/api/user/getcaptcha");
      if (result && result.status) {
        this.code_capt = result.data;
      }
    },
    //获取短信验证码
    async getDuanxinCode() {
      if (this.count === 60) {
      let myresult = await this.axios.post("/api/user/sendcode", {
          sid: this.code_capt.sid,
          tuCode: this.userInfo.captcha,
          phoneNum: this.userCenterInfo.mobile,
        });
        if(myresult.status==false && myresult.data.count==1){
          this.$vux.toast.text(myresult.msg)
        }else {
          this.getCodeTime();
          this.$vux.toast.show({
            text: "短信验证码已发送",
            type: "success"
          });
        }
          
       
      }
    },
    // 短信倒计时
    getCodeTime() {
      this.timer = setInterval(_ => {
        if (this.count > 0) {
          this.dxcode = this.count + "秒";
          this.count--;
        } else {
          clearInterval(this.timer);
          this.count = 60;
          this.dxcode = "重新获取";
        }
      }, 1000);
    },
    async getInfo() {
      const result = await this.axios.post("/api/index/cash");
      this.userCenterInfo = result.data;
      this.realnameStatus=this.userCenterInfo.realname_status
      if(this.userCenterInfo.bank_status==0){
        this.showBank=true
      }
      if ((this.userCenterInfo.bank_status==1 || this.userCenterInfo.bank_status==2 || this.userCenterInfo.bank_status==3) && this.userCenterInfo.realname_status==0) {
          this.showID=true
        }else{
          this.showID=false
      }
      if((this.userCenterInfo.bank_status==1 && this.userCenterInfo.realname_status==2) || (this.userCenterInfo.bank_status==2 && this.userCenterInfo.realname_status==1)|| (this.userCenterInfo.bank_status==2 && this.userCenterInfo.realname_status==2) || (this.userCenterInfo.bank_status==2 && this.userCenterInfo.realname_status==3)){
          this.showPop=true 
      }
      if((this.userCenterInfo.bank_status==3 && this.userCenterInfo.realname_status==2) ||(this.userCenterInfo.bank_status==2 && this.userCenterInfo.realname_status==3) ||(this.userCenterInfo.bank_status==1 && this.userCenterInfo.realname_status==3) || (this.userCenterInfo.bank_status==3 && this.userCenterInfo.realname_status==3) || (this.userCenterInfo.bank_status==3 && this.userCenterInfo.realname_status==1)){
          this.showTip=true
      }
    },
    async tixian() {
      if (this.userCenterInfo.is_black == 1) {
        this.$vux.toast.text(
          "亲，你好！因为你的帐号被冻结！提现功能受限，如有疑问请联系我们"
        );
      } else {
        await this.axios.post("/api/index/cashcommit", {
          money: this.userCenterInfo.withdraw_account || 0.0,
          smscode: this.userInfo.smscode
        });
        this.$vux.toast.show({
          type: "success",
          text: "提现申请成功，请耐心等待财务打款"
        });
      }
    }
  }
};
</script>
<style lang="less">
@import "~vux/src/styles/close";
.dialog-demo {
  .weui-cells {
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }
  .vux-x-input-right-full img {
    width: 100px;
  }
}
.tixian {
  .cash {
    padding: 0.7rem 0.6rem;
    background-color: #fff;
    font-size: 0.9rem;
  }
  .cash > p {
    padding: 0.6rem 0.1rem;
    font-size: 1.1rem;
  }
  .cash > .cash-money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.1rem;
  }
  .cash-footer {
    color: #ff5722;
  }
  .cash-footer > p:last-child {
    color: #000;
  }

  .modal-top {
    display: flex;
    padding-top: 0.5rem;
  }
  .modal-top > img {
    width: 50%;
    height: 50%;
  }
  .tongs {
    padding: 0.5rem 0;
    text-align: center;
    font-size: 1rem;
    color: red;
    font-weight: bold;
  }
  .vux-x-input.disabled .weui-input {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    padding-left: 20px !important;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }
  .weui-dialog{
    border-radius: 10px !important;
  }
  .showAttention{
    font-size: 24px;
    font-weight: 600;
    color:rgba(0,0,0,1);
  }
}
</style>
