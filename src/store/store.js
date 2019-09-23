/*
 * @Author: YangZhou
 * @Date:   2017-10-08 15:06:33
 * @Last Modified by:   vance
 * @Last Modified time: 2018-04-22 11:42:25
 */
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userinfo: {},
  },

  mutations: {
    //页面相关的操作
    setUserinfo(state, {
      userinfo
    }) {
      state.userinfo = userinfo
    },
  }
})
export default store
