<template>
  <div class="w1200">
    <p class="contentInfo">服刑人员信息管理</p>
    <section class="contentMain">
      <section class="pm-t puu-params">
        <el-row :gutter="20" type="flex">
          <el-col :span="3">
            <img :src="images.add" alt="">
            <span>增加</span>
          </el-col>
          <el-col :span="3">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove"
              :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :file-list="fileList" :show-file-list="false">
              <img :src="images.importgroup" alt="">
              <span>批量导入</span>
            </el-upload>
          </el-col>
          <el-col :span="3">
            <img :src="images.exportgroup" alt="">
            <span>批量导出</span>
          </el-col>
          <el-col :span="3">
            <img :src="images.del" alt="">
            <span>批量删除</span>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-input size="small" class="p-m-input" v-model="input" placeholder="请输入姓名或编号">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="search" class="search-btn" size="small">搜索</el-button>
            <el-button class="return-btn" size="small">返回</el-button>
          </el-col>
        </el-row>
      </section>
      <section class="el-table-wrap">
        <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="date" label="服刑人员姓名">
          </el-table-column>
          <el-table-column prop="date" label="服刑人员编码">
          </el-table-column>
          <el-table-column prop="date" label="年龄">
          </el-table-column>
          <el-table-column prop="date" label="服刑人员类型">
          </el-table-column>
          <el-table-column prop="date" label="入监时间">
          </el-table-column>
          <el-table-column prop="date" label="涉案罪名">
          </el-table-column>
          <el-table-column prop="date" label="服刑时长">
          </el-table-column>
          <el-table-column label="操作" width="255">
            <template slot-scope="scope">
              <div class="operating">
                <router-link tag="span" to="/systemset/prisonermanagement/operation">
                  <img :src="images.review" alt=""> 查看
                </router-link>
                <router-link tag="span" to="/systemset/prisonermanagement/operation">
                  <img :src="images.edit" alt="">编辑</router-link>
                <span @click="handleDelete(scope.$index, scope.row)">
                  <img :src="images.del" alt="">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination-wrap text-center">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3"
            :page-size="10" layout="prev, pager, next, jumper" :total="this.page">
          </el-pagination>
        </div>
      </section>
    </section>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import add from '@/assets/add.png';
  import del from '@/assets/del.png';
  import edit from '@/assets/edit.png';
  import review from '@/assets/review.png';
  import exportgroup from '@/assets/exportgroup.png';
  import importgroup from '@/assets/importgroup.png';

  export default {
    name: 'violation',
    data() {
      return {
        images: {
          add: add,
          del: del,
          edit: edit,
          review: review,
          exportgroup: exportgroup,
          importgroup: importgroup,
        },

        loading: true,
        currentPage3: 1,
        page: 1,
        total: 21,
        multipleSelection: [],
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        // 时间筛选
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dialogVisible: false,
        value7: '',
        // 预警事件类型
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
        // 服刑人员类型
        input: '',
        // 
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.getTableData(val);
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleEdit(index, row) {
        console.log(index, row);
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
      handleDelete(index, row) {
        this.tableData.splice(index, 1);
        console.log(this.tableData);
      },
      // 批量删除
      delGroup() {
        if (this.multipleSelection.length === 0) {
          this.$message("请选择要删除的对象!")
        } else {
          // 要删除的对象
          this.$confirm('确认删除？')
            .then(_ => {
              var names = this.multipleSelection.map(item => item.name).join()
              console.log(names);
            })
            .catch(_ => {});
        }
      },
      // 搜索
      search() {

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

</style>
