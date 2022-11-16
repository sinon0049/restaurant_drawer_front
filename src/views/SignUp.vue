<template>
  <div class="container">
    <h2>Sign Up</h2>
    <div class="input-group">
      <label for="input-name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="input-name"
        v-model="signUpData.name"
      />
    </div>
    <div class="input-group">
      <label for="input-email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="input-email"
        v-model="signUpData.email"
      />
    </div>
    <div class="input-group">
      <label for="input-password" class="form-label">password</label>
      <input
        type="password"
        class="form-control"
        id="input-password"
        v-model="signUpData.password"
      />
    </div>
    <div class="input-group">
      <label for="input-confirm-password" class="form-label"
        >Confirm password</label
      >
      <input
        type="password"
        class="form-control"
        id="input-confirm-password"
        v-model="signUpData.confirmPassword"
      />
    </div>
    <div class="btn-group">
      <button id="sign-up" @click="signUp">Sign Up</button>
      <router-link to="/signin"> cancel </router-link>
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
    margin-top: 1rem;
    button {
      width: 80px;
      height: 30px;
      margin: 1rem auto 0 auto;
      border: 0;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
      }
    }
    a {
      margin-top: 1rem;
      text-align: center;
      color: #1589c9;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
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

const signUpData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function signUp() {
  try {
    if (!signUpData.name.trim()) return console.log("Please type your name.");
    if (!signUpData.email.trim()) return console.log("Please type your email.");
    if (!signUpData.password) return console.log("Please type your password.");
    if (!signUpData.confirmPassword)
      return console.log("Please confirm your password.");
    if (signUpData.password !== signUpData.confirmPassword)
      return console.log("Passwords are not match.");
    const { data } = await usersAPI.signUp(signUpData);
    if (data.status !== "success") throw new Error(data.message);
    console.log("Sign up successfully.");
    router.push("/signin");
  } catch (error) {
    console.log(error);
  }
}
</script>
