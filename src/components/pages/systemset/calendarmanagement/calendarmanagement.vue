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
          <el-time-picker v-if="this.tabId == 'tab-0'" size="mini" style="width: 16.5%; margin: 0px 15px 0px 5px;" is-range v-model="params.rangeTime"
                          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
          <el-date-picker v-if="this.tabId == 'tab-1'" size="mini" style="width: 18%; margin: 0px 0px 0px 0px;" type="daterange" v-model="params.rangeDate" 
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <span>日期类型:</span>
          <el-select size="mini" v-model="params.psDatetype" placeholder="请选择">
            <el-option v-for="item in dateTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <span>区域:</span>
          <el-select size="mini" v-model="params.psArea" placeholder="请选择">
            <el-option v-for="item in areas" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <span>动作:</span>
          <el-select size="mini" v-model="params.psAlerttype" placeholder="请选择">
            <el-option v-for="item in options" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
          <span>服刑人员姓名/编号:</span>
          <el-input size="mini" class="pp-input" v-model="params.psPersonrange" placeholder="请输入姓名或编号" clearable></el-input>
          <el-button size="mini" type="primary" class="search-btn" @click="query()">查询</el-button>
          <el-button size="mini" type="primary" class="search-btn" @click="clear()">清空</el-button>
        </section>
        <section class="cal-main-content">
          <el-tabs type="border-card" @tab-click="changeTabs">
            <el-tab-pane label="日常作息时间">
              <el-row style="line-height: 30px;">
                <el-col :span="2" :offset="22">
                  <el-button title="增加作息" type="text" icon="el-icon-circle-plus-outline" @click="addDialog=true">增加作息</el-button>
                  <el-dialog title="增加作息" :visible.sync="addDialog" width="670px" :before-close="addDialogClose">
                    <v-addDialog :dateTypes="dateTypes" :options="options" :areas="areas" :scopes="scopes" ref="addDialog"></v-addDialog>
                  </el-dialog>
                </el-col>
              </el-row>
              <el-table :data="dailyDates" stripe style="width: 100%">
                <el-table-column prop="psStarttime"   label="开始时间"></el-table-column>
                <el-table-column prop="psEndtime"     label="结束时间"></el-table-column>
                <el-table-column prop="psDatetype"    label="日期类型"></el-table-column>
                <el-table-column label="时长">
                  <template slot-scope="scope">{{ scope.row.psDuration }}小时</template>
                </el-table-column>
                <el-table-column prop="psMatter"      label="事项"></el-table-column>
                <el-table-column prop="psArea"        label="区域"></el-table-column>
                <el-table-column prop="psAlerttype"   label="动作"></el-table-column>
                <el-table-column prop="psPersonrange" label="适用范围"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click.native.prevent="deleteDailyDate(scope.$index, scope.row)"
                      type="text">删除</el-button>
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
                <el-table-column prop="psStarttime"     label="开始时间" width="100"></el-table-column>
                <el-table-column prop="psEndtime"       label="结束时间" width="100"></el-table-column>
                <el-table-column prop="psDatetype"      label="日期类型"></el-table-column>
                <el-table-column prop="psDuration"      label="时长" width="120"></el-table-column>
                <el-table-column prop="psMatter"        label="事项" width="100"></el-table-column>
                <el-table-column prop="psArea"          label="区域" width="100"></el-table-column>
                <el-table-column prop="psAlerttype"     label="动作" width="100"></el-table-column>
                <el-table-column prop="psPersonrange"   label="适用范围"></el-table-column>
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
        message: '日历管理',
        params: {
          psDatetype: "01",
          psArea: "01",
          psAlerttype: "01",
          psPersonrange: "",
          rangeTime: [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)],
          rangeDate: [new Date(), new Date()]
        },
        pagination: {
          totalRows: 100
        },
        tabId: "tab-0",
        dailyDates: [],
        specialDates: [],
        dateTypes: [],
        areas: [],
        options: [],
        scopes: [],
        isShowHolidyDialog: false,
        addDialog: false
      }
    },
    methods: {
      /** 获取日期类型 */
      getDateTypes: function() {
        let url = this.$store.state.env + "/systemCode.action?method=getDateType";
        this.$ajxj.get(url).then((respnose) => {
          this.dateTypes = respnose.data;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取区间字典 */
      getAreas: function() {
        let url = this.$store.state.env + "/systemCode.action?method=getAreaType";
        this.$ajxj.get(url).then((respnose) => {
          this.areas = respnose.data;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 获取动作字典 */
      getOptions: function() {
        let url = this.$store.state.env + "/systemCode.action?method=getActionType";
        this.$ajxj.get(url).then((respnose) => {
          this.options = respnose.data;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取适用范围字典 */
      getScopes: function() {
        let url = this.$store.state.env + "/systemCode.action?method=getPersonRange";
        this.$ajxj.get(url).then((respnose) => {
          this.scopes = respnose.data;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取日常作息时间列表 */
      getDailyDates: function() {
        let data = {
          "params": JSON.stringify(this.params),
          "pageSize": this.$refs.dailyPagination.limit,
          "pageIndex": this.$refs.dailyPagination.index
        }

        let url = this.$store.state.env + "/spriSchedule.action?method=getDailyDates";
        this.$ajxj.post(url, data).then((respnose) => {
          this.dailyDates = respnose.data.items;
          this.pagination.totalRows = respnose.data.totalRows;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 获取特殊人员作息时间 */
      getSpecialDates: function() {
        let data = {
          "params": JSON.stringify(this.params),
          "pageSize": this.$refs.specialPagination.limit,
          "pageIndex": this.$refs.specialPagination.index
        }

        let url = this.$store.state.env + "/spriSchedule.action?method=getSpecialDates";
        this.$ajxj.post(url, data).then((respnose) => {
          this.specialDates = respnose.data.items;
          this.pagination.totalRows = respnose.data.totalRows;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 根据条件查询作息列表 */
      query: function() {
        if (this.tabId == 'tab-0') {
          this.getDailyDates();
        } else if (this.tabId == 'tab-1') {
          this.getSpecialDates();
        }
      },
      /** 切换页签操作 */
      changeTabs: function(tab, event) {
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
      deleteDailyDate: function(index, row) {
        this.$confirm('确认删除？').then(() => {
          let data = {"psId" : row.psId};
          let url = this.$store.state.env + "/spriSchedule.action?method=deleteDailyDate";

          this.$ajxj.post(url, data).then((respnose) => {
            this.query();
          }).catch((error) => {
            console.log(error);
          }).then(() => {
            // todo somthing...
          });
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 关闭增加作息窗口前操作 */
      addDialogClose: function(done) {
        this.$confirm('确认关闭？').then(() => {
          done();
          this.$refs.addDialog.resetForm('form');
          this.getDailyDates();
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 关闭节假日窗口前操作 */
      holidyDialogClose: function(done) {
        this.$confirm('确认关闭？').then(() => {
          done();
          this.$refs.holidyDialog.initTableData();
        }).catch((error) => {
          console.log(error);
        });
      },
      /** 重置查询条件 */
      clear: function () {
        this.params.rangeTime = [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)];
        this.params.rangeDate = [new Date(), new Date()];
        this.params.psDatetype = "01";
        this.params.psArea = "01";
        this.params.psAlerttype = "01";
        this.params.psPersonrange = "";
      },
      listenMsgFromeChild: function(type, data) {
        if (type === "save") { //保存节假日管理弹层
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
      this.getAreas();
      this.getOptions();
      this.getScopes();
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
</style>