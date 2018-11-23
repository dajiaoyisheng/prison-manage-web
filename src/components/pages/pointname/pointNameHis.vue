<template>
    <div id="pointNameHis">
        <el-row style="text-align: center">
            {{ pointDate }} {{ pointTime }}点名情况
        </el-row>
        <el-row style="text-align:left; padding-left:15px; font-size:14px;">
            本次点名应到{{ totalCount }}人，已到{{ bottomTableData.length }}人，未到{{ topTableData.length }}人，详细信息如下：
        </el-row>
        <el-collapse v-model="activeNames">
            <el-collapse-item class="topItem" name="topItem" title="未识别人员列表">
                <el-table :data="topTableData" stripe style="width: 100%" height="255">
                    <el-table-column type="index"   width="50"></el-table-column>
                    <el-table-column label="编号"   prop="criCode"  align="center"></el-table-column>
                    <el-table-column label="姓名"   prop="criName"  align="center"></el-table-column>
                    <el-table-column label="状态"   align="center">
                        <template slot-scope="scope">未到</template>
                    </el-table-column>
                    <el-table-column label="备注"   prop="pnRemark" >
                        <template slot-scope="scope">
                            <div @click="changePnRemark(scope.$index + 'top', scope.row)">
                                <el-input size="small" v-model="tempRemark" v-show="current === scope.$index + 'top'" @blur="changePnRemarkBlur"></el-input>
                                <span v-show="current !== scope.$index + 'top'">{{scope.row.pnRemark}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
            <el-collapse-item class="bottomItem" title="已识别人员列表" name="bottomItem">
                <el-table :data="bottomTableData" stripe style="width: 100%" height="320">
                    <el-table-column type="index"   width="50"></el-table-column>
                    <el-table-column label="编号"   prop="criCode"  align="center"></el-table-column>
                    <el-table-column label="姓名"   prop="criName"  align="center"></el-table-column>
                    <el-table-column label="状态"   align="center">
                        <template slot-scope="scope">已到</template>
                    </el-table-column>
                    <el-table-column label="备注"   prop="pnRemark" >
                        <template slot-scope="scope">
                            <div @click="changePnRemark(scope.$index + 'bottom', scope.row)">
                                <el-input size="small" v-model="tempRemark" v-show="current === scope.$index + 'bottom'" @blur="changePnRemarkBlur"></el-input>
                                <span v-show="current !== scope.$index + 'bottom'">{{scope.row.pnRemark}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tempRow: null,
        current: null,
        tempRemark: '',
        totalCount: 0,
        pointDate: '',
        pointTime: '',
        topTableData: [],
        bottomTableData: [],
        activeNames: ['topItem']
      };
    },
    methods: {
        /** 初始化查询 */
        initQuery: function(nodeIdParameter, pointDateParameter, pointTimeParameter) {
            let data = { 
                "nodeId" : nodeIdParameter,
                "pointDate" : pointDateParameter,
                "pointTime" : pointTimeParameter
            };

            this.$post(this.urlconfig.pnGetPnHis, data).then((res) => {
                if (res.status === 0) {
                    this.tempRow = null;
                    this.current = null;
                    this.pointDate = res.data.pointDate;
                    this.pointTime = res.data.pointTime;
                    this.topTableData = res.data.unidentified;
                    this.bottomTableData = res.data.identified;
                    this.totalCount = this.topTableData.length + this.bottomTableData.length;
                }
            }).catch((error) => {
            console.log(error);
            }).then(() => {
            // todo somthing...
            });
        },
        /** 执行立即点名 */
        pointNameNow: function(parameter) {
            let data = { "parameter": JSON.stringify(parameter) };
            this.$post(this.urlconfig.pnPointNameNow, data).then((res) => {
                if (res.status === 0) {
                    this.pointDate = res.data.pointDate;
                    this.pointTime = res.data.pointTime;
                    this.topTableData = res.data.unidentified;
                    this.bottomTableData = res.data.identified;
                    this.totalCount = this.topTableData.length + this.bottomTableData.length;
                }
            }).catch((error) => {
            console.log(error);
            }).then(() => {
            // todo somthing...
            });
        },
        /** 修改备注信息 */
        changePnRemark: function(index, row) {
            this.tempRow = row;
            this.current = index;
            this.tempRemark = row.pnRemark;
        },
        /** 备注失去焦点 */
        changePnRemarkBlur: function() {
            if ((this.tempRow.pnRemark !== this.tempRemark) && (this.tempRemark != '')) {
                this.$confirm('备注信息已修改，是否保存?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        "pnID" : this.tempRow.pnID,
                        "pnRemark" : this.tempRemark
                    }

                    this.$post(this.urlconfig.pnSavePointName, data).then((res) => {
                        if (res.status === 0) {
                            this.tempRow.pnRemark = this.tempRemark;
                            this.tempRow = null;
                            this.current = null;
                        }
                    }).catch((error) => {
                        console.log(error);
                    }).then(() => {
                        // todo somthing...
                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.tempRow = null;
                this.current = null;
            }
        }
    }
}
</script>

<style scoped>
  .el-row {
    line-height: 30px;
    margin-bottom: 0px;
  }
</style>

<style>
  #pointNameHis .topItem td {
    color: red;
  }

  #pointNameHis .el-collapse-item__header {
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>