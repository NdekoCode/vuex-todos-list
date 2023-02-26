import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// UN peu comme data(){ return {} }
const state = {
  todos: [
    {
      name: "Apprendre Typescript",
      completed: true,
    },
    {
      name: "Apprendre Docker",
      completed: true,
    },
  ],
};
/** Une action ça va etre une fonction qui va ensuite delencher une mutation */
const actions = {
  addTodo: (store, name) => {
    if (name.length >= 2) {
      store.commit("ADD_TODO", name);
      name = "";
    } else {
      alert("Entrer une tache correcte");
    }
  },
};

/** Lorsque l'on est dans un composant on ne faira jamais appel directement au state mais on utilisera les getters pour obtenir ces informations*/
const getters = {
  todos: (state) => state.todos,
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  noCompletedTodos: (state) => state.todos.filter((todo) => !todo.completed),
  done: (state) => getters.completedTodos(state).length,
  undone: (state) => getters.noCompletedTodos(state).length,
};
/** Son des fonctions qui vont permettre de muter ou de modifier notre Etat, faire des changement au niveau de notre state */
const mutations = {
  ADD_TODO: (state, nameOfTodo) => {
    state.todos.push({ name: nameOfTodo, completed: false });
  },
};

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  //   Nous empeche de muter les choses et donc on faira des modifications uniquement sur les copies du state sans toucher au vrais state
  strict: true,
});
global.store = store;
export default store;
