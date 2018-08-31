<template>
  <div>
    <section class="left-tree">
      <v-tree :tree-data="Prisonareatree" v-on:handle-node-click="handleNodeClick"></v-tree>
    </section>
    <section class="right-main">
      <!-- 监狱 -->
      <section v-show="isShowPrison" class="item prison">监狱</section>
      <!-- 楼层 -->
      <section v-show="isShowfloor" class="item prison">楼层</section>
      <!-- 监区 -->
      <section v-show="isShowMonitorArea" class="item prison">监区</section>
      <!-- 监舍 -->
      <section v-show="isShowMonitorHouse" class="monitor-house clearfix">
        <section class="center fl">中</section>
        <section class="right fr">
          <section class="house-floor">
            <p class="item-header">楼层</p>
            <div class="block">
              <el-carousel trigger="click" height="150px" :autoplay="false" indicator-position="none" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </section>
          <section class="house-p">
            <p class="item-header">人员</p>
            <div>
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
            </div>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>
<style scoped>
  .left-tree {
    width: 15%;
    display: inline-block;
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
  }

  .right-main {
    background: #f3f6f8;
    margin-left: 15%;
    width: 83%;
    padding: 20px 1%;
  }

  .right-main .item {
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .center {
    display: inline-block;
    width: 73%;
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .right {
    display: inline-block;
    width: 25%;
    /* border: 1px solid #e0e3ec; */
  }

  .right-main .monitor-house .right .house-floor,
  .right-main .monitor-house .right .house-p {
    border: 1px solid #e0e3ec;
  }

  .right-main .monitor-house .right .house-floor {
    margin-bottom: 20px;
  }

</style>
<script>
  import vTree from '@/components/commons/tree.vue';
  export default {
    name: 'tvmonitor',
    components: {
      vTree
    },
    data() {
      return {
        // 控制右侧显示隐藏
        isShowPrison: true,
        isShowfloor: false,
        isShowMonitorArea: false,
        isShowMonitorHouse: false,

        Prisonareatree: [],
        pPositionData: [],
      }
    },
    created: function () {
      var _this = this;
      // 犯人总数
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          res.data = [{
            label: '第一监区',
            children: [{
              label: '一号监舍楼',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '第二监区',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '第三监区',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]
          _this.Prisonareatree = res.data;
          console.log(res.data);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      this.$ajxj.get('/pPositionData')
        .then(function (res) {
          // _this.loading = false;
          _this.pPositionData = res.data.data
          _this.page = res.data.total
        }).catch(function (error) {
          console.log(error);
        }).then(function () {});
    },
    methods: {
      handleNodeClick(data, d1, d2) {
        this.isShowMonitorHouse = true;
        this.isShowPrison = false;
      }
    }
  }

</script>
