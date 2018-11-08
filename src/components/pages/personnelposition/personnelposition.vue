<template>
  <div class="pp-wrap">
    <!-- 左 -->
    <section class="pposition-l fl">
      <table>
        <thead>
          <tr>
            <th>
              <div class="cell">序号</div>
            </th>
            <th>
              <div class="cell">姓名</div>
            </th>
            <th>
              <div class="cell">编号</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in pPositionData" :key="item.name" @click="refreshPrisonerData(item.guid)">
            <td>
              <div class="cell">{{index+1}}</div>
            </td>
            <td>
              <div class="cell">{{item.name}}</div>
            </td>
            <td>
              <div class="cell">{{item.numbering}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="pposition-r">
      <!-- 右上 -->
      <section class="pp-r-t">
        <span>监区:</span>
        <el-select size="small" v-model="area" placeholder="请选择">
          <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>监舍:</span>
        <el-select size="small" v-model="monitoringHouse" placeholder="请选择">
          <el-option v-for="item in houses" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>监管类型:</span>
        <el-select size="small" v-model="supervisionType" placeholder="请选择">
          <el-option v-for="item in visiontype" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>服刑人员:</span>
        <el-input size="small" class="pp-input" v-model="prisoner" placeholder="请输入内容"></el-input>
        <el-button @click="search" size="small" type="primary">搜索</el-button>
      </section>
      <!-- 右下 -->
      <section class="pp-r-d clearfix">
        <!-- 右下左 -->
        <section class="pp-r-d-l fl">
          <p class="h-line">基本信息</p>
          <div class="pp-r-d-l-l fl">
            <div>
              <span>编号:</span>
              <el-input size="small" v-model="baseInfo.numbering" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>姓名:</span>
              <el-input size="small" v-model="baseInfo.name" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>性别:</span>
              <el-input size="small" v-model="baseInfo.sex" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>民族:</span>
              <el-input size="small" v-model="baseInfo.famousFamily" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>出生日期:</span>
              <el-input size="small" v-model="baseInfo.birth" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>文化程度:</span>
              <el-input size="small" v-model="baseInfo.educationalLevel" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>婚姻状况:</span>
              <el-input size="small" v-model="baseInfo.maritalStatus" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>罪名:</span>
              <el-input size="small" v-model="baseInfo.crime" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>刑期:</span>
              <el-input size="small" v-model="baseInfo.prisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>已服刑时长:</span>
              <el-input size="small" v-model="baseInfo.hasPrisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>剩余时长:</span>
              <el-input size="small" v-model="baseInfo.lastPrisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>监区:</span>
              <el-input size="small" v-model="baseInfo.regionArea" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>监舍:</span>
              <el-input size="small" v-model="baseInfo.monitoringHouse" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>监管类型:</span>
              <el-input size="small" v-model="baseInfo.superviseValue" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>责任预警:</span>
              <el-input size="small" v-model="baseInfo.dutyWarning" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>籍贯:</span>
              <el-input size="small" v-model="baseInfo.birthplace" placeholder="请输入内容"></el-input>
              <span>省</span>
            </div>
            <div>
              <span></span>
              <el-input size="small" v-model="baseInfo.city" placeholder="请输入内容"></el-input>
              <span>市</span>
            </div>
            <div>
              <span>家庭联系人:</span>
              <el-input size="small" v-model="baseInfo.familyContact" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>联系电话:</span>
              <el-input size="small" v-model="baseInfo.phone" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="pp-r-d-l-r fr">
            <div class="imgWrap" title="照片">
              <span class="pp-photo"></span>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>正面</span>
              </div>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>低头</span>
              </div>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>侧面</span>
              </div>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>抬头</span>
              </div>
            </div>
            <div class="imgWrap" title="视觉识别码">
              <span></span>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>正面</span>
              </div>
              <div>
                <img src="@/assets/pp-p.png" alt="">
                <span>低头</span>
              </div>
            </div>
          </div>
          <!-- 右下 -->
          <!-- <section class="pp-r-d-m"></section> -->

        </section>
        <!-- 右下右 -->
        <section class="pp-r-d-r">
          <p class="h-line">当日预警事件</p>
          <section class="el-table-wrap clearfix">
            <el-table :data="pPTableData" stripe style="width: 100%">
              <el-table-column prop="startTime" label="预警开始时间">
              </el-table-column>
              <el-table-column prop="endTime" label="预警结束时间">
              </el-table-column>
              <el-table-column prop="timeLen" label="预警时长">
              </el-table-column>
              <el-table-column prop="warningEventType" label="预警事件">
              </el-table-column>
              <el-table-column prop="warningArea" label="所在区域">
              </el-table-column>
              <el-table-column label="监控视频">
                <template slot-scope="scope">
                  <div class="operating">
                    <img class="v-align-m" :src="video" alt="">
                    <span @click="playvideo(scope.$index, scope.row, 'curevent')">查看</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="el-pagination-wrap">
              <table-pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange(currentPage, 'curevent')"></table-pagination>
            </div>
          </section>
        </section>
        <section class="pp-r-d-r pp-r-d-r-d">
          <p class="h-line">
            <!-- <p class="h-line"></p> -->
            <el-tabs v-model="activeName" @tab-click="handleClick" class="pos-res">
              <el-tab-pane label="当前活动区域" name="first">
                <img :src="currentPos" alt="">
              </el-tab-pane>
              <el-tab-pane label="历史活动区域" name="second">
                <section class="filter-wrap">
                  <span class="block">
                    <span class="demonstration">时间</span>
                    <el-date-picker size="mini" v-model="starttime" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker size="mini" v-model="endtime" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                  </span>
                </section>
                <section class="el-table-wrap clearfix">
                  <el-table :data="pPHisTrackData" stripe style="width: 100%">
                    <el-table-column prop="startTime" label="进时间">
                    </el-table-column>
                    <el-table-column prop="endTime" label="出时间">
                    </el-table-column>
                    <el-table-column prop="areaName" label="区域">
                    </el-table-column>
                    <el-table-column prop="stayTimeLen" label="停留时间">
                    </el-table-column>
                    <el-table-column label="监控视频">
                      <template slot-scope="scope">
                        <div class="operating">
                          <img class="v-align-m" :src="video" alt="">
                          <span @click="playVideo(scope.$index, scope.row, 'hisevent')">查看</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="el-pagination-wrap">
                    <table-pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange(currentPage, 'hisevent')"></table-pagination>
                  </div>
                </section>
              </el-tab-pane>
            </el-tabs>
          </p>
        </section>
        <section class="movie-wrap">
          <!-- 视频 -->
          <video width="320" height="240" controls="controls">
            <source src="movie.ogg" type="video/ogg">
            <source src="movie.mp4" type="video/mp4"> Your browser does not support the video tag.
          </video>
          <!-- 视频 -->
          <video width="320" height="240" controls="controls">
            <source src="movie.ogg" type="video/ogg">
            <source src="movie.mp4" type="video/mp4"> Your browser does not support the video tag.
          </video>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
  import currentPos from '@/assets/currentPos.png';
  import video from '@/assets/video.png';
  import tablePagination from '@/components/commons/tablePage.vue';
  export default {
    name: 'personnelposition',
    components: {
      tablePagination
    },
    data() {
      return {
        // searchPrams: {},
        baseInfo: {
          numbering: '',
          name: '',
          sex: '',
          famousFamily: '',
          birth: '',
          educationalLevel: '',
          maritalStatus: '',
          crime: '',
          prisonTerm: '',
          hasPrisonTerm: '',
          lastPrisonTerm: '',
          regionArea: '',
          prisonHouse: '',
          superviseValue: '',
          dutyWarning: '',
          birthplace: '',
          city: '',
          familyContact: '',
          phone: ''
        },
        area: '', //监区
        monitoringHouse: '', //监舍
        supervisionType: '',
        prisoner: '',
        starttime: new Date(new Date().setHours(0, 0, 0, 0)),
        endtime: new Date(new Date().setHours(24, 0, 0, 0)),

        video: video,
        currentPos: currentPos,
        input: '',
        pPositionData: [],

        pageSize: 10, //每页显示20条数据
        currentPage: 1, //当前页码
        count: 0, //总记录数

        pPTableData: [],
        pPHisTrackData: [],
        options: [],
        // 接口数据
        areas: [],
        houses: [],
        visiontype: [],

        value: '',
        currentPage3: 1,
        page: 1,
        activeName: 'second',
        value6: '',
        value7: '',
      }
    },
    created: function () {
      let area = this.$route.query.area;
      let searchParam = {};
      // this.getPPositionData('', searchParam);
      //this.getTableData('', searchParam);

      this.getAreaData();
      this.getHouseData();
      this.getVisiontypeData();
    },
    computed: {
      searchPrams: function () {
        return {
          area: this.area,
          monitoringHouse: this.monitoringHouse, //监舍
          supervisionType: this.supervisionType,
          prisoner: this.prisoner,
        }
      }
    },
    mounted: function () {

      // this.searchPrams = {
      //   area: this.area,
      //   monitoringHouse: this.monitoringHouse, //监舍
      //   room: this.room,
      //   supervisionType: this.supervisionType,
      //   prisoner: this.prisoner,
      // }
      // this.$store.state.setNavFull("full")

      // 判断进入此页面是否是要看视频
    },
    methods: {
      search() {
        this.$post(this.urlconfig.ppSearch, this.searchPrams).then(res => {
          if (res.status === 0) {
            this.pPositionData = res.data;
          }
        })
      },
      //从page组件传递过来的当前page
      pageChange(page, type) {
        this.currentPage = page;
        if (type === 'curevent') { // 当前历史事件
          this.getTableData(page, this.searchPrams);
        } else {
          // this.getPPositionData(page, this.searchPrams);
        }
      },
      // 获取监区数据
      getAreaData() {
        this.$get(this.urlconfig.ppGetAreaData).then(res => {
          if (res.status === 0) {
            this.areas = res.data
          }
        })
      },
      // 获取监舍数据
      getHouseData() {
        this.$get(this.urlconfig.ppGetHouseData).then(res => {
          if (res.status === 0) {
            this.houses = res.data
          }
        })
      },
      // 获取监管类型数据
      getVisiontypeData() {
        this.$get(this.urlconfig.ppGetVisiontypeData).then(res => {
          if (res.status === 0) {
            this.visiontype = res.data;
          }
        })
      },

      getTableData(p, searchParam) {
        Object.assign(searchParam, {
          page: p
        });
        this.$post('/pPTableData', searchParam)
          .then((res) => {
            if (res.status === 0) {
              this.count = res.data.total;
              this.pPTableData = res.data.data
              this.page = res.data.total
          }
          })
      },
      getPPositionData(p, searchParam) {
        Object.assign(searchParam, {
          page: p
        });
        this.$get('/pPositionData', searchParam)
          .then((res) => {
            if (res.status === 0) {
            this.pPositionData = res.data.data
            this.page = res.data.total
          }
          })
      },
      playvideo(index, row, type) {
        this.$el.querySelector(".movie-wrap").scrollIntoView();
        if (type == 'curevent') {

        }
        console.log(index, row);
        // window.open(row.tv)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      refreshPrisonerData(guid) {
        console.log(guid);
        let currParam = {
          prisonerId: guid
        };
        this.getPrisonerBaseInfo(currParam);
        this.getPrisonerPhotos(currParam);
        this.getTodayWarnings(currParam);
        this.getCurrActiveArea(currParam);
        this.getHisActiveTrack(currParam);
      },
      //获取人员基本信息
      getPrisonerBaseInfo(param) {
        this.$get(this.urlconfig.ppGetPrisoner, param).then(res => {
          if (res.status === 0) {
            this.baseInfo = res.data;
          }
        })
      },
      //获取人员照片信息
      getPrisonerPhotos(param) {
        this.$get(this.urlconfig.ppGetPrionserPhoto, param).then(res => {
          if (res.status === 0) {
            //this.baseInfo = res.data;
          }
        })
      },
      //获取当前预警事件信息
      getTodayWarnings(param) {
        param.pageIndex = 1;
        param.pageSize = 10;
        this.$get(this.urlconfig.ppGetTodayWarnings, param).then(res => {
          if (res.status === 0) {
            this.count = res.data.totalRows;
            this.pPTableData = res.data.items;
            this.page = res.data.totalRows;
          }
        })
      },
      //获取当前活动区域
      getCurrActiveArea(param) {
        this.$get(this.urlconfig.ppGetCurrActiveArea, param).then(res => {
          if (res.status === 0) {
            //this.baseInfo = res.data;
          }
        })
      },
      //获取历史活动区域
      getHisActiveTrack(param) {
        param.pageIndex = 1;
        param.pageSize = 10;
        param.startTime = new Date(new Date().setHours(10, 0, 0, 0));
        param.endTime = new Date(new Date().setHours(20, 0, 0, 0));
        this.$get(this.urlconfig.ppGetHisActiveTrack, param).then(res => {
          if (res.status === 0) {
            this.pPHisTrackData = res.data.items;
            this.page = res.data.totalRows;
          }
        })
      },
    }
  }

</script>
<style scoped>
  .pposition-l {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    width: 15%;
    background: #fff;
    display: inline-block;
    border-right: 1px solid #e0e3ec;
    overflow: auto;
    height: calc(100% - 60px);
  }

  .pposition-l .pp-td-w {
    width: 20%;
    background-color: #fff;
  }

  .pposition-r {
    width: 85%;
    float: right;
  }

  /* 选项卡begin */
  .el-tabs__header {
    display: inline-block;
    position: relative;
    margin: 0;
  }

  .el-tabs__header:after {
    display: block;
    content: '';
    position: absolute;
    top: 51%;
    background: #e9ebf0;
    width: 250%;
    height: 1px;
    left: 105%;
  }

  /* 选项卡end */
  .el-tabs__nav {
    cursor: pointer;
  }

  table thead tr {
    height: 48px;
  }

  .pp-r-t {
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    padding: 0 1%;
  }

  .pp-r-d {
    background-color: #f3f6f8;
    padding: 20px 1%;
  }

  .pp-r-d-l {
    width: 40%;
    display: inline-block;
  }

  .pp-r-d-l-l .el-select,
  .pp-r-d-l .el-input {
    width: 52%;
    margin-bottom: 14px;
  }

  .pp-r-d-l .div-select .el-input {
    width: 100%;
  }

  .pp-r-d-l .el-input:nth-child(12),
  .pp-r-d-l .el-input:nth-child(13),
  .pp-r-d-l .el-input:nth-child(14),
  .pp-r-d-l .el-input:nth-child(15),
    {
    width: 100%
  }

  .pp-r-d-l-l,
  .pp-r-d-l-r {
    width: 50%;
    display: inline-block
  }

  .pp-r-d-l-r .imgWrap {
    width: 95%;
    border: 1px solid #dcdcdc;
    position: relative;
    text-align: center;
    background-color: #fff;
    padding-top: 15px;
  }

  .imgWrap>span {
    position: absolute;
    left: 50%;
    left: 5%;
    top: -1%;
    width: 6em;
    background-color: #fff;
    height: 2px;
  }

  .imgWrap>span.pp-photo {
    width: 3em;
  }

  .imgWrap::before {
    content: attr(title);
    position: absolute;
    left: 5%;
    top: -0.7em;
    padding: 0 10px;
    z-index: 99;
  }

  .imgWrap:nth-child(2) {
    margin-top: 20px;
  }

  .pp-r-d-l-r .imgWrap>div {
    width: 45%;
    display: inline-block;
  }

  .pp-r-d-l-r .imgWrap>div>span {
    display: inline-block;
  }

  p.h-line {
    margin-bottom: 17px;
  }

  .pos-res {
    position: relative;
  }

  /* 选项卡后面的横线 */
  .pp-r-d-r-d p.h-line::after {
    top: 1%;
    width: 68%;
  }

  .pp-r-d .pp-r-d-l .pp-r-d-l-l div span:nth-child(1) {
    display: inline-block;
    width: 34%;
    text-align: right;
  }

  .pp-r-d-r {
    width: 60%;
    float: right;
  }

</style>
