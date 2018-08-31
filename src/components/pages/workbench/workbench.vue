<template>
  <div class="workbench-wrap w1200">
    <!-- <el-row type="flex" class="row-bg" justify="end">
       <el-col class="itemWrap" :span="3">
        <span>视频分析引擎</span>
        <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-col>
    </el-row> -->
    <!-- 犯人总数 -->
    <!-- <el-row :gutter="30"> -->
    <section class="contentWrap clearfix">
      <section class="l fl">
        <section class="item">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>犯人总数</span>
          </div>
          <div class="bench-item">
            <div class="bench-item-left v-c">
              <span class="num-big num-color">{{personnum}}</span>
              <span>人</span>
            </div>
            <div class="bench-item-right v-c">
              <ul>
                <li v-for="item in areasDetail" :key="item.area">
                  <span>{{item.area}}：</span>
                  <router-link class="num-color" to="/personnelposition">{{item.pNumItem}}</router-link>
                  <span>人</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="item">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>预警事件分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-histogram :data="chartData" height="100%" width="100%" :extend="histogramExtend"></ve-histogram>
            </template>
          </div>
        </section>
        <section class="item item-pics">
          <div class="picS" v-for="item in picItems" :key="item.des">
            <img :src="item.pic" alt="" @click="displayBImg(item.pic)">
          </div>
          <div class="page">
            <div class="el-pagination-wrap">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper" :total="this.page">
              </el-pagination>
            </div>
          </div>
        </section>
      </section>
      <!-- 右侧 -->
      <section class="r fr">
        <section class="item">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>人员分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-pie :data="benchChartPieData" width="100%" height="100%" :judge-width="true" :extend="pieSettings"></ve-pie>
            </template>
          </div>
        </section>
        <section class="item">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>人员状态</span>
          </div>
          <div class="bench-item">
            <div class="bench-item-left v-c">
              <span class="num-big num-color">{{personnum}}</span>
              <span>人</span>
            </div>
            <div class="bench-item-right v-c">
              <ul>
                <li v-for="item in prisonersStutas" :key="item.area">
                  <span>{{item.area}}：</span>
                  <span class="num-color">{{item.pNumItem}}</span>
                  <span>人</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="item item-displayPic-r">
          <div class="curDisplayPic">
            <img :src="imgBlock" alt="">
          </div>
        </section>
      </section>
    </section>
    <!-- </el-row> -->
    <!-- 预警事件分类 -->

    <!-- 预警事件分类 -->

  </div>
