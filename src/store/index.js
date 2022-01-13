import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import classify from './classify'
import cart from './cart'
import personal from './personal'
import detail from './detail'
import search from './search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    isHomeShow: false,
    isClassifyShow: false,
    isCartShow: false,
    isErrorTipShow: false,
    isPersonalShow: false,
    isUserInfoShow: false,
    isOrderListShow: false,
    isDetailMaskShow: false,
    errorTip: "",
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    setHomeShow(state, value) {
      state.isHomeShow = value;
    },
    setClassifyShow(state, value) {
      state.isClassifyShow = value;
    },
    setCartShow(state, value) {
      state.isCartShow = value;
    },
    setPersonalShow(state, value) {
      state.isPersonalShow = value;
    },
    setUserInfoShow(state, value) {
      state.isUserInfoShow = value;
    },
    setOrderListShow(state, value) {
      state.isOrderListShow = value;
    },
    setErrorTipShow(state, value) {
      state.isErrorTipShow = value;
    },
    setErrorTip(state, value) {
      state.errorTip = value;
    },
    setDetailMaskShow(state, value) {
      state.isDetailMaskShow = value;
    },
  },
  actions: {
    setTokenAsync(content, value) {
      content.commit('setToken', value)
    },
    setHomeShowAsync(content, value) {
      content.commit('setHomeShow', value)
    },
    setCartShowAsync(content, value) {
      content.commit('setCartShow', value)
    },
    setClassifyShowAsync(content, value) {
      content.commit('setClassifyShow', value)
    },
    setPersonalShowAsync(content, value) {
      content.commit('setPersonalShow', value)
    },
    setUserInfoShowAsync(content, value) {
      content.commit('setUserInfoShow', value)
    },
    setOrderListShowAsync(content, value) {
      content.commit('setOrderListShow', value)
    },
    setErrorTipShowAsync(content, value) {
      content.commit('setErrorTipShow', value)
    },
    setErrorTipAsync(content, value) {
      content.commit('setErrorTip', value)
    },
    setDetailMaskShowAsync(content, value) {
      content.commit('setDetailMaskShow', value)
    },
  },
  modules: {
    home,
    classify,
    cart,
    personal,
    detail,
    search,
  }
})
