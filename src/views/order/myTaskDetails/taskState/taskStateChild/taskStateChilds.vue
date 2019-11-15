<template>
  <div class="taskStateChild-box">
    <user-header :title="'多关键词操作任务'"></user-header>
    <template v-if="orderInfo">
      <!-- {/* 目标商品详情介绍 */} -->
      <div class="task-plan" style="margin:10px">
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
              <p
                style="font-weight:bold"
              >{{orderInfo.goodsname?orderInfo.goodsname.substring(0,4)+'******':orderInfo.goodsname||''}}</p>
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
      
      <div class="plan-box task-plan" style="margin-bottom:0">
        <div class="taskRenw">
          <!-- <Icon type="pushpin" theme="outlined" /> -->
          <span>任务要求</span>
        </div>
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
        <p class="task-plan-list">
          <span>购买数量</span>
          <span>目标商品{{orderInfo.itemnum}}件</span>
        </p>
        <template v-if="orderInfo.datas">
          <p v-for="(item,index) in orderInfo.sku_set" :key="index" class="task-plan-list">
            <span>商品规格：{{item.attribute_key}}</span>
            <span>{{item.attribute_value}}</span>
          </p>
        </template>
        <p class="task-plan-list">
          <span>排序方式</span>
          <span>{{orderInfo.sortmsg}}排序</span>
        </p>
        <p class="task-plan-list">
          <span>排序位置</span>
          <span>约{{orderInfo.position}}人收货/付款</span>
        </p>
        <p class="task-plan-list">
          <span>所在地</span>
          <span>{{orderInfo.goods_address? orderInfo.goods_address: "全国"}}</span>
        </p>
        <p class="task-plan-list">
          <span>价格区间</span>
          <span>{{orderInfo.maxprice? orderInfo.minprice+"—"+orderInfo.maxprice : "无需筛选价格"}}</span>
        </p>
        <p class="task-plan-list">
          <span>支付方式</span>
          <span>
            <template v-if="orderInfo.paychannel">
              <template v-for="item in orderInfo.paychannel">{{item}}</template>
            </template>
          </span>
        </p>
        <p class="task-plan-list">
          <span>订单留言</span>
          <span style="overflow:auto;wordBreak:keep-all">{{orderInfo.remark||""}}</span>
        </p>
      </div>
      <!-- {/* 商家要求 */} -->
      
      <div v-if="orderInfo.remark_pic.length && orderInfo.remark_pic[0].length" class="plan-box task-plan" style="margin:10px;">
        <div class="taskRenw">
          <!-- <Icon type="pushpin" theme="outlined" /> -->
          <span>商家要求</span>
        </div>

        <div>
          <template >
            <img
              style="max-width:100%"
              v-for="(item,index) in orderInfo.remark_pic"
              :key="index"
              :src="$url+item"
            />
          </template>
        </div>
      </div>
      <div class="plan-box task-plan" style="margin:10px">
        <h3 style="color:#c15958;">核对商家店铺名是否正确</h3>
        <!-- <div class="shop-title"> -->
          <p>商家店铺名称:{{orderInfo.shop_name.substring(0,2)+'***'}}</p>
        <!-- </div> -->
        <div class="shop-title" style="border:none;padding-bottom:0px">
            <x-input v-model.trim="waitCheckName" placeholder="请在此输入店铺名核对"></x-input>
            <icon :type="showIcon" style="margin-right:25px" v-if="showIcon"></icon>
            <x-button type="primary" @click.native="checkName" style="width:30%">核对</x-button>
        </div>
      </div>
      <!-- {/* 注意事项 */} -->
      <!-- {/* 任务步骤 */} -->
     
      <div class="task-plan buzhou" style="margin:10px">
        <div class="taskRenw">
          <!-- <Icon type="edit" theme="outlined" /> -->
          <span>任务步骤</span>
        </div>
        <div class="buzou-title">
          <span>第一步 货比三家</span>
          <span @click="isShow=true">点击查看示例</span>
        </div>
        <p>.请确认使用{{orderInfo.user_taobao}}（{{orderInfo.platformname}}账号）登入{{orderInfo.tasktype_itemname}}APP</p>
        <p>
          .第一个关键词
          <span class="charsets">（{{orderInfo.charset_one}}）</span>搜索 找到对应的主宝贝店外截图
        </p>
        <p>.进店浏览2-3分钟后 收藏主宝贝 退出</p>
        <p>
          .第二个关键词
          <span class="charsets">（{{orderInfo.charset_two}}）</span>搜索 找到对应的主宝贝店外截图
        </p>
        <p>.进店浏览2-3分钟后 关注（收藏）店铺退出</p>
        <p>.提交任务后等待审核通过,未审核前下单任务无效</p>
        <p>.审核通过，客服会通知即可用主关键词搜索进店 浏览 拍下产品 提交任务</p>
        <p
          class="charsets"
        >*请上传必要截（关键词{{orderInfo.charset_one}}搜索截图），（收藏夹截图），（关键词{{orderInfo.charset_two}}搜索截图），（关注（收藏）店铺截图）4张截图，上传可任意位置。</p>
        <div class="upicFlex">
          <div class="upic" v-for="(item,ind) in pic_uploads_box" :key="ind">
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
      <group style="margin:10px;">
        <x-button @click.native="subTask" type="primary" class="login-form-x-button">提交任务</x-button>
      </group>
    </template>
    <x-dialog v-model.trim="isShowInfo" class="demoDialog">
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
      <div @click="isShowInfo=false">
        <x-button type="primary" style="border-radius:5px;background:#FF2741" min>知道了</x-button>
      </div>
    </x-dialog>
    <!-- {/* 第一步货比三家的图片示例 */} -->
    <x-dialog v-model.trim="isShow" class="demoDialog">
      <div class="img-box">
        <img class="shilitu" src="@/assets/img/guanjianci.png" alt="货比三家" />
      </div>
      <div @click="isShow=false">
        <span class="vux-close">X</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Icon } from 'vux';
