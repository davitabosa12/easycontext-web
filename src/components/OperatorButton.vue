<template>
  <v-btn v-on:click="performClick" color="pink" dark fab>{{operation}}</v-btn>
</template>

<script>
export default {
  props:{
    onChange: Function,
    onClick: Function,
    id: Number,
  },
  mounted(){
    if(this.onChange){
        var obj = {
          operation: this.operation,
          id: this.id
        };
        this.onChange(obj);
      }
  },
  data() {
    return {
      operation: "and"
    };
  },
   methods: {
    performClick() {
      if(this.operation === "and"){
          this.operation = "or";
      } else {
          this.operation = "and";
      }
      if(this.onChange){
        var obj = {
          operation: this.operation,
          id: this.id
        };
        this.onChange(obj);
      }
      if(this.onClick){
        this.onClick();
      }
    },
   }
};
</script>

<style>
</style>