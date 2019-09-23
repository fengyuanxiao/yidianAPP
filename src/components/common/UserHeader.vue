<template>
  <div>
    <x-header
      id="headerBox"
      :left-options="{backText: '',preventGoBack:true}"
      @on-click-back="onclickBack"
    >
      <span>{{title}}</span>
      <router-link
        style="    color: #fff;font-size: 16px;"
        :to="righturl"
        v-if="righttitle"
        slot="right"
      >{{righttitle}}</router-link>
      <!-- <x-icon slot="right" type="navicon" size="35" style="fill:#fff;"></x-icon> -->
    </x-header>
    <div style="height:46px;"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    righturl: {
      type: String,
      ddefault: ""
    },
    righttitle: {
      type: String,
      ddefault: ""
    }
  },
  methods: {
    onclickBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less">
#headerBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999 !important;
  .vux-header-right {
    top: 13px !important;
  }
}
</style>
