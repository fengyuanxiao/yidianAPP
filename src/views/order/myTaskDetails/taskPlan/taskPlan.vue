<template>
  <div class="task-plans" v-if="orderInfo">
    <!-- <div class="plan"> -->
      <!-- <Progress className="plan-child" type="circle" percent={ orderInfo.order_status === 0? 25 : (orderInfo.order_status === 1? 50 : (orderInfo.order_status ===3? 75 : (orderInfo.order_status ===5? 95 : 100) )) } width={80} />-->
      <!-- <p>下一步：请点击操作任务按钮操作</p>
    </div> -->
   
    <!-- {/* 任务要求 */} -->
    <!-- <div class="planBox" v-if="orderInfo.is_muti_keyword === 1">
      <p class="title">
        <b class="plan-title">
          <span 
          class="firstOne"
          :style="orderInfo.order_status !==1 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'} "
          >1</span> 三关键词
        </b>
        <span></span>
      </p>
      <p class="taskPlanList showDistance">
        <span>{{orderInfo.platformname}}订单号</span>
        <span>{{orderInfo.taobao_ordersn}}</span>
      </p>
    </div> -->
    <!-- 1、订单付款 -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span 
          class="firstOne"
          :style="(orderInfo.order_status !==0 &&orderInfo.order_status !==1 && orderInfo.order_status !==3&& orderInfo.order_status !==4 && orderInfo.order_status !==5) ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'} "
          >1</span> 订单付款
        </b>
        <span></span>
      </p>
      <div class="taskPlanList showDistance">
        <span>货比三家</span>
        <div class="task-plan-list-img">
          <template v-if="orderInfo.compared_content.length !==0">
            <icon type="success"></icon>
            <!-- <img
              :src="orderInfo.compared_content"
              alt="货比三家截图"
            /> -->
          </template>
          <template v-if="orderInfo.compared_content.length ===0 && orderInfo.compared_time !==0">
            <icon type="success"></icon>
          </template>
        </div>
      </div>
      <div class="taskPlanList">
        <span>浏览店铺</span>
        <div class="task-plan-list-img">
          <template v-if="this.nowTime>this.endTimes && orderInfo.compared_time !==0">
            <icon type="success"></icon>
          </template>
        </div>
      </div>
      <div class="taskPlanList">
        <span>聊天下单</span>
        <div class="task-plan-list-img">
          <template v-if="orderInfo.chat_pay_content">
            <icon type="success"></icon>
            <!-- <img
              :key="ind"
              v-for="(item,ind) in orderInfo.chat_pay_content"
              @click="showImg(item)"
              :src="item"
              alt="聊天截图"
            /> -->
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
    <!-- {/* 2、商家确定订单 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne" 
                :style="orderInfo.order_status !== 1 && orderInfo.order_status !== 3 && orderInfo.order_status !== 4 && orderInfo.order_status !==5? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}
          ">2</span> 商家返款
        </b>
      </p>
      <p class="taskPlanList showDistance">
        <span>{{orderInfo.platformname}}订单编号</span>
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
          :style="orderInfo.order_status === 1? {backgroundColor: '#09BB07'} : {backgroundColor: '#ccc'}"
          @click="showMsg"
        >{{orderInfo.order_status === 3 ||orderInfo.order_status=== 4 ? '已返款' : '催返款'}}</button>
      </div>
    </div>
    <!-- {/* 3、收货好评 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 3 && orderInfo.order_status !== 4&& orderInfo.order_status !==5 && orderInfo.order_status !==9 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
          >3</span>
           收货好评 
        </b>
        <span></span>
      </p>
      <div class="taskPlanList showDistance">
        <span>物流截图，五星好评</span>
        <div class="task-plan-list-img" v-if="orderInfo.receive_evaluate_content">
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
        <span class="ask-start" style="width: 70%;">此单为普通五星好评 <span v-if="showEndTime>0" style="color:#FF9642">{{Math.floor(this.Mincount/60/60/24)+"天"+Math.floor((this.Mincount/3600)%24)+"小时"+Math.floor((this.Mincount/60)%60)+"分"}}签收后评价</span></span>
        <button v-if="orderInfo.order_status==3 && showEndTime<=0" style="background-color:#09BB07"> 
          <!-- && showEndTime<=0 -->
          <router-link
            style="color: #fff"
            :to="'/h5/order/dianfu/detail/goodPingJia/'+orderInfo.order_id"
          >收货好评</router-link>
        </button>
        <button v-else style="backgroundColor: #ccc">{{orderInfo.order_status=== 4 ?"已收货好评" : "收货好评"}}</button>
      </div>
    </div>
    <!-- {/* 追加评论 */} -->

    <div v-if="orderInfo.is_addcomments" class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 5&&orderInfo.order_status !== 4 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
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
            @click="showAddImg()"
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
        <button v-else style="backgroundColor: #ccc">{{orderInfo.order_status === 4 ? '已追加好评' : '去追加评论'}}</button>
      </div>
    </div>

    <!-- {/* 任务完成 */} -->
    <div class="planBox">
      <p class="title">
        <b class="plan-title">
          <span class="firstOne"
                :style="orderInfo.order_status !== 9 && orderInfo.order_status !== 4 ? {background: 'linear-gradient(-30deg,rgba(115,115,115,1),rgba(151,151,151,1))'} : {background: 'linear-gradient(0deg,rgba(24,144,255,1),rgba(119,190,255,1))'}"
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
    <!-- 收货好评实例 -->
    <x-dialog v-model.trim="isShow" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" :src="showSrc" alt="实例" />
      </div>
      <div @click="isShow=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
    <!-- 追加好评实例 -->
    <x-dialog v-model.trim="isAddShow" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" :src="orderInfo.addition_pic" alt="实例" />
      </div>
      <div @click="isAddShow=false">
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
  props: ["orderInfo"],
  data() {
    return {
      isShow: false,
      isAddShow:false,
      showSrc: "",
      showAddSrc:"",
      endTimes:"",
      nowTime:"",
      cData:{},
      timer: null,
      showEndTime:"",
      Mincount:"",
    };
  },
  watch: {
    //监听父组件传的orderInfo属性值，否则取不到
    orderInfo: function(val){
      this.cData = val;  //newVal即是chartData
      if(this.cData.compared_time !==0){
        let checkTime= dateFormat(new Date(this.cData.compared_time*1000), "YYYY-MM-DD HH:mm:ss")
        let nowTime= dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss")
        let time = new Date(checkTime.replace(/-/g, "/"));
        let minutes=3
        let endTime=time.setMinutes(time.getMinutes() + minutes);
        let endTimes= dateFormat(new Date(endTime), "YYYY-MM-DD HH:mm:ss")
        this.endTimes=endTimes
        this.nowTime=nowTime   
      }
      if(this.cData.order_status==3){
        if(this.cData.chat_pay_time ===0){
          var checkTime=this.cData.addtime
        }else{
          var checkTime= dateFormat(new Date(this.cData.chat_pay_time*1000), "YYYY-MM-DD HH:mm:ss")
        }
        
        let time = new Date(checkTime.replace(/-/g, "/"));
        let days=3
        let endTime=time.setDate(time.getDate() + days);
        let nowTime = new Date().getTime()
        let showTime=endTime-nowTime
        this.showEndTime=showTime
        let leftDays=Math.floor(showTime/(24*3600*1000)) //天数
        
        let leave1=showTime%(24*3600*1000) 
        let hours=Math.floor(leave1/(3600*1000))  //
        let leave2=leave1%(3600*1000)
        let leave3=leave2%(60*1000)     
        let seconds=Math.round(leave3/1000)
        let endMinutes=Math.floor(leave2/(60*1000))
        this.Mincount=leftDays*24*60*60+hours*60*60+endMinutes*60+seconds
        this.getCodeTime()
      }
    }
  },
  methods: {
    showImg(img) {
      this.showSrc = img;
      this.isShow = true;
    },
    showAddImg() {
      this.isAddShow = true;
    },
    showMsg() {
      this.$vux.toast.text("商家会在48小时内还款！");
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
  }
};
</script>
