<template>
  <v-card max-width="250" v-on:dblclick="toggleMini">
    <div>
      <v-card-title>
        <span>Activity</span>
        <v-icon right v-on:click="toggleMini">remove</v-icon>
      </v-card-title>
      <div v-if="!isMini">
        <v-container fluid>
          <v-layout wrap>
            <v-flex>
              <v-select :items="methods" v-model="selected" label="Method"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6 v-for=" type in activityTypes"
                v-bind:key="type.label">
              <v-checkbox
                
                v-model="activitiesSelected"
                :label="type.label"
                :value="type.value"
              ></v-checkbox>
            </v-flex>
            
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-card>
</template>

<script>
import DAMethod from "../../model/enums/DAMethod";
export default {
  data: () => {
    return {
      selected: undefined,
      methods: [
        { text: "Starting", value: DAMethod.STARTING },
        { text: "Stopping", value: DAMethod.STOPPING },
        { text: "During", value: DAMethod.DURING }
      ],
      isMini: false,
      activitiesSelected: [],
      activityTypes: [
        { label: "In vehicle", value: DAMethod.IN_VEHICLE },
        { label: "On bicycle", value: DAMethod.ON_BICYCLE },
        { label: "On foot", value: DAMethod.ON_FOOT },
        { label: "Running", value: DAMethod.RUNNING },
        { label: "Still", value: DAMethod.STILL },
        { label: "Tilting", value: DAMethod.TILTING },
        { label: "Walking", value: DAMethod.WALKING },
        { label: "Unknown", value: DAMethod.UNKNOWN }
      ]
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
