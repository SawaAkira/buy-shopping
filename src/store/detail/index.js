export default {
    namespaced: true,
    state: {
        storeInfo: [],
        allInfo: [],
        unique: "",
        chooseNum: 1,
        isChoose: false,
        page: 1,
        getPage: true,
        moreText:"<span></span>正在加载，不要急~",
        times: 0,
    },
    mutations: {
        setStoreInfo(state,value){
            state.storeInfo = value;
        },
        setAllInfo(state,value){
            state.allInfo = value;
        },
        setUnique(state,value){
            state.unique = value;
        },
        setChooseNum(state,value){
            state.chooseNum = value;
        },
        setIsChoose(state,value){
            state.isChoose = value;
        },

        setPage(state,value){
            state.page = value;
        },
        setGetPage(state,value){
            state.getPage = value;
        },
        setTimes(state,value){
            state.times = value;
        }
    },
    actions: {
        setStoreInfoAsync(content,value){
            content.commit('setStoreInfo',value)
        },
        setAllInfoAsync(content,value){
            content.commit('setAllInfo',value)
        },
        setUniqueAsync(content,value){
            content.commit('setUnique',value)
        },
        setChooseNumAsync(content,value){
            content.commit('setChooseNum',value)
        },
        setIsChooseAsync(content,value){
            content.commit('setIsChoose',value)
        },

        setPageAsync(content,value){
            content.commit('setPage',value)
        },
        setGetPageAsync(content,value){
            content.commit('setGetPage',value)
        },
        setTimesAsync(content,value){
            content.commit('setTimes',value)
        },
    }
}