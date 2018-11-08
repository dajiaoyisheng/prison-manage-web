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
        <!-- <el-menu-item index="username">
          <span>admin</span>
          <img class="heard-icon-btn" :src="downopen" alt="">
        </el-menu-item> -->
        <el-submenu index="username">
          <template slot="title">
            {{username}}
            <img class="heard-icon-arrow" :src="downopen" alt="">
          </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>

        <el-menu-item index="login">
          <span>退出</span>
          <img class="heard-icon-outlogin" :src="loginout" alt="">
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
        username: "admin",
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
    padding: 0 2%;
  }

  
  .nav-wrap .navWrapFull .el-submenu {
    padding: 0 2%;
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
    height: 17px;
    margin-right: 10px;
  }

  /* .el-menu>li>a {
    width: 48px;
    height: 16px;
    font-family: MicrosoftYaHei;
    line-height: 15px;
  } */

  /* 点击导航菜单时下面显示的横线 */
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
  }

  /* 二级菜单 */
  .el-submenu__title {
    border-bottom-color: none !important;
  }

  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }

  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: none;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #fff;
  }

  .nav-wrap .el-menu-item {
    padding: 0 1.3%;
  }


  /* .el-menu--horizontal>.el-menu-item a {
    color: rgba(255, 255, 255, 1);
  } */

  .nav-wrap .nav-input {
    outline: none;
    width: 13%;
    height: 60px;
    line-height: 64px;
    float: left;
    text-align: right;
    margin-right: 0.8%;
  }

  .nav-wrap .navWrapFull .nav-input {
    margin-right: 2%;
  }

  img.heard-icon-arrow {
    width: 11px;
    height: 11px;
  }

  img.heard-icon-outlogin {
    width: 15px;
    height: 15px;
  }

  

</style>
// 写在下面是因为:写在scoped中设置不生效
<style>
  /* 调整带有二级菜单的一级菜单位置偏下的问题 */
  .nav-wrap .el-menu--horizontal>.el-submenu .el-submenu__title {
    line-height: 64px;
  }

  .nav-wrap .el-submenu__title {
    padding: 0;
  }
  
  .nav-wrap .el-menu--horizontal>.el-submenu {
    padding: 0 1.9%;
  }

  .nav-wrap .el-input--mini .el-input__inner {
    width: 150px;
    height: 30px;
    border-radius: 15px;
    background-color: rgb(47, 50, 60);
    outline: none;
    color: rgb(144, 147, 153);
    border-color: rgb(144, 147, 153);
  }


  .nav-wrap .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow {
    display: none;
  }

  .el-menu--popup-bottom-start {
    margin-top: 0px;
  }

  .el-menu--popup {
    min-width: 160px;
    padding: 20px 0;
    border-radius: 0px;
    opacity: .95;
  }

  .el-menu--horizontal .el-menu .el-menu-item,
  .el-menu--horizontal .el-menu .el-submenu__title {
    padding: 0 20px;
  }

  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }

</style>
