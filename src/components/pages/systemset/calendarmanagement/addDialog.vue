<template>
    <div id="addDialog">
        <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="form" class="demo-form">
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker v-model="form.startTime"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker v-model="form.endTime"></el-time-picker>
            </el-form-item>
            <el-form-item label="时长" prop="timeLen">
                <el-input-number style="width: 220px; margin-right:10px;" v-model="form.timeLen" :precision="2" :step="0.1" :min="0" :max="24"></el-input-number>小时
            </el-form-item>
            <el-form-item label="事项" prop="item">
                <el-input style="width: 220px;" v-model="form.item" clearable></el-input>
            </el-form-item>
            <el-form-item label="动作" prop="option">
                <el-select v-model="form.option">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期类型" prop="dateType">
                <el-checkbox-group v-model="form.dateType">
                    <el-checkbox v-for="item in dateTypes" :key="item" :label="item.value" name="dateType">{{ item.label }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <el-checkbox-group v-model="form.area">
                    <el-checkbox v-for="item in areas" :key="item" :label="item.value" name="area">{{ item.label }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用范围">
                <el-transfer v-model="value1" :data="data"></el-transfer>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: "left",
                form: {
                    startTime: '',
                    endTime: '',
                    timeLen: 1,
                    item: "",
                    option: "",
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert("创建成功");
                        this.resetForm('form');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        props: ['dateTypes', 'options', 'areas']
    }
</script>

<style>

</style>