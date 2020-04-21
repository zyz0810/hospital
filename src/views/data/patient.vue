<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="search_form">
        <el-form-item label="姓名：">
          <el-input v-model="listQuery.name" placeholder=" 请输入病人姓名" style="width: 200px;" class="filter-item" />
        </el-form-item>
        <el-form-item label="开始日期：">
          <el-date-picker v-model="listQuery.start_date" type="date" placeholder="选择开始日期" @change="changeStartDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期：">
          <el-date-picker v-model="listQuery.end_date" type="date" placeholder="选择结束日期" @change="changeEndDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>

    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%;">
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <router-link :to="'/data/custorm/'+scope.row.id" class="el-link el-link--primary is-underline patient_name">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center">
        <template slot-scope="scope">
          {{ scope.row.source }}
        </template>
      </el-table-column>

      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="最近咨询日期" align="center">
      <template slot-scope="scope">
        {{ scope.row.last_consult_date }}
      </template>
    </el-table-column>
      <el-table-column label="最近门诊日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.last_outpatient_date }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" class="text-right"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="temp.gender" class="filter-item" placeholder="请选择性别">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="temp.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idnum">
          <el-input v-model="temp.idnum"  placeholder="请输入身份证号码"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="tel" v-model="temp.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="所在省份" prop="province">
          <el-select v-model="temp.province" class="filter-item" placeholder="请选择所在省份">
            <el-option v-for="item in areaOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input type="text" v-model="temp.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="temp.comment"  placeholder="请输入备注"/>
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
  import { patientList,patientAdd,patientUpdate,patientDel,patientCount } from '@/api/patient'
  import { patientView } from '@/api/patient'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { validatePhoneTwo,validateIdNo } from '@/utils/validate'

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
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          name: '',
          start_date: '',
          end_date: '',
          page:1,
          page_size:10
        },
        statusOptions: [ '男', '女'],
        areaOptions:['北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省',
          '湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔族自治区','香港特别行政区','澳门特别行政区'],
        temp: {
          // id: undefined,
          name:'',
          gender:'',
          age:undefined,
          phone:'',
          comment:'',
          idnum:'',
          province:'',
          address:''
        },
        updateId:undefined,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改病人信息',
          create: '新增病人信息'
        },
        rules: {
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          // phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' },{validator:validatePhoneTwo}],
          // idnum:[{ required: true, message: '身份证号不能为空', trigger: 'blur' },{validator:validateIdNo}],
          province:[{ required: true, message: '请选择所在省份', trigger: 'blur'},{validator: isSelect  }],
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        const para = Object.assign({}, this.listQuery);
        para.page =  para.page - 1;
        patientList(para).then(response => {
          this.list = response.data;
          this.listLoading = false
        });
        patientCount(para).then(response => {
          this.total = response.data
        })
      },
      getCount() {
        const para = Object.assign({}, this.listQuery);
        para.page =  para.page - 1;
        patientCount(para).then(response => {
          this.total = response.data
        })
      },
      changeStartDate(val){
        this.listQuery.start_date=val
      },
      changeEndDate(val){
        this.listQuery.end_date=val
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList()
      },
      resetTemp() {
        this.temp = {
          name: '',
          gender:'',
          age:undefined,
          phone: '',
          comment:'',
          idnum:'',
          province:'',
          address:''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            patientAdd(this.temp).then((res) => {
              this.list.unshift(res.data);
              this.dialogFormVisible = false;
              this.getList();
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleUpdate(row) {
        this.updateId = row.id
        patientView(row.id).then(response => {
          this.temp = response.data
        });
        // this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData(id) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            patientUpdate(id,tempData).then(() => {
              const index = this.list.findIndex(v => v.id === this.temp.id);
              this.list.splice(index, 1, this.temp);
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
          patientDel(row.id).then((res) => {
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
