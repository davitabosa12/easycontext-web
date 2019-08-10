<template>
  <div ref="theMap" class="map"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
export default {
  props: {
    mapConfig: Object,
    apiKey: String
  },
  data: () => {
    return {
        google: null,
        map: null,
    };
  },
  methods: {
    initMap() {
      // The location of Uluru
      var uluru = { lat: -25.344, lng: 131.036 };
      // The map, centered at Uluru
      new this.google.maps.Map(this.$refs.theMap, {
        zoom: 4,
        center: uluru
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
