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
            <el-form-item label="所在地区：">
              <el-input v-if="patientInfo.city!=null" v-model="patientInfo.province+patientInfo.city" readOnly class="border-none"></el-input>
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
              {{ scope.row.register_date || '--'  }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.visit_type || '--'  }}
            </template>
          </el-table-column>
          <el-table-column label="费别" align="center">
            <template slot-scope="scope">
              {{ scope.row.pay_type || '--'  }}
            </template>
          </el-table-column>
          <el-table-column label="门诊医院" align="center">
            <template slot-scope="scope">
              {{ scope.row.hospital_name || '--'  }}
            </template>
          </el-table-column>
<!--          <el-table-column label="一级病种" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              {{ scope.row.disease_first_level_name }}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="二级病种" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              {{ scope.row.disease_second_level_name }}-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="看诊医生" align="center">
            <template slot-scope="scope">
              {{ scope.row.doctor_name || '--'  }}
            </template>
          </el-table-column>
          <el-table-column label="看诊结果" align="center">
            <template slot-scope="scope">
              {{ scope.row.result || '--'  }}
            </template>
          </el-table-column>
          <el-table-column label="挂号类别" align="center">
            <template slot-scope="scope">
              {{ scope.row.type || '--'  }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源">
            <template slot-scope="scope">
              {{ scope.row.source || '--'  }}
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
      <el-form ref="dataForm" :rules="rules" :model="patientTemp" v-if="dialogStatus==='updatePatient'" :inline="true" label-position="right" label-width="120px" style="width: 600px; margin-left:50px;">
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
          <el-select v-model="patientTemp.province" class="filter-item" placeholder="请选择所在省份" @change="getProvice($event)">
            <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="city">
          <el-select v-model="patientTemp.city" class="filter-item" :placeholder="patientTemp.province?'请选择所在城市':'请先选择所在省份'" @change="getCity($event)">
            <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input type="text" v-model="patientTemp.address" placeholder="请输入详细地址" />
        </el-form-item>
      </el-form>
      <el-form ref="dataForm" :rules="rules" :model="temp" v-if="dialogStatus==='createOut'||dialogStatus==='updateOut'" :inline="true" label-position="right" label-width="120px" style="width: 600px; margin-left:50px;">
        <el-form-item label="来源" prop="source">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.source" class="filter-item" placeholder="请选择门诊来源" @change="getSource('add',$event)">
            <el-option v-for="item in sourceOption" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="visit_type">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.visit_type" class="filter-item" placeholder="请选择类型">
            <el-option label="初诊" value="初诊" />
            <el-option label="复诊" value="复诊" />
          </el-select>
        </el-form-item>
        <el-form-item label="费别" prop="pay_type">
          <!--<el-input v-model="temp.source" placeholder="请填写来源"/>-->
          <el-select v-model="temp.pay_type" class="filter-item" placeholder="请选择费别">
            <el-option label="普通城保" value="普通城保" />
            <el-option label="自费病人" value="自费病人" />
            <el-option label="居保其它" value="居保其它" />
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
<!--        <el-form-item label="病种" prop="disease_first_level_name">-->
<!--          &lt;!&ndash;<el-input v-model="temp.source" placeholder="请填写来源"/>&ndash;&gt;-->
<!--          <el-select v-model="temp.disease_first_level_name" class="filter-item" placeholder="请选择门诊病种" @change="getDisease('add',$event)">-->
<!--            <el-option v-for="item in diseaseOption" :key="item.id" :label="item.name" :value="item.id" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="" prop="disease_second_level_name">-->
<!--          &lt;!&ndash;二级病种&ndash;&gt;-->
<!--          <el-select v-model="temp.disease_second_level_name" class="filter-item" placeholder="请选择门诊病种" @change="getDiseaseLevel($event)">-->
<!--            <el-option v-for="item in levelDiseaseOption" :key="item.id" :label="item.name" :value="item.id" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
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
          <el-date-picker v-model="operationTemp.at_date" type="date" placeholder="请选择手术日期" value-format="yyyy-MM-dd" />
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
  import { patientView,patientOutList,patientPayList,patientHospitalizationList,patientOperationList,patientConsultsList,patientReturnList,paymentsAdd } from '@/api/patient'
  import { patientUpdate } from '@/api/patient'
  import { sourceList } from '@/api/source'
  import { diseaseList,getSecondDisease } from '@/api/disease'
  import { hospitalNameList,doctorList,projectsNameList } from '@/api/hospital'
  import { outpatientAdd,outpatientUpdate,outpatientDel } from '@/api/outpatient'
  import { payList,payAdd,payUpdate,payDel,payCount } from '@/api/pay'
  import { operationAdd,operationUpdate,operationDel } from '@/api/operation'
  import { hospitalizationAdd,hospitalizationUpdate,hospitalizationDel } from '@/api/hospitalization'
  import { consultsAdd,consultsUpdate,consultsDel } from '@/api/consults'
  import { consultantsNameList } from '@/api/consultants'
  import { feedbackAdd,feedbackUpdate,feedbackDel } from '@/api/return'
  import { visitorsNameList } from '@/api/visitors'
  import { getHospital } from '@/utils/auth'
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
        provinces: [
          {
            name: "北京市",
            citys: [
              "东城区",
              "西城区",
              "崇文区",
              "宣武区",
              "朝阳区",
              "海淀区",

              "丰台区",

              "石景山区",

              "房山区",

              "通州区",

              "顺义区",

              "昌平区",

              "大兴区",

              "怀柔区",

              "平谷区",

              "门头沟区",

              "密云区",

              "延庆区",

              "其他"

            ]

          },

          {

            name: "广东省",

            citys: [

              "广州",

              "深圳",

              "珠海",

              "汕头",

              "韶关",

              "佛山",

              "江门",

              "湛江",

              "茂名",

              "肇庆",

              "惠州",

              "梅州",

              "汕尾",

              "河源",

              "阳江",

              "清远",

              "东莞",

              "中山",

              "潮州",

              "揭阳",

              "云浮",

              "其他"

            ]

          },

          {

            name: "上海市",

            citys: [

              "黄浦区",

              "卢湾区",

              "徐汇区",

              "长宁区",

              "静安区",

              "普陀区",

              "闸北区",

              "虹口区",

              "杨浦区",

              "宝山区",

              "闵行区",

              "嘉定区",

              "松江区",

              "金山区",

              "青浦区",

              "南汇区",

              "奉贤区",

              "浦东新区",

              "崇明区",

              "其他"

            ]

          },

          {

            name: "天津市",

            citys: [

              "和平区",

              "河东区",

              "河西区",

              "南开区",

              "河北区",

              "红桥区",

              "塘沽区",

              "汉沽区",

              "大港区",

              "东丽区",

              "西青区",

              "北辰区",

              "津南区",

              "武清区",

              "宝坻区",

              "静海县",

              "宁河县",

              "蓟县",

              "其他"

            ]

          },

          {

            name: "重庆市",

            citys: [

              "渝中区",

              "大渡口区",

              "江北区",

              "南岸区",

              "北碚区",

              "渝北区",

              "巴南区",

              "长寿区",

              "双桥区",

              "沙坪坝区",

              "万盛区",

              "万州区",

              "涪陵区",

              "黔江区",

              "永川区",

              "合川区",

              "江津区",

              "九龙坡区",

              "南川区",

              "綦江县",

              "潼南区",

              "荣昌区",

              "璧山区",

              "大足区",

              "铜梁县",

              "梁平县",

              "开县",

              "忠县",

              "城口县",

              "垫江区",

              "武隆县",

              "丰都县",

              "奉节县",

              "云阳县",

              "巫溪县",

              "巫山县",

              "其他"

            ]

          },

          {

            name: "辽宁省",

            citys: [

              "沈阳",

              "大连",

              "鞍山",

              "抚顺",

              "本溪",

              "丹东",

              "锦州",

              "营口",

              "阜新",

              "辽阳",

              "盘锦",

              "铁岭",

              "朝阳",

              "葫芦岛",

              "其他"

            ]

          },

          {

            name: "江苏省",

            citys: [

              "南京",

              "苏州",

              "无锡",

              "常州",

              "镇江",

              "南通",

              "泰州",

              "扬州",

              "盐城",

              "连云港",

              "徐州",

              "淮安",


              "其他"

            ]

          },

          {

            name: "湖北省",

            citys: [

              "武汉",

              "黄石",

              "十堰",

              "荆州",

              "宜昌",

              "襄樊",

              "鄂州",

              "荆门",

              "孝感",

              "黄冈",

              "咸宁",

              "随州",

              "仙桃",

              "天门",

              "潜江",

              "神农架",

              "其他"

            ]

          },

          {

            name: "四川省",

            citys: [

              "成都",

              "自贡",

              "攀枝花",

              "泸州",

              "德阳",

              "绵阳",

              "广元",

              "遂宁",

              "内江",

              "乐山",

              "南充",

              "眉山",

              "宜宾",

              "广安",

              "达州",

              "雅安",

              "巴中",

              "资阳",

              "其他"

            ]

          },

          {

            name: "陕西省",

            citys: [

              "西安",

              "铜川",

              "宝鸡",

              "咸阳",

              "渭南",

              "延安",

              "汉中",

              "榆林",

              "安康",

              "商洛",

              "其他"

            ]

          },

          {

            name: "河北省",

            citys: [

              "石家庄",

              "唐山",

              "秦皇岛",

              "邯郸",

              "邢台",

              "保定",

              "张家口",

              "承德",

              "沧州",

              "廊坊",

              "衡水",

              "其他"

            ]

          },

          {

            name: "山西省",

            citys: [

              "太原",

              "大同",

              "阳泉",

              "长治",

              "晋城",

              "朔州",

              "晋中",

              "运城",

              "忻州",

              "临汾",

              "吕梁",

              "其他"

            ]

          },

          {

            name: "河南省",

            citys: [

              "郑州",

              "开封",

              "洛阳",

              "平顶山",

              "安阳",

              "鹤壁",

              "新乡",

              "焦作",

              "濮阳",

              "许昌",

              "漯河",

              "三门峡",

              "南阳",

              "商丘",

              "信阳",

              "周口",

              "驻马店",

              "焦作",

              "其他"

            ]

          },

          {

            name: "吉林省",

            citys: [

              "吉林",

              "四平",

              "辽源",

              "通化",

              "白山",

              "松原",

              "白城",

              "延边朝鲜自治区",

              "其他"

            ]

          },

          {

            name: "黑龙江",

            citys: [

              "哈尔滨",

              "齐齐哈尔",

              "鹤岗",

              "双鸭山",

              "鸡西",

              "大庆",

              "伊春",

              "牡丹江",

              "佳木斯",

              "七台河",

              "黑河",

              "绥远",

              "大兴安岭地区",

              "其他"

            ]

          },

          {

            name: "内蒙古",

            citys: [

              "呼和浩特",

              "包头",

              "乌海",

              "赤峰",

              "通辽",

              "鄂尔多斯",

              "呼伦贝尔",

              "巴彦淖尔",

              "乌兰察布",

              "锡林郭勒盟",

              "兴安盟",

              "阿拉善盟"

            ]

          },

          {

            name: "山东省",

            citys: [

              "济南",

              "青岛",

              "淄博",

              "枣庄",

              "东营",

              "烟台",

              "潍坊",

              "济宁",

              "泰安",

              "威海",

              "日照",

              "莱芜",

              "临沂",

              "德州",

              "聊城",

              "滨州",

              "菏泽",

              "其他"

            ]

          },

          {

            name: "安徽省",

            citys: [

              "合肥",

              "芜湖",

              "蚌埠",

              "淮南",

              "马鞍山",

              "淮北",

              "铜陵",

              "安庆",

              "黄山",

              "滁州",

              "阜阳",

              "宿州",

              "巢湖",

              "六安",

              "亳州",

              "池州",

              "宣城"

            ]

          },

          {

            name: "浙江省",

            citys: [

              "杭州",

              "宁波",

              "温州",

              "嘉兴",

              "湖州",

              "绍兴",

              "金华",

              "衢州",

              "舟山",

              "台州",

              "丽水",

              "其他"

            ]

          },

          {

            name: "福建省",

            citys: [

              "福州",

              "厦门",

              "莆田",

              "三明",

              "泉州",

              "漳州",

              "南平",

              "龙岩",

              "宁德",

              "其他"

            ]

          },

          {

            name: "湖南省",

            citys: [

              "长沙",

              "株洲",

              "湘潭",

              "衡阳",

              "邵阳",

              "岳阳",

              "常德",

              "张家界",

              "益阳",

              "滨州",

              "永州",

              "怀化",

              "娄底",

              "其他"

            ]

          },

          {

            name: "广西省",

            citys: [

              "南宁",

              "柳州",

              "桂林",

              "梧州",

              "北海",

              "防城港",

              "钦州",

              "贵港",

              "玉林",

              "百色",

              "贺州",

              "河池",

              "来宾",

              "崇左",

              "其他"

            ]

          },

          {

            name: "江西省",

            citys: [

              "南昌",

              "景德镇",

              "萍乡",

              "九江",

              "新余",

              "鹰潭",

              "赣州",

              "吉安",

              "宜春",

              "抚州",

              "上饶",

              "其他"

            ]

          },

          {

            name: "贵州省",

            citys: [

              "贵阳",

              "六盘水",

              "遵义",

              "安顺",

              "铜仁",

              "毕节",

              "其他"

            ]

          },

          {

            name: "云南省",

            citys: [

              "昆明",

              "曲靖",

              "玉溪",

              "保山",

              "邵通",

              "丽江",

              "普洱",

              "临沧",

              "其他"

            ]

          },

          {

            name: "西藏",

            citys: [

              "拉萨",

              "那曲地区",

              "昌都地区",

              "林芝地区",

              "山南区",

              "阿里区",

              "日喀则",

              "其他"

            ]

          },

          {

            name: "海南省",

            citys: [

              "海口",

              "三亚",

              "五指山",

              "琼海",

              "儋州",

              "文昌",

              "万宁",

              "东方",

              "澄迈县",

              "定安县",

              "屯昌县",

              "临高县",

              "其他"

            ]

          },

          {

            name: "甘肃省",

            citys: [

              "兰州",

              "嘉峪关",

              "金昌",

              "白银",

              "天水",

              "武威",

              "酒泉",

              "张掖",

              "庆阳",

              "平凉",

              "定西",

              "陇南",

              "临夏",

              "甘南",

              "其他"

            ]

          },

          {

            name: "宁夏",

            citys: [

              "银川",

              "石嘴山",

              "吴忠",

              "固原",

              "中卫",

              "其他"

            ]

          },

          {

            name: "青海",

            citys: [

              "西宁",

              "海东地区",

              "海北藏族自治区",

              "海南藏族自治区",

              "黄南藏族自治区",

              "果洛藏族自治区",

              "玉树藏族自治州",

              "还西藏族自治区",

              "其他"

            ]

          },

          {

            name: "新疆",

            citys: [

              "乌鲁木齐",

              "克拉玛依",

              "吐鲁番地区",

              "哈密地区",

              "和田地区",

              "阿克苏地区",

              "喀什地区",

              "克孜勒苏柯尔克孜",

              "巴音郭楞蒙古自治区",

              "昌吉回族自治州",

              "博尔塔拉蒙古自治区",

              "石河子",

              "阿拉尔",

              "图木舒克",

              "五家渠",

              "伊犁哈萨克自治区",

              "其他"

            ]

          }

        ],
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
          city:'',
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
          pay_type:'',
          visit_type:''
          // disease_first_level_id:undefined,
          // disease_first_level_name:'',
          // disease_second_level_id:'',
          // disease_second_level_name:'',
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
        roles:[],
        levelDiseaseOption:[],
        cityOptions:[]
      }
    },
    mounted() {
      this.getOutList();
      this.fetchData();
      this.gethospitalName();
      this.getOutData();
      this.getConsultant();//咨询师列表
      this.getVisitorsName();
    },
    methods: {
      getProvice(e){
        this.patientTemp.province = e;
        this.patientTemp.city='';
        this.cityOptions =  this.provinces.find(item => item.name == e).citys
      },
      getCity(e){
        this.patientTemp.city = e
      },
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
          this.temp.disease_first_level_id = e;
          // 获取二级病种
          this.temp.disease_second_level_id=undefined;
          this.temp.disease_second_level_name='';
          // second_level_id
          // this.levelDiseaseOption =  this.levelDisease.find(item => {
          //   console.log(item.first_level_id)
          //   item.first_level_id == e
          // })

          getSecondDisease(e).then(response => {
            this.levelDiseaseOption = response.data
          });
        }else if(val=='filter'){
          this.listQuery.disease_id= e;
          // this.getList()
        }
      },
      getDiseaseLevel(e){
        this.temp.disease_second_level_id = e
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
          pay_type:'',
          visit_type:''
          // disease_first_level_id:undefined,
          // disease_first_level_name:'',
          // disease_second_level_id:undefined,
          // disease_second_level_name:'',
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
      getOutList(){
        var id = this.$route.params && this.$route.params.id;
        this.outlistLoading = true;
        patientOutList(id).then(response => {
          this.outList = response.data;
          this.outlistLoading = false
        });
      },
      fetchData() {
        var id = this.$route.params && this.$route.params.id;

        patientView(id).then(response => {
          this.patientInfo = response.data
        });
        this.roles = store.getters && store.getters.roles;

        this.paylistLoading = true;
        this.hospitalizationlistLoading = true;
        this.operationlistLoading = true;
        this.consultsListLoading = true;
        this.returnListLoading = true;

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
          this.hospitalOption = response.data;
        })
      },
      handleCreate(name) {
        if(name == 'out'){
          this.resetTemp();
          if(getHospital()!='null'){
            this.temp.hospital_id =  getHospital();
            this.temp.hospital_name = this.hospitalOption.find(v => v.id == getHospital()).name;
            doctorList(this.temp.hospital_id ).then(response => {
              this.doctorOption = response.data
            });
          }else{
            this.temp.hospital_id =  undefined;
            this.temp.hospital_name = '';
          }
          this.dialogStatus = 'createOut'
        }else if(name == 'pay'){
          this.resetPayTemp();
          if(getHospital()!='null'){
            this.payTemp.hospital_id =  getHospital();
            this.payTemp.hospital_name = this.hospitalOption.find(v => v.id == getHospital()).name;
            doctorList(this.payTemp.hospital_id ).then(response => {
              this.doctorOption = response.data
            });
          }else{
            this.payTemp.hospital_id =  undefined;
            this.payTemp.hospital_name = '';
          }
          var id = this.$route.params && this.$route.params.id;
          paymentsAdd(id).then(response => {
            if(response.data.hospital_id != 'null'){
              this.payTemp.hospital_id = response.data.hospital_id;
              this.payTemp.doctor_id = response.data.doctor_id;
              this.payTemp.hospital_name = this.hospitalOption.find(v => v.id == response.data.hospital_id).name;
              doctorList(response.data.hospital_id ).then(res => {
                this.doctorOption = res.data
                this.payTemp.doctor_name = this.doctorOption.find(v => v.id == response.data.doctor_id).name;
              });
            }
            if(response.data.at_date != 'null'){
              this.payTemp.at_date = response.data.at_date;
            }
          });
          this.dialogStatus = 'createPay'
        }else if(name=='operation'){
          this.resetOperationTemp();
          this.dialogStatus = 'createOperation'
        }else if(name=='hospitalization'){
          this.resetHospitalizationTemp();
          if(getHospital()!='null'){
            this.hospitalizationTemp.hospital_id =  getHospital();
            this.hospitalizationTemp.hospital_name = this.hospitalOption.find(v => v.id == getHospital()).name;
            doctorList(this.hospitalizationTemp.hospital_id ).then(response => {
              this.doctorOption = response.data
            });
          }else{
            this.hospitalizationTemp.hospital_id =  undefined;
            this.hospitalizationTemp.hospital_name = '';
          }
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
              let param = Object.assign({}, this.temp); // copy obj
              this.$delete(param,'patient_name');
              this.$delete(param,'hospital_name');
              this.$delete(param,'doctor_name');
              this.$delete(param,'source');
              this.$delete(param,'disease_first_level_name');
              this.$delete(param,'disease_second_level_name');
              // this.temp.patient_id = parseInt(id);
              this.$set(this.temp,'patient_id',id);
              outpatientAdd(this.temp).then((res) => {
                // this.outList.unshift(res.data);
                this.getOutList();
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
          if(this.patientTemp.province!=''){
            this.cityOptions =  this.provinces.find(item => item.name == this.patientTemp.province).citys
          }
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
              if(!tempData.disease_second_level_id){
                this.$set(tempData,'disease_second_level_id','');
              }
              this.$delete(tempData,'patient_name');
              this.$delete(tempData,'hospital_name');
              this.$delete(tempData,'doctor_name');
              this.$delete(tempData,'source');
              this.$delete(tempData,'disease_first_level_name');
              this.$delete(tempData,'disease_second_level_name');
              outpatientUpdate(tempData.id,tempData).then(() => {
                // const index = this.outList.findIndex(v => v.id === this.temp.id);
                // this.outList.splice(index, 1, this.temp);
                this.getOutList();
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
