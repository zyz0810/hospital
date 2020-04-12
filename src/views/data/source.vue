<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%;">
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
            {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入名称" />
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
  import { sourceList,sourceAdd,sourceUpdate,sourceDel } from '@/api/source'
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
        listLoading: true,
        temp: {
         name:''
        },
        textMap: {
          update: '编辑门诊来源信息',
          create: '新增门诊来源信息'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          name:[{ required: true, message: '请输入来源名称', trigger: 'change' }],
        },
        loading: false,
        updateId:undefined
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        sourceList().then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        });
      },

      resetTemp() {
        this.temp = {
          name:''
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
            sourceAdd(this.temp).then((res) => {
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
            const tempData = Object.assign({}, this.temp);
            sourceUpdate(id,tempData).then((res) => {
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
              sourceDel(row.id).then((res) => {
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
