import Vue from 'vue'
import Vuex from 'vuex'
import Fence from './model/Fence'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rules: [
      
    ],
  },
  mutations: {
    createRule: (state, ruleName) => {
      console.log(ruleName + "rulenem")
      state.rules.push(new Fence(ruleName));
    },
    updateRule: (state, ruleName) => {
      let index = state.rules.findIndex( value => {
        return value.name === ruleName;
      });
      if(index > -1){
        this.commit('deleteRule', ruleName);
        this.commit('createRule', ruleName);
      }
      else
        console.log("error")
      
    },
    deleteRule: (state, ruleName) => {
      console.log(state.rules)
      let index = state.rules.findIndex( value => {
        console.log("Checking " + value.name)
        return value.name === ruleName;
      });
      if(index > -1)
        state.rules.splice(index, 1);
      else
        console.log("error")
    }
  },
  actions: {

  },
  getters:{
    rulesG: state=>{
      return state.rules;
    }
  }
})
