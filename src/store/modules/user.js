import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,getId,setId,removeId,getName,setName,removeName,getHospital,setHospital,removeHospital } from '@/utils/auth'
import router, { resetRouter } from '@/router'

import store from '@/store'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  id:undefined,
  hospital_id:undefined
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_HOSPITAL: (state, id) => {
    state.hospital_id = id
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data.token);
        commit('SET_ID', response.data.id);
        commit('SET_NAME', response.data.name);
        commit('SET_HOSPITAL', response.data.hospital_id);
        setId(response.data.id);
        setName(response.data.name);
        setToken(data.token);
        setHospital(response.data.hospital_id);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getId()).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { roles, name, avatar, introduction } = data
        let roles = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          roles = ['首页'];
          commit('SET_ROLES', roles);
          resolve(roles);
          reject('没有权限')
        }
        commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      logout().then(() => {
        commit('SET_ID', '');
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_NAME', '');
        commit('SET_HOSPITAL', '');
        removeToken();
        resetRouter();
        removeId();
        removeName();
        removeHospital();

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_ID', '');
      commit('SET_NAME', '');
      removeToken();
      removeId();
      removeName();
      removeHospital();
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
