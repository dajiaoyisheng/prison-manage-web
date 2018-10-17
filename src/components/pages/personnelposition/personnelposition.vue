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
          <tr v-for="(item,index) in pPositionData" :key="item.name">
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
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>监舍:</span>
        <el-select size="small" v-model="monitoringHouse" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>房间:</span>
        <el-select size="small" v-model="room" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>监管类型:</span>
        <el-select size="small" v-model="supervisionType" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
              <el-input size="small" v-model="numbering" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>姓名:</span>
              <el-input size="small" v-model="name" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>性别:</span>
              <el-input size="small" v-model="sex" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>民族:</span>
              <el-input size="small" v-model="famousFamily" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>出生日期:</span>
              <el-input size="small" v-model="birth" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>文化程度:</span>
              <el-input size="small" v-model="educationalLevel" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>婚姻状况:</span>
              <el-input size="small" v-model="maritalStatus" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>罪名:</span>
              <el-input size="small" v-model="crime" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>刑期:</span>
              <el-input size="small" v-model="prisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>已服刑时长:</span>
              <el-input size="small" v-model="hasPrisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>剩余时长:</span>
              <el-input size="small" v-model="lastPrisonTerm" placeholder="请输入内容"></el-input>
            </div>
            <div class="div-select">
              <span>监区:</span>
              <el-select size="small" v-model="area" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="div-select">
              <span>监舍:</span>
              <el-select size="small" v-model="monitoringHouse" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="div-select">
              <span>楼层:</span>
              <el-select size="small" v-model="floor" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="div-select">
              <span>房间:</span>
              <el-select size="small" v-model="room" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="div-select">
              <span>监管类型:</span>
              <el-select size="small" v-model="supervisionType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>责任预警:</span>
              <el-input size="small" v-model="dutyWarning" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>籍贯:</span>
              <el-input size="small" v-model="birthplace" placeholder="请输入内容"></el-input>
              <span>省</span>
            </div>
            <div>
              <span></span>
              <el-input size="small" v-model="city" placeholder="请输入内容"></el-input>
              <span>市</span>
            </div>
            <div>
              <span>家庭联系人:</span>
              <el-input size="small" v-model="familyContact" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>联系电话:</span>
              <el-input size="small" v-model="phone" placeholder="请输入内容"></el-input>
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
              <el-table-column prop="starttime" label="预警开始时间">
              </el-table-column>
              <el-table-column prop="endtime" label="预警结束时间">
              </el-table-column>
              <el-table-column prop="during" label="预警时长">
              </el-table-column>
              <el-table-column prop="tyle" label="预警事件">
              </el-table-column>
              <el-table-column prop="area" label="所在区域">
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
                  <el-table :data="pPTableData" stripe style="width: 100%">
                    <el-table-column prop="starttime" label="进时间">
                    </el-table-column>
                    <el-table-column prop="endtime" label="出时间">
                    </el-table-column>
                    <el-table-column prop="during" label="区域">
                    </el-table-column>
                    <el-table-column prop="tyle" label="停留时间">
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
        <section>
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
        area: '', //监区
        monitoringHouse: '', //监舍
        room: '',
        supervisionType: '',
        prisoner: '',
        numbering: '',
        name: '',
        sex: '',
        famousFamily: '', //民族
        birth: '',
        educationalLevel: '',
        maritalStatus: '',
        crime: '',
        prisonTerm: '', //刑期
        hasPrisonTerm: '',
        lastPrisonTerm: '',
        floor: '',
        dutyWarning: '',
        birthplace: '',
        city: '',
        familyContact: '',
        phone: '',
        starttime: new Date(new Date().setHours(0, 0, 0, 0)),
        endtime: new Date(new Date().setHours(24, 0, 0, 0)),

        video: video,
        currentPos: currentPos,
        input: '',
        loading: false,
        pPositionData: [],

        pageSize: 10, //每页显示20条数据
        currentPage: 1, //当前页码
        count: 0, //总记录数

        pPTableData: [],
        options: [{
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
        }],
        value: '',
        currentPage3: 1,
        page: 1,
        activeName: 'second',
        value6: '',
        value7: ''
      }
    },
    created: function () {
      let area = this.$route.query.area;
      let searchParam = {};
      this.getPPositionData('', searchParam);
      this.getTableData('', searchParam);
    },
    computed: {
      searchPrams: function(){
        return {
        area: this.area,
        monitoringHouse: this.monitoringHouse, //监舍
        room: this.room,
        supervisionType: this.supervisionType,
        prisoner: this.prisoner,}
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
    },
    methods: {
      search() {
        console.log('param', this.searchPrams)
        this.getPPositionData('', this.searchPrams);
        this.getTableData('', this.searchPrams);
      },
      //从page组件传递过来的当前page
      pageChange(page, type) {
        this.currentPage = page;
        if (type === 'curevent') { // 当前历史事件
          this.getTableData(page, this.searchPrams);
        } else {
          this.getPPositionData(page, this.searchPrams);
        }
      },
      getTableData(p, searchParam) {
        console.log('getTableData')
        Object.assign(searchParam, {
          page: p
        });
        this.$post('/pPTableData', searchParam)
          .then((res) => {
            this.count = res.data.total;
            this.pPTableData = res.data.data
            this.page = res.data.total
          })
      },
      getPPositionData(p, searchParam) {
        Object.assign(searchParam, {
          page: p
        });
        this.$get('/pPositionData', searchParam)
          .then((res) => {
            // this.loading = false;
            this.pPositionData = res.data.data
            this.page = res.data.total
          })
      },
      playvideo(index, row, type) {
        if (type == 'curevent') {

        }
        console.log(index, row);
        window.open(row.tv)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
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
