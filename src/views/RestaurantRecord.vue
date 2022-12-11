<template>
  <div class="container">
    <h2>Restaurant record</h2>
    <div class="record-container">
      <div class="record header">
        <span>Name</span>
        <div class="detail">
          <span>Address</span>
          <span>Phone</span>
          <span>Date</span>
        </div>
        <span>Delete</span>
      </div>
      <div class="record-group" @click="handleRecord">
        <div
          class="record"
          v-for="item in restaurants"
          :key="item.id"
          :class="{ borderblack: displayId === item.id }"
        >
          <span class="restaurant-name" :data-id="item.id">{{
            item.name
          }}</span>
          <div class="detail" :class="{ hide: displayId !== item.id }">
            <span class="mobile-grey">
              <span class="mobile-only">&nbsp;&nbsp;&nbsp;Address: </span>
              {{ item.address }}
            </span>
            <span class="mobile-grey">
              <span class="mobile-only">&nbsp;&nbsp;&nbsp;Phone: </span>
              {{ item.phone }}
            </span>
            <span class="mobile-grey">
              <span class="mobile-only">&nbsp;&nbsp;&nbsp;Date: </span>
              {{ formatDate(item.createdAt) }}
            </span>
          </div>
          <fa-icon icon="x" size="xl" :data-id="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 90%;
  h2 {
    margin: 40px auto 10px auto;
  }
  .record-container {
    position: relative;
    .header {
      display: none;
    }
    .record-group {
      //background-color: #ebebeb;
      max-height: calc(100vh - 200px);
      overflow-y: auto;
      &::-webkit-scrollbar-track {
        border: 1px solid #dddddd;
        background-color: white;
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        width: 5px;
        border-radius: 2px;
      }
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      .record {
        position: relative;
        padding: 0 10px;
        border-top: 1px solid grey;
        .restaurant-name {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1140px) {
  .container {
    .record-container {
      .record-group {
        .record {
          line-height: 3rem;
          .detail {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
            bottom: -100%;
            .mobile-grey {
              color: #3b3939;
            }
          }
          svg {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .hide {
            display: none;
          }
        }
        .borderblack {
          border: 1px solid black;
        }
      }
    }
  }
}
@media screen and (min-width: 1140px) {
  .container {
    width: 80%;
    .record-container {
      .record-header {
        display: block;
      }
      .record-group {
        .record {
          svg {
            margin: auto 10%;
          }
          .detail {
            .mobile-only {
              display: none;
            }
          }
        }
      }
      .record {
        display: grid;
        grid-template-columns: 2fr 4fr 1fr;
        line-height: 3rem;
        .detail {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
        }
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { restaurantsAPI } from "@/apis/restaurant";
import type { restaurantFullRecord } from "env";
import { onBeforeMount, reactive, ref } from "vue";
import dayjs from "dayjs";

const restaurants: restaurantFullRecord[] = reactive([]);
// control which restaurant detail is displayed when using mobile
const displayId = ref(-1);

function formatDate(originalDate: string) {
  return dayjs(originalDate).format("YYYY/MM/DD HH:mm");
}

async function handleRecord(e: Event) {
  try {
    const target = e.target as HTMLElement;
    const currentId = Number(target.dataset.id);
    // if delete button is clicked
    if (target.tagName === "svg") {
      const { data } = await restaurantsAPI.deleteRecord(currentId);
      if (data.status !== "success") throw new Error(data.message);
      return restaurants.forEach((item: restaurantFullRecord, idx, arr) => {
        if (item.id === currentId) {
          arr.splice(idx, 1);
        }
      });
    }
    // if name is clicked
    if (target.classList.contains("restaurant-name")) {
      return displayId.value === currentId
        ? (displayId.value = -1)
        : (displayId.value = currentId);
    }
  } catch (error) {
    console.log(error);
  }
}

onBeforeMount(async () => {
  const { data } = await restaurantsAPI.getRecord();
  restaurants.push(...data.restaurants);
});
</script>
