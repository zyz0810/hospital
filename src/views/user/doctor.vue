<template>
  <div class="app-container">
    <div class="filter-container">
    <el-form :inline="true" :model="listQuery" class="search_form">
      <el-form-item label="所在医院：">
        <el-select v-model="listQuery.hospital_name" class="filter-item" placeholder="请选择医院" @change="getHospital('filter',$event)">
          <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>

    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所在医院" align="center">
        <template slot-scope="scope">
          {{ scope.row.hospital_name }}
        </template>
      </el-table-column>
      <el-table-column label="职位" align="center">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <!--<el-table-column label="联系电话" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.phone }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="{row,$index}">
          <el-button type="primary" @click="handleUpdate(row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择所在医院" @change="getHospital('add',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="temp.position" placeholder="请输入职位" autocomplete="off" />
        </el-form-item>
        <!--<el-form-item label="联系电话" prop="phone">-->
          <!--<el-input v-model="temp.phone" placeholder="请输入联系电话" autocomplete="off" />-->
        <!--</el-form-item>-->

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
  import { doctorList,doctorAdd,doctorUpdate,doctorDel } from '@/api/doctor'
  import { hospitalNameList } from '@/api/hospital'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { validatePhoneTwo } from '@/utils/validate'

export default {
  name: 'ExportZip',
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
    }
    return {
      list: null,
      hospitalOption:null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      listQuery: {
        hospital_name: '',
        hospital_id:undefined
      },
      dialogFormVisible: false,
      temp: {
        name: '',
        phone:'',
        hospital_id:undefined,
        hospital_name:'',
        position:''
      },
      dialogStatus: '',
      textMap: {
        update: '修改医生信息',
        create: '新增医生信息'
      },
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'change' }],
        phone: [{ required: true, message: '联系电话不能为空', trigger: 'change' },{validator:validatePhoneTwo}],
        hospital_name: [{ required: true, message: '请选择医院', trigger: 'change',validator: isSelect}],
      },
    }
  },
  created() {
    this.fetchData()
    this.gethospitalName()
  },
  methods: {
    getHospital(val,e){
      if(val == 'add'){
        this.temp.hospital_id = e
      }else if(val=='filter'){
        this.listQuery.hospital_id = e;
        this.fetchData()
      }
    },
    gethospitalName(){
      hospitalNameList().then(response => {
        this.hospitalOption = response.data
      })
    },
    async fetchData() {
      this.listLoading = true;
      const para = Object.assign({}, this.listQuery);
      this.$delete(para,'hospital_name');
      const { data } = await doctorList(para);
      this.list = data;
      this.listLoading = false
    },
    handleFilter() {
      this.fetchData()
    },
    resetTemp() {
      this.temp = {
        name: '',
        phone:'',
        hospital_id:undefined,
        hospital_name:'',
        position:''
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
        this.$delete(this.temp,'hospital_name');
          doctorAdd(this.temp).then((res) => {
            this.list.unshift(res.data);
            this.dialogFormVisible = false;
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          })
        }
      })
    },
    handleUpdate(row) {
      this.updateId=row.id;
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
          // this.$delete(this.temp,'id')
          const tempData = Object.assign({}, this.temp);
          this.$delete(tempData,'hospital_name');
          doctorUpdate(this.temp.id,tempData).then((res) => {
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
        doctorDel(row.id).then((res) => {
          this.listLoading = false;
          if(res.status == 0) {
            this.list.splice(index, 1);
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          // this.getUsers();
        });
      }).catch(() => {

      });
    },
  }
}
</script>
