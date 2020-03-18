<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <div class="div_block">
      <div class="title">基本信息</div>
      <el-form :inline="true" :model="patientInfo" label-width="120px" label-position="right">
        <el-form-item label="姓名：">
          <el-input v-model="patientInfo.name" readOnly class="border-none"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="patientInfo.idnum" readOnly class="border-none"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="patientInfo.gender" readOnly class="border-none"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="patientInfo.age" readOnly class="border-none"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="patientInfo.phone" readOnly class="border-none"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="patientInfo.province+patientInfo.address" readOnly class="border-none"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="div_block">
      <div class="title">门诊记录</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="outlistLoading" :data="outList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="门诊日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.register_date }}
            </template>
          </el-table-column>
          <el-table-column label="门诊医院" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_name }}
            </template>
          </el-table-column>
          <el-table-column label="科室" align="center">
            <template slot-scope="scope">
              {{ scope.row.register_department }}
            </template>
          </el-table-column>
          <el-table-column label="看诊医生" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_name }}
            </template>
          </el-table-column>
          <el-table-column label="看诊结果" align="center">
            <template slot-scope="scope">
              {{ scope.row.result }}
            </template>
          </el-table-column>
          <el-table-column label="挂号类别" align="center">
            <template slot-scope="scope">
              {{ scope.row.register_level }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源">
            <template slot-scope="scope">
              {{ scope.row.patient_source }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block">
      <div class="title">缴费明细</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="paylistLoading" :data="payList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.project_name }}
            </template>
          </el-table-column>
          <el-table-column label="日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.pay_date }}
            </template>
          </el-table-column>

          <el-table-column label="缴费" align="center">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column label="医院分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_share }}
            </template>
          </el-table-column>
          <el-table-column label="医生分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_share }}
            </template>
          </el-table-column>
          <el-table-column label="治疗中心分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.treatment_share }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="div_block">
      <div class="title">手术项目</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="operationlistLoading" :data="operationList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="手术日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>

          <el-table-column label="手术结果" align="center">
            <template slot-scope="scope">
              {{ scope.row.result }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="div_block">
      <div class="title">住院信息</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="hospitalizationlistLoading" :data="hospitalizationList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="医院名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_name }}
            </template>
          </el-table-column>
          <el-table-column label="病区" align="center">
            <template slot-scope="scope">
              {{ scope.row.region }}
            </template>
          </el-table-column>

          <el-table-column label="科室" align="center">
            <template slot-scope="scope">
              {{ scope.row.department }}
            </template>
          </el-table-column>

          <el-table-column label="出院方式" align="center">
            <template slot-scope="scope">
              {{ scope.row.leave_type }}
            </template>
          </el-table-column>
          <el-table-column label="责任护士" align="center">
            <template slot-scope="scope">
              {{ scope.row.nurse }}
            </template>
          </el-table-column>

          <el-table-column label="主治医师" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_name }}
            </template>
          </el-table-column>
          <el-table-column label="入院日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.in_date }}
            </template>
          </el-table-column>
          <el-table-column label="出院日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.leave_date }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block">
      <div class="title">咨询信息</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="consultsListLoading" :data="consultsList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="咨询日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>
          <el-table-column label="咨询师" align="center">
            <template slot-scope="scope">
              {{ scope.row.consultant_name }}
            </template>
          </el-table-column>
          <el-table-column label="咨询内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column label="解答内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.answer }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block">
      <div class="title">回访内容</div>
      <div class="div_table">
        <el-table ref="multipleTable" v-loading="returnListLoading" :data="returnList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="回访日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>
          <el-table-column label="回访人员" align="center">
            <template slot-scope="scope">
              {{ scope.row.visitor_name }}
            </template>
          </el-table-column>
          <el-table-column label="回访内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { patientView,patientOutList,patientPayList,patientHospitalizationList,patientOperationList,patientConsultsList,patientReturnList } from '@/api/patient'

  export default {
    name: 'SelectExcel',
    data() {
      return {
        list: null,
        listLoading: true,
        outlistLoading:true,
        paylistLoading:true,
        operationlistLoading:true,
        hospitalizationlistLoading:true,
        operationlistLoading:true,
        consultsListLoading:true,
        returnListLoading:true,
        multipleSelection: [],
        downloadLoading: false,
        patientInfo:{},
        outList:[],
        payList:[],
        consultsList:[],
        operationList:[],
        hospitalizationList:[],
        returnList:[],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        var id = this.$route.params && this.$route.params.id;
        patientView(id).then(response => {
          this.patientInfo = response.data
        });
        this.outlistLoading = true;
        this.paylistLoading = true
        this.hospitalizationlistLoading = true
        this.operationlistLoading = true
        this.consultsListLoading = true
        this.returnListLoading = true
        patientOutList(id).then(response => {
          this.outList = response.data;
          this.outlistLoading = false
        });
        patientPayList(id).then(response => {
          this.payList = response.data;
          this.paylistLoading = false
        });
        patientHospitalizationList(id).then(response => {
          this.hospitalizationList = response.data;
          this.hospitalizationlistLoading = false
        });
        patientOperationList(id).then(response => {
          this.operationList = response.data;
          this.operationlistLoading = false
        });
        patientConsultsList(id).then(response => {
          this.consultsList = response.data;
          this.consultsListLoading = false
        });
        patientReturnList(id).then(response => {
          this.returnList = response.data;
          this.returnListLoading = false
        });
      },

    }
  }
</script>
<style scoped>
  .div_block{
       /*padding: 20px;*/
       margin-bottom: 20px;
       background: #fff;
     }
  .title{
    font-weight: bold;
    padding: 20px 20px 0 20px;
    /*border-bottom: 1px solid #333;*/
  }
  .el-form,.div_table{
    padding: 0 20px 20px 20px;
  }
  .el-form-item{
    width: 36%;
  }
</style>
