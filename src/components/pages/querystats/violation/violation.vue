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
              <el-select size="small" v-model="parame.warningEventType" placeholder="请选择">
                <el-option v-for="item in warningEventTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <span>服刑人员姓名/编码：</span>
              <el-input size="small" class="pp-input" v-model="parame.prisonerName" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="3">
              <el-button @click="search" class="search-btn" size="small">查询</el-button>
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
            <template slot-scope="scope">
              <router-link tag="a" class="pointer num-color" :to="{path:'/personnelposition',query:{name:scope.row.prisonerName}}">
                {{scope.row.prisonerName}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="warningEventType" label="预警事件类型">
          </el-table-column>
          <el-table-column prop="warningArea" label="预警所在区域">
          </el-table-column>
          <el-table-column prop="warningRule" label="预警规则">
          </el-table-column>
          <el-table-column prop="warningTv" label="预警视频">
            <template slot-scope="scope">
              <div class="operating">
                <router-link tag="span" to="/personnelposition">
                  <img class="v-align-m" :src="images.video" alt=""><span> 查看</span>
                </router-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination-wrap fr">
          <!-- <el-pagination background layout="prev, pager, next, jumper" @current-change="changeCurrent()" :page-size="pagination.pageSize"
            :total="pagination.totalRows" :current-page.sync="pagination.currentPage">
          </el-pagination> -->
          <table-pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></table-pagination>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import video from '@/assets/video.png';
  import tablePagination from '@/components/commons/tablePage.vue';
  export default {
    name: 'violation',
    components: {
      tablePagination
    },
    data() {
      return {
        pageSize: 10, //每页显示20条数据
        currentPage: 1, //当前页码
        count: 0, //总记录数

        ppuTableDatas: [],
        images: {
          video: video
        },
        parame: {
          startTime: new Date(new Date().setHours(0, 0, 0, 0)),
          endTime: new Date(new Date().setHours(24, 0, 0, 0)),
          warningEventType: '',
          prisonerName: '',
        },
        warningEventType: [],
        warningEventTypes: [],
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
    created: function () {
      this.getTableDatas();
    },
    mounted() {
      // 获取预警事件类型
	  let url = this.$store.state.env + "/violationWarning.action?method=getWarningEventTypes";
      this.$get(url).then((respnose) => {
        this.warningEventTypes = respnose.data;
      })
    },
    methods: {
      pageChange(page) {
        this.currentPage = page
        this.getTableDatas(page)
      },
      // 获取表格数据
      getTableDatas(page) {
      /*  this.parame = {
          "page": page || 1,
          "startTime": this.parame.startTime,
          "endTime": this.parame.endTime,
          "warningEventType": this.parame.warningEventType,
          "prisonerName": this.parame.prisonerName,
        } */
		 let data = {
          params: JSON.stringify(this.parame),
          pageIndex: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
        
		let url = this.$store.state.env + "/violationWarning.action?method=getViolationWarnings";
        this.$post(url, data).then((res) => {
          this.count = res.data.totalRows;
          this.ppuTableDatas = res.data.items;
          this.pagination.totalRows = res.data.totalRows;
        })
      },
      // 搜索
      search() {
        this.getTableDatas();
      },
      clearFilter() {
        this.parame = {
          startTime: '',
          endTime: '',
          warningEventType: '',
          prisonerName: ''
        };
        this.getTableDatas();
      },
      changeCurrent: function () {
        this.getTableDatas(this.pagination.currentPage);
      },
      warningPrisoner: function (index, row) {
        console.log('warningPrisoner', index, row)
      }
    }
  }

</script>
<style scoped>
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
