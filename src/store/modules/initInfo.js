import * as types from '../mutation-types'
import { initInfo } from '../../api/rest'; 



const state = {
    info:{}
}

// getters
const getters = {
    initInfo: state => state.info,
}

// mutations
const mutations = {
    [types.RECEIVE_INITINFO](state, param) {
        state.info=Object.assign({},state.info,param);
        debugger
    }  
}

// actions
const actions = {
    getInitInfo({ commit }, param) {
        return new Promise((resolve, reject) => {
            initInfo.queryinfo(param, (res => {
                debugger
                commit(types.RECEIVE_INITINFO, res.data)
                resolve(res)//暂时不用
            }), (res => {
                reject(res)
            }))
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions  
}