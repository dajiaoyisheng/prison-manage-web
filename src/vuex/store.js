import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
    isFullNavWrap: false,
    env: "http://localhost:80/bi/hawkeye"
  },
  mutations: {
    env (state) {
      // 开发环境配置
      if (process.env.NODE_ENV === "development") {
        state.env = "http://localhost:80/bi/hawkeye";
      }
      // 生产环境配置
      else if (process.env.NODE_ENV === "production") {
        state.env = "http://localhost:80/bi/hawkeye";
      }
    },
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      state.loading = false
    }
  }
})
export default store;