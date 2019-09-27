// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue';
import axios from '@/lib/axios'
import store from '@/store/store'
import filter from '@/lib/filter'
const FastClick = require('fastclick')
    // 挂载工具类
import utils from '@/assets/js/utils'
import '@/assets/icons/iconfont.css'
import 'iview/dist/styles/iview.css';
// 解决ios中输入框需要双击
FastClick.prototype.focus = function(targetElement) {
    var length;
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
}
FastClick.attach(document.body)
Vue.prototype.axios = axios
Vue.prototype.$utils = utils
Vue.prototype.$url = 'http://www.paiming001.com/'
Vue.config.productionTip = false
import {
    ConfirmPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
    // 全局引用vux
import {
    XHeader,
    XInput,
    Group,
    XButton,
    Cell,
    Tab,
    TabItem,
    XTable,
    Search,
    Grid,
    GridItem,
    Card,
    Flexbox,
    FlexboxItem,
    XDialog
} from 'vux'
Vue.component('x-header', XHeader)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-table', XTable)
Vue.component('search', Search)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('card', Card)
Vue.component('x-dialog', XDialog)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
import TabbarMenu from "@/components/common/TabbarMenu.vue";
import UserHeader from "@/components/common/UserHeader.vue";
Vue.component('tabbar-menu', TabbarMenu)
Vue.component('user-header', UserHeader)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})