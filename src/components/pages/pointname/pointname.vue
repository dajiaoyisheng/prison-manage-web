<template>
  <div id="pointname">
    <section v-if="pnAside" class="pn-left">
      <el-tree :data="treeData" node-key="id" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false" highlight-current="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.isWarning == false"><i :class="node.icon"></i>{{ node.label }}</span>
          <span v-if="data.isWarning == true"><i><img :src="images.warning"></i>{{ node.label }}</span>
        </span>
      </el-tree>
    </section>
    <section class="pn-right" :class="{'pn-right-show': !pnAside, 'pn-right-hidden': pnAside}">
      <el-tabs type="border-card" @tab-click="changeTabs" v-model="activeName">
        <el-tab-pane label="实时点名" name="actPnTab">
           <section style="margin-bottom: 10px;">
              <span style="font-size: 14px;">服刑人员:</span>
              <el-input size="small" class="pn-right-header-input" v-model="parameter.keyword" placeholder="请输入服刑人员姓名或编号" clearable></el-input>
              <el-button size="mini" class="search-btn" @click="doQuery()">查询</el-button>
              <el-button size="mini" class="search-btn" @click="pointNameNow()">立即点名</el-button>
          </section>
          <section>
            <el-dialog title="人员点名" :visible.sync="showDialog" width="1000px" :before-close="beforeClose">
              <pointNameHis ref="pointNameHisNow"></pointNameHis>
            </el-dialog>
          </section>
          <section v-bind:style="{'left': pnMainAsideLeft + 'px'}">
            <el-container>
              <el-main class="pn-right-main-main">
                <section class="pn-right-main-main-top">
                  <el-card class="box-card">
                    <div slot="header" class="pn-card-label">未识别人员列表(<span style="color: red;">{{ topTableData.length }}人</span>)</div>
                    <el-table :data="topTableData" stripe style="width: 100%" height="240">
                      <el-table-column prop="criCode"     label="编号"              min-width="100px" align="center"></el-table-column>
                      <el-table-column prop="criName"     label="姓名"              min-width="100px" align="center"></el-table-column>
                      <el-table-column prop="warningType" label="预警事件类型"       min-width="120px"></el-table-column>
                      <el-table-column prop="paiCode"     label="最后一次被定位区域" min-width="230px"></el-table-column>
                      <el-table-column prop="cpcLoctime"  label="最后一次被定位时间" min-width="200px"></el-table-column>
                      <el-table-column prop="timeLength"  label="距当前时间"         min-width="200px"></el-table-column>
                    </el-table>
                  </el-card>
                </section>
                <section class="pn-main-main-bottom">
                  <el-card class="box-card">
                    <div slot="header" class="pn-card-label"><span>已识别人员列表({{ bottomTableData.length }}人)</span></div>
                    <el-table :data="bottomTableData" stripe style="width: 100%" height="365">
                      <el-table-column prop="criCode"     label="编号"    min-width="100px" align="center"></el-table-column>
                      <el-table-column prop="criName"     label="姓名"    min-width="100px" align="center"></el-table-column>
                      <el-table-column prop="paiCode"     label="当前区域" min-width="230px"></el-table-column>
                      <el-table-column prop="cpcLoctime"  label="识别时间" min-width="200px"></el-table-column>
                      <el-table-column prop="cpoLoctype"  label="识别方法" min-width="100px"></el-table-column>
                      <el-table-column label="视频" width="100px" fixed="right" align="center">
                        <template slot-scope="scope">
                          <el-button class="btn" @click="showVideo('bottomTableData', scope.$index, scope.row)" type="text">
                            <img :src="images.video" style="display: inline-block; line-height: 20px; vertical-align: middle;">
                            <span style="display: inline-block; line-height: 20px; vertical-align: middle;">查看</span>
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-card>
                </section>
              </el-main>
              <el-aside class="pn-right-main-aside" style="width: 800px" v-if="pnMainAside">
                <el-card class="box-card">
                  <div slot="header">
                    <span class="pn-card-label">监控视频</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="closeVideo()">关闭</el-button>
                  </div>
                  <div>
                    <iframe v-for="camera in cameras" :key="camera" style="height: 370px; width: 750px;" :src="'../ws_rtsp/rtspPlay.jsp?id=' + camera"></iframe>
                  </div>
                </el-card>
              </el-aside>
            </el-container>
          </section>
        </el-tab-pane>
        <el-tab-pane label="历史点名" name="hisPnTab">
          <section>
            <span style="font-size: 14px;">点名日期:</span>
            <el-date-picker size="mini" v-model="parameter.pointDate" placeholder="选择日期" type="date" @change="queryPointNameTimes"></el-date-picker>
            <span style="font-size: 14px;">点名时间:</span>
            <el-select size="mini" v-model="parameter.pointTime">
              <el-option v-for="item in pointTimes" :key="item.pnTime" :label="item.pnTime" :value="item.pnTime"></el-option>
            </el-select>
            <el-button size="mini" class="search-btn" @click="queryPointNameHis()">查询</el-button>
          </section>
          <section v-bind:style="{'left': pnMainAsideLeft + 'px'}">
            <pointNameHis ref="pointNameHisTab"></pointNameHis>
          </section>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
  import left from '@/assets/left.gif';
  import right from '@/assets/right.gif';
  import video from '@/assets/video.png';
  import warning from '@/assets/warning.png';
  import pointNameHis from './pointNameHis';
  import tablePagination from '@/components/commons/tablePage.vue';

  export default {
    data() {
      return {
        pnAside: true,            // 是否显示左侧树形
        showDialog: false,        // 是否显示点名窗口
        pnMainAside: false,       // 是否显示视频窗口
        activeName: 'actPnTab',   // 默认显示页签名称
        pnMainAsideLeft: 250,
        images: {
          left: left,
          right: right,
          video: video,
          warning: warning
        },
        bottomPagination: {
          pageSize: 10,
          currentPage: 1,
          totalRows: 100
        },
        parameter: {
          pointDate: new Date(),
          pointTime: '',
          keyword: '',
          nodeType: '',
          nodeId: ''
        },
        treeData: [],
        topTableData: [],
        bottomTableData: [],
        cameras: [],
        pointTimes: [],
        timmer: null
      }
    },
    methods: {
      /** 切换TABS页签操作 */
      changeTabs: function(tab, event) {
        if (this.activeName == 'actPnTab') {
          this.initSetInterval();
        } else if (this.activeName == 'hisPnTab') {
          this.pnAside = true;
          this.pnMainAside = false;
          this.pnMainAsideLeft = 250;
          this.parameter.pointTime = '';
          this.parameter.pointDate = new Date();
          this.queryPointNameTimes();
          this.clearSetInterval();
        }
      },
      /** 获取人员点名导航树 */
      getPrisonareatree: function () {
        this.$get(this.urlconfig.pnGetPrisonareatree).then((res) => {
          if (res.status === 0) {
            this.treeData = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取点名列表信息 */
      getTabledatas: function () {
        let data = { "parameter": JSON.stringify(this.parameter) };
        this.$post(this.urlconfig.pnGetTabledatas, data).then((res) => {
          if (res.status === 0) {
            this.topTableData = res.data.unidentified;
            this.bottomTableData = res.data.identified;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 点击树节点获取列表信息 */
      handleNodeClick: function (data) {
        this.parameter.nodeType = data.nodeType;
        this.parameter.nodeId = data.id;
        this.activeName = 'actPnTab';
        this.getTabledatas();

        if (this.timmer == null) {
          this.initSetInterval();
        }
      },
      /** 根据条件查询列表信息 */
      doQuery: function () {
        this.getTabledatas();
      },
      /** 显示监控视频区域 */
      showVideo: function (name, index, row) {
        this.pnAside = false;
        this.pnMainAsideLeft = 7;
        this.pnMainAside = true;
        this.cameras = row.cameras;
      },
      /** 关闭监控视频区域 */
      closeVideo: function () {
        this.pnAside = true;
        this.pnMainAsideLeft = 250;
        this.pnMainAside = false;
      },
      /** 初始化定时刷新任务 */
      initSetInterval: function () {
        this.timmer = setInterval(() => {
          this.getTabledatas();
        }, 5000);
      },
      /** 清除定时刷新任务 */
      clearSetInterval: function() {
        if (this.timmer != null) {
          clearInterval(this.timmer);
          this.timmer = null;
        }
      },
      /** 查询历史点名时间记录 */
      queryPointNameTimes: function() {
        let data = { 
          "nodeId" : this.parameter.nodeId,
          "pointDate" : this.parameter.pointDate
        };

        this.$post(this.urlconfig.pnGetPnTimes, data).then((res) => {
          if (res.status === 0) {
            if ((res.data != null) && (res.data.length > 0)) {
              this.parameter.pointTime = res.data[0].pnTime;
            } else {
              this.parameter.pointTime = "";
            }
            
            this.pointTimes = res.data;
            this.queryPointNameHis();
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 查询点名历史操作 */
      queryPointNameHis: function() {
        this.$nextTick(() => {
          let nodeIdParameter = this.parameter.nodeId;
          let pointDateParameter = this.parameter.pointDate;
          let pointTimeParameter = this.parameter.pointTime;
          this.$refs.pointNameHisTab.initQuery(nodeIdParameter, pointDateParameter, pointTimeParameter);
        });
      },
      /** 立即点名操作 */
      pointNameNow: function() {
        this.showDialog = true;
        this.$nextTick(() => {
          this.$refs.pointNameHisNow.pointNameNow(this.parameter);
        });
      },
      /** 窗口关闭前操作 */
      beforeClose: function (done) {
        done();
        this.showDialog = false;
      }
    },
    mounted() {
      this.getPrisonareatree();
      this.getTabledatas();
      this.initSetInterval();
    },
    beforeDestroy() {
      this.clearSetInterval();
    },
    components: {
      pointNameHis,
      tablePagination
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

  .pn-right {
    margin: 0px 10px;
    float: right;
  }

  .pn-right-show {
    width: calc(100% - 17px);
  }

  .pn-right-hidden {
    width: calc(100% - 265px);
  }

  .pn-right-header-input {
    width: 20%;
    vertical-align: middle;
    margin: 0px 20px 0px 5px;
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
    color: black;
  }
</style>

<style>
  #pointname .el-table__row {
    height: 57px;
  }

  #pointname .el-table th {
    padding: 5px 0px;
  }

  #pointname .el-table td {
    padding: 5px 0px;
  }

  #pointname .pn-right-main-main-top td {
    color: red;
  }

  #pointname .el-card__body {
    padding-bottom: 0px;
  }

  #pointname .el-tabs__header {
    padding: 0;
    position: relative;
  }

  #pointname .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    position: relative;
  }

  #pointname .el-dialog__body {
    padding: 10px 20px;
  }
</style>