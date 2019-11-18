<template>
  <div class="taskStateChild-box">
    <user-header :title="'操作任务'"></user-header>
    <template v-if="orderInfo">
      <!-- {/* 目标商品详情介绍 */} -->
      <div class="task-plan taskPlan" style="margin:10px 10px;">
        <section class="taskDetail-header" style="padding:0;margin: 10px 0px 0 0px;">
          <p class="taskRenw">
            <span>目标商品</span>
          </p>
          <div class="taskDetail-header-button">
            <div style="width:30%;margin-right:0.8rem">
              <img :src="orderInfo.goodspic" alt="商品图" style="width:100%;height:100%" />
            </div>
            <div style="width: 75%;color:#444;">
              <p style="font-weight:bold;line-height: 24px;">{{orderInfo.goodsname.substring(0,2)}}****</p>
              <p style="line-height: 24px;">
                搜索展示价格：
                <span class="makeNum">{{orderInfo.searchprice}}</span>
              </p>
              <p style="line-height: 24px;">
                商品单件成交价格：
                <span class="makeNum">{{orderInfo.itemprice}}元</span>
              </p>
              <p style="line-height: 24px;">
                下单件数：
                <span class="makeNum">{{orderInfo.itemnum}}件</span>
              </p>
            </div>
          </div>
          <span v-if="orderInfo.sku_set.length !==0">下单规格和尺寸:</span>
          <p v-for="(item,index) in orderInfo.sku_set" :key="index" style="display:inline-block">
            <span class="make-num" style="font-size:14px"> {{item.attribute_key}}:</span>
            <span class="make-num" style="padding-right:8px;font-size:14px">{{item.attribute_value}} </span>
          </p>
        </section>
      </div>

      <!-- {/* 任务要求 */} -->      
      <div class="plan-box task-plan" style="margin-bottom:10px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">
        <div class="taskRenw">
          <!-- <Icon type="pushpin" theme="outlined" /> -->
          <span>任务要求</span>
        </div>
        <p class="task-plan-list">
          <span>任务类型</span>
          <span style="color:#FF9642">{{orderInfo.new_type ==1 ? '垫付任务' :orderInfo.new_type ==2?'回访任务' :orderInfo.new_type ==3 ? '图文任务' :orderInfo.new_type ==4 ?'问答任务':'浏览任务'}}({{orderInfo.tasktype_itemname}})</span>
        </p>
        <p class="task-plan-list">
          <span>是否包邮</span>
          <span>{{orderInfo.postsign ===0 ?'不包邮' :'包邮'}}</span>
        </p>
        <p class="task-plan-list">
          <span style="color:#FF9642;">{{orderInfo.is_muti_keyword ? '搜索主关键字' : '搜索关键字'}}</span>
          <span style="overflow:auto;word-break:keep-all;color:#FF9642;">{{orderInfo.keyword}}</span>
        </p>
         <div v-if="orderInfo.is_muti_keyword &&orderInfo.order_status !==0">
          <p class="task-plan-list">
            <span>搜索关键字1</span>
            <span style="overflow:auto;word-break:keep-all">{{orderInfo.charset_two}}</span>
          </p>
          <p class="task-plan-list">
            <span>搜索关键字2</span>
            <span style="overflow:auto;word-break:keep-all">{{orderInfo.charset_one}}</span>
          </p>
        </div> 
        <p class="task-plan-list">
          <span>购买数量</span>
          <span>{{orderInfo.itemnum}}件</span>
        </p>
        <p class="task-plan-list">
          <span>排序方式</span>
          <span>{{orderInfo.taskInfo.sortmsg}}排序</span>
        </p>
        <p class="task-plan-list">
          <span>付款人数/收货人数</span>
          <span>约{{orderInfo.taskInfo.position}}人收货/付款</span>
        </p>
        <p class="task-plan-list">
          <span>发货地</span>
          <span>{{orderInfo.taskInfo.goods_address? orderInfo.taskInfo.goods_address: "全国"}}</span>
        </p>
        <p class="task-plan-list" v-if="orderInfo.taskInfo.maxprice">
          <span>价格区间</span>
          <span>{{orderInfo.taskInfo.maxprice? orderInfo.taskInfo.minprice+"—"+orderInfo.taskInfo.maxprice : "无需筛选价格"}}</span>
        </p>
        <p class="task-plan-list">
          <span>评价要求</span>
          <span>{{orderInfo.keyword_type_name}}</span>
        </p>            
        <p v-for="(item,index) in orderInfo.sku_set" :key="index" class="task-plan-list">
          <span>商品规格：{{item.attribute_key}}</span>
          <span>{{item.attribute_value}}</span>
        </p>       
        <p class="task-plan-list" >
          <span>支付方式</span>
          <span v-if="orderInfo.taskInfo.paychannel ===0" style="color:#FF9642">不支持优惠券、信用卡、花呗</span>
          <span v-if="orderInfo.taskInfo.paychannel !==0">
            <template v-for="item in orderInfo.taskInfo.paychannel">{{item+'、'}}</template>
          </span>
        </p>
        <p class="task-plan-list" v-if="orderInfo.order_message !==''">
          <span>订单留言</span>
          <span style="overflow:'auto';wordBreak:'keep-all'">{{orderInfo.order_message}}</span>
        </p>
      </div>
      <!-- {/* 商家要求 */} -->
      
      <div v-if="orderInfo.remark_pic.length  && orderInfo.remark_pic[0].length" class="plan-box task-plan">
        <div class="taskRenw">
          <!-- <Icon type="pushpin" theme="outlined" /> -->
          <span>商家要求</span>
        </div>
        <div style="margin:0 10px;">
          <template v-if="orderInfo.remark_pic.length  && orderInfo.remark_pic[0].length">
            <div v-for="(item,index) in orderInfo.remark_pic" :key="index">
              <span style="color:#FF9642;display:block;">{{orderInfo.taskInfo.remark}}</span>
              <img style="max-width:100%" :src="$url+item" />
            </div>
          </template>
        </div>
      </div>
      
      <!-- {/* 任务步骤 */} -->     
      <!-- {/* <LookShiliTu shop_name={shop_name} /> */} -->
      <look-shili-tu :order-info="orderInfo"></look-shili-tu>
    </template>

    <!-- {/* 注意事项 */} -->
    <div id="ll_mask" v-if="isShow">
      <div id="mask"></div>
      <div class="ll_mask_con">
        <div class="showBackg">
          <div
            v-if="orderInfo"
            class="task-plan detailss"
            style="margin-bottom:5px;text-align: left;height:340px;overflow: auto;padding: 10px 16px;margin-top: 140px;"
          >
            <p class="con_tilte">一点挣钱中接手任务的账号和{{orderInfo.platformname}}上实际下单的账号必须一致，下单<span style="color:red">不可代付</span>，如果发现直接封号</p>
            <p class="con_color"><span>•</span> 要求至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟可以留言“先下单了，如果有什么问题可以电话联系”然后直接下单</p>
            <p class="con_color"><span>•</span> 严禁和卖家旺旺聊天提<span style="color:red">“刷单”、“信誉”、“一点挣钱任务”</span>等敏感词</p>
            <p class="con_color"><span>•</span> 淘宝上实际下单的地址必须和一点挣钱接任务的<span style="color:red">淘宝账号绑定的地址一致</span>，如收货信息有变更请先更改信息后再接任务</p>
            <p class="con_color"><span>•</span> 一点挣钱所有订单<span style="color:red">不允许使用淘宝客、返利红包、积分等</span>优惠方式下单，出现将会从本金里面扣除返利佣金，两次以上永久封号</p>
            <p class="con_color"><span>•</span> 不允许使用<span style="color:red">信用卡、花呗等任何信用类</span>方式付款，不允许使用<span style="color:red">集分宝、淘金币、天猫积分等</span>积分抵扣付款金额，否则将会从本金扣除购物金额的1%的手续费或与积分对应的金额</p>
            <p class="con_color"><span>•</span> 一点挣钱的任务不参与好评返现，如果商家在任务中有要求使用店铺优惠券的可按商家要求领取抵扣的优惠券，返款只返实际支付的金额，一定要快递真实签收后才能确认收货并按照任务的评价要求给予5星好评</p>           
          </div>
          <div @click="isShow=false">
            <x-button type="primary" style="border-radius:5px;background:#FF2741;height: 45px;" min>知道了</x-button>
          </div>
        </div>         
      </div>
    </div>
    <!-- { datas ? <LookShiliTu chatpic={chatpic} user_taobao={user_taobao} platformname={platformname} tasktype_itemname={tasktype_itemname} platform={platform} goodsname={goodsname} shop_name={shop_name} pic_desc={pic_desc} pic_uploads_num={pic_uploads_num} history={this.props.history} is_muti_keyword={is_muti_keyword} order_id={order_id} /> : "" } -->
  </div>
</template>
<script>
import LookShiliTu from "./lookShiliTu/lookShiliTu";
import { cookie,dateFormat } from "vux";
export default {
  components: {
    LookShiliTu
  },
  data() {
    return {
      isShow: false,
      orderInfo: null
    };
  },
  async mounted() {
    await this.getOrderInfo();
    if (this.$utils.tools.isFirstVisitOfTody()) {
      this.isShow = true;
      localStorage.setItem("firstVisitTimeOfTody", new Date());
    }
  },
  methods: {
    async getOrderInfo() {
      const result = await this.axios.post("/api/task/operateTask", {
        order_id: this.$route.params.id //订单ID
      });
      this.orderInfo = result.data.taskDetail || {};
    }
  }
};
</script>
<style lang="less">
@import "./taskStateChild.css";
</style>
