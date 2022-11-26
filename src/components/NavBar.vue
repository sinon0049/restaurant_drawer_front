<template>
  <nav class="navbar">
    <span id="title">Restaurant Drawer</span>
    <div class="btn-group">
      <router-link to="/restdraw">
        <span>Draw</span>
      </router-link>
      <router-link to="/restdraw">
        <span>Record</span>
      </router-link>
      <router-link to="/restdraw">
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
import router from "@/router";

function signOut() {
  localStorage.removeItem("token");
  router.push("/signin");
}
</script>
