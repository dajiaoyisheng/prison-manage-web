<template>
    <div id="userDialog">
        <el-form :label-position="labelPosition" label-width="100px" :model="form" :rules="rules" ref="form" class="demo-form">
            <el-row>
                <el-col>
                    <el-form-item label="用户名称" prop="userName">
                        <el-input style="width: 220px;" v-model="form.userName" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="用户密码" prop="passWord">
                        <el-input type="password" style="width: 220px;" v-model="form.passWord" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="确认密码" prop="insurePwd">
                        <el-input type="password" style="width: 220px;" v-model="form.insurePwd" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button size="small" @click="submitForm('form')" type="primary">保存</el-button>
                <el-button size="small" @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: "right",
                form: {
                    userName: '',
                    passWord: '',
                    insurePwd: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ],
                    insurePwd: [
                        { required: true, message: '请再次确认密码', trigger: 'blur' }
                    ]
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
        }
    }
</script>

<style scoped>