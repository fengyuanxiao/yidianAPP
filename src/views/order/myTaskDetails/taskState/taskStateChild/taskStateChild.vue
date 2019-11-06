<template>
  <div class="taskStateChild-box">
    <user-header :title="'操作任务'"></user-header>
    <template v-if="orderInfo">
      <!-- {/* 目标商品详情介绍 */} -->
      <div class="task-plan" style="margin:0">
        <!-- {/* <div class="plan-box" style="marginTop: "2rem"">
            <p class="task-plan-list"><span>{shop_name}</span><Link to="/">如果遇到问题点击联系商家</Link></p>
        </div> */}-->
        <section class="taskDetail-header" style="padding:0">
          <p class="taskRenw">
            <span>目标商品</span>
          </p>
          <div class="taskDetail-header-button">
            <div style="width:30%">
              <img :src="orderInfo.goodspic" alt="商品图" style="width:100%;padding-right:0.3rem" />
            </div>
            <div style="width: 70%">
              <p style="font-weight:bold">{{orderInfo.goodsname.substring(0,2)}}****</p>
              <p>
                搜索展示价格：
                <span>{{orderInfo.searchprice}}</span>
              </p>
              <p>
                商品单件成交价格：
                <span class="make-num">{{orderInfo.itemprice}}元</span>
              </p>
              <p>
                下单件数：
                <span class="make-num">{{orderInfo.itemnum}}件</span>
              </p>
            </div>
          </div>
        </section>
      </div>
      <!-- {/* 任务要求 */} -->
      <div class="taskRenw">
        <!-- <Icon type="pushpin" theme="outlined" /> -->
        <span>任务要求</span>
      </div>
      <div class="plan-box task-plan" style="margin-bottom:0">
        <p class="task-plan-list">
          <span>任务类型</span>
          <span style="color:red">{{orderInfo.tasktype_name}}({{orderInfo.tasktype_itemname}})</span>
        </p>
        <p class="task-plan-list">
          <span>评价要求</span>
          <span>{{orderInfo.keyword_type_name}}</span>
        </p>
        <p class="task-plan-list" style="border:none">
          <span>搜索关键字</span>
          <span style="overflow:auto;word-break:keep-all">{{orderInfo.keyword}}</span>
        </p>
        <div v-if="orderInfo.is_muti_keyword">
          <p class="task-plan-list" style="border:none">
            <span>搜索关键字1</span>
            <span style="overflow:auto;word-break:keep-all">{{orderInfo.charset_two}}</span>
          </p>
          <p class="task-plan-list" style="border:none">
            <span>搜索关键字2</span>
            <span style="overflow:auto;word-break:keep-all">{{orderInfo.charset_one}}</span>
          </p>
        </div>
        <p class="task-plan-list-Child">
          <span>(打开{{orderInfo.platformname}}搜索关键词)</span>
          <span class="fontsi">注：如有关键字过长请左右拖动查看</span>
        </p>
        <p class="task-plan-list">
          <span>购买数量</span>
          <span>目标商品{{orderInfo.itemnum}}件</span>
        </p>
        <p v-for="(item,index) in orderInfo.sku_set" :key="index" class="task-plan-list">
          <span>商品规格：{{item.attribute_key}}</span>
          <span>{{item.attribute_value}}</span>
        </p>
        <p class="task-plan-list">
          <span>排序方式</span>
          <span>{{orderInfo.taskInfo.sortmsg}}排序</span>
        </p>
        <p class="task-plan-list">
          <span>排序位置</span>
          <span>约{{orderInfo.taskInfo.position}}人收货/付款</span>
        </p>
        <p class="task-plan-list">
          <span>所在地</span>
          <span>{{orderInfo.taskInfo.goods_address? orderInfo.taskInfo.goods_address: "全国"}}</span>
        </p>
        <p class="task-plan-list">
          <span>价格区间</span>
          <span>{{orderInfo.taskInfo.maxprice? orderInfo.taskInfo.minprice+"—"+orderInfo.taskInfo.maxprice : "无需筛选价格"}}</span>
        </p>
        <p class="task-plan-list">
          <span>支付方式</span>
          <span>
            <template v-for="item in orderInfo.taskInfo.paychannel">{{item}}</template>
          </span>
        </p>
        <p class="task-plan-list">
          <span>订单留言</span>
          <span style="overflow:'auto';wordBreak:'keep-all'">{{orderInfo.order_message||""}}</span>
        </p>
        <p class="task-plan-list-Child">
          <span>(查看订单留言)</span>
          <span class="fontsi">注：如内容过长请左右拖动查看</span>
        </p>
      </div>
      <!-- {/* 商家要求 */} -->
      <div class="taskRenw">
        <!-- <Icon type="pushpin" theme="outlined" /> -->
        <span>商家要求</span>
      </div>
      <div class="plan-box task-plan" style="margin-bottom:0">
        <!-- <div class="task-plan-list">
          <span style="text-align: left;color:red">商家要求：</span> -->
          <!-- {/* <span style="width: '70%',textAlign:'initial'}}>{this.props.location}</span> */} -->
        <!-- </div> -->
        <div style="margin:0 10px;">
          <template v-if="orderInfo.remark_pic.length  && orderInfo.remark_pic[0].length">
            <div v-for="(item,index) in orderInfo.remark_pic" :key="index">
              <span style="color:red;display:block;">{{orderInfo.taskInfo.remark}}</span>
              <img style="max-width:100%" :src="$url+item" />
            </div>
          </template>
          <p v-else>此商家没有额外要求</p>
        </div>
      </div>
      <!-- {/* 注意事项 */} -->
      <!-- {/* 任务步骤 */} -->
      <div class="taskRenw">
        <!-- <Icon type="edit" theme="outlined" /> -->
        <span>任务步骤</span>
      </div>
      <!-- {/* <LookShiliTu shop_name={shop_name} /> */} -->
      <!-- 链入任务步骤全部内容 -->
      <look-shili-tu :order-info="orderInfo"></look-shili-tu>
    </template>
    <!-- 提示弹窗 -->
    <x-dialog v-model.trim="isShow" class="demoDialog">
      <div class="img-box showBg">
        <div
          v-if="orderInfo"
          class="task-plan detailss"
          style="margin-bottom:0;text-align: left;height: 100%;overflow: auto;padding: 10px 15px;"
        >
          <p class="con_tilte">一点挣钱中接手任务的账号和{{orderInfo.platformname}}上实际下单的账号必须一致，下单<span style="color:red">不可代付</span>，如果发现直接封号</p>
          <p class="con_color"><span>•</span> 要求至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟可以留言“先下单了，如果有什么问题可以电话联系”然后直接下单</p>
          <p class="con_color"><span>•</span> 严禁和卖家旺旺聊天提<span style="color:red">“刷单”、“信誉”、“一点挣钱任务”</span>等敏感词</p>
          <p class="con_color"><span>•</span> 淘宝上实际下单的地址必须和一点挣钱接任务的<span style="color:red">淘宝账号绑定的地址一致</span>，如收货信息有变更请先更改信息后再接任务</p>
          <p class="con_color"><span>•</span> 一点挣钱所有订单<span style="color:red">不允许使用淘宝客、返利红包、积分等</span>优惠方式下单，出现将会从本金里面扣除返利佣金，两次以上永久封号</p>
          <p class="con_color"><span>•</span> 不允许使用<span style="color:red">信用卡、花呗等任何信用类</span>方式付款，不允许使用<span style="color:red">集分宝、淘金币、天猫积分等</span>积分抵扣付款金额，否则将会从本金扣除购物金额的1%的手续费或与积分对应的金额</p>
          <p class="con_color"><span>•</span> 一点挣钱的任务不参与好评返现，如果商家在任务中有要求使用店铺优惠券的可按商家要求领取抵扣的优惠券，返款只返实际支付的金额，一定要快递真实签收后才能确认收货并按照任务的评价要求给予5星好评</p>
        </div>
      </div>
      <div @click="isShow=false">
        <x-button type="primary" style="border-radius:5px;background:#FF2741" min>知道了</x-button>
      </div>
    </x-dialog>

    <!-- { datas ? <LookShiliTu chatpic={chatpic} user_taobao={user_taobao} platformname={platformname} tasktype_itemname={tasktype_itemname} platform={platform} goodsname={goodsname} shop_name={shop_name} pic_desc={pic_desc} pic_uploads_num={pic_uploads_num} history={this.props.history} is_muti_keyword={is_muti_keyword} order_id={order_id} /> : "" } -->
  </div>
</template>
<script>
import LookShiliTu from "./lookShiliTu/lookShiliTu";
import { cookie } from "vux";
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
<style>
@import "./taskStateChild.css";
</style>
