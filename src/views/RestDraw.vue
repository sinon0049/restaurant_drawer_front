<template>
  <div class="container">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100% - 3rem);
  #map {
    height: 100%;
  }
}
</style>

<script lang="ts" setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, reactive } from "vue";

const loader = new Loader({
  apiKey: import.meta.env.VITE_APIKEY,
  version: "weekly",
  libraries: ["places"],
});

const location = reactive({
  lat: 0,
  lng: 0,
});
let map;
let marker;
let circle;

async function getCurrentLocation() {
  const google = await loader.load();
  navigator.geolocation.getCurrentPosition((pos) => {
    location.lat = pos.coords.latitude;
    location.lng = pos.coords.longitude;
    const mapEl = document.getElementById("map");
    console.log(pos);

    //init map
    if (mapEl) {
      map = new google.maps.Map(mapEl, {
        center: location,
        zoom: 18,
        //disableDefaultUI: true,
      });
      //init marker
      marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      //init circle
      circle = new google.maps.Circle({
        map: map,
        center: location,
        radius: 100,
        strokeWeight: 1.5,
        strokeColor: "#1ed0f4",
        fillColor: "#82e0f3",
      });
    }
  });
}

onMounted(() => getCurrentLocation());
</script>
