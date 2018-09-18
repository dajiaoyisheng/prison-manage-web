<template>
    <div id="holidyDialog">
        <div id="tip">
          <span>请在表格中设置日期类型</span>
        </div>
        <!-- 日历 -->
        <vue-event-calendar
            :events="demoEvents"
            :feedbackDay="feedbackDay"
            @day-changed="handleDayChanged"
            @month-changed="handleMonthChanged">
        </vue-event-calendar>
        <!-- 图例 -->
        <div class="legend">
          <div class="title">图例</div>
          <div id="d1">
            <span id="s1"></span>
            <span>节假日</span>
          </div>
          <div id="d2">
            <span id="s2"></span>
            <span>非工作日</span>
          </div>
          <div id="d3">
            <span id="s3"></span>
            <span>工作日</span>
          </div>
        </div>
        <!-- 操作 -->
        <div class="action">
          <span @click="addRow" class="pointer"><i class="el-icon-circle-plus-outline"></i>添加</span>
        </div>
        <!-- 表格 -->
        <div class="events-table">
          <div class="grid-head">
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>日期类型</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="grid-body">
            <table>
              <tbody>
                <tr v-for="(event, index) in showEvents" :key="index">
                  <td @click="cellClick(index, 'title')">
                    <el-input size="mini" v-model="event.title" autofocus="true" placeholder="输入名称" v-if="seen==('title'+index)" @blur="seen=null" ></el-input>
                    <span style="margin-left: 10px" v-else>{{ event.title }}</span>
                  </td>
                  <td @click="cellClick(index, 'beginDate')">
                    <el-date-picker size="mini" v-model="event.beginDate" type="date" placeholder="选择开始时间" v-if="seen==('beginDate'+index)" @blur="seen=null" format="yyyy/MM/dd" value-format="yyyy/MM/dd"></el-date-picker>
                    <span style="margin-left: 10px" v-else>{{ event.beginDate }}</span>
                  </td>
                  <td @click="cellClick(index, 'endDate')">
                    <el-date-picker size="mini" v-model="event.endDate" type="date" placeholder="选择结束时间" v-if="seen==('endDate'+index)" @blur="seen=null" format="yyyy/MM/dd" value-format="yyyy/MM/dd"></el-date-picker>
                    <span style="margin-left: 10px" v-else>{{ event.endDate }}</span>
                  </td>
                  <td>
                    <el-select size="mini" v-model="event.type" placeholder="请选择日期类型">
                      <el-option :label="'节假日'" :value="2"></el-option>
                      <el-option :label="'非工作日'" :value="1"></el-option>
                    </el-select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <!-- 底部按钮 -->
      <div id="buttons">
        <button class="ok">确定</button>
        <button class="can">取消</button>
      </div>
    </div>
</template>

<script>
    import Vue from 'Vue';
    import holiday from './2018Holiday.js';
    import { isBeginEndDate, dateTimeFormatter } from "../../../commons/vue-event-calendar/tools.js";
    
    export default {
        data() {
            return {
                seen: null,
                message: "节假日管理",
                tableData: [],
                demoEvents: holiday,
                feedbackDay: {},
                clickDate: null,
                clickDateEvent: {},
            }
        },
        computed: {
          showEvents () {
            if (!this.clickDate || !this.clickDayEvent) {
              return this.demoEvents;
            }
            return isBeginEndDate(this.clickDate, this.clickDayEvent.beginDate, this.clickDayEvent.endDate) ? [this.clickDayEvent]:this.demoEvents;
          }
        },
        methods: {
            cellClick(index, key) {
              this.seen = key + index;
            },
            getTypeText(type) {
              let map = {
                '1': '非工作日',
                '2': '节假日'
              }
              return map[type];
            },
            handleItemClick(event) {
              this.feedbackDay = event;
            },
            handleDayChanged(data) {
              this.clickDate = data.date;
              this.clickDayEvent = data.event;
            },
            handleMonthChanged(data) {

            },
            initTableData: function() {
                var _this = this;
                this.$ajxj.get('/getHolidayDates').then(function (respnose) {
                    _this.tableData = respnose.data;
                }).catch(function (error) {
                }).then(function () {
                    //console.log(error);
                });
            },
            addRow: function() {
                var newRow = {
                    title: '名称',
                    beginDate: dateTimeFormatter(new Date(), 'yyyy/MM/dd'),
                    endDate: dateTimeFormatter(new Date(), 'yyyy/MM/dd'),
                    type: 2
                }
                this.demoEvents.unshift(newRow);
            },
            deleteRow: function(index, row) {
                this.tableData.splice(index, 1);
            },
            save: function() {
                alert("成功保存:" + this.tableData.length + "条");
            }
        },
        mounted() {
            this.initTableData();
        },
        props: ['dateTypes']
    }
