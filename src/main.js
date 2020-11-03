import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-wO0g1zm550DoS_7VczHuoBxjxIj2-Vs",
  authDomain: "vue-auth-85702.firebaseapp.com",
  databaseURL: "https://vue-auth-85702.firebaseio.com",
  projectId: "vue-auth-85702",
  storageBucket: "vue-auth-85702.appspot.com",
  messagingSenderId: "756101605368",
  appId: "1:756101605368:web:63dbddaa401e91439c980d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')

  }
})
