<template>
  <div class="container">
    <h2>User Profile</h2>
    <div class="profile-container">
      <!-- name -->
      <div class="profile">
        <span>Name</span>
        <span v-if="!editStatus.name">{{ store.profile.name }}</span>
        <input type="text" v-model="store.profile.name" v-else />
        <span
          class="btn-modify"
          id="name-edit"
          v-if="!editStatus.name"
          @click="startEdit('name')"
          >Edit</span
        >
        <div class="btn-group" v-else>
          <button
            :disabled="editStatus.nameCommited"
            @click="commitEdit('name')"
          >
            <fa-icon
              icon="floppy-disk"
              size="xl"
              style="color: #0088cc"
              class="store"
            />
          </button>
          <fa-icon icon="x" size="xl" @click="cancelEdit('name')" />
        </div>
      </div>
      <!-- email -->
      <div class="profile">
        <span>Email</span>
        <span v-if="!editStatus.email">{{ store.profile.email }}</span>
        <input type="email" v-model="store.profile.email" v-else />
        <span
          class="btn-modify"
          id="email-edit"
          v-if="!editStatus.email"
          @click="startEdit('email')"
          >Edit</span
        >
        <div class="btn-group" v-else>
          <button
            :disabled="editStatus.emailCommited"
            @click="commitEdit('email')"
          >
            <fa-icon
              icon="floppy-disk"
              size="xl"
              style="color: #0088cc"
              class="store"
            />
          </button>
          <fa-icon icon="x" size="xl" @click="cancelEdit('email')" />
        </div>
      </div>
      <!-- password -->
      <div class="profile">
        <span>Password</span>
        <span
          class="btn-modify"
          id="password-edit"
          v-if="!editStatus.password"
          @click="startEdit('password')"
          >Change Password</span
        >
        <div class="password-container" v-else>
          <label for="current-pwd" v-if="store.profile.isPwdSet">
            Current Password
          </label>
          <input
            type="password"
            id="current-pwd"
            v-model="password.currentPwd"
            v-if="store.profile.isPwdSet"
          />
          <label for="new-pwd">New Password</label>
          <input type="password" id="new-pwd" v-model="password.newPwd" />
          <label for="confirm-pwd">Confirm Password</label>
          <input
            type="password"
            id="confirm-pwd"
            v-model="password.confirmPwd"
          />
          <div class="btn-group">
            <span class="btn-modify" @click="cancelEdit('password')"
              >cancel</span
            >
            <span class="btn-modify" @click="updatePassword">save</span>
          </div>
        </div>
      </div>
    </div>
    <h2>Social Account</h2>
    <div class="profile-container">
      <!-- facebook -->
      <div class="profile">
        <span>Facebook</span>
        <span>{{
          store.profile.facebookId ? "Connected" : "Not Connected"
        }}</span>
        <span
          class="btn-modify"
          id="facebook-edit"
          v-if="store.profile.facebookId"
          @click="disconnectSocialAccount('facebook')"
          >Disconnect</span
        >
        <span
          class="btn-modify"
          id="facebook-edit"
          v-else
          @click="connectFacebookAccount"
          >Connect</span
        >
      </div>
      <!-- google -->
      <div class="profile">
        <span>Google</span>
        <span>{{
          store.profile.googleId ? "Connected" : "Not Connected"
        }}</span>
        <span
          class="btn-modify"
          id="google-edit"
          v-if="store.profile.googleId"
          @click="disconnectSocialAccount('google')"
          >Disconnect</span
        >
        <span
          class="btn-modify"
          id="google-edit"
          v-else
          @click="connectGoogleAccount"
          >Connect</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 90%;
  h2 {
    margin: 40px auto 10px auto;
  }
  .profile-container {
    .profile {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      height: fit-content;
      border-bottom: 1px solid grey;
      text-align: left;
      line-height: 50px;
      .btn-modify {
        color: #0088cc;
        &:hover {
          cursor: pointer;
        }
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        svg {
          &:hover {
            cursor: pointer;
          }
          margin: auto auto auto 0;
        }
        button {
          margin: 0 auto 0 0;
          padding: 0;
          border: 0;
          background-color: white;
          width: fit-content;
        }
      }
      .password-container {
        display: flex;
        flex-direction: column;
      }
    }
    input {
      height: 14px;
      margin: auto auto auto 0;
    }
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 40%;
    max-width: 550px;
    .profile {
      grid-template-columns: 2fr 3fr 1fr;
    }
  }
}
</style>

