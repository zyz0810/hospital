<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <el-steps :active="active" finish-status="finish" process-status="finish">
      <el-step title="挂号"></el-step>
      <el-step title="缴费明细"></el-step>
      <el-step title="住院"></el-step>
      <el-step title="手术"></el-step>
    </el-steps>

    <div v-if="active==0">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="病人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="来源：">
          <el-input v-model="form.source"></el-input>
        </el-form-item>
        <el-form-item label="医院：">
          <el-select v-model="form.hospital" placeholder="请选择活动区域">
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <el-option v-for="item in hospitalOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="挂号类型：">
          <el-select v-model="form.register" placeholder="请选择活动区域">
            <el-option v-for="item in registerOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="挂号科室：">
          <el-select v-model="form.department" placeholder="请选择活动区域">
            <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="挂号日期：">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="接诊医生：">
          <el-select v-model="form.doctor" placeholder="请选择活动区域">
            <el-option v-for="item in doctorOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="诊断结果：">
          <el-input v-model="form.result"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="active==1">
      <el-button class="filter-item" style="margin-left: 10px; margin-bottom: 20px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>
        <el-table-column label="治疗日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.display_time }}
          </template>
        </el-table-column>
        <el-table-column label="缴费" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>

            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="active==2">
      <el-button class="filter-item" style="margin-left: 10px; margin-bottom: 20px;" type="primary" icon="el-icon-edit" @click="handleCreateHospitalization">
        新增
      </el-button>
      <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="医院名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>
        <el-table-column label="病区" align="center">
          <template slot-scope="scope">
            {{ scope.row.display_time }}
          </template>
        </el-table-column>
        <el-table-column label="科室" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="出院方式" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>
        <el-table-column label="责任护士" align="center">
          <template slot-scope="scope">
            {{ scope.row.display_time }}
          </template>
        </el-table-column>
        <el-table-column label="主治医师" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="入院日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.display_time }}
          </template>
        </el-table-column>
        <el-table-column label="出院日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdateHospitalization(row)">
              编辑
            </el-button>

            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="active==3">
      <el-button class="filter-item" style="margin-left: 10px; margin-bottom: 20px;" type="primary" icon="el-icon-edit" @click="handleCreateOperation">
        新增
      </el-button>
      <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="手术名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>
        <el-table-column label="手术日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.display_time }}
          </template>
        </el-table-column>
        <el-table-column label="治疗结果" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdateOperation(row)">
              编辑
            </el-button>

            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="text-center">
      <el-button type="primary" style="margin-top: 12px;" @click="prev" v-if="active==1 || active==2 || active==3">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="active==0 || active==1 || active==2">下一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="goPatient" v-if="active==3">完成</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in patientOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="date" placeholder="请选择咨询日期" />
        </el-form-item>
        <el-form-item label="缴费数目" prop="phone">
          <el-input v-model="temp.phone" />
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
    <el-dialog :visible.sync="dialogFormVisibleHospitalization">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="医院" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in hospitalOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="病区" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in inpatientArea" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="科室" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="责任护士" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="主治医师" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in doctorOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="入院日期" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="date" placeholder="请选择咨询日期" />
        </el-form-item>
        <el-form-item label="出院日期" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="date" placeholder="请选择咨询日期" />
        </el-form-item>
        <el-form-item label="出院方式" prop="phone">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in dischargeOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleHospitalization = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibleOperation">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="手术名称" prop="author">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in patientOption" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="手术日期" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="date" placeholder="请选择咨询日期" />
        </el-form-item>
        <el-form-item label="手术结果" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleOperation = false">
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
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  export default {
    data() {
      return {
        active: 0,
        hospitalOption:['中山医院','省立医院','友好医院'],
        registerOption:['普通','免费','专家'],
        departmentOption:['骨科','神经科'],
        doctorOption:['李医生','王医生','郑医生','郝医生'],
        inpatientArea:['NUC','四病区'],
        dischargeOption:['痊愈','好转'],
        form:{
          name:'',
          source:'',
          hospital:'',
          register:'',
          department:'',
          date:'',
          doctor:'',
          result:'',
        },
        list: null,
        total: 0,
        listLoading: true,
        dialogFormVisible: false,
        dialogFormVisibleHospitalization:false,
        dialogFormVisibleOperation:false,
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        temp: {
          id: undefined,
          author: '',
          phone: ''
        },

        statusOptions: [ '男', '女'],
        patientOption:['张','王','李'],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      prev() {
        this.active--
        if (this.active < 0) this.active = 0;
      },
      next() {
        this.active++
        if (this.active > 3) this.active = 0;
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: '请选择',
          type: ''
        }
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreateHospitalization(){
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisibleHospitalization = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreateOperation(){
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisibleOperation = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              // this.$notify({
              //   title: 'Success',
              //   message: 'Created Successfully',
              //   type: 'success',
              //   duration: 2000
              // })
              this.$message({
                message: '增加成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdateHospitalization(row) {
    this.temp = Object.assign({}, row) // copy obj
    this.temp.timestamp = new Date(this.temp.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisibleHospitalization = true
    this.$nextTick(() => {
      this.$refs['dataForm'].clearValidate()
    })
  },
      handleUpdateOperation(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisibleOperation = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              const index = this.list.findIndex(v => v.id === this.temp.id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              // this.$notify({
              //   title: 'Success',
              //   message: 'Update Successfully',
              //   type: 'success',
              //   duration: 2000
              // })
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            })
          }
        })
      },
      handleDelete(row, index) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          // let para = { ids: ids };
          // batchRemoveUser(para).then((res) => {
          //   this.listLoading = false;
          //   //NProgress.done();
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   });
          //   this.getUsers();
          // });

          this.$message({
            message: '删除成功',
            type: 'success'
          });
          var that = this
          setTimeout(function () {
            that.listLoading = false;
          },2000)

          this.list.splice(index, 1)
        }).catch(() => {

        });
      },
      goPatient(){
        this.$router.push('/data/custorm/1')
      }
    }
  }
</script>
<style scoped>
  .app-container{
    padding: 50px 100px;
  }
  .el-steps{
    margin-bottom: 50px;
  }
  .el-form{
    width: 500px;
    /*margin: 0 auto;*/
  }
</style>
