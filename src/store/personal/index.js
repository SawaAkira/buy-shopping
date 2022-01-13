export default {
    namespaced: true,
    state: {
        userOrder: [],
        userInfo: [],
        orderList: [],
    },
    mutations: {
        setUserInfo(state,value){
            state.userInfo = value;
        },
        setOrderList(state,value){
            state.orderList = value;
        },
    },
    actions: {
        setUserInfoAsync(content,value){
            content.commit('setUserInfo',value)
        },
        setOrderListAsync(content,value){
            content.commit('setOrderList',value)
        },
    }
}