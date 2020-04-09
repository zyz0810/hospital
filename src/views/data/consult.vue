<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="病人：">
          <!--<el-input v-model="listQuery.patient_name" placeholder="姓名" style="width: 200px;" class="filter-item" />-->
          <el-select v-model="listQuery.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('filter',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row stripe style="width: 100%;">
      <el-table-column label="咨询日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.at_date }}
        </template>
      </el-table-column>
      <el-table-column label="病人" align="center">
        <template slot-scope="scope">
          <!--{{ scope.row.author }}-->
          <router-link :to="'/data/custorm/'+scope.row.patient_id" class="el-link el-link--primary is-underline patient_name">
            {{ scope.row.patient_name }}
          </router-link>
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
      <el-table-column label="平台" align="center">
        <template slot-scope="scope">
          {{ scope.row.platform }}
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="病人" prop="patient_name">
          <el-select v-model="temp.patient_name" filterable remote reserve-keyword placeholder="请输入姓名搜索" :remote-method="remoteMethod" :loading="loading" @change="changeHref('add',$event)">
            <el-option v-for="item in patientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询师" prop="consultant_name">
          <el-select v-model="temp.consultant_name" class="filter-item" placeholder="请选择咨询师" @change="getConsultantName('add',$event)">
            <el-option v-for="item in consultantOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="咨询内容" prop="content">
          <el-input v-model="temp.content" placeholder="请输入咨询内容" />
        </el-form-item>
        <el-form-item label="解答内容" prop="answer">
          <el-input v-model="temp.answer" placeholder="请输入解答内容"/>
        </el-form-item>
        <el-form-item label="咨询日期" prop="at_date">
          <el-date-picker v-model="temp.at_date" type="date" placeholder="请选择咨询日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-input v-model="temp.platform" placeholder="请输入平台"/>
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
  import { consultsList,consultsAdd,consultsUpdate,consultsDel,consultsCount } from '@/api/consults'
  import { consultantsNameList } from '@/api/consultants'
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
          console.log('没选')
        }else {
          callback();
        }
      };
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          patient_id:undefined,
          patient_name:'',
          start_date:'',
          end_date:'',
          page:1,
          page_size:10
        },
        consultantOptions:[],
        patientOption:[],
        temp: {
          patient_id:undefined,
          patient_name:'',
          consultant_id:undefined,
          consultant_name:'',
          content:'',
          answer:'',
          at_date:'',
          platform:''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改咨询信息',
          create: '新增咨询信息'
        },
        pvData: [],
        rules: {
          patient_name: [{ required: true, message: '请输入病人姓名', trigger: 'change',validator: isSelect }],
          consultant_name: [{ required: true, message: '请选择咨询师', trigger: 'change',validator: isSelect }],
          content: [{ required: true, message: '请输入咨询内容', trigger: 'change' }],
          answer: [{ required: true, message: '请输入解答内容', trigger: 'blur' }],
          at_date: [{ required: true, message: '请选择咨询日期', trigger: 'blur' }]
        },
        downloadLoading: false,
        loading:false
      }
    },
    created() {
      this.getList();
      this.getConsultant()
    },
    methods: {
      getConsultantName(val,e){
        if(val == 'add'){
          this.temp.consultant_id = e
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
          console.log('没参数')
          nameSearch({prefix:''}).then((res) => {
            this.loading = false;
            this.patientOption = res.data
            // this.patientOption.push({id:'go',name:'没有找到，点击新增病人'});
          })
        }
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
      getList() {
        this.listLoading = true
        const para = Object.assign({}, this.listQuery)
        this.$delete(para,'patient_name')
        para.page =  para.page - 1
        if(para.start_date == ''){
          this.$delete(para,'start_date')
        }
        if(para.end_date == ''){
          this.$delete(para,'end_date')
        }
        consultsList(para).then(response => {
          this.list = response.data
          // this.total = response.data.total
          this.listLoading = false
        })
        consultsCount(para).then(response => {
          this.total = response.data
        })
      },
      getCount() {
        const para = Object.assign({}, this.listQuery)
        this.$delete(para,'patient_name')
        para.page =  para.page - 1
        if(para.start_date == ''){
          this.$delete(para,'start_date')
        }
        if(para.end_date == ''){
          this.$delete(para,'end_date')
        }
        consultsCount(para).then(response => {
          this.total = response.data
        })
      },
      getConsultant() {
        consultantsNameList().then(response => {
          this.consultantOptions = response.data
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          patient_id:undefined,
          patient_name:'',
          consultant_id:undefined,
          consultant_name:'',
          content:'',
          answer:'',
          at_date:'',
          platform:''
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
            this.$delete(this.temp,'consultant_name');
            console.log(this.temp)
            consultsAdd(this.temp).then((res) => {
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
            this.$delete(this.temp,'patient_name');
            this.$delete(this.temp,'consultant_name');
            consultsUpdate(this.temp.id,this.temp).then((res) => {
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
          consultsDel(row.id).then((res) => {
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
