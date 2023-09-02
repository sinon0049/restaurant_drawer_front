<template>
  <div class="container">
    <div
      id="map"
      class="map"
      :class="{ mapDrawed: isDetailDisplaying === true }"
    ></div>
    <div
      class="rest-detail"
      :class="{ detailDrawed: isDetailDisplaying === true }"
    >
      <div class="r-container">
        <span>Radius(meter)</span>
        <input
          type="number"
          name="radius"
          id="radius"
          min="0"
          v-model="radius"
          @input="zoomCircle"
        />
      </div>
      <button @click="drawRandomRestaurant" id="draw" :disabled="isProcessing">
        <fa-icon icon="dice" v-if="!isProcessing" />
        <div class="spinner" v-else></div>
      </button>
      <fa-icon
        icon="location-crosshairs"
        id="locate"
        @click="getCurrentLocation"
      />
      <img
        :src="restaurant.photo"
        alt=""
        :class="{ imgDisplaying: isDetailDisplaying === true }"
      />
      <div
        class="detail-container"
        :class="{ detailDisplaying: isDetailDisplaying === true }"
      >
        <span>Name:&nbsp;&nbsp;{{ restaurant.name }}</span>
        <span>Address:&nbsp;&nbsp;{{ restaurant.addr }}</span>
        <span>Rating:&nbsp;&nbsp;{{ restaurant.rating }}</span>
        <span>Phone:&nbsp;&nbsp;{{ restaurant.phone }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
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
  #draw {
    z-index: 10;
    color: white;
    background-color: #20222a;
    position: absolute;
    top: -60px;
    left: 10px;
    width: 100px;
    height: 50px;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #696969;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      cursor: wait;
    }
    .spinner {
      margin: 0 auto;
      width: 20px;
      height: 20px;
      border: 5px white solid;
      border-radius: 50%;
      border-top: 5px solid #82e0f3;
      animation: rotation 1s linear infinite;
    }
  }
  #locate {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 50px;
    z-index: 10;
    color: white;
    background-color: #20222a;
    position: absolute;
    top: -50px;
    right: 20px;
    border-radius: 50%;
    box-shadow: 2px 2px 3px #696969;
    &:hover {
      cursor: pointer;
    }
  }
  .r-container {
    color: white;
    span {
      display: block;
    }
    width: fit-content;
    padding: 0 5px;
    border-radius: 5px;
    height: 50px;
    background-color: #20222a;
    position: absolute;
    top: -60px;
    left: 130px;
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
        bottom: 20px;
        left: -60px;
      }
      #draw {
        top: unset;
        right: unset;
        bottom: 8px;
        left: -180px;
      }
      .r-container {
        top: unset;
        bottom: 8px;
        left: -370px;
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
const isDetailDisplaying = ref(false);
const isProcessing = ref(false);
const radius = ref(200);
loader.load();

let map: google.maps.Map;
let marker: google.maps.Marker;
let circle: google.maps.Circle;
let placesService: google.maps.places.PlacesService;

function getCurrentLocation() {
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
        //init marker
        marker = new google.maps.Marker({
          position: location_user,
          map: map,
        });
        //init circle
        circle = new google.maps.Circle({
          map: map,
          center: location_user,
          radius: radius.value,
          strokeWeight: 1.5,
          strokeColor: "#1ed0f4",
          fillColor: "#82e0f3",
        });
        //init placesService
        placesService = new google.maps.places.PlacesService(map);
      } else {
        //smoothly move map if user click locate button
        map.panTo(location_user);
        circle.setCenter(location_user);
        marker.setPosition(location_user);
      }
    }
  });
}

function drawRandomRestaurant() {
  isProcessing.value = true;
  const request = {
    location: location_user,
    radius: radius.value,
    type: "restaurant",
    openNow: true,
  };
  placesService.nearbySearch(request, (results) => {
    if (results) {
      const restIdx = Math.floor(Math.random() * results.length);
      const resultDrawed = results[restIdx];
      if (resultDrawed.place_id) {
        //get details of selected restaurant
        placesService.getDetails(
          { placeId: resultDrawed.place_id },
          async (result) => {
            try {
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
                isDetailDisplaying.value = true;
                marker.setPosition(restaurant);
                map.panTo(restaurant);
                const { data } = await restaurantsAPI.createRecord({
                  name: restaurant.name,
                  phone: restaurant.phone,
                  address: restaurant.addr,
                });
                if (data.status !== "success") throw new Error(data.message);
              }
            } catch (error) {
              console.log(error);
            } finally {
              isProcessing.value = false;
            }
          }
        );
      }
    }
  });
}

function zoomCircle() {
  return circle.setRadius(radius.value);
}

onMounted(() => getCurrentLocation());
</script>
