import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import store from './store';
import VueRouter from 'vue-router'
import routeConfig from "./router/router-config";

//elm出品的elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import sweetalert from "sweetalert";
import "sweetalert/dist/sweetalert.css";

Vue.use(ElementUI);
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
