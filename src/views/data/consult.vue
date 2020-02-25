<template>
  <div class="app-container">


    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="客户姓名">
        <el-input v-model="formInline.user" placeholder="客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="formInline.startDate"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="formInline.endDate"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-search" @click="handleDownload">
          查找
        </el-button>
      </el-form-item>
    </el-form>


    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
<!--      <el-table-column type="selection" align="center" />-->
<!--      <el-table-column align="center" label="Id" width="95">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="咨询日期" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.display_time }}
        </template>
      </el-table-column>
      <el-table-column label="客户" width="110" align="center">
        <template slot-scope="scope">
          <router-link :to="'/data/custorm/'+scope.row.id" class="el-link el-link--primary is-underline">
            {{ scope.row.author }}
          </router-link>
<!--          <el-link href="'/excel/custorm/'+scope.row.id" type="primary">主要链接</el-link>-->
        </template>
      </el-table-column>
      <el-table-column label="咨询师" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="咨询内容">
        <template slot-scope="scope">
<!--          <i class="el-icon-time" />-->
          {{ scope.row.title }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'SelectExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      formInline:{
        user:'',
        startDate:'',
        endDate:'',
      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
