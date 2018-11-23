<template>
    <div id="addDialog">
        <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="form" class="demo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始时间" prop="psStarttime">
                        <el-time-picker v-model="form.psStarttime"></el-time-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结束时间" prop="psEndtime">
                        <el-time-picker v-model="form.psEndtime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="动作" prop="psAlerttype">
                        <el-select v-model="form.psAlerttype">
                            <el-option v-for="item in options" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="事项" prop="psMatter">
                        <el-input style="width: 220px;" v-model="form.psMatter" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="时长(小时)" prop="psDuration">
                        <el-input-number style="width: 220px; margin-right:10px;" v-model="form.psDuration" :precision="2" :step="0.1" :min="0" :max="24"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="规则类型" prop="ruleType">
                        <el-select v-model="form.ruleType">
                            <el-option v-for="item in ruleTypes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.ruleType === '01'">
                <el-col :span="12">
                    <el-form-item label="适用范围" prop="psPersonrange">
                        <el-select v-model="form.psPersonrange">
                            <el-option v-for="item in scopes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="日期类型" prop="psDatetype">
                        <el-checkbox-group v-model="form.psDatetype">
                            <el-checkbox v-for="item in dateTypes" :key="item.sCode" :label="item.sCode" name="dateType">{{ item.sName }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.ruleType === '01'">
                <el-form-item label="区域" prop="psArea">
                    <el-checkbox-group v-model="form.psArea">
                        <el-checkbox v-for="item in areas" :key="item.sCode" :label="item.sCode" name="area">{{ item.sName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-row>
            <el-row v-if="form.ruleType !== '01'">
                <el-col :span="12">
                    <el-form-item label="指定区域">
                       <el-cascader :options="prisonTree" @change="setPsArea"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="日期类型" prop="psDatetype">
                        <el-checkbox-group v-model="form.psDatetype">
                            <el-checkbox v-for="item in dateTypes" :key="item.sCode" :label="item.sCode" name="dateType">{{ item.sName }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="form.ruleType !== '01'">
                <el-col :span="24">
                    <el-form-item label="指定人员">
                        <!-- <el-collapse>
                            <el-collapse-item title="请选择">
                                <div style="height:200px;"><el-tree :data="criminalTree" show-checkbox node-key="id" @check-change="setCriminals"></el-tree></div>
                            </el-collapse-item>
                        </el-collapse> -->
                        <el-transfer v-model="form.criminals" :data="criminalList" :titles="['可选人员', '已选人员']"></el-transfer>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-form-item>
                        <el-button size="small" @click="submitForm('form')" type="primary">保存</el-button>
                        <el-button size="small" @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: "right",
                areas: [],
                scopes: [],
                prisonTree: [],
                criminalList: [],
                // criminalTree: [],
                form: {
                    psStarttime: '',
                    psEndtime: '',
                    psDuration: 1,
                    psMatter: "",
                    psAlerttype: "",
                    psPersonrange: "00",
                    psDatetype: [],
                    psArea: [],
                    ruleType: '01',
                    criminals: []
                },
                rules: {
                    psStarttime: [
                        { type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }
                    ],
                    psEndtime: [
                        { type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }
                    ],
                    psDuration: [
                        { type: 'number', required: true, message: '请输入时长', trigger: 'change' }
                    ],
                    psMatter: [
                        { required: true, message: '请输入事项', trigger: 'blur' }
                    ],
                    psAlerttype: [
                        { required: true, message: '请选择动作', trigger: 'blur' }
                    ],
                    ruleType: [
                        { required: true, message: '请选择规则类型', trigger: 'blur' }
                    ],
                    psPersonrange: [
                        { required: true, message: '请选择适用范围', trigger: 'blur' }
                    ],
                    psDatetype: [
                        { type: 'array', required: true, message: '请至少选择一个日期类型', trigger: 'change' }
                    ],
                    psArea: [
                        { type: 'array', required: true, message: '请至少选择一个区域', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            /** 初始化查询 */
            initQuery: function() {
                this.getAreas();
                this.getScopes();
                this.getPrisonTree();
                this.getCriminalList();
                // this.getCriminalTree();
            },
            /** 获取区域字典 */
            getAreas: function () {
                this.$get(this.urlconfig.scmGetAreas).then((res) => {
                    if (res.status === 0) {
                        this.areas = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo something...
                });
            },
            /** 获取适用范围字典 */
            getScopes: function () {
                this.$get(this.urlconfig.scmGetScopes).then((res) => {
                    if (res.status === 0) {
                        this.scopes = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 获取监狱树形 */
            getPrisonTree: function() {
                this.$get(this.urlconfig.scmGetPrisonSubRegions).then((res) => {
                    if (res.status === 0) {
                        this.prisonTree = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 获取人员列表 */
            getCriminalList: function() {
                this.$get(this.urlconfig.scmGetCriminalList).then((res) => {
                    if (res.status === 0) {
                        this.criminalList = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 获取服刑人员树形 */
            // getCriminalTree: function() {
            //     this.$get(this.urlconfig.scGetCriminalTree).then((res) => {
            //     if (res.status === 0) {
            //         this.criminalTree = res.data;
            //     }
            //     }).catch((error) => {
            //     console.log(error);
            //     }).then(() => {
            //     // todo somthing...
            //     });
            // },
            /** 保存作息表单 */
            submitForm: function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = { "saveItme": JSON.stringify(this.form) };
                        this.$post(this.urlconfig.scmSubmitForm, data).then((res) => {
                            if (res.status === 0) {
                                this.$message.success(res.statusinfo);
                                this.resetForm('form');
                            }
                        }).catch((error) => {
                            console.log(error);
                        }).then(() => {
                            // todo something...
                        });
                    } else {
                        console.log("保存日常作息失败");
                        return false;
                    }
                });
            },
            /** 重置作息表单 */
            resetForm: function(formName) {
                this.form.criminals = [];
                this.form.psDatetype = [];
                this.$refs[formName].resetFields();
            },
            /** 设置指定区域 */
            setPsArea: function(value) {
                this.psArea = [];
                this.form.psArea.push(value[value.length - 1]);
            },
            /** 设置指定人员 */
            // setCriminals: function(data, checked, indeterminate) {
            //     if (data.nodeType === '06') {
            //         if (checked) {
            //             this.form.criminals.push(data.id);
            //         } else {
            //             let index = this.form.criminals.findIndex(id => id === data.id);
            //             if (index > -1) {
            //                 this.form.criminals.splice(index, 1);
            //             }
            //         }
            //     }
            // }
        },
        props: ['dateTypes', 'options', 'ruleTypes']
    }
</script>

<style scoped>
    #addDialog .el-row {
        margin-bottom: 0px;
    }
</style>

<style>
    #addDialog .el-checkbox__label {
        font-size: 14px;
    }

    #addDialog .el-transfer-panel {
        width: 250px;
    }
</style>