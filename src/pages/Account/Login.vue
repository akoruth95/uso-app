<template>
  <v-content>
    <v-container fluid fill-height text-xs-center>
      <v-layout align-center justify-center>
        <v-flex xs-12>
          <h1>Login</h1>
          <br>
          <v-form ref="form" v-model="valid">
            <v-text-field
              color="white"
              prepend-icon="fa-envelope"
              v-model="email"
              label="Email"
              type="email"
              :rules="[v => !!v || 'Email is required']"
              required
            ></v-text-field>
            <v-text-field
              color="white"
              prepend-icon="fa-lock"
              v-model="password"
              label="Password"
              type="password"
              :rules="[v => !!v || 'Password is required']"
              required
            ></v-text-field>
          </v-form>
          <div>
            <v-btn color="primary" @click="handleSubmit" :disabled="!valid">Login</v-btn>
          </div>
          <br>
          <div>
            <router-link to style="color:white">
              <span @click="forgotPasswordDialog = true">Forgot password</span>
            </router-link>
          </div>
          <br>
          <div>
            <router-link
              to="/register"
              style="color:white"
            >Don't have an account? Click here to register</router-link>
          </div>
          <br>
          <v-btn @click="autoLogin()">Auto Login</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-dialog v-model="forgotPasswordDialog" fullscreen transition="dialog-bottom-transition">
        <v-card class="text-xs-center">
          <v-toolbar dark color="secondary">
            <v-btn icon dark @click="forgotPasswordDialog = false">
              <v-icon>fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Forgot Password</v-toolbar-title>
          </v-toolbar>
          <v-flex xs-12>
            <v-card-text>
              <br>
              <br>
              <br>
              <h3>Enter your email address.</h3>
              <br>
              <p>A temporary password will be sent to the provided email address.</p>
              <v-form ref="forgotPasswordForm" v-model="formValid">
                <v-text-field
                  prepend-icon="fa-envelope"
                  type="email"
                  v-model="email"
                  :rules="[v => !!v || 'Email is required']"
                  label="Email"
                  required
                ></v-text-field>
              </v-form>
              <v-btn color="primary" @click="forgotPassword()" :disabled="!formValid">Submit</v-btn>
            </v-card-text>
          </v-flex>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<style scoped></style>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      forgotPasswordDialog: false,
      formValid: false,
      loginDirections: "Enter your email address and password.",
      password: "",
      valid: true
    };
  },
  methods: {
    ...mapActions("account", ["login"]),
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
    }
  }
};
</script>
