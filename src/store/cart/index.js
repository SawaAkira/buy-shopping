export default {
    namespaced: true,
    state: {
        cartList: [],
    },
    mutations: {
        setCartList(state,value){
            state.cartList = value;
        },
    },
    actions: {
        setCartListAsync(content,value){
            content.commit('setCartList',value)
        },
    }
}