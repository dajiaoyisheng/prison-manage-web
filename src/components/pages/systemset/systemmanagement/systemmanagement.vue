<template>
  <div id="systemmanagement" class="w1200">
    <el-container>
      <el-header>
          <el-row>
              <el-col :span="21" class="stm-header-title"><span>系统管理</span></el-col>
          </el-row>
      </el-header>
      <el-main>
          <el-tabs type="border-card" @tab-click="changeTabs">
            <el-tab-pane label="日志管理">
              <section>
                <el-row class="logger-params">
                  <el-col :span="20"><span style="color: #666;">用户操作日志</span></el-col>
                  <el-col :span="4">
                    <el-input size="mini" class="logger-params-input" v-model="parameter.name" placeholder="搜索关键词" clearable></el-input>
                    <el-button size="mini" class="search-btn" @click="queryLogger()">搜索</el-button>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-table :data="loggerList" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="操作内容："><span>{{ props.row.optionContent }}</span></el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作人"     prop="optionUser"></el-table-column>
                  <el-table-column label="操作IP"     prop="optionIP"></el-table-column>
                  <el-table-column label="操作名称"   prop="optionName"></el-table-column>
                  <el-table-column label="操作时间"   prop="optionTime"></el-table-column>
                </el-table>
                <div class="el-pagination-wrap text-center">
                  <table-pagination :total="count" @change="changeCurrent"></table-pagination>
                </div>
              </section>
            </el-tab-pane>
            <el-tab-pane label="用户管理">
              <section>
                <el-row class="logger-params">
                  <el-col :span="20">
                    <span style="color: #666;">用户列表</span>
                    <el-button style="color: #666; margin-left: 20px;" type="text" icon="el-icon-plus" @click="addUser=true, dialogTitle='新增用户'">添加用户</el-button>
                    <el-dialog :title="dialogTitle" :visible.sync="addUser" width="400px" :before-close="addUserClose">
                        <userDialog ref="addUserDialog"></userDialog>
                    </el-dialog>
                  </el-col>
                  <el-col :span="4">
                    <el-input size="mini" class="logger-params-input" v-model="parameter.name" placeholder="搜索用户" clearable></el-input>
                    <el-button size="mini" class="search-btn" @click="queryUser()">搜索</el-button>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-table :data="userList" stripe style="width: 100%;">
                  <el-table-column prop="userName"      label="用户名称" align="center" width="200px"></el-table-column>
                  <el-table-column prop="createTime"    label="创建时间" align="center"></el-table-column>
                  <el-table-column fixed="right"        label="操作"    align="center" width="200px">
                    <template slot-scope="scope">
                      <el-button style="padding: 0px 15px;" class="el-icon-edit"   size="mini" type="text" @click="addUser=true, dialogTitle='修改用户'">修改</el-button>
                      <el-button style="padding: 0px 15px;" class="el-icon-delete" size="mini" type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="el-pagination-wrap text-center">
                  <table-pagination :total="count" @change="changeCurrent"></table-pagination>
                </div>
              </section>
            </el-tab-pane>
          </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import userDialog from './userDialog';
import tablePagination from '@/components/commons/tablePage.vue';

export default {
  data () {
    return {
      dialogTitle: '新增用户',
      count: 0,
      addUser: false,
      parameter: {
        name: ''
      },
      loggerList: [],
      userList: []
    }
  },
  methods: {
    changeCurrent: function () {
      alert("分页");
    },
    changeTabs : function(tab, event) {
        var _this = this;
        let tabId = event.target.getAttribute('id');

        if (tabId == 'tab-0') {
            this.queryLoggers();
        } else if (tabId == 'tab-1') {
            this.queryUsers();
        }
    },
    queryLogger: function () {
      alert("搜索关键字");
    },
    queryLoggers: function() {
      var _this = this;
      this.$ajxj.get('/getLoggers').then(function (respnose) {
          _this.count = respnose.data.count;
          _this.loggerList = respnose.data.data;
      }).catch(function (error) {
      }).then(function () {
      });
    },
    queryUser: function () {
      alert("搜索用户");
    },
    queryUsers: function() {
      var _this = this;
      this.$ajxj.get('/getUsers').then(function (respnose) {
          _this.count = respnose.data.count;
          _this.userList = respnose.data.data;
      }).catch(function (error) {
      }).then(function () {
      });
    },
    deleteRow(index, row) {
      this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.userList.splice(index, 1);
      }).catch(() => {
      });
    },
    addUserClose(done) {
      this.$confirm('确认关闭？').then(_ => {
          // 执行关闭，并清空表单元素
          done();
          this.$refs.addUserDialog.resetForm('form');

          // 获取日常作息时间列表
          this.queryUsers();
      })
      .catch(_ => {});
    }
  },
  mounted() {
    this.queryLoggers();
  },
  components: {
    userDialog,
    tablePagination
  }
}
</script>

<style scopted>
  .el-header {
    line-height: 60px;
  }

  .el-main {
    height: 100%;
    padding-top: 0px;
  }

  .stm-header-title {
    font-size: 18px;
    color: #59c4ee;
  }

  .logger-params {
    font-size: 14px;
    line-height: 40px;
    margin-bottom: 5px;
    margin-left: 10px;
  }

  .logger-params-input {
    width: 60%;
    vertical-align: middle;
  }
</style>

<style>
    #systemmanagement .el-tabs__header {
        padding: 0;
        position: relative;
    }

    #systemmanagement .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        position: relative;
    }

    #systemmanagement .el-dialog__body {
        padding: 10px 20px;
    }

    #systemmanagement .el-row {
      line-height: 60px;
    }
</style>