<template>
  <div>
    <section class="left-tree">
      <!-- <v-tree :tree-data="Prisonareatree" v-on:handle-node-click="handleNodeClick"></v-tree> -->
      <el-tree :data="treeData" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.isWarning == false"><i :class="node.icon"></i>{{ node.label }}</span>
          <span v-if="data.isWarning == true"><i><img :src="images.warning"></i>{{ node.label }}</span>
        </span>
      </el-tree>
    </section>
    <section class="right-main">
      <!-- 监狱 -->
      <section v-show="isShowPrison" class="item prison area">
        <h3 class="title text-center">杭州某某监狱</h3>
        <img :src="images.area" alt="">
      </section>
      <!-- 楼层 -->
      <section v-show="isShowfloor" class="item prison">楼层</section>
      <!-- 监区 -->
      <section v-show="isShowMonitorArea" class="item prison">监区</section>
      <!-- 监舍 -->
      <section v-show="isShowMonitorHouse" class="monitor-house clearfix">
        <!-- 监狱 -->
        <section class="center fl">
          <h3 class="title text-center">楼层</h3>
          <img :src="images.floor" alt="">
        </section>
        <!-- <section class="center fl">

        </section> -->
        <section class="right fr">
          <section class="house-floor">
            <p class="item-header">楼层</p>
            <div class="banner">
              <el-carousel trigger="click" :autoplay="false" indicator-position="none" arrow="always">
                <el-carousel-item v-for="item in floors" :key="item">
                  <img class="banner-item-img" :src="item" alt="">
                  <img class="banner-item-img" :src="item" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </section>
          <section class="house-p">
            <p class="item-header">人员</p>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      <div class="cell">序号</div>
                    </th>
                    <th>
                      <div class="cell">姓名</div>
                    </th>
                    <th>
                      <div class="cell">编号</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in pPositionData" :key="item.name">
                    <td>
                      <router-link class="num-color" :to="{path:'/personnelposition',query:{name:item.name}}">{{index+1}}</router-link>
                    </td>
                    <td>
                      <router-link class="num-color" :to="{path:'/personnelposition',query:{name:item.name}}">{{item.name}}</router-link>
                    </td>
                    <td>
                      <router-link class="num-color" :to="{path:'/personnelposition',query:{name:item.name}}">{{item.numbering}}</router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>
<style scoped>
  .left-tree {
    /* width: 15%; */
    width: 225px;
    display: inline-block;
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    background: #fff;
  }

  .right-main {
    background: #f3f6f8;
    margin-left: 225px;
    /* width: 83%; */
    /* max-width: 225px; */
    padding: 20px 1%;
  }

  .right-main .item {
    border: 1px solid #e0e3ec;
  }

  .title {
    height: 50px;
    line-height: 50px;
    font-size: 26px;
  }

  .item-header {
    padding-left: 3%;
    font-size: 16px;
  }

  .table-wrap {
    background: #fff;
    padding: 0 10%;
  }

  .area {
    height: 1100px;
    background: #fff;
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .center {
    display: inline-block;
    width: 73%;
    height: 1100px;
    background: #fff;
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .right {
    display: inline-block;
    width: 25%;
    /* border: 1px solid #e0e3ec; */
  }

  .right-main .monitor-house .right .house-floor,
  .right-main .monitor-house .right .house-p {
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .right .house-floor {
    margin-bottom: 20px;
  } 

  .banner {
    background: #fff;
    height: 300px;
    padding: 5% 0;
  }

  .banner-item-img {
    width: 50%;
    height: 50%;
    margin: 0 25%;
  }

</style>
<script>
  import right from '@/assets/right.gif';
  import left from '@/assets/left.gif';
  import video from '@/assets/video.png';
  import warning from '@/assets/warning.png';

  import area from '@/assets/area.png';

  import floor from '@/assets/floor.png';
  import floor1 from '@/assets/floor1.png';
  // import floor1 from '@/assets/floor.png';

  // import vTree from '@/components/commons/tree.vue';
  export default {
    name: 'tvmonitor',
    // components: {
    //   vTree
    // },
    data() {
      return {
        images: {
          right: right,
          left: left,
          video: video,
          warning: warning,
          area: area,
          floor: floor
        },
        floors: [floor, floor1],
        // 控制右侧显示隐藏
        isShowPrison: true,
        isShowfloor: false,
        isShowMonitorArea: false,
        isShowMonitorHouse: false,

        Prisonareatree: [],
        pPositionData: [],
        treeData: []
      }
    },
    created: function () {
      var _this = this;
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          _this.treeData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});

      this.$ajxj.get('/pPositionData')
        .then((res)=> {
          this.pPositionData = res.data.data;
          this.page = res.data.total
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
    },
    mounted: function () {},
    methods: {
      handleNodeClick(data, d1, d2) {
        this.isShowMonitorHouse = true;
        this.isShowPrison = false;
      }
    }
  }

</script>
