export default {
    namespaced: true,
    state: {
        userOrder: [],
        userInfo: [],
        orderList: [],
    },
    mutations: {
        setUserOrder(state,value){
            state.userOrder = value;
        },
        setUserInfo(state,value){
            state.userInfo = value;
        },
        setOrderList(state,value){
            state.orderList = value;
        },
    },
    actions: {
        setUserOrderAsync(content,value){
            content.commit('setUserOrder',value)
        },
        setUserInfoAsync(content,value){
            content.commit('setUserInfo',value)
        },
        setOrderListAsync(content,value){
            content.commit('setOrderList',value)
        },
    }
}