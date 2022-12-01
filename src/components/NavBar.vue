<template>
  <nav class="navbar">
    <span id="title">Restaurant Drawer</span>
    <div
      class="btn-group"
      v-if="store.profile.id !== -1"
      :class="{ close: !isNavbarOpen }"
    >
      <router-link to="/restdraw">
        <span>Draw</span>
      </router-link>
      <router-link to="/restdraw">
        <span>Record</span>
      </router-link>
      <router-link to="/profile">
        <span>Profile</span>
      </router-link>
      <span @click="signOut">Signout</span>
    </div>
    <div id="navbar-control" @click="toggleNavbar"></div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: #20222a;
  color: white;
  line-height: 3rem;
  position: relative;
  #title {
    margin-left: 20px;
  }
  .btn-group {
    background-color: #20222a;
    height: 100%;
    width: 100%;
    margin: auto 2% auto auto;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: -100%;
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 0.5s ease 0.1s;
    a,
    span {
      &:hover {
        cursor: pointer;
      }
    }
    a {
      text-decoration: none;
      color: white;
    }
  }
  .close {
    transform: scale(1, 0);
  }
  #navbar-control {
    position: absolute;
    border-radius: 1px;
    right: 20px;
    height: 3px;
    width: 30px;
    background-color: white;
    &::before,
    &::after {
      content: "";
      position: absolute;
      border-radius: 1px;
      height: 3px;
      width: 30px;
      background-color: white;
    }
    &::before {
      top: 10px;
    }
    &::after {
      bottom: 10px;
    }
  }
}
@media screen and (min-width: 768px) {
  .navbar {
    .btn-group {
      height: 100%;
      width: 30%;
      max-width: 300px;
      margin: auto 2% auto auto;
      display: flex;
      position: relative;
      bottom: unset;
      justify-content: space-between;
      transform: scale(1, 1);
    }
    #navbar-control {
      display: none;
    }
  }
}
</style>

<script lang="ts" setup>
/* global FB: readonly */
import { useRouter } from "vue-router";
import { userStore } from "@/stores/user";
import { ref } from "vue";

const router = useRouter();
const store = userStore();
const isNavbarOpen = ref(false);

function signOut() {
  localStorage.removeItem("token");
  store.cleanUser();
  router.push("/signin");
  FB.getLoginStatus((res) => {
    if (res.status === "connected") FB.logout();
  });
}

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}
</script>
