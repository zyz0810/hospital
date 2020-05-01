<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名：">
        <el-input v-model="formInline.user" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="downloadLoading" type="primary" icon="el-icon-search" @click="handleDownload">
          查找
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <!--<el-table-column label="所在医院" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.author }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="职位" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.author }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">

        <el-button :loading="downloadLoading" type="primary" icon="el-icon-edit" @click="handleEdit">
          编辑
        </el-button>
        <el-button :loading="downloadLoading" type="danger" icon="el-icon-delete" @click="handleDel">
          删除
        </el-button>

      </el-table-column>
    </el-table>
    <el-dialog title="添加咨询师" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off" />
        </el-form-item>
        <!--<el-form-item label="医院" :label-width="formLabelWidth">-->
        <!--<el-input v-model="form.hospital" placeholder="请输入姓名" autocomplete="off" />-->
        <!--</el-form-item>-->
        <!--<el-form-item label="科室" :label-width="formLabelWidth">-->
        <!--<el-input v-model="form.department" placeholder="请输入姓名" autocomplete="off" />-->
        <!--</el-form-item>-->
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入联系电话" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList } from '@/api/article'

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
        dialogFormVisible: false,
        form: {
          name: '',
          phone:'',
          department: '',
          hospital:''
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
        const { data } = await fetchList()
        this.list = data.items
        this.listLoading = false
      },
      handleDownload() {

      },
      handleEdit() {

      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确定删除此条记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          // let para = { id: row.id };
          // removeUser(para).then((res) => {
          //   this.listLoading = false;
          //   //NProgress.done();
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   });
          this.fetchData();
          // });
        }).catch(() => {

        });
      },
      handleAdd() {},
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>
