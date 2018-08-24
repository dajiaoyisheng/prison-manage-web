<template>
  <div id="posunusual">
    <p class="contentInfo">摄像头列表</p>
    <section class="contentMain">
      <section class="puu-params">
        <el-row>
          <el-col :span="3">
            <span>监区:</span>
            <el-select size="small" v-model="params.warningType" placeholder="请选择">
              <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <span>区域:</span>
            <el-select size="small" v-model="params.warningType" placeholder="请选择">
              <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <span>摄像头类型:</span>
            <el-select size="small" v-model="params.warningType" placeholder="请选择">
              <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <span>视频服务地址:</span>
            <el-select size="small" v-model="params.warningType" placeholder="请选择">
              <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <span>摄像头:</span>
            <el-input size="small" class="pp-input" v-model="params.prisonerName" placeholder="请输入摄像头编号或名称" clearable>
              <el-button slot="append" @click="filter">查询</el-button>
            </el-input>
          </el-col>
          <el-col :span="1">
            <el-button class="primary" size="small" @click="clear()">保存</el-button>
          </el-col>
        </el-row>


      </section>
      <section class="el-table-wrap">
        <el-table :data="ppuTableDatas" stripe style="width: 100%;">
          <el-table-column prop="startTime" label="监区"></el-table-column>
          <el-table-column prop="endTime" label="楼宇"></el-table-column>
          <el-table-column prop="timeLen" label="楼层"></el-table-column>
          <el-table-column prop="prisonerType" label="房间/过道"></el-table-column>
          <el-table-column prop="warningType" label="摄像头编号"></el-table-column>
          <el-table-column prop="warningArea" label="摄像头名称"></el-table-column>
          <el-table-column prop="warningArea" label="摄像头类型"></el-table-column>
          <el-table-column prop="warningArea" label="所在区域"></el-table-column>
          <el-table-column prop="warningArea" label="坐标位置"></el-table-column>
          <el-table-column prop="warningArea" label="摄像头方向"></el-table-column>
          <el-table-column prop="warningArea" label="相邻摄像头"></el-table-column>
          <el-table-column prop="warningArea" label="视频服务地址"></el-table-column>
          <el-table-column label="查看视频">
            <template slot-scope="scope">
              <el-button @click="showVideo(scope.$index, scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="warningArea" label="备注"></el-table-column>
        </el-table>
        <div class="el-pagination-wrap text-center">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="pagination.totalRows">
          </el-pagination>
        </div>
      </section>
    </section>

  </div>
</template>

<script>
  export default {
    name: 'posunusual',
    data() {
      return {
        message: "定位异常预警",
        params: {
          warningType: "0",
          prisonerType: "0",
          prisonerName: "",
          period: [new Date(), new Date()]
        },
        pagination: {
          pageSize: 10,
          currentPage: 1,
          totalRows: 100
        },
        prisonerInfo: {},
        warningTypes: [],
        prisonerTypes: [],
        ppuTableDatas: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      filter() {

      },
      handleCurrentChange(val) {
        this.getTableData(val);
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      clear: function () {
        this.params.period = [new Date(), new Date()];
        this.params.warningType = "";
        this.params.prisonerType = "";
        this.params.prisonerName = "";
      },
      changeCurrent: function () {
        alert("当前第" + this.pagination.currentPage + "页");
      },
      showVideo: function (index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      },
      showPrisoner: function () {
        var _this = this;
        this.$ajxj.get('/getPrisonerInfo').then(function (respnose) {
          _this.prisonerInfo = respnose.data;
        }).catch(function (error) {}).then(function (error) {
          console.log(error);
        });
      }
    },
    mounted() {
      // 获取预警事件类型字典
      var _this = this;
      this.$ajxj.get('/getWarningTypes').then(function (respnose) {
        _this.warningTypes = respnose.data;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });

      // 获取服刑人员类型字典
      this.$ajxj.get('/getPrisonerTypes').then(function (respnose) {
        _this.prisonerTypes = respnose.data;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });

      // 获取表格数据
      this.$ajxj.get('/getPosunusualItems').then(function (respnose) {
        _this.ppuTableDatas = respnose.data.items;
        _this.pagination.totalRows = respnose.data.totalRows;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });
    }
  }

</script>

<style scoped>
  .el-select {
    width: 58%;
  }

  /* .puu-params {
    padding: 0 1%;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    font-size: 14px;
  }

  .puu-params .el-select,
  .puu-params .pp-input {
    width: 8%;
    margin: 0px 20px 0px 5px;
  } */

  .puu-item-popover {
    font-size: 12px;
  }

  .pp-input {
    width: 78%;
  }

</style>
