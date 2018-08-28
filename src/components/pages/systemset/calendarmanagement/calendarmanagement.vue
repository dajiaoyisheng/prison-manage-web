<template>
    <div id="calendarmanagement" class="w1200">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="22" class="cal-header-title"><span>日历管理</span></el-col>
                    <el-col :span="2" class="cal-header-toolbar">
                        <el-button type="primary" size="mini" @click="holidyDialog=true">节假日管理</el-button>
                        <el-dialog title="节假日管理" :visible.sync="holidyDialog" width="750px" :before-close="holidyDialogClose">
                            <v-holidyDialog :dateTypes='dateTypes' ref="holidyDialog"></v-holidyDialog>
                        </el-dialog>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <section class="cal-main-params">
                    <span>时间:</span>
                    <el-time-picker style="width: 16.5%; margin: 0px 15px 0px 5px;" is-range v-model="params.period" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
                    <span>日期类型:</span>
                    <el-select size="small" v-model="params.dateType" placeholder="请选择">
                        <el-option v-for="item in dateTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span>区域:</span>
                    <el-select size="small" v-model="params.area" placeholder="请选择">
                        <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span>动作:</span>
                    <el-select size="small" v-model="params.option" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <span>服刑人员姓名/编号:</span>
                    <el-input size="small" class="pp-input" v-model="params.prisonerName" placeholder="请输入" clearable></el-input>
                    <el-button size="small" type="primary" @click="query()">查询</el-button>
                    <el-button size="small" type="primary" @click="clear()">清空</el-button>
                </section>
                <section class="cal-main-content">
                    <el-tabs type="border-card" @tab-click="changeTabs">
                        <el-tab-pane label="日常作息时间">
                            <el-row style="line-height: 30px;">
                                <el-col :span="2" :offset="22">
                                    <el-button title="增加作息" type="text" icon="el-icon-circle-plus-outline" size="mini" @click="addDialog=true">增加作息</el-button>
                                    <el-dialog title="增加作息" :visible.sync="addDialog" width="670px" :before-close="addDialogClose">
                                        <v-addDialog :dateTypes="dateTypes" :options="options" :areas="areas" ref="addDialog"></v-addDialog>
                                    </el-dialog>
                                </el-col>
                            </el-row>
                            <el-table :data="dailyDates" stripe style="width: 100%" height=600>
                                <el-table-column prop="startTime"   label="开始时间"></el-table-column>
                                <el-table-column prop="endTime"     label="结束时间"></el-table-column>
                                <el-table-column prop="dateType"    label="日期类型"></el-table-column>
                                <el-table-column label="时长">
                                    <template slot-scope="scope">{{ scope.row.timeLen }}小时</template>
                                </el-table-column>
                                <el-table-column prop="item"        label="事项"></el-table-column>
                                <el-table-column prop="area"        label="区域"></el-table-column>
                                <el-table-column prop="option"      label="动作"></el-table-column>
                                <el-table-column prop="scene"       label="适用范围"></el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">移除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination background @current-change="changeCurrent()" layout="prev, pager, next, jumper"
                                :current-page.sync="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.totalRows"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="特殊人员作息时间">
                            <el-row style="line-height: 30px;">
                                <el-col :span="1" :offset="23">
                                    <el-button title="刷新" type="text" icon="el-icon-refresh" size="mini" @click="refreshTables()">刷新</el-button>
                                </el-col>
                            </el-row>
                            <el-table :data="specialDates" stripe style="width: 100%" height=600>
                                <el-table-column prop="startTime"   label="开始时间"    width="100"></el-table-column>
                                <el-table-column prop="endTime"     label="结束时间"    width="100"></el-table-column>
                                <el-table-column prop="dateType"    label="日期类型"></el-table-column>
                                <el-table-column prop="timeLen"     label="时长"        width="120"></el-table-column>
                                <el-table-column prop="item"        label="事项"        width="100"></el-table-column>
                                <el-table-column prop="area"        label="区域"        width="100"></el-table-column>
                                <el-table-column prop="option"      label="动作"        width="100"></el-table-column>
                                <el-table-column prop="scene"       label="适用范围"></el-table-column>
                            </el-table>
                            <el-pagination background @current-change="changeCurrent()" layout="prev, pager, next, jumper"
                                :current-page.sync="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.totalRows"></el-pagination>
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

    export default {
        data() {
            return {
                message: '日历管理',
                params: {
                    dateType : "1",
                    area : "1",
                    option : "1",
                    prisonerName : "",
                    period : [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]
                },
                pagination : {
                    pageSize : 10,
                    currentPage : 1,
                    totalRows : 100
                },
                dailyDates: [],
                specialDates: [],
                dateTypes: [],
                areas: [],
                options: [],
                holidyDialog: false,
                addDialog: false
            }
        },
        methods: {
            query : function() {
                alert("时期：" + this.params.period);
                alert("日期类型：" + this.params.dateType);
                alert("区域：" + this.params.area);
                alert("动作：" + this.params.option);
                alert("服刑人员姓名/编码：" + this.params.prisonerName);
            },
            clear : function() {
                this.params.period = [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)];
                this.params.dateType = "1";
                this.params.area = "1";
                this.params.option = "1";
                this.params.prisonerName = "";
            },
            changeTabs : function(tab, event) {
                var _this = this;
                let tabId = event.target.getAttribute('id');

                if (tabId == 'tab-0') {
                    this.pagination.currentPage = 1;
                    this.$ajxj.get('/getDailyDates').then(function (respnose) {
                        _this.dailyDates = respnose.data.items;
                        _this.pagination.totalRows = respnose.data.totalRows;
                    }).catch(function (error) {
                    }).then(function () {
                        console.log(error);
                    });
                } else if (tabId == 'tab-1') {
                    this.pagination.currentPage = 1;
                    this.$ajxj.get('/getSpecialDates').then(function (respnose) {
                        _this.specialDates = respnose.data.items;
                        _this.pagination.totalRows = respnose.data.totalRows;
                    }).catch(function (error) {
                    }).then(function () {
                        console.log(error);
                    });
                }
            },
            changeCurrent : function() {
                alert("当前第" + this.pagination.currentPage + "页");
            },
            holidyDialogClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.$refs.holidyDialog.initTableData();
                })
                .catch(_ => {});
            },
            addDialogClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    // 执行关闭，并清空表单元素
                    done();
                    this.$refs.addDialog.resetForm('form');

                    // 获取日常作息时间列表
                    this.$ajxj.get('/getDailyDates').then(function (respnose) {
                        _this.dailyDates = respnose.data.items;
                        _this.pagination.totalRows = respnose.data.totalRows;
                    }).catch(function (error) {
                    }).then(function () {
                    });
                })
                .catch(_ => {});
            },
            deleteRow(index, row) {
                this.dailyDates.splice(index, 1);
            },
            refreshTables : function() {
                alert("刷新作息时间");
            }
        },
        mounted() {
            // 获取日期类型
            var _this = this;
            this.$ajxj.get('/getDateTypes').then(function (respnose) {
                _this.dateTypes = respnose.data;
            }).catch(function (error) {
            }).then(function () {
            });

            // 获取区间字典
            this.$ajxj.get('/getAreas').then(function (respnose) {
                _this.areas = respnose.data;
            }).catch(function (error) {
            }).then(function () {
            });

            // 获取动作字典
            this.$ajxj.get('/getOptions').then(function (respnose) {
                _this.options = respnose.data;
            }).catch(function (error) {
            }).then(function () {
            });

            // 获取日常作息时间列表
            this.$ajxj.get('/getDailyDates').then(function (respnose) {
                _this.dailyDates = respnose.data.items;
                _this.pagination.totalRows = respnose.data.totalRows;
            }).catch(function (error) {
            }).then(function () {
            });
        },
        components: {
            'v-addDialog' : addDialog,
            'v-holidyDialog' : holidyDialog
        }
    }
</script>

<style scoped>
    .el-header {
        border-bottom: 1px solid #333;
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
        font-weight: bold;
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
</style>

<style>
    #calendarmanagement .el-dialog__body {
        padding: 10px 20px;
    }
</style>
