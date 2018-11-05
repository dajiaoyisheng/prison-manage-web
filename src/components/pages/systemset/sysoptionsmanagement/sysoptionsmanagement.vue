<template>
    <div id="sysoptionsmanagement" class="w1200">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="23" class="som-header-title"><span>系统选项</span></el-col>
                    <el-col :span="1" class="som-header-toolbar">
                        <el-button type="primary" size="mini" class="search-btn" @click="saveSysOptions()">保存</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="15">
                        <span>无法定位允许最长时间：</span>
                        <el-input-number size="mini" v-model="optionMaxTime" controls-position="right" :min="1" :max="3600"></el-input-number>秒
                    </el-col>
                </el-row>
                <div>
                    <el-col :span="15">
                        <span>允许在卫生间中停留的最长时间：</span>
                        <el-input-number size="mini" v-model="stayMaxTime" controls-position="right" :min="1" :max="3600"></el-input-number>秒
                    </el-col>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '系统选项管理',
                optionMaxTime: 5,
                stayMaxTime: 6
            }
        },
        methods: {
            /** 获取系统选项 */
            getSysOptions : function() {
                let url = this.$store.state.env + "/systemOption.action?method=getSysOptions";
                this.$get(url).then((respnose) => {
                    this.optionMaxTime = respnose.data.optionMaxTime;
                    this.stayMaxTime = respnose.data.stayMaxTime;
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 保存系统选项 */
            saveSysOptions : function() {
                this.$confirm('是否保存?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = this.createModel();
                    let url = this.$store.state.env + "/systemOption.action?method=saveSysOptions";
                    this.$post(url, data).then((respnose) => {
                        alert("保存成功");
                    }).catch((error) => {
                        console.log(error);
                    }).then(() => {
                        // todo somthing...
                    });
                }).catch((error) => {
                    console.log(error);
                });
            },
            /** 创建参数模型 */
            createModel : function() {
                // 无法定位允许最长时间
                let option1 = { }
                option1.name = "optionMaxTime";
                option1.value = this.optionMaxTime;

                // 允许在卫生间中停留的最长时间
                let option2 = { }
                option2.name = "stayMaxTime";
                option2.value = this.stayMaxTime;
               
                // 系统选项参数集合
                let options = [];
                options.push(option1);
                options.push(option2);

                let data = { };
                data.options = JSON.stringify(options);
                return data;
            }
        },
        mounted() {
            this.getSysOptions();
        }
    }
</script>

<style scoped>
    .el-header {
        line-height: 60px;
    }

    .el-main {
        height: 100%;
        padding: 0px 20px;
    }

    .el-row {
        line-height: 60px;
    }

    .som-header-title {
        color: #59c4ee;
        font-size: 18px;
    }

    .el-input-number {
        margin-right: 5px;
    }
</style>