<template>
  <section class="taskDetail-header" v-if="orderInfo">
    <p class="taskType">
      任务类型：垫付任务
    </p>
    <p class="taskDetail-header-top">
      <span style="font-size: 15px;color: #444;">目标商品</span>
      <!-- <span>
        <img class="iphone" src="@/assets/img/icon1.png" alt="手机端" />
      </span> -->
      <span class="platformMoney">平台返款</span>
      <span>买号：{{orderInfo.user_taobao}}</span>
    </p>
    <div class="taskDetail-header-button">
      <div style="width:28%;margin-right:0.8rem">
        <img :src="orderInfo.goodspic||defaultImg" :onerror="onerror" alt="商品图" style="width:100%;height:100%"/>
      </div>    
      <div style="width: 70%;line-height: 24px;">
        <p>
          编号：
          <span>{{orderInfo.order_id}}</span>
        </p>
        <p>
          件数：
          <span>{{orderInfo.itemnum}}件</span>
        </p>
        <p>
          垫付本金：
          <span>{{orderInfo.itemprice}}元</span>
        </p>
        <p>
          佣金：
          <span class="make-num">{{orderInfo.itemnum}}343</span>元
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["orderInfo"],
  data() {
    return {
      defaultImg: require("@/assets/img/img2.png"),
      onerror: "this.src='" + require("@/assets/img/img2.png") + "'"
    };
  }
};
</script>
