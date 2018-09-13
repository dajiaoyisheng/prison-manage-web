<template>
  <div id="pointname">
    <section v-if="pnAside" class="pn-left">
      <el-tree :data="treeData" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.isWarning == false"><i :class="node.icon"></i>{{ node.label }}</span>
          <span v-if="data.isWarning == true"><i><img :src="images.warning"></i>{{ node.label }}</span>
        </span>
      </el-tree>
    </section>
    <!--
    <section class="pn-center" :style="{'left': pnAsideLeft + 'px'}">
      <div style="position: absolute; top:50%"> 
        <img v-if="pnAside" @click="pnAside=false, pnAsideLeft=0, pnMainAsideLeft=7" :src="images.right">
        <img v-if="!pnAside" @click="pnAside=true, pnAsideLeft=250, pnMainAsideLeft=257" :src="images.left">
      </div>
    </section>
    -->
    <section class="pn-right" :class="{'pn-right-show': !pnAside, 'pn-right-hidden': pnAside}">
      <section class="pn-right-header">
        <span style="font-size: 14px;">服刑人员:</span>
        <el-input size="small" class="pn-right-header-input" v-model="parameter.name" placeholder="请输入服刑人员姓名或编号" clearable></el-input>
        <el-button size="mini" class="search-btn" @click="doQuery()">查询</el-button>
      </section>
      <section class="pn-right-main" v-bind:style="{'left': pnMainAsideLeft + 'px'}">
        <el-container>
          <el-main class="pn-right-main-main">
            <section class="pn-right-main-main-top">
              <el-card class="box-card">
                <div slot="header" class="pn-card-label">未到人员列表(<span style="color: red;">{{ topTableData.length }}人</span>)</div>
                <el-table :data="topTableData" stripe style="width: 100%" height="175">
                  <el-table-column prop="number"      label="编号"              min-width="100px" align="center"></el-table-column>
                  <el-table-column label="姓名"        min-width="100px" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="showItem(scope.$index, scope.row)">{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="warningType" label="预警事件类型"       min-width="120px"></el-table-column>
                  <el-table-column prop="lastArea"    label="最后一次被定位区域"  min-width="230px"></el-table-column>
                  <el-table-column prop="lastTime"    label="最后一次被定位时间"  min-width="200px"></el-table-column>
                  <el-table-column label="视频" width="100px" fixed="right" align="center">
                    <template slot-scope="scope">
                      <el-button class="btn" @click="showVideo('topTableData', scope.$index, scope.row)" type="text" size="mini">
                        <img :src="images.video" style="display: inline-block; line-height: 20px; vertical-align: middle;">
                        <span style="display: inline-block; line-height: 20px; vertical-align: middle;">查看</span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination @current-change="topTableChange()" layout="prev, pager, next, jumper"
                               :current-page.sync="topPagination.currentPage" :page-size="topPagination.pageSize" :total="topPagination.totalRows">
                </el-pagination>
              </el-card>
            </section>
            <section class="pn-main-main-bottom">
              <el-card class="box-card">
                <div slot="header" class="pn-card-label"><span>已到人员列表({{ bottomTableData.length }}人)</span></div>
                <el-table :data="bottomTableData" stripe style="width: 100%" height="380">
                  <el-table-column prop="number" label="编号"     min-width="100px" align="center"></el-table-column>
                  <el-table-column label="姓名"  min-width="100px" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="showItem(scope.$index, scope.row)">{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="area"   label="当前区域" min-width="230px"></el-table-column>
                  <el-table-column prop="time"   label="识别时间" min-width="200px"></el-table-column>
                  <el-table-column prop="func"   label="识别方法" min-width="100px"></el-table-column>
                  <el-table-column label="视频" width="100px" fixed="right" align="center">
                    <template slot-scope="scope">
                      <el-button class="btn" @click="showVideo('bottomTableData', scope.$index, scope.row)" type="text" size="mini">
                        <img :src="images.video" style="display: inline-block; line-height: 20px; vertical-align: middle;">
                        <span style="display: inline-block; line-height: 20px; vertical-align: middle;">查看</span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination @current-change="bottomTableChange()" layout="prev, pager, next, jumper"
                               :current-page.sync="bottomPagination.currentPage" :page-size="bottomPagination.pageSize" :total="bottomPagination.totalRows">
                </el-pagination>
              </el-card>
            </section>
          </el-main>
          <el-aside class="pn-right-main-aside" style="width: 400px" v-if="pnMainAside">
            <el-card class="box-card">
              <div slot="header">
                <span class="pn-card-label">监控视频</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="closeVideo()">关闭</el-button>
              </div>
              <div>
                视频内容
              </div>
            </el-card>
          </el-aside>
        </el-container>
      </section>
    </section>
  </div>
</template>

<script>
  import left from '@/assets/left.gif';
  import right from '@/assets/right.gif';
  import video from '@/assets/video.png';
  import warning from '@/assets/warning.png';

  export default {
    data() {
      return {
        message: "人员点名",
        pnAside: true,
        pnMainAside: false,
        pnAsideLeft: 250,
        pnMainAsideLeft: 257,
        images: {
          left: left,
          right: right,
          video: video,
          warning: warning
        },
        topPagination: {
            pageSize : 10,
            currentPage : 1,
            totalRows : 100
        },
        bottomPagination: {
            pageSize : 10,
            currentPage : 1,
            totalRows : 100
        },
        parameter: {
          name: ''
        },
        treeData: [],
        topTableData: [],
        bottomTableData: []
      }
    },
    methods: {
      handleNodeClick: function(data) {
        alert("获取下级");
      },
      showVideo: function(name, index, row) {
        this.pnMainAside = true;
      },
      closeVideo: function() {
        this.pnMainAside = false;
      },
      doQuery: function() {
        alert("服刑人员:" + this.parameter.name);
      },
      topTableChange: function() {
        alert("切换分页");
      },
      bottomTableChange: function() {
        alert("切换分页");
      },
      showItem: function(index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      }
    },
    mounted() {
      var _this = this;
      this.$ajxj.get('/getPrisonareatree').then(function (res) {
        _this.treeData = res.data;
      }).catch(function (error) {
        console.log(error);
      }).then(function () {
      });
      
      this.$ajxj.get('/getPointNameDatas').then(function (res) {
         _this.topTableData = res.data.topTableData;
         _this.bottomTableData = res.data.bottomTableData;
      }).catch(function (error) {
         console.log(error);
      }).then(function () {
      });
    }
  }
</script>

<style scoped>
  .pn-left {
    height: calc(100% - 60px);
    width: 250px;
    top: 60px;
    left: 0;

    z-index: 666;
    overflow: auto;
    position: fixed;
    background: #fff;
    display: inline-block;
    border-right: 1px solid #e0e3ec;
  }

  .pn-center {
    width: 5px;
    left: 250px;
    height: calc(100% - 60px);

    position: fixed;
    border-right: 1px solid #e0e3ec;
  }

  .pn-center img {
    cursor: pointer;
  }

  .pn-right {
    margin: 0px 10px;
    float: right;
  }

  .pn-right-show {
    width: calc(100% - 17px);
  }

  .pn-right-hidden {
    width: calc(100% - 270px);
  }

  .pn-right-header {
    position: fixed;
    z-index: 666;
    height: 60px;
    width: 100%;
    top: 60px;

    line-height: 60px;
    padding-left: 10px;
    background-color: #f3f6f8;
  }

  .pn-right-header-input {
    width: 20%;
    vertical-align: middle;
    margin: 0px 20px 0px 5px;
  }

  .pn-right-main {
    position: absolute;
    top: 120px;
    right: 5px;
  }

  .pn-right-main-main {
    padding: 0px 0px 0px 0px;
  }

  .pn-right-main-aside {
    margin-top: 0px;
  }

  .pn-right-main-main-top {
    margin-bottom: 10px;
  }

  .btn {
    cursor: pointer;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .el-pagination {
    text-align: right;
  }

  .pn-card-label {
    color: #08B8EF  
  }
</style>
<style>
  #pointname .el-table th {
    padding: 5px 0px;
  }

  #pointname .el-table td {
    padding: 5px 0px;
  }

  #pointname .pn-right-main-main-top td {
    color: red;
  }
</style>