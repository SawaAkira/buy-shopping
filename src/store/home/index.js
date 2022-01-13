export default {
    namespaced: true,
    state: {
        bannerList: [],
        menusList: [],
        newsList: [],
        fastList: [],
        bastBannerList: [],
        bastList: [],
        hotList: [],
        benefitList: [],
    },
    mutations: {
        setBanner(state,value){
            state.bannerList = value;
        },
        setMenus(state, value) {
            state.menusList = value;
        },
        setNews(state, value) {
            state.newsList = value;
        },
        setFast(state, value) {
            state.fastList = value;
        },
        setBastBanner(state, value) {
            state.bastBannerList = value;
        },
        setBastList(state, value) {
            state.bastList = value;
        },
        setHot(state, value) {
            state.hotList = value;
        },
        setBenefit(state, value) {
            state.benefitList = value;
        },
    },
    actions: {
        setBannerAsync(content,value){
            content.commit('setBanner',value)
        },
        setMenusAsync(content, value) {
            content.commit('setMenus', value)
        },
        setNewsAsync(content, value) {
            content.commit('setNews', value)
        },
        setFastAsync(content, value) {
            content.commit('setFast', value)
        },
        setBastBannerAsync(content, value) {
            content.commit('setBastBanner', value)
        },
        setBastListAsync(content, value) {
            content.commit('setBastList', value)
        },
        setHotAsync(content, value) {
            content.commit('setHot', value)
        },
        setBenefitAsync(content, value) {
            content.commit('setBenefit', value)
        },
    }
}