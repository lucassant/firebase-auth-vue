<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column">
      <span>Lista de Pokemons</span>
      <input
        class="input is-rounded"
        type="text"
        placeholder="Pesquisar pokemon"
        v-model="busca"
      />
      <button class="button is-fullwidth is-primary" id="btn" @click="buscar()">
        Search
      </button>
      <div v-for="(p, index) in filteredPokemons" :key="p.name">
        <PokeItem :name="p.name" :num="index + 1" :url="p.url" />
        <br />
      </div>
    </div>
    <div class="column"></div>
    <div class="column"></div>
  </div>
</template>

<script>
import axios from "axios";
import PokeItem from "./PokeItem";

export default {
  name: "PokeList",
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: "",
    };
  },
  components: {
    PokeItem,
  },
  created: function () {
    console.log("iniciou pokelist");
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(
      (res) => {
        this.pokemons = res.data.results;
        this.filteredPokemons = this.pokemons;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    buscar() {
      this.filteredPokemons = this.pokemons;
      if (this.busca == "" || this.busca == " ") {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(
          (pokemon) => pokemon.name == this.busca
        );
      }
    },
  },
  computed: {
    /*resultadoBusca() {
      if (this.busca == "" || this.busca == " ") {
        return this.pokemons;
      } else {
        return this.pokemons.filter((pokemon) => pokemon.name == this.busca);
      }
    },*/
  },
};
</script>

<style>
#btn {
  margin-top: 2%;
}
</style>