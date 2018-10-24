import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: true,
    isFullNavWrap: false,
    env: "http://localhost:8080/bi"
  },
  mutations: {
    env (state) {
      // 开发环境配置
      if (process.env.NODE_ENV === "development") {
        state.env = "http://localhost:8080/bi";
      }
      // 生产环境配置
      else if (process.env.NODE_ENV === "production") {
        state.env = "http://localhost:8080/bi";
      }
    }
  }
})
export default store;