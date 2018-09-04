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
        <el-table :data="prisonerInfo" stripe style="width: 100%;">
          <el-table-column prop="startTime" label="监区"></el-table-column>
          <el-table-column prop="endTime" label="楼宇"></el-table-column>
          <el-table-column prop="timeLen" label="楼层"></el-table-column>
          <el-table-column prop="prisonerType" label="房间/过道"></el-table-column>
          <el-table-column prop="warningType" label="摄像头编号"></el-table-column>
          <el-table-column prop="prisonerName" label="摄像头名称"></el-table-column>
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
          <!-- <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="pagination.totalRows">
          </el-pagination> -->
          <table-pagination :total="count" @change="pageChange"></table-pagination>
        </div>
      </section>
    </section>

  </div>
</template>

<script>
  import tablePagination from '@/components/commons/tablePage.vue';
  export default {
    name: 'posunusual',
    components: {
      tablePagination
    },
    data() {
      return {
        count: 0, //总记录数
        message: "定位异常预警",
        params: {
          warningType: "0",
          prisonerType: "0",
          prisonerName: "",
          period: [new Date(), new Date()]
        },
        prisonerInfo: [],
        warningTypes:[],
        prisonerTypes: [],
        ppuTableDatas: [],
      }
    },
    methods: {
      pageChange(page) {
        this.currentPage = page
        this.getCameraList(page)
      },
      filter() {

      },
      clear: function () {
        this.params.period = [new Date(), new Date()];
        this.params.warningType = "";
        this.params.prisonerType = "";
        this.params.prisonerName = "";
      },

      showVideo: function (index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      },
      getCameraList: function (page) {
        var _this = this;
        this.$ajxj.post('/getCameraList',{page:page}).then(function (res) {
          console.log('res',res);
          
          _this.prisonerInfo = res.data.items;
          _this.count = res.data.totalRows
        }).catch(function (error) {}).then(function (error) {
          console.log(error);
        });
      }
    },
    mounted() {
      this.getCameraList();
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
