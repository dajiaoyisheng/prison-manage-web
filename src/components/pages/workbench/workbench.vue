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
              <!-- <span class="num-big num-color">{{personnum}}</span> -->
              <router-link class="num-big num-color" to="/personnelposition">{{personnum}}</router-link>
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
              <ve-histogram :data="chartData" height="100%" width="100%" :extend="histogramExtend" :settings="chartSettings"></ve-histogram>
            </template>
          </div>
        </section>
        <section class="item item-pics">
          <div class="picS" v-for="item in picItems" :key="item.des" @click="displayBImg(item.pic,$event)">
            <img :src="item.pic" alt="">
          </div>
          <div class="page">
            <div class="el-pagination-wrap">
              <pagination :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></pagination>
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
              <ve-pie :data="benchChartPieData" :settings="chartSettingsPie" width="100%" height="100%" :judge-width="true"
                :extend="pieExtend" :after-config="afterConfig"></ve-pie>
            </template>
          </div>
        </section>
        <section class="item">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>人员状态</span>
          </div>
          <div class="bench-item p-status-wrap">
            <ul class="p-status clearfix">
              <li>
                <span>在押人员:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>提回重审:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>保外就医:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>出监就诊:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>监外执行:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>监内住院:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>离监探亲:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
              <li>
                <span>监外住院:</span>
                <router-link class="num-color" to="/personnelposition">123</router-link>
                <span>人</span>
              </li>
            </ul>
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
  import area1 from '@/assets/area1.png';
  import area2 from '@/assets/area2.png';

  import pagination from '@/components/commons/pagination.vue';
  export default {
    name: 'workbench',
    components: {
      pagination
    },
    data() {
      this.pieExtend = {
        tooltip: {
          enterable: true,
          trigger: 'item',
          position: 'inside',
          formatter: function (params) {
            var pieItem1 = params[0] || params;
            console.log('barItem1',pieItem1);
            var content = `<div>${pieItem1.name}&nbsp;<a class="fontcolor text-decoration" href="/#/personnelposition">${pieItem1.value}</a>&nbsp;${pieItem1.percent}%</div>`;
            return content;
          }
        },
        legend: {
          orient: 'vertical',
          top: "middle",
          right: "5%",
        },

        // pie 圆心位置
        series: {
          center: ['30%', '50%'],
          label: {
            show: false,
          },
        }
      };
      return {
        picItems: [{
            pic: area1,
            des: "1"
          },
          {
            pic: area2,
            des: "2"
          },
          {
            pic: area2,
            des: "3"
          },
          {
            pic: area1,
            des: "4"
          },
          {
            pic: area1,
            des: "5"
          },
          {
            pic: area2,
            des: "6"
          }
        ],
        imgBlock: '',
        pageSize: 10, //每页显示20条数据
        currentPage: 1, //当前页码
        count: 0, //总记录数
        items: [],

        personnum: '',
        areasDetail: [],
        pStatus: [],
        benchChartPieData: [],
        benchChartbarData: [],
        // 柱状图beging
        // 配置
        chartSettings: {
          labelMap: {
            action: '违规行为',
            number: '个数',
            pNumber: '人数'
          }
        },
        // 数据
        chartData: {
          columns: ['action', 'number', 'pNumber'],
          rows: [{
              'action': '定位异常',
              // '具体行为':['宿舍睡觉时段床上无人','未在指定时段待在特定区域','特定区域长时间逗留'],
              'number': 193,
              'pNumber': 1093,
            },
            {
              'action': '作息异常',
              'number': 330,
              'pNumber': 3230,
            },
            {
              'action': '违规预警',
              'number': 293,
              'pNumber': 2623,
            }
          ]
        },
        // 配置
        histogramExtend: {
          color: ['#00c6dd', '#5867c2'],
          tooltip: {
            enterable: true, // 鼠标是否可进入tooltip
            position: ['20%', '20%'],
            trigger: 'axis', // 触发方式
            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
            //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            // },
            formatter: function (params) {
              var barItem1 = params[0] || params;
              var barItem2 = params[1] || params;
              console.log('barItem1', barItem1)
              console.log('barItem2', barItem2)
              if (barItem1.componentType == 'series') {
                var content =
                  `<div class="tooltip-wrap clearfixed">
                    <div class="tooltip-left fl">
                      <div class="tooltip-header">分类</div>
                      <div>宿舍睡觉时段床上无人</div>
                      <div>未在指定时段待在特定区域</div>
                      <div>特定区域长时间逗留</div>
                    </div>

                    <div class="tooltip-right fr">
                      <div class="tooltip-header">
                        <span>${barItem2.seriesName}</span>
                        <span>${barItem1.seriesName}</span>
                      </div>

                      <div>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem1.data}</a>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem2.data}</a>
                      </div>
                      <div>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem1.data}</a>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem2.data}</a>
                      </div>
                      <div>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem1.data}</a>
                        <a class="fontcolor text-decoration" href="/#/querystats/violation">${barItem2.data}</a>
                      </div>
                    </div>
                  </div>`;
                return content;
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: {
            label: {
              show: true,
              position: "top"
            },
            barMaxWidth: 30,
            barGap: 0,
            type: 'bar',
          },
          legend: {
            right: "5%",
          }
        },
        // 柱状图end

        chartSettingsPie: {
          labelMap: {
            level: '级别',
            pNumber: '人数'
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
          console.log(error);
        })
        .then(function () {});
      // 人员状态
      // 人员分类
      this.$ajxj.get('/getBenchChartPie')
        .then(function (res) {
          res.data = {
            columns: ['level', 'pNumber'],
            rows: [{
                'level': '特严级',
                'pNumber': 1393
              },
              {
                'level': '严管级',
                'pNumber': 3530
              },
              {
                'level': '特宽级',
                'pNumber': 2923
              },
              {
                'level': '普通级',
                'pNumber': 1723
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
      this.imgBlock = this.picItems[0].pic;
      document.getElementsByClassName("picS")[0].classList.add("curImageLayer");
      //请求第一页数据
      this.getList()
    },
    methods: {
      afterConfig(options) {
        options.legend.formatter = function (name) { // legend中的formatter传入一个name属性
          var data = options.series[0].data; // 获取series中的data
          var targetValue; // 对应图例的值
          data.map(item => {
            if (item.name == name) {
              targetValue = item.value; // 对相应的图例赋值
            }
          })
          // var p = (targetValue / totalValue * 100).toFixed(2); // 百分比
          return `${name} ${targetValue}`;
        };
        return options
      },

      listen: function (page) {
        this.msg = '你点击了' + page + '页'
      },
      displayBImg(curPic, e) {
        let curNode = e.currentTarget;
        let nodeList = [];
        let firstChild = curNode.parentNode.firstChild;
        for (; firstChild; firstChild = firstChild.nextSibling) {
          if (firstChild.nodeType === 1 && firstChild !== curNode) {
            nodeList.push(firstChild);
          }
        }
        nodeList.map(function (val) {
          val.classList.remove("curImageLayer");
        });

        curNode.classList.add("curImageLayer");
        this.imgBlock = curPic;
      },
      handleCurrentChange(val) {
        this.getTableData(val);
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //获取数据
      getList() {
        var _this = this;
        // ?pageSize=${this.pageSize}&currentPage=${this.currentPage}
        this.$ajxj.post(`/pPTableData`, {
            pageSize: 10,
            currentPage: _this.currentPage
          })
          .then(function (res) {
            _this.count = 124;
            _this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {});
      },

      //从page组件传递过来的当前page
      pageChange(page) {
        this.currentPage = page
        this.getList()
      }
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
    height: 720px;
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
    position: relative;

    overflow: hidden;
    cursor: pointer;
  }

  .picS:nth-child(odd) {
    float: left;
  }

  .picS:nth-child(even) {
    float: right;
  }

  .curImageLayer:after {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: attr(data-text);
    transition: all 1s ease;
    transform: translateY(0);
    /* color: #FFF; */
    cursor: not-allowed;
  }

  /* .curImageLayer:hover:after {
    transform: translateY(0);
  } */

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
    box-shadow: 0 2px 16px #e9ebed, 0 0 1px #e9ebed, 0 0 1px #e9ebed;
  }

  .bench-item-header {
    height: 30px;
    line-height: 30px;
    background-color: #fcfcfc;
    font-size: 12px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }


  .bench-item {
    height: 310px;
    border-top: 1px solid #e6e6e6;
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
    display: table;

  }

  .bench-item-right ul {
    display: table-cell;
    vertical-align: middle;
  }


  .bench-item-right {
    width: 60%;
    height: 191px;
    border: 1px solid #e6e6e6;
    right: 4%;
    padding: 21px 5%;
    text-align: center;
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
    height: 760px;
    background: #fff;
  }

  .curDisplayPic img {
    width: 100%;
    height: 100%;
    margin-top: 110px;
  }

  .p-status-wrap {
    display: table;
  }

  ul.p-status {
    display: table-cell;
    vertical-align: middle;
    /* padding: 50px 5%; */
  }

  ul.p-status li {
    float: left;
    width: 49%;
    height: 50px;
    line-height: 50px;
    text-align: center;


  }

  ul.p-status li:nth-child(odd) {
    border-bottom: 1px solid #e0e3ec;
    border-right: 1px solid #e0e3ec;
  }

  ul.p-status li:nth-child(7) {
    border-bottom: none;
  }

  ul.p-status li:nth-child(even) {
    border-bottom: 1px solid #e0e3ec;
  }

  ul.p-status li:last-child {
    border-bottom: none;
  }

</style>
// tooltip样式
<style>
  .tooltip-wrap {
    width: 260px;
    height: 100px;
  }

  .tooltip-left {
    display: inline-block;
    border-right: 1px solid #fff;
    width: 70%;
  }

  .tooltip-header {
    border-bottom: 1px solid #fff;
  }

  .tooltip-right {
    display: inline-block;
    float: right;
    width: 29%;
  }

  .fontcolor {
    color: #fff;
  }

  .text-decoration {
    text-decoration: underline;
  }

</style>
