<template>
  <div id="posunusual">
    <section class="puu-params">
      <el-row style="margin: 0px 10px;">
        <el-col :span="8">
          <span>
            <span class="puu-params-label">时间:</span>
            <el-date-picker style="width: 43%" size="mini" v-model="params.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
            <span>-</span>
            <el-date-picker style="width: 43%" size="mini" v-model="params.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          </span>
        </el-col>
        <el-col :span="5">
          <span class="puu-params-label">事件类型:</span>
          <el-select size="mini" v-model="params.warningEventType" placeholder="请选择">
            <el-option v-for="item in warningEventTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span class="puu-params-label">人员类型:</span>
          <el-select size="mini" v-model="params.superviseType" placeholder="请选择">
            <el-option v-for="item in superviseTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span class="puu-params-label">人员姓名/编号:</span>
          <el-input size="mini" class="puu-input" v-model="params.prisonerName" placeholder="请输入姓名/编号" clearable></el-input>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" class="search-btn" @click="getPosunusualItems()">查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="primary" class="search-btn" @click="clear()">清空</el-button>
        </el-col>
      </el-row>
    </section>
    <section class="puu-items">
      <el-table :data="ppuTableDatas" stripe style="width: 100%;">
        <el-table-column label="预警开始时间" prop="startTime"         min-width="170px"></el-table-column>
        <el-table-column label="预警结束时间" prop="endTime"           min-width="170px"></el-table-column>
        <el-table-column label="预警时长"     prop="timeLen"           min-width="120px" align="center"></el-table-column>
        <el-table-column label="服刑人员姓名" prop="prisonerName"      min-width="120px"  align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="240" trigger="hover" @show="showPrisoner(scope.row)">
              <el-row style="margin-bottom: 0px;">
                <el-col :span="11">
                  <div class="puu-item-popover"><span>姓名：</span>{{ prisonerInfo.criName }}</div>
                  <div class="puu-item-popover"><span>编码：</span>{{ prisonerInfo.criCode }}</div>
                  <div class="puu-item-popover"><span>性别：</span>{{ prisonerInfo.criGender }}</div>
                  <div class="puu-item-popover"><span>年龄：</span>{{ prisonerInfo.age }} 岁</div>
                  <div class="puu-item-popover"><span>监舍：</span>{{ prisonerInfo.criPaiCode }}</div>
                  <div class="puu-item-popover"><span>互监组：</span>{{ prisonerInfo.group }}</div>
                </el-col>
                <el-col :span="13"><img src="@/assets/pp-p.png" style="width:140px; height:90px;"></el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover"><span>服刑类型：</span>{{ prisonerInfo.criSupervisetype }}</div>
                  <div class="puu-item-popover"><span>被预警次数：</span>{{ prisonerInfo.count }} 次</div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover"><span>入狱罪行：</span>{{ prisonerInfo.criAccusation }}</div>
                  <div class="puu-item-popover"><span>服刑日期：</span>{{ prisonerInfo.criStartdate }}</div>
                </el-col>
              </el-row>
              <div style="color: #59c4ee" slot="reference">{{ scope.row.prisonerName }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="服刑人员编码" prop="prisonerNum"       min-width="120px"  align="center">
          <template slot-scope="scope">
            <el-popover placement="top" width="240" trigger="hover" @show="showPrisoner(scope.row)">
              <el-row style="margin-bottom: 0px;">
                <el-col :span="11">
                  <div class="puu-item-popover"><span>姓名：</span>{{ prisonerInfo.criName }}</div>
                  <div class="puu-item-popover"><span>编码：</span>{{ prisonerInfo.criCode }}</div>
                  <div class="puu-item-popover"><span>性别：</span>{{ prisonerInfo.criGender }}</div>
                  <div class="puu-item-popover"><span>年龄：</span>{{ prisonerInfo.age }} 岁</div>
                  <div class="puu-item-popover"><span>监舍：</span>{{ prisonerInfo.criPaiCode }}</div>
                  <div class="puu-item-popover"><span>互监组：</span>{{ prisonerInfo.group }}</div>
                </el-col>
                <el-col :span="13"><img src="@/assets/pp-p.png" style="width:140px; height:90px;"></el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <div class="puu-item-popover"><span>服刑类型：</span>{{ prisonerInfo.criSupervisetype }}</div>
                  <div class="puu-item-popover"><span>被预警次数：</span>{{ prisonerInfo.count }} 次</div>
                </el-col>
                <el-col :span="13">
                  <div class="puu-item-popover"><span>入狱罪行：</span>{{ prisonerInfo.criAccusation }}</div>
                  <div class="puu-item-popover"><span>服刑日期：</span>{{ prisonerInfo.criStartdate }}</div>
                </el-col>
              </el-row>
              <div style="color: #59c4ee" slot="reference">{{ scope.row.prisonerNum }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="服刑人员类型" prop="prisonerType"      min-width="120px"  align="center"></el-table-column>
        <el-table-column label="预警事件类型" prop="warningEventType"  min-width="120px" align="center"></el-table-column>
        <el-table-column label="预警所在区域" prop="warningArea"       min-width="170px"></el-table-column>
        <el-table-column label="预警视频"    fixed="right"             width="120px"      align="center">
          <template slot-scope="scope">
            <el-button style="padding: 0px 15px;" @click="showVideo(scope.$index, scope.row)" size="mini" type="text">
              <img :src="images.video" style="display: inline-block; line-height: 20px; vertical-align: middle;">
              <span style="display: inline-block; line-height: 20px; vertical-align: middle;">查看</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-pagination-wrap text-center">
        <table-pagination :total="count" @change="changeCurrent" ref="posunusualPagination"></table-pagination>
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
          warningEventType: "",
          superviseType: "",
          prisonerName: ""
        },
        images: {
          video: video
        },
        count: 0,
        prisonerInfo: {},
        warningEventTypes: [],
        superviseTypes: [],
        ppuTableDatas: []
      }
    },
    methods: {
      /** 获取预警事件类型 */
      getWarningEventTypes: function () {
        this.$get(this.urlconfig.spmGetPositionWarningType).then((res) => {
          if (res.status === 0) {
            if ((res.data != null) && (res.data.length > 0)) {
              this.params.warningEventType = res.data[0].sCode
            }
            this.warningEventTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取服刑人员类型 */
      getSuperviseTypes: function () {
        this.$get(this.urlconfig.spmgetSuperviseType).then((res) => {
          if (res.status === 0) {
            if ((res.data != null) && (res.data.length > 0)) {
              this.params.superviseType = res.data[0].sCode
            }
            this.superviseTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 获取定位异常清单 */
      getPosunusualItems: function () {
        let data = {
          params: JSON.stringify(this.params),
          pageIndex: this.$refs.posunusualPagination.index,
          pageSize: this.$refs.posunusualPagination.pageSize
        }

        this.$post(this.urlconfig.qpwGetPosunusualItems, data).then((res) => {
          if (res.status === 0) {
            this.count = res.data.totalRows;
            this.ppuTableDatas = res.data.items;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 清空查询条件信息 */
      clear: function () {
        let wTypeTmp = "", sTypeTmp = "";
        if ((this.warningEventTypes != null) && (this.warningEventTypes.length > 0)) {
           wTypeTmp = this.warningEventTypes[0].sCode;
        }
        if ((this.superviseTypes != null) && (this.superviseTypes.length > 0)) {
           sTypeTmp = this.superviseTypes[0].sCode;
        }

        this.params = {
          startTime: new Date(new Date().setHours(0, 0, 0, 0)),
          endTime: new Date(new Date().setHours(24, 0, 0, 0)),
          warningEventType: wTypeTmp,
          superviseType: sTypeTmp,
          prisonerName: ""
        }
      },
      /** 查看预警视频信息 */
      showVideo: function (index, row) {
        this.$router.push({
          path: "/personnelposition"
        });
      },
      /** 查看服刑人员信息 */
      showPrisoner: function (row) {
        let data = { "prisonerNum": row.prisonerNum };
        this.$post(this.urlconfig.qpwGetShowPrisoner, data).then((res) => {
          if (res.status === 0) {
            this.prisonerInfo = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo somthing...
        });
      },
      /** 切换分页操作处理 */
      changeCurrent: function () {
        this.getPosunusualItems();
      }
    },
    mounted() {
      this.getWarningEventTypes();
      this.getSuperviseTypes();
      this.getPosunusualItems();
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