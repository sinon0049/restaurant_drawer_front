<template>
  <div class="container">
    <button
      @click.stop.prevent="drawRandomRestaurant"
      id="draw"
      :disabled="isProcessing"
    >
      <fa-icon icon="dice" />
    </button>
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
        @click.stop.prevent="getCurrentLocation"
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
        :class="{ detailContainerDisplaying: isDetailDisplaying === true }"
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
    .imgDisplaying {
      display: block;
    }
    .detailContainerDisplaying {
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
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      background-color: #606060;
      cursor: wait;
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

let g: typeof google;
let map: google.maps.Map;
let marker: google.maps.Marker;
let circle: google.maps.Circle;
let placesService: google.maps.places.PlacesService;

async function getCurrentLocation() {
  try {
    //get latlng of current position
    navigator.geolocation.getCurrentPosition((pos) => {
      location_user.lat = pos.coords.latitude;
      location_user.lng = pos.coords.longitude;

      //set map, circle, marker to center
      map.panTo(location_user);
      circle.setCenter(location_user);
      marker = new g.maps.Marker({
        position: location_user,
        map: map,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function drawRandomRestaurant() {
  try {
    //prevent multiple requests
    isProcessing.value = true;
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
  } catch (error) {
    console.log(error);
  } finally {
    isProcessing.value = false;
  }
}

async function initializeMap() {
  try {
    const mapEl = document.getElementById("map") as HTMLDivElement;
    g = await loader.load();
    //init map
    if (mapEl) {
      map = new google.maps.Map(mapEl, {
        zoom: 18,
        disableDefaultUI: true,
      });
      //init circle
      circle = new google.maps.Circle({
        map: map,
        radius: 100,
        strokeWeight: 1.5,
        strokeColor: "#1ed0f4",
        fillColor: "#82e0f3",
      });
      //init placesService
      placesService = new google.maps.places.PlacesService(map);
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  initializeMap();
  getCurrentLocation();
});
</script>
