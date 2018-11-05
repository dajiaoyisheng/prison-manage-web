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
                    <el-form-item label="适用范围" prop="psPersonrange">
                        <el-select v-model="form.psPersonrange">
                            <el-option v-for="item in scopes" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="日期类型" prop="psDatetype">
                    <el-checkbox-group v-model="form.psDatetype">
                        <el-checkbox v-for="item in dateTypes" :key="item.sCode" :label="item.sCode" name="dateType">{{ item.sName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="区域" prop="psArea">
                    <el-checkbox-group v-model="form.psArea">
                        <el-checkbox v-for="item in areas" :key="item.sCode" :label="item.sCode" name="area">{{ item.sName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
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
                form: {
                    psStarttime: '',
                    psEndtime: '',
                    psDuration: 1,
                    psMatter: "",
                    psAlerttype: "",
                    psPersonrange: "00",
                    psDatetype: [],
                    psArea: []
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
                    psPersonrange: [
                        { required: true, message: '请选择适用范围', trigger: 'blur' }
                    ],
                    psDatetype: [
                        { type: 'array', required: true, message: '请至少选择一个日期类型', trigger: 'change' }
                    ],
                    psArea: [
                        { type: 'array', required: true, message: '请至少选择一个区域', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            /** 保存作息表单 */
            submitForm: function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = { "saveItme": JSON.stringify(this.form) };
                        let url = this.$store.state.env + "/spriSchedule.action?method=saveDailyDates";
                        this.$post(url, data).then((respnose) => {
                            alert("保存成功");
                            this.resetForm('form');
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
                this.$refs[formName].resetFields();
            }
        },
        props: ['dateTypes', 'options', 'areas', 'scopes']
    }
</script>

<style scoped>
    #addDialog .el-row {
        margin-bottom: 0px;
    }
</style>