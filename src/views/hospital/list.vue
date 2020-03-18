<template>
  <div class="app-container">

    <div>
      <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-plus" @click="handleAdd">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
      <el-table-column label="医院名称" align="center">
        <template slot-scope="scope">
          <router-link :to="'/hospital/view/'+scope.row.id" class="el-link el-link--primary is-underline patient_name">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <!--<el-button :loading="downloadLoading" type="primary" icon="el-icon-edit" @click="handleUpdate(row,scope.row.id)">-->
            <el-button :loading="downloadLoading" type="primary" icon="el-icon-edit" @click="handleUpdate(row,$index)">
            编辑
          </el-button>
          <el-button :loading="downloadLoading" type="danger" icon="el-icon-delete" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp">
        <el-form-item label="医院名称" :label-width="formLabelWidth">
          <el-input v-model="temp.name" placeholder="请输入医院名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="temp.address" placeholder="请输入地址" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        <!--<el-button type="primary" @click="handleAdd()">确 定</el-button>-->
        <el-button type="primary" @click="dialogStatus==='create'?addData():updateData(updateId)">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { fetchList,bb,aa } from '@/api/article'
import { hospitalList,hospitalAdd,hospitalUpdate,hospitalDel } from '@/api/hospital'

export default {
  name: 'ExportZip',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      formInline: {
        user: ''
      },
      updateId:undefined,
      dialogFormVisible: false,
      temp: {
        // id: undefined,
        name:'',
        address:''
      },
      textMap: {
        update: '编辑医院信息',
        create: '新增医院信息'
      },
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: 'type is required', trigger: 'change' }],
        address: [{ required: true, message: 'title is required', trigger: 'change' }]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      console.log(await hospitalList())
      const { data } = await hospitalList()
      this.list = data
      this.listLoading = false
    },

    handleDownload() {

    },
    handleEdit() {

    },
    handleDelete(row, index) {
      this.$confirm('确定删除此记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = {id: row.id};
        hospitalDel(row.id).then((res) => {
          this.listLoading = false;
          if(res.status == 0) {
            this.list.splice(index, 1)
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
    resetTemp() {
      this.temp = {
        // id: undefined,
        name:'',
        address:''
      }
    },
    // handleAdd() {
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = false
    //   console.log('发送post请求')
    //   hospitalAdd(this.temp).then(response => {
    //     console.log('发送post请求成功')
    //   })
    // },

    handleAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          hospitalAdd(this.temp).then((res) => {
            console.log('返回字段')
            console.log(res)
            this.list.unshift(res.data)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleUpdate(row) {
      console.log(row)
      console.log(row.id)
      this.updateId = row.id
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData(id) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          hospitalUpdate(id,this.temp).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },


    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
