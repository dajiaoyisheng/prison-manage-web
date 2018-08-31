<template>
  <div id="home">
    <v-head></v-head>
    <div class="content-wrap clearfix">
      <router-view class="content clearfix" />
      <vue-loading class="fixed-center" v-show="this.$store.state.loading" type="bars" color="#0a74bb" :size="{ width: '50px', height: '50px' }"></vue-loading>
      <section class="notify">
        <div class="title">
          <img :src="warning" alt="">
          <span>title</span>
          <i class="el-icon-close pointer" @click="close"></i>
        </div>
        <div class="content">content</div>
      </section>
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
    top: 60px;
    right: 0;
    width: 10%;
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
    margin-left: 3%;
    width: 60%;
    display: inline-block;
  }

  .notify .content {
    background: #0b0b0b;
    opacity: .5;
    color: #fff;
    height: 196px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

</style>
