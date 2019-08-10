<template>
  <div ref="theMap" class="map"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
export default {
  props: {
    center: Object,
    apiKey: String,
    markerPoint: Object,
    radius: Number,
    onClick: Function
  },
  watch: {
    markerPoint: function(newValue) {
        this.drawMarker(newValue);
        this.drawCircle(newValue, this.$props.radius);
    },
    radius: function(newValue){
        this.drawCircle(this.$props.markerPoint, newValue);
    }
  },
  data: () => {
    return {
      google: null,
      map: null,
      currentMarker: null,
      currentCircle: null
    };
  },
  methods: {
    initMap() {
      this.map = new this.google.maps.Map(this.$refs.theMap, {
        draggable: true,
        gestureHandling: "auto",
        zoom: 16,
        center: this.$props.center,
        disableDefaultUI: true
      });
        this.drawMarker(this.$props.markerPoint, this.$props.radius);
        this.drawCircle(this.$props.markerPoint, this.$props.radius);
      this.map.addListener("click", evt => {
        this.$props.onClick(evt);
      });
    },
    drawMarker(position){
        if (this.currentMarker !== null) {
        this.currentMarker.setMap(null);
      }
      this.currentMarker = new this.google.maps.Marker({
        position: position,
        map: this.map
      });
    },
    drawCircle(position, radius){
        if (this.currentCircle !== null) {
        this.currentCircle.setMap(null);
      }
      this.currentCircle = new this.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: position,
        radius: Number(radius)
      });
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initMap();
  }
};
</script>

<style>
.map {
  clear: both;
  height: 200px;
}
</style>
