<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="医院：">
          <el-select v-model="listQuery.hospital_name" class="filter-item" placeholder="请选择医院" @change="getHospital('filter',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" :data-id="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="医生：" >
          <el-select v-model="listQuery.doctor_name" class="filter-item" :placeholder="listQuery.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="listQuery.hospital_id==undefined ? true:false" @change="changeDoctor('filter',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="项目：" >-->
          <!--<el-select v-model="listQuery.project_name" class="filter-item" placeholder="请选择项目" @change="changeProject('filter',$event)">-->
            <!--<el-option v-for="item in projectsOption" :key="item" :label="item" :value="item"/>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="开始日期：">
          <el-date-picker v-model="listQuery.start_month" type="month" placeholder="选择开始日期" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker v-model="listQuery.end_month" type="month" placeholder="选择结束日期" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>

    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%;">
      <el-table-column label="医生" align="center">
        <template slot-scope="scope">
            {{ scope.row.doctor_name }}
        </template>
      </el-table-column>
      <el-table-column label="医院名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.hospital_name }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.project_name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="创收总和" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="月份" align="center">
        <template slot-scope="scope">
          {{ scope.row.month }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button icon="el-icon-delete" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" class="text-right"/>-->

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("add",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="医生：" >
          <el-select v-model="temp.doctor_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="temp.hospital_id==undefined ? true:false" @change="changeDoctor('add',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-select v-model="temp.project_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择项目'" :disabled="temp.hospital_id==undefined ? true:false" @change="changeProject('add',$event)">
            <el-option v-for="item in projectsOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择类型">
            <el-option v-for="item in typeOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="month">
          <el-date-picker v-model="temp.month" type="month" placeholder="请选择咨询日期" value-format="yyyy-MM" />
        </el-form-item>
        <el-form-item label="创收总和" prop="amount">
          <el-input v-model="temp.amount" placeholder="请输入金额" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData(updateId)">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { doctorIncomeList,doctorIncomeAdd,doctorIncomeUpdate,doctorIncomeDel } from '@/api/doctor'
  import { hospitalNameList,doctorList,projectsNameList } from '@/api/hospital'
  import { nameSearch } from '@/api/patient'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    data() {
      //自定义下拉框校验函数
      const isSelect = (rule, value, callback) => {
        if (value == 0) { //如果值是 0，提示用户选择正确的选项

          return callback(new Error("请正确选择一级标题"));
        } else if(value == undefined){

        }else {
          callback();
          // return callback(new Error("请选择一级标题"));
        }
      };
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          // page:1,
          // page_size:10,
          hospital_id: undefined,
          doctor_id:undefined,
          hospital_name:'',
          doctor_name:'',
          start_month:'',
          end_month: ''
        },
        hospitalOption:[],
        patientOption:[],
        typeOption:['门诊','住院'],
        temp: {
          hospital_id:undefined,
          doctor_id:undefined,
          project_name:'',
          hospital_name:'',
          doctor_name:'',
          month: '',
          amount:'',
          type:''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          doctor_name: [{ required: true, message: '请输入医生姓名', trigger: 'change',validator: isSelect }],
          hospital_name: [{ required: true, message: '请选择医院', trigger: 'change',validator: isSelect}],
          project_name:[{ required: true, message: '请选择项目名称', trigger: 'change',validator: isSelect }],
          month:[{ required: true, message: '请选择缴费日期', trigger: 'change',validator: isSelect }],
          amount:[{ required: true, message: '请填写缴费数目', trigger: 'change' }],
        },
        projectsOption:[],
        doctorOption:[],
        loading: false,
        updateId:undefined
      }
    },
    created() {
      this.getList();
      this.getHospitalName();
      // this.getprojectsName()
    },
    methods: {
      changeDoctor(val,e){
        if(val == 'add'){
          this.temp.doctor_id= e
        }else if(val == 'filter'){
          this.listQuery.doctor_id= e;
          this.getList()
        }
      },
      changeProject(val,e){
        if(val == 'add'){
          this.temp.project_id= e
        }else if(val == 'filter'){
          this.listQuery.project_id= e
        }
      },

      getList() {
        this.listLoading = true;
        const para = Object.assign({}, this.listQuery);
        if(para.start_month == ''){
          this.$delete(para,'start_month')
        }
        if(para.end_month == ''){
          this.$delete(para,'end_month')
        }
        this.$delete(para,'hospital_name');
        this.$delete(para,'doctor_name');
        doctorIncomeList(para).then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        });
      },
      getHospitalName(){
        hospitalNameList().then(response => {
          this.hospitalOption = response.data
        })
      },
      getHospital(val,e){
        doctorList(e).then(response => {
          this.doctorOption = response.data
        });

        if(val == 'add'){
          projectsNameList(e).then(response => {
            this.projectsOption = response.data
          });
          this.temp.hospital_id = e;
          this.temp.project_id = undefined;
          this.temp.project_name = '';
          this.temp.doctor_id = undefined;
          this.temp.doctor_name = '';
        }else if(val=='filter'){
          this.listQuery.hospital_id = e;
          this.listQuery.doctor_id = undefined;
          this.listQuery.doctor_name = '';
          this.getList()
        }
      },
      handleFilter() {
        this.getList()
      },
      resetTemp() {
        this.temp = {
          hospital_id:undefined,
          doctor_id:undefined,
          project_name:'',
          hospital_name:'',
          doctor_name:'',
          month: '',
          amount:'',
          type:''
        }
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$delete(this.temp,'doctor_name');
            this.$delete(this.temp,'hospital_name');
            this.$delete(this.temp,'project_name');
            doctorIncomeAdd(this.temp).then((res) => {
              this.list.unshift(res.data);
              this.dialogFormVisible = false;
              this.getList();
              this.$message({
                message: '增加成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row); // copy obj
        this.updateId = row.id;
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData(id) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$delete(this.temp,'doctor_name');
            this.$delete(this.temp,'hospital_name');
            this.$delete(this.temp,'project_name');
            const tempData = Object.assign({}, this.temp)
            doctorIncomeUpdate(id,tempData).then((res) => {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, res.data)
              this.dialogFormVisible = false
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleDelete(row, index) {
            this.$confirm('确定删除此记录吗?', '提示', {
              type: 'warning'
            }).then(() => {
              this.listLoading = true;
              //NProgress.start();
              let para = {id: row.id};
              doctorIncomeDel(row.id).then((res) => {
                this.listLoading = false;
                if(res.status == 0) {
                  this.list.splice(index, 1);
                  //NProgress.done();
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }
              });
            }).catch(() => {

            });
      },
    }
  }
</script>
