<template>
  <div>
    <h2>Login com o número do celular</h2>
    +55 <input type="number" v-model="phNo" placeholder="Número do celular" />
    <br /><br />
    <button id="sign-in-button" @click="sendOtp">
      Obter código de verificação
    </button>

    <div id="recaptcha-container"></div>
    <br />
    <input type="number" v-model="otp" placeholder="OTP" />
    <br />
    <button @click="verifyOtp">Fazer login</button><br /><br />
    <button @click="sendOtp()">Reenviar sms</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      phNo: "",
      appVerifier: "",
      otp: "",
    };
  },
  methods: {
    sendOtp() {
      let appVerifier = this.appVerifier;
      firebase.auth().languageCode = "pt";

      firebase
        .auth()
        .signInWithPhoneNumber("+55" + this.phNo, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          //
          alert("SMS enviado");
        })
        .catch(function (error) {
          // Error; SMS not sent
          // ...
          alert("Error! SMS not sent", error);
        });
    },
    verifyOtp() {
      let vm = this;
      let code = this.otp;

      window.confirmationResult
        .confirm(code)
        .then(function (result) {
          // User signed in successfully.
          let user = result.user;
          alert(user.verificationId);

          vm.$router.replace("home");
        })
        .catch(function (error) {
          // User couldn't sign in (bad verification code?)
          alert(error);
        });
    },

    initReCaptcha() {
      setTimeout(() => {
        //let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function () {},
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  created() {
    this.initReCaptcha();
  },
};
</script>

<style>
</style>