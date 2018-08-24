<template>
  <div id="pointname">
    <el-container class="pn-container">
      <el-aside class="pn-aside" style="width: 250px;"><el-tree :data="treeData" :props="defProps" @node-click="handleNodeClick"></el-tree></el-aside>
      <el-main class="pn-main">
        <el-container class="pn-main-container">
          <el-header style="height: 40px; line-height: 40px; vertical-align: middle; border-bottom: none;">
              <span>服刑人员:</span>
              <el-input size="small" class="pn-main-header-input" v-model="parameter.name" placeholder="请输入服刑人员姓名或编号" clearable></el-input>
              <el-button size="small" type="primary" @click="doQuery()">查询</el-button>
          </el-header>
          <el-container>
            <el-main class="pn-main-main">
              <section class="pn-main-main-top">
                <el-card class="box-card">
                  <div slot="header"><span style="color: red;">未到人员列表({{ topTableData.length }}人)</span></div>
                  <el-table :data="topTableData" stripe style="width: 100%" height="192">
                    <el-table-column prop="number"      label="编号"></el-table-column>
                    <el-table-column prop="name"        label="姓名"></el-table-column>
                    <el-table-column prop="warningType" label="预警事件类型"></el-table-column>
                    <el-table-column prop="lastArea"    label="最后一次被定位区域"  min-width="150px"></el-table-column>
                    <el-table-column prop="lastTime"    label="最后一次被定位时间"></el-table-column>
                    <el-table-column label="视频" width="100px">
                      <template slot-scope="scope">
                        <button class="btn" @click="showVideo('topTableData', scope.$index, scope.row)">视频</button>
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
                  <div slot="header"><span>已到人员列表({{ bottomTableData.length }}人)</span></div>
                  <el-table :data="bottomTableData" stripe style="width: 100%" height="330">
                    <el-table-column prop="number" label="编号"></el-table-column>
                    <el-table-column prop="name"   label="姓名"></el-table-column>
                    <el-table-column prop="area"   label="当前区域" min-width="150px"></el-table-column>
                    <el-table-column prop="time"   label="识别时间"></el-table-column>
                    <el-table-column prop="func"   label="识别方法"></el-table-column>
                    <el-table-column label="视频" width="100px">
                      <template slot-scope="scope">
                        <button class="btn" @click="showVideo('bottomTableData', scope.$index, scope.row)">视频</button>
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
                  <span>监控视频</span>
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
  export default {
    data() {
      return {
        message: "人员点名",
        pnMainAside: false,
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
        topTableData: [
          {
            number: 'A010101',
            name: '张三',
            warningType: '无法定位',
            lastArea: '第一监区/一号监舍楼/一层/监舍1',
            lastTime: '13:01:23 07/23/2018'
          }, {
            number: 'A010102',
            name: '李四',
            warningType: '无法定位',
            lastArea: '第一监区/一号监舍楼/一层/监舍1',
            lastTime: '13:01:23 07/23/2018'
          }, {
            number: 'A010103',
            name: '王五',
            warningType: '无法定位',
            lastArea: '第一监区/一号监舍楼/一层/监舍1',
            lastTime: '13:01:23 07/23/2018'
          }
        ],
        bottomTableData: [
          {
            number: 'A010102',
            name: '李一',
            area: '第一监区/生产车间/生产车间1',
            time: '13:02:23 07/23/2018',
            func: '人脸/视觉码'
          }, {
            number: 'A010102',
            name: '李一',
            area: '第一监区/生产车间/生产车间1',
            time: '13:02:23 07/23/2018',
            func: '人脸/视觉码'
          }, {
            number: 'A010102',
            name: '李一',
            area: '第一监区/生产车间/生产车间1',
            time: '13:02:23 07/23/2018',
            func: '人脸/视觉码'
          }
        ],
        treeData: [
          {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }
        ],
        defProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick: function(data) {
        alert("获取下级节点");
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
      }
    }
  }
</script>

<style>
  .pn-container {
    height: 850px;
  }

  .pn-aside {
    padding: 10px;
    border: 1px solid #C0C4CC;
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

  .pn-main-main-top th {
    color: red;
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
</style>