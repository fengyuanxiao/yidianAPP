/*
 * @Author: YangZhou
 * @Date:   2017-10-04 13:51:47
 * @Last Modified by:   YangZhou
 * @Last Modified time: 2017-11-04 14:45:19
 */
import moment from 'moment'
import Vue from 'vue'
Vue.filter('date', function (value, format) {
  if (!format) format = 'YYYY-MM-DD'
  value = new Date(value)
  return moment(value).format(format)
})
Vue.filter('datetime', function (value, format) {
  if (!format) format = 'YYYY-MM-DD HH:mm:ss'
  return moment(value).format(format)
})
// 账号状态转化
Vue.filter('showLabel', function (value) {
  switch (value) {
    case 0: return '未绑定';
    case 1: return '已审核';
    case 2: return '审核中';
    case 3: return '未通过';
    case 4: return '已冻结';
  }
})