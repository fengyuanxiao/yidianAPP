<template>
  <section class="taskDetail-header" v-if="orderInfo">
    <p class="taskDetail-header-top">
      <span>目标商品</span>
      <span>
        <img class="iphone" src="@/assets/img/icon1.png" alt="手机端" />
      </span>
      <span>平台返款</span>
    </p>
    <div class="taskDetail-header-button">
      <img :src="orderInfo.goodspic||defaultImg" :onerror="onerror" alt="商品图" />
      <div>
        <p>
          商品成交价格：
          <span class="make-num">{{orderInfo.itemprice}}元</span>
        </p>
        <p>
          件数：
          <span class="make-num">{{orderInfo.itemnum}}件</span>
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
