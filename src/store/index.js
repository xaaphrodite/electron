import { createStore } from "vuex";
import pertistedState from "vuex-persistedstate";

export default createStore({
  plugins: [pertistedState()],
  state: {
    whoAreYou: null,
  },
  mutations: {
    iamIs(state, payload) {
      state.whoAreYou = payload;
    },
  },
  actions: {
    //
  },
  modules: {
    //
  },
});
