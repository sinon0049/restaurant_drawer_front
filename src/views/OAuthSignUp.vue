<template>
  <div class="container">
    <h2>Last Step!</h2>
    <h3>Register your name and email for our service.</h3>
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
      <label for="input-email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="input-email"
        v-model="signUpData.email"
        @keyup.enter="OAuthsignUp"
      />
    </div>
    <div class="btn-group">
      <button @click="OAuthsignUp" id="fb-sign-in">Sign up</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 60%;
  h2,
  h3 {
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
    .g-btn-wrapper {
      margin: 0 auto;
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
import { useRouter } from "vue-router";
import type { OAuthSignUpData } from "env";
import { onBeforeMount, onBeforeUnmount, reactive } from "vue";
import { usersAPI } from "@/apis/user";

const signUpData: OAuthSignUpData = reactive({
  name: "",
  email: "",
  facebookId: "",
  googleId: "",
});
const router = useRouter();

async function OAuthsignUp() {
  try {
    if (!signUpData.name.trim()) return console.log("Please type your name.");
    if (!signUpData.email.trim()) return console.log("Please type your email.");
    const { data } = await usersAPI.OAuthSignUp(signUpData);
    if (data.status !== "success") return console.log(data.message);
    router.push("/signin");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

onBeforeMount(() => {
  if (
    !localStorage.getItem("facebookId") &&
    !localStorage.getItem("googleId")
  ) {
    console.log("no storage found");
    return router.push("/signin");
  }
  signUpData.facebookId = localStorage.getItem("facebookId") || "";
  signUpData.googleId = localStorage.getItem("googleId") || "";
});

onBeforeUnmount(() => {
  localStorage.removeItem("facebookId");
  localStorage.removeItem("googleId");
});
</script>
