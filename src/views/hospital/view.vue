<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <div class="div_block">
      <div class="title">基本信息</div>
      <div class="clearfix top_info">
        <div class="fl edit">
          <el-form :model="formInline" label-width="80px">
            <el-form-item label="名称：">
              <el-input v-model="formInline.name" placeholder="名称" readOnly class="border-none" />
            </el-form-item>
            <el-form-item label="地址：">
              <el-input v-model="formInline.address" placeholder="地址" readOnly class="border-none" />
            </el-form-item>
          </el-form>
        </div>
        <div class="fl edit">
          <el-button type="primary" size="mini" @click="hospitalEdit" style="margin-bottom: 20px;">
            编辑
          </el-button>
        </div>
      </div>
    </div>
      <div class="div_block">

      <!--<div class="title">合作科室</div>-->
      <!--<el-table-->
      <!--ref="multipleTable"-->
      <!--v-loading="listLoading"-->
      <!--:data="list"-->
      <!--element-loading-text="拼命加载中"-->
      <!--border-->
      <!--fit-->
      <!--highlight-current-row-->
      <!--&gt;-->
      <!--&lt;!&ndash;      <el-table-column type="selection" align="center" />&ndash;&gt;-->
      <!--&lt;!&ndash;      <el-table-column align="center" label="Id" width="95">&ndash;&gt;-->
      <!--&lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
      <!--&lt;!&ndash;          {{ scope.$index }}&ndash;&gt;-->
      <!--&lt;!&ndash;        </template>&ndash;&gt;-->
      <!--&lt;!&ndash;      </el-table-column>&ndash;&gt;-->
      <!--<el-table-column label="咨询日期" width="220" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.display_time }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="客户" width="110" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<router-link :to="'/excel/custorm/'+scope.row.id">-->
      <!--{{ scope.row.author }}-->
      <!--</router-link>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="咨询师" width="115" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.pageviews }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="咨询内容">-->
      <!--<template slot-scope="scope">-->
      <!--&lt;!&ndash;          <i class="el-icon-time" />&ndash;&gt;-->
      <!--{{ scope.row.title }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->

        <div class="title">合作项目</div>
        <div class="div_table">
          <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('project')">新增</el-button>
          <el-table ref="multipleTable" v-loading="listLoading" :data="projectsList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="医院分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_share}}%
            </template>
          </el-table-column>
          <el-table-column label="医生分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_share}}%
            </template>
          </el-table-column>
          <el-table-column align="center" label="治疗中心分成比例">
            <template slot-scope="scope">
              {{scope.row.treatment_share}}%
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('project',row)">
                编辑
              </el-button>

              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('project',row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>



    </div>

    <div class="div_block">
      <div class="title">医院医生</div>
      <div class="div_table">
        <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('doctor')">新增</el-button>
        <el-table ref="multipleTable" v-loading="doctorListLoading" :data="doctorList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="职位" align="center">
            <template slot-scope="scope">
              {{ scope.row.position}}
            </template>
          </el-table-column>
          <el-table-column label="联系电话" align="center">
            <template slot-scope="scope">
              {{ scope.row.phone}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('doctor',row)">
                编辑
              </el-button>

              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('doctor',row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" v-if="dialogStatus==='createProject'||dialogStatus==='updateProject'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="temp.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="医院分成比例：" prop="hospitalShare">
          <el-input v-model="temp.hospital_share" placeholder="请输入医院分成比例" />
        </el-form-item>
        <el-form-item label="医生分成比例：" prop="doctorShare">
          <el-input v-model="temp.doctor_share" placeholder="请输入医生分成比例" />
        </el-form-item>
        <el-form-item label="治疗中心分成比例：" prop="treatmentShare">
          <el-input v-model="temp.treatment_share" placeholder="请输入治疗中心分成比例" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rulesDoctor" :model="doctorTemp" v-if="dialogStatus==='createDoctor'||dialogStatus==='updateDoctor'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="doctorTemp.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-input v-model="doctorTemp.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="doctorTemp.phone" placeholder="请输入联系电话" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createProject'||dialogStatus==='updateProject'" @click="dialogStatus==='createProject'?createData('project'):updateData('project')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createDoctor'||dialogStatus==='updateDoctor'" @click="dialogStatus==='createDoctor'?createData('doctor'):updateData('doctor')">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogHospitalVisible">
      <el-form ref="dataHospital" :rules="rules" :model="hospitalTemp" label-width="160px">
        <el-form-item label="医院名称">
          <el-input v-model="hospitalTemp.name" placeholder="请输入医院名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" >
          <el-input v-model="hospitalTemp.address" placeholder="请输入地址" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogHospitalVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="dialogHospitalVisible = false">确 定</el-button>-->
        <!--<el-button type="primary" @click="handleAdd()">确 定</el-button>-->
        <el-button type="primary" @click="editData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { hospitalUpdate,hospitalView,projectsList,projectsAdd,projectsUpdate,projectsDel } from '@/api/hospital'
import { doctorList,doctorAdd,doctorUpdate,doctorDel } from '@/api/doctor'
import { validatePhoneTwo } from '@/utils/validate'
export default {
  name: 'SelectExcel',
  data() {
    return {
      projectsList: null,
      statusOptions: [ '男', '女'],
      listLoading: true,
      doctorListLoading:true,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      formInline: {
        name: '',
        address: '',
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dialogFormVisible: false,
      dialogHospitalVisible:false,
      dialogStatus: '',
      textMap: {
        updateProject: '修改项目信息',
        createProject: '新增项目',
        updateDoctor: '修改医生信息',
        createDoctor: '新增医生'
      },
      rules: {
        name:[{ required: true, message: '请输入项目名称', trigger: 'change' }],
      },
      rulesDoctor: {
        name:[{ required: true, message: '请输入姓名', trigger: 'change' }],
        phone:[{ required: true, message: '联系电话不能为空', trigger: 'change' },{validator:validatePhoneTwo}]
      },
      temp: {
        name:'',
        hospital_share:'',
        doctor_share:'',
        treatment_share:'',
      },
      doctorTemp:{
        name:'',
        position:'',
        phone:'',
      },
      hospitalTemp:{
        name:'',
        address:''
      },
      updateId:undefined,
      projectId:undefined,
      doctorList:[]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var id = this.$route.params && this.$route.params.id;
      console.log('id:'+id)
      this.listLoading = true
      hospitalView(id).then(response => {
        this.formInline = response.data;
        this.listLoading = false
      });
      projectsList(id).then(response => {
        this.projectsList = response.data;
        this.listLoading = false
      });
      doctorList({hospital_id:id}).then(response => {
        this.doctorList = response.data;
        this.doctorListLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        name:'',
        hospital_share:'',
        doctor_share:'',
        treatment_share:'',
      }
    },
    resetDoctorTemp() {
      this.doctorTemp = {
        name:'',
        position:'',
        phone:'',
      }
    },
    handleCreate(name) {
      if(name == 'project'){
        this.resetTemp()
        this.dialogStatus = 'createProject'
      }else{
        this.resetDoctorTemp();
        this.dialogStatus = 'createDoctor'
      }
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData(name) {

      var id = this.$route.params && this.$route.params.id;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          if(name == 'project'){
            //增加项目
            projectsAdd(id,this.temp).then((res) => {
              this.projectsList.unshift(res.data)
              this.dialogFormVisible = false
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            })
          }else{
            //增加医生
            this.$set(this.doctorTemp,'hospital_id',id);
            doctorAdd(this.doctorTemp).then((res) => {
              this.doctorList.unshift(res.data);
              this.dialogFormVisible = false;
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            })
          }

        }
      })
    },
    handleUpdate(name,row) {
      console.log( this.updateId)
      console.log(row)
      if(name == 'project'){
        this.updateId = row.hospital_id
        this.projectId = row.id
        this.dialogStatus = 'updateProject'
        this.temp = Object.assign({}, row) // copy obj
      }else{
        this.dialogStatus = 'updateDoctor'
        this.doctorTemp = Object.assign({}, row) // copy obj
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData(name) {
      var hospitalId = this.$route.params && this.$route.params.id;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(name == 'project'){
            //修改项目
            const tempData = Object.assign({}, this.temp)
            projectsUpdate(hospitalId,tempData.id,tempData).then(() => {
              const index = this.projectsList.findIndex(v => v.id === this.temp.id)
              this.projectsList.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            })
          }else{
            //修改医生
            const tempData = Object.assign({}, this.doctorTemp)
            doctorUpdate(tempData.id,tempData).then((res) => {
              const index = this.doctorList.findIndex(v => v.id === this.doctorTemp.id);
              this.doctorList.splice(index, 1, res.data);
              this.dialogFormVisible = false;
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            })
          }

        }
      })
    },
    handleDelete(name,row, index) {
      this.$confirm('确定删除此记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        if(name == 'project'){
          this.listLoading = true;
          projectsDel(row.hospitalId,row.id).then((res) => {
            this.listLoading = false;
            if(res.status == 0) {
              this.projectsList.splice(index, 1);
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          });
        }else{
          this.doctorListLoading = true;
          doctorDel(row.id).then((res) => {
            this.doctorListLoading = false;
            if(res.status == 0) {
              this.doctorList.splice(index, 1);
              //NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            // this.getUsers();
          });
        }

      }).catch(() => {

      });


    },
    hospitalEdit(){
      // this.updateId = row.id
      console.log('检查获取的数据')
      console.log(this.formInline)
      this.hospitalTemp = Object.assign({}, this.formInline) // copy obj
      console.log(this.hospitalTemp)
      // this.dialogStatus = 'update'
      this.dialogHospitalVisible = true
      this.$nextTick(() => {
        this.$refs['dataHospital'].clearValidate()
      })
    },
    editData(){
      var id = this.$route.params && this.$route.params.id;
      this.$refs['dataHospital'].validate((valid) => {
        if (valid) {
          console.log('请求接口')
          console.log(this.hospitalTemp)
          hospitalUpdate(id,this.hospitalTemp).then((res) => {
            this.formInline = res.data
            this.$refs['dataHospital'].clearValidate()
            this.dialogHospitalVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          })
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    font-weight: bold;
    padding: 20px 20px 0 20px;
    /*position: relative;*/
    /*display: inline-block;*/
    /*padding: 50px 50px 15px 15px;*/
    /*font-size: 24px;*/
    /*color: white;*/
    /*<!--&::before{-->*/
      /*<!--content: '';-->*/
      /*<!--position: absolute;-->*/
      /*<!--top:0;left:0;right:0;bottom:0;-->*/
      /*<!--z-index: -1;-->*/
      /*<!--background: #168251;-->*/
      /*<!--transform: perspective(.5em) rotateX(5deg);-->*/
      /*<!--transform-origin: bottom left;-->*/
    /*<!--}-->*/
  }
  .div_block{
    /*padding: 20px;*/
    margin-bottom: 20px;
    background: #fff;
  }
  .el-form,.div_table{
    padding: 0 20px 20px 20px;
  }
  .top_info{
    display: flex;
    align-items: center;
    .edit{
      align-items: center;
      margin-right: 50px;
      /*padding-bottom: 50px;*/
      .el-form-item{
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }

</style>