<script lang="ts" setup>
/* global FB: readonly, facebook: readonly */
import { usersAPI } from "@/apis/user";
import { userStore } from "@/stores/user";
import { reactive } from "vue";
import type { facebookResponse, updatedPassword } from "env";
//import { useRouter } from "vue-router";
import { googleTokenLogin } from "vue3-google-login";

//const router = useRouter();
const store = userStore();
const editStatus = reactive({
  // control display of input
  name: false,
  email: false,
  password: false,
  // control save button
  nameCommited: false,
  emailCommited: false,
});
const profileTempStore = reactive({
  name: "",
  email: "",
});
const password: updatedPassword = reactive({
  currentPwd: "",
  newPwd: "",
  confirmPwd: "",
});

function startEdit(attribute: string) {
  if (attribute === "name") {
    profileTempStore.name = store.profile.name;
    editStatus.name = true;
  } else if (attribute === "email") {
    profileTempStore.email = store.profile.email;
    editStatus.email = true;
  } else if (attribute === "password") {
    editStatus.password = true;
  }
}

function cancelEdit(attribute: string) {
  if (attribute === "name") {
    store.profile.name = profileTempStore.name;
    editStatus.name = false;
  } else if (attribute === "email") {
    store.profile.email = profileTempStore.email;
    editStatus.email = false;
  } else if (attribute === "password") {
    editStatus.password = false;
  }
}

async function commitEdit(attribute: string) {
  try {
    if (attribute === "name") {
      if (!store.profile.name.trim())
        return console.log("please type your name");
      // disable button to avoid multiple request
      editStatus.nameCommited = true;
      const { data } = await usersAPI.updateProfile({
        name: store.profile.name,
      });
      if (data.status !== "success") return console.log(data.message);
      // enable button and close input after receiving response
      editStatus.name = false;
      editStatus.nameCommited = false;
    } else if (attribute === "email") {
      if (!store.profile.email.trim())
        return console.log("please type your email");
      // disable button to avoid multiple request
      editStatus.emailCommited = true;
      const { data } = await usersAPI.updateProfile({
        email: store.profile.email,
      });
      if (data.status !== "success") return console.log(data.message);
      // enable button and close input after receiving response
      editStatus.email = false;
      editStatus.emailCommited = false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function disconnectSocialAccount(accountFrom: string) {
  try {
    const res = confirm(
      `Do you really want to disconnect your ${accountFrom} account?`
    );
    if (!res) return;
    if (!store.profile.isPwdSet)
      return console.log("Please set your password.");
    const payLoad =
      accountFrom === "facebook" ? { facebookId: "" } : { googleId: "" };
    const { data } = await usersAPI.updateProfile(payLoad);
    if (data.status !== "success") return console.log(data.message);
    if (accountFrom === "facebook") store.profile.facebookId = "";
    else if (accountFrom === "google") store.profile.googleId = "";
    console.log(data.user);
  } catch (error) {
    console.log(error);
  }
}

async function connectFacebookAccount() {
  FB.login((response: facebook.StatusResponse) => {
    if (response.status === "connected") {
      FB.api("/me/?fields=id,name,email", async (user: facebookResponse) => {
        const payLoad = { facebookId: user.id };
        const { data } = await usersAPI.updateProfile(payLoad);
        if (data.status !== "success") return console.log(data.message);
        store.profile.facebookId = data.user.facebookId;
        FB.logout();
      });
    }
  });
}

async function connectGoogleAccount() {
  try {
    const { access_token } = await googleTokenLogin();
    const { data } = await usersAPI.updateProfile({ access_token });
    if (data.status !== "success") return console.log(data.message);
    store.profile.googleId = data.user.googleId;
  } catch (error) {
    console.log(error);
  }
}

async function updatePassword() {
  try {
    if (!password.currentPwd.trim() && store.profile.isPwdSet)
      return console.log("please type your password");
    if (!password.newPwd.trim())
      return console.log("please type your password");
    if (password.newPwd !== password.confirmPwd)
      return console.log("please confirm your password");
    const { data } = await usersAPI.updatePassword(password);
    if (data.status !== "success") return console.log(data.message);
    store.profile.isPwdSet = true;
    editStatus.password = false;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
</script>
