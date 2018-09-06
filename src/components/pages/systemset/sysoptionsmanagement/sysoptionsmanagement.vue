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
                    <el-col :span="5"><span>无法定位允许最长时间：</span></el-col>
                    <el-col :span="10">
                        <el-input-number size="mini" v-model="optionMaxTime" controls-position="right" :min="1" :max="60"></el-input-number>分钟
                    </el-col>
                </el-row>
                <div>
                    <el-col :span="5"><span>允许在卫生间中停留的最长时间：</span></el-col>
                    <el-col :span="10">
                        <el-input-number size="mini" v-model="stayMaxTime" controls-position="right" :min="1" :max="60"></el-input-number>分钟
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
            saveSysOptions : function() {
                alert("无法定位允许最长时间：" + this.optionMaxTime);
                alert("允许在卫生间中停留的最长时间：" + this.stayMaxTime);
            }
        },
        mounted() {
            // 获取系统选项
            var _this = this;
            this.$ajxj.get('/getSysOptions').then(function (respnose) {
                _this.optionMaxTime = respnose.data.optionMaxTime;
                _this.stayMaxTime = respnose.data.stayMaxTime;
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                // TODO:always executed
            });
        }
    }
</script>

<style scoped>
    .el-header {
        border-bottom: 1px solid #333;
        line-height: 60px;
    }

    .el-main {
        height: 100%;
    }

    .el-row {
        line-height: 60px;
    }

    .som-header-title {
        font-size: 18px;
        font-weight: bold;
    }

    .el-input-number {
        margin-right: 5px;
    }
</style>