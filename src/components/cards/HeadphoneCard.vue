<template>
  <v-card max-width="250" max-height="200" v-on:dblclick="toggleMini">
    <div>
      <v-card-title>
        <span>Headphone</span>
        <v-icon right v-on:click="toggleMini">remove</v-icon>
      </v-card-title>
      <div v-if="!isMini">
        <v-container>
          <v-layout wrap>
            <v-select :items="methods" v-model="selected" label="Method"></v-select>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-card>
</template>

<script>
import HeadphoneMethod from "../../model/enums/HeadphoneMethod";
export default {
  data: () => {
    return {
      selected: undefined,
      methods: [
        { text: "Plugging In", value: HeadphoneMethod.PLUGGING_IN },
        { text: "Unplugging", value: HeadphoneMethod.UNPLUGGING }
      ],
      isMini: false
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    }
  }
};
</script>

<style>
</style>
