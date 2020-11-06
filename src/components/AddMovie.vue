<template>
  <div class="container">
    <form @submit="submit">
      <fieldset>
        <input class="input" type="text" placeholder="Title" v-model="title" />
        <input
          class="input"
          type="text"
          placeholder="Director"
          v-model="director"
        />
        <input
          class="input"
          type="text"
          placeholder="Composer"
          v-model="composer"
        />
        <input
          class="input"
          type="text"
          placeholder="Release date"
          v-model="release_date"
        />
      </fieldset>
      <input
        class="button is-primary is-fullwidth"
        type="submit"
        value="Gravar"
      />
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
//import { InMemoryCache } from "apollo-cache-inmemory";

const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $director: String!
    $composer: String!
    $release_date: date!
  ) {
    insert_movies(
      objects: [
        {
          title: $title
          director: $director
          composer: $composer
          release_date: $release_date
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export default {
  name: "AddMovie",
  data() {
    return {
      title: "",
      director: "",
      composer: "",
      release_date: "",
    };
  },
  apollo: {},
  methods: {
    submit(e) {
      e.preventDefault();
      const { title, director, composer, release_date } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_MOVIE,
        variables: {
          title,
          director,
          composer,
          release_date,
        },
        refetchQueries: ["getMovies"],
      });
    },
  },
};
</script>

<style>
</style>