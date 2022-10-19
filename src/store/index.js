import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from "../axios.js";

const store = createStore({
  //새로고침해도 store의 정보 초기화 되지 않도록 함
  plugins: [createPersistedState()],
  state: {
    user:''
  },
  getters: {
    isLogin(state) {
      return state.user !== '';
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.data;
      localStorage.setItem("user", JSON.stringify(userData.data));
    },
    LOGOUT(state) {
      // 반대 로직
      state.user = ''
      localStorage.removeItem("user")
      axios.defaults.headers.common['Authorization'] = null

      // 더 좋은 코드
      // localStorage.clear();
      location.reload();
    }
  },
  actions:{
    login({ commit }, credentials) {
      console.log(credentials)
      return axios
        .post("/user/login", credentials)
        .then(({ data }) => {
          console.log("user data is", data);
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    }
  }
})

export default store;