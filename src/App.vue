<template>
  <div id="app">
    <!-- <div v-if="firstEnter" class="imgSwiperFirst" width="100%">
      <swiper :height="height" v-model.trim="swiperItemIndex" dots-position="center">
        <swiper-item class="swiper-demo-img">
          <img src="@/assets/img/3.jpg">
      	</swiper-item>
          <swiper-item class="swiper-demo-img">
            <img src="@/assets/img/2.jpg">
      	</swiper-item>
            <swiper-item class="swiper-demo-img">
              <img src="@/assets/img/1.jpg">
              <x-button plain type="primary" class="go" @click.native="goEnter">立即体验</x-button>
            </swiper-item>
      </swiper>
    </div>-->
    <template>
      <router-view />
    </template>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "vux";
export default {
  // data() {
  //   return {
  //     firstEnter: true,
  //     swiperItemIndex: 0,
  //     height: "500px"
  //   }
  // },
  // components: {
  //   Swiper,
  //   SwiperItem,
  // },
  mounted() {
    // this.height = document.body.clientHeight + 'px'
    // if (this.$utils.storage.get('firstEnter')) {
    //   this.firstEnter = false
    // } else {
    //   this.firstEnter = true
    // }
  }
  // methods:{
  //   goEnter() {
  //     this.$utils.storage.set('firstEnter', 1)
  //     this.firstEnter = false
  //   }
  // }
};
</script>
<style lang='less'>
@import "./assets/css/common.less";

.imgSwiperFirst {
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .go {
    position: fixed;
    z-index: 99 !important;
    bottom: 30px;
    width: 140px !important;
    left: 50%;
    color: #f48502;
    border-color: #f48502;
    margin-left: -70px !important;
  }
}
</style>
