import Vue from 'vue'
import App from './App'
import store from './vuex/store'; // 引入vuex的store用于缓存

import Fly from 'flyio' // 通过别名引入(webpack中设置->"flyio/dist/npm/wx")
// let Fly = require("flyio/dist/npm/wx");
const fly = new Fly();

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$http = fly; // 使用fly请求数据
Vue.prototype.$store = store; // 使用vuex缓存


const app = new Vue(App);
app.$mount();
