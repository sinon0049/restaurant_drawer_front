<template>
  <nav class="navbar">
    <router-link to="/" id="title">Restaurant Drawer</router-link>
    <div
      class="btn-group"
      v-if="store.profile.id !== -1"
      :class="{ close: !isNavbarOpen }"
    >
      <router-link to="/restdraw">
        <span>Draw</span>
      </router-link>
      <router-link to="/record">
        <span>Record</span>
      </router-link>
      <router-link to="/profile">
        <span>Profile</span>
      </router-link>
      <span @click="signOut">Signout</span>
    </div>
    <div class="btn-guest" v-else>
      <router-link to="/signin">
        <span>Sign In</span>
      </router-link>
    </div>
    <div
      id="navbar-control-container"
      @click="toggleNavbar"
      v-if="store.profile.id !== -1"
    >
      <div id="navbar-control"></div>
    </div>
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
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-group {
    z-index: 20;
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
    transition: transform 0.2s ease 0.1s;
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

  .btn-guest {
    position: absolute;
    right: 20px;
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
  #navbar-control-container {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    #navbar-control {
      position: absolute;
      border-radius: 1px;
      height: 3px;
      width: 30px;
      top: calc(50% - 1.5px);
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
    #navbar-control-container {
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
import { swalAlert } from "@/utils/helper";

const router = useRouter();
const store = userStore();
const isNavbarOpen = ref(false);

function signOut() {
  localStorage.removeItem("token");
  store.cleanUser();
  router.push("/");
  swalAlert.successMsg("Sign out successfully.");
  FB.getLoginStatus((res) => {
    if (res.status === "connected") FB.logout();
  });
}

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

router.afterEach(() => (isNavbarOpen.value = false));
</script>