</script>

<style>
    #holidyDialog {
      /* width: 600px;
      height: 720px; */
    }

    .el-dialog__body {
        padding: 0px 20px;
    }

    #tip {
      line-height: 14px;
      margin-bottom: 18px;
    }

    #tip > span{
      width:196px;
      height:14px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:#666666;
      line-height:25px;
    }

    .action {
      line-height: 14px;
      margin: 0 0 20px;
    }

    .el-dialog__header {
      padding: 0;
      height: 54px;
      line-height: 54px;
    }

    .el-dialog__header > .el-dialog__title {
        padding: 20px;
        width:70px;
        height:14px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(89,196,238,1);
        line-height:25px;
    }

    .legend {
      margin-left: 24px;
      display: inline-block;
    }

    .legend > .title {
      color: #59C4EE;
      margin-bottom: 16px;
    }

    .legend > div {
      height: 16px;
    }

    .legend > div > span{
      width:40px;
      height:14px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:#666666;
      line-height:25px;
    }

    .legend #s1 {
      height: 15px;
      width: 15px;
      background: #FFF1EF;
      border: 1px solid #AAA;
      display: inline-block;
    }

    .legend #s2 {
      height: 15px;
      width: 15px;
      background: #EEF9FD;
      border: 1px solid #AAA;
      display: inline-block;
    }

    .legend #s3 {
      height: 15px;
      width: 15px;
      background: #FFF;
      border: 1px solid #AAA;
      display: inline-block;
    }

    .legend #d1 {
      margin-bottom: 13px;
    }

    .legend #d2 {
      margin-bottom: 12px;
    }

    .events-table {
      width: 569px;
    }

    .events-table table {
      width:569px;
      /* height:246px; */
      border: 1px solid #E0E3EC;
    }

    .events-table > .grid-head > table > thead > tr > th{
      width:42px;
      height:13px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:#333333;
      line-height:25px;
      text-align: center;
    }

    .events-table > .grid-body {
      overflow-x: hidden;
      width: 569px;
      height: 240px;
    }

    .events-table > .grid-body > table > tbody > tr{
      width:40px;
      line-height: 42px;
    }

    .events-table > .grid-body > table > tbody > tr > td{
      width:70px;
      height:12px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:#666666;
      line-height:25px;
      text-align: center;
    }

    .events-table > .grid-body > table > tbody > tr > td > .el-date-editor.el-input {
      width: 132px;
    }

    .events-table > .grid-body > table > tbody > tr > td > .el-select{
      width: 104px;
    }

    #buttons {
      margin-top: 20px;
      padding: 0;
      line-height: 20px;
      text-align: right;
      width: 570px;
    }

    #buttons > button {
      width: 80px;
      height: 30px;
      border-radius:2px;
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      line-height:15px;
    }

    #buttons > .ok {
      background: #59C4EE;
      color:#FFFFFF;
    }

    #buttons > .can {
      background: #FFFFFF;
      color:#59C4EE;
      border:1px solid #59C4EE;
    }
</style>