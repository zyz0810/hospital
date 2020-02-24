<template>
  <div class="app-container">

    <div>
      <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">
        新增
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="医院名称" align="center">
        <template slot-scope="scope">
          <router-link :to="'/hospital/view/'+scope.row.id" class="el-link el-link--primary is-underline">
            {{ scope.row.author }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button :loading="downloadLoading" type="primary" icon="el-icon-edit" @click="handleEdit">
            编辑
          </el-button>
          <el-button :loading="downloadLoading" type="danger" icon="el-icon-delete" @click="handleDel">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加医院" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="医院名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入医院名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入地址" autocomplete="off" />
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    handleDel() {

    },
    handleAdd() {},
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
