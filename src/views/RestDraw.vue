<template>
  <div class="container">
    <div class="draw-control">
      <button @click="drawRandomRestaurant" id="draw" :disabled="isProcessing">
        <fa-icon icon="dice" v-if="!isProcessing" />
        <div class="spinner" v-else></div>
      </button>
      <div>
        <span>Radius</span>
        <input
          type="number"
          id="radius"
          placeholder="Unit: Meter"
          min="0"
          v-model="radius"
          @input="zoomCircle"
        />
      </div>
    </div>
    <div
      id="map"
      class="map"
      :class="{ mapDrawed: isDetailDisplaying === true }"
    ></div>
    <div
      class="rest-detail"
      :class="{ detailDrawed: isDetailDisplaying === true }"
    >
      <span
        class="material-symbols-outlined"
        id="locate"
        @click="getCurrentLocation"
      >
        my_location
      </span>
      <img
        :src="restaurant.photo"
        alt=""
        :class="{ imgDisplaying: isDetailDisplaying === true }"
      />
      <div
        class="detail-container"
        :class="{ detailDisplaying: isDetailDisplaying === true }"
      >
        <span>name:&nbsp;&nbsp;{{ restaurant.name }}</span>
        <span>address:&nbsp;&nbsp;{{ restaurant.address }}</span>
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
    .imgDisplaying {
      display: block;
    }
    .detailDisplaying {
      display: flex;
    }
  }
  .draw-control {
    display: flex;
    justify-content: space-between;
    z-index: 10;
    width: 300px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    div {
      width: 170px;
      height: 50px;
      border-radius: 5px;
      padding: {
        left: 10px;
      }
      background-color: #20222a;
      span {
        color: white;
      }
      input {
        width: 150px;
        height: 18px;
      }
    }
    #draw {
      z-index: 10;
      color: white;
      background-color: #20222a;
      width: 100px;
      height: 50px;
      font-size: 20px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        cursor: wait;
      }
      .spinner {
        margin: auto;
        padding: 0;
        width: 25px;
        height: 25px;
        border: 5px solid white;
        border-top: 5px solid black;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0);
        animation: spin 1.5s linear infinite;
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
  #locate {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    z-index: 10;
    color: white;
    background-color: #20222a;
    position: absolute;
    top: -60px;
    right: 10px;
    border-radius: 50%;
    cursor: pointer;
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
import { restaurantsAPI } from "@/apis/restaurant";

//Map initializer
const loader = new Loader({
  apiKey: import.meta.env.VITE_APIKEY,
  version: "weekly",
  libraries: ["places"],
});
let g: typeof google;
let map: google.maps.Map;
let marker: google.maps.Marker;
let circle: google.maps.Circle;
let placesService: google.maps.places.PlacesService;

function initializeMap() {
  return new Promise<string | void>((resolve, reject) => {
    const mapEl = document.getElementById("map") as HTMLDivElement;
    if (!mapEl) return reject("No corresponding map element found");
    map = new google.maps.Map(mapEl, {
      zoom: 18,
      disableDefaultUI: true,
    });
    circle = new google.maps.Circle({
      map,
      strokeWeight: 1.5,
      strokeColor: "#1ed0f4",
      fillColor: "#82e0f3",
    });
    marker = new g.maps.Marker({ map });
    placesService = new google.maps.places.PlacesService(map);
    resolve();
  });
}

//Restaurant drawing & positioning feature
const location_user = {
  lat: 0,
  lng: 0,
};
const radius = ref(500);
const isDetailDisplaying = ref(false);
const isProcessing = ref(false);
const restaurant = reactive({
  lat: 0,
  lng: 0,
  name: "",
  address: "",
  rating: -1,
  photo: "",
  phone: "",
});

function zoomCircle() {
  if (typeof radius.value !== "number") radius.value = 0;
  circle.setRadius(radius.value);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    location_user.lat = pos.coords.latitude;
    location_user.lng = pos.coords.longitude;
    map.panTo(location_user);
    circle.setCenter(location_user);
    circle.setRadius(radius.value);
    marker.setPosition(location_user);
  });
}

function nearbyRestaurantSearch(radius: number) {
  return new Promise<string | undefined>((resolve, reject) => {
    const request = {
      location: location_user,
      radius,
      type: "restaurant",
      openNow: true,
    };
    placesService.nearbySearch(request, (results) => {
      if (!results || !results.length) return reject("No restaurant found");
      const restIdx = Math.floor(Math.random() * results.length);
      return resolve(results[restIdx].place_id);
    });
  });
}

function getDetail(placeId: string | undefined) {
  if (placeId !== undefined)
    return new Promise<string | google.maps.places.PlaceResult>(
      (resolve, reject) => {
        placesService.getDetails({ placeId }, (result) => {
          if (!result) return reject("No detail found");
          return resolve(result);
        });
      }
    );
}

function displayDetail(
  detail: string | google.maps.places.PlaceResult | undefined
) {
  if (typeof detail === "string" || typeof detail === "undefined") return;
  if (detail && detail.photos) {
    const photoIdx = Math.floor(Math.random() * detail.photos?.length);
    restaurant.photo = detail.photos[photoIdx].getUrl();
    restaurant.lat = detail.geometry?.location?.lat() ?? 0;
    restaurant.lng = detail.geometry?.location?.lng() ?? 0;
    restaurant.name = detail.name ?? "";
    restaurant.address = detail.formatted_address?.replace("台灣", "") ?? "";
    restaurant.rating = detail.rating ?? -1;
    restaurant.phone = detail.formatted_phone_number ?? "";
    isDetailDisplaying.value = true;
    marker.setPosition(restaurant);
    map.panTo(restaurant);
  }
}

async function drawRandomRestaurant() {
  try {
    isProcessing.value = true;
    const id = await nearbyRestaurantSearch(radius.value);
    const detail = await getDetail(id);
    displayDetail(detail);
    const { name, phone, address } = restaurant;
    await restaurantsAPI.createRecord({ name, phone, address });
  } catch (error) {
    console.log(error);
  } finally {
    isProcessing.value = false;
  }
}

onMounted(async () => {
  g = await loader.load();
  await initializeMap();
  getCurrentLocation();
});
</script>
