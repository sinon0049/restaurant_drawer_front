<template>
  <div class="container col-10 col-md-4 mt-5">
    <h1 class="mb-5">Sign In</h1>
    <div>
      <label for="input-email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="input-email" />
    </div>
    <div>
      <label for="input-password" class="form-label">password</label>
      <input type="password" class="form-control" id="input-password" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  h1 {
    text-align: center;
  }
}
</style>

<script lang="ts" setup></script>
