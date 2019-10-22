<template>
  <div class="menuBoxBottom main">
    <swiper auto loop v-model.trim="swiperItemIndex">
      <swiper-item
        class="swiper-demo-img"
        v-for="(item, index) in baseList"
        :key="index"
        @click="goDetail(item.url)"
      >
        <img :src="$url+'uploads/admin/avatar/'+item.avatar" />
      </swiper-item>
    </swiper>
    <scroll-seamless :data="blackList" :class-option="optionLeft" class="ulBox">
      <ul class="ul">
        <li
          class="item"
          v-for="ma in blackList"
          v-text="(ma.mobile||'')+' '+(ma.black_desc||'')"
          :key="ma.id"
        ></li>
      </ul>
    </scroll-seamless>
    <div class="newInfo">
      <grid :cols="2" :show-lr-borders="false">
        <grid-item link="/h5/user/buyAccount">
          <div>
            <img src="@/assets/img/icon/pic1.png" alt />
          </div>
          <div class="newDesc">
            <h3>新手绑定</h3>
            <p>新手必须绑定对应账号才可做任务</p>
          </div>
        </grid-item>
        <grid-item link="/h5/user/help">
          <div>
            <img src="@/assets/img/icon/pic2.png" alt />
          </div>
          <div class="newDesc">
            <h3>新手教程</h3>
            <p>新手必须绑定对应账号才可做任务</p>
          </div>
        </grid-item>
      </grid>
    </div>
    <div class="voice">
      <div class="voiceIcon">
        <img src="@/assets/img/icon/voice.png" alt />
      </div>
      <marquee :item-height="20" v-if="tongzhiInfo.length">
        <marquee-item v-for="ma in tongzhiInfo" :key="ma.notice_id" class="align-middle">
          <router-link class="noticeVoice" :to="'/h5/user/tongzhi/'+ma.notice_id">【公告】{{ma.title}}</router-link>
        </marquee-item>
      </marquee>
      <div class="no" v-else>暂无公告</div>
    </div>
    <!-- 切換账号 -->
    <div class="changeAccount">
      <tab :line-width="2" active-color="#fc378c">
        <tab-item
          class="vux-center"
          :selected="choose.id === item.id"
          v-for="(item, index) in company"
          @on-item-click="chooseAccount(item)"
          :key="index"
        >{{item.name}}</tab-item>
      </tab>
      <!-- {{item.status ==3 ?'审核失败' :item.status ==2 ? '审核中' :''}} -->
      <swiper v-model.trim="choose.ind" height="60px" :show-dots="false">
        <swiper-item v-for="(item, index) in companyAccount" :key="index">
          <div class="bandAccountInfo" style="margin-top:25px" v-if="item.bandList.status ==1">
            {{console.log(item.bandList,'aaa')}}
            请先绑定【{{choose.name}}】账号: 
            <router-link :to="item.url" style="color:#f00;">立即绑定</router-link>
          </div>
          <div v-else class="bandAccountInfo">
            <group>
            <popup-radio
                title="当前账号(点击切换)"
                :options="item.bandList"
                v-model.trim="item.id"
                @on-hide="changeBandAccount(item)"
              ></popup-radio>
            </group>
          </div>
          <!-- <div
            v-else
            class="bandAccountInfo"
            style="color:#f00;margin-top:25px"
          >【{{item.nickname}}】{{item.status|showLabel}}</div>-->
        </swiper-item>
      </swiper>
    </div>
    <!-- 订单信息 -->
    <div class="mainOrder">
      <tab bar-active-color="#1890ff" active-color="#1890ff" :line-width="3">
        <tab-item selected @on-item-click="chooseTask(10)">所有任务</tab-item>
        <tab-item @on-item-click="chooseTask(0)">垫付任务</tab-item>
        <!-- <tab-item @on-item-click="chooseTask(1)">浏览任务</tab-item> -->
        <tab-item @on-item-click="chooseTask(2)">问答任务</tab-item>
        <!-- <tab-item @on-item-click="chooseTask(3)">图文好评</tab-item> -->
      </tab>
      <div class="taskInfo">
        <main-task
          :task="item"
          :address_info="address_info"
          v-for="item in taskInfo"
          :key="item.task_id"
        ></main-task>
        <main-task
          :task="item"
          :address_info="address_info"
          :no_task="'1'"
          v-for="item in no_task_list"
          :key="item.task_id"
        ></main-task>
      </div>
      <div class="tasknoInfo" v-if="taskInfo.length==0 && no_task_list.length==0">当前无新任务哦</div>
    </div>
    <!-- 菜单 -->
    <tabbar-menu></tabbar-menu>
  </div>
