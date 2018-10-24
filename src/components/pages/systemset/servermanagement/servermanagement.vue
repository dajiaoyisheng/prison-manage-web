<template>
    <div id="servermanagement" class="w1200">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="23" class="sm-header-title"><span>服务地址管理</span></el-col>
                    <el-col :span="1" class="sm-header-toolbar">
                        <el-button type="primary" size="mini" class="search-btn" @click="saveServerInfo()">保存</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card class="sm-main-item">
                            <div class="sm-main-item-header" slot="header"><span>消息中间件</span></div>
                            <div class="sm-main-item-content">
                                <el-row class="item">
                                    <el-col :span="6"><span>服务地址：</span></el-col>
                                    <el-col :span="14">
                                        <el-input placeholder="请输入服务地址" v-model="serverItem.address" clearable></el-input>
                                    </el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>用户名：</span></el-col>
                                    <el-col :span="14">
                                        <el-input placeholder="请输入用户名" v-model="serverItem.username" clearable></el-input>
                                    </el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>密码：</span></el-col>
                                    <el-col :span="14">
                                        <el-input placeholder="请输入密码" v-model="serverItem.password" clearable></el-input>
                                    </el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>队列名：</span></el-col>
                                    <el-col :span="14">
                                        <el-input placeholder="请输入队列名" v-model="serverItem.queuename" clearable></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="sm-main-item">
                            <div class="sm-main-item-header" slot="header"><span>视频分析引擎</span></div>
                            <div class="sm-main-item-content">
                                <el-row class="item">
                                    <el-col :span="6"><span style="line-height: 18px; vertical-align: middle;">视频分析引擎：</span></el-col>
                                    <el-col :span="14">
                                        <el-switch v-model="engineItem.switch" active-color="#13ce66" inactive-color="#ff4949" @change="insureChange()"></el-switch>
                                    </el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>启动/关闭服务地址：</span></el-col>
                                    <el-col :span="14"><el-input placeholder="请输入服务地址" v-model="engineItem.address" clearable></el-input></el-col>
                                </el-row> 
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card class="sm-main-item">
                            <div slot="header" class="clearfix">
                                <span>特殊作息来源服务地址</span>
                                <el-button style="color: #666; float: right; padding: 3px 0" type="text" icon="el-icon-plus" @click="addServerInfo()">新增</el-button>
                            </div>
                            <div class="sm-main-item-content" v-for="(item, key) in specialItems" :key="key" v-bind:class="{'active' : key!=0}" @mouseenter="enter('username', key)" @mouseleave="leave">
                                <el-row class="item">
                                    <el-col :span="6"><span>服务地址：</span></el-col>
                                    <el-col :span="14"><el-input placeholder="请输入服务地址" v-model="item.address" clearable></el-input></el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>用户名：</span></el-col>
                                    <el-col :span="14"><el-input placeholder="请输入用户名" v-model="item.username" clearable></el-input></el-col>
                                    <el-col :span="4" v-if="seen==('username' + key)" style="text-align: center; line-height: 40px;">
                                        <i style="cursor: pointer;" class="el-icon-circle-close-outline" @click="delServerInfo(key)"></i>
                                    </el-col>
                                </el-row>
                                <el-row class="item">
                                    <el-col :span="6"><span>密码：</span></el-col>
                                    <el-col :span="14"><el-input placeholder="请输入密码" v-model="item.password" clearable></el-input></el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                seen: null,
                serverItem: {},
                engineItem: {},
                specialItems: []
            }
        },
        methods: {
            /** 获取服务地址信息 */
            getServerInfo : function() {
                this.$ajxj.get('/getServerInfo').then((respnose) => {
                    this.serverItem = respnose.data.serverItem;
                    this.engineItem = respnose.data.engineItem;
                    this.specialItems = respnose.data.specialItems;
                    console.log("this.specialItems", this.specialItems);
                    
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 保存服务地址信息 */
            saveServerInfo : function() {
                let data = this.createModel();
                this.$ajxj.post('/saveServerInfo', data).then((respnose) => {
                    alert("保存成功");
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // todo somthing...
                });
            },
            /** 视频分析引擎修改确认 */
            insureChange : function() {
                if (this.engineItem.switch) {
                    this.$confirm('启动视频引擎?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                        this.engineItem.switch = false;
                    });
                } else {
                    this.$confirm('关闭视频引擎?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                        this.engineItem.switch = true;
                    });
                }
            },
            /** 增加特殊来源服务地址 */
            addServerInfo : function() {
                let newServer = {
                    address: '',
                    username: '',
                    password: ''
                }
                this.specialItems.unshift(newServer);
            },
            /** 删除特殊来源服务地址 */
            delServerInfo : function(key) {
                this.specialItems.splice(key, 1);
            },
            /** 移进特殊服务来源效果 */
            enter : function(key, username) {
                this.seen = key + username;
            },
            /** 移出特殊服务来源效果 */
            leave : function() {
                this.seen = null;
            },
            /** 创建参数模型 */
            createModel : function() {
                let data = { };
                data.serverItem = JSON.stringify(this.serverItem);
                data.engineItem = JSON.stringify(this.engineItem);
                data.specialItems = JSON.stringify(this.specialItems);
                return data;
            }
        },
        mounted() {
            this.getServerInfo();
        }
    }
</script>

<style scoped>
    .el-header {
        line-height: 60px;
    }

    .sm-header-title {
        color: #59c4ee;
        font-size: 18px;
    }

    .el-main {
        height: 100%;
        padding: 0px 10px;
    }

    .sm-main-item-header:before,
    .sm-main-item-header:after {
        display: table;
        content: "";
    }
    .sm-main-item-header:after {
        clear: both
    }

    .sm-main-item-content {
        font-size: 14px;
    }

    .sm-main-item-content span {
        line-height: 38px;
        vertical-align: middle;
    }

    .item {
        margin-bottom: 10px;
    }

    .active {
        border-top: 1px solid #ebeef5;
        padding-top: 10px;
    }
</style>