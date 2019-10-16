<template>
  <div>
    <div v-if="isMini">
      <v-card max-width="70px" max-height="70px">
        <v-icon size="70" @click="toggleMini">my_location</v-icon>
      </v-card>
    </div>

    <div v-if="!isMini">
      <v-card min-width="300px" max-width="300px" max-height="430px" min-height="430px">
        <v-card-title>
          <v-layout wrap>
            <v-flex sm6>
              <span>Location</span>
            </v-flex>
            <v-flex sm6>
              <v-layout wrap>
                <v-flex sm8></v-flex>
                <v-flex sm2>
                  <v-btn icon small color="red" @click="performDelete">
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex sm2>
                  <v-btn small icon text @click="toggleMini">
                    <v-icon small>minimize</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-container>
          <v-layout wrap>
            <v-flex justify-space-around align-center align-content-center v-if="!isMapShown">
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
      </v-card>
    </div>
  </div>
</template>

<script>
import LocationMethod from "../../model/enums/LocationMethod";
import LocationRule from "../../model/rules/LocationRule"
import GoogleMap from "../../components/GoogleMap";
export default {
  components: {
    GoogleMap
  },
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted: function(){
    const prevState = this.$store.getters.componentState(this.id);
    if(prevState){
      this.selected = prevState.selected || this.selected;
      this.isMini = prevState.isMini || this.isMini;
      this.latitude = prevState.latitude || this.latitude;
      this.longitude = prevState.longitude || this.longitude;
      this.radius = prevState.radius || this.radius;
      this.dwellTime = prevState.dwellTime || this.dwellTime;
      this.isMapShown = prevState.isMapShown || this.isMapShown;
      this.currentMarker = prevState.currentMarker || this.currentMarker;
      this.currentCircle = prevState.currentCircle || this.currentCircle;
    }
    this.sendData();
  },
  updated: function(){
    this.sendData();
  },

  data: () => {
    return {
      selected: LocationMethod.ENTERING,
      methods: [
        { text: "Entering", value: LocationMethod.ENTERING },
        { text: "Exiting", value: LocationMethod.EXITING },
        { text: "In", value: LocationMethod.IN }
      ],
      latitude: -3.746561874382303,
      longitude: -38.578126430511475,
      radius: 100,
      dwellTime: 1000,
      isMini: false,
      currentMarker: null,
      currentCircle: null,
      isMapShown: false
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
    showMap() {
      this.isMapShown = true;
    },
    hideMap() {
      this.isMapShown = false;
    },
    sendData(){
      let obj = {};
      obj.id = this.id;
      obj.selected = this.selected;
      obj.isMini = this.isMini;
      obj.latitude = this.latitude;
      obj.longitude = this.longitude;
      obj.radius = this.radius;
      obj.dwellTime = this.dwellTime;
      obj.currentMarker = this.currentMarker;
      obj.currentCircle = this.currentCircle;
      obj.isMapShown = this.isMapShown;
      try {
      switch (this.selected) {
        case LocationMethod.ENTERING:
          this.onChange(this.id, {rule: LocationRule.entering(this.latitude, this.longitude, this.radius), componentState: obj})
          break;
        case LocationMethod.EXITING:
          this.onChange(this.id, {rule: LocationRule.exiting(this.latitude, this.longitude, this.radius), componentState: obj})
          break;
        case LocationMethod.IN:
          this.onChange(this.id, {rule: LocationRule.in(this.latitude, this.longitude, this.radius, this.dwellTime), componentState: obj})
          break;
      }
    } catch (error) {
      console.log(error);
    }
    },
    performDelete(){
      try {
        this.onDelete(this.id);
      } catch (error) {
        console.log("onDelete not bound on this LocationCard. Id:" + this.id);
      }
    }
  }
};
</script>

<style>
</style>
