<template>
  <div id="calendarmanagement" class="w1200">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="21" class="cal-header-title"><span>日历管理</span></el-col>
          <el-col :span="3" class="cal-header-toolbar">
            <el-button type="primary" size="mini" class="search-btn" @click="isShowHolidyDialog=true">节假日管理</el-button>
            <el-dialog title="节假日管理" :visible.sync="isShowHolidyDialog" width="600px" :before-close="holidyDialogClose">
              <v-holidyDialog :dateTypes='dateTypes' ref="holidyDialog" @ope-holidyDialog="listenMsgFromeChild"></v-holidyDialog>
            </el-dialog>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <section class="cal-main-params">
          <span>时间:</span>
          <el-time-picker v-if="tabId=='tab-0'" v-model="params.rangeTime" range-separator="至" size="mini" style="width:16.5%; margin:0px 15px 0px 5px;" is-range></el-time-picker>
          <el-date-picker v-if="tabId=='tab-1'" v-model="params.rangeDate" range-separator="至" size="mini" style="width:18%; margin:0px 0px 0px 0px;" type="daterange"></el-date-picker>
          <span>日期类型:</span>
          <el-select size="mini" v-model="params.psDatetype" placeholder="请选择">
            <el-option v-for="item in dateTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <span>动作:</span>
          <el-select size="mini" v-model="params.psAlerttype" placeholder="请选择">
            <el-option v-for="item in options" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <span>规则类型:</span>
          <el-select size="mini" v-model="params.ruleType" placeholder="请选择">
            <el-option v-for="item in ruleTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <el-button size="mini" type="primary" class="search-btn" @click="query()">查询</el-button>
          <el-button size="mini" type="primary" class="search-btn" @click="clear()">清空</el-button>
        </section>
        <section class="cal-main-content">
          <el-tabs type="border-card" @tab-click="changeTabs">
            <el-tab-pane label="日常作息时间">
              <el-row style="line-height: 30px;">
                <el-col :span="2" :offset="22">
                  <el-button title="增加作息" type="text" icon="el-icon-circle-plus-outline" @click="addDialogInit">增加作息</el-button>
                  <el-dialog title="增加作息" :visible.sync="addDialog" width="800px" :before-close="addDialogClose">
                    <v-addDialog :dateTypes="dateTypes" :options="options" :ruleTypes="ruleTypes" ref="addDialog"></v-addDialog>
                  </el-dialog>
                </el-col>
              </el-row>
              <el-table :data="dailyDates" stripe style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item style="width: 65%;"  label="区域："><span>{{ props.row.psArea }}</span></el-form-item>
                      <el-form-item style="width: 25%;"  label="日期类型："><span>{{ props.row.psDatetype }}</span></el-form-item>
                      <el-form-item style="width: 90%;"  label="适用范围："><span>{{ props.row.psPersonrange }}</span></el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="psStarttime"   label="开始时间"></el-table-column>
                <el-table-column prop="psEndtime"     label="结束时间"></el-table-column>
                <el-table-column label="时长">
                  <template slot-scope="scope">{{ scope.row.psDuration }}小时</template>
                </el-table-column>
                <el-table-column prop="psMatter"      label="事项"></el-table-column>
                <el-table-column prop="psAlerttype"   label="动作"></el-table-column>
                <el-table-column prop="ruleType"      label="规则类型"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click.native.prevent="deleteDailyDate(scope.$index, scope.row)" type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="el-pagination-wrap text-center">
                <v-tablePagination :total="pagination.totalRows" @change="query" ref="dailyPagination"></v-tablePagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="特殊人员作息时间">
              <el-row style="line-height: 30px;">
                <el-col :span="1" :offset="23">
                  <el-button title="刷新" type="text" icon="el-icon-refresh" @click="getSpecialDates()">刷新</el-button>
                </el-col>
              </el-row>
              <el-table :data="specialDates" stripe style="width: 100%">
                <el-table-column prop="psStarttime"   label="开始时间"  width="100"></el-table-column>
                <el-table-column prop="psEndtime"     label="结束时间"  width="100"></el-table-column>
                <el-table-column prop="psDatetype"    label="日期类型"></el-table-column>
                <el-table-column prop="psDuration"    label="时长"      width="120"></el-table-column>
                <el-table-column prop="psMatter"      label="事项"      width="100"></el-table-column>
                <el-table-column prop="psArea"        label="区域"      width="100"></el-table-column>
                <el-table-column prop="psAlerttype"   label="动作"      width="100"></el-table-column>
                <el-table-column prop="psPersonrange" label="适用范围"></el-table-column>
              </el-table>
              <div class="el-pagination-wrap text-center">
                <v-tablePagination :total="pagination.totalRows" @change="query" ref="specialPagination"></v-tablePagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import addDialog from './addDialog';
  import holidyDialog from './holidyDialog';
  import tablePagination from '@/components/commons/tablePage.vue';

  export default {
    data() {
      return {
        tabId: "tab-0",               // 默认页签标识
        addDialog: false,             // 弹出增加窗口
        isShowHolidyDialog: false,    // 弹出节日窗口
        options: [],                  // 动作类型字典
        dateTypes: [],                // 日期类型字典
        ruleTypes: [],                // 规则类型字典
        dailyDates: [],               // 日常作息列表
        specialDates: [],             // 特殊作息列表
        pagination: { totalRows: 0 }, // 记录总共条数
        params: {
          ruleType: "",
          psDatetype: "",
          psAlerttype: "",
          rangeDate: [new Date(), new Date()],
          rangeTime: [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]
        }
      }
    },
    methods: {
      /** 获取动作字典 */
      getOptions: function () {
        this.$get(this.urlconfig.scmGetOptions).then((res) => {
          if (res.status === 0) {
            this.options = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取日期类型 */
      getDateTypes: function () {
        this.$get(this.urlconfig.scmGetDateTypes).then((res) => {
          if (res.status === 0) {
            this.dateTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取规则类型 */
      getRuleTypes: function() {
        this.$get(this.urlconfig.scmGetRuleTypes).then((res) => {
          if (res.status === 0) {
            this.ruleTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 获取日常作息时间列表 */
      getDailyDates: function () {
        let data = {
          "params": JSON.stringify(this.params),
          "pageSize": this.$refs.dailyPagination.limit,
          "pageIndex": this.$refs.dailyPagination.index
        }
        this.$post(this.urlconfig.scmGetDailyDates, data).then((res) => {
          if (res.status === 0) {
            this.dailyDates = res.data.items;
            this.pagination.totalRows = res.data.totalRows;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 获取特殊人员作息时间 */
      getSpecialDates: function () {
        let data = {
          "params": JSON.stringify(this.params),
          "pageSize": this.$refs.specialPagination.limit,
          "pageIndex": this.$refs.specialPagination.index
        }
        this.$post(this.urlconfig.scmGetSpecialDates, data).then((res) => {
          if (res.status === 0) {
            this.specialDates = res.data.items;
            this.pagination.totalRows = res.data.totalRows;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 根据条件查询作息列表 */
      query: function () {
        if (this.tabId == 'tab-0') {
          this.getDailyDates();
        } else if (this.tabId == 'tab-1') {
          this.getSpecialDates();
        }
      },
      /** 切换页签操作 */
      changeTabs: function (tab, event) {
        this.clear();
        this.tabId = event.target.getAttribute('id');

        if (this.tabId == 'tab-0') {
          this.getDailyDates();
          this.$refs.dailyPagination.index = 1;
        } else if (this.tabId == 'tab-1') {
          this.getSpecialDates();
          this.$refs.specialPagination.index = 1;
        }
      },
      /** 删除作息时间 */
      deleteDailyDate: function (index, row) {
        this.$confirm('确认删除？').then(() => {
          let data = {
            "psId": row.psId
          };
          this.$post(this.urlconfig.scmDeleteDailyDate, data).then((res) => {
            if (res.status === 0) {
              this.query();
            }
          }).catch((error) => {
            console.log(error);
          }).then(() => {
            // todo somthing...
          });
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 新增窗口初始化 */
      addDialogInit: function() {
        this.addDialog = true;
        this.$nextTick(() => {
          this.$refs.addDialog.initQuery();
        });
      },
      /** 关闭增加作息窗口前操作 */
      addDialogClose: function (done) {
        this.$confirm('确认关闭？').then(() => {
          done();
          this.$refs.addDialog.resetForm('form');
          this.getDailyDates();
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 关闭节假日窗口前操作 */
      holidyDialogClose: function (done) {
        this.$confirm('确认关闭？').then(() => {
          done();
          // this.$refs.holidyDialog.initTableData();
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 重置查询条件 */
      clear: function () {
        this.params.rangeTime = [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)];
        this.params.rangeDate = [new Date(), new Date()];
        this.params.psAlerttype = "";
        this.params.psDatetype = "";
        this.params.ruleType = "";
      },
      /** 保存节假日管理弹层 */
      listenMsgFromeChild: function (type, data) {
        if (type === "save") {
          console.log("保存", data);
          this.isShowHolidyDialog = false;
        } else {
          console.log("取消", data);
          this.isShowHolidyDialog = false;
        }
      }
    },
    mounted() {
      this.getDateTypes();
      this.getRuleTypes();
      this.getOptions();
      this.getDailyDates();
    },
    components: {
      'v-addDialog': addDialog,
      'v-holidyDialog': holidyDialog,
      'v-tablePagination': tablePagination
    }
  }
</script>

<style scoped>
  .el-header {
    line-height: 60px;
  }

  .el-main {
    height: 100%;
    padding-top: 0px;
  }

  .el-row {
    line-height: 60px;
  }

  .cal-header-title {
    font-size: 18px;
    color: #59c4ee;
  }

  .cal-main-params {
    padding: 0 1%;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    font-size: 14px;
  }

  .cal-main-params .el-select {
    width: 8.7%;
    margin: 0px 15px 0px 5px;
  }

  .cal-main-params .pp-input {
    width: 9.5%;
    margin: 0px 15px 0px 5px;
  }

  .cal-header-toolbar {
    padding-left: 40px;
  }
</style>

<style>
  #calendarmanagement .el-tabs__header {
    padding: 0;
    position: relative;
  }

  #calendarmanagement .el-tabs__item {
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

  #calendarmanagement .el-dialog__body {
    padding: 10px 20px;
  }

  #calendarmanagement .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  #calendarmanagement .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
</style>