<template>
  <div class="container">
    <button @click.stop.prevent="drawRandomRestaurant" id="draw">draw</button>
    <div id="map" class="map" :class="{ mapDrawed: isDrawed === true }"></div>
    <div class="rest-detail" :class="{ detailDrawed: isDrawed === true }">
      <fa-icon
        @click.stop.prevent="getCurrentLocation"
        icon="location-crosshairs"
        size="3x"
        id="locate"
      />
      <img
        :src="restaurant.photo"
        alt=""
        :class="{ imgDrawed: isDrawed === true }"
      />
      <div
        class="detail-container"
        :class="{ detailContainerDrawed: isDrawed === true }"
      >
        <span>name:&nbsp;&nbsp;{{ restaurant.name }}</span>
        <span>address:&nbsp;&nbsp;{{ restaurant.addr }}</span>
        <span>rating:&nbsp;&nbsp;{{ restaurant.rating }}</span>
        <span>phone:&nbsp;&nbsp;{{ restaurant.phone }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: calc(100% - 3rem);
  position: relative;
  display: flex;
  flex-direction: column;
  .map {
    height: 100%;
    width: 100%;
    transition: height 0.3s ease-in-out;
  }
  .rest-detail {
    height: 0;
    width: 100%;
    background-color: #282a35;
    transition: height 0.3s ease-in-out;
    display: flex;
    flex-direction: row;
    position: relative;
    img {
      width: 50%;
      margin: 1rem 0.5rem;
      object-fit: cover;
      display: none;
    }
    .detail-container {
      display: none;
      flex-direction: column;
      width: 90%;
      margin: 1rem auto 0 auto;
      color: white;
      span {
        margin-bottom: 0.5rem;
      }
    }
    .imgDrawed {
      display: block;
    }
    .detailContainerDrawed {
      display: flex;
    }
  }
  #draw {
    z-index: 10;
    color: white;
    background-color: #20222a;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100px;
    height: 50px;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #696969;
  }
  #locate {
    z-index: 10;
    color: #20222a;
    background-color: white;
    position: absolute;
    top: -60px;
    right: 10px;
    border-radius: 50%;
    box-shadow: 2px 2px 3px #696969;
  }
  .mapDrawed {
    height: 60%;
  }
  .detailDrawed {
    height: 40%;
  }
}

@media screen and (min-width: 768px) {
  .container {
    flex-direction: row;
    .map {
      height: 100%;
      transition: width 0.3s ease-in-out;
    }
    .rest-detail {
      height: 100%;
      width: 0%;
      transition: width 0.3s ease-in-out;
      flex-direction: column;
      img {
        width: 90%;
        aspect-ratio: 1/0.7;
      }
      #locate {
        top: unset;
        right: unset;
        bottom: 10px;
        left: -60px;
      }
    }
    .mapDrawed {
      width: 70%;
    }
    .detailDrawed {
      width: 30%;
    }
  }
}
</style>

<script lang="ts" setup>
/* global google: readonly */
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, reactive, ref } from "vue";

const loader = new Loader({
  apiKey: import.meta.env.VITE_APIKEY,
  version: "weekly",
  libraries: ["places"],
});
const restaurant = reactive({
  lat: 0,
  lng: 0,
  name: "",
  addr: "",
  rating: -1,
  photo: "",
  phone: "",
});
const location_user = reactive({
  lat: 0,
  lng: 0,
});
const isDrawed = ref(false);

let map: google.maps.Map;
let marker: google.maps.Marker;
let circle: google.maps.Circle;
let placesService: google.maps.places.PlacesService;

async function getCurrentLocation() {
  try {
    const google = await loader.load();
    const mapEl = document.getElementById("map") as HTMLDivElement;
    navigator.geolocation.getCurrentPosition((pos) => {
      location_user.lat = pos.coords.latitude;
      location_user.lng = pos.coords.longitude;

      //init map
      if (mapEl) {
        if (!map) {
          map = new google.maps.Map(mapEl, {
            center: location_user,
            zoom: 18,
            disableDefaultUI: true,
          });
        } else {
          //smoothly move map if user click locate button
          map.panTo(location_user);
        }

        //init marker
        marker = new google.maps.Marker({
          position: location_user,
          map: map,
        });
        //init circle
        circle = new google.maps.Circle({
          map: map,
          center: location_user,
          radius: 100,
          strokeWeight: 1.5,
          strokeColor: "#1ed0f4",
          fillColor: "#82e0f3",
        });
        //init placesService
        placesService = new google.maps.places.PlacesService(map);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function drawRandomRestaurant() {
  try {
    //request to be sent to google api
    const request = {
      location: location_user,
      radius: 300,
      type: "restaurant",
      openNow: true,
    };

    //get nearby restaurants from google
    placesService.nearbySearch(request, (results) => {
      if (results) {
        const restIdx = Math.floor(Math.random() * results.length);
        const resultDrawed = results[restIdx];
        if (resultDrawed.place_id) {
          //get details of selected restaurant
          placesService.getDetails(
            { placeId: resultDrawed.place_id },
            (result) => {
              //assign data to reactive object
              if (result && result.photos) {
                const photoIdx = Math.floor(
                  Math.random() * result.photos?.length
                );
                restaurant.photo = result.photos[photoIdx].getUrl();
                restaurant.lat = result.geometry?.location?.lat() ?? 0;
                restaurant.lng = result.geometry?.location?.lng() ?? 0;
                restaurant.name = result.name ?? "";
                restaurant.addr =
                  result.formatted_address?.replace("台灣", "") ?? "";
                restaurant.rating = result.rating ?? -1;
                restaurant.phone = result.formatted_phone_number ?? "";
                //display position and details
                isDrawed.value = true;
                marker.setPosition(restaurant);
                map.panTo(restaurant);
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => getCurrentLocation());
</script>
