<template>
  <v-app>
    

    <v-content>
      <router-view name="navigation"></router-view>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import exporter from "./exporter"
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods:{
    exportJSON() {
      let result = exporter(this.$store.getters.fencesG);
      if(result.error){
        alert(`${result.error.cause} in fence ${result.error.where}`);
        return;
      }
      const url = window.URL.createObjectURL(new Blob([result.json]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'configuration.json') //or any other extension
      document.body.appendChild(link)
      link.click()
    }
  },
  computed:{
    isHomePage(){
      console.log(this.$router.history.current.path + "");
      return this.$router.history.current.path;
    }
  }
};
</script>
