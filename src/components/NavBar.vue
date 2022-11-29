<template>
  <nav class="navbar">
    <span id="title">Restaurant Drawer</span>
    <div class="btn-group" v-if="store.profile.id !== -1">
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
  #title {
    margin-left: 1%;
  }
  .btn-group {
    height: 100%;
    width: 30%;
    margin: auto 2% auto auto;
    display: flex;
    justify-content: space-between;
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
}
</style>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { userStore } from "@/stores/user";

const router = useRouter();
const store = userStore();

function signOut() {
  localStorage.removeItem("token");
  store.cleanUser();
  router.push("/signin");
}
</script>
