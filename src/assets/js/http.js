import Vue from 'vue'
import axios from "axios";
import Qs from "qs";
import router from '../../router'


//axios 配置 [封装axios]
axios.defaults.withCredentials = true; //vue前后端分离解决每次请求session都会变的问题
axios.defaults.transformRequest = [function (data) {
    // if (data.toString() == "[object FormData]") {
    //     return data;
    // } else {
    //     return Qs.stringify(data)
    // }
    return Qs.stringify(data)

}];
let host
host = process.env.NODE_ENV === 'development' ? '/' : 'http://bzapi.jinjifuweng.com' // 根据 process.env.NODE_ENV 的值判断当前是什么环境


const instance = axios.create({
    baseURL: host,
    timeout: 120000,
    withCredentials: true,
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    if (response.data == null && response.status == 200) {

        return response;

    } else {
        if (response.data.status == -1) {


            sessionStorage.setItem("$user", JSON.stringify({}));
            router.replace('/')
            Vue.prototype.$toast('请求错误');

        } else if (response.data.status == 0) {


        }
        if (response.data.status == -1) {


            sessionStorage.setItem("$user", JSON.stringify({}));
            router.replace('/')
            Vue.prototype.$toast('请求错误');

        } else if (response.data.status == 0) {


        }
        return response;

    }


}, function (error) {

    return Promise.reject(error);
});
Vue.prototype.$http = instance;