export default {
  components: {
    Icon
  },
  data() {
    return {
      showIcon:false,
      orderInfo: null,
      pic_uploads_box: [
        { uploadSrc: "" },
        { uploadSrc: "" },
        { uploadSrc: "" },
        { uploadSrc: "" }
      ],
      isShowInfo: false,
      isShow: false,
      waitCheckName: "",
      chat_pay_content: ["", "", "", ""]
    };
  },
  async mounted() {
    await this.getOrderInfo();
    if (this.$utils.tools.isFirstVisitOfTody()) {
      this.isShowInfo = true;
      localStorage.setItem("firstVisitTimeOfTody", new Date());
    }
  },
  methods: {
    async getOrderInfo() {
      const result = await this.axios.post("/api/task/operateTask", {
        order_id: this.$route.params.id //订单ID
      });
      this.orderInfo = result.data.taskDetail || {};
    },
    async uploadPhoto(e, item, ind) {
      const url = await this.$utils.tools.base64Img(e);
      if (url === "big") {
        this.$vux.toast.text("图片不能超过10M");
      } else {
        this.$set(item, "uploadSrc", url);
        this.chat_pay_content.splice(ind, 1, url);
      }
      // console.log(this.chat_pay_content);
    },
    // 提交任务
    async subTask() {
      if (this.isEmptyArr().length !== this.chat_pay_content.length) {
        return this.$vux.toast.text("所有的截图都必须上传");
      }
      await this.axios.post("/api/task/mutikeyword", {
        order_id: this.orderInfo.order_id,
        shop_around_content: this.chat_pay_content
      });
      this.$vux.toast.show({
        type: "success",
        text: "提交成功"
      });
      setTimeout(() => {
        this.$router.back();
      }, 1500);
    },
    // 判断数组元素是否有为空的情况
    isEmptyArr() {
      return this.chat_pay_content.filter(e => e.length);
    },
    checkName() {
      if (this.waitCheckName === this.orderInfo.shop_name) {
        // this.$vux.toast.text("店铺名称正确！");
        this.showIcon="success"
      } else {
        this.showIcon="cancel"
        // this.$vux.toast.text("店铺名称错误！");
      }
    }
  }
};
</script>
<style>
@import "./taskStateChild.css";
</style>
