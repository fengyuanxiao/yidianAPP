<template>
  <div>
    <!-- {{/* 第一步货比三家 */}} -->
    <div class="task-plan buzhou" v-if="orderInfo">
      <div class="buzou-title">
        <span>第一步 货比三家</span>
        <span @click="isShow1=true">点击查看示例</span>
      </div>
      <p>.请确认使用{{orderInfo.user_taobao}}（{{orderInfo.platformname}}账号）登入{{orderInfo.tasktype_itemname}}APP</p>
      <p>.打开{{orderInfo.tasktype_itemname}}，在搜索框手动输入指定关键词</p>
      <p>.按任务要求先浏览任意三家同类产品1-3分钟</p>
      <h3 style="color:#c15958; margin-top:1rem">核对商家店铺名是否正确</h3>
      <div class="shop-title">
        <span>1</span>
        <span>商家店铺名称:{{orderInfo.shop_name.substring(0,2)+'***'}}</span>
      </div>
      <div class="shop-title">
        <!-- <span>2</span> -->
        <group>
          <x-input v-model.trim="waitCheckName" placeholder="请在此输入店铺名核对"></x-input>
        </group>
        <group>
          <x-button type="primary" @click.native="checkName">{{this.waitCheckName === this.orderInfo.shop_name ? '核对正确' : '核对'}}</x-button>
        </group>
      </div>
      <!-- {{/* 第二步 浏览店铺 */}} -->
      <div v-if="showSec" class="buzou-title" >
        <span>第二步 浏览店铺</span>
        <span @click="isShow2=true">点击查看示例</span>
      </div>
      <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>

      <p v-if="orderInfo.platform===5">按照商家指定的下单方式进行下单，下单方式请拉到顶部查看拼团类型</p>

      <div v-else-if="orderInfo.platform===6">
        <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
        <p>.然后从购物车提交订单</p>
      </div>

      <div v-else>
        <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
        <p>.返回任务商品，直接点击购买（警示：勿从购物车提交订单）</p>
      </div>

      <!-- 第三步 聊天下单支付 -->
      <div v-if="showThird">
        <div v-if="orderInfo.platform===1">
          <div class="buzou-title" >
            <span>第三步 {{orderInfo.platform===1? "聊天下单支付" : "上传订单截图"}}</span>
            <span @click="isShow3=true">点击查看示例</span>
          </div>

          <div v-if="orderInfo.is_muti_keyword">
            <p>.主关键词搜索 找到对应任务宝贝店外截图 进店浏览2-3分钟 任务宝贝加入购物车 退出 上传正确的图</p>
            <p>.点开购物车 截图购物车里的任务宝贝 上传正确的图</p>
          </div>
          <p>.需按商家要求选择是否聊天下单支付，或直接提交订单不聊天</p>
          <p>.付款完成后，进入支付账单详情页面，截图上传</p>
          <!-- {{/* <p style="color:'red', fontWeight:'bold' }}}}>.如商家备注无需聊天，聊天图上传支付宝账单替代</p> */}} -->
          <p
            class="liaotian"
            v-if="!orderInfo.is_muti_keyword"
          >{{orderInfo.chatpic?'此任务商家要求聊天':'此任务不需要聊天'}}</p>
        </div>

        <div v-else class="buzou-title">
          <span>第三步 上传订单截图</span>
          <span @click="isShow3=true">点击查看示例</span>
        </div>
        <!-- {{/* 支付宝 账单截图 */}} -->
        <div class="upicFlex">
          <div
            class="upic"
            v-for="(item,ind) in pic_uploads_box"
            :key="ind"
            style="padding-right:5px;background:#fff"
          >
            <div style="border:1px solid #ccc">
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
        </div>
        <p class="jietuFont">
          注：请上传
          <span style="font-weight:bold;font-size:1rem;color:red">（{{orderInfo.pic_desc}}）</span>
        </p>
        <p style="color:red;padding-top: 10px;font-size: 16px;">注：{{Math.floor(this.Mincount/60)+"分"+this.Mincount%60}}秒后才能继续操作下一步</p>
      </div>
      <!-- 第四步 订单信息核对 -->
      <div v-if="showFourth">
        <div class="buzou-title">
          <span style="color:#63bb95">第四步 订单信息核对</span>
        </div>
        <p>应垫付金额:{{orderInfo.need_principal}}元(请按实际垫付金额填写，实际相差超50元请取消任务)</p>

        <p
          v-if="orderInfo.platform===1"
          style="color: red; font-weight:bold; margin-bottom:1rem"
        >商户订单号可在支付账单详情中复制</p>

        <p v-else style="color: red; font-weight:bold; margin-bottom:1rem">订单号可在订单详情中复制</p>
        <div class="login-form">
          <group>
            <x-input
              type="number"
              v-model.trim="orderForm.need_principal"
              placeholder="请输入实际付款金额"
              class="jineInput"
              :disabled="this.Mincount>0"
            ></x-input>
          </group>
          <group>
            <x-input
              placeholder="请输入支付商户订单号"
              v-model.trim="orderForm.taobao_ordersn"
              class="jineInput"
              :disabled="this.Mincount>0"
            ></x-input>
          </group>
          <group>
            <x-button type="primary" class="login-form-x-button" @click.native="subTask">提交任务</x-button>
          </group>
        </div>
      </div>
    </div>

    <!-- {{/* 第一步货比三家的图片示例 */}} -->
    <x-dialog v-model.trim="isShow1" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/4444.jpg" alt="问答任务示例图" />
      </div>
      <div @click="isShow1=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- <img class="shilitu" src={{require('../../../../../img/4444.jpg')}} alt="货比三家" /> -->
    <!-- {{/* 第二步浏览店铺的图片示例 */}} -->
    <x-dialog v-model.trim="isShow2" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/5555.jpg" alt="问答任务示例图" />
      </div>
      <div @click="isShow2=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- <img class="shilitu" src={{require('../../../../../img/5555.jpg')}} alt="浏览店铺" /> -->
    <!-- {{/* 第三步聊天下单支付的图片示例 */}} -->
    <x-dialog v-model.trim="isShow3" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/6666.jpg" alt="问答任务示例图" />
      </div>
      <div @click="isShow3=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!--  <img class="shilitu" src={{platform === 1? require('../../../../../img/6666.jpg') : (platform === 2? require('../../../../../img/jdshili.jpg') : (platform === 5? require('../../../../../img/pddorder.png') : require('../../../../../img/wphorder.jpg')))}} alt="聊天下单" /> -->
  </div>
</template>
<script>
export default {
  props: {
    orderInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      Mincount:300,
      timer: null,
      showSec:false,
      showThird:false,
      showFourth:false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      waitCheckName: "",
      chat_pay_content: [],
      pic_uploads_box: [],
      orderForm: {
        order_id: "",
        chat_pay_content: [],
        taobao_ordersn: "",
        need_principal: ""
      }
    };
  },
  mounted() {
    this.initArr(parseInt(this.orderInfo.pic_uploads_num || 1));
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
     async getOrderInfo() {
      const result = await this.axios.post("/api/task/operateTask", {
        order_id: this.$route.params.id //订单ID
      });
      this.orderInfo = result.data.taskDetail || {};
    },
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
      if (this.waitCheckName != this.orderInfo.shop_name) {
         this.$vux.toast.text("店铺名称错误！");
      } 
    },
     // 弹窗倒计时
    async getCodeTime() {
      this.timer = setInterval(_ => {
        if (this.Mincount > 0) {
          this.Mincount--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);        
    },
    async uploadPhoto(e, item, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(item, "uploadSrc", url);
        this.chat_pay_content.splice(ind, 1, url);
      }
      // if(this.chat_pay_content !==""){
       
      // }
    }

  }
};
</script>
