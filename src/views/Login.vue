<template>
  <div class="login">
    <div class="container">
      <h1>Login</h1>
      <input class="input" type="text" placeholder="Email" v-model="email" />
      <br /><br />
      <input
        class="input"
        type="password"
        placeholder="Senha"
        v-model="senha"
      />
      <br />
      <br />

      <button class="button is-primary" @click="login">Login</button>
      <br />
      <br />

      <button class="button is-info" @click="loginGoogle">
        Login pelo google
      </button>
      <br /><br />
      <router-link class="button is-link" to="/phone"
        >Login pelo telefone</router-link
      >
      <p>
        Não tem conta?
        <span>
          <router-link to="/registrar">crie uma conta</router-link>
        </span>
      </p>
      <div id="recaptcha-container"></div>
      <br />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.senha)
        .then(
          (user) => {
            console.log(user);
            this.$router.replace("home");
            alert("Bem vindo, ", user);
          },
          (err) => {
            alert("Não foi possível realizar o login " + err.message);
          }
        );
    },
    loginGoogle: function () {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (result) => {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log("logou: " + token + " -> " + user.phoneNumber);
            this.$router.replace("home");
          },
          (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            //let credential = err.credential;
            alert("-> " + errorCode + " -> " + errorMessage);
          }
        );
    },
    loginPhone() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: function () {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            let phoneNumber = this.email;
            let appVerifier = window.recaptchaVerifier;
            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumber, appVerifier)
              .then(
                (result) => {
                  window.confirmationResult = result;
                  alert(result.confirm);
                },
                (err) => {
                  alert(err);
                }
              );
            //onSignInSubmit();
          },
        }
      );
    },
  },
};
</script>

<style>
</style>