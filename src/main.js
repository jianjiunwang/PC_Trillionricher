import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import './assets/iconfont/iconfont.css'
import Cookies from 'js-cookie'
import SlideVerify from 'vue-monoplasty-slide-verify';
import store from './store'
import lrz from 'lrz'

Vue.prototype.$axios = axios
Vue.use(SlideVerify);
Vue.prototype.HOME = '/api'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('convTime', function(value) {
    value = value*1000
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d
})
Vue.filter('convTimehms', function(value) {
    value = value*1000
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})
Vue.prototype.Logout = function (){
    Cookies.remove('merber_id','',{ path: '' });
    Cookies.remove('merber_name','',{ path: '' });
    Cookies.remove('egopay_key','',{ path: '' });
    Cookies.remove('merber_nickname','',{ path: '' });
    Cookies.remove('head_portrait','',{ path: '' });
    this.$message({
        message: '登陸已過期，請重新登入！',
        type: 'error',
        center: true
    });
    this.$router.push({path: '/'})
    setTimeout(function () {
        window.location.reload()
    },3000)
}
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
 })
