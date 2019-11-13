<template>
  <div class="task-plans" v-if="orderInfo">
    <!-- <div class="plan"> -->
      <!-- <Progress className="plan-child" type="circle" percent={ orderInfo.order_status === 0? 25 : (orderInfo.order_status === 1? 50 : (orderInfo.order_status ===3? 75 : (orderInfo.order_status ===5? 95 : 100) )) } width={80} />-->
      <!-- <p>下一步：请点击操作任务按钮操作</p>
    </div> -->
    <!-- <div class="planBox">
      <p class="taskPlanList">
        <span>接受任务</span>
        <span>{{orderInfo.addtime}}</span>
      </p>
      <p class="taskPlanList">
        <span>任务编号</span>
        <span>{{orderInfo.order_id}}</span>
      </p>
      <p class="taskPlanList">
        <span>买号</span>
        <span>{{orderInfo.user_taobao}}</span>
      </p>
      <div class="taskPlanList">
        <span>商品金额</span>
        <span>{{orderInfo.itemprice}}*{{orderInfo.itemnum}}件</span>
      </div>
    </div> -->
    <!-- {/* 任务要求 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span 
          class="firstOne"
          :style="orderInfo.order_status !==0 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'} "
          >1</span> 订单付款
        </b>
        <span></span>
      </p>
      <p class="taskPlanList showDistance">
        <span>货比三家</span>
        <span></span>
      </p>
      <p class="taskPlanList">
        <span>浏览店铺</span>
        <span></span>
      </p>
      <!-- <p class="taskPlanList">
        <span>订单编号</span>
        <span></span>
      </p> -->
      <div class="taskPlanList">
        <span>聊天下单</span>
        <div class="task-plan-list-img">
          <template v-if="orderInfo.chat_pay_content">
            <img
              :key="ind"
              v-for="(item,ind) in orderInfo.chat_pay_content"
              @click="showImg(item)"
              :src="item"
              alt="聊天截图"
            />
          </template>
        </div>
      </div>
      <!-- <p class="changePic">商家确认订单前点击可更换图片</p> -->
      <!-- <div class="taskPlanList">
        <span class="ask-start">商家确认订单前点击可更换图片</span> -->
        <!-- <button
          :style="orderInfo.order_status === 0 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'} "
        >操作任务</button>-->
      <!-- </div> -->
      <!-- <p class="waitOrder">等待订单付款</p> -->
    </div>
    <!-- {/* 商家确定订单 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne" 
                :style="orderInfo.order_status !== 1 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}
          ">2</span> 商家返款
        </b>
      </p>
      <p class="taskPlanList showDistance">
        <span>{{orderInfo.platformname}}订单号</span>
        <span>{{orderInfo.taobao_ordersn}}</span>
      </p>
      <p class="taskPlanList">
        <span>返款方式</span>
        <span>平台返款</span>
      </p>
      <p class="taskPlanList">
        <span>返款账号</span>
        <span>默认返款账号</span>
      </p>
      <p class="taskPlanList">
        <span>返款金额</span>
        <span>{{orderInfo.need_principal}}</span>
      </p>
      <div class="taskPlanList">
        <span class="ask-start">平台规定商家48小时内还款</span>
        <button
          :disabled="orderInfo.order_status !== 1"
          :style="orderInfo.order_status === 1 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'}"
          @click="showMsg"
        >催返款</button>
      </div>
    </div>
    <!-- {/* 收货好评 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 3 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
          >3</span>
           收货好评
        </b>
        <span></span>
      </p>
      <div class="taskPlanList showDistance">
        <span>物流截图，五星好评</span>
        <div class="task-plan-list-img">
          <!-- {/* 循环出物流截图和好评截图显示 */} -->

          <img
            v-for="(item,index) in orderInfo.receive_evaluate_content"
            :key="index"
            @click="showImg(item)"
            :src="item"
            alt="物流截图"
          />
        </div>
      </div>
      <div class="taskPlanList">
        <span class="ask-start" style="width: 70%;">此单为普通五星好评 点击查看评价要求</span>
        <button v-if="orderInfo.order_status==3" style="background-color:#66caa8">
          <router-link
            style="color: #fff"
            :to="'/h5/order/dianfu/detail/goodPingJia/'+orderInfo.order_id"
          >收货好评</router-link>
        </button>
        <button v-else style="backgroundColor: #ccc">收货好评</button>
      </div>
    </div>
    <!-- {/* 追加评论 */} -->

    <div v-if="orderInfo.is_addcomments" class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 5 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
          >{{orderInfo.is_addcomments? "4" : "3" }}</span>追加好评
        </b>
        <span></span>
      </p>
      <div class="taskPlanList">
        <span>追评截图</span>
        <div class="task-plan-list-img">
          <!-- {/* 循环出物流截图和好评截图显示 */} -->

          <img
            v-if="orderInfo.addition_pic"
            @click="this.showsShilia"
            :src="orderInfo.addition_pic"
            alt="物流截图"
          />
        </div>
      </div>
      <div class="taskPlanList">
        <span class="ask-start">此单需要追评 点击查看追评图片</span>
        <button v-if="orderInfo.order_status === 5" style="backgroundColor: #66caa8">
          <router-link
            style="color:#fff"
            :to="'/h5/order/dianfu/detail/addPingJia/'+orderInfo.order_id"
          >去追加评论</router-link>
        </button>
        <button v-else style="backgroundColor: #ccc">去追加评论</button>
      </div>
    </div>

    <!-- {/* 任务完成 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 4 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
          >{{ orderInfo.is_addcomments? "5" : "4" }}</span>
           完成任务
        </b>
        <span></span>
      </p>
      <div class="taskPlanList showDistance">
        <span class="ask-start">平台规定商家48小时内返款</span>
        <button
          :style="orderInfo.order_status === 4 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'}"
        >获得佣金</button>
      </div>
    </div>
    <x-dialog v-model.trim="isShow" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" :src="showSrc" alt="实例" />
      </div>
      <div @click="isShow=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
export default {
  props: ["orderInfo"],
  data() {
    return {
      isShow: false,
      showSrc: ""
    };
  },
  methods: {
    showImg(img) {
      this.showSrc = img;
      this.isShow = true;
    },
    showMsg() {
      this.$vux.toast.text("商家会在48小时内还款！");
    }
  }
};
</script>
