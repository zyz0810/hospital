<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="病人：">
          <el-select v-model="listQuery.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('filter',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院：">
          <el-select v-model="listQuery.hospital_name" class="filter-item" placeholder="请选择医院" @change="getHospital('filter',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" :data-id="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费项目：" >
          <!--<el-input v-model="doctor_name" placeholder="请输入医生姓名" style="width: 200px;" class="filter-item" @input="changeInput()"/>-->
          <el-select v-model="listQuery.project_name" class="filter-item" :placeholder="listQuery.hospital_id==undefined ?'请先选择医院':'请选择缴费项目'" :disabled="listQuery.hospital_id==undefined ? true:false" @change="changeProject('filter',$event)">
            <el-option v-for="item in projectsOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>


        </el-form-item>
        <el-form-item label="开始日期：">
          <el-date-picker v-model="listQuery.start_date" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker v-model="listQuery.end_date" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
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
      <el-table-column label="病人" align="center">
        <template slot-scope="scope">
            <!--{{ scope.row.patient_name }}-->
          <router-link :to="'/data/custorm/'+scope.row.patient_id" class="el-link el-link--primary is-underline patient_name">
            {{ scope.row.patient_name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="医院" align="center">
        <template slot-scope="scope">
          {{ scope.row.hospital_name }}
        </template>
      </el-table-column>
      <el-table-column label="医生" align="center">
        <template slot-scope="scope">
          {{ scope.row.doctor_name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="项目" align="center">
        <template slot-scope="scope">
          {{ scope.row.project_name }}
        </template>
      </el-table-column>
      <el-table-column label="缴费日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.pay_date }}
        </template>
      </el-table-column>
      <el-table-column label="缴费" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" class="text-right"/>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="病人" prop="patient_name">
          <el-select v-model="temp.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('add',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("add",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="医生" prop="doctor_name">
          <el-select v-model="temp.doctor_name" prop="doctor_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="temp.hospital_id==undefined ? true:false" @change="getDoctor('add',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project_name">
          <el-select v-model="temp.project_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择项目'" :disabled="temp.hospital_id==undefined ? true:false" @change="changeProject('add',$event)">
            <el-option v-for="item in projectsOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择缴费类型">
            <el-option v-for="(item,index) in statusOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="pay_date">
          <el-date-picker v-model="temp.pay_date" type="date" placeholder="请选择缴费日期" @change="changeStartDate" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="缴费数目" prop="amount">
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
  import { payList,payAdd,payUpdate,payDel,payCount } from '@/api/pay'
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
          page:1,
          page_size:10,
          patient_id: undefined,
          project_id: undefined,
          patient_name:'',
          project_name: '',
          start_date:'',
          end_date: ''
        },
        statusOptions:['门诊收入','住院收入'],
        hospitalOption:[],
        patientOption:[],
        temp: {
          patient_name: '',
          patient_id:undefined,
          hospital_id:undefined,
          doctor_id:undefined,
          project_id: undefined,
          project_name:'',
          doctor_name:'',
          hospital_name:'',
          pay_date: '',
          amount:''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          patient_name: [{ required: true, message: '请输入病人姓名', trigger: 'change',validator: isSelect }],
          hospital_name: [{ required: true, message: '请选择医院', trigger: 'change',validator: isSelect}],
          project_name:[{ required: true, message: '请选择项目', trigger: 'change',validator: isSelect }],
          doctor_name:[{ required: true, message: '请选择医生', trigger: 'change',validator: isSelect }],
          type:[{ required: true, message: '请选择缴费类型', trigger: 'change',validator: isSelect }],
          pay_date:[{ required: true, message: '请选择缴费日期', trigger: 'change',validator: isSelect }],
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
      this.getHospitalName()
    },
    methods: {
      changeStartDate(val){
        this.temp.pay_date=val
      },
      changeHref(val,e){
        if(val == 'add'){
          this.temp.patient_id= e
        }else if(val == 'filter'){
          this.listQuery.patient_id= e;
          this.listQuery.page = 1;
          // this.getList()
        }
        // if(e=='go'){
        //   this.$router.push('/data/patient')
        // }
      },
      changeProject(val,e){
        if(val == 'add'){
          this.temp.project_id= e
        }else if(val == 'filter'){
          this.listQuery.project_id= e
        }
      },
      getDoctor(val,e){
        if(val == 'add'){
          this.temp.doctor_id= e
        }else if(val == 'filter'){
          this.listQuery.doctor_id= e;
          // this.getList();
        }
      },
      remoteMethod(query) {
        if (query != '') {
          this.loading = true;
          nameSearch({prefix:query}).then((res) => {
            this.loading = false;
            this.patientOption = res.data
            // this.patientOption.push({id:'go',name:'没有找到，点击新增病人'});
          })
        } else {
          nameSearch({prefix:''}).then((res) => {
            this.loading = false;
            this.patientOption = res.data
            // this.patientOption.push({id:'go',name:'没有找到，点击新增病人'});
          })
        }
      },
      getList() {
        this.listLoading = true;
        const para = Object.assign({}, this.listQuery);
        para.page =  para.page - 1;
        if(para.start_date == ''){
          this.$delete(para,'start_date')
        }
        if(para.end_date == ''){
          this.$delete(para,'end_date')
        }
        this.$delete(para,'patient_name');
        this.$delete(para,'project_name');
        this.$delete(para,'hospital_name');
        payList(para).then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        });
        payCount(para).then(response => {
          this.total = response.data
        })
      },
      getCount(){
        const para = Object.assign({}, this.listQuery);
        para.page =  para.page - 1;
        if(para.start_date == ''){
          this.$delete(para,'start_date')
        }
        if(para.end_date == ''){
          this.$delete(para,'end_date')
        }
        this.$delete(para,'patient_name');
        this.$delete(para,'project_name');
        payCount(para).then(response => {
          this.total = response.data
        })
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
        projectsNameList(e).then(response => {
          this.projectsOption = response.data
        });
        if(val == 'add'){
          this.temp.hospital_id = e;
          this.temp.project_id = undefined;
          this.temp.project_name = '';
          this.temp.doctor_id = undefined;
          this.temp.doctor_name = ''
        }else if(val=='filter'){
          this.listQuery.hospital_id = e;
          this.listQuery.project_id = undefined;
          this.listQuery.project_name = '';
          // this.getList()
        }
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      resetTemp() {
        this.temp = {
          patient_name: '',
          patient_id:undefined,
          hospital_id:undefined,
          doctor_id:undefined,
          project_id: undefined,
          project_name:'',
          doctor_name:'',
          hospital_name:'',
          pay_date: '',
          amount:''
        }
      },
      handleCreate() {
        this.resetTemp();
        this.patientOption=[];
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$delete(this.temp,'patient_name');
            this.$delete(this.temp,'project_name');
            this.$delete(this.temp,'doctor_name');
            this.$delete(this.temp,'hospital_name');
            payAdd(this.temp).then((res) => {
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
        this.patientOption=[];
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
            this.$delete(this.temp,'patient_name');
            this.$delete(this.temp,'project_name');
            this.$delete(this.temp,'doctor_name');
            this.$delete(this.temp,'hospital_name');
            // this.$delete(this.temp,'id')
            const tempData = Object.assign({}, this.temp);
            payUpdate(id,tempData).then((res) => {
              const index = this.list.findIndex(v => v.id === this.temp.id);
              this.list.splice(index, 1, res.data);
              this.dialogFormVisible = false;
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
              payDel(row.id).then((res) => {
                this.listLoading = false;
                if(res.status == 0) {
                  this.list.splice(index, 1);
                  //NProgress.done();
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.getCount();
                }
              });
            }).catch(() => {

            });
      },
    }
  }
</script>
