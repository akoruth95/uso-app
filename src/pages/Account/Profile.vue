<template>
    <v-container>
        <v-card-title class="pt-0">
            <v-spacer></v-spacer>
            <v-menu offset-y>
            <v-btn slot="activator" icon>
                <v-icon large>fa-cog</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile @click="showEditProfile()">
                    <v-list-tile-title>Edit Profile</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="showChangePassword()">
                    <v-list-tile-title>Change Password</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="logout()">
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
            </v-list>
            </v-menu>
        </v-card-title>
        <v-flex text-xs-center align-center xs12>
            <v-avatar size="200px"><img v-bind:src="profileImage"></v-avatar>
            <h1 class="headline py-3">{{firstName}} <span v-if="nickName">"{{nickName}}"</span> {{lastName}}</h1>
            <h3 class="py-1">{{city}}, {{state}}</h3>
        </v-flex>
        <v-layout row>
            <v-flex xs12 sm12>
                <v-list two-line class="primary">
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="white">fa-phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{phoneString(userInfo.phone)}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="white">fa-envelope</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{userInfo.email}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="white">fa-map-marker-alt</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{userInfo.streetAddress1}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{userInfo.streetAddress2}}</v-list-tile-sub-title>
                            <v-list-tile-sub-title>{{userInfo.city}}, {{userInfo.state}} {{userInfo.zip}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon color="white">fa-user-secret</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>Your profile is {{profileStatus(userInfo.profilePublic)}}</v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialog()">
                        <v-icon>fa-times</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{dialogHeader}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="dialogAction()" :disabled="disableDialogSubmission()">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div class="text-xs-center"><v-alert transition="slide-y-transition" style="position: absolute; z-index: 2; width: 100%;" v-if="alert.message" :value="true" :type="alert.type" dismissible>{{alert.message}}</v-alert></div>
                <v-card v-if="action === 'editProfile'">
                    <v-card-text>
                        <br />
                        <v-form ref="profileForm" v-model="profileFormValid">
                            <div class="text-xs-center">
                                <v-avatar size="100px"><img v-bind:src="profileFormImage" @click="openFileUpload()"></v-avatar>
                                <input style="display:none" type="file" accept="image/*" id="file" ref="file" v-on:change="handleFileUpload()" />
                            </div>
                            <v-text-field
                                color="white"
                                v-model="profileForm.firstName"
                                :rules="[v => !!v || 'First name is required']"
                                label="First Name"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.lastName"
                                :rules="[v => !!v || 'Last name is required']"
                                label="Last Name"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.nickName"
                                label="Nickname (optional)">
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.email"
                                label="Email"
                                required
                                disabled>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.phone"
                                :rules="[v => !!v || 'Phone number is required']"
                                label="Phone"
                                mask="phone"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.streetAddress1"
                                :rules="[v => !!v || 'Street address is required']"
                                label="Street Address 1"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.streetAddress2"
                                label="Street Address 2 (optional)">
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="profileForm.city"
                                :rules="[v => !!v || 'City is required']"
                                label="City"
                                required>
                            </v-text-field>
                            <v-select
                                color="white"
                                v-model="profileForm.state"
                                :items="stateList"
                                label="State"
                                required>
                            </v-select>
                            <v-text-field
                                color="white"
                                v-model="profileForm.zip"
                                :rules="[v => !!v || 'Zip is required']"
                                label="Zip Code"
                                mask="#####"
                                required>
                            </v-text-field>
                            <v-switch
                                color="white"
                                :label="`Your profile is ${profileStatus(profileForm.profilePublic)}`" 
                                v-model="profileForm.profilePublic">
                            </v-switch>
                        </v-form>
                    </v-card-text>
                </v-card>
                <v-card v-if="this.action === 'changePassword'">
                    <v-card-text>
                        <v-form ref="passwordForm" v-model="passwordFormValid">
                            <v-text-field
                                color="white"
                                v-model="passwordOld"
                                :rules="[v => !!v || 'Old password is required']"
                                label="Old password"
                                type="password"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="passwordNew"
                                :rules="[v => !!v || 'New password is required']"
                                label="New password"
                                type="password"
                                required>
                            </v-text-field>
                            <v-text-field
                                color="white"
                                v-model="passwordNewCopy"
                                :rules="[v => !!v || 'New password is required']"
                                label="Retype new password"
                                type="password"
                                required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<style scoped>
    .v-divider {
        border-color: pink;
    }
</style>

<script>
    import { STATELIST } from '../../utils/constants.js';
    import { mapActions, mapState } from 'vuex';
    
    export default {
        data () {
            return {
                action: '',
                dialog: false,
                passwordFormValid: false,
                passwordNew: '',
                passwordNewCopy: '',
                passwordOld: '',
                profileForm: {
                    profilePublic: false
                },
                profileFormValid: false,
                profileImageFile: null,
                stateList: STATELIST
            }
        },
        created() {
            this.getUserInfo();
            this.setNewHeading('My Profile');
        },
        computed: {
                ...mapState({
                    alert: state => state.alert,
                    userInfo: state => state.account.userInfo
                }),
                city() {
                    return this.userInfo.city;
                },
                dialogHeader() {
                    return this.action === 'editProfile' ? "Edit Profile" : "Change Password";
                },
                email() {
                    return this.userInfo.email;
                },
                firstName() {
                    return this.userInfo.firstName;
                },
                lastName() {
                    return this.userInfo.lastName;
                },
                nickName() {
                    return this.userInfo.nickName;
                },
                phone() {
                    return this.userInfo.phone;
                },
                profileFormImage() {
                    return this.profileForm.profileUrl || require('../../assets/blank-profile.png');
                },
                profileImage() {
                    return (this.userInfo && this.userInfo.profileUrl) ? this.userInfo.profileUrl :
                            require('../../assets/blank-profile.png');
                },
                state() {
                    return this.userInfo.state;
                },
                streetAddress() {
                    return this.userInfo.streetAddress;
                },
                zip() {
                    return this.userInfo.zip;
                }
            },
        methods: {
            ...mapActions('account', ['changePassword', 'getUserInfo', 'logout', 'updateProfile']),
            ...mapActions('alert', ['clear', 'error', 'success']),
            ...mapActions('common', ['setNewHeading']),
            closeDialog() {
                this.clear();
                this.dialog = false;
            },
            dialogAction() {
                if (this.action === 'editProfile') {
                    this.saveProfile();
                } else {
                    this.submitNewPassword();
                }
            },
            disableDialogSubmission() {
                if (this.action === 'editProfile') {
                    return !this.profileFormValid;
                } else {
                    return !this.passwordFormValid;
                }
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
                let reader  = new FileReader();
                reader.addEventListener("load", function () {
                    this.profileForm.profileUrl = reader.result;
                }.bind(this), false);
                if (this.file) {
                    if (/\.(jpe?g|png|gif)$/i.test( this.file.name)) {
                        reader.readAsDataURL(this.file);
                    }
                }
            },
            openFileUpload() {
                this.$refs.file.click();
            },
            phoneString(phoneNumber) {
                return '(' + phoneNumber.slice(0, 3) + ') ' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10);
            },
            profileStatus(profilePublic) {
                return profilePublic ? 'public' : 'private';
            },
            saveProfile() {
                this.clear();
                let errorMessage = '';
                if (this.profileForm.phone.length !== 10) {
                    errorMessage += 'Phone number must be 10 digits long.\n';
                } 
                if (this.profileForm.zip.length !== 5) {
                    errorMessage += 'Zip code must be 5 digits long.\n';
                }
                if (errorMessage.length > 0) {
                    this.error(errorMessage);
                } else if (this.updateProfile(this.profileForm)) {
                    this.dialog = false;
                    this.success('Profile was successfully updated');
                }
            },
            showChangePassword() {
                this.clear();
                this.dialog = true;
                this.action = 'changePassword';
            },
            showEditProfile() {
                this.clear();
                Object.assign(this.profileForm, this.userInfo);
                this.dialog = true;
                this.action = 'editProfile';
            },            
            submitNewPassword() {
                if (this.passwordNew !== this.passwordNewCopy) {
                    this.error('New passwords do not match');
                } else {
                    this.changePassword({
                        oldPassword: this.passwordOld,
                        newPassword: this.passwordNew
                    });
                    this.success('Your password was successfully changed')
                }
            }
        }
    }
</script>
