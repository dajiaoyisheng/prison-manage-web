<template>
    <div id="holidyDialog">
        <el-row style="line-height: 30px;">
            <el-col :span="5" :offset="19">
                <el-button title="增加行" type="text" icon="el-icon-circle-plus-outline" size="mini" @click="addRow()">增加行</el-button>
                <el-button title="保存" type="text" icon="el-icon-message" size="mini" @click="save()">保存</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border stripe style="width: 100%" height="500">
            <el-table-column label="名称" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name" clearable></el-input>
                </template>
            </el-table-column>
            <el-table-column label="开始日期" width="180px" align="center">
                <template slot-scope="scope">
                    <el-date-picker style="width: 150px" size="small" v-model="scope.row.startDate" type="date" placeholder="选择日期"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="结束日期" width="180px" align="center">
                <template slot-scope="scope">
                    <el-date-picker style="width: 150px" size="small" v-model="scope.row.endDate" type="date" placeholder="选择日期"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="日期类型" width="120px" align="center">
                <template slot-scope="scope">
                    <el-select size="small" v-model="scope.row.dateType" placeholder="请选择">
                        <el-option v-for="item in dateTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80px" align="center">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "节假日管理",
                tableData: []
            }
        },
        methods: {
            initTableData: function() {
                var _this = this;
                this.$ajxj.get('/getHolidayDates').then(function (respnose) {
                    _this.tableData = respnose.data;
                }).catch(function (error) {
                }).then(function () {
                    console.log(error);
                });
            },
            addRow: function() {
                var newRow = {
                    name: '',
                    startTime: "",
                    endTime: "",
                    dateType: ""
                }
                this.tableData.unshift(newRow);
            },
            deleteRow: function(index, row) {
                this.tableData.splice(index, 1);
            },
            save: function() {
                alert("成功保存:" + this.tableData.length + "条");
            }
        },
        mounted() {
            this.initTableData();
        },
        props: ['dateTypes']
    }
</script>

<style>

</style>
