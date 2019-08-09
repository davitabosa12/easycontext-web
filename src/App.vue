<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Easy</span>
        <span class="font-weight-light">Context</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href=""
        target="_blank"
        v-on:click="exportJSON"
      >
        <span class="mr-2">Export</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods:{
    exportJSON() {
      alert("exportJSON");
    }
  }
};
</script>
