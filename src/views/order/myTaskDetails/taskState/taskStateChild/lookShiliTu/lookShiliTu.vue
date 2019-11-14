<template>
  <div>
    <!-- {{/* 第一步货比三家 */}} -->
    <div class="task-plan buzhou" v-if="orderInfo" style="margin:0 10px 15px 10px;">
      <div class="taskRenw">
        <!-- <Icon type="edit" theme="outlined" /> -->
        <span>任务步骤</span>
      </div>
      <div class="buzou-title">
        <span>第一步 货比三家</span>
        <span @click="isShow1=true">查看截图示例</span>
      </div>
      <p>① 请务必登入当前接任务的{{orderInfo.platformname}}账号:{{orderInfo.user_taobao}};</p>
      <p style="line-height: 27px;">② 进入{{orderInfo.tasktype_itemname}}点击搜索框输入指定的关键词，根据任务提示找到目标商品； </p>
      <p style="line-height: 27px;">③ 按任务要求，先浏览第一个带有hot图标的产品，然后随意浏览两家同等价位的产品1~3分钟。</p>
    
      <!-- 上传货货比三家截图 -->
      <div class="upicFlex" v-if="orderInfo.taskInfo.is_compared ===1">
        <div
          class="upic"
          style="background:#F8F8F8;margin:10px 8px 10px 0px;width: 35%;"
        >
          <div style="border:1px solid #E5E5E5">
            <div class="uadd" style="margin:0px;background: #F8F8F8;width: 100%;font-size: 60px;color:#E5E5E5">+</div>
            <img style="width:100%;margin:0px" v-if="appeal.images.length" :src="appeal.images[0]"  alt />
            <!-- 图片  -->
            <input
              @change="uploadPhotos($event,0)"
              ref="tu1"
              type="file"
              class="ufile"
              accept="image/*"
              style="margin:0px"
            />
          </div>
        </div>
      </div>
      <!-- 核对店铺名 -->
      <div class="buzou-title">
        <span style="color:#FF9642">核对商家店铺名是否正确</span>
      </div>
      <p>商家店铺名称:{{orderInfo.shop_name.substring(0,2)+'***'}}</p>
      <div class="shop-title">
        <x-input v-model.trim="waitCheckName" placeholder="请在此输入店铺名核对"></x-input>
        <icon :type="showIcon" style="margin-right:25px" v-if="showIcon"></icon>
        <x-button type="primary" @click.native="checkName" style="width:30%;background:#4D97FF">核对</x-button>
      </div>

      <!-- {{/* 第二步 浏览店铺 */}} -->
      <div v-if="showSec" style="border-bottom: 1px solid #E5E5E5;padding-bottom: 20px;">
        <div  class="buzou-title" >
          <span>第二步 浏览店铺</span>
          <span @click="isShow2=true">查看截图示例</span>
        </div>
        <p style="color:#444">① 浏览目标商品；（务必从页头至页尾进行浏览，3分钟以上）</p>

        <!-- 拼多多 -->
        <p v-if="orderInfo.platform===5">② 按照商家指定的下单方式进行下单，下单方式请拉到顶部查看拼团类型</p>

        <!-- 唯品会 -->
        <div v-else-if="orderInfo.platform===6">
          <p>② 把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
          <p>③ 然后从购物车提交订单</p>
        </div>

        <!-- 淘宝和京东：1和2 -->
        <div v-else style="color:#444">
          <p>② 进入店铺，随机浏览2~3个产品（务必从页头至页尾进行浏览，各1 分钟以上）</p>
          <!-- <p>③返回任务商品，直接点击购买（警示：勿从购物车提交订单）</p> -->
        </div>
        <p v-if="this.orderInfo.check_shop_time ==0" style="color:red;padding-top: 10px;font-size: 16px;">注：{{Math.floor(this.Mincount/60)+"分"+this.Mincount%60}}秒后才能继续操作下一步</p>
      </div>
      <!-- 第三步 聊天下单支付 -->
      <div v-if="this.Mincount<=0 || this.nowTime>this.endTimes" style="color:#444">
        <div v-if="orderInfo.platform===1">
          <div class="buzou-title" >
            <span>第三步 {{orderInfo.platform===1? "聊天下单支付" : "上传订单截图"}}</span>
            <span @click="isShow3=true">查看截图示例</span>
          </div>
          <p v-if="!orderInfo.is_muti_keyword && orderInfo.chatpic===0">下单前请核实目标商品件数、颜色、尺码等要求，确认下单金额与任务要求金额一致，<span style="color:#FF9642;display: inline;">下单金额与实付金额浮动在20元内，可正常下单；若浮动超过20元，请联系客服确认</span>。</p>
          <div v-if="orderInfo.is_muti_keyword">
            <p>① 主关键词搜索 找到对应任务宝贝店外截图 进店浏览2-3分钟 任务宝贝加入购物车 退出 上传正确的图</p>
            <p>② 点开购物车 截图购物车里的任务宝贝 上传正确的图</p>
            <p>③ 买手与客服以<span style="color:#FF9642">一问一答</span>的方式，关于产品需提出4~5个问题，严禁 未答复就下单（例：尺码、颜色、材质、包邮等问题）；</p>
            <p>④ 付款完成后，进入支付账单详情页面截图并上传</p>
          </div>
          <div v-if="!orderInfo.is_muti_keyword && orderInfo.chatpic===1">
            <p>① 买手与客服以<span style="color:#FF9642">一问一答</span>的方式，关于产品需提出4~5个问题，严禁 未答复就下单（例：尺码、颜色、材质、包邮等问题）；</p>
            <p>② 下单前请核实目标商品件数、颜色、尺码等要求，确认下单金额与任务要求金额一致，<span style="color:#FF9642;display: inline;">下单金额与实付金额浮动在20元内，可正常下单；若浮动超过20元，请联系客服确认</span>。</p>
          </div>         
          <!-- <p style="color:'red', fontWeight:'bold'">.如商家备注无需聊天，聊天图上传支付宝账单替代</p> -->         
        </div> 

        <div v-else class="buzou-title">
          <span>第三步 上传订单截图</span>
          <span @click="isShow3=true">查看截图示例</span>
        </div>
            
      <!-- 订单信息核对 -->
      <div style="padding-bottom: 8px;">
        <!-- <div class="buzou-title">
          <span style="color:#FF9642">第四步 订单信息核对</span>
        </div>       -->
        <div  class="buzou-title" >
          <span style="color:#444;">订单编号可在{{orderInfo.platformname}}订单详情中复制</span>
          <span @click="isShow4=true">查看截图示例</span>
        </div>
        <!-- <p v-else style="color:#444;font-size: 15px;margin: 0.5rem 0px;">订单号可在订单详情中复制</p> -->
        <p style="color:#444;font-size: 15px;">应垫付金额参考:
          <span style="color:#FF9642">{{orderInfo.need_principal}}元</span>
           <!--<span style="color:#4D97FF;padding-left: 15px;">金额有误？</span> -->
        </p>
         <p
          style="color: #FF9642;font-weight: bold;padding: 0.2rem 0;"
          v-if="!orderInfo.is_muti_keyword"
          >{{orderInfo.chatpic===1?'此任务商家要求聊天':''}}
        </p>
        <!-- {{/*聊天 支付宝 账单截图 */}} -->
        <p class="chatPicture">请上传{{orderInfo.pic_desc}}</p>
        <div class="upicFlex">
          <div
            class="upic"
            v-for="(item,ind) in pic_uploads_box"
            :key="ind"
            style="background:#F8F8F8;margin:10px 8px 10px 0px;width: 35%;"
          >
            <div style="border:1px solid #E5E5E5">
              <div class="uadd" style="margin:0px;background: #F8F8F8;width: 100%;font-size: 60px;color:#E5E5E5">+</div>
              <img style="width:100%;margin:0px" v-if="item.uploadSrc" :src="item.uploadSrc" alt />
              <!-- 图片 -->
              <input
                @change="uploadPhoto($event,item,ind)"
                ref="tu1"
                type="file"
                class="ufile"
                accept="image/*"
                style="margin:0px"
              />
            </div>
          </div>
        </div>
        
        <div class="login-form">
          <group>
            <x-input
              type="number"
              v-model.trim="orderForm.need_principal"
              placeholder="请输入实际付款金额"
              class="jineInput"
            ></x-input>
          </group>
          <group>
            <x-input
              placeholder="请输入支付商户订单号"
              v-model.trim="orderForm.taobao_ordersn"
              class="jineInput"
            ></x-input>
          </group>          
        </div>
      </div>
      </div>     
    </div>

    <div class="currentNum">
      <p style="padding-top: 5px;">您当前的买号为:</p>
      <span>{{orderInfo.user_taobao}}</span>
    </div>
    <div class="commiteTsak" @click="subTask">提交审核</div>
  
    <!-- {{/* 第一步货比三家的图片示例 */}} -->
    <x-dialog v-model.trim="isShow1" class="demoDialog" hide-on-blur>
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/exampleHot.png" alt="问答任务示例图" />
      </div>
      <div @click="isShow1=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- {{/* 第二步浏览店铺的图片示例 */}} -->
    <x-dialog v-model.trim="isShow2" class="demoDialog" hide-on-blur>
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/exampleFoot.png" alt="问答任务示例图" />
      </div>
      <div @click="isShow2=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- {{/* 第三步聊天下单支付的图片示例 */}} -->
    <x-dialog v-model.trim="isShow3" class="demoDialog" hide-on-blur>
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/exampleChat.png" alt="问答任务示例图" />
      </div>
      <div @click="isShow3=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- {{/* 第三步订单编号截图的图片示例 */}} -->
    <x-dialog v-model.trim="isShow4" class="demoDialog" hide-on-blur>
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/exampleOrder.png" alt="问答任务示例图" />
      </div>
      <div @click="isShow4=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Icon ,dateFormat } from 'vux';
