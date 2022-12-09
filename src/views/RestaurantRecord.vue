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
      <div class="record-group" @click="deleteRecord">
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
            <span>{{ item.address }}</span>
            <span>{{ item.phone }}</span>
            <span>{{ formatDate(item.createdAt) }}</span>
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
      background-color: #ebebeb;
      max-height: calc(100vh - 200px);
      overflow-y: scroll;
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
      }
      .borderblack {
        border: 1px solid black;
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
          border-top: 1px solid #dddddd;
          svg {
            margin: auto 10%;
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
const displayId = ref(-1);

function formatDate(originalDate: string) {
  return dayjs(originalDate).format("YYYY/MM/DD HH:mm");
}

async function deleteRecord(e: Event) {
  const target = e.target as HTMLElement;
  if (target.tagName === "svg") return console.log("delete", target.dataset.id);
  if (target.classList.contains("restaurant-name")) {
    const currentId = Number(target.dataset.id);
    displayId.value === currentId
      ? (displayId.value = -1)
      : (displayId.value = currentId);
  }
}

onBeforeMount(async () => {
  const { data } = await restaurantsAPI.getRecord();
  restaurants.push(...data.restaurants);
});
</script>
