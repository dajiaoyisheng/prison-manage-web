<template>
    <div id="addDialog">
        <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="form" class="demo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始时间" prop="startTime">
                        <el-time-picker v-model="form.startTime"></el-time-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结束时间" prop="endTime">
                        <el-time-picker v-model="form.endTime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="动作" prop="option">
                        <el-select v-model="form.option">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="事项" prop="item">
                        <el-input style="width: 220px;" v-model="form.item" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="时长(小时)" prop="timeLen">
                        <el-input-number style="width: 220px; margin-right:10px;" v-model="form.timeLen" :precision="2" :step="0.1" :min="0" :max="24"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="适用范围" prop="scope">
                        <el-select v-model="form.scope">
                            <el-option v-for="item in scopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="日期类型" prop="dateType">
                    <el-checkbox-group v-model="form.dateType">
                        <el-checkbox v-for="item in dateTypes" :key="item.value" :label="item.value" name="dateType">{{ item.label }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="区域" prop="area">
                    <el-checkbox-group v-model="form.area">
                        <el-checkbox v-for="item in areas" :key="item.value" :label="item.value" name="area">{{ item.label }}</el-checkbox>
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
                    startTime: '',
                    endTime: '',
                    timeLen: 1,
                    item: "",
                    option: "",
                    scope: "",
                    dateType: [],
                    area: []
                },
                rules: {
                    startTime: [
                        { type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }
                    ],
                    timeLen: [
                        { type: 'number', required: true, message: '请输入时长', trigger: 'change' }
                    ],
                    item: [
                        { required: true, message: '请输入事项', trigger: 'blur' }
                    ],
                    option: [
                        { required: true, message: '请选择动作', trigger: 'blur' }
                    ],
                    scope: [
                        { required: true, message: '请选择适用范围', trigger: 'blur' }
                    ],
                    dateType: [
                        { type: 'array', required: true, message: '请至少选择一个日期类型', trigger: 'change' }
                    ],
                    area: [
                        { type: 'array', required: true, message: '请至少选择一个区域', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            /** 保存作息表单 */
            submitForm : function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajxj.post('/saveDailyDates', this.form).then((respnose) => {
                            alert("创建成功");
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
            resetForm : function(formName) {
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