export default {
  components: {
    Icon
  },
  props: {
    orderInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showIcon:false,
      Mincount:60,
      timer: null,
      showSec:false,
      endTimes:"",
      nowTime:"",
      shopNameTime:"", //  验证店铺时间
      compared_content:[],  //  货比三家截图
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4:false,
      waitCheckName:"",
      chat_pay_content: [],
      pic_uploads_box: [],
      appeal: {
        images: []
      },
      orderForm: {
        order_id: "",
        chat_pay_content: [],
        taobao_ordersn: "",
        need_principal: "",
        compared_content:[],
      },
    };
  },
  mounted() {
    this.shopNameTime=this.orderInfo.check_shop_time
    this.initArr(parseInt(this.orderInfo.pic_uploads_num || 1));
  if(this.orderInfo.check_shop_time !==0){
    this.showSec=true
    let checkTime= dateFormat(new Date(this.orderInfo.check_shop_time*1000), "YYYY-MM-DD HH:mm:ss")
    let nowTime= dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
    let time = new Date(checkTime.replace("-","/"));
    let minutes=1
    let endTime=time.setMinutes(time.getMinutes() + minutes);
    let endTimes= dateFormat(new Date(endTime), "YYYY-MM-DD HH:mm:ss")
    this.endTimes=endTimes
    this.nowTime=nowTime     
  }
   
  },
  watch: {    
    shopNameTime:function(val){
        val===0 ? this.waitCheckName==="" :this.orderInfo.shop_name;
    }
    
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    //  async getOrderInfo() {
    //   const result = await this.axios.post("/api/task/operateTask", {
    //     order_id: this.$route.params.id //订单ID
    //   });
    //   this.orderInfo = result.data.taskDetail || {};
    //   this.appeal.images=this.orderInfo.taskInfo.compared_content
    //   let checkShopTime=this.orderInfo.check_shop_time
    //   let nowTime=new Date()
    //   console.log(nowTime,'222')
    // },
    
    // 提交任务
    async subTask() {
      if (this.isEmptyArr().length !== this.chat_pay_content.length) {
        return this.$vux.toast.text("所有的截图都必须上传");
      }
      if (!this.orderForm.need_principal.length) {
        return this.$vux.toast.text("请输入实际付款金额");
      }
      if (!this.orderForm.taobao_ordersn.length) {
        return this.$vux.toast.text("请输入支付商户订单号");
      }
      this.$set(this.orderForm, "chat_pay_content", this.chat_pay_content);
      this.$set(this.orderForm, "order_id", this.orderInfo.order_id);
      this.$set(this.orderForm, "compared_content", this.appeal.images);
      await this.axios.post("/api/task/operateTaskCommit", this.orderForm);
      this.$vux.toast.show({
        type: "success",
        text: "提交成功"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    },
    initArr(length) {
      for (let i = 0; i < length; i++) {
        this.chat_pay_content.push("");
        this.pic_uploads_box.push({ uploadSrc: "" });
      }
    },
    // 判断数组元素是否有为空的情况
    isEmptyArr() {
      return this.chat_pay_content.filter(e => e.length);
    },
    checkName() {
      if (this.waitCheckName == this.orderInfo.shop_name) {
        this.showIcon="success"
        const result1 = this.axios.post("/api/task/validateShop", {
          order_id:this.orderInfo.order_id,//订单ID
          operation:"validate",
          shop_name: this.waitCheckName 
        });
        if(this.orderInfo.taskInfo.is_compared ===1){
          if(this.appeal.images.length !==0 ){
            this.showSec=true
            this.getCodeTime()
          }else{
            setTimeout(() => {
              return this.$vux.toast.text("请上传货比三家截图");
            }, 1000);
          }
        }else{
          this.showSec=true
          this.getCodeTime()
        }
       
        
      } else {
        this.showIcon="cancel"
        // this.$vux.toast.text("店铺名称错误！");
      }
    },
     // 倒计时
    async getCodeTime() {
      this.timer = setInterval(_ => {
        if (this.Mincount > 0) {
          this.Mincount--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);        
    },
     // 触发对应的上传
    async uploadPhotos(e, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(this.appeal, "images", [url]);
      }
    },
    async uploadPhoto(e, item, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(item, "uploadSrc", url);
        this.chat_pay_content.splice(ind, 1, url);
      }
    }

  }
};
</script>
