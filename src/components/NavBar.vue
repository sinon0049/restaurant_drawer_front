<template>
  <nav class="navbar">
    <span>Restaurant Drawer</span>
    <button @click="signOut">Sign Out</button>
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
  span {
    margin-left: 1%;
  }
  button {
    width: 80px;
    height: 70%;
    float: right;
    color: white;
    border: 1px solid white;
    border-radius: 3px;
    background-color: #20222a;
    display: block;
    margin: auto 10px auto auto;
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
