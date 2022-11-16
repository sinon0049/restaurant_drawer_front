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
/* global FB: readonly */
import { usersAPI } from "@/apis/user";
import router from "@/router";
import { reactive } from "vue";

const signInData = reactive({
  email: "",
  password: "",
});

window.fbAsyncInit = function () {
  FB.init({
    appId: import.meta.env.VITE_FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v15.0",
  });

  FB.AppEvents.logPageView();
};

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
    (response) => {
      console.log(response);
      FB.api("/me/?fields=id,name,email", function (user) {
        console.log(user);
      });
    },
    { scope: "email,public_profile" }
  );
}

function fbSignOut() {
  FB.logout((res) => console.log(res));
}
</script>
