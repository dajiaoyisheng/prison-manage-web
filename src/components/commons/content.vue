<template>
  <div id="home">
    <v-head></v-head>
    <div class="content-wrap clearfix">
      <router-view class="content clearfix"/>
      <vue-loading class="fixed-center z-index-height" v-show="this.$store.state.loading" type="bars" color="#0a74bb" :size="{ width: '50px', height: '50px' }"></vue-loading>
      <!-- 异常位置预警tip begin -->
      <section class="notify">
        <div class="title">
          <img :src="warning" alt="">
          <span>异常位置预警<i class="el-icon-close pointer" @click="close"></i></span>
          
        </div>
        <div class="content">
          <p>第一号监舍</p>
          <p>人员数量:<span>2</span></p>
          <p>人员姓名:<span>张三</span><span>李四</span> </p>
        </div>
      </section>
      <!-- 异常位置预警tip end -->
    </div>
  </div>
</template>

<script>
  import vHead from './header.vue';
  import warning from '@/assets/warning.png';
  export default {
    name: 'Home',
    data() {
      return {
        warning: warning
      }
    },
    components: {
      vHead
    },
    methods: {
      close() {
        let notifyDom = document.getElementsByClassName("notify")[0];
        notifyDom.style.display = "none";
      }
    }
  }

</script>
<style scoped>
  .notify {
    display: inline-block;
    display: none;
    position: fixed;
    top: 80px;
    right: 0;
    /* width: 10%; */
  }

  .notify .title {
    background: #f7574d;
    height: 40px;
    line-height: 40px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 0 15px;
  }

  .notify .title span {
    color: #fff;
    padding-left: 3%;
    /* width: 60%; */
    display: inline-block;
  }

  .notify .content {
    background: #0b0b0b;
    opacity: .5;
    color: #fff;
    height: 196px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 0 15px;
  }
  .notify .content p{
    line-height: 26px;
  }

  .el-icon-close {
    /* padding-left: 4%;  */
  }

  .z-index-height {
    z-index: 99999999;
  }

</style>
