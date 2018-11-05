<template>
  <div id="cameramanager">
    <p class="contentInfo">摄像头列表</p>
    <section class="contentMain">
      <section class="puu-params">
        <el-row>
          <el-col :span="7">
            <span>所在区域:</span>
            <el-select size="small" v-model="params.psiCode" placeholder="请选择">
              <el-option v-for="item in prisonSubRegions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
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
      <section class="el-table-wrap">
        <el-table :data="cameraList" stripe style="width: 100%;">
          <el-table-column prop="paiCode"       label="所在区域"         min-width="120px" align="center">
            <template slot-scope="scope">
              <div @click="changePaiCode(scope.$index, scope.row)">
                <el-select v-show="current===scope.$index" @blur="current=null" size="small" v-model="savePaiCode" placeholder="请选择">
                  <el-option v-for="item in prisonSubRegions" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span v-show="current !== scope.$index">{{scope.row.paiCode}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ciId"          label="摄像头编号"       min-width="80px" align="center"></el-table-column>
          <el-table-column prop="ciName"        label="摄像头名称"       min-width="80px" align="center"></el-table-column>
          <el-table-column prop="ciType"        label="摄像头类型"       min-width="140px" align="center"></el-table-column>
          <el-table-column prop="ciNearid"      label="相邻摄像头"       min-width="140px" align="center"></el-table-column>
          <el-table-column prop="realtimeUri"   label="实时视频服务地址"  min-width="140px" align="center"></el-table-column>
          <el-table-column prop="replayUri"     label="回放视频服务地址"  min-width="140px" align="center"></el-table-column>
          <el-table-column prop="ciMemo"        label="备注"            min-width="120px" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="120px" align="center">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showVideo(scope.$index, scope.row)" type="text">实时视频</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination-wrap text-center">
          <table-pagination :total="count" @change="getCameraList" ref="pagination"></table-pagination>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import video from '@/assets/video.png';
  import tablePagination from '@/components/commons/tablePage.vue';

  export default {
    components: {
      tablePagination
    },
    data() {
      return {
        count: 0,               // 查询总数
        prisonSubRegions: [],   // 区域树形
        cameraTypes: [],        // 摄像头类型
        cameraList:[],          // 摄像头列表
        current: null,          // 修改当前节点
        currentIndex: "",       // 当前节点索引
        savePaiCode: "",        // 当前所在区域

        params: {
          psiCode: "",
          ciType: "",
          ciName: ""
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
      getPrisonSubRegions: function() {
        // TODO:有待完善
      },
      /** 获取摄像头类型 */
      getCameraTypes: function() {
        let url = this.$store.state.env + "/systemCode.action?method=getCameraType";
        this.$ajxj.get(url).then((res) => {
          this.cameraTypes = res.data;
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            // todo somthing...
        });
      },
      /** 获取摄像头列表 */
      getCameraList: function() {
        let data = {
          "pageIndex": this.$refs.pagination.index,
          'pageSize': this.$refs.pagination.limit,
          "params": JSON.stringify(this.params)
        }

        let url = this.$store.state.env + "/cameraInfo.action?method=getCameraList";
        this.$post(url, data).then((res) => {
          this.count = res.data.totalRows;
          this.cameraList = res.data.items;
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            // todo somthing...
        });
      },
      /** 保存摄像头信息 */
      saveCameraInfo: function() {
        // TODO:有待完善
      },
      /** 查看视频操作 */
      showVideo: function(index, row) {
        // TODO:有待完善
      },
      /** 修改所在区域 */
      changePaiCode: function (index, row) {
        this.current = index;
        this.currentIndex = index;
      }
    },
    watch: {
      savePaiCode: function (val, oldval) {
        this.prisonSubRegions.map((value, index) => {
          if (val === value.value) {
            this.cameraList[this.currentIndex].paiCode = value.label;
          }
        })
        this.currentIndex = null;
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
</style>