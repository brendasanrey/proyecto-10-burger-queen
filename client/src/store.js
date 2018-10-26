import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
import { SIGNIN_USER, GET_FOOD_LIST, GET_DRINK_LIST } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    food: [],
    drink: []
  },
  mutations: {
    setFoodList: (state, payload) => {
      state.food = payload;
    },
    setDrinkList: (state, payload) => {
      state.drink = payload;
    }
  },
  actions: {
    getFoodList: ({ commit }) => {
      apolloClient
        .query({
          query: GET_FOOD_LIST
        })
        .then(({ data }) => {
          commit("setFoodList", data.getFoodList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDrinkList: ({ commit }) => {
      apolloClient
        .query({
          query: GET_DRINK_LIST
        })
        .then(({ data }) => {
          commit("setDrinkList", data.getDrinkList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    food: state => state.food,
    drink: state => state.drink
  }
});
