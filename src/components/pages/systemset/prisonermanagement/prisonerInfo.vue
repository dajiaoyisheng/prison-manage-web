<template>
  <div id="prisonInfo">
    <el-form :label-position="labelPosition" label-width="122px" :model="form" :rules="rules" ref="form" class="demo-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="罪犯编号" prop="criCode">
            <el-input style="width: 220px;" v-model="form.criCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="criIdcard">
            <el-input style="width: 220px;" v-model="form.criIdcard" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="criName">
            <el-input style="width: 220px;" v-model="form.criName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="criGender">
            <el-select v-model="form.criGender">
              <el-option v-for="item in sex" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="criBirthday">
            <el-date-picker v-model="form.criBirthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文化程度" prop="criEducation">
            <el-input style="width: 220px;" v-model="form.criEducation" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="criOrigin">
            <el-input style="width: 220px;" v-model="form.criOrigin" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职业" prop="criOccupation">
            <el-input style="width: 220px;" v-model="form.criOccupation" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所在公司" prop="criCompany">
            <el-input style="width: 220px;" v-model="form.criCompany" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务" prop="criDuties">
            <el-input style="width: 220px;" v-model="form.criDuties" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="罪名" prop="criAccusation">
            <el-input style="width: 220px;" v-model="form.criAccusation" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="刑期（月）" prop="criPrisonterm">
            <el-input-number style="width: 220px; margin-right:10px;" v-model="form.criPrisonterm" :precision="0" :step="1"
              :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="服刑开始日期" prop="criStartdate">
            <el-date-picker v-model="form.criStartdate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服刑结束日期" prop="criEnddate">
            <el-date-picker v-model="form.criEnddate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="监管类型" prop="criSupervisetype">
            <el-select v-model="form.criSupervisetype">
              <el-option v-for="item in superviseType" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任狱警" prop="criResponPolice">
            <el-input style="width: 220px;" v-model="form.criResponPolice" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="当前状态" prop="criCurstate">
            <el-select v-model="form.criCurstate">
              <el-option v-for="item in criState" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属监区" prop="criPriCode">
            <el-select v-model="form.criPriCode" @change="getRoomsByPrisonRegion">
              <el-option v-for="item in prisonRegions" :key="item.priCode" :label="item.priName" :value="item.priCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属监舍" prop="criPaiCode">
            <el-select v-model="form.criPaiCode">
              <el-option v-for="item in rooms" :key="item.paiCode" :label="item.paiName" :value="item.paiCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身前视觉码编号" prop="criFrontCode">
            <el-input style="width: 220px;" v-model="form.criFrontCode" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身后视觉码编号" prop="criBackCode">
            <el-input style="width: 220px;" v-model="form.criBackCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭联系人1" prop="criContact1">
            <el-input style="width: 220px;" v-model="form.criContact1" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="家庭联系人1电话" prop="criTel1">
            <el-input style="width: 220px;" v-model="form.criTel1" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭联系人2" prop="criContact2">
            <el-input style="width: 220px;" v-model="form.criContact2" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="家庭联系人2电话" prop="criTel2">
            <el-input style="width: 220px;" v-model="form.criTel2" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭联系人3" prop="criContact3">
            <el-input style="width: 220px;" v-model="form.criContact3" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="家庭联系人3电话" prop="criTel3">
            <el-input style="width: 220px;" v-model="form.criTel3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="criState">
            <el-select v-model="form.criState">
              <el-option v-for="item in state" :key="item.sCode" :label="item.sName" :value="item.sCode"></el-option>
            </el-select>
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
        saveType: "add",
        rooms: [],
        sex: [{
          "value": "男"
        }, {
          "value": "女"
        }],
        form: {
          criId: "",
          criCode: "",
          criIdcard: "",
          criName: "",
          criGender: "男",
          criBirthday: "",
          criEducation: "",
          criOrigin: "",
          criOccupation: "",
          criCompany: "",
          criDuties: "",
          criAccusation: "",
          criPrisonterm: "",
          criStartdate: "",
          criEnddate: "",
          criSupervisetype: "",
          criResponPolice: "",
          criCurstate: "",
          criPriCode: "",
          criPaiCode: "",
          criFrontCode: "",
          criBackCode: "",
          criContact1: "",
          criTel1: "",
          criContact2: "",
          criTel2: "",
          criContact3: "",
          criTel3: "",
          criState: ""
        },
        rules: {
          criCode: [{
          	required: true,
            message: '请输入罪犯编号',
            trigger: 'change'
          }],
          criIdcard: [{
            required: true,
            message: '请输入身份证号',
            trigger: 'change'
          }],
          criName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'change'
          }],
          criCurstate: [{
            required: true,
            message: '请选择当前状态',
            trigger: 'blur'
          }],
          criPriCode: [{
            required: true,
            message: '请选择所属监区',
            trigger: 'blur'
          }],
          criPaiCode: [{
            required: true,
            message: '请输入所属监舍',
            trigger: 'blur'
          }],
          criFrontCode: [{
            required: true,
            message: '请输入身前视觉码编号',
            trigger: 'blur'
          }],
          criBackCode: [{
            required: true,
            message: '请输入身后视觉码编号',
            trigger: 'blur'
          }],
          criState: [{
            required: true,
            message: '请选择当前状态',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      /** 提交新增用户 */
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              "saveType": this.saveType,
              "saveItem": JSON.stringify(this.form)
            };
            this.$post(this.urlconfig.spiSubmitForm, data).then((res) => {
              if (res.status === 0) {
                this.$message.success(response.statusinfo);
                this.resetForm('form');
              }
            }).catch((error) => {
              console.log(error);
            }).then(() => {
              // todo something...
            });
          } else {
            console.log('新增服刑人员失败');
            return false;
          }
        });
      },
      /** 重置表单信息 */
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },
      /** 查询服刑人员信息 */
      queryPrisonerInfo: function (saveType, criId) {
        this.saveType = saveType;
        let data = {
          "criId": criId
        };
        this.$post(this.urlconfig.spiQueryPrisonerInfo, data).then((res) => {
          if (res.status === 0) {
            this.form = res.data;
            this.getRoomsByPrisonRegion(this.form.criPriCode);
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      },
      /** 根据监区查找所有监舍 */
      getRoomsByPrisonRegion: function (priCode) {
        let data = {
          "priCode": priCode
        };
        this.$post(this.urlconfig.spiGetRoomsByPrisonRegion, data).then((res) => {
          if (res.status === 0) {
            this.rooms = res.data;
          }
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          // todo something...
        });
      }
    },
    props: ['superviseType', 'criState', 'state', 'prisonRegions']
  }

</script>

<style scoped>
  #prisonInfo .el-row {
    margin-bottom: 0px;
  }

  #prisonInfo .el-dialog__body {
    padding-bottom: 0px;
  }

</style>
