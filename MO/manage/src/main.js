// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

window.getConfig = {
    URL       : "http://172.16.9.181:8080",
    pic_url   : "https://",
    video_url : "https://",
},

/**
 *
 * @param vm --- 当前vm实例
 * @param url --- 请求地址
 * @param data --- 请求参数
 * @param callback --- 回调函数
 */
Vue.prototype.$ajax = function (vm, url, data, callback) {

    let _veri = window.getConfig
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {
            /*XMLHttpRequest.setRequestHeader("X-CSRF-TOKEN", 'multipart/form-data');
            XMLHttpRequest.setRequestHeader("user_name", _veri.user_name);
            XMLHttpRequest.setRequestHeader("password",  _veri.password);
            XMLHttpRequest.setRequestHeader("token",     _veri.token);*/
        },
        success: function(data) {
            callback && callback(data, vm)
        }
    });
}

// import angular
import './angulr/libs/assets/animate.css/animate.css'
import './angulr/libs/assets/font-awesome/css/font-awesome.min.css'
import './angulr/libs/assets/simple-line-icons/css/simple-line-icons.css'
import './angulr/libs/jquery/bootstrap/dist/css/bootstrap.css'
import './angulr/css/font.css'
import './angulr/css/app.css'

import './angulr/libs/jquery/jquery/dist/jquery.js'
import './angulr/libs/jquery/bootstrap/dist/js/bootstrap.js'
import './angulr/js/ui-nav.js'
import './angulr/js/vue.js'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})

