<template>
  <v-card max-width="500px" min-height="500px">
    <v-card-title>
      <v-layout wrap>
        <v-flex sm6>
          <span>Custom Action</span>
        </v-flex>
        <v-flex sm6>
          <v-layout wrap>
            <v-flex sm10></v-flex>
            <v-flex sm2>
              <v-btn icon small color="red" @click="performDelete">
                <v-icon small>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-text-field label="Class Name" placeholder="com.example.MyCustomAction" v-model="classPath"></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import Action from "../../model/Action";
export default {
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted(){
      const prevState = this.$store.getters.componentState(this.id);
      if(prevState){
          this.classPath = prevState.classPath || this.classPath;
      }
      this.sendData();
  },
  updated() {
    this.sendData();
  },
  data() {
    return {
      classPath: ""
    };
  },
  methods: {
    performDelete() {
      this.onDelete(this.id);
    },
    sendData() {
      let action = new Action(this.classPath);
      let componentState = {};
      componentState.classPath = this.classPath;
      componentState.id = this.id;
      this.onChange(this.id, {
        action: action,
        componentState: componentState
      });
    }
  }
};
</script>

<style>
</style>