<template>
  <div id="cameramanager">
    <p class="contentInfo">摄像头列表</p>
    <section class="contentMain">
      <section class="puu-params">
        <el-row>
          <el-col :span="7">
            <span>所在区域:</span>
            <el-cascader size="small" change-on-select placeholder="请选择" :options="prisonSubRegions" @change="changePaiPathFilter"></el-cascader>
          </el-col>
          <el-col :span="7">
            <span>摄像头类型:</span>
            <el-select size="small" v-model="params.ciType" placeholder="请选择">
              <el-option v-for="item in cameraTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <span>摄像头编号/名称:</span>
            <el-input size="small" class="pp-input" v-model="params.ciName" placeholder="请输入摄像头编号或名称" clearable></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" class="search-btn" @click="getCameraList">查询</el-button>
            <el-button type="primary" size="small" class="search-btn" @click="saveCameraInfo">保存</el-button>
          </el-col>
        </el-row>
      </section>
      <section>
        <el-dialog title="实时视频" :visible.sync="isShowVideo" width="900px" :before-close="beforeClose">
          <cameraVideo :cameraId="cameraId"></cameraVideo>
        </el-dialog>
      </section>
      <section class="el-table-wrap">
        <el-table :data="cameraList" stripe style="width: 100%;">
          <el-table-column prop="paiPath"     label="所在区域"        min-width="200px" align="center">
            <template slot-scope="scope">
              <div @click="changePaiCode(scope.$index, scope.row)">
                <el-cascader :change-on-select="true" v-show="current === scope.$index" @blur="current=null"
                  placeholder="请选择" :options="prisonSubRegions" @change="changePaiPathTable">
                </el-cascader>
                <span v-show="current !== scope.$index">{{scope.row.paiPath}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ciId"        label="摄像头编号"      min-width="80px"  align="center"></el-table-column>
          <el-table-column prop="ciName"      label="摄像头名称"      min-width="80px"  align="center"></el-table-column>
          <el-table-column prop="ciType"      label="摄像头类型"      min-width="140px" align="center"></el-table-column>
          <el-table-column prop="ciNearid"    label="相邻摄像头"      min-width="140px" align="center"></el-table-column>
          <el-table-column prop="realtimeUri" label="实时视频服务地址" min-width="140px" align="center"></el-table-column>
          <el-table-column prop="replayUri"   label="回放视频服务地址" min-width="140px" align="center"></el-table-column>
          <el-table-column prop="ciMemo"      label="备注"            min-width="120px" align="center"></el-table-column>
          <el-table-column label="操作"       fixed="right"           width="120px"     align="center">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showVideo(scope.$index, scope.row)" type="text">实时视频</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination-wrap">
          <table-pagination :total="count" @change="getCameraList" ref="pagination"></table-pagination>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import video from '@/assets/video.png';
  import tablePagination from '@/components/commons/tablePage.vue';
  import cameraVideo from '@/components/pages/systemset/cameramanagement/showVideo.vue';

  export default {
    components: {
      cameraVideo,
      tablePagination
    },
    data() {
      return {
        prisonSubRegions: [],   // 区域树形
        cameraTypes: [],        // 摄像头类型
        count: 0,               // 查询总数
        cameraList: [],         // 摄像头列表
        cameraId: null,         // 摄像头ID
        isShowVideo: false,     // 是否弹出视频
        changeRow: [],          // 保存修改列表
        current: null,          // 修改当前节点
        tempRow: [],            // 保存一下当前点击的所在区域的数据
        params: {
          paiCode: "",
          ciType: "",
          ciName: "",
          nodeType: ""
        }
      }
    },
    mounted() {
      this.getPrisonSubRegions();
      this.getCameraTypes();
      this.getCameraList();
    },
    methods: {
      /** 获取所属区域 */
      getPrisonSubRegions: function () {
        this.$get(this.urlconfig.cmGetPrisonSubRegions).then((res) => {
          if (res.status === 0) {
            this.prisonSubRegions = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取摄像头类型 */
      getCameraTypes: function () {
        this.$get(this.urlconfig.cmGetCameraTypes).then((res) => {
          if (res.status === 0) {
            this.cameraTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取摄像头列表 */
      getCameraList: function () {
        let data = {
          "pageIndex": this.$refs.pagination.index,
          'pageSize': this.$refs.pagination.limit,
          "params": JSON.stringify(this.params)
        }

        this.$post(this.urlconfig.cmGetCameraList, data).then((res) => {
          if (res.status === 0) {
            this.tempRow = [];
            this.changeRow = [];
            this.current = null;
            this.count = res.data.totalRows;
            this.cameraList = res.data.items;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 保存摄像头信息 */
      saveCameraInfo: function () {
        let data = { "saveItems": JSON.stringify(this.changeRow) };
        this.$post(this.urlconfig.cmSaveCameraInfo, data).then((res) => {
          if (res.status === 0) {
            this.$message.success(res.statusinfo);
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 查看视频操作 */
      showVideo: function (index, row) {
        this.cameraId = row.ciId;
        this.isShowVideo = true;
      },
      /** 关闭视频操作 */
      beforeClose: function () {
        this.cameraId = null;
        this.isShowVideo = false;
      },
      /** 所属区域查询条件 */
      changePaiPathFilter(value) {
        let tempArry = [];
        this.params.paiCode = value[value.length - 1];
        tempArry = this.getCascaderObj(value, this.prisonSubRegions);
        tempArry.map(val => { this.params.nodeType = val.nodeType });
      },
      /** 修改所在区域 */
      changePaiCode: function (index, row) {
        this.tempRow = row;
        this.current = index;
      },
      /** table处的改变所在区域,value是选择后的数据 */
      changePaiPathTable: function(value) {
        let tempPaiCodeRow = [], tempArry = [];
        tempArry = this.getCascaderObj(value, this.prisonSubRegions);
        tempArry.map(val => { tempPaiCodeRow.push(val.label) });
        this.cameraList.forEach(val => {
          if (this.tempRow.ciId === val.ciId) {
            val.paiPath = tempPaiCodeRow.join("/");
          }
        })
        
        let tempSaveData = {};
        tempArry.map(val => { 
          tempSaveData = {
            "ciId": this.tempRow.ciId,
            "paiCode": val.value
          }
        });

        let index = this.changeRow.findIndex(item => item.ciId === this.tempRow.ciId);
        if (index > -1) {
          this.changeRow[index] = tempSaveData;
        } else {
          this.changeRow.push(tempSaveData);
        }
      },
      /** 根据value找到对应的labal */
      getCascaderObj: function(val, opt) {
        return val.map(function (value) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children;
              return itm;
            }
          }
          return null;
        });
      }
    }
  }
</script>

<style scoped>
  .el-select {
    width: 58%;
  }

  .contentInfo {
    margin-left: 2%;
  }

  .puu-item-popover {
    font-size: 12px;
  }

  .pp-input {
    width: 50%;
  }

  .tree-wrap-self {
    display: none;
  }
</style>

<style>
  #cameramanager .el-dialog__body {
    padding: 5px 5px;
  }
</style>