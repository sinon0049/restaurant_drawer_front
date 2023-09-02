<template>
  <div class="container">
    <h2>Sign Up</h2>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        id="input-name"
        placeholder="Username"
        v-model="signUpData.name"
      />
    </div>
    <div class="input-group">
      <input
        type="email"
        class="form-control"
        id="input-email"
        placeholder="Email"
        v-model="signUpData.email"
      />
    </div>
    <div class="input-group">
      <input
        type="password"
        class="form-control"
        id="input-password"
        placeholder="Password"
        v-model="signUpData.password"
      />
    </div>
    <div class="input-group">
      <input
        type="password"
        class="form-control"
        id="input-confirm-password"
        placeholder="Confirm Password"
        v-model="signUpData.confirmPassword"
      />
    </div>
    <div class="btn-group">
      <button @click="signUp">Sign Up</button>
      <p>Have an account? <router-link to="/signin">Sign In</router-link></p>
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
  .btn-group {
    height: 20%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    text-align: center;
    button {
      width: 150px;
      height: 30px;
      margin: 1rem auto 0 auto;
      border: 0;
      border-radius: 3px;
      background-color: #20222a;
      color: white;
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
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { swalAlert } from "@/utils/helper";
import isEmail from "validator/es/lib/isEmail";

const signUpData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const router = useRouter();

async function signUp() {
  try {
    if (!signUpData.name.trim())
      return swalAlert.errorMsg("Please type your name.");
    if (!signUpData.email.trim())
      return swalAlert.errorMsg("Please type your email.");
    if (!isEmail(signUpData.email)) return swalAlert.errorMsg("Invalid email.");
    if (!signUpData.password)
      return swalAlert.errorMsg("Please type your password.");
    if (!signUpData.confirmPassword)
      return swalAlert.errorMsg("Please confirm your password.");
    if (signUpData.password !== signUpData.confirmPassword)
      return swalAlert.errorMsg("Passwords are not match.");
    const { data } = await usersAPI.signUp(signUpData);
    if (data.status !== "success") throw new Error(data.message);
    swalAlert.successMsg("Sign up successfully.");
    router.push("/signin");
  } catch (error) {
    console.log(error);
  }
}
</script>
