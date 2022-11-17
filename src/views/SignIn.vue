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
      <router-link to="/signup">
        <button id="sign-up">Sign Up</button>
      </router-link>
      <button @click="fbSignIn" id="fb-sign-in">Signin with Facebook</button>
      <button @click="fbSignOut" id="fb-sign-in">FB Sign Out</button>
      <button @click="fbTest" id="fb-test">Test token</button>
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
      width: 150px;
      height: 30px;
      margin: 1rem auto 0 auto;
      border: 0;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
      }
    }
    a {
      text-align: center;
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
/* global FB: readonly, facebook: readonly */
import { usersAPI } from "@/apis/user";
import router from "@/router";
import { reactive, ref } from "vue";
import type { facebookSignInResponse } from "env";

const signInData = reactive({
  email: "",
  password: "",
});

const token = ref("");

async function signIn() {
  try {
    if (!signInData.email.trim()) return console.log("Please type your email.");
    if (!signInData.password) return console.log("Please type your password.");
    const { data } = await usersAPI.signIn(signInData);
    if (data.status !== "success") throw new Error(data.message);
    localStorage.setItem("token", data.token);
    router.push("/restdraw");
  } catch (error) {
    console.log(error);
  }
}

function fbSignIn() {
  FB.login(
    (response: facebook.StatusResponse) => {
      console.log(response);
      if (response.status === "connected") {
        token.value = response.authResponse.accessToken;
        FB.api(
          "/me/?fields=id,name,email",
          async function (user: facebookSignInResponse) {
            console.log(user);
            const { data } = await usersAPI.fbSignIn({
              name: user.name,
              email: user.email,
            });
            console.log(data);
          }
        );
      }
    },
    { scope: "email,public_profile" }
  );
}

function fbSignOut() {
  FB.logout((res) => console.log(res));
}

function fbTest() {
  FB.api(`/debug_token?input_token=${token.value}`, (res) => console.log(res));
}
</script>
