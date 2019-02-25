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
        <v-layout justify-center>
        <v-flex xs10>
          <v-form ref="passwordForm" v-model="passwordFormValid">
            <v-text-field
              color="none"
              type="password"
              v-model="formParams.password"
              placeholder="New Password"
              :rules="[requiredRule]"
              required
            ></v-text-field>
            <v-text-field
              color="none"
              type="password"
              v-model="passwordCopy"
              placeholder="Retype password"
              :rules="copyPasswordRules"
              required
            ></v-text-field>
          </v-form>
        </v-flex>
        </v-layout>
        <div class="text-xs-right px-3">
          <v-btn
            color="secondary"
            @click="submitPasswordChange()"
            :disabled="!passwordFormValid"
          >Next</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content class="px-0 primary" step="2">
        <v-layout justify-center>
          <v-flex xs10>
            <v-form ref="passwordForm" v-model="passwordFormValid">
              <v-text-field
                color="none"
                type="text"
                v-model="formParams.firstName"
                placeholder="First Name - required"
                :rules="[requiredRule]"
                required
              ></v-text-field>
              <v-text-field
                color="none"
                type="text"
                v-model="formParams.lastName"
                placeholder="Last Name - required"
                :rules="[requiredRule]"
                required
              ></v-text-field>
              <v-text-field
                color="none"
                type="text"
                v-model="formParams.phoneNumber"
                placeholder="Phone Number"
              ></v-text-field>
              <v-text-field
                type="text"
                color="none"
                v-model="formParams.address1"
                placeholder="Street Address 1"
              ></v-text-field>
              <v-text-field
                type="text"
                color="none"
                v-model="formParams.address2"
                placeholder="Street Address 2"
              ></v-text-field>
              <v-text-field
                type="text"
                color="none"
                v-model="formParams.city"
                placeholder="City"
              ></v-text-field>
              <v-select
                :items="stateList"
                color="none"
                label="State"
                v-model="formParams.state"
              ></v-select>
              <!-- <v-select color="white" v-model="state" :items="stateList" label="State" required></v-select> -->
              <v-text-field
                type="text"
                color="none"
                v-model="formParams.zip"
                placeholder="Zip Code"
              ></v-text-field>
            </v-form>
            <div class="text-xs-right px-3">
              <v-btn color="secondary" @click="progress = 1" :disabled="!passwordFormValid">Back</v-btn>
              <v-btn color="secondary" @click="progress = 3" :disabled="!passwordFormValid">Next</v-btn>
            </div>
          </v-flex>
        </v-layout>
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

<script>
import { STATELIST, TEXT_VALIDATIONS } from "../utils/constants.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formParams: {
        "address1": "",
        "address2": "",
        "city": "",
        "firstName": "",
        "lastName": "",
        "nickName": "",
        "password": "",
        "phoneNumber": "",
        "state": "",
        "zip": "",
        "userRole": "Attendee"
      },
      dialog: false,
      eulaAccepted: false,
      eulaText: "I have read and agree to the terms and conditions",
      passwordCopy: "",
      passwordFormValid: false,
      profileFormValid: false,
      profileImage: require("../assets/blank-profile.png"),
      progress: 0,
      stateList: STATELIST,
      copyPasswordRules: [
        pwdCopy => pwdCopy === this.formParams.password || 'Passwords do not match',
        TEXT_VALIDATIONS.REQUIRED
      ],
    };
  },
  props: [
    "user"
    // need to get user object in here
    // need emailAddress, userId
  ],
  computed: {
    requiredRule() {
      return TEXT_VALIDATIONS.REQUIRED
    }
  },
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
      const data = Object.assign({}, this.formParams, 
        {
          userId: this.user.userId,
          emailAddress: this.user.emailAddress
        }
      );
      this.createProfile(data);
    },
    submitPasswordChange: function() {
      this.passwordFormValid = false;
        this.progress = 2;
    },
    passwordChangeValidate() {
      return !this.password.length || !this.passwordCopy.length || this.password !== this.passwordCopy
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #1f4778;
}

.input-error {
  outline:none;
	box-shadow: 0 0 20px maroon !important;
	border: 1px solid maroon;

}
</style>