</template>

<script>
import {
  Swiper,
  SwiperItem,
  Marquee,
  MarqueeItem,
  Grid,
  GridItem,
  PopupRadio
} from "vux";
import MainTask from "@/components/task/MainTask.vue";
import scrollSeamless from "vue-seamless-scroll";
import { debuglog } from "util";
export default {
  components: {
    Swiper,
    MainTask,
    SwiperItem,
    Marquee,
    MarqueeItem,
    Grid,
    GridItem,
    scrollSeamless,
    PopupRadio
  },
  data() {
    return {
      address_info: false,
      taskInfo: [],
      no_task_list: [],
      timer: null,
      choose: {
        id: "taobao",
        ind: 0
      },
      search: {
        task_type: 10,
        platform_type: 1
      },
      company: [
        {
          ind: 0,
          id: "taobao",
          name: "淘宝"
        },
        {
          ind: 1,
          id: "jd",
          name: "京东"
        },
        {
          ind: 2,
          id: "pdd",
          name: "拼多多"
        },
        {
          ind: 3,
          id: "wph",
          name: "唯品会"
        }
      ],
      companyAccount: [
        {
          bind_type: 1,
          bandList: [],
          id: "taobao",
          url: "/h5/user/addTaobaoAccount"
        },
        {
          bind_type: 2,
          bandList: [],
          id: "jd",
          url: "/h5/user/addJingdongAccount"
        },
        {
          bind_type: 5,
          bandList: [],
          id: "pdd",
          url: "/h5/user/addPddAccount"
        },
        { bind_type: 6, bandList: [], id: "wph", url: "/h5/user/addVphAccount" }
      ],
      blackList: [],
      swiperItemIndex: 1,
      baseList: [],
      tongzhiInfo: [],
      bandAccount: {}
    };
  },
  computed: {
    optionLeft() {
      return {
        step: 0.6, //数值越大速度滚动越快
        limitMoveNum: this.baseList.length, //开始无缝滚动的数据量  //this.baseList.length
        hoverStop: false, //是否开启鼠标悬停stop
        direction: 2 // 0向下 1向上 2向左 3向右
      };
    }
  },
  async mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      await this.getBandAccount();
      this.choose = this.company[0];
      await this.getImgBox();
      await this.getBlackBox();
      await this.getGonggaoInfo();
      await this.getTaskList();
    }
  },
  methods: {
    // 修改默认绑定
    async changeBandAccount(item) {
      if (item.id === item.defaultKey) return false;
      const result = await this.axios.post("/api/index/update_bind", {
        id: item.id,
        bind_type: item.bind_type
      });
    },
    // 获取轮播图
    async getImgBox() {
      const result = await this.axios.post("/api/app/banner_list");
      this.baseList = result.data.data || [];
    },
    // 获取黑名单
    async getBlackBox() {
      const result = await this.axios.post("/api/app/black_list");
      this.blackList = result.data || [];
    },
    goDetail(url) {
      if (url) {
        this.$router.push(url);
      }
    },
    chooseAccount(item) {
      this.choose = item;
      switch (item.id) {
        case "taobao":
          this.$set(this.search, "platform_type", 1);
          break;
        case "jd":
          this.$set(this.search, "platform_type", 2);
          break;
        case "pdd":
          this.$set(this.search, "platform_type", 5);
          break;
        case "wph":
          this.$set(this.search, "platform_type", 6);
          break;
      }
      this.getTaskList();
    },
    chooseTask(val) {
      this.$set(this.search, "task_type", val);
      this.getTaskList();
    },
    // 公告
    async getGonggaoInfo() {
      const result = await this.axios.post("/api/help/noticeList");
      this.tongzhiInfo = result.data || [];
    },
    // 获取绑定的账号信息
    async getBandAccount() {
      const result1 = await this.axios.post("/api/index/bind_list", {
        // status_type: "1",
        bind_type: "1"
      });
      const result2 = await this.axios.post("/api/index/bind_list", {
        status_type: "1",
        bind_type: "2"
      });
      const result5 = await this.axios.post("/api/index/bind_list", {
        status_type: "1",
        bind_type: "5"
      });
      const result6 = await this.axios.post("/api/index/bind_list", {
        status_type: "1",
        bind_type: "6"
      });
      this.companyAccount[0] = Object.assign(
        this.companyAccount[0],
        this.changeKey(result1.data)
      );
      this.companyAccount[1] = Object.assign(
        this.companyAccount[1],
        this.changeKey(result2.data)
      );
      this.companyAccount[2] = Object.assign(
        this.companyAccount[2],
        this.changeKey(result5.data)
      );
      this.companyAccount[3] = Object.assign(
        this.companyAccount[3],
        this.changeKey(result6.data)
      );
    },
    // 转换key和value
    changeKey(data) {
      let tempArr = [];
      let obj = {};
      data.map(val => {
        if (val.is_default === 1) {
          obj = val;
          obj.defaultKey = val.id;
        }
        tempArr.push({
          key: val.id,
          value:val.status ==3 ? val.nickname+'审核失败' : val.status ==2 ? val.nickname+'审核中' : val.nickname ,
          is_default: val.is_default,
          status:val.status
        });
      });
      
      obj.bandList = tempArr;
      return obj;
      // +val.status ==3 ?'审核失败' :val.status ==2 ? '审核中' :''
    },
    // 获取任务
    async getTaskList() {
      const result = await this.axios.post("/api/task/tasklist", {
        user_unique_code: this.getPhoneUuid(),
        task_type: this.search.task_type,
        platform_type: this.search.platform_type
      });
      this.taskInfo = result.data.task_list || [];
      this.no_task_list = result.data.no_task_list || [];
      this.address_info = result.data.address_info;
    },
    getPhoneUuid() {
      let unique_code = localStorage.getItem("unique_code");
      if (!unique_code) {
        this.$utils.tools.getUnique_code();
        unique_code = localStorage.getItem("unique_code");
      }
      return unique_code;
    }
  }
};
</script>

