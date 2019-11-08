<template>
  <div class="mainTask">
    <flexbox :gutter="0">
      <flexbox-item :span="3">
        <img :src="task.goodspic" alt />
      </flexbox-item>
      <flexbox-item :span="6">
        <p style="font-size: 16px;">{{task.new_type ==1 ? '垫付任务' :task.new_type ==2?'回访任务' :'图文任务'}}</p>
        <p class="price"><span style="color: #999999">佣金：</span>￥{{task.commission}}</p>
        <p style="color: #999999;font-size: 13px;">垫付：{{task.itemprice}}元</p>
        <p class="count">
          <span>共{{task.common_orderitem_num}}单</span>
          <span>剩{{task.residue_order}}单</span>
        </p>
      </flexbox-item>
      <flexbox-item :span="3">
        <x-button type="primary" :disabled="no_task==='1'" @click.native="getTask()">领取任务</x-button>
      </flexbox-item>
    </flexbox>

    <!-- 买号未通过弹窗 -->
     <x-dialog v-model.trim="showBuyNum" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showBuyNum=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/taobaoAccountList')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去绑定</div>
      </x-dialog>
    <!-- 买号未绑定弹窗 -->
     <x-dialog v-model.trim="showUnbound" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showUnbound=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/addTaobaoAccount')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去绑定</div>
      </x-dialog>
    <!-- 银行卡弹窗 -->
     <x-dialog v-model.trim="showBank" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showBank=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/bindBankCard?id=' + realnameStatus)" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去绑定</div>
      </x-dialog>
    <!-- 身份证弹窗 -->
     <x-dialog v-model.trim="showID" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showID=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/certification?id=1')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去认证</div>
      </x-dialog>
    <!-- 买号审核中或有问题和身份证和银行卡审核弹窗 -->
     <x-dialog v-model.trim="showTip" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showTip=false" style="margin: 30px 0 10px 0;">
          <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
        </div>
      </x-dialog>
    <!-- 审核通过后跳转邀请弹窗 -->
     <x-dialog v-model.trim="showInviteTip" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
        </div>
        <div @click="showInviteTip=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/invite')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >确定</div>
      </x-dialog>
  </div> 
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    address_info: {
      default: "false"
    },
    no_task: {
      default: ""
    }
  },
  data() {
    return {
      unique_code: "",
      user_address_book: "",
      showBank:false,
      showID:false,
      showTip:false,
      showInviteTip:false,
      showBuyNum:false,
      showUnbound:false,
      realnameStatus:null,
      bankStatus:null,
      showMsg:'',
      address_status:null,
    };
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  mounted() {
    // this.getPhoneUuid();
  },
  methods: {
    async getTask() {
      // alert("task_id为：" + this.task.task_id);
      // alert("address_book" + this.user_address_book);
      // alert("unique_code为：" + this.unique_code);
      // alert("address_info为：" + this.address_info);
      if (this.task.task_type_text == "垫付任务") {
        await this.getGrabTask();
      } else if (this.task.task_type_text == "问答任务") {
        await this.getGrabquestask();
      }
    },
    // 抢垫付任务的单子
    async getGrabTask() {
      // 获取缓存通讯录
      this.user_address_book = localStorage.getItem("user_address_book");
      this.unique_code = localStorage.getItem("unique_code");
      const result = await this.axios.post("/api/task/grabTask", {
        task_id: this.task.task_id,
        address_book: this.user_address_book || "",
        unique_code: this.unique_code,
        address_info: this.address_info
      });
      
      let realname_status=result.data.realname_status
      this.realnameStatus=realname_status
      this.showMsg=result.msg
      this.address_status=result.data.address_status
      if(this.address_status==0){
            this.getPhoneUuid();
            if(result.data.code==5 && result.status== false){
              this.$vux.toast.text(this.showMsg)
            }
      }else{
          if(result.data.code==5 && result.status== false){
            this.$vux.toast.text(this.showMsg)
          }else if(result.data.code==1 && result.status== false){
            this.showUnbound=true
          }else if((result.data.code==2 || result.data.code==4) && result.status== false){
            this.showTip=true
          }else if(result.data.code==3 && result.status== false){
            this.showBuyNum=true
          }else if(result.data.count ==1 && result.status== false){
              if(result.data.bank_status ==0){
                  this.showBank=true
              }
              if((result.data.bank_status ==1 || result.data.bank_status ==2) && realname_status==0){
                  this.showID=true
              }
              if((result.data.bank_status ==2 && realname_status ==2)|| (result.data.bank_status ==1 && realname_status ==2)||(result.data.bank_status ==2 && realname_status ==1)||(result.data.bank_status ==3 && realname_status ==3)||(result.data.bank_status ==2 && realname_status ==3)||(result.data.bank_status ==3 && realname_status ==2)||(result.data.bank_status ==3 && realname_status ==1)||(result.data.bank_status ==1 && realname_status ==3) ){
                  this.showTip=true
              }
              
          }else if(result.data.inviter==1 && result.status== false){
              if(result.data.bank_status ==1 && realname_status==1){
                  this.showInviteTip=true
                }
          }else{
              this.$vux.toast.show({
                type: "success",
                text: "领取成功"
              });
              this.$router.push("/h5/order/dianfu/detail/" + result.data.order_id);
          }  
      }
      
    },
    // 抢问答任务的单子
    async getGrabquestask() {
      const result = await this.axios.post("/api/task/grabquestask", {
        task_id: this.task.task_id,
        address_book: this.user_address_book || "",
        unique_code: this.unique_code,
        address_info: this.address_info
      });
      this.$vux.toast.show({
        type: "success",
        text: "领取成功"
      });
      this.$router.push("/h5/order/question/detail/" + this.task.task_id);
    },
    // 获取用户的通讯录和uuid
    getPhoneUuid() {
      this.unique_code = localStorage.getItem("unique_code");
      if (!this.unique_code) {
        this.$utils.tools.getUnique_code();
        this.unique_code = localStorage.getItem("unique_code");
      }
      this.user_address_book = localStorage.getItem("user_address_book");
      if (!this.user_address_book) {
        this.$utils.tools.getPhoneList();
        this.user_address_book = localStorage.getItem("user_address_book");
      }
    }
  }
};
</script>
<style lang="less">
.mainTask {
  padding: 11px 0;
  border-bottom: 1px solid #e1e1e1;
  .vux-flexbox {
    padding: 0 10px 0 0px;
  }
  .price {
    line-height: 18px;
    margin: 5px 0;
    color: #FF2E2E !important;
    font-size: 13px;
  }
  .count {
    span {
      color: #4D97FF;
      padding: 1px 9px;
      border-radius: 20px;
      font-size: 12px;
      margin-right: 5px;
      margin-top: 5px;
      border: 1px solid #4D97FF;
      }
  }
  .vux-flexbox-item:nth-child(1) {
    flex: 0 0 28% !important;
  }
  .vux-flexbox-item:nth-child(2) {
    padding: 0 0 0 10px;
    margin: -9px 0 0 5px;
    flex: 0 0 48% !important;
  }
  .vux-flexbox-item{
    .weui-btn_primary{
      background:linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1)) !important;
      border-radius:20px;
    }
  }
  .weui-btn_primary {
    padding: 0;
    font-size: 14px;
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
