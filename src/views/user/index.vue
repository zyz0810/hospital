<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
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
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" @click="handleUpdate(row)" icon="el-icon-edit">
            编辑
          </el-button>

          <el-button type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" class="text-right"/>-->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="temp.phone" placeholder="请输入联系电话" />
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

  import { consultantsList,consultantsAdd,consultantsUpdate,consultantsDel } from '@/api/consultants'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { validatePhoneTwo } from '@/utils/validate'


  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          name:''
        },
        updateId:undefined,
        temp: {
          name: '',
          phone: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改咨询师信息',
          create: '新增咨询师'
        },
        rules: {
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' },{validator:validatePhoneTwo}]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        consultantsList().then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.getList()
      },
      resetTemp() {
        this.temp = {
          name: '',
          phone: ''
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
            consultantsAdd(this.temp).then((res) => {
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
      updateData(id) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.$delete(this.temp,'id')
            const tempData = Object.assign({}, this.temp);
            consultantsUpdate(id,tempData).then((res) => {
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
          consultantsDel(row.id).then((res) => {
            this.listLoading = false;
            if(res.status == 0){
              this.list.splice(index, 1);
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            //NProgress.done();

            // this.getUsers();
          });
        }).catch(() => {

        });
      },
    }
  }
</script>