</template>
<script>
  import ppp from '@/assets/pp-p.png';
  import logo from '@/assets/logo.png';
  export default {
    name: 'workbench',
    data() {
      return {
        // ppp: ppp,
        // logo: logo,
        imgBlock: '',
        picItems: [{
            pic: ppp,
            des: "1"
          },
          {
            pic: logo,
            des: "2"
          },
          {
            pic: ppp,
            des: "3"
          },
          {
            pic: ppp,
            des: "4"
          },
          {
            pic: ppp,
            des: "5"
          },
          {
            pic: ppp,
            des: "6"
          }
        ],
        personnum: '',
        areasDetail: [],
        benchChartPieData: [],
        benchChartbarData: [],
        currentPage3: 1,
        page: 1,
        histogramExtend: {
          legend: {
            right: "5%",
          },
          series: {
            label: {
              show: true,
              position: "top"
            },
            barMaxWidth: 30,
            barGap: 0
          }
        },
        chartData: {
          columns: ['行为', '个数', '人数'],
          rows: [{
              '行为': '定位异常',
              '个数': 193,
              '人数': 93
            },
            {
              '行为': '定位异常',
              '个数': 350,
              '人数': 230
            },
            {
              '行为': '定位异常',
              '个数': 23,
              '人数': 3
            }
          ]
        },

        pieSettings: {
          legend: {
            orient: 'vertical',
            top: "middle",
            right: "5%",

          },
          // pie 圆心位置
          series: {
            center: ['30%', '50%'],
          }
        },
        prisonersStutas: [],
        value1: true,
        benchChartPie: {}
      }
    },
    created: function () {
      // http://localhost:8080/#/workbench?name=cjd
      // console.log(this.$route.query.name);// cjd
      // console.log(this);// cjd

      var _this = this;
      // 犯人总数
      this.$ajxj.get('/getPrisonersData')
        .then(function (res) {
          _this.areasDetail = res.data.data
          let temArray = [];
          _this.areasDetail.map(function (val) {
            temArray.push(val.pNumItem)
          })
          _this.personnum = eval(temArray.join('+'))
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      // 人员分类
      this.$ajxj.get('/getBenchChartPie')
        .then(function (res) {
          console.log(res.data);
          res.data = {
            columns: ['日期', '访问用户'],
            rows: [{
                '日期': '1/1',
                '访问用户': 1393
              },
              {
                '日期': '1/2',
                '访问用户': 3530
              },
              {
                '日期': '1/3',
                '访问用户': 2923
              },
              {
                '日期': '1/4',
                '访问用户': 1723
              },
              {
                '日期': '1/5',
                '访问用户': 3792
              },
              {
                '日期': '1/6',
                '访问用户': 4593
              }
            ]
          }
          _this.benchChartPieData = res.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
      // 预警事件分类
      this.$ajxj.get('/getBenchChartbarData')
        .then(function (res) {
          _this.benchChartbarData = res.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
      // 人员状态
      this.$ajxj.get('/prisonersStutas')
        .then(function (res) {
          _this.prisonersStutas = res.data.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
    },
    mounted: function () {
      // document.getElementsByClassName("workbench-wrap")[0].style.cssText =
      //   "width:1200px;margin:0 auto;transition:width 0.5s;";
    },
    methods: {
      displayBImg(curPic) {
        console.log(curPic);
        this.imgBlock = curPic
      },
      handleCurrentChange(val) {
        this.getTableData(val);
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    }
  }

</script>

<style scoped>
  .contentWrap {
    margin-top: 20px;
  }

  .contentWrap .l,
  .contentWrap .r {
    width: 49%;
  }

  .contentWrap .l .item,
  .contentWrap .r .item {
    margin-bottom: 20px;
    box-shadow: 0 2px 16px #e9ebed, 0 0 1px #e9ebed, 0 0 1px #e9ebed;
  }

  .item-pics,
  .item-displayPic {
    height: 665px;
    background: #fff;
  }

  .item-pics {
    padding: 20px 3%;
    position: relative;
    background: #fff;
  }

  .picS {
    width: 48%;
    height: 213px;
    margin-bottom: 10px;
    border: 1px solid #e0e3ec;
    display: inline-block;
  }

  .picS:nth-child(odd) {
    float: left;
  }

  .picS:nth-child(even) {
    float: right;
  }

  /* 分页 */
  .item-pics .page {
    width: 100%;
    float: none;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .el-pagination-wrap {
    padding: 9px 0;
  }

  .item-pics .page .el-pagination {
    padding: 2px 3%;
  }

  .picS img {
    width: 100%;
    height: 100%;
  }








  .itemWrap {
    width: 50%;
    /* box-shadow: 0px 2px 10px #e9ebed, 0 2px 10px #e9ebed, 0 2px 10px #e9ebed; */
    box-shadow: 0 2px 16px #e9ebed, 0 0 1px #e9ebed, 0 0 1px #e9ebed;
  }

  .bench-item-header {
    height: 30px;
    line-height: 30px;
    background-color: #fcfcfc;
    font-size: 12px;
    /* color: #fff; */
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }



  .bench-item {
    height: 310px;

    /* border: 1px solid #e6e6e6; */
    border-top: 1px solid #e6e6e6;
    ;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: relative;
    padding: 10px 10%;
    background: #fff;
  }

  .bench-item-left {
    left: 5%;
  }

  .bench-item-left .num-big {
    font-size: 35px;
  }

  .bench-item-right {
    width: 60%;
    height: 191px;
    border: 1px solid #e6e6e6;
    right: 4%;
    padding: 21px 5%;
  }

  .bench-item-right ul li {
    margin-bottom: 4%;
    width: 50%;
  }

  .bench-item-right ul li:nth-child(odd) {
    float: left;
  }

  .bench-item-right ul li:nth-child(even) {
    float: right;
  }




  .item-displayPic-r {
    height: 705px;
    background: #fff;
  }

  .curDisplayPic img {
    width: 100%;
    height: 100%;
  }

</style>