<style lang="less">
.main {
  img {
    width: 100%;
    height: 100%;
  }
  .ulBox {
    overflow: hidden;
    height: 50px;
    width: 100%;
    line-height: 50px;
    overflow: hidden;
    margin: 0.5rem 0;
    font-size: 18px;
    background-color: #fff;
    .ul {
      width: auto;
      white-space: nowrap;
      list-style: none;
      .item {
        display: inline-block;
        margin-left: 30px;
        color: #f00;
        list-style: none;
      }
    }
  }
  .newInfo {
    margin: 0.5rem 0;
    background: #fff;
    .weui-grids a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      height: 80px;
      img {
        max-width: 75px;
      }
      .newDesc {
        margin-left: 10px;
        h3,
        p {
          font-size: 12px;
          color: #666;
          line-height: 20px;
          font-weight: normal;
        }
        p {
          color: #8f8f94;
          line-height: 18px;
        }
      }
    }
  }
  .voice {
    margin: 0.5rem 0;
    background: #fff;
    padding: 12px 10px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    .voiceIcon {
      display: block;
      max-width: 45px;
      width: 10%;
      padding-right: 10px;
      margin-right: 10px;
      border-right: #e9e8e8 solid 1px;
    }
    .noticeVoice {
      display: block;
      color: #1890ff;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .changeAccount {
    margin: 0.5rem 0;
    background: #fff;
    padding: 5px;
    .bandAccountInfo {
      margin: 15px 10px;
      color: #1890ff;
      .weui-cell {
        padding: 0;
      }
      .vux-label-desc {
        display: none;
      }
      .vux-label {
        font-size: 14px;
        color: #999;
      }
      .vux-cell-value {
        color: #1890ff;
      }
    }
  }
  .mainOrder {
    margin: 0.5rem 0;
    background: #fff;
  }
  .tasknoInfo {
    text-align: center;
    padding: 80px 0;
  }
}
</style>
