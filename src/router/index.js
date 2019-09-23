import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var routes = [{
  path: '*',
  redirect: '/h5/login'
}, {
  path: '/h5/login',
  component: resolve => require(['@/views/common/login'], resolve),
  meta: {
    title: '登录'
  }
}, {
  path: '/h5/register',
  component: resolve => require(['@/views/common/register'], resolve),
  meta: {
    title: '注册'
  }
}, {
  path: "/h5/forgetpsw",
  component: resolve => require(['@/views/common/forgetpsw'], resolve),
  meta: {
    title: '忘记密码'
  }
},
/*
首页模块
*/
{
  path: '/h5/main',
  component: resolve => require(['@/views/main/index'], resolve),
  meta: {
    title: '首页'
  }
},
/*
邀请模块
*/
{
  path: '/h5/invite',
  component: resolve => require(['@/views/invite/index'], resolve),
  meta: {
    title: '邀请赚钱'
  }
},
/*
订单模块
*/
{
  path: '/h5/order',
  component: resolve => require(['@/views/order/index'], resolve),
  meta: {
    title: '我的任务'
  }
},
{
  path: '/h5/shensu/appealTask',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/appealTask/appealTask'], resolve),
  meta: {
    title: '我要申诉'
  }
},
{
  path: '/h5/order/dianfu/detail/:id',
  component: resolve => require(['@/views/order/myTaskDetails/myTaskDetails'], resolve),
  meta: {
    title: '垫付详情'
  }
},
{
  path: '/h5/order/dianfu/detail/taskStateChilds/:id',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/taskStateChild/taskStateChilds'], resolve),
  meta: {
    title: '垫付多关键字操作详情'
  }
},
{
  path: '/h5/order/dianfu/detail/taskStateChild/:id',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/taskStateChild/taskStateChild'], resolve),
  meta: {
    title: '垫付操作详情'
  }
},
{
  path: '/h5/order/dianfu/detail/goodPingJia/:id',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/goodPingJia/goodPingJia'], resolve),
  meta: {
    title: '垫付任务好评'
  }
},
{
  path: '/h5/order/dianfu/detail/addPingJia/:id',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/goodPingJia/addPingJia'], resolve),
  meta: {
    title: '垫付任务追加好评'
  }
},
{
  path: '/h5/order/dianfu/unfinish',
  component: resolve => require(['@/views/order/dianfu/unfinish/index'], resolve),
  meta: {
    title: '垫付未完成'
  }
},
{
  path: '/h5/order/dianfu/finish',
  component: resolve => require(['@/views/order/dianfu/finish/index'], resolve),
  meta: {
    title: '垫付已完成'
  }
},
{
  path: '/h5/order/dianfu/cancel',
  component: resolve => require(['@/views/order/dianfu/cancel/index'], resolve),
  meta: {
    title: '垫付已取消'
  }
}, {
  path: '/h5/order/liulan/unfinish',
  component: resolve => require(['@/views/order/liulan/unfinish/index'], resolve),
  meta: {
    title: '浏览未完成'
  }
},
{
  path: '/h5/order/liulan/finish',
  component: resolve => require(['@/views/order/liulan/finish/index'], resolve),
  meta: {
    title: '浏览已完成'
  }
},
{
  path: '/h5/order/liulan/cancel',
  component: resolve => require(['@/views/order/liulan/cancel/index'], resolve),
  meta: {
    title: '浏览已取消'
  }
},
{
  path: '/h5/order/question/detail/:id',
  component: resolve => require(['@/views/order/myTaskDetails/questionsTask/questionsTask'], resolve),
  meta: {
    title: '问答详情'
  }
}, {
  path: '/h5/order/question/detail/task/:id',
  component: resolve => require(['@/views/order/myTaskDetails/questionsTask/questionsTasks'], resolve),
  meta: {
    title: '问答提交截图'
  }
}, {
  path: '/h5/order/question/unfinish',
  component: resolve => require(['@/views/order/question/unfinish/index'], resolve),
  meta: {
    title: '问答未完成'
  }
},
{
  path: '/h5/order/question/finish',
  component: resolve => require(['@/views/order/question/finish/index'], resolve),
  meta: {
    title: '问答已完成'
  }
},
{
  path: '/h5/order/question/cancel',
  component: resolve => require(['@/views/order/question/cancel/index'], resolve),
  meta: {
    title: '问答已取消'
  }
},
/*
我的模块
*/
{
  path: '/h5/user',
  component: resolve => require(['@/views/user/index'], resolve),
  meta: {
    title: '我的'
  }
},
{
  path: '/h5/user/system',
  component: resolve => require(['@/views/user/system'], resolve),
  meta: {
    title: '设置'
  }
},
{
  path: '/h5/user/commission',
  component: resolve => require(['@/views/user/commission'], resolve),
  meta: {
    title: '账单管理'
  }
},
{
  path: '/h5/user/buyAccount',
  component: resolve => require(['@/views/user/buyAccount'], resolve),
  meta: {
    title: '买号管理'
  }
},
{
  path: '/h5/user/accountInfo',
  component: resolve => require(['@/views/user/accountInfo'], resolve),
  meta: {
    title: '账户信息'
  }
},
{
  path: '/h5/user/help',
  component: resolve => require(['@/views/user/help'], resolve),
  meta: {
    title: '帮助中心'
  }
},
{
  path: '/h5/user/tongzhi',
  component: resolve => require(['@/views/user/tongzhi'], resolve),
  meta: {
    title: '公告列表'
  }
},
{
  path: '/h5/user/tongzhi/:notice_id',
  component: resolve => require(['@/views/user/tongzhiDetail'], resolve),
  meta: {
    title: '公告列表详情'
  }
},
{
  path: '/h5/user/tixianjilu',
  component: resolve => require(['@/views/user/tixianjilu'], resolve),
  meta: {
    title: '提现记录'
  }
},
{
  path: '/h5/user/tixian',
  component: resolve => require(['@/views/user/tixian'], resolve),
  meta: {
    title: '我要提现'
  }
},
{
  path: '/h5/user/shensu',
  component: resolve => require(['@/views/user/shensu'], resolve),
  meta: {
    title: '申诉列表'
  }
},
{
  path: '/h5/user/shensu/detail/:id',
  component: resolve => require(['@/views/order/myTaskDetails/taskState/appealTask/appealTaskDetails'], resolve),
  meta: {
    title: '申诉详情'
  }
},
{
  path: '/h5/user/taobaoAccountList',
  component: resolve => require(['@/views/user/taobaoAccountList'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/addTaobaoAccount',
  component: resolve => require(['@/views/user/addTaobaoAccount'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/jingdongAccountList',
  component: resolve => require(['@/views/user/jingdongAccountList'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/addJingdongAccount',
  component: resolve => require(['@/views/user/addJingdongAccount'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/pddAccountList',
  component: resolve => require(['@/views/user/pddAccountList'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/addPddAccount',
  component: resolve => require(['@/views/user/addPddAccount'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/vphAccountList',
  component: resolve => require(['@/views/user/vphAccountList'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/addVphAccount',
  component: resolve => require(['@/views/user/addVphAccount'], resolve),
  meta: {
    title: '绑定淘宝账号'
  }
},
{
  path: '/h5/user/changePhoneBind',
  component: resolve => require(['@/views/user/changePhoneBind'], resolve),
  meta: {
    title: '修改手机绑定'
  }
},
{
  path: '/h5/user/changeLoginPassword',
  component: resolve => require(['@/views/user/changeLoginPassword'], resolve),
  meta: {
    title: '修改登录密码'
  }
},
{
  path: '/h5/user/changeQQNumber',
  component: resolve => require(['@/views/user/changeQQNumber'], resolve),
  meta: {
    title: '修改QQ号码'
  }
},
{
  path: '/h5/user/certification',
  component: resolve => require(['@/views/user/certification'], resolve),
  meta: {
    title: '实名认证'
  }
},
{
  path: '/h5/user/changeWithdrawPassword',
  component: resolve => require(['@/views/user/changeWithdrawPassword'], resolve),
  meta: {
    title: '修改提现密码'
  }
},
{
  path: '/h5/user/bindBankCard',
  component: resolve => require(['@/views/user/bindBankCard'], resolve),
  meta: {
    title: '绑定银行卡'
  }
}
]
var router = new Router({
  linkActiveClass: 'active',
  routes: routes
})
export default router
