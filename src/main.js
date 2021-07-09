import { InertiaProgress } from "@inertiajs/progress";
import { createApp } from "vue";
import Nprogress from "nprogress";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdXfTV8ftMz1jz72JDpGPN-6vBIOq4psw",
  authDomain: "mixpersonalsite.firebaseapp.com",
  projectId: "mixpersonalsite",
  storageBucket: "mixpersonalsite.appspot.com",
  messagingSenderId: "190848671663",
  appId: "1:190848671663:web:787d5a8d0c52f25650595a",
  measurementId: "G-H47HYWT0RQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// App enty
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 250,

  // The color of the progress bar.
  color: "#80bc01",

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: false,
  // Ease
  easing: "ease",
});

Nprogress.configure({
  showSpinner: false,
});
