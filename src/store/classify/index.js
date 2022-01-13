export default {
    namespaced: true,
    state: {
        asideList: [],
    },
    mutations: {
        setAside(state,value){
            state.asideList = value;
        },
    },
    actions: {
        setAsideAsync(content,value){
            content.commit('setAside',value)
        },
    }
}