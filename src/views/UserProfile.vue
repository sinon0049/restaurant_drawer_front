<template>
  <div class="container">
    <h2>User Profile</h2>
    <div class="profile-container">
      <!-- name -->
      <div class="profile">
        <span>Name</span>
        <span v-if="editStatus.currentEditing !== 'name'" class="grey">{{
          store.profile.name
        }}</span>
        <div class="input-container" v-else>
          <input type="text" v-model="store.profile.name" />
          <div class="btn-group">
            <button
              :disabled="editStatus.isEditCommited"
              @click="commitEdit"
              class="btn-save"
            >
              save
            </button>
            <button @click="cancelEdit" class="btn-cancel">cancel</button>
          </div>
        </div>
        <span
          class="link btn-modify"
          id="name-edit"
          v-if="editStatus.currentEditing !== 'name'"
          @click="startEdit('name')"
          >Edit</span
        >
      </div>
      <!-- email -->
      <div class="profile">
        <span>Email</span>
        <span v-if="editStatus.currentEditing !== 'email'" class="grey">{{
          store.profile.email
        }}</span>
        <div class="input-container" v-else>
          <input type="email" v-model="store.profile.email" />
          <div class="btn-group">
            <button
              :disabled="editStatus.isEditCommited"
              @click="commitEdit"
              class="btn-save"
            >
              save
            </button>
            <button @click="cancelEdit" class="btn-cancel">cancel</button>
          </div>
        </div>

        <span
          class="link btn-modify"
          id="email-edit"
          v-if="editStatus.currentEditing !== 'email'"
          @click="startEdit('email')"
          >Edit</span
        >
      </div>
      <!-- password -->
      <div class="profile">
        <span>Password</span>
        <span
          class="link"
          id="password-edit"
          v-if="editStatus.currentEditing !== 'password'"
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
          <label for="confirm-pwd btn-modify">Confirm Password</label>
          <input
            type="password"
            id="confirm-pwd"
            v-model="password.confirmPwd"
          />
          <div class="btn-group">
            <button
              :disabled="editStatus.isEditCommited"
              @click="updatePassword"
              class="btn-save"
            >
              save
            </button>
            <button @click="cancelEdit" class="btn-cancel">cancel</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Social Account</h2>
    <div class="profile-container">
      <!-- facebook -->
      <div class="profile">
        <span>Facebook</span>
        <span class="grey">{{
          store.profile.facebookId ? "Connected" : "Not Connected"
        }}</span>
        <span
          class="link btn-modify"
          id="facebook-edit"
          v-if="store.profile.facebookId"
          @click="disconnectSocialAccount('facebook')"
          >Disconnect</span
        >
        <span
          class="link btn-modify"
          id="facebook-edit"
          v-else
          @click="connectFacebookAccount"
          >Connect</span
        >
      </div>
      <!-- google -->
      <div class="profile">
        <span>Google</span>
        <span class="grey">{{
          store.profile.googleId ? "Connected" : "Not Connected"
        }}</span>
        <span
          class="link btn-modify"
          id="google-edit"
          v-if="store.profile.googleId"
          @click="disconnectSocialAccount('google')"
          >Disconnect</span
        >
        <span
          class="link btn-modify"
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
      display: flex;
      flex-direction: column;
      height: fit-content;
      border-bottom: 1px solid grey;
      text-align: left;
      line-height: 40px;
      position: relative;
      .btn-modify {
        position: absolute;
        right: 0;
      }
      .link {
        color: #0088cc;
        &:hover {
          cursor: pointer;
        }
      }
      .btn-group {
        display: flex;
        width: 120px;
        height: 45px;
        justify-content: space-between;
        button {
          width: 50px;
          margin: auto 10px auto 0;
          border: 0;
          height: 35px;
          border-radius: 5px;
          &:hover {
            cursor: pointer;
          }
        }
        .btn-save {
          background-color: #0088cc;
          color: white;
        }
        .btn-cancel {
          background-color: #ecf0f1;
          color: black;
        }
      }
      .password-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
        .btn-group {
          margin-top: 5px;
        }
      }
      .grey {
        color: grey;
      }
      .input-container {
        height: 80px;
        margin: auto auto 10px 0;
      }
      input {
        height: 20px;
        width: 250px;
        margin-left: 0;
        border-radius: 3px;
        border: 1px solid #858585;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 40%;
    max-width: 550px;
    .profile-container {
      .profile {
        display: grid;
        grid-template-columns: 2fr 3fr 1fr;
        height: fit-content;
        border-bottom: 1px solid grey;
        text-align: left;
        line-height: 40px;
        .input-container {
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-bottom: 5px;
          margin-top: 10px;
          .btn-group {
            height: fit-content;
          }
        }
        .btn-modify {
          position: unset;
        }
        input {
          width: 90%;
        }
      }
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
import { swalAlert } from "@/utils/helper";

//const router = useRouter();
const store = userStore();
const editStatus = reactive({
  // control display of input
  currentEditing: "",
  // control save button to prevent multiple requests
  isEditCommited: false,
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
  if (editStatus.currentEditing !== "") cancelEdit();
  profileTempStore.email = store.profile.email;
  profileTempStore.name = store.profile.name;
  editStatus.currentEditing = attribute;
}

function cancelEdit() {
  store.profile.name = profileTempStore.name;
  store.profile.email = profileTempStore.email;
  password.currentPwd = "";
  password.confirmPwd = "";
  password.newPwd = "";
  editStatus.currentEditing = "";
}

async function commitEdit() {
  try {
    if (editStatus.currentEditing === "name") {
      if (!store.profile.name.trim())
        return console.log("please type your name");
      // disable button to avoid multiple request
      editStatus.isEditCommited = true;
      const { data } = await usersAPI.updateProfile({
        name: store.profile.name,
      });
      if (data.status !== "success") return console.log(data.message);
      // enable button and close input after receiving response
      editStatus.currentEditing = "";
      swalAlert.successMsg(data.message);
    } else if (editStatus.currentEditing === "email") {
      if (!store.profile.email.trim())
        return console.log("please type your email");
      // disable button to avoid multiple request
      editStatus.isEditCommited = true;
      const { data } = await usersAPI.updateProfile({
        email: store.profile.email,
      });
      if (data.status !== "success") return console.log(data.message);
      // enable button and close input after receiving response
      editStatus.currentEditing = "";
      swalAlert.successMsg(data.message);
    }
  } catch (error) {
    console.log(error);
  } finally {
    editStatus.isEditCommited = false;
  }
}

async function disconnectSocialAccount(accountFrom: string) {
  try {
    const res = confirm(
      `Do you really want to disconnect your ${accountFrom} account?`
    );
    if (!res) return;
    if (!store.profile.isPwdSet)
      return swalAlert.errorMsg("Please set your password first.");
    const payLoad =
      accountFrom === "facebook" ? { facebookId: "" } : { googleId: "" };
    const { data } = await usersAPI.updateProfile(payLoad);
    if (data.status !== "success") return console.log(data.message);
    if (accountFrom === "facebook") store.profile.facebookId = "";
    else if (accountFrom === "google") store.profile.googleId = "";
    swalAlert.successMsg("Account disconnected successfully.");
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
        swalAlert.successMsg("Account connected successfully.");
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
    swalAlert.successMsg("Account connected successfully.");
  } catch (error) {
    console.log(error);
  }
}

async function updatePassword() {
  try {
    if (!password.currentPwd.trim() && store.profile.isPwdSet)
      return swalAlert.errorMsg("Please type your password.");
    if (!password.newPwd.trim())
      return swalAlert.errorMsg("Please type your password.");
    if (password.newPwd !== password.confirmPwd)
      return swalAlert.errorMsg("Please confirm your password.");
    const { data } = await usersAPI.updatePassword(password);
    if (data.status !== "success") return swalAlert.errorMsg(data.message);
    store.profile.isPwdSet = true;
    editStatus.currentEditing = "";
    swalAlert.successMsg(data.message);
  } catch (error) {
    console.log(error);
  }
}
</script>
