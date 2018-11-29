import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
import {
  GET_FOOD_LIST,
  GET_DRINK_LIST,
  GET_EXTRA_LIST,
  ADD_ORDER
} from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    food: [],
    drink: [],
    extra: []
  },
  mutations: {
    setFoodList: (state, payload) => {
      state.food = payload;
    },
    setDrinkList: (state, payload) => {
      state.drink = payload;
    },
    setExtraList: (state, payload) => {
      state.extra = payload;
    }
  },
  actions: {
    addOrder: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_ORDER,
          variables: payload
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    getExtraList: ({ commit }) => {
      apolloClient
        .query({
          query: GET_EXTRA_LIST
        })
        .then(({ data }) => {
          commit("setExtraList", data.getExtraList);
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
    }
  },
  getters: {
    food: state => state.food,
    drink: state => state.drink,
    extra: state => state.extra
  }
});
