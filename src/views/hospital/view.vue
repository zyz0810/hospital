<template>
  <div class="app-container">
    <div class="title">基本信息</div>
    <el-form :model="formInline" label-width="80px">
      <el-form-item label="姓名：">
        <el-input v-model="formInline.user" placeholder="姓名" read-only />
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="formInline.age" placeholder="年龄" read-only />
      </el-form-item>

    </el-form>

    <div class="title">合作科室</div>
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
          <router-link :to="'/excel/custorm/'+scope.row.id">
            {{ scope.row.author }}
          </router-link>
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
    <div class="title">合作项目</div>
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
          <router-link :to="'/excel/custorm/'+scope.row.id">
            {{ scope.row.author }}
          </router-link>
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
    <div class="title">手术项目</div>
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
          <router-link :to="'/excel/custorm/'+scope.row.id">
            {{ scope.row.author }}
          </router-link>
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
      formInline: {
        user: '张三',
        age: 18,
        sex: '男',
        address: '上海市哈哈',
        phone: '156889899'
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
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
<style lang="scss" scoped>
  .title{
    position: relative;
    display: inline-block;
    padding: 50px 50px 15px 15px;
    font-size: 24px;
    color: white;
    &::before{
      content: '';
      position: absolute;
      top:0;left:0;right:0;bottom:0;
      z-index: -1;
      background: #168251;
      transform: perspective(.5em) rotateX(5deg);
      transform-origin: bottom left;
    }
  }
</style>
