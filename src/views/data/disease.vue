<template>
  <div class="app-container">
    <div class="title">一级列表</div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate('one')">
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
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row,'one')">
            编辑
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete(row,$index,'one')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


<!--    二级列表-->
    <div class="title">二级列表</div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate('two')">
        新增
      </el-button>
    </div>
    <el-table :key="levelKey" v-loading="levelListLoading" :data="levelList" stripe border fit highlight-current-row style="width: 100%; margin-top: 20px;">
      <el-table-column label="一级名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.first_level_name }}
        </template>
      </el-table-column>
      <el-table-column label="二级名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.second_level_name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(row,'two')">
            编辑
          </el-button>
          <el-button icon="el-icon-delete" type="danger" @click="handleDelete(row,$index,'two')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" class="text-right"/>-->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="first_level_name" v-if="createLevel == 'two' || updateLevel == 'two'">
          <el-select v-model="temp.first_level_name" class="filter-item" placeholder="请选择一级病种" @change="changeDisease($event)">
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入病种名称" />
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogLevelVisible">
      <el-form ref="levelForm" :rules="rules" :model="updateLevelTemp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="first_level_name">
          <el-select v-model="updateLevelTemp.first_level_name" class="filter-item" placeholder="请选择一级病种" @change="changeDisease($event)">
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="second_level_name">
          <el-input v-model="updateLevelTemp.second_level_name" placeholder="请输入病种名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLevelVisible = false">
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
  import { diseaseList,diseaseAdd,diseaseUpdate,diseaseDel,levelDiseaseList,levelDiseaseAdd,levelDiseaseUpdate,levelDiseaseDel } from '@/api/disease'
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
        levelKey:1,
        list: null,
        levelList:null,
        total: 0,
        levelListLoading: true,
        listLoading: true,
        temp: {
          first_level_name:'',
          first_level_id:undefined,
          name:''
        },
        updateLevelTemp: {
          first_level_name:'',
          first_level_id:undefined,
          name:'',
          second_level_name:''
        },
        textMap: {
          update: '编辑门诊病种信息',
          create: '新增门诊病种信息'
        },
        dialogFormVisible: false,
        dialogLevelVisible:false,
        dialogStatus: '',
        rules: {
          name:[{ required: true, message: '请输入病种名称', trigger: 'change' }],
          second_level_name:[{ required: true, message: '请输入病种名称', trigger: 'change' }],
        },
        loading: false,
        updateId:undefined,
        createLevel:'',
        updateLevel:'',
        deleteLevel:''
      }
    },
    created() {
      this.getList();
      this.getLevelList();
    },
    methods: {
      changeDisease(e){
        this.temp.first_level_id = e;
      },
      getList() {
        this.listLoading = true;
        diseaseList().then(response => {
          this.list = response.data;
          // this.total = response.data.total
          this.listLoading = false
        });
      },
      getLevelList() {
        this.listLoading = true;
        levelDiseaseList().then(response => {
          this.levelList = response.data;
          // this.total = response.data.total
          this.levelListLoading = false
        });
      },
      resetTemp() {
        this.temp = {
          first_level_name:'',
          first_level_id:undefined,
          name:''
        }
      },
      handleCreate(name) {
        this.resetTemp();
        this.createLevel = name;
        this.updateLevel = 'one';
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.createLevel == 'one'){
              let params = Object.assign({},this.temp);
              this.$delete(params,'first_level_id');
              this.$delete(params,'first_level_name');
              diseaseAdd(params).then((res) => {
                this.list.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '增加成功',
                  type: 'success'
                });
              })
            }else if(this.createLevel=='two'){
              let params = Object.assign({},this.temp);
              this.$delete(params,'first_level_name');
              levelDiseaseAdd(params).then((res) => {
                this.levelList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '增加成功',
                  type: 'success'
                });
              })
            }

          }
        })
      },
      handleUpdate(row,name) {
        this.updateId = row.id;
        this.createLevel = 'one';
        this.updateLevel = name;
        if(name=='one'){
          this.temp = Object.assign({}, row); // copy obj
          this.dialogFormVisible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }else if(name=='two'){
          this.dialogLevelVisible = true;
          this.updateLevelTemp = Object.assign({}, row); // copy obj
          this.$nextTick(() => {
            this.$refs['levelForm'].clearValidate()
          })
        }
        this.dialogStatus = 'update';

      },
      updateData(id) {
        if(this.updateLevel == 'one'){
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              const tempData = Object.assign({}, this.temp);
              diseaseUpdate(id,tempData).then((res) => {
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
        }else if(this.updateLevel == 'two'){
          this.$refs['levelForm'].validate((valid) => {
            if (valid) {
              const tempData = Object.assign({}, this.updateLevelTemp);
              this.$delete(tempData,'first_level_id');
              this.$delete(tempData,'first_level_name');
              this.$delete(tempData,'id');
              this.$delete(tempData,'second_level_name');
              // tempData.name =  tempData.second_level_name;
              this.$set(tempData,'name',this.updateLevelTemp.second_level_name);
              levelDiseaseUpdate(tempData.second_level_id,tempData).then((res) => {
                const index = this.levelList.findIndex(v => v.second_level_id === this.updateLevelTemp.second_level_id);
                this.levelList.splice(index, 1, res.data);
                this.dialogLevelVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })


            }
          })
        }

      },
      handleDelete(row, index,name) {
            this.$confirm('确定删除此记录吗?', '提示', {
              type: 'warning'
            }).then(() => {

              //NProgress.start();
              let para = {id: row.id};
              if(name == 'one'){
                this.listLoading = true;
                diseaseDel(row.id).then((res) => {
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
              }else if(name == 'two'){
                this.levelListLoading = true;
                levelDiseaseDel(row.second_level_id).then((res) => {
                  this.levelListLoading = false;
                  if(res.status == 0) {
                    this.levelList.splice(index, 1);
                    //NProgress.done();
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                  }
                });
              }

            }).catch(() => {

            });
      },
    }
  }
</script>
<style scoped>
  .title{
    font-weight: bold;
    padding: 20px 20px 0 20px;
  }
</style>
