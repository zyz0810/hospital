<template>
  <div class="app-container">
    <div>
      <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="账户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
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
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <!--<input type="password" :value=" scope.row.permissions" class="text-center password_input"/>-->
          {{scope.row.permissions.join("，")}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="{row,$index}">
          <el-button :loading="downloadLoading" type="primary" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
          <el-button :loading="downloadLoading" type="danger" icon="el-icon-delete" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="right" label-width="120px">
        <el-form-item label="账户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入账户名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="所在医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("add",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <!--<el-input v-model="temp.userAgent" placeholder="请选择" autocomplete="off" />-->
          <el-checkbox-group v-model="temp.permissions">
            <el-checkbox :label="item" :key="item" v-for="item in perssionsList"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogUpdateVisible">
      <el-form ref="dataForm" :model="temp" :rules="rulesUpdate" label-position="right" label-width="120px">
        <el-form-item label="账户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入账户名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="所在医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("add",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <!--<el-input v-model="temp.userAgent" placeholder="请选择" autocomplete="off" />-->
          <el-checkbox-group v-model="temp.permissions">
            <el-checkbox :label="item" :key="item" v-for="item in perssionsList"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { permisionsList,accountsList,accountsPermissions,accountAdd,accountUpdate,accountDel } from '@/api/account'
  import { hospitalNameList } from '@/api/hospital'
  import { validatePhoneTwo,validateIdNo } from '@/utils/validate'
  import waves from '@/directive/waves' // waves directive
  export default {
    name: 'ExportZip',
    directives: { waves },
    data() {
      return {
        list: [],
        listLoading: true,
        downloadLoading: false,
        filename: '',
        listQuery: {
          name:''
        },
        dialogUpdateVisible:false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改账号信息',
          create: '新增账号信息'
        },
        hospitalOption:[],
        temp: {
          username:'',
          name: '',
          password:'',
          hospital_name:'',
          hospital_id:undefined,
          permissions:[]
        },
        rules: {
          username: [{ required: true, message: '请输入账号名', trigger: 'change' }],
          password:[{ required: true, message: '请输入密码', trigger: 'change' }]
        },
        rulesUpdate: {
          username: [{ required: true, message: '请输入账号名', trigger: 'change' }],
        },
        perssionsList:[],
        // perssionsSelectedList:[]
      }
    },
    mounted() {
      this.getList();
      this.getHospitalName();
    },
    methods: {
      async getList() {
        const { data } = await accountsList();
        this.listLoading = true;

        this.list = data;
        this.listLoading = false
        // const { res } = await permisionsList();
        permisionsList().then(res=>{
          this.perssionsList = res.data
        })

      },
      getHospitalName(){
        hospitalNameList().then(response => {
          this.hospitalOption = response.data
        })
      },
      getHospital(val,e){
        if(val == 'add'){
          this.temp.hospital_id = e;
        }else if(val=='filter'){
          this.listQuery.hospital_id = e;
          // this.getList()
        }
      },
      handleFilter() {
        this.getList()
      },
      resetTemp() {
        this.temp = {
          username:'',
          name: '',
          password:'',
          hospital_name:'',
          hospital_id:undefined,
          permissions:[]
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
            // this.temp.permissions = this.perssionsSelectedList;
            let tempData = Object.assign({},this.temp);
            this.$delete(tempData,'hospital_name');
            accountAdd(tempData).then((res) => {
              this.list.unshift(res.data);
              this.dialogFormVisible = false;
              this.$message({
                message: '增加成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleUpdate(row) {
        this.dialogStatus = 'update';
        this.temp.id = row.id;
        this.temp.name = row.name;
        this.temp.password = '';
        this.temp.username = row.username;
        this.temp.hospital_name = row.hospital_name;
        this.temp.hospital_id = row.hospital_id;
        this.temp.permissions=row.permissions;
        this.dialogUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            if (tempData.password == ''){
              this.$delete(tempData,'password');
            }
            this.$delete(tempData,'hospital_name');
            accountUpdate(this.temp.id,tempData).then((res) => {
              const index = this.list.findIndex(v => v.id === this.temp.id);
              this.list.splice(index, 1, res.data);
              this.dialogUpdateVisible = false;
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
          accountDel(row.id).then((res) => {
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
<style lang="scss" scoped>
  .password_input{
    width:100%;height:100%; border: none;background: transparent;
    &:focus,&:active {
      border: none;
      outline: none;
    }
  }
  .el-input{
    width: 300px;
  }
</style>
