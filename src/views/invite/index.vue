<template>
  <div class="menuBoxBottom invite">
    <user-header :title="'收徒转佣金'" class="invitebg"></user-header>
    <div>
      <img src="@/assets/img/invitetitle.png" class="inviteTitle" />
      <img class="top-img banner-img" src="@/assets/img/invitation_banner.png" alt="topImg" />
      <div class="inviteUrl cricleBox">
        <div class="iurl">
          <div class="urltext">
            <h2>邀请链接</h2>
            <p>(点击收徒复制)</p>
          </div>
          <div class="urlurl">{{$url}}#/h5/register?code={{invite.code}}</div>
        </div>
        <x-button
          type="primary"
          :data-clipboard-text="$url+'#/h5/register?code='+invite.code"
          @click.native="copyShare"
          class="invitebtn copy"
        >立即收徒</x-button>
      </div>
      <div class="inviteUrl invitepeople cricleBox">
        <h2>奖励明细</h2>
        <table>
          <tr>
            <td>累计奖励</td>
            <td>{{ invite.total_prize||'0' }}元</td>
          </tr>
          <tr>
            <td>我的徒弟人数</td>
            <td>{{ invite.use_num }}个</td>
          </tr>
          <tr>
            <td>我的徒孙人数</td>
            <td>{{ invite.second_use_num }}个</td>
          </tr>
        </table>
      </div>
      <img src="@/assets/img/inviteinfo.png" class="top-img" />
      <div class="inviteUrl invitepeople cricleBox">
        <h2>奖励说明</h2>
        <div>
          <p>1、徒弟注册完成首单，您将还能获得1~5元现金红包</p>
          <p>2、徒弟每完成一单任务后，您最低能获得10%的佣金提成</p>
          <p>3、徒孙每完成一单任务后，您最低能获得5%的佣金提成</p>
        </div>
        <img src="@/assets/img/invitation_relationship.png" class="top-img" />
      </div>
      <!-- <div class="links-list">
        <div class="links-list-top">
          <img
            src="@/assets/img/share2.png"
            alt="aa"
            :data-clipboard-text="invite.share_link||''"
            class="copy"
            @click="copy"
          />
        </div>
        <!-- <div class="zhuanshuCode">
          你的专属邀请码：
          <span>{{ invite.code }}</span>
          <button>点击复制</button>
      </div>-->
      <!-- <x-input disabled style="width: 100%, fontSize: 1rem" :value="invite.share_link" /> -->
      <!-- <div class>
          <p
            style="font-size: 1rem; font-weight: bold; color: rgb(102, 102, 102); text-align: center;"
          >买手邀请其他买手奖励</p>
          <p
            style="font-size:0.875rem;color: rgb(102, 102, 102);line-height:1.5rem; margin: 0.2rem 0px; padding: 0.2rem;"
          >
            通过邀请码邀请你的朋友，同学来做任务，可以获得他们任务佣金的10%， 获得他们邀请的朋友，同学的5%。、
            举例说明:你徒弟每天做3单，每单佣金3元， 你可以获得1元。
            你累积邀请20-200人，你还可以获得400-40000买手的5%的分红， 每天可以分红180元-18000元，月累积可获得5400元-540000元，年累积可获得64800元-6480000元，可永久分红。
          </p>
        </div>
        <button
          class="download-btn copy"
          :data-clipboard-text="invite.share_link||''"
          @click="copyShare"
        >分享给朋友</button>
        <ul>
          <li>
            <span>累计奖励</span>
            <span>{{ invite.total_prize||'0' }}金</span>
          </li>
          <li>
            <span>二级用户数</span>
            <span>{{ invite.use_num }}个</span>
          </li>
          <li>
            <span>二级用户中激活的用户数</span>
            <span>{{ invite.active_num }}个</span>
          </li>
          <li>
            <span>三级用户数</span>
            <span>{{ invite.second_use_num }}个</span>
          </li>
          <li>
            <span>三级用户中激活的人数</span>
            <span>{{ invite.second_active_num }}个</span>
          </li>
        </ul>
      </div>-->
    </div>
    <!-- 菜单 -->
    <tabbar-menu></tabbar-menu>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      invite: {},
      userInfo: {}
    };
  },
  mounted() {
    let token = this.$utils.cookies.getCookie("token");
    if (!token) {
      this.$router.replace("/h5/login");
    } else {
      this.userInfo = JSON.parse(
        this.$utils.cookies.getCookie("userInfo") || "{}"
      );
      this.getInvite();
    }
  },
  methods: {
    copyShare() {
      //分享内容，开发者可自定义
      const dominurl = "http://app.yidianzhengqian.com/";
      var message = {
        type: "web",
        title: "一点挣钱", //应用名字
        content: `我是${this.userInfo.invite_code}，我在一点挣钱等你！ `,
        href: dominurl + "#/h5/register?code=" + this.userInfo.invite_code, //分享出去后，点击跳转地址
        thumbs: [dominurl + "static/img/xhxlogo.png"] //分享缩略图
      };
      //调起分享
      try {
        // window.plus.nativeUI.toast("进入try了");
        plus.share.sendWithSystem(
          message,
          function() {
            window.plus.nativeUI.toast("分享成功");
          },
          function(e) {
            this.copy();
          }
        );
        // window.plusShare(message, function(res) {
        //   //分享回调函数
        //   if (res) {
        //     window.plus.nativeUI.toast("分享成功");
        //   } else {
        //     window.plus.nativeUI.toast("分享失败");
        //   }
        // });
      } catch (e) {
        this.copy();
      }
    },
    copy() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        this.$vux.toast.text("系统分享失败，可直接粘贴分享给好友");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$vux.toast.text("复制失败，请手动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    // 获取邀请信息
    async getInvite() {
      const result = await this.axios.get("/api/index/invite");
      this.invite = result.data || "{}";
    }
  }
};
</script>
<style lang="less">
.invite {
  background: #f5f5f5;
  padding: 0 10px;
  .invitebg {
    #headerBox {
      background: #1890FF;
    }
  }
  .inviteTitle {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0 0 15px 15px;
    margin-bottom: 10px;
  }
  .inviteUrl {
    background: #fff;
    padding: 15px;
    .iurl {
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #1890FF;
      display: flex;
      align-items: center;
      .urltext {
        width: 120px;
        border-right: 1px solid #1890FF;
        padding-right: 10px;
        margin-right: 10px;
        text-align: center;
        h2 {
          font-weight: normal;
          color: #1890FF;
        }
      }
      .urlurl {
        width: 200px;
        flex: 1;
        word-break: break-all;
      }
    }
  }
  .invitebtn {
    width: 200px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #cccccc;
    background: #1890FF !important;
  }
  .cricleBox {
    border-radius: 15px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    box-shadow: 5px 5px 10px #cccccc;
  }
  .invitepeople {
    h2 {
      color: #1890FF;
      text-align: center;
      font-size: 16px;
      padding-bottom: 10px;
    }
    p{
      font-size: 16px;
      letter-spacing: 1px;
      line-height: 28px;
      padding: 5px 0;
    }
    table {
      width: 100%;
      margin-bottom: 20px;
    }
    td {
      width: 50%;
      padding: 10px 0;
      font-size: 15px;
      text-align: center;
    }
    table,
    tr,
    td {
      border: 1px solid #1890FF;
      background: #F4FAFF;
      color: #000;
      border-collapse: collapse;
    }
  }

  .top-img {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 15px;
  }
  .banner-img{
    margin-bottom: 20px;
  }
  .links-list {
    padding: 2.5rem 1rem;
    position: relative;
    width: 90%;
    background-color: #ffdf95;
    border-radius: 15px;
    margin: 0 auto;
  }
  .links-list-top {
    width: 90%;
    position: absolute;
    top: -17px;
  }
  .links-list-top > img {
    display: block;
    margin: 0 auto;
  }
  .zhuanshuCode {
    display: flex;
    justify-content: space-between;
    color: #400f0f;
    font-weight: bold;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 0.7rem;
  }
  .zhuanshuCode > button {
    background-color: #c12a3d;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
  }
  .download-btn {
    font-weight: bold;
    background-color: #c12a3d;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    border-color: #a89292;
    font-size: 1.3rem;
    padding: 15px 0;
    width: 100%;
    display: block;
    color: #fff;
    border: none;
    border-radius: 7px;
    margin-bottom: 1rem;
  }
}
</style>
