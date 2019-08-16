import Vue from 'vue'
import Vuex from 'vuex'
import Fence from './model/Fence'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fences: [
      
    ],
    components: [

    ],
  },
  mutations: {
    createFence: (state, fenceName) => {
      let obj = {};
      obj.fence = new Fence(fenceName);
      obj.components = new Set();
      state.fences.push(obj);
    },
    deleteFence: (state, fenceName) => {
      let index = state.fences.findIndex( value => {
        console.log("Checking " + value.fence.name)
        return value.fence.name === fenceName;
      });
      if(index > -1){
        //delete their components first
        console.log(state.fences[index].components)
        state.fences[index].components.forEach(element => {
          delete state.components[element];
        });

        state.fences.splice(index, 1);
        console.log(state.components)
      }

      else
        console.log("error")
    },
    updateRulesInFence(state, {fenceName, rules, componentState}){
      console.log("updateRule: " + fenceName);
      let index = state.fences.findIndex( value =>{
        return value.fence.name === fenceName;
      });
      if(index > -1){
        state.fences[index].rule = rules;
        state.fences[index].components.add(componentState.id)
        console.log("Update successful");
      } else {
        console.error(`${fenceName} not found in Store.`)
      }

    },
    updateActionsInFence(state, {fenceName, actions, componentState}){
      console.log("updateAction: " + fenceName);
      let index = state.fences.findIndex( value =>{
        return value.fence.name === fenceName;
      });
      if(index > -1){
        state.fences[index].action = actions;
        state.fences[index].components.add(componentState.id)
        console.log("Update successful");
      } else {
        console.error(`${fenceName} not found in Store.`);
      }
    },
    dumpComponent(state, component){
      console.log(`Dumping ${component.id}`);
      state.components[component.id] = component;
    },
    removeComponent(state, componentId){
      console.log(`Removing ${componentId}`);
      delete state.components[componentId];
    }
  },
  actions: {

  },
  getters:{
    fencesG: state =>{
      return state.fences;
    },
    fenceInfo: state => fenceName =>{
      let index = state.fences.findIndex( value =>{
        return value.fence.name === fenceName;
      });
      if(index > -1){
        return state.fences[index].rule
      } 
      return [];
    },
    actionInfo: state=> fenceName =>{
      let index = state.fences.findIndex( value =>{
        return value.fence.name === fenceName;
      });
      if(index > -1){
        return state.fences[index].action
      } 
      return [];
    },
    componentState: state => componentId => {
      return state.components[componentId];
    },
    fenceExists: state => fenceName =>{
      let index = state.fences.findIndex( value =>{
        return value.fence.name === fenceName;
      });
      return index > -1;
    }
    
  }
})
