<template>
  <v-stepper v-model="progress" class="elevation-0">
    <div class="header pt-1">Change Password</div>
    <v-stepper-header class="header">
      <v-stepper-step :complete="progress > 1" step="1">
        <div>Change Password</div>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="progress > 2" step="2">Update Profile</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Add Photo</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content class="px-0 primary" step="1">
        <v-form ref="passwordForm" v-model="passwordFormValid">
          <input
            class="startup-text mb-2 elevation-5 pa-2"
            type="password"
            v-model="password"
            placeholder="New Password"
          >
          <input
            class="startup-text ma-3 pa-2 elevation-5"
            type="password"
            v-model="passwordCopy"
            placeholder="Retype password"
          >
        </v-form>

        <div class="text-xs-right px-3">
          <v-btn
            color="secondary"
            @click="submitPasswordChange()"
            :disabled="!passwordFormValid"
          >Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content class="px-0 primary" step="2">
        <v-form ref="passwordForm" v-model="passwordFormValid">
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="firstName"
            placeholder="First Name"
          >
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="lastName"
            placeholder="Last Name"
          >
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="phone"
            placeholder="Phone Number"
          >
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="streetAddress1"
            placeholder="Street Address 1"
          >
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="streetAddress2"
            placeholder="Street Address 2"
          >
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="city"
            placeholder="City"
          >
          <select
            id="select-statelist"
            @click="loadStates"
            class="startup-text mb-2 pa-2 elevation-5"
          ></select>
          <!-- <v-select color="white" v-model="state" :items="stateList" label="State" required></v-select> -->
          <input
            class="startup-text mb-2 pa-2 elevation-5"
            type="text"
            v-model="zip"
            placeholder="Zip Code"
          >
        </v-form>
        <div class="text-xs-right px-3">
          <v-btn color="secondary" @click="progress = 1" :disabled="!passwordFormValid">Back</v-btn>
          <v-btn color="secondary" @click="progress = 3" :disabled="!passwordFormValid">Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content class="px-0 primary" step="3">
        <div class="text-xs-center">
          <p>Please upload a picture of yourself.</p>
        </div>
        <div class="text-xs-center">
          <v-avatar size="100px">
            <img v-bind:src="profileImage" @click="openFileUpload()">
          </v-avatar>
          <input
            style="display:none"
            type="file"
            accept="image/*"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          >
        </div>

        <v-checkbox
          color="white"
          class="mb-2 pa-3"
          :label="`${eulaText}`"
          hide-details
          v-model="eulaAccepted"
        ></v-checkbox>

        <router-link to class="white--text">
          <span @click="dialog = true;" class="v-label">View Terms and Conditions</span>
        </router-link>

        <br>
        <div class="text-xs-right px-3">
          <v-btn color="secondary" @click="progress = 2">Back</v-btn>
          <v-btn color="primary" :disabled="!eulaAccepted" @click="submitForm()">Submit</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
    <v-dialog v-model="dialog" width="85%" scrollable>
      <v-card>
        <v-card-title class="headline primary">End-User License Agreement</v-card-title>
        <v-card-text></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="eulaAccepted = true; dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-stepper>
</template>

<style scoped>
.header {
  background-color: #1f4778;
}
</style>

<script>
import { STATELIST } from "../utils/constants.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      city: "",
      dialog: false,
      eulaAccepted: false,
      eulaText: "I have read and agree to the terms and conditions",
      firstName: "",
      lastName: "",
      nickName: "",
      password: "",
      passwordCopy: "",
      passwordFormValid: false,
      phone: "",
      profileFormValid: false,
      profileImage: require("../assets/blank-profile.png"),
      progress: 0,
      state: "",
      stateList: STATELIST,
      streetAddress1: "",
      streetAddress2: "",
      zip: ""
    };
  },
  created: {},
  methods: {
    ...mapActions({
      createProfile: "account/createProfile",
      error: "alert/error"
    }),
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.profileImage = reader.result;
        }.bind(this),
        false
      );
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    openFileUpload: function() {
      this.$refs.file.click();
    },
    submitForm: function() {
      // TODO
      const data = {};
      this.createProfile(data);
    },
    submitPasswordChange: function() {
      if (this.password !== this.passwordCopy) {
        this.error("Passwords do not match.");
      } else {
        this.progress = 2;
      }
    },
    loadStates() {
      let x = document.getElementById("select-statelist");
      STATELIST.forEach(s => {
        let option = document.createElement("option");
        option.text = s;
        x.add(option);
      });
    }
  }
};
</script>
