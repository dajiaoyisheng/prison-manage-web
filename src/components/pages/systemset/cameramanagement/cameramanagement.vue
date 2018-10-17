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
          <el-table-column prop="prisonerType" label="摄像头类型"></el-table-column>
          <!-- 可编辑 -->
          <el-table-column prop="warningArea" label="所在区域">
            <template slot-scope="scope">
              <div @click="changeArea(scope.$index, scope.row)">
                <el-select v-show="changeCur === scope.$index" @blur="changeCur
                =null" size="small"
                  v-model="editArea" placeholder="请选择">
                  <el-option v-for="item in warningTypes" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span v-show="changeCur !== scope.$index">{{scope.row.warningArea}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="timeLen" label="坐标位置"></el-table-column>
          <el-table-column prop="timeLen" label="摄像头方向"></el-table-column>
          <el-table-column prop="timeLen" label="相邻摄像头"></el-table-column>
          <el-table-column prop="timeLen" label="视频服务地址"></el-table-column>
          <el-table-column label="查看视频">
            <!-- <template slot-scope="scope">
              <el-button @click="showVideo(scope.$index, scope.row)" size="mini">查看</el-button>
            </template> -->
            <template slot-scope="scope">
              <router-link tag="a" class="num-color" :to="{path:'/personnelposition',query:{name:scope.row.prisonerName}}">
                <img class="v-align-m" :src="video" alt=""><span> 查看</span>
              </router-link>
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
  import video from '@/assets/video.png';
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
        video: video,
        params: {
          warningType: "",
          prisonerType: "",
          prisonerName: "",
          period: [new Date(), new Date()]
        },
        prisonerInfo: [],
        warningType: [],
        warningTypes: [],
        editArea: '',
        curChangeIndex: null,
        prisonerTypes: [],
        ppuTableDatas: [],
        changeCur: null
      }
    },
    created: function () {
      this.getCameraList();
    },
    methods: {
      pageChange(page) {
        this.currentPage = page
        this.getCameraList(page)
      },
      filter() {

      },
      clear: function () {
        console.log('this.params.warningType', this.params.warningType)
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
        this.$post('/getCameraList', {
          page: page
        }).then((res) => {
          this.prisonerInfo = res.data.items;
          this.count = res.data.totalRows
        })
      },
      // 判断要改变的摄像头区域并保存
      changeArea: function (index, row) {
        this.changeCur = index;
        this.curChangeIndex = index;
      },
      // chooseArea: function (val) {
      //   console.log('chooseArea', val);
      // }
    },
    watch: {
      // 当所在区域改变时给当前改变的对象赋予新值
      editArea: function (val, oldval) {
        this.warningTypes.map((value, index) => {
          if (val === value.value) {
            this.prisonerInfo[this.curChangeIndex].warningArea = value.label;
          }
        })
        this.curChangeIndex = null;
      }
    },
    mounted() {
      // 获取预警事件类型
      this.$get('/getWarningTypes').then((respnose) => {
        this.warningTypes = respnose.data;
      })
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

  #posunusual .text-center {
    text-align: center;
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
