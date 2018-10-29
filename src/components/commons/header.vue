<template>
  <!-- <div id="app"> -->
  <!-- nav -->
  <div>
    <nav class="nav-wrap">
      <el-menu :default-active="$route.path" router class="nav-ul" :class="{navWrapFull:isFullNavWrap}" mode="horizontal"
        @select="handleSelect" background-color="#2f323c" text-color="#909399" active-text-color="#fff">
        <div class="logoWrap">
          <img class="logo" :src="logo" alt="">
          <img class="name" :src="name" alt="">
        </div>
        <el-menu-item index="/workbench">
          <router-link to="/workbench">工作台</router-link>
        </el-menu-item>
        <el-menu-item index="/tvmonitor">
          <router-link to="/tvmonitor">视频监控</router-link>
        </el-menu-item>
        <el-menu-item index="/personnelposition">
          <router-link to="/personnelposition">人员定位</router-link>
        </el-menu-item>
        <el-menu-item index="/pointname">
          <router-link to="/pointname">人员点名</router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">查询统计</template>
          <el-menu-item index="/querystats/posunusual">
            <router-link to="/querystats/posunusual">定位异常预警</router-link>
          </el-menu-item>
          <el-menu-item index="/querystats/violation">
            <router-link to="/querystats/violation">违规预警</router-link>
          </el-menu-item>
          <el-menu-item index="/querystats/prewarningstats">
            <router-link to="/querystats/prewarningstats">预警统计</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">系统设置</template>
          <el-menu-item index="/systemset/prisonmanagement">
            <router-link to="/systemset/prisonmanagement">监区管理</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/prisonermanagement">
            <router-link to="/systemset/prisonermanagement">服刑人员管理</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/cameramanagement">
            <router-link to="/systemset/cameramanagement">摄像头管理</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/servermanagement">
            <router-link to="/systemset/servermanagement">服务地址配置</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/calendarmanagement">
            <router-link to="/systemset/calendarmanagement">日历管理</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/sysoptionsmanagement">
            <router-link to="/systemset/sysoptionsmanagement">系统选项</router-link>
          </el-menu-item>
          <el-menu-item index="/systemset/systemmanagement">
            <router-link to="/systemset/systemmanagement">系统管理</router-link>
          </el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="input">
        </el-menu-item> -->

        <!-- <el-menu-item index="search"> -->
        <el-input class="nav-input fl clearfix" size="mini" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input">
        </el-input>
        <!-- </el-menu-item> -->
        <el-menu-item index="username">
          <span>admin</span>
          <img class="heard-icon-btn" :src="downopen" alt="">
        </el-menu-item>
        <el-menu-item index="login">
          <span>退出</span>
          <img class="heard-icon-btn" :src="loginout" alt="">
        </el-menu-item>
        <!-- <div>admin</div>
        <div>退出</div> -->
      </el-menu>
    </nav>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  import name from '@/assets/name.png'
  import downopen from '@/assets/downopen.png'
  import loginout from '@/assets/loginout.png'
  export default {
    name: 'Header',
    data() {
      return {
        logo: logo,
        name: name,
        loginout: loginout,
        downopen: downopen,
        input: '',
      };
    },
    computed: {
      isFullNavWrap() {
        return this.$store.state.isFullNavWrap
      }
    },
    mounted: function () {},

    methods: {
      handleSelect(key, keyPath) {},
    },
  }

</script>

<style scoped>
  .nav-wrap {
    background-color: rgb(47, 50, 60);
    height: 60px;
    position: fixed;
    /* 因为: echart tooltip z-index:99 导航挑nav ele-ui messege z-index:2000 */
    z-index: 999;
    width: 100%;
    top: 0;
    left: 0;
  }

  .nav-wrap .nav-ul {
    margin: 0 auto;
    width: 1200px;
  }

  .nav-wrap .navWrapFull {
    width: 100%;
    min-width: 1200px;
    padding: 0 2%
  }

  .nav-wrap .navWrapFull .el-menu-item {
    padding: 0 1.5%;
  }

  .logoWrap {
    /* display: inline-block; */
    float: left;
    line-height: 60px;
    margin-right: 5%;
  }

  .logoWrap:focus {
    outline: none;
  }

  .logoWrap img {
    vertical-align: middle;
  }

  .logoWrap span {
    color: rgba(255, 255, 255, 1);
  }

  .logo {
    width: 20px;
    height: 20px;
  }

  .el-menu>li>a {
    width: 48px;
    height: 16px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    /* color: rgba(255, 255, 255, 1); */
    line-height: 15px;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #fff;
  }

  .nav-wrap .el-menu-item {
    padding: 0 0.8%;
  }

  .el-submenu__title {
    padding: 0 15px;
  }

  .navWrapFull .el-submenu__title {
    padding: 0 20px;
  }



  /* .el-menu--horizontal>.el-menu-item a {
    color: rgba(255, 255, 255, 1);
  } */

  .nav-wrap .nav-input {
    /* outline: none; */
    width: 15%;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: right;
  }

  .nav-wrap .nav-input input {
    border-radius: 14px;
    width: 70%;
  }

  img.heard-icon-btn {
    width: 15px;
    height: 15px;
  }

</style>
