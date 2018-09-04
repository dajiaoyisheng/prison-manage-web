<template>
  <div id="pointname">
    <el-container class="pn-container">
      <el-aside v-if="pnAside" class="pn-aside" style="width: 250px;">
        <el-tree :data="treeData" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span> <i :class="node.icon"></i>{{ node.label }}</span>
          </span>
        </el-tree>
      </el-aside>
      <el-aside class="pn-center" style="width: 5px;">
        <div style="position: absolute; top:50%">
          <img v-if="pnAside" @click="pnAside=false" :src="images.right">
          <img v-if="!pnAside" @click="pnAside=true" :src="images.left">
        </div>
      </el-aside>
      <el-main v-if="pnMain" class="pn-main">
        <el-container class="pn-main-container">
          <el-header style="height: 40px; line-height: 40px; vertical-align: middle; border-bottom: none;">
              <span style="font-size: 14px;">服刑人员:</span>
              <el-input size="small" class="pn-main-header-input" v-model="parameter.name" placeholder="请输入服刑人员姓名或编号" clearable></el-input>
              <el-button size="mini" class="search-btn" @click="doQuery()">查询</el-button>
          </el-header>
          <el-container>
            <el-main class="pn-main-main">
              <section class="pn-main-main-top">
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
                  <el-table :data="bottomTableData" stripe style="width: 100%" height="350">
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
            <el-aside class="pn-main-aside" style="width: 400px" v-if="pnMainAside">
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
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import right from '@/assets/right.gif';
  import left from '@/assets/left.gif';
  import video from '@/assets/video.png';

  export default {
    data() {
      return {
        message: "人员点名",
        pnAside: true,
        pnMain: false,
        pnMainAside: false,
        images: {
          right: right,
          left: left,
          video: video
        },
        parameter: {
          name: ''
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
        topTableData: [],
        bottomTableData: [],
        treeData: []
      }
    },
    methods: {
      handleNodeClick: function(data) {
        this.pnMain = true;
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
      showVideo: function(name, index, row) {
        this.pnMainAside = true;
      },
      closeVideo: function() {
        this.pnMainAside = false;
      },
      showItem: function(index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      }
    },
    mounted() {
      var _this = this;
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          _this.treeData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });

        this.$ajxj.get('/getPointNameDatas')
        .then(function (res) {
          _this.topTableData = res.data.topTableData;
          _this.bottomTableData = res.data.bottomTableData;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
    },
  }
</script>

<style scoped>
  .pn-container {
    height: 850px;
  }

  .pn-aside {
    padding: 10px;
    border: 1px solid #C0C4CC;
    background-color: white;
  }

  .pn-center {
    border-right: 1px solid #C0C4CC;
  }

  .pn-center img {
    width:5px; 
    height:40px; 
    cursor: pointer;
  }

  .pn-main {
    padding: 0px 0px;
  }

  .pn-main-container {
    height: 100%;
  }

  .pn-main-container .el-header {
    margin: 0px 0px 0px 10px;
  }

  .pn-main-header-input {
    width: 20%;
    vertical-align: middle;
    margin: 0px 20px 0px 5px;
  }

  .pn-main-main {
    padding: 10px 10px 0px 10px;
  }

  .pn-main-main-top {
    margin-bottom: 10px;
  }

  .pn-main-main-top td {
    color: red;
  }

  .pn-main-aside {
    margin-top: 10px;
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

  .el-table td, .el-table th {
    padding: 5px 0px;
  }
</style>
<style>
  #pointname .el-table th {
    padding: 5px 0px;
  }

  #pointname .el-table td {
    padding: 5px 0px;
  }

  #pointname .pn-main-main-top td {
    color: red;
  }
</style>