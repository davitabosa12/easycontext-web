<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <v-btn v-on:click="goBack" icon small>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span class="font-weight-light">Rule "{{ruleName}}"</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text href target="_blank" v-on:click="exportJSON">
      <span class="mr-2">Export</span>
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      absolute
      bottom
    >
      {{ snackbarMessage }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app-bar>
  
</template>

<script>
import exporter from "../exporter";
export default {
  data: () => ({
    snackbar: false,
    snackbarMessage : "Default Message!"
  }),
  methods: {
    goBack() {
        this.$router.push("/");
    },
    exportJSON() {
        
      let result = exporter(this.$store.getters.fencesG);
      if (result.error) {
        
        this.snackbarMessage = `${result.error.cause} "${result.error.where}"`;
        this.snackbar = true;
        return;
      }
      const url = window.URL.createObjectURL(new Blob([result.json]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "configuration.json"); //or any other extension
      document.body.appendChild(link);
      alert(`exporting....${link}` )
      link.click();
    }
  },
  computed: {
    ruleName() {
      var arr = this.$router.history.current.path.split("/");
      console.log(arr.length);
      return arr[arr.length - 1];
    }
  }
};
</script>

<style>
</style>