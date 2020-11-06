<template>
  <div id="app">
    <br />

    <button class="button is-danger" @click="logout">Logout</button>
    <br /><br />
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
    <poke-list />
    <add-movie />
    <movies-list />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList";
import AddMovie from "@/components/AddMovie";
import PokeList from "@/components/PokeList";
import firebase from "firebase";

export default {
  name: "Home",

  components: {
    MoviesList,
    AddMovie,
    PokeList,
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
  },
};
</script>
