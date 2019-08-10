<template>
  <v-card min-width="500px" min-height="500px">
    <div>
      <v-card-title>
        <span>Location</span>
        <v-icon right v-on:click="toggleMini">remove</v-icon>
      </v-card-title>
      <div v-if="!isMini">
        <v-container>
          <v-layout wrap>
            <v-flex justify-space-around align-center align-content-center="" v-if="!isMapShown">
              <v-btn @click="showMap">Show map</v-btn>
            </v-flex>
            
            <v-flex sm12 v-else>
              <GoogleMap
                apiKey="AIzaSyC0WCWP3cqhaoSIurtzxXA5Q1SFmTDqwnE"
                :center="{lat: this.latitude, lng:this.longitude}"
                :onClick="mapClick"
                :markerPoint="{lat: Number(this.latitude), lng: Number(this.longitude)}"
                :radius="Number(radius)"
              />
              <v-btn @click="hideMap">Hide map</v-btn>
            </v-flex>
            <v-flex sm12>
              <v-select :items="methods" v-model="selected" label="Method"></v-select>
              <v-text-field label="Latitude" type="number" v-model="latitude" disabled></v-text-field>
              <v-text-field label="Longitude" type="number" v-model="longitude" disabled></v-text-field>
              <v-text-field label="Radius (meters)" type="number" min="0" v-model="radius"></v-text-field>
              <v-text-field
                v-if="selected === 'LOCATION.IN'"
                label="Dwell time (ms)"
                type="number"
                v-model="dwellTime"
                min="0"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-card>
</template>

<script>
import LocationMethod from "../../model/enums/LocationMethod";
import GoogleMap from "../../components/GoogleMap";
export default {
  components: {
    GoogleMap
  },
  data: () => {
    return {
      selected: LocationMethod.ENTERING,
      methods: [
        { text: "Entering", value: LocationMethod.ENTERING },
        { text: "Exiting", value: LocationMethod.EXITING },
        { text: "In", value: LocationMethod.IN }
      ],
      latitude: -3.7448579,
      longitude: -38.5787125,
      radius:100,
      dwellTime: 1000,
      isMini: false,
      currentMarker: null,
      currentCircle: null,
      isMapShown: false,
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    mapClick(evt) {
      this.latitude = evt.latLng.lat();
      this.longitude = evt.latLng.lng();
      
    },
    showMap(){
      this.isMapShown = true;
    },
    hideMap(){
      this.isMapShown = false;
    }
  }
};
</script>

<style>
</style>
