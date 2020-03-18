import request from '@/utils/request'

//  医院列表
export function hospitalList() {
  return request({
    url: '/api/hospitals',
    method: 'get',
    // params: query
  })
}

// 增加医院信息
export function hospitalAdd(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/api/hospitals',
    method: 'post',
    data
  })
}

//  修改医院信息
export function hospitalUpdate(id, data) {
  return request({
    url: `/api/hospitals/${id}`,
    method: 'put',
    data
  })
}

//  删除医院信息
export function hospitalDel(id) {
  return request({
    url: `/api/hospitals/${id}`,
    method: 'DELETE',
  })
}

//  医院详情
export function hospitalView(id) {
  return request({
    url: `/api/hospitals/${id}`,
    method: 'get',
    // params: query
  })
}

//  合作科室列表
export function departmentsList(id) {
  return request({
    url: `/hospitals/${id}/departments`,
    method: 'get',
    // params: query
  })
}
//  新增合作科室
export function departmentsAdd(id,data) {
  return request({
    url: `/api/hospitals/${id}/departments/{department_id}`,
    method: 'post',
    data
  })
}

//  修改合作科室信息
export function departmentsUpdate(hospital_id,department_id, data) {
  return request({
    url: `/api/hospitals/${hospital_id}/departments/${department_id}`,
    method: 'put',
    data
  })
}

//  删除合作科室信息
//  hospital_id  department_id
export function departmentsDel(hospital_id,department_id) {
  return request({
    url: `/api/hospitals/${hospital_id}/departments/${department_id}`,
    method: 'DELETE',
  })
}


//  合作项目列表
export function projectsList(hospital_id) {
  return request({
    url: `/api/hospitals/${hospital_id}/projects`,
    method: 'get',
    // params: query
  })
}
//  新增合作项目
//  hospital_id
export function projectsAdd(hospital_id,data) {
  return request({
    url: `/api/hospitals/${hospital_id}/projects`,
    method: 'post',
    data
  })
}

//  修改合作科室信息
//  hospital_id  project_id
export function projectsUpdate(hospital_id,project_id, data) {
  return request({
    url: `/api/hospitals/${hospital_id}/projects/${project_id}`,
    method: 'put',
    data
  })
}

//  删除合作科室信息
//  hospital_id  department_id
export function projectsDel(hospital_id,project_id) {
  return request({
    url: `/api/hospitals/${hospital_id}/projects/${project_id}`,
    method: 'DELETE',
  })
}
//  医院名称列表
export function hospitalNameList() {
  return request({
    url: '/api/hospitals/names',
    method: 'get',
    // params: query
  })
}

//  医院详情
export function doctorList(hospital_id) {
  return request({
    url: `/api/hospitals/${hospital_id}/doctors/names`,
    method: 'get',
    // params: query
  })
}

//  合作项目名称列表
export function projectsNameList(hospital_id) {
  return request({
    url: `/api/hospitals/${hospital_id}/projects/names`,
    method: 'get',
    // params: query
  })
}
