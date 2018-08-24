<template>
  <div class="workbench-wrap w1200">
    <!-- 异常位置预警 应该自动提示,触发条件?-->
    <!-- <section>
      <el-button plain @click="open2">
        不会自动关闭
      </el-button>
    </section> -->
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="3">
        <span>视频分析引擎</span>
        <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-col>
    </el-row>
    <!-- 犯人总数 -->
    <el-row :gutter="20">
      <el-col :span="12">
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
                <!-- <span class="num-color">{{item.pNumItem}}</span> -->
                <router-link class="num-color" to="/systemset/prisonmanagement">{{item.pNumItem}}</router-link>
                <span>人</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bench-item-header">
          <img src="" alt="">
          <span>人员分类</span>
        </div>
        <div class="bench-item">
          <template>
            <ve-pie :data="benchChartPieData" width="100%" height="100%" :judge-width="true" :settings="pieSettings"></ve-pie>
          </template>
        </div>
      </el-col>
    </el-row>
    <!-- 预警事件分类 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="bench-item-header">
          <img src="" alt="">
          <span>预警事件分类</span>
        </div>
        <div class="bench-item">
          <template>
            <ve-bar :data="benchChartbarData" height="100%" width="100%" :settings="chartSettings" :judge-width="true"></ve-bar>
          </template>
        </div>
      </el-col>
      <el-col :span="12">
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'workbench',
    data() {
        // this.pieSettings= {
        //   legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['直达','营销广告']
        //   },
        // };
      return {
        personnum: '',
        areasDetail: [],
        benchChartPieData: [],
        benchChartbarData: [],
        pieSettings: {
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直达','营销广告']
          },
        },
        chartSettings: {
          labelMap: {
            'PV': '访问用户',
            'Order': '下单用户'
          },
          // legendName: {
          //   '访问用户': '访问用户 total: 10000'
          // }
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
          // _this.loading = false;
          console.log(res.data);
          
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
    mounted: function () {
      // document.getElementsByClassName("workbench-wrap")[0].style.cssText =
      //   "width:1200px;margin:0 auto;transition:width 0.5s;";
    },
    methods: {
      open2() {
        this.$notify({
          title: '异常位置预警',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      }
    }
  }

</script>

<style>
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

</style>
