<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Easy</span>
      <span class="font-weight-light">Context</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text href target="_blank" v-on:click="exportJSON">
      <span class="mr-2">Export</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import exporter from "../exporter"
export default {
  data: () => ({
    //
  }),
  methods: {
    exportJSON() {
      let result = exporter(this.$store.getters.fencesG);
      if (result.error) {
        alert(`${result.error.cause} in fence ${result.error.where}`);
        return;
      }
      const url = window.URL.createObjectURL(new Blob([result.json]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "configuration.json"); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  },
  computed: {
    isHomePage() {
      console.log(this.$router.history.current.path + "");
      return this.$router.history.current.path;
    }
  }
};
</script>

<style>
</style>