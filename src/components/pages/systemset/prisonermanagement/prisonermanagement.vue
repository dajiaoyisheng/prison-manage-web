<template>
  <div id="prisonermanagement" class="w1200">
    <p class="contentInfo">服刑人员信息管理</p>
    <section class="contentMain clearfixs">
      <section class="pm-t puu-params">
        <el-row :gutter="20" type="flex">
          <el-col :span="2">
            <img :src="images.add"><span class="pointer" @click="showDialog=true, dialogTitle='新增服刑人员'">新增</span>
          </el-col>
          <el-col :span="2">
            <img :src="images.del"><span @click="deleteBatch" class="pointer">批量删除</span>
          </el-col>
          <el-col :span="6" :offset="12">
            <input class="p-m-input" @keyup.enter="getTableDatas" v-model="params.keyWord" placeholder="请输入姓名或编号">
          </el-col>
          <el-col :span="2">
            <el-button @click="getTableDatas" :loading="this.$store.state.loading" class="search-btn" size="small">搜索</el-button>
          </el-col>
        </el-row>
      </section>
      <section>
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="800px" :before-close="beforeClose">
          <prisonerInfo ref="prisonerInfo" :superviseType="superviseType" :criState="criState" :state="state"
            :prisonRegions="prisonRegions"></prisonerInfo>
        </el-dialog>
      </section>
      <section class="el-table-wrap">
        <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="criName" label="服刑人员姓名"></el-table-column>
          <el-table-column prop="criCode" label="服刑人员编码"></el-table-column>
          <el-table-column label="服刑人员年龄">
            <template slot-scope="scope">{{ scope.row.criBirthday }}岁</template>
          </el-table-column>
          <el-table-column prop="criSupervisetype" label="服刑人员类型"></el-table-column>
          <el-table-column prop="criStartdate" label="入监时间"></el-table-column>
          <el-table-column prop="criAccusation" label="涉案罪名"></el-table-column>
          <el-table-column label="服刑时长">
            <template slot-scope="scope">{{ scope.row.criPrisonterm }}个月</template>
          </el-table-column>
          <el-table-column label="操作" width="255">
            <template slot-scope="scope">
              <div class="operating">
                <router-link tag="span" :to="{path:'/personnelposition', query:{name:scope.row.prisonerName}}">
                  <img :src="images.review">查看
                </router-link>
                <el-button style="padding: 0px 15px;" type="text" @click="initModifyInfo(scope.row)">
                  <img :src="images.edit">修改
                </el-button>
                <span @click="deleteItem(scope.$index, scope.row)"><img :src="images.del" alt="">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <div class="el-pagination-wrap">
        <table-pagination :total="count" @change="pageChange" ref="pagination"></table-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import add from '@/assets/add.png';
  import del from '@/assets/del.png';
  import edit from '@/assets/edit.png';
  import review from '@/assets/review.png';
  import tablePagination from '@/components/commons/tablePage.vue';
  import prisonerInfo from '@/components/pages/systemset/prisonermanagement/prisonerInfo.vue';

  export default {
    components: {
      prisonerInfo,
      tablePagination
    },
    data() {
      return {
        dialogTitle: '新增服刑人员',
        showDialog: false,
        count: 0,
        images: {
          add: add,
          del: del,
          edit: edit,
          review: review
        },
        params: {
          keyWord: ''
        },
        pagination: {
          totalRows: 0
        },
        tableData: [],
        multipleSelection: [],
        superviseType: [],
        criState: [],
        state: [],
        prisonRegions: []
      }
    },
    mounted() {
      this.getState();
      this.getCriState();
      this.getSuperviseType();
      this.getAllPrisonRegions();
      this.getTableDatas();
    },
    methods: {
      /** 获取服刑人员状态 */
      getState: function () {
        this.$get(this.urlconfig.spmGetState).then((res) => {
          this.state = res.data;
        }).catch((error) => {
          console.log(error);
        }).then((error) => {
          console.log(error);
        });
      },
      /** 获取人员当前状态 */
      getCriState: function () {
        this.$get(this.urlconfig.spmGetCriState).then((res) => {
          this.criState = res.data;
        }).catch((error) => {
          console.log(error);
        }).then((error) => {
          console.log(error);
        });
      },
      /** 获取服刑监管类型 */
      getSuperviseType: function () {
        this.$get(this.urlconfig.spmgetSuperviseType).then((res) => {
          this.superviseType = res.data;
        }).catch((error) => {
          console.log(error);
        }).then((error) => {
          console.log(error);
        });
      },
      /** 获取所有监区列表 */
      getAllPrisonRegions: function () {
        this.$get(this.urlconfig.spmGetAllPrisonRegions).then((res) => {
          this.prisonRegions = res.data;
        }).catch((error) => {
          console.log(error);
        }).then((error) => {
          console.log(error);
        });
      },
      /** 获取服刑人员列表 */
      getTableDatas: function (page) {
        let data = {
          "pageIndex": page || 1,
          'pageSize': this.$refs.pagination.limit,
          "keyWord": this.params.keyWord
        }
        this.$post(this.urlconfig.spmGetTableDatas, data).then((res) => {
          this.count = res.data.totalRows;
          this.tableData = res.data.items;
        }).catch((error) => {
          console.log(error);
        }).then((error) => {
          console.log(error);
        });
      },
      /** 分页操作处理 */
      pageChange: function (page) {
        this.currentPage = page;
        this.getTableDatas(page);
      },
      /** 执行删除操作 */
      handleDelete: function (delItem, delType) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let criIds = [];
          if (delType === 'deleteItem') {
            criIds.push(delItem.criId);
          } else {
            criIds = this.multipleSelection.map((item, index) => item.criId);
          }

          let data = {
            "criIds": JSON.stringify(criIds)
          }
          this.$post(this.urlconfig.spmHandleDelete, data).then((res) => {
            if (res.status === 0) {
              this.$message.success(response.statusinfo);
              this.getTableDatas();
            }
          }).catch((error) => {
            console.log(error);
          }).then((error) => {
            console.log(error);
          });
        }).catch(() => {
          // todo somthing...
        });
      },
      /** 删除服刑人员 */
      deleteItem: function (index, row, p3) {
        this.handleDelete(row, 'deleteItem');
      },
      /** 服刑人员多选操作 */
      handleSelectionChange: function (val) {
        this.multipleSelection = val;
      },
      /** 批量删除服刑人员 */
      deleteBatch: function () {
        if (this.multipleSelection.length === 0) {
          this.$message.success("请选择要删除的服刑人员!");
        } else {
          this.handleDelete(this.multipleSelection, 'deleteBatch');
        }
      },
      /** 修改服刑人员初始化 */
      initModifyInfo: function (row) {
        this.showDialog = true;
        this.dialogTitle = '修改服刑人员';
        this.$nextTick(() => {
          this.$refs.prisonerInfo.queryPrisonerInfo("update", row.criId);
        });
      },
      /** 关闭服刑人员信息对话框 */
      beforeClose: function (done) {
        this.$confirm('确认关闭？').then(() => {
          done();
          this.$refs.prisonerInfo.resetForm('form');
          this.getTableDatas();
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }

</script>

<style scoped>
  .pm-t span {
    color: #666;
  }

  .p-m-input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

</style>

<style>
  #prisonermanagement .el-dialog__body {
    padding: 10px 20px;
  }

</style>
