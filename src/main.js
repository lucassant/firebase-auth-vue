import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import '../node_modules/bulma/css/bulma.css'

//import { createProvider } from 'vue-apollo';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'https://vue-apollo-teste.herokuapp.com/v1/graphql'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

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
      apolloProvider,
      render: h => h(App)
    }).$mount('#app')

  }
})
