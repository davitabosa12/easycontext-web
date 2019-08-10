<template>
  <v-card max-width="250">
    <div>
      <v-card-title>
        <span>Location</span>
        <v-icon right v-on:click="toggleMini">remove</v-icon>
      </v-card-title>
      <div v-if="!isMini">
        <v-container>
          <v-layout wrap>
            <v-flex>
              <v-select :items="methods" v-model="selected" label="Method" @change="changeForms"></v-select>
            </v-flex>
            <v-flex>
                <v-text-field
                    label="Latitude"
                    type="number"
                ></v-text-field>
                <v-text-field
                    label="Longitude"
                    type="number"
                ></v-text-field>
                <v-text-field
                    label="Radius (meters)"
                    type="number"
                    min="0"
                ></v-text-field>
                <v-text-field
                    v-if="selected === 'LOCATION.IN'"
                    label="Dwell time (ms)"
                    type="number"
                    min="0"
                ></v-text-field>
            </v-flex>
            <v-flex>
<Map
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
</Map>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-card>
</template>

<script>
import LocationMethod from "../../model/enums/LocationMethod";
import Map from 'vue2-google-maps';
export default {
    components:{
        Map
    },
  data: () => {
    return {
      selected: undefined,
      methods: [
        { text: "Entering", value: LocationMethod.ENTERING },
        { text: "Exiting", value: LocationMethod.EXITING },
        { text: "In", value: LocationMethod.IN }
      ],
      isMini: false
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    changeForms() {

    }
  }
};
</script>

<style>
</style>
