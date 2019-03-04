import * as actions from "./actions";
import initInfo from "./modules/initInfo";

import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {

};

const getters = {

};

const mutations = {

};

export default new Vuex.Store({
    state,  
    getters,
    mutations,
    actions,
    modules: {
        initInfo
    }
});
