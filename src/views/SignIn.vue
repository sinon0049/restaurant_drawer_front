<template>
  <div class="container">
    <h2>Sign In</h2>
    <div class="input-group">
      <input
        type="email"
        class="form-control"
        id="input-email"
        placeholder="Email"
        v-model="signInData.email"
      />
    </div>
    <div class="input-group">
      <input
        type="password"
        class="form-control"
        id="input-password"
        placeholder="Password"
        v-model="signInData.password"
        @keyup.enter="signIn"
      />
    </div>
    <div class="btn-group">
      <button @click="signIn" id="sign-in">Sign In</button>
      <router-link to="/signup">
        <button id="sign-up">Sign Up</button>
      </router-link>
      <p>Or you can sign in with</p>
      <div class="brand-icons">
        <fa-icon :icon="['fab', 'google']" @click="handleGoogleSignin" />
        <fa-icon :icon="['fab', 'facebook']" @click="handleFacebookSignIn" />
      </div>
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
    align-items: center;
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
    .brand-icons {
      width: 100px;
      display: flex;
      justify-content: space-around;
      svg {
        border-radius: 99rem;
        cursor: pointer;
      }
      svg:nth-child(1) {
        &:hover {
          background-color: #db4437;
        }
        background-color: grey;
        color: white;
        width: 20px;
        height: 20px;
        padding: 5px;
      }
      svg:nth-child(2) {
        &:hover {
          color: #3b5998;
        }
        color: grey;
        width: 30px;
        height: 30px;
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
/* global FB: readonly, facebook: readonly */
import { usersAPI } from "@/apis/user";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import type { facebookResponse } from "env";
import { googleTokenLogin } from "vue3-google-login";
import { swalAlert } from "@/utils/helper";

const signInData = reactive({
  email: "",
  password: "",
});
const router = useRouter();

async function signIn() {
  try {
    if (!signInData.email.trim())
      return swalAlert.errorMsg("Please type your email.");
    if (!signInData.password)
      return swalAlert.errorMsg("Please type your password.");
    const { data } = await usersAPI.signIn(signInData);
    if (data.status !== "success") throw new Error(data.message);
    localStorage.setItem("token", data.token);
    router.push("/restdraw");
    swalAlert.successMsg("Sign in successfully.");
  } catch (error) {
    console.log(error);
  }
}

function handleFacebookSignIn() {
  FB.login((response: facebook.StatusResponse) => {
    if (response.status === "connected") {
      FB.api("/me/?fields=id,name,email", async (user: facebookResponse) => {
        const { data } = await usersAPI.facebookSignIn({
          facebookId: user.id,
          name: user.name,
          email: user.email,
        });
        if (data.status !== "success") {
          localStorage.setItem("facebookId", data.facebookId);
          return router.push("/oauthsignup");
        }
        localStorage.setItem("token", data.token);
        router.push("/restdraw");
        swalAlert.successMsg("Sign in successfully.");
      });
    }
  });
}

async function handleGoogleSignin() {
  try {
    const { access_token } = await googleTokenLogin();
    const { data } = await usersAPI.googleSignIn({ access_token });
    if (data.status !== "success") {
      localStorage.setItem("googleId", data.googleId);
      return router.push("/oauthsignup");
    }
    localStorage.setItem("token", data.token);
    router.push("/restdraw");
    swalAlert.successMsg("Sign in successfully.");
  } catch (error) {
    console.log(error);
  }
}
</script>
