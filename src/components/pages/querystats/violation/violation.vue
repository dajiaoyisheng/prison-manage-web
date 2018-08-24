<template>
  <div class="w1200">
    <section>
      <section class="pp-r-t q-v-t filter-wrap">
        <section>
          <el-row :gutter="20">
            <el-col :span="9">
              <span class="block">
                <span class="demonstration">时间</span>
                <el-date-picker size="mini" v-model="parame.startTime" type="datetime" placeholder="选择开始时间">
                </el-date-picker>
                <span>-</span>
                <el-date-picker size="mini" v-model="parame.endTime" type="datetime" placeholder="选择结束时间">
                </el-date-picker>
              </span>
            </el-col>
            <el-col :span="5">
              <span>预警事件类型：</span>
              <el-select size="small" v-model="parame.warningType" placeholder="请选择">
                <el-option v-for="item in warningType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <span>服刑人员姓名/编码：</span>
              <el-input size="small" class="pp-input" v-model="parame.prisonerName" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="3">
              <el-button @click="search" class="search-btn" size="small">查询</el-button>
              <el-button @click="clearFilter" class="return-btn" size="small">返回</el-button>
            </el-col>
          </el-row>
        </section>
      </section>
      <section class="el-table-wrap clearfix">
        <el-table :data="ppuTableDatas" style="width: 100%">
          <el-table-column prop="startTime" label="预警开始时间">
          </el-table-column>
          <el-table-column prop="endTime" label="预警结束时间">
          </el-table-column>
          <el-table-column prop="timeLen" label="预警时长">
          </el-table-column>
          <el-table-column prop="prisonerName" label="预警事件对象">
          </el-table-column>
          <el-table-column prop="warningType" label="预警事件类型">
          </el-table-column>
          <el-table-column prop="warningArea" label="预警所在区域">
          </el-table-column>
          <el-table-column prop="warningRule" label="预警规则">
          </el-table-column>
          <el-table-column prop="warningTv" label="预警视频">
            <template slot-scope="scope">
              <div class="operating">
                <router-link tag="span" to="/systemset/prisonermanagement/operation">
                  <img :src="images.review" alt=""> 查看
                </router-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination-wrap fr">
          <el-pagination background layout="prev, pager, next, jumper" @current-change="changeCurrent()" :page-size="pagination.pageSize"
            :total="pagination.totalRows" :current-page.sync="pagination.currentPage">
          </el-pagination>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import review from '@/assets/review.png';
  export default {
    name: 'violation',
    data() {
      return {
        ppuTableDatas: [],
        images: {
          review: review
        },
        parame: {
          startTime: '',
          endTime: '',
          warningType: '',
          prisonerName: '',
        },
        warningType: [],
        // 时间筛选
        // pickerOptions2: {
        //   shortcuts: [{
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近一个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近三个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }]
        // },
        pagination: {
          pageSize: 10,
          currentPage: 1,
          totalRows: 100
        },
        value: '',
        // 服刑人员类型
        input: '',
      }
    },
    mounted() {
      this.getWarningType();
      this.getTableDatas();
    },
    methods: {
      // 获取表格数据
      getTableDatas(page) {
        let _this = this;
        this.parame = {
          "page": page || 1,
          "startTime": this.parame.startTime,
          "endTime": this.parame.endTime,
          "warningType": this.parame.warningType,
          "prisonerName": this.parame.prisonerName,
        }
        this.$ajxj.post('/getPosunusualItems', this.parame).then(function (respnose) {
          console.log('respnose',respnose);
          _this.ppuTableDatas = respnose.data.items;
          _this.pagination.totalRows = respnose.data.totalRows;
        }).catch(function (error) {
          console.log(error);
        }).then(function (error) {
          console.log(error);
        });
      },
      // 获取警告类型
      getWarningType() {
        let _this = this;
        this.$ajxj.post('/getPosunusualItems').then(function (respnose) {
          respnose.data = [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }];
          _this.warningType = respnose.data;
        }).catch(function (error) {
          console.log(error);
        }).then(function (error) {
          console.log(error);
        });
      },

      // 搜索
      search() {
        this.getTableDatas();
      },
      clearFilter() {
        this.parame = {
          startTime: '',
          endTime: '',
          warningType: '',
          prisonerName: ''
        };
        this.getTableDatas();
      },
      changeCurrent: function () {
        this.getTableDatas(this.pagination.currentPage);
      },
    }
  }

</script>
<style>
  /* .q-v-t {
    height: 70px;
    line-height: 70px;
  } */

  .q-v-t .el-date-editor.el-input,
  .q-v-t .el-date-editor.el-input__inner {
    width: 40%;
  }

  .q-v-t section {
    display: inline-block;
    margin-right: 1%;
  }

  .q-v-t .el-select,
  .q-v-t .pp-input {
    width: 49%;
  }

</style>
