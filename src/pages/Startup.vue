<template>
  <v-container class="primary" fill-height text-xs-center>
    <v-layout align-start justify-center row white--text>
      <v-flex xs12>
        <br>
        <img width="50%" v-bind:src="logo">
        <br>
        <br>
        <div
          class="app-title font-weight-black white--text text-xs-center"
          style="font-family:Cinzel"
        >RESET!</div>
        <br>
        <br>
        <v-form ref="form" v-model="valid">
          <input
            class="startup-text mb-2 elevation-5 pa-2"
            type="text"
            v-model="email"
            placeholder="Email"
          >
          <input
            class="startup-text mx-3 mt-3 mb-1 pa-2 elevation-5"
            type="password"
            v-model="password"
            placeholder="Password"
          >
        </v-form>
        <div class="text-xs-right mx-3 mb-3">
          <span @click="forgotPasswordDialog = true" class="grey--text">Forgot password?</span>
        </div>
        <br>
        <div class="mx-3 mt-3 mb-1">
          <v-btn large block color="secondary" class="title" @click="handleSubmit()">Sign In</v-btn>
        </div>
        <div>
          <span class="grey--text pr-1">First time users,</span>
          <span class="body-2" @click="registerDialog=true">Register Here</span>
        </div>

        <v-btn flat @click="autoLogin()">Auto Login</v-btn>
      </v-flex>
      <v-flex>
        <v-dialog
          full-width
          v-model="forgotPasswordDialog"
          fullscreen
          transition="dialog-bottom-transition"
        >
          <div class="primary text-xs-center" style="height:inherit;">
            <v-toolbar dark color="secondary">
              <v-btn icon dark @click="forgotPasswordDialog = false">
                <v-icon>fa-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>Forgot Password</v-toolbar-title>
            </v-toolbar>
            <div class="mx-3 pt-4">
              <h3 class="mt-5">Enter your email address.</h3>
              <br>
              <p>A temporary password will be sent to the provided email address.</p>
              <v-form ref="forgotPasswordForm" v-model="formValid">
                <input
                  class="startup-text mb-2 elevation-5 pa-2"
                  type="text"
                  v-model="email"
                  placeholder="Email"
                >
              </v-form>
              <v-btn color="secondary" @click="forgotPassword()" :disabled="!formValid">Submit</v-btn>
            </div>
          </div>
        </v-dialog>
      </v-flex>
      <v-flex>
        <v-dialog
          full-width
          v-model="registerDialog"
          fullscreen
          transition="dialog-bottom-transition"
        >
          <div class="primary text-xs-center" style="height:inherit;">
            <v-toolbar dark color="secondary">
              <v-btn icon dark @click="registerDialog = false">
                <v-icon>fa-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>Registration</v-toolbar-title>
            </v-toolbar>
            <stepper v-if="resgisterSuccessful"></stepper>
            <div v-else class="mx-3 pt-4">
              <p class="mt-5">{{ registrationDirections }}</p>
              <br>
              <!-- <p>A temporary password will be sent to the provided email address.</p> -->
              <v-form ref="registrationForm" v-model="valid">
                <input
                  class="startup-text mb-2 elevation-5 pa-2"
                  type="text"
                  v-model="email"
                  placeholder="Email"
                >
                <input
                  class="startup-text ma-3 pa-2 elevation-5"
                  type="password"
                  v-model="password"
                  placeholder="Temporary Password"
                >
              </v-form>
              <v-btn color="secondary" @click="registerUser()" :disabled="!formValid">Register</v-btn>
            </div>
          </div>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style >
.startup-text {
  width: 90%;
  height: 50px;
  background-color: #0077ff3b;
  border-radius: 5px;
}
.app-title {
  font-size: 45px !important;
  font-weight: 400;
  line-height: 48px !important;
  letter-spacing: normal !important;
  font-family: "Cinzel", sans-serif;
}
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
}
</style>
<script>
import { mapActions } from "vuex";
import stepper from "../components/Setup.vue";
export default {
  data() {
    return {
      email: "",
      forgotPasswordDialog: false,
      registerDialog: false,
      formValid: false,
      loginDirections: "Enter your email address and password.",
      password: "",
      valid: true,
      registrationDirections:
        "Enter your email address and the temporary password you " +
        "received from USO after registration. If you have not received a " +
        "temporary password yet, contact reset@usoofnc.org",
      resgisterSuccessful: true
    };
  },
  computed: {
    logo() {
      return require("../assets/NC_badge_darkbg_RGB.png");
    },
    reset() {
      return require("../assets/reset-title.png");
    }
  },
  methods: {
    ...mapActions("account", ["login", "register"]),
    autoLogin() {
      this.email = "dbvows@gmail.com";
      this.password = "reset2018";
      this.handleSubmit();
    },
    forgotPassword() {
      // TODO
      console.log("forgot password");
    },
    handleSubmit() {
      const { email, password } = this;
      this.login({ email, password });
    },
    registerUser() {
      if (this.$refs.registrationForm.validate()) {
        const { email, password } = this;
        this.register({ email, password });
      }
    }
  },
  components: {
    stepper
  }
};
</script>