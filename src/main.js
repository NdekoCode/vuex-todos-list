import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
Vue.use(Vuex);
Vue.config.devtools = true;

Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
