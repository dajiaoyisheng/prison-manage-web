<template>
  <div id="prewarningstats" class="w1200">
      <el-row>
        <el-col :span="6" :offset="18">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="今天"   name="today"></el-tab-pane>
            <el-tab-pane label="本周"   name="week"></el-tab-pane>
            <el-tab-pane label="本月"   name="month"></el-tab-pane>
            <el-tab-pane label="本季"   name="quarter"></el-tab-pane>
            <el-tab-pane label="本年"   name="year"></el-tab-pane>
            <el-tab-pane label="自定义" name="other">
              <span>时间：</span>
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-rolw>
        <el-col :span="12">
          <el-card class="box-card pws-card">
            <div slot="header" class="clearfix">
              <span>违规预警人员TOP10</span>
            </div>
            <div class="pws-card-first">
              <el-row>
                <el-col :span="12">
                  <ul class="pws-card-first-left">
                    <li v-for="(item, index) in list" :key="item" v-if="index < 5">
                      <span class="pws-card-first-label">NO.{{ index + 1 }}</span>
                      <span class="pws-card-first-name">{{ item.name }}</span>
                      <span class="pws-card-first-times">违规{{ item.times }}次</span>
                    </li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <ul class="pws-card-first-right">
                    <li v-for="(item, index) in list" :key="item" v-if="index > 4">
                      <span class="pws-card-first-label">NO.{{ index + 1 }}</span>
                      <span class="pws-card-first-name">{{ item.name }}</span>
                      <span class="pws-card-first-times">违规{{ item.times }}次</span>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card pws-card">
            <div slot="header" class="clearfix">
              <span>违规预警事件统计</span>
            </div>
            <div>
              <el-table :data="tableData" stripe style="width: 100%" height="240">
                <el-table-column prop="warningEvent" label="违规预警事件"></el-table-column>
                <el-table-column prop="warningTimes" label="预警次数"     width="150"></el-table-column>
                <el-table-column prop="warningCount" label="预警人数"     width="150"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-rolw>
      <el-rolw>
        <el-col :span="12">
          <el-card class="box-card pws-card">
            <div slot="header" class="clearfix">
              <span>监区排名（按预警数）</span>
            </div>
            <div>
              <template>
                <ve-bar :data="chartData" :settings="chartSettings" height="270px" :legend-visible="false"></ve-bar>
              </template>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card pws-card">
            <div slot="header" class="clearfix">
              <span>预警区域排名TOP5（按预警数）</span>
              <el-select size="mini" style="float: right; padding: 3px 0" v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div>
              <template>
                <ve-bar :data="chartData" :settings="chartSettings" height="270px" :legend-visible="false"></ve-bar>
              </template>
            </div>
          </el-card>
        </el-col>
      </el-rolw>
  </div>
</template>

<script>
  export default {
    name: 'prewarningstats',
    data() {
      return {
        message: '预警统计',
        activeTab: 'today',
        tableData: [{
            warningEvent: '服刑人员进入警戒区域',
            warningTimes: '18',
            warningCount: '25'
          }, {
            warningEvent: '服刑人员入错监舍',
            warningTimes: '15',
            warningCount: '14'
          }, {
            warningEvent: '特定区域长时间滞留',
            warningTimes: '11',
            warningCount: '11'
          }, {
            warningEvent: '未在指定时段进入特定区域',
            warningTimes: '5',
            warningCount: '12'
          }, {
            warningEvent: '未在指定时段进入特定区域',
            warningTimes: '5',
            warningCount: '12'
        }],
        list: [
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          },
          {
            name: '张三',
            times: '10'
          }
        ],
        chartData: {
          columns: ['区域', '预警次数'],
          rows: [
            { '区域': '监区一', '预警次数': 1393 },
            { '区域': '监区二', '预警次数': 3530 },
            { '区域': '监区三', '预警次数': 2923 },
            { '区域': '监区四', '预警次数': 1723 },
            { '区域': '监区五', '预警次数': 3792 }
          ]
        },
        chartSettings: {
          dataOrder: {
            label: '预警次数',
            order: 'desc'
          }
        }
      }
    },
    methods: {

    },
    mounted() {
      
    }
  }
</script>

<style scoped>
  .pws-card {
    height: 350px;
    margin: 5px 5px;
  }

  .pws-card span {
    line-height: 34px;
    display: inline-block;
    vertical-align: middle;
  }

  .pws-card-first {
    font-size: 14px;  
  }

  .pws-card-first li {
    margin: 10px 0px;
  }

  .pws-card-first-left {
    border-right: 1px solid #ebeef5; 
    margin-right: 10px; 
    padding: 0px 20px;
  }

  .pws-card-first-right {
    padding: 0px 10px;
  }

  .pws-card-first-label {
    width: 30%;
  }

  .pws-card-first-name {
    width: 30%;
  }

  .pws-card-first-times {
    width: 33%;
    text-align: center;

    color: #FF5809;
    border-radius: 5px;
    border: 1px solid #FF5809; 
  }
</style>

<style>
  #prewarningstats .el-card__header {
    padding: 10px 20px;
  }

  #prewarningstats .el-progress {
    line-height: 3;
  }

  #prewarningstats .pws-card-first-times {
    line-height: 25px;
  }
</style>