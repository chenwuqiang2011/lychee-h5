
const state = {
    isShow:false
}


const getters = {
    isShowMethod(state){
        return state.isShow;
    }
}


const actions = {
    showSideBar({commit}, n){
        commit('showBar', n);
    },
    hideSideBar({commit}, n){
        commit('hideBar', n);
    }
}


const mutations = {
    showBar(state){
        state.isShow=true;
    },
    hideBar(state){
        state.isShow=false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}