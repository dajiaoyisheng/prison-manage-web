<template>
  <div class="workbench-wrap w1200">
    <section class="contentWrap clearfix">
      <section class="l fl">
        <section class="item">
          <div class="bench-item-header">
            <span>犯人总数</span>
          </div>
          <div class="bench-item">
            <div class="bench-item-left v-c">
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
            <span>预警事件分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-histogram :data="benchChartbarData" height="100%" width="100%" :extend="histogramExtend" :settings="chartSettings"></ve-histogram>
            </template>
          </div>
        </section>
        <section class="item item-pics">
          <div class="picS" v-for="item in picItems" :key="item.des" @click="displayBImg(item.pic,$event)">
            <img :src="item.pic" alt="">
          </div>
          <div class="page">
            <div class="el-pagination-wrap">
              <pagination :page-index="currentPage" :total="count" @change="pageChange"></pagination>
            </div>
          </div>
        </section>
      </section>
      <!-- 右侧 -->
      <section class="r fr">
        <section class="item">
          <div class="bench-item-header">
            <span>人员分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-pie :data="benchChartPieData" :settings="chartSettingsPie" width="100%" height="100%" :judge-width="true"
                :extend="pieExtend" :after-config="pieAfterConfig"></ve-pie>
            </template>
          </div>
        </section>
        <section class="item">
          <div class="bench-item-header">
            <span>人员状态</span>
          </div>
          <div class="bench-item p-status-wrap">
            <ul class="p-status clearfix">
              <li v-for="item in pStatus" :key="item.status">
                <span>{{item.status}}:</span>
                <router-link class="num-color" to="/personnelposition">{{item.pNum}}</router-link>
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
            var content =
              `<div>${pieItem1.name}&nbsp;<a class="fontcolor text-decoration" href="/#/personnelposition">${pieItem1.value}</a>&nbsp;${pieItem1.percent}%</div>`;
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
        // 需通过接口返回
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
        currentPage: 1, //当前页码
        count: 0, //总记录数
        items: [],
        // 接口数据
        personnum: '',
        areasDetail: [],
        pStatus: [],
        benchChartPieData: [],
        benchChartbarData: [],
        preWarningDetil: [],

        // 柱状图beging
        // 配置
        chartSettings: {
          // 需要接口返回
          labelMap: {
            action: '违规行为',
            number: '个数',
            pNumber: '人数'
          }
        },
        // 配置 为拿接口返回的数据,放到mounted里了
        histogramExtend: {},
        // 柱状图end
        chartSettingsPie: {
          // 需通过接口返回
          slabelMap: {
            //   level: '级别',
            //   pNumber: '人数'
          }
        },
        prisonersStutas: [],
        value1: true,
        benchChartPie: {}
      }
    },
    created: function () {
      // this.$route.query.name 应该会用到
      // http://localhost:8080/#/workbench?name=cjd
      // console.log(this.$route.query.name);// cjd
    },
    mounted: function () {
      this.imgBlock = this.picItems[0].pic;
      document.getElementsByClassName("picS")[0].classList.add("curImageLayer");
      // 请求数据 也可在created中获取,暂时还不确定在哪更好
      this.getPSum();
      this.getPClass();
      this.getPStatus();
      this.getPreWarningClass();
      this.getList();

      this.histogramExtend = {
        color: ['#00c6dd', '#5867c2'],
        tooltip: {
          enterable: true, // 鼠标是否可进入tooltip
          position: ['20%', '20%'],
          trigger: 'axis', // 触发方式
          // axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //   type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          // },
          formatter: (params) => {
            var detil_str = '';
            var detil_num_str = '';
            var index = params[0].dataIndex;
            var curDetil = this.benchChartbarData.rows[index];
            curDetil.detils.map((item) => {
              console.log('item', item);
              detil_str = detil_str + `<div>${item.detil}</div>`;
              detil_num_str = detil_num_str +
                `<div>
                    <a class="fontcolor text-decoration" href="/#/querystats/violation">${item.number}</a>
                    <a class="fontcolor text-decoration" href="/#/querystats/violation">${item.pNumber}</a>
                  </div>`;
            });
            var barItem1 = params[0] || params;
            var barItem2 = params[1] || params;
            // if (barItem1.componentType == 'series') {
            var content =
              `<div class="tooltip-wrap clearfixed">
                    <div class="tooltip-left fl">
                      <div class="tooltip-header">分类</div>
                      ${detil_str}
                    </div>
                    <div class="tooltip-right fr">
                      <div class="tooltip-header">
                        <span>${barItem2.seriesName}</span>
                        <span>${barItem1.seriesName}</span>
                      </div>
                      ${detil_num_str}
                    </div>
                  </div>`;
            return content;
            // }
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
      };
    },
    methods: {
      // 犯人总数
      getPSum() {
        this.$ajxj.get('/getPrisonersData')
          .then((res) => {
            this.areasDetail = res.data.prisonsers;
            this.personnum = res.data.personnum;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {});
      },
      // 人员分类
      getPClass() {
        this.$ajxj.get('/getBenchChartPie')
          .then((res) => {
            console.log('piedata', res.data.pieData)
            this.benchChartPieData = res.data.pieData;
            // 合并对像
            // Object.assign(this.chartSettingsPie.labelMap, res.data.labelMap)
            // this.chartSettingsPie.labelMap = res.data.labelMap;
          }).catch((error) => {
            console.log(error);
          }).then(() => {});
      },
      // 人员状态 pStatus
      getPStatus() {
        this.$ajxj.get('/getPStatus')
          .then((res) => {
            this.pStatus = res.data
          }).catch((error) => {
            console.log(error);
          }).then(() => {});
      },
      // 预警事件分类
      getPreWarningClass() {
        this.$ajxj.get('/getBenchChartbarData')
          .then((res) => {
            console.log('预警事件分类', res);
            this.benchChartbarData = res.data.barData;
            this.preWarningDetil = res.data.detils;
          }).catch((error) => {
            console.log(error);
          }).then(() => {});
      },

      // afterConfig 生成echarts配置进行额外的处理  Function   在数据转化为配置项结束后触发
      pieAfterConfig(options) {
        options.legend.formatter = function (name) {
          var data = options.series[0].data; // 获取series中的data
          var targetValue; // 对应图例的值
          data.map(item => {
            if (item.name === name) {
              targetValue = item.value; // 对相应的图例赋值
            }
          })
          return `${name} ${targetValue}`;
        };
        return options
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
    padding-left: 2%;
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
