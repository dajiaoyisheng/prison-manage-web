<template>
  <div id="posunusual">
    <el-row :gutter="10">
      <el-col :span="7">
        <span class="block">
          <span class="demonstration">时间</span>
          <el-date-picker size="mini" v-model="params.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
          <span>-</span>
          <el-date-picker size="mini" v-model="params.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </span>
      </el-col>
      <el-col :span="5">
        <span>预警事件类型:</span>
        <el-select size="small" v-model="params.warningType" placeholder="请选择">
          <el-option v-for="item in warningTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span>服刑人员类型:</span>
        <el-select size="small" v-model="params.prisonerType" placeholder="请选择">
          <el-option v-for="item in prisonerTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span>服刑人员姓名/编号:</span>
        <el-input size="small" class="pp-input" v-model="params.prisonerName" placeholder="请输入" clearable></el-input>
      </el-col>
      <el-col :span="1">
        <el-button size="small" type="primary" @click="filter()">查询</el-button>
      </el-col>
      <el-col :span="1">
        <el-button size="small" type="primary" @click="clear()">清空</el-button>
      </el-col>
    </el-row>
    <section class="puu-items">
      <el-table :data="ppuTableDatas" border stripe style="width: 100%;" height="800">
        <el-table-column prop="startTime" label="预警开始时间"></el-table-column>
        <el-table-column prop="endTime" label="预警结束时间"></el-table-column>
        <el-table-column prop="timeLen" label="预警时长"></el-table-column>
        <el-table-column prop="prisonerName" label="服刑人员姓名">
          <template slot-scope="scope">
            <el-popover placement="bottom-start" width="240" trigger="hover" @show="showPrisoner()">
              <el-row>
                <el-col :span="10">
                  <div class="puu-item-popover">
                    <span>姓名：</span>{{prisonerInfo.prisonerName}}
                  </div>
                  <div class="puu-item-popover">
                    <span>编码：</span>{{prisonerInfo.prisonerNum}}
                  </div>
                  <div class="puu-item-popover">
                    <span>性别：</span>{{prisonerInfo.sex}}
                  </div>
                  <div class="puu-item-popover">
                    <span>年龄：</span>{{prisonerInfo.age}} 岁 </div>
                  <div class="puu-item-popover">
                    <span>监舍：</span>{{prisonerInfo.room}}
                  </div>
                  <div class="puu-item-popover">
                    <span>互监组：</span>{{prisonerInfo.group}}
                  </div>
                </el-col>
                <el-col :span="14">
                  <img src="@/assets/pp-p.png" style="width:140px; height:90px;">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover">
                    <span>服刑类型：</span>{{prisonerInfo.prisonerType}}
                  </div>
                  <div class="puu-item-popover">
                    <span>被预警次数：</span>{{prisonerInfo.count}} 次 </div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover">
                    <span>入狱罪行：</span>{{prisonerInfo.crime}}
                  </div>
                  <div class="puu-item-popover">
                    <span>服刑日期：</span>{{prisonerInfo.crimeTime}}
                  </div>
                </el-col>
              </el-row>
              <div slot="reference">{{scope.row.prisonerName}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="prisonerNum" label="服刑人员编码">
          <template slot-scope="scope">
            <el-popover placement="bottom-start" width="240" trigger="hover" @show="showPrisoner()">
              <el-row>
                <el-col :span="10">
                  <div class="puu-item-popover">
                    <span>姓名：</span>{{prisonerInfo.prisonerName}}
                  </div>
                  <div class="puu-item-popover">
                    <span>编码：</span>{{prisonerInfo.prisonerNum}}
                  </div>
                  <div class="puu-item-popover">
                    <span>性别：</span>{{prisonerInfo.sex}}
                  </div>
                  <div class="puu-item-popover">
                    <span>年龄：</span>{{prisonerInfo.age}} 岁 </div>
                  <div class="puu-item-popover">
                    <span>监舍：</span>{{prisonerInfo.room}}
                  </div>
                  <div class="puu-item-popover">
                    <span>互监组：</span>{{prisonerInfo.group}}
                  </div>
                </el-col>
                <el-col :span="14">
                  <img src="@/assets/pp-p.png" style="width:140px; height:90px;">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover">
                    <span>服刑类型：</span>{{prisonerInfo.prisonerType}}
                  </div>
                  <div class="puu-item-popover">
                    <span>被预警次数：</span>{{prisonerInfo.count}} 次 </div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover">
                    <span>入狱罪行：</span>{{prisonerInfo.crime}}
                  </div>
                  <div class="puu-item-popover">
                    <span>服刑日期：</span>{{prisonerInfo.crimeTime}}
                  </div>
                </el-col>
              </el-row>
              <div slot="reference">{{scope.row.prisonerNum}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="prisonerType" label="服刑人员类型"></el-table-column>
        <el-table-column prop="warningType" label="预警事件类型"></el-table-column>
        <el-table-column prop="warningArea" label="预警所在区域"></el-table-column>
        <el-table-column label="预警视频" fixed="right">
          <template slot-scope="scope">
            <el-button @click="showVideo(scope.$index, scope.row)" size="mini">点击查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next, jumper" @current-change="changeCurrent()" :page-size="pagination.pageSize"
        :total="pagination.totalRows" :current-page.sync="pagination.currentPage"></el-pagination>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'posunusual',
    data() {
      return {
        params: {
          startTime: '',
          endTime: '',
          warningType: "0",
          prisonerType: "0",
          prisonerName: ""
        },
        pagination: {
          pageSize: 10,
          currentPage: 1,
          totalRows: 100
        },
        prisonerInfo: {},
        warningTypes: [],
        prisonerTypes: [],
        ppuTableDatas: []
      }
    },
    methods: {
      filter: function () {
        // this.$message("开始时间：" + this.params.startTime); 
        // alert("时期：" + this.params.period);
        // alert("预警事件类型：" + this.params.warningType);
        // alert("服刑人员类型：" + this.params.prisonerType);
        // alert("服刑人员姓名：" + this.params.prisonerName);
      },
      clear: function () {
        this.params = {
          startTime: '',
          endTime: '',
          warningType: "",
          prisonerType: "",
          prisonerName: ""
        }
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
      var _this = this; // 获取预警事件类型字典
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
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 41%;
  }

  .el-select {
    width: 55%;
  }

  .pp-input.el-input {
    width: 40%;
  }

  .puu-item-popover {
    font-size: 12px;
  }

</style>
