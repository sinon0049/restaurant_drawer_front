<template>
  <div class="container">
    <h2>Sign In</h2>
    <div class="input-group">
      <label for="input-email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="input-email" />
    </div>
    <div class="input-group">
      <label for="input-password" class="form-label">password</label>
      <input type="password" class="form-control" id="input-password" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  h2 {
    text-align: center;
    margin-top: 2rem;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 auto 1% auto;
    line-height: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .container {
    .input-group {
      width: 40%;
      max-width: 400px;
    }
  }
}
</style>

<script lang="ts" setup></script>
