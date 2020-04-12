<template>
  <div class="app-container" style="background-color: rgb(240, 242, 245);">
    <div class="div_block">
      <div class="title">基本信息</div>
      <div class="clearfix top_info">
        <div class="fl edit" style="width: 60%;">
          <el-form :inline="true" :model="patientInfo" label-width="120px" label-position="right">
            <el-form-item label="姓名：">
              <el-input v-model="patientInfo.name" readOnly class="border-none"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
              <el-input v-model="patientInfo.idnum" readOnly class="border-none"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-input v-model="patientInfo.gender" readOnly class="border-none"></el-input>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input v-model="patientInfo.age" readOnly class="border-none"></el-input>
            </el-form-item>
            <el-form-item label="电话：">
              <el-input v-model="patientInfo.phone" readOnly class="border-none"></el-input>
            </el-form-item>
            <el-form-item label="地址：">
              <el-input v-if="patientInfo.address!=null" v-model="patientInfo.province+patientInfo.address" readOnly class="border-none"></el-input>
              <el-input v-else v-model="patientInfo.province" readOnly class="border-none"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="fl edit">
          <el-button type="primary" size="mini" @click="handleUpdate('patient')" style="margin-bottom: 20px;">
            编辑
          </el-button>
        </div>
      </div>
    </div>

    <div class="div_block" v-if='roles.indexOf("门诊权限")>-1'>
      <div class="title">门诊记录</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('out')">新增</el-button>
        <el-table ref="multipleTable" v-loading="outlistLoading" :data="outList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="门诊日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.register_date }}
            </template>
          </el-table-column>
          <el-table-column label="门诊医院" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_name }}
            </template>
          </el-table-column>
          <el-table-column label="门诊病种" align="center">
            <template slot-scope="scope">
              {{ scope.row.disease }}
            </template>
          </el-table-column>
          <el-table-column label="看诊医生" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_name }}
            </template>
          </el-table-column>
          <el-table-column label="看诊结果" align="center">
            <template slot-scope="scope">
              {{ scope.row.result }}
            </template>
          </el-table-column>
          <el-table-column label="挂号类别" align="center">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源">
            <template slot-scope="scope">
              {{ scope.row.source }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('out',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('out',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block" v-if='roles.indexOf("缴费权限")>-1'>
      <div class="title">缴费明细</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('pay')">新增</el-button>
        <el-table ref="multipleTable" v-loading="paylistLoading" :data="payList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.project_name }}
            </template>
          </el-table-column>
          <el-table-column label="日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.pay_date }}
            </template>
          </el-table-column>

          <el-table-column label="缴费" align="center">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column label="医院分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_share }}
            </template>
          </el-table-column>
          <el-table-column label="医生分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_share }}
            </template>
          </el-table-column>
          <el-table-column label="治疗中心分成比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.treatment_share }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('pay',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('pay',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="div_block" v-if='roles.indexOf("手术权限")>-1'>
      <div class="title">手术项目</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('operation')">新增</el-button>
        <el-table ref="multipleTable" v-loading="operationlistLoading" :data="operationList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="手术日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>

          <el-table-column label="手术结果" align="center">
            <template slot-scope="scope">
              {{ scope.row.result }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('operation',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('operation',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="div_block" v-if='roles.indexOf("住院权限")>-1'>
      <div class="title">住院信息</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('hospitalization')">新增</el-button>
        <el-table ref="multipleTable" v-loading="hospitalizationlistLoading" :data="hospitalizationList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="医院名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_name }}
            </template>
          </el-table-column>
          <el-table-column label="病区" align="center">
            <template slot-scope="scope">
              {{ scope.row.region }}
            </template>
          </el-table-column>

          <el-table-column label="科室" align="center">
            <template slot-scope="scope">
              {{ scope.row.department }}
            </template>
          </el-table-column>

          <el-table-column label="出院方式" align="center">
            <template slot-scope="scope">
              {{ scope.row.leave_type }}
            </template>
          </el-table-column>
          <el-table-column label="责任护士" align="center">
            <template slot-scope="scope">
              {{ scope.row.nurse }}
            </template>
          </el-table-column>

          <el-table-column label="主治医师" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_name }}
            </template>
          </el-table-column>
          <el-table-column label="入院日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.in_date }}
            </template>
          </el-table-column>
          <el-table-column label="出院日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.leave_date }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('hospitalization',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('hospitalization',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block" v-if='roles.indexOf("咨询权限")>-1'>
      <div class="title">咨询信息</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('consults')">新增</el-button>
        <el-table ref="multipleTable" v-loading="consultsListLoading" :data="consultsList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="咨询日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>
          <el-table-column label="咨询师" align="center">
            <template slot-scope="scope">
              {{ scope.row.consultant_name }}
            </template>
          </el-table-column>
          <el-table-column label="咨询内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column label="解答内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.answer }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('consults',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('consults',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="div_block" v-if='roles.indexOf("回访权限")>-1'>
      <div class="title">回访内容</div>
      <div class="div_table">
        <el-button style="margin-bottom:20px" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate('return')">新增</el-button>
        <el-table ref="multipleTable" v-loading="returnListLoading" :data="returnList" element-loading-text="拼命加载中" stripe border fit highlight-current-row>
          <el-table-column label="回访日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.at_date }}
            </template>
          </el-table-column>
          <el-table-column label="回访人员" align="center">
            <template slot-scope="scope">
              {{ scope.row.visitor_name }}
            </template>
          </el-table-column>
          <el-table-column label="回访内容" align="center">
            <template slot-scope="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" icon="el-icon-edit" @click="handleUpdate('return',row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete('return',row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="patientTemp" v-if="dialogStatus==='updatePatient'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="patientTemp.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="patientTemp.gender" class="filter-item" placeholder="请选择性别">
            <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="patientTemp.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idnum">
          <el-input v-model="patientTemp.idnum"  placeholder="请输入身份证号码"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="tel" v-model="patientTemp.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="所在省份" prop="province">
          <el-select v-model="patientTemp.province" class="filter-item" placeholder="请选择所在省份">
            <el-option v-for="item in areaOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input type="text" v-model="patientTemp.address" placeholder="请输入详细地址" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="temp" v-if="dialogStatus==='createOut'||dialogStatus==='updateOut'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="来源" prop="source">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.source" class="filter-item" placeholder="请选择门诊来源" @change="getSource('add',$event)">
            <el-option v-for="item in sourceOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="temp.hospital_name" class="filter-item" placeholder="请选择医院" @change="getHospital('out',$event)">
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="接诊医生" prop="doctor_name">
          <el-select v-model="temp.doctor_name" prop="doctor_name" class="filter-item" :placeholder="temp.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="temp.hospital_id==undefined ? true:false" @change="getDoctor('out',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="病种" prop="disease">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.disease" class="filter-item" placeholder="请选择门诊病种" @change="getDisease('add',$event)">
            <el-option v-for="item in diseaseOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="挂号类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择挂号类型">
            <el-option v-for="(item,index) in statusOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <!--<el-form-item label="挂号科室">-->
        <!--<el-select v-model="temp.department" class="filter-item" placeholder="请选择">-->
        <!--<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="门诊日期" prop="register_date">
          <el-date-picker v-model="temp.register_date" type="date" placeholder="请选择门诊日期" value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item label="诊断结果" prop="result">
          <el-input v-model="temp.result" placeholder="请输入诊断结果" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="payTemp" v-if="dialogStatus==='createPay'||dialogStatus==='updatePay'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="payTemp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("pay",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="医生" prop="doctor_name">
          <el-select v-model="payTemp.doctor_name" prop="doctor_name" class="filter-item" :placeholder="payTemp.hospital_id==undefined ?'请先选择医院':'请选择医生'" :disabled="payTemp.hospital_id==undefined ? true:false" @change="getDoctor('pay',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project_name">
          <el-select v-model="payTemp.project_name" class="filter-item" :placeholder="payTemp.hospital_id==undefined ?'请先选择医院':'请选择项目'" :disabled="payTemp.hospital_id==undefined ? true:false" @change="changeProject('pay',$event)">
            <el-option v-for="item in projectsOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="payTemp.type" class="filter-item" placeholder="请选择缴费类型">
            <el-option v-for="(item,index) in payOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="pay_date">
          <el-date-picker v-model="payTemp.pay_date" type="date" placeholder="请选择缴费日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="缴费数目" prop="amount">
          <el-input v-model="payTemp.amount" placeholder="请输入金额" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="operationTemp" v-if="dialogStatus==='createOperation'||dialogStatus==='updateOperation'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="手术名称" prop="name">
          <el-input v-model="operationTemp.name" placeholder="请输入手术名称"/>
        </el-form-item>
        <el-form-item label="手术日期" prop="at_date">
          <el-date-picker v-model="operationTemp.at_date" type="date" placeholder="请选择手术日期" @change="changeStartDate" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="手术结果" prop="result">
          <el-input v-model="operationTemp.result" placeholder="请输入手术结果" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="hospitalizationTemp" v-if="dialogStatus==='createHospitalization'||dialogStatus==='updateHospitalization'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="医院" prop="hospital_name">
          <el-select v-model="hospitalizationTemp.hospital_name" class="filter-item" placeholder="请选择医院" @change='getHospital("hospitalization",$event)'>
            <el-option v-for="item in hospitalOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="病区" prop="region">
          <el-input v-model="hospitalizationTemp.region" placeholder="请输入病区" />
        </el-form-item>
        <el-form-item label="科室" prop="department">
          <el-input v-model="hospitalizationTemp.department" placeholder="请输入科室"/>
        </el-form-item>
        <el-form-item label="责任护士" prop="nurse">
          <el-input v-model="hospitalizationTemp.nurse" placeholder="请输入责任护士" />
        </el-form-item>
        <el-form-item label="主治医生" prop="doctor_name">
          <el-select v-model="hospitalizationTemp.doctor_name" class="filter-item" :placeholder="hospitalizationTemp.hospital_id==undefined ? '请先选择医院':'请选择医生'" :disabled="hospitalizationTemp.hospital_id==undefined ? true:false" @change="getDoctor('hospitalization',$event)">
            <el-option v-for="item in doctorOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="入院日期" prop="in_date">
          <el-date-picker v-model="hospitalizationTemp.in_date" type="date" placeholder="请选择入院日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="出院日期" prop="leave_date">
          <el-date-picker v-model="hospitalizationTemp.leave_date" type="date" placeholder="请选择出院日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="出院方式" prop="leave_type">
          <el-input v-model="hospitalizationTemp.leave_type" placeholder="请输入出院方式"/>
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="consultsTemp" v-if="dialogStatus==='createConsults'||dialogStatus==='updateConsults'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="咨询师" prop="consultant_name">
          <el-select v-model="consultsTemp.consultant_name" class="filter-item" placeholder="请选择咨询师" @change="getConsultantName('add',$event)">
            <el-option v-for="item in consultantOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="咨询内容" prop="content">
          <el-input v-model="consultsTemp.content" placeholder="请输入咨询内容" />
        </el-form-item>
        <el-form-item label="解答内容" prop="answer">
          <el-input v-model="consultsTemp.answer" placeholder="请输入解答内容"/>
        </el-form-item>
        <el-form-item label="咨询日期" prop="at_date">
          <el-date-picker v-model="consultsTemp.at_date" type="date" placeholder="请选择咨询日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-input v-model="consultsTemp.platform" placeholder="请输入平台"/>
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="returnTemp" v-if="dialogStatus==='createReturn'||dialogStatus==='updateReturn'" label-position="right" label-width="160px" style="width: 400px; margin-left:50px;">
        <el-form-item label="回访日期" prop="at_date">
          <el-date-picker v-model="returnTemp.at_date" type="date" placeholder="请选择回访日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="回访人员" prop="visitor_name">
          <el-select v-model="returnTemp.visitor_name" class="filter-item" placeholder="请选择回访人员" @change="getVisitors('add',$event)">
            <el-option v-for="item in visitorsOption" :key="item.id" :label="item.name" :value="item.id" :data-id="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="回访内容" prop="content">
          <el-input v-model="returnTemp.content" placeholder="请输入回访内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='updatePatient'" @click="dialogStatus===updateData('patient')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createOut'||dialogStatus==='updateOut'" @click="dialogStatus==='createOut'?createData('out'):updateData('out')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createPay'||dialogStatus==='updatePay'" @click="dialogStatus==='createPay'?createData('pay'):updateData('pay')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createOperation'||dialogStatus==='updateOperation'" @click="dialogStatus==='createOperation'?createData('operation'):updateData('operation')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createHospitalization'||dialogStatus==='updateHospitalization'" @click="dialogStatus==='createHospitalization'?createData('hospitalization'):updateData('hospitalization')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createConsults'||dialogStatus==='updateConsults'" @click="dialogStatus==='createConsults'?createData('consults'):updateData('consults')">
          确认
        </el-button>
        <el-button type="primary" v-if="dialogStatus==='createReturn'||dialogStatus==='updateReturn'" @click="dialogStatus==='createReturn'?createData('return'):updateData('return')">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { patientView,patientOutList,patientPayList,patientHospitalizationList,patientOperationList,patientConsultsList,patientReturnList } from '@/api/patient'
  import { patientUpdate } from '@/api/patient'
  import { sourceList } from '@/api/source'
  import { diseaseList } from '@/api/disease'
  import { hospitalNameList,doctorList,projectsNameList } from '@/api/hospital'
  import { outpatientAdd,outpatientUpdate,outpatientDel } from '@/api/outpatient'
  import { payList,payAdd,payUpdate,payDel,payCount } from '@/api/pay'
  import { operationAdd,operationUpdate,operationDel } from '@/api/operation'
  import { hospitalizationAdd,hospitalizationUpdate,hospitalizationDel } from '@/api/hospitalization'
  import { consultsAdd,consultsUpdate,consultsDel } from '@/api/consults'
  import { consultantsNameList } from '@/api/consultants'
  import { feedbackAdd,feedbackUpdate,feedbackDel } from '@/api/return'
  import { visitorsNameList } from '@/api/visitors'
  import store from '@/store'

  export default {
    name: 'SelectExcel',
    data() {
      //自定义下拉框校验函数
      const isSelect = (rule, value, callback) => {
        if (value == 0) { //如果值是 0，提示用户选择正确的选项
          return callback(new Error("请正确选择一级标题"));
        } else if(value == undefined){

        }else {
          callback();
        }
      };
      return {
        list: null,
        listLoading: true,
        outlistLoading:true,
        paylistLoading:true,
        hospitalizationlistLoading:true,
        operationlistLoading:true,
        consultsListLoading:true,
        returnListLoading:true,
        multipleSelection: [],
        downloadLoading: false,
        sexOptions:['男','女'],
        statusOptions: [ '普通', '专家','免费'],
        patientInfo:{},
        outList:[],
        payList:[],
        consultsList:[],
        operationList:[],
        hospitalizationList:[],
        returnList:[],
        hospitalOption:[],
        dialogFormVisible: false,
        dialogHospitalVisible:false,
        dialogStatus: '',
        textMap: {
          updatePatient:'修改病人信息',
          updateOut: '修改门诊记录',
          createOut: '新增门诊记录',
          updatePay: '修改缴费信息',
          createPay: '新增缴费信息',
          updateOperation: '修改手术记录',
          creatOperation: '新增手术记录',
          updateHospitalization: '修改住院信息',
          createHospitalization: '新增住院信息',
          updateConsults: '修改咨询信息',
          createConsults: '新增咨询信息',
          updateReturn: '修改回访信息',
          createReturn: '新增回访信息',
        },
        patientTemp:{
          name:'',
          gender:'',
          age:'',
          idnum:'',
          phone:'',
          province:'',
          address:'',
        },
        temp: {
          patient_id: undefined,
          hospital_id: undefined,
          doctor_id:undefined,
          patient_name:'',
          hospital_name:'',
          doctor_name:'',
          type: '',
          // department:'',
          register_date:'',
          result:'',
          source_id:undefined,
          source:'',
          disease_id:undefined,
          disease:''
        },
        sourceOption:[],
        diseaseOption:[],
        doctorOption:[],
        rules: {
          hospital_name:[{ required: true, message: '请选择医院', trigger: 'change',validator: isSelect  }],
          doctor_name:[{ required: true, message: '请选择医生', trigger: 'change',validator: isSelect  }],
          disease:[{ required: true, message: '请选择门诊病种', trigger: 'change',validator: isSelect  }],
          source:[{ required: true, message: '请选择门诊来源', trigger: 'change',validator: isSelect  }],
          patient_name: [{ required: true, message: '请输入病人姓名', trigger: 'change',validator: isSelect }],
          consultant_name: [{ required: true, message: '请选择咨询师', trigger: 'change',validator: isSelect }],
          content: [{ required: true, message: '请输入咨询内容', trigger: 'change' }],
          answer: [{ required: true, message: '请输入解答内容', trigger: 'blur' }],
          at_date: [{ required: true, message: '请选择咨询日期', trigger: 'blur' }],
          project_name:[{ required: true, message: '请选择项目', trigger: 'change',validator: isSelect }],
          type:[{ required: true, message: '请选缴费类型', trigger: 'change',validator: isSelect }],
          pay_date:[{ required: true, message: '请选择缴费日期', trigger: 'change',validator: isSelect }],
          amount:[{ required: true, message: '请填写缴费数目', trigger: 'change' }],
          name: [{ required: true, message: '请输入手术名称', trigger: 'change' }],
          result: [{ required: true, message: '请输入手术结果', trigger: 'change' }],
          region:[{ required: true, message: '请填写缴病区', trigger: 'change' }],
          department:[{ required: true, message: '请填写科室', trigger: 'change' }],
          leave_type:[{ required: true, message: '请出院方式', trigger: 'change' }],
          nurse:[{ required: true, message: '请填写责任护士', trigger: 'change' }],
          in_date:[{ required: true, message: '请选择入院日期', trigger: 'change' }],
          leave_date:[{ required: true, message: '请选择出院日期', trigger: 'change' }],
          visitor_name: [{ required: true, message: '请选择回访人员', trigger: 'change',validator: isSelect }],
        },
        areaOptions:['北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省',
          '湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔族自治区','香港特别行政区','澳门特别行政区'],
        payOptions:['门诊收入','住院收入'],
        payTemp:{
          hospital_id:undefined,
          doctor_id:undefined,
          project_id: undefined,
          project_name:'',
          doctor_name:'',
          hospital_name:'',
          pay_date: '',
          amount:''
        },
        projectsOption:[],
        operationTemp:{
          name: '',
          result: '',
          at_date: '',
        },
        hospitalizationTemp:{
          doctor_id:undefined,
          hospital_id:undefined,
          hospital_name:'',
          doctor_name:'',
          region:'',
          department:'',
          leave_type:'',
          nurse:'',
          in_date:'',
          leave_date:''
        },
        consultsTemp:{
          consultant_id:undefined,
          consultant_name:'',
          content:'',
          answer:'',
          at_date:'',
          platform:''
        },
        consultantOptions:[],
        returnTemp:{
          visitor_id: undefined,
          visitor_name:'',
          content: '',
          at_date:''
        },
        visitorsOption:[],
        roles:[]
      }
    },
    created() {
      this.fetchData();
      this.gethospitalName();
      this.getOutData();
      this.getConsultant();//咨询师列表
      this.getVisitorsName();
    },
    methods: {

      getConsultantName(val,e){
        if(val == 'add'){
          this.consultsTemp.consultant_id = e
        }

      },
      getVisitorsName(){
        visitorsNameList().then(response => {
          this.visitorsOption = response.data
        })
      },
      getVisitors(val,e){
        if(val=='add'){
          this.returnTemp.visitor_id = e
        }else if(val=='filter'){
          this.listQuery.visitor_id= e;
          // this.getList()
        }
      },
      getConsultant() {
        consultantsNameList().then(response => {
          this.consultantOptions = response.data
        })
      },
      getHospital(val,e){
        doctorList(e).then(response => {
          this.doctorOption = response.data
        });
        projectsNameList(e).then(response => {
          this.projectsOption = response.data
        });
        if(val == 'out'){
          this.temp.hospital_id = e;
          this.temp.doctor_id = undefined;
          this.temp.doctor_name = '';
        }else if(val=='pay'){
          this.payTemp.hospital_id = e;
          this.payTemp.project_id = undefined;
          this.payTemp.project_name = '';
          this.payTemp.doctor_id = undefined;
          this.payTemp.doctor_name = ''
          // this.getList();
        }else if(val == 'hospitalization'){
          this.hospitalizationTemp.hospital_id = e;
          this.hospitalizationTemp.doctor_id = undefined;
          this.hospitalizationTemp.doctor_name = '';
        }
      },
      getDoctor(val,e){
        if(val == 'out'){
          this.temp.doctor_id= e
        }else if(val == 'pay'){
          this.payTemp.doctor_id= e;
          // this.getList();
        }else if(val == 'hospitalization'){
          this.hospitalizationTemp.doctor_id= e;
        }
      },
      changeProject(val,e){
        if(val == 'pay'){
          this.payTemp.project_id= e
        }else if(val == 'filter'){
          this.listQuery.project_id= e
        }
      },
      getSource(val,e){
        if(val=='add'){
          this.temp.source_id = e
        }else if(val=='filter'){
          this.listQuery.source_id= e;
          // this.getList()
        }
      },
      getDisease(val,e){
        if(val=='add'){
          this.temp.disease_id = e
        }else if(val=='filter'){
          this.listQuery.disease_id= e;
          // this.getList()
        }
      },
      resetTemp() {
        this.temp = {
          patient_id: undefined,
          hospital_id: undefined,
          doctor_id:undefined,
          patient_name:'',
          hospital_name:'',
          doctor_name:'',
          type: '',
          // department:'',
          register_date:'',
          result:'',
          source_id:undefined,
          source:'',
          disease_id:undefined,
          disease:''
        }
      },
      resetPayTemp(){
        this.payTemp={
          hospital_id:undefined,
            doctor_id:undefined,
            project_id: undefined,
            project_name:'',
            doctor_name:'',
            hospital_name:'',
            pay_date: '',
            amount:''
        }
      },
      resetOperationTemp(){
        this.operationTemp={
          name: '',
          result: '',
          at_date: '',
        }
      },
      resetHospitalizationTemp(){
        this.hospitalizationTemp={
          doctor_id:undefined,
          hospital_id:undefined,
          hospital_name:'',
          doctor_name:'',
          region:'',
          department:'',
          leave_type:'',
          nurse:'',
          in_date:'',
          leave_date:''
        }
      },
      resetConsultsTemp(){
        this.consultsTemp={
          consultant_id:undefined,
            consultant_name:'',
            content:'',
            answer:'',
            at_date:'',
            platform:''
        }
      },
      resetReturnTemp(){
        this.returnTemp={
          visitor_id: undefined,
            visitor_name:'',
            content: '',
            at_date:''
        }
      },
      getOutData(){
        sourceList().then(response => {
          this.sourceOption = response.data
        });
        diseaseList().then(response => {
          this.diseaseOption = response.data
        });
      },
      fetchData() {

        var id = this.$route.params && this.$route.params.id;
        patientView(id).then(response => {
          this.patientInfo = response.data
        });
        this.roles = store.getters && store.getters.roles;
        this.outlistLoading = true;
        this.paylistLoading = true;
        this.hospitalizationlistLoading = true;
        this.operationlistLoading = true;
        this.consultsListLoading = true;
        this.returnListLoading = true;
        patientOutList(id).then(response => {
          this.outList = response.data;
          this.outlistLoading = false
        });
        patientPayList(id).then(response => {
          this.payList = response.data;
          this.paylistLoading = false
        });
        patientHospitalizationList(id).then(response => {
          this.hospitalizationList = response.data;
          this.hospitalizationlistLoading = false
        });
        patientOperationList(id).then(response => {
          this.operationList = response.data;
          this.operationlistLoading = false
        });
        patientConsultsList(id).then(response => {
          this.consultsList = response.data;
          this.consultsListLoading = false
        });
        patientReturnList(id).then(response => {
          this.returnList = response.data;
          this.returnListLoading = false
        });
      },
      gethospitalName(){
        hospitalNameList().then(response => {
          this.hospitalOption = response.data
        })
      },
      handleCreate(name) {
        if(name == 'out'){
          this.resetTemp();
          this.dialogStatus = 'createOut'
        }else if(name == 'pay'){
          this.resetPayTemp();
          this.dialogStatus = 'createPay'
        }else if(name=='operation'){
          this.resetOperationTemp();
          this.dialogStatus = 'createOperation'
        }else if(name=='hospitalization'){
          this.resetHospitalizationTemp();
          this.dialogStatus = 'createHospitalization'
        }else if(name == 'consults'){
          this.resetConsultsTemp();
          this.dialogStatus = 'createConsults'
        }else if(name == 'return'){
          this.resetReturnTemp();
          this.dialogStatus = 'createReturn'
        }
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData(name) {
        var id = this.$route.params && this.$route.params.id;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(name == 'out'){
              //增加门诊记录
              this.$delete(this.temp,'patient_name');
              this.$delete(this.temp,'hospital_name');
              this.$delete(this.temp,'doctor_name');
              this.$delete(this.temp,'source');
              this.$delete(this.temp,'disease');
              // this.temp.patient_id = parseInt(id);
              this.$set(this.temp,'patient_id',id);
              outpatientAdd(this.temp).then((res) => {
                this.outList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              })
            }else if(name == 'pay'){
              //增加缴费记录
              this.$set(this.payTemp,'patient_id',id);
              this.$delete(this.temp,'project_name');
              this.$delete(this.temp,'doctor_name');
              this.$delete(this.temp,'hospital_name');
              payAdd(this.payTemp).then((res) => {
                this.payList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              })
            }else if(name == 'operation'){
              //增加手术记录
              this.$set(this.operationTemp,'patient_id',id);
              operationAdd(this.operationTemp).then((res) => {
                this.operationList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              })
            }else if(name == 'hospitalization'){
              //增加住院记录
              this.$set(this.hospitalizationTemp,'patient_id',id);
              this.$delete(this.temp,'hospital_name');
              this.$delete(this.temp,'doctor_name');
              hospitalizationAdd(this.hospitalizationTemp).then((res) => {
                this.hospitalizationList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
              })
            }else if(name == 'consults'){
              //增加咨询记录
              this.$set(this.consultsTemp,'patient_id',id);
              this.$delete(this.consultsTemp,'consultant_name');
              consultsAdd(this.consultsTemp).then((res) => {
                this.consultsList.unshift(res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '增加成功',
                  type: 'success'
                });
              })
            }else if(name == 'return'){
              //增加咨询记录
              this.$set(this.returnTemp,'patient_id',id);
              this.$delete(this.returnTemp,'visitor_name');
              feedbackAdd(this.returnTemp).then((res) => {
                this.returnList.unshift(res.data);
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
      handleUpdate(name,row) {
        if(name == 'patient'){
          // this.updateId = row.hospital_id
          // this.projectId = row.id
          this.dialogStatus = 'updatePatient';
          this.patientTemp = Object.assign({}, this.patientInfo) // copy obj
        }else if(name == 'out'){
          // this.updateId = row.hospital_id
          // this.projectId = row.id
          this.dialogStatus = 'updateOut'
          this.temp = Object.assign({}, row) // copy obj
        }else if(name == 'pay'){
          this.dialogStatus = 'updatePay'
          this.payTemp = Object.assign({}, row) // copy obj
        }else if(name == 'operation'){
          this.dialogStatus = 'updateOperation'
          this.operationTemp = Object.assign({}, row) // copy obj
        }else if(name == 'hospitalization'){
          this.dialogStatus = 'updateHospitalization';
          this.hospitalizationTemp = Object.assign({}, row) // copy obj
        }else if(name == 'consults'){
          this.dialogStatus = 'updateConsults';
          this.consultsTemp = Object.assign({}, row) // copy obj
        }else if(name == 'return'){
          this.dialogStatus = 'updateReturn';
          this.returnTemp = Object.assign({}, row) // copy obj
        }
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData(name) {
        var patientId = this.$route.params && this.$route.params.id;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(name == 'patient'){
              //修改门诊记录
              const tempData = Object.assign({}, this.patientTemp);
              patientUpdate(patientId,tempData).then((res) => {
                this.patientInfo = res.data;
                this.$refs['dataForm'].clearValidate();
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            } else if(name == 'out'){
              //修改门诊记录
              const tempData = Object.assign({}, this.temp);
              outpatientUpdate(tempData.id,tempData).then(() => {
                const index = this.outList.findIndex(v => v.id === this.temp.id);
                this.outList.splice(index, 1, this.temp);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }else if(name == 'pay'){
              //修改医生
              const tempData = Object.assign({}, this.payTemp);
              payUpdate(tempData.id,tempData).then((res) => {
                const index = this.payList.findIndex(v => v.id === this.payTemp.id);
                this.payList.splice(index, 1, res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }else if(name=='operation'){
              const tempData = Object.assign({}, this.operationTemp);
              operationUpdate(tempData.id,tempData).then((res) => {
                const index = this.operationList.findIndex(v => v.id === this.operationTemp.id);
                this.operationList.splice(index, 1, res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }else if(name=='hospitalization'){
              const tempData = Object.assign({}, this.hospitalizationTemp);
              hospitalizationUpdate(tempData.id,tempData).then((res) => {
                const index = this.hospitalizationList.findIndex(v => v.id === this.hospitalizationTemp.id);
                this.hospitalizationList.splice(index, 1, res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }else if(name == 'consults'){
              const tempData = Object.assign({}, this.consultsTemp);
              consultsUpdate(tempData.id,tempData).then((res) => {
                const index = this.consultsList.findIndex(v => v.id === this.consultsTemp.id);
                this.consultsList.splice(index, 1, res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }else if(name == 'return'){
              const tempData = Object.assign({}, this.returnTemp);
              feedbackUpdate(tempData.id,tempData).then((res) => {
                const index = this.returnList.findIndex(v => v.id === this.returnTemp.id);
                this.returnList.splice(index, 1, res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              })
            }

          }
        })
      },
      handleDelete(name,row, index) {
        this.$confirm('确定删除此记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          if(name == 'out'){
            this.outlistLoading = true;
            outpatientDel(row.id).then((res) => {
              this.outlistLoading = false;
              if(res.status == 0) {
                this.outList.splice(index, 1);
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
            });
          }else if(name=='pay'){
            this.paylistLoading = true;
            payDel(row.id).then((res) => {
              this.paylistLoading = false;
              if(res.status == 0) {
                this.payList.splice(index, 1);
                //NProgress.done();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              // this.getUsers();
            });
          }else if(name=='operation'){
            this.operationlistLoading = true;
            operationDel(row.id).then((res) => {
              this.operationlistLoading = false;
              if(res.status == 0) {
                this.operationList.splice(index, 1);
                //NProgress.done();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              // this.getUsers();
            });
          }else if(name=='hospitalization'){
            this.hospitalizationlistLoading = true;
            hospitalizationDel(row.id).then((res) => {
              this.hospitalizationlistLoading = false;
              if(res.status == 0) {
                this.hospitalizationList.splice(index, 1);
                //NProgress.done();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              // this.getUsers();
            });
          }else if(name == 'consults'){
            this.consultslistLoading = true;
            consultsDel(row.id).then((res) => {
              this.consultslistLoading = false;
              if(res.status == 0) {
                this.consultsList.splice(index, 1);
                //NProgress.done();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              // this.getUsers();
            });
          }else if(name == 'return'){
            this.returnlistLoading = true;
            feedbackDel(row.id).then((res) => {
              this.returnlistLoading = false;
              if(res.status == 0) {
                this.returnList.splice(index, 1);
                //NProgress.done();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              // this.getUsers();
            });
          }

        }).catch(() => {

        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  .div_block{
       /*padding: 20px;*/
       margin-bottom: 20px;
       background: #fff;
     }
  .title{
    font-weight: bold;
    padding: 20px 20px 0 20px;
    /*border-bottom: 1px solid #333;*/
  }
  .el-form,.div_table{
    padding: 0 20px 20px 20px;
  }
  .edit .el-form-item{
    width: 47%;
  }
  .top_info{
    display: flex;
    align-items: center;
    .edit{
      align-items: center;
      margin-right: 50px;
    /*padding-bottom: 50px;*/
    .el-form-item{
      &:last-child{
         margin-bottom: 0;
       }
      }
    }
  }
</style>
