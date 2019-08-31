import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

let app;
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    // User is signed in.
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
