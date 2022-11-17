<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";

// Facebook sdk init
/* global FB */
/* eslint-disable */
window.fbAsyncInit = function() {
  FB.init({
    //  use your appId
    appId: import.meta.env.VITE_FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v15.0'
  }); 
  FB.AppEvents.logPageView();       
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s) as HTMLScriptElement; js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  if(fjs.parentNode)
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/* eslint-enable */
</script>

<template>
  <NavBar />
  <RouterView />
</template>
