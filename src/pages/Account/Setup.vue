<template>
    <v-stepper v-model="progress" class="elevation-0">
        <v-stepper-header>
            <v-stepper-step :complete="progress > 1" step="1">Change Password</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="progress > 2" step="2">Update Profile</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Add Photo</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">        
                <v-card>
                    <v-card-text>
                        <div class="text-xs-center"><p>Please change your password.</p></div>
                        <v-form ref="passwordForm" v-model="passwordFormValid">
                            <v-text-field
                                color="white"
                                v-model="password"
                                :rules="[v => !!v || 'Password is required']"
                                label="New Password"
                                type="password"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="passwordCopy"
                                :rules="[v => !!v || 'Password is required']"
                                label="Retype password"
                                type="password"
                                required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <div class="text-xs-center"><v-btn color="primary" @click="submitPasswordChange()" :disabled="!passwordFormValid">Next</v-btn></div>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card>
                    <v-card-text>
                        <div class="text-xs-center"><p>Please complete all fields not marked optional to move to the next step.</p></div>
                        <v-form ref="profileForm" v-model="profileFormValid">
                            <v-text-field
                                color="white"
                                v-model="firstName"
                                :rules="[v => !!v || 'First name is required']"
                                label="First Name"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="lastName"
                                :rules="[v => !!v || 'Last name is required']"
                                label="Last Name"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="nickName"
                                label="Nickname (optional)">
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="phone"
                                :rules="[v => !!v || 'Phone number is required', v => (v && v.length == 10) || 'Phone number must be valid']"
                                label="Phone"
                                mask="phone"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="streetAddress1"
                                :rules="[v => !!v || 'Street address is required']"
                                label="Street Address 1"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="streetAddress2"
                                label="Street Address 2 (optional)">
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="city"
                                :rules="[v => !!v || 'City is required']"
                                label="City"
                                required>
                            </v-text-field>
                            <v-select
                                color="white"
                                v-model="state"
                                :items="stateList"
                                :rules="[v => !!v || 'State is required']"
                                label="State"
                                required>
                            </v-select>
                            <v-text-field
                                color="white"
                                v-model="zip"
                                :rules="[v => !!v || 'Zip is required', v => (v && v.length == 5) || 'Zip code must be valid']"
                                label="Zip Code"
                                mask="#####"
                                required>
                            </v-text-field>
                        </v-form>
                        <div class="text-xs-center">
                            <v-btn color="secondary" @click="progress = 1">Back</v-btn>
                            <v-btn color="primary" @click="progress = 3" :disabled="!profileFormValid">Next</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card>
                    <v-card-text>
                        <div class="text-xs-center"><p>Please upload a picture of yourself.</p></div>
                        <div class="text-xs-center">
                            <v-avatar size="100px"><img v-bind:src="profileImage" @click="openFileUpload()"></v-avatar>
                            <input style="display:none" type="file" accept="image/*" id="file" ref="file" v-on:change="handleFileUpload()" />
                        </div>
                        <br />
                        <v-layout class="text-xs-center">
                            <v-flex>
                                <v-checkbox color="white" :label="`${eulaText}`" hide-details class="shrink mr-2" v-model="eulaAccepted"></v-checkbox>
                                <br />
                                <router-link to='' class="white--text"><span @click="dialog = true;" class="v-label">View Terms and Conditions</span></router-link>
                            </v-flex>
                        </v-layout>
                        <br />
                        <div class="text-xs-center">
                            <v-btn color="secondary" @click="progress = 2">Back</v-btn>
                            <v-btn color="primary" :disabled="!eulaAccepted" @click="submitForm()">Submit</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-dialog v-model="dialog" width="85%" scrollable>
            <v-card>
                <v-card-title class="headline primary">End-User License Agreement</v-card-title>
                <v-card-text>
                    <p>Please read this End-User License Agreement ("Agreement") carefully before clicking the 
                        "I Agree" button, downloading or using Reset App ("Application").</p>
                    <p>By clicking the "I Agree" button, downloading or using the Application, you are agreeing to 
                        be bound by the terms and conditions of this Agreement.</p>
                    <p>If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and 
                        do not download or use the Application.</p>
                    <p class="title">License</p>
                    <p>USO of NC grants you a revocable, non-exclusive, non-transferable, limited license to download, 
                        install and use the Application solely for your personal, non-commercial purposes strictly in 
                        accordance with the terms of this Agreement.</p>
                    <p class="title">Restrictions</p>
                    <p>You agree not to, and you will not permit others to:</p>
                    <p>a) License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise 
                        commercially exploit the Application or make the Application available to any third party.</p>
                    <p class="title">Modifications to Application</p>
                    <p>USO of NC reserves the right to modify, suspend or discontinue, temporarily or permanently, the 
                        Application or any service to which it connects, with or without notice and without liability to 
                        you.</p>
                    <p class="title">Term and Termination</p>
                    <p>This Agreement shall remain in effect until terminated by you or USO of NC.</p>
                    <p>USO of NC may, in its sole discretion, at any time and for any or no reason, suspend or terminate 
                        this Agreement with or without prior notice.</p>
                    <p>This Agreement will terminate immediately, without prior notice from USO of NC, in the event that 
                        you fail to comply with any provision of this Agreement. You may also terminate this Agreement by 
                        deleting the Application and all copies thereof from your mobile device.</p>
                    <p>Upon termination of this Agreement, you shall cease all use of the Application and delete all copies 
                        of the Application from your mobile device.</p>
                    <p class="title">Severability</p>
                    <p>If any provision of this Agreement is held to be unenforceable or invalid, such provision will be 
                        changed and interpreted to accomplish the objectives of such provision to the greatest extent 
                        possible under applicable law and the remaining provisions will continue in full force and effect.</p>
                    <p class="title">Amendments to this Agreement</p>
                    <p>USO of NC reserves the right, at its sole discretion, to modify or replace this Agreement at any time. 
                        If a revision is material we will provide at least 30 days&#39; notice prior to any new terms taking 
                        effect. What constitutes a material change will be determined at our sole discretion.</p>
                    <p class="title">Contact Information</p>
                    <p>If you have any questions about this Agreement, please contact us.</p>
                    <p class="text-xs-center">Last updated: January 7th, 2019</p>
                </v-card-text>
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

<style scoped></style>

<script>
    import { STATELIST } from '../../utils/constants.js';
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                city: '',
                dialog: false,
                eulaAccepted: false,
                eulaText: 'I have read and agree to the terms and conditions',
                firstName: '',
                lastName: '',
                nickName: '',
                password: '',
                passwordCopy: '',
                passwordFormValid: false,
                phone: '',
                profileFormValid: false,
                profileImage: require('../../assets/blank-profile.png'),
                progress: 0,
                state: '',
                stateList: STATELIST,
                streetAddress1: '',
                streetAddress2: '',
                zip: ''
            }
        },
        methods: {
            ...mapActions({
                createProfile: 'account/createProfile',
                error: 'alert/error'
            }),
            handleFileUpload: function() {
                this.file = this.$refs.file.files[0];
                let reader  = new FileReader();
                reader.addEventListener("load", function () {
                    this.profileImage = reader.result;
                }.bind(this), false);
                if (this.file) {
                    if (/\.(jpe?g|png|gif)$/i.test( this.file.name)) {
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
                    this.error('Passwords do not match.');
                } else {
                    this.progress = 2;
                }
            }
        }
    }
</script>
