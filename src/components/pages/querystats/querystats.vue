<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预警概览" name="first">预警概览</el-tab-pane>
      <el-tab-pane label="预警查询分析" name="second">

      </el-tab-pane>
      <el-tab-pane label="人员画像" name="third">
        <section class="tv-switch">
          <span>视频分析引擎</span>
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </section>
        <section class="bench-item-wrap">
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
                  <span class="num-color">{{item.pNumItem}}</span>
                  <span>人</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="bench-item-wrap">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>人员分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-pie :data="benchChartPieData" height="100%"></ve-pie>
            </template>
          </div>
        </section>
        <section class="bench-item-wrap">
          <div class="bench-item-header">
            <img src="" alt="">
            <span>预警事件分类</span>
          </div>
          <div class="bench-item">
            <template>
              <ve-bar :data="benchChartbarData" height="100%" :settings="chartSettings"></ve-bar>
            </template>
          </div>
        </section>
        <section class="bench-item-wrap">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
  .tv-switch {
    text-align: right;
    height: 46px;
    line-height: 46px;
  }

  .bench-item-wrap {
    width: 49%;
    height: 339px;
    margin-bottom: 10px;
  }

  .bench-item-wrap:nth-child(even) {
    float: left;
  }

  .bench-item-wrap:nth-child(odd) {
    float: right;
  }

  .bench-item-header {
    height: 30px;
    line-height: 30px;
    background-color: #a0abb5;
    font-size: 12px;
    color: #fff;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .bench-item {
    height: 310px;
    border: 1px solid #e6e6e6;
    border-top: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: relative;
  }

  .bench-item-left {
    left: 10%;
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

</style>
<script>
  export default {
    name: 'querystats',
    data() {
      return {
        loading: false,
        activeName: 'second',
        personnum: '',
        areasDetail: [],
        benchChartPieData: [],
        benchChartbarData: [],
        chartSettings: {
          labelMap: {
            'PV': '访问用户',
            'Order': '下单用户'
          },
          legendName: {
            '访问用户': '访问用户 total: 10000'
          }
        },
        prisonersStutas: [],
        value1: true,
        formData: {
          id: '21',
          name: 'cjd'
        },
        benchChartPie: {}
      }
    },
    created: function () {
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
          // _this.loading = false;
          _this.benchChartPieData = res.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
      // 预警事件分类
      this.$ajxj.get('/getBenchChartbarData')
        .then(function (res) {
          // _this.loading = false;
          _this.benchChartbarData = res.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
      // 人员状态
      this.$ajxj.get('/prisonersStutas')
        .then(function (res) {
          // _this.loading = false;
          _this.prisonersStutas = res.data.data
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }

</script>
