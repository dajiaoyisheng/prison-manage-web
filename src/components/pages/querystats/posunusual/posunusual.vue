<template>
  <div id="posunusual">
    <section class="puu-params">
      <el-row style="margin: 0px 10px;">
        <el-col :span="6">
          <span>
            <span class="puu-params-label">时间:</span>
            <el-date-picker style="width: 40%" size="mini" v-model="params.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
            <span>-</span>
            <el-date-picker style="width: 40%" size="mini" v-model="params.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          </span>
        </el-col>
        <el-col :span="5">
          <span class="puu-params-label">预警事件类型:</span>
          <el-select size="mini" v-model="params.warningType" placeholder="请选择">
            <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span class="puu-params-label">服刑人员类型:</span>
          <el-select size="mini" v-model="params.prisonerType" placeholder="请选择">
            <el-option v-for="item in prisonerTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="puu-params-label">服刑人员姓名/编号:</span>
          <el-input size="mini" class="puu-input" v-model="params.prisonerName" placeholder="请输入姓名/编号" clearable></el-input>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" class="search-btn" @click="doQuery()">查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" class="search-btn" @click="clear()">清空</el-button>
        </el-col>
      </el-row>
    </section>
    <section class="puu-items">
      <el-table :data="ppuTableDatas" stripe style="width: 100%;">
        <el-table-column prop="startTime"    label="预警开始时间" min-width="170px"></el-table-column>
        <el-table-column prop="endTime"      label="预警结束时间" min-width="170px"></el-table-column>
        <el-table-column prop="timeLen"      label="预警时长"     min-width="120px"  align="center"></el-table-column>
        <el-table-column prop="prisonerName" label="服刑人员姓名" min-width="120px"  align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="240" trigger="hover" @show="showPrisoner()">
              <el-row style="margin-bottom: 0px;">
                <el-col :span="11">
                  <div class="puu-item-popover"><span>姓名：</span>{{ prisonerInfo.prisonerName }}</div>
                  <div class="puu-item-popover"><span>编码：</span>{{ prisonerInfo.prisonerNum }}</div>
                  <div class="puu-item-popover"><span>性别：</span>{{ prisonerInfo.sex }}</div>
                  <div class="puu-item-popover"><span>年龄：</span>{{ prisonerInfo.age }} 岁</div>
                  <div class="puu-item-popover"><span>监舍：</span>{{ prisonerInfo.room }}</div>
                  <div class="puu-item-popover"><span>互监组：</span>{{ prisonerInfo.group }}</div>
                </el-col>
                <el-col :span="13"><img src="@/assets/pp-p.png" style="width:140px; height:90px;"></el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover"><span>服刑类型：</span>{{ prisonerInfo.prisonerType }}</div>
                  <div class="puu-item-popover"><span>被预警次数：</span>{{ prisonerInfo.count }} 次</div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover"><span>入狱罪行：</span>{{ prisonerInfo.crime }}</div>
                  <div class="puu-item-popover"><span>服刑日期：</span>{{ prisonerInfo.crimeTime }}</div>
                </el-col>
              </el-row>
              <div style="color: #59c4ee" slot="reference">{{ scope.row.prisonerName }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="prisonerNum"  label="服刑人员编码"  min-width="120px" align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="240" trigger="hover" @show="showPrisoner()">
              <el-row style="margin-bottom: 0px;">
                <el-col :span="11">
                  <div class="puu-item-popover"><span>姓名：</span>{{ prisonerInfo.prisonerName }}</div>
                  <div class="puu-item-popover"><span>编码：</span>{{ prisonerInfo.prisonerNum }}</div>
                  <div class="puu-item-popover"><span>性别：</span>{{ prisonerInfo.sex }}</div>
                  <div class="puu-item-popover"><span>年龄：</span>{{ prisonerInfo.age }} 岁</div>
                  <div class="puu-item-popover"><span>监舍：</span>{{ prisonerInfo.room }}</div>
                  <div class="puu-item-popover"><span>互监组：</span>{{ prisonerInfo.group }}</div>
                </el-col>
                <el-col :span="13"><img src="@/assets/pp-p.png" style="width:140px; height:90px;"></el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover"><span>服刑类型：</span>{{ prisonerInfo.prisonerType }}</div>
                  <div class="puu-item-popover"><span>被预警次数：</span>{{ prisonerInfo.count }} 次</div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover"><span>入狱罪行：</span>{{ prisonerInfo.crime }}</div>
                  <div class="puu-item-popover"><span>服刑日期：</span>{{ prisonerInfo.crimeTime }}</div>
                </el-col>
              </el-row>
              <div style="color: #59c4ee" slot="reference">{{ scope.row.prisonerNum }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="prisonerType" label="服刑人员类型"  min-width="120px" align="center"></el-table-column>
        <el-table-column prop="warningType"  label="预警事件类型"  min-width="120px" align="center"></el-table-column>
        <el-table-column prop="warningArea"  label="预警所在区域"  min-width="170px"></el-table-column>
        <el-table-column label="预警视频" fixed="right" width="120px" align="center">
          <template slot-scope="scope">
            <el-button style="padding: 0px 15px;" @click="showVideo(scope.$index, scope.row)" size="mini" type="text">
              <img :src="images.video" style="display: inline-block; line-height: 20px; vertical-align: middle;">
              <span style="display: inline-block; line-height: 20px; vertical-align: middle;">查看</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-pagination-wrap text-center">
        <table-pagination :total="count" @change="changeCurrent"></table-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import video from '@/assets/video.png';
  import tablePagination from '@/components/commons/tablePage.vue';

  export default {
    name: 'posunusual',
    data() {
      return {
        params: {
          startTime: new Date(new Date().setHours(0, 0, 0, 0)),
          endTime: new Date(new Date().setHours(24, 0, 0, 0)),
          warningType: "",
          prisonerType: "",
          prisonerName: ""
        },
        images: {
          video: video
        },
        count: 0,
        prisonerInfo: {},
        warningTypes: [],
        prisonerTypes: [],
        ppuTableDatas: []
      }
    },
    methods: {
      doQuery: function () {
        
      },
      clear: function () {
        this.params = {
          startTime: new Date(new Date().setHours(0, 0, 0, 0)),
          endTime: new Date(new Date().setHours(24, 0, 0, 0)),
          warningType: "0",
          prisonerType: "0",
          prisonerName: ""
        }
      },
      changeCurrent: function () {
        alert("分页");
      },
      showVideo: function (index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      },
      showPrisoner: function (page) {
        var _this = this;
        this.$ajxj.get('/getPrisonerInfo',{page:page}).then(function (respnose) {
          _this.prisonerInfo = respnose.data;
        }).catch(function (error) {}).then(function (error) {
          console.log(error);
        });
      }
    },
    mounted() {
      var _this = this;
      // 获取表格数据
      this.$ajxj.post('/getPosunusualItems').then(function (respnose) {
        _this.ppuTableDatas = respnose.data.items;
        _this.count = respnose.data.totalRows;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });

      this.$ajxj.get('/getWarningTypes').then(function (respnose) {
        _this.warningTypes = respnose.data;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });

      this.$ajxj.get('/getPrisonerTypes').then(function (respnose) {
        _this.prisonerTypes = respnose.data;
      }).catch(function (error) {}).then(function (error) {
        console.log(error);
      });
    },
    components: {
      tablePagination
    }
  }
</script>

<style scoped>
  .el-select {
    width: 55%;
  }

  .puu-input {
    width: 45%;
  }

  .puu-item-popover {
    font-size: 12px;
  }

  .el-pagination {
    text-align: right;
  }

  .puu-params-label {
    font-size: 14px;
  }

  .puu-params {
    background-color: #f3f6f8;
    position: fixed;
    top: 60px;
    z-index: 666;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }

  .puu-items {
    position: absolute;
    top: 120px;
    left: 0px;
    right: 0px
  }
</style>