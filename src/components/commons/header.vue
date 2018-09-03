<template>
  <!-- <div id="app"> -->
  <!-- nav -->
  <div>
    <nav class="nav-wrap">
      <el-menu :default-active="$route.path" router class="nav-ul" mode="horizontal" @select="handleSelect"
        background-color="#2f323c" text-color="#a0abb5" active-text-color="#fff">



        <!-- <el-menu-item> -->
        <div class="logoWrap">
          <img class="logo" :src="logo" alt="">
          <span>久其智能监狱管理系统</span>
        </div>
        <!-- </el-menu-item> -->

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
        <el-input class="nav-input" size="mini" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input">
        </el-input>
      </el-menu>
    </nav>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  export default {
    name: 'Header',
    data() {
      return {
        logo: logo,
        activeIndex: '1',
        input: '',
      };
    },
    mounted: function () {
      // 首页即工作台页面与其他页面不同,其width:1200px,居中,利用vue组件相关知识应该也可以,但还不知道怎么写
      // if (location.hash === "#/personnelposition") {
      //   this.setNavUlWithd();
      // }
    },

    methods: {
      handleSelect(key, keyPath) {
        // if (key === "/personnelposition") {
        //   this.setNavUlWithd();
        // } 
      },
      // setNavUlWithd() {
      //   document.getElementsByClassName("nav-ul")[0].style.cssText =
      //     "width:100%;margin:0 auto;transition:width 0.5s;";
      // }
    },
  }

</script>

<style socped>
  .logoWrap {
    /* display: inline-block; */
    float: left;
    line-height: 60px;
    margin-right: 5%;
  }
  .logoWrap img{
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
    color: rgba(255, 255, 255, 1);
    line-height: 15px;
  }

  .el-menu--horizontal>.el-menu-item a {
    color: rgba(255, 255, 255, 1);
  }

  .nav-wrap .nav-input {
    width: 10%;
    height: 60px;
    line-height: 60px;
  }

</style>
