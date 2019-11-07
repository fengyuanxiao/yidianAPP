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
      <swiper v-model.trim="choose.ind" height="60px" :show-dots="false">
        <swiper-item v-for="(item, index) in companyAccount" :key="index">
          <div class="bandAccountInfo" style="margin-top:25px" v-if="(statusNum ==0 || item.bandList.length ==0)">
            请先绑定【{{choose.name}}】账号: 
            <router-link :to="item.url" style="color:#f00;">立即绑定</router-link>
          </div>
          <div class="bandAccountInfo" style="margin-top:25px" v-else-if="statusNum ==2">
            当前账号: 
            <div style="color: #1890ff;display: inline-block;float: right;">
              {{nickName}}
              <a @click="$router.push('/h5/user/taobaoAccountList')" style="color:#f00;margin-left: 10px;">审核中</a>
            </div>
          </div>
          <div class="bandAccountInfo" style="margin-top:25px" v-else-if="statusNum ==3">
            当前账号:
            <div style="color: #1890ff;display: inline-block;float: right;">
              {{nickName}}
              <a @click="$router.push('/h5/user/taobaoAccountList')" style="color:#f00;margin-left: 10px;">审核未通过</a>
            </div>
          </div>
          <div class="bandAccountInfo" style="margin-top:25px" v-else-if="statusNum ==4">
            当前账号:
            <div style="color: #1890ff;display: inline-block;float: right;">
              {{nickName}}
              <a @click="$router.push('/h5/user/taobaoAccountList')" style="color:#f00;margin-left: 10px;">已冻结</a>
            </div>
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
    <!-- 版本号弹窗 -->
    <x-dialog v-model.trim="showTip" class="dialog_demo">
      <group title>
        <p class="showAttention">提示</p>
      </group>
      <div class="img-box showBg">
        <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">{{showMsg}}</p>
      </div>
      <div @click="goDown()" style="margin: 30px 0 10px 0;">
        <x-button type="primary" style="border-radius:5px;background:#1890ff;width:35%;" min>确定</x-button>
      </div>
    </x-dialog>
    <!-- 买号弹窗 -->
    <!-- <div v-if="statusNum ==0 "> -->
     <x-dialog v-model.trim="showNumber" class="dialog_demo">
        <group title>
          <p class="showAttention">提示</p>
        </group>
        <div class="img-box showBg">
          <p style="padding: 25px 20px 15px;font-size: 17px;color: black;">请先绑定淘宝账号，才能开始任务！</p>
        </div>
        <div @click="showNumber=false" style="margin: 20px 0px 0px 0px;height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block;width: 50%;background: white;border-top: 1px solid #E6E6E6;border-right: 1px solid #E6E6E6;" >取消</div>
        <div @click="$router.push('/h5/user/addTaobaoAccount')" style="height: 45px;line-height: 45px;color: rgba(21,126,251,1);font-size: 18px;display: inline-block; width: 50%;background: white;border-top: 1px solid #E6E6E6;" >去绑定</div>
      </x-dialog>
      <!-- </div> -->
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
      unique_code: "",
      user_address_book:"",
      showTip:false,
      showNumber:false,
      newup:null,
      statusNum:null,
      showMsg:"",
      nickName:"",
      taskInfo: [],
      nickName:"",
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
        { bind_type: 6, 
          bandList: [],
          id: "wph", 
          url: "/h5/user/addVphAccount" 
        }
      ],
      blackList: [],
      swiperItemIndex: 1,
      baseList: [],
      tongzhiInfo: [],
      bandAccount: {},
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
    await this.clearCache();
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      
      this.getPhoneUuid()
      await this.getBandAccount();
      this.choose = this.company[0];
      
      await this.getImgBox();
      await this.getBlackBox();
      await this.getGonggaoInfo();
      await this.getTaskList();
      if(this.companyAccount[0].bandList != ''){
      let newup =this.companyAccount.filter(item=> {
          return item.bind_type==1
      })
      this.newup=newup
      this.nickName=this.newup[0].nickname
      this.statusNum=this.newup[0].status
      
      } 
      // 每天弹一次
      if(this.companyAccount[0].bandList.length ==0 ||this.statusNum==0){
        var s = document.cookie;
        if (s.indexOf('Once=1') != -1){
            return;
            }else{
                this.showNumber=true
            }  //存在cookie退出下面代码的执行
        let d = new Date((new Date()).getTime()+86400000-((new Date()).getHours()*60*60+(new Date()).getMinutes()*60+(new Date()).getSeconds())*1000);
        document.cookie = 'Once=1;expires='+d.toUTCString();//设置cookie
 
      }
    }
  },
  methods: {
     goDown() {
      try{
        plus.runtime.openURL("https://fir.im/na73")
      }catch (e) {
      }
      // 测试：https://fir.im/j1g5
      //线上： "https://fir.im/na73"
      // "https://dowmload.kouziapp.com/Hp_yidianzhengqian/downloadWeb.html";
    },
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
    async clearCache(){
      const results=await this.axios.post("/api/app/dif_version", {
        app_version:this.$baseConfig.version,
      });
      let  showMsg=results.msg
      this.showMsg=showMsg
      if(results.data.code ==4){
        this.showTip=true
      }else if(results.data.code ==5){
        try {
          plus.cache.clear(() => {
            console.log('success')
            // this.$vux.toast.text("缓存清除成功");
          });
        } catch (e) {
          console.log('fail')
          // this.$vux.toast.text("请从客户端打开");
        }    
      }
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
          value:val.nickname ,
          is_default: val.is_default,
        });
      });
      
      obj.bandList = tempArr;
      return obj;
    },
    // 获取任务
    async getTaskList() {
      this.unique_code = localStorage.getItem("unique_code");
      const result = await this.axios.post("/api/task/tasklist", {
        user_unique_code: this.unique_code,
        task_type: this.search.task_type,
        platform_type: this.search.platform_type
      });
      this.taskInfo = result.data.task_list || [];
      this.no_task_list = result.data.no_task_list || [];
      this.address_info = result.data.address_info; 
    },
    // async baiDuStatistics(){
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?3f63a710cb8d5d591c0fc63735621839";
    //     var s = document.getElementsByTagName("script")[0]; 
    //     s.parentNode.insertBefore(hm, s);
    //   })();
    // },
     // 获取用户的通讯录和uuid
    getPhoneUuid() {
      this.user_address_book = localStorage.getItem("user_address_book");
      if (!this.user_address_book) {
        this.$utils.tools.getPhoneList();
        this.user_address_book = localStorage.getItem("user_address_book");
      }
      this.unique_code = localStorage.getItem("unique_code");
      if (!this.unique_code) {
        this.$utils.tools.getUnique_code();
        this.unique_code = localStorage.getItem("unique_code");
      }
      
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
  .showAttention{
    font-size: 24px;
    font-weight: 600;
    color:rgba(0,0,0,1);
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
      color: #999;
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
  .showAttention{
    font-size: 24px;
    font-weight: 600;
    color:rgba(0,0,0,1);
  }
}
</style>
