export default {
    namespaced: true,
    state: {
        isList: false,
        keyword: "",
        searchInfo: "",
    },
    mutations: {
        setIsList(state, value) {
            state.isList = value;
        },
        setKeyword(state, value) {
            state.keyword = value;
        },
        setSearchInfo(state, value) {
            state.searchInfo = value;
        },

        setPage(state,value){
            state.page = value;
        },
        setGetPage(state,value){
            state.getPage = value;
        }
    },
    actions: {
        setIsListAsync(content, value) {
            content.commit('setIsList', value)
        },
        setKeywordAsync(content, value) {
            content.commit('setKeyword', value)
        },
        setSearchInfoAsync(content, value) {
            content.commit('setSearchInfo', value)
        },

        setPageAsync(content,value){
            content.commit('setPage',value)
        },
        setGetPageAsync(content,value){
            content.commit('setGetPage',value)
        },
    }
}