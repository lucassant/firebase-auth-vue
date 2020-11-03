<template>
  <div class="sign-up">
    <h1>Crie uma nova conta</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <br /><br />
    <input type="password" placeholder="Senha" v-model="senha" />
    <br /><br />
    <button @click="signUp">Registrar</button>
    <br /><br />
    <span
      >ou retorne ao
      <router-link to="/login">login.</router-link>
    </span>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha)
        .then(
          (user) => {
            console.log(user);
            this.$router.replace("/");
          },
          (err) => {
            alert("Aconteceu algo inesperado. " + err);
          }
        );
    },
    signUpPhone() {},
  },
};
</script>

<style>
</style>