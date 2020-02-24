<template>
  <div class="app-container">

<!--    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">Export</el-button>-->


    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="门诊医院">
        <el-select v-model="formInline.value" placeholder="请选择">
          <el-option
            v-for="item in formInline.hospital"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="看诊医生">
        <el-input v-model="formInline.user" placeholder="看诊医生"></el-input>
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
          <router-link :to="'/excel/custorm/'+scope.row.id" class="el-link el-link--primary is-underline">
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
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Readings" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'

export default {
  name: 'MergeHeader',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      formInline:{
        hospital:[{
          value: '选项1',
          label: '华山医院'
        }, {
          value: '选项2',
          label: '协和医院'
        }, {
          value: '选项3',
          label: '仁济医院'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value:'',
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
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
          const header = ['', 'Title', 'Author', 'Readings', '']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
