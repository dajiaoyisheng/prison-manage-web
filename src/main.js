// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import axios from './axios';
Vue.prototype.$ajxj = axios;
import 'es6-promise/auto'
import store from './vuex/store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
// main.css公共样式
import './css/main.css';
import VueLoading from 'vue-loading-template';
Vue.use(VueLoading);
import {
    VePie,
    VeBar,
    VeHistogram
} from 'v-charts/lib';
Vue.component(VePie.name, VePie);
Vue.component(VeBar.name, VeBar);
Vue.component(VeHistogram.name, VeHistogram);
import Mock from './mock';

import App from './App';
// if (process.env.NODE_ENV === 'development') {
    Mock.bootstrap();
// }

Vue.config.productionTip = false;

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