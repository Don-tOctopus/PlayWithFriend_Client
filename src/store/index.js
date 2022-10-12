import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  //새로고침해도 store의 정보 초기화 되지 않도록 함
  plugins: [createPersistedState()],
  state: {
    username: '',
    userEmail:'',
    token: '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    // logout(state){
    //   this.clearUserInfo(state)
    //   localStorage.removeItem('vuex')
    //   location.reload()
    // },
    setUserInfo(state, userInfo) {
      state.username = userInfo.userName;
      state.userEmail = userInfo.email;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUserInfo(state) {
      state.username = '';
      state.userEmail = '';
      state.token = '';
    },
  },
})

export default store;