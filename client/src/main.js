import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  // uri: "http://localhost:4000/graphql"
  uri: "https://burger-queen-project-imkjrtsrbd.now.sh/graphql"
});

const apolloProvider = new VueApollo({ defaultClient });
Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
