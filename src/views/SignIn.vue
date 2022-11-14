<template>
  <div class="container">
    <h2>Sign In</h2>
    <div class="input-group">
      <label for="input-email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="input-email"
        v-model="signInData.email"
      />
    </div>
    <div class="input-group">
      <label for="input-password" class="form-label">password</label>
      <input
        type="password"
        class="form-control"
        id="input-password"
        v-model="signInData.password"
        @keyup.enter="signIn"
      />
    </div>
    <div class="btn-group">
      <button @click="signIn" id="sign-in">Sign In</button>
      <button id="sign-up">Sign Up</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 60%;
  h2 {
    text-align: center;
    margin-top: 2rem;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    margin: 0 auto 1% auto;
    line-height: 2rem;
  }
  .btn-group {
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;
    button {
      width: 80px;
      height: 30px;
      margin: 1rem auto 0 auto;
      border: 0;
      border-radius: 3px;
    }
    #sign-in {
      color: white;
      background-color: #20222a;
    }
    #sign-up {
      color: #20222a;
      background-color: white;
      border: 1px solid #20222a;
    }
  }
}

@media screen and (min-width: 768px) {
  .container {
    width: 40%;
    max-width: 300px;
  }
}
</style>

<script lang="ts" setup>
import { usersAPI } from "@/apis/user";
import router from "@/router";
import { reactive } from "vue";

const signInData = reactive({
  email: "",
  password: "",
});

async function signIn() {
  const { data } = await usersAPI.signIn(signInData);
  if (data.status === "success") {
    localStorage.setItem("token", data.token);
    router.push("/restdraw");
  }
}
</script>
