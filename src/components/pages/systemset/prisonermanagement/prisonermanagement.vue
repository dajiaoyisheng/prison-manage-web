<template>
  <div class="w1200">
    <p class="contentInfo">服刑人员信息管理</p>
    <section class="contentMain clearfixs">
      <section class="pm-t puu-params">
        <el-row :gutter="20" type="flex">
          <el-col :span="3">
            <img :src="images.add" alt="">
            <span class="pointer">增加</span>
          </el-col>
          <el-col :span="3">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
              :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :file-list="fileList"
              :show-file-list="false">
              <img :src="images.importgroup" alt="">
              <span class="pointer">批量导入</span>
            </el-upload>
          </el-col>
          <el-col :span="3">
            <img :src="images.exportgroup" alt="">
            <span class="pointer">批量导出</span>
          </el-col>
          <el-col :span="3">
            <img :src="images.del" alt="">
            <span @click="delGroup" class="pointer">批量删除</span>
          </el-col>
          <el-col :span="6" :offset="6">
            <input class="p-m-input" @keyup.enter="search" v-model="parame.words" placeholder="请输入姓名或编号">
          </el-col>
          <el-col :span="2">
            <el-button @click="search" :loading="this.$store.state.loading" class="search-btn" size="small">搜索</el-button>
          </el-col>
        </el-row>
      </section>
      <section class="el-table-wrap">
        <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="prisonerName" label="服刑人员姓名">
          </el-table-column>
          <el-table-column prop="pCoding" label="服刑人员编码">
          </el-table-column>
          <el-table-column prop="age" label="年龄">
          </el-table-column>
          <el-table-column prop="pType.label" label="服刑人员类型">
          </el-table-column>
          <el-table-column prop="comeTime" label="入监时间">
          </el-table-column>
          <el-table-column prop="crime.label" label="涉案罪名">
          </el-table-column>
          <el-table-column prop="during" label="服刑时长">
          </el-table-column>
          <el-table-column label="操作" width="255">
            <template slot-scope="scope">
              <div class="operating">
                <router-link tag="span" :to="{path:'/personnelposition',query:{name:scope.row.prisonerName}}">
                  <img :src="images.review" alt=""> 查看
                </router-link>
                <router-link tag="span" :to="{path:'/personnelposition',query:{name:scope.row.prisonerName}}">
                  <img :src="images.edit" alt="">编辑</router-link>
                <span @click="handleDelete(scope.$index, scope.row)">
                  <img :src="images.del" alt="">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <div class="el-pagination-wrap">
        <table-pagination :total="count" @change="pageChange"></table-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import tablePagination from '@/components/commons/tablePage.vue';

  import add from '@/assets/add.png';
  import del from '@/assets/del.png';
  import edit from '@/assets/edit.png';
  import review from '@/assets/review.png';
  import exportgroup from '@/assets/exportgroup.png';
  import importgroup from '@/assets/importgroup.png';

  export default {
    name: 'violation',
    components: {
      tablePagination
    },
    data() {
      return {
        count: 0, //总记录数
        images: {
          add: add,
          del: del,
          edit: edit,
          review: review,
          exportgroup: exportgroup,
          importgroup: importgroup,
        },
        parame: {
          words: ''
        },
        pagination: {
          totalRows: 0
        },
        multipleSelection: [],
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        dialogVisible: false,
        value7: '',
        value: '',
        // 服刑人员类型
        input: '',
        tableData: []
      }
    },
    mounted() {


      this.getTableDatas();
    },
    methods: {
      pageChange(page) {
        this.currentPage = page;
        this.getTableDatas(page);
      },
      // 获取表格数据
      getTableDatas(page) {
        this.parame = {
          "page": page || 1,
          'words': this.words
        }
        this.$ajxj.post('/getPManageDatas', this.parame).then((res) => {
          this.count = res.data.totalRows;
          this.tableData = res.data.items;
        }).catch(function (error) {
          console.log(error);
        }).then(function (error) {
          console.log(error);
        });
      },
      // 删除操作
      delPrisoner(delObj, delType) {
        // 批量删除参数是数组
        let delObjNames = null;
        // 要删除的对象
        this.$confirm('此操作将删除该服刑人员信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (delType === 'delGroup') { // 批量删除
            delObjNames = this.multipleSelection.map((item, index) => item.prisonerName);
          } else { // 单个删除
            delObjNames = delObj.prisonerName;
          }
          console.log(delObjNames);
          let parame = {
            "delIds": delObjNames
          }

          this.$ajxj.post('/getPManageDatas', parame).then((res) => {
            this.getTableDatas(this.currentPage || 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(function (error) {
            console.log(error);
          }).then(function (error) {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changeCurrent(val) {
        this.getTableDatas(val);
      },
      // 选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      // 查看
      handleReview(index, row) {
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row, p3) {
        console.log('p3', p3);

        this.delPrisoner(row, 'del')
      },
      // 批量删除
      delGroup() {
        if (this.multipleSelection.length === 0) {
          this.$message("请选择要删除的对象!")
        } else {
          this.delPrisoner(this.multipleSelection, 'delGroup')
        }
      },
      // 搜索
      search() {
        console.log('搜索');
        this.getTableDatas();
      },

      clear() {
        this.parame = {
          words: ''
        };
        this.getTableDatas();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
