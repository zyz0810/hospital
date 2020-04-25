<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="病人：">
          <el-select v-model="listQuery.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('filter',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门诊医院：">
          <el-select v-model="listQuery.hospital_name" class="filter-item" placeholder="请选择门诊医院" @change="getHospital('filter',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="看诊医生：" >
          <!--<el-input v-model="doctor_name" placeholder="请输入医生姓名" style="width: 200px;" class="filter-item" @input="changeInput()"/>-->
          <el-select v-model="listQuery.doctor_name" class="filter-item" :placeholder="listQuery.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="listQuery.hospital_id==undefined ? true:false" @change="getDoctor('filter',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id"/>
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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%;">
      <el-table-column label="门诊病人" align="center">
        <template slot-scope="scope">
          <router-link :to="'/data/custorm/'+scope.row.patient_id" class="el-link el-link--primary is-underline patient_name">
            {{ scope.row.patient_name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="门诊医院" align="center">
        <template slot-scope="scope">
          {{ scope.row.hospital_name }}
        </template>
      </el-table-column>
      <!--<el-table-column label="一级病种" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.disease_first_level_name }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="二级病种" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.disease_second_level_name }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="门诊日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.register_date }}
        </template>
      </el-table-column>
      <el-table-column label="接诊医生" align="center">
        <template slot-scope="scope">
          {{ scope.row.doctor_name }}
        </template>
      </el-table-column>
      <el-table-column label="诊断结果" align="center">
        <template slot-scope="scope">
          {{ scope.row.result }}
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center">
        <template slot-scope="scope">
          {{ scope.row.source }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button v-if="row.status!='deleted'" icon="el-icon-delete" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" class="text-right"/>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" :inline="true" label-width="120px" style="width: 600px; margin-left:50px;">
        <el-form-item label="病人" prop="patient_name">
          <el-select v-model="temp.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('add',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.source" class="filter-item" placeholder="请选择门诊来源" @change="getSource('add',$event)">
            <el-option v-for="item in sourceOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change="getHospital('add',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="接诊医生" prop="doctor_name">
          <el-select v-model="temp.doctor_name" prop="doctor_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="temp.hospital_id==undefined ? true:false" @change="getDoctor('add',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <!--<el-form-item label="病种" prop="disease_first_level_name">-->
          <!--&lt;!&ndash;<el-input v-model="temp.source" placeholder="请填写来源"/>&ndash;&gt;-->
          <!--<el-select v-model="temp.disease_first_level_name" class="filter-item" placeholder="请选择门诊病种" @change="getDisease('add',$event)">-->
            <!--<el-option v-for="item in diseaseOption" :key="item.id" :label="item.name" :value="item.id" />-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="" prop="disease_second_level_name">-->
          <!--&lt;!&ndash;二级病种&ndash;&gt;-->
          <!--<el-select v-model="temp.disease_second_level_name" class="filter-item" placeholder="请选择门诊病种" @change="getDiseaseLevel($event)">-->
            <!--<el-option v-for="item in levelDiseaseOption" :key="item.id" :label="item.name" :value="item.id" />-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item label="挂号类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择挂号类型">
            <el-option v-for="(item,index) in statusOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <!--<el-form-item label="挂号科室">-->
          <!--<el-select v-model="temp.department" class="filter-item" placeholder="请选择">-->
            <!--<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="门诊日期" prop="register_date">
          <el-date-picker v-model="temp.register_date" type="date" placeholder="请选择门诊日期" value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item label="诊断结果" prop="result">
          <el-input v-model="temp.result" placeholder="请输入诊断结果" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { outpatientList,outpatientAdd,outpatientUpdate,outpatientDel,outpatientCount } from '@/api/outpatient'
  import { sourceList } from '@/api/source'
  import { diseaseList,levelDiseaseList,getSecondDisease } from '@/api/disease'
  import { hospitalNameList,doctorList } from '@/api/hospital'
  import { nameSearch } from '@/api/patient'
  import waves from '@/directive/waves' // waves directive
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
        }
      };
      return {
        doctor_name:'',
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        levelDiseaseOption:[],
        listQuery: {
          page: 1,
          page_size:10,
          doctor_id: undefined,
          hospital_id: undefined,
          patient_id:undefined,
          doctor_name:'',
          hospital_name:'',
          patient_name:'',
          start_date: '',
          end_date: '',
        },
        hospitalOption:[],
        statusOptions: [ '普通', '专家','免费'],
        patientOption:[],
        temp: {
          patient_id: undefined,
          hospital_id: undefined,
          doctor_id:undefined,
          patient_name:'',
          hospital_name:'',
          doctor_name:'',
          type: '',
          // department:'',
          register_date:'',
          result:'',
          source_id:undefined,
          source:'',
          // disease_first_level_id:undefined,
          // disease_first_level_name:'',
          // disease_second_level_id:undefined,
          // disease_second_level_name:'',
        },
        diseaseOption:[],
        levelDisease:[],
        sourceOption:[],
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          patient_name: [{ required: true, message: '请填写病人姓名', trigger: 'change' ,validator: isSelect }],
          hospital_name:[{ required: true, message: '请选择医院', trigger: 'change',validator: isSelect  }],
          doctor_name:[{ required: true, message: '请选择医生', trigger: 'change',validator: isSelect  }],
          disease:[{ required: true, message: '请选择门诊病种', trigger: 'change',validator: isSelect  }],
          source:[{ required: true, message: '请选择门诊来源', trigger: 'change',validator: isSelect  }],
        },
        doctorOption: [],
        loading: false,
      }
    },
    created() {
      this.getList();
      this.gethospitalName();
      this.getOutData()
    },

    methods: {

      getHospital(val,e){
        doctorList(e).then(response => {
          this.doctorOption = response.data
        });
        if(val == 'add'){
          this.temp.hospital_id = e;
          this.temp.doctor_id = undefined;
          this.temp.doctor_name = '';
        }else if(val=='filter'){
          this.listQuery.hospital_id = e;
          this.listQuery.doctor_id = undefined;
          this.listQuery.doctor_name = '';
          // this.getList();
        }
      },
      getSource(val,e){
        if(val=='add'){
          this.temp.source_id = e
        }else if(val=='filter'){
          this.listQuery.source_id= e;
          // this.getList()
        }
      },
      getDisease(val,e){
        if(val=='add'){
          this.temp.disease_first_level_id = e;
          // 获取二级病种
          this.temp.disease_second_level_id=undefined;
          this.temp.disease_second_level_name='';
          // second_level_id
          // this.levelDiseaseOption =  this.levelDisease.find(item => {
          //   console.log(item.first_level_id)
          //   item.first_level_id == e
          // })

          getSecondDisease(e).then(response => {
            this.levelDiseaseOption = response.data
          });

        }else if(val=='filter'){
          this.listQuery.disease_id= e;
          // this.getList()
        }
      },
      getDiseaseLevel(e){
        this.temp.disease_second_level_id = e
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
        this.$delete(para,'hospital_name');
        this.$delete(para,'doctor_name');
        outpatientList(para).then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        });

        outpatientCount(para).then(response => {
          this.total = response.data
        });

      },
      getCount() {
        const para = Object.assign({}, this.listQuery);
        para.page =  para.page - 1
        if(para.start_date == ''){
          this.$delete(para,'start_date')
        }
        if(para.end_date == ''){
          this.$delete(para,'end_date')
        }
        this.$delete(para,'patient_name');
        this.$delete(para,'hospital_name');
        this.$delete(para,'doctor_name');
        outpatientCount(para).then(response => {
          this.total = response.data
        })
      },
      getOutData(){
        sourceList().then(response => {
          this.sourceOption = response.data
        });
        // diseaseList().then(response => {
        //   this.diseaseOption = response.data
        // });
        levelDiseaseList().then(response => {
          this.levelDisease = response.data
        });
      },
      gethospitalName(){
        hospitalNameList().then(response => {
          this.hospitalOption = response.data
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },

      resetTemp() {
        this.temp = {
          patient_id: undefined,
          hospital_id: undefined,
          doctor_id:undefined,
          patient_name:'',
          hospital_name:'',
          doctor_name:'',
          type: '',
          // department:'',
          register_date:'',
          result:'',
          source_id:undefined,
          source:'',
          // disease_first_level_id:undefined,
          // disease_first_level_name:'',
          // disease_second_level_id:undefined,
          // disease_second_level_name:'',
        }
      },
      handleCreate() {
        this.resetTemp();
        this.doctorOption = [];
        this.patientOption=[];
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        // this.$router.push('/data/addOutpatient')
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.temp); // copy obj
            this.$delete(param,'patient_name');
            this.$delete(param,'hospital_name');
            this.$delete(param,'doctor_name');
            this.$delete(param,'source');
            // this.$delete(param,'disease_first_level_name');
            // this.$delete(param,'disease_second_level_name');
            console.log(param)
            outpatientAdd(this.temp).then((res) => {
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
        // console.log(row)
        doctorList(row.hospital_id).then(response => {
          this.doctorOption = response.data
        });
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            if(!tempData.disease_second_level_id){
              this.$set(tempData,'disease_second_level_id','');
            }
            this.$delete(tempData,'patient_name');
            this.$delete(tempData,'hospital_name');
            this.$delete(tempData,'doctor_name');
            this.$delete(tempData,'source');
            // this.$delete(tempData,'disease_first_level_name');
            // this.$delete(tempData,'disease_second_level_name');
            outpatientUpdate(this.temp.id,tempData).then((res) => {
              // const index = this.list.findIndex(v => v.id === this.temp.id);
              // this.list.splice(index, 1, res.data);
              this.getList();
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
          outpatientDel(row.id).then((res) => {
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
<style scoped>
  .el-input{
    width: 200px;
  }
</style>
