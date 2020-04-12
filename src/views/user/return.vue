<template>
  <div class="app-container">
    <div>
      <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
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
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="temp.phone" placeholder="请输入联系电话" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { visitorsList,visitorsAdd,visitorsUpdate,visitorsDel } from '@/api/visitors'
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
        dialogFormVisible: false,
        temp: {
          name: '',
          phone:'',
        },
        dialogStatus: '',
        textMap: {
          update: '修改回访人员信息',
          create: '新增回访人员'
        },
        rules: {
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          phone:[{ required: true, message: '联系电话不能为空', trigger: 'blur' },{validator:validatePhoneTwo}]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true;
        const { data } = await visitorsList();
        this.list = data;
        this.listLoading = false
      },
      handleFilter() {
        this.getList()
      },
      resetTemp() {
        this.temp = {
          name: '',
          phone:'',
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
            visitorsAdd(this.temp).then((res) => {
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
            visitorsUpdate(this.temp.id,tempData).then((res) => {
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
          visitorsDel(row.id).then((res) => {
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
