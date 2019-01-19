<template>
    <v-container  fill-height text-xs-center>
        <v-layout 
            align-start 
            justify-center 
            row
            white--text>
            <v-flex xs-12>              
                <br>     
               <img width="50%" v-bind:src="logo" />
                <br /><br />              
                 <img width="75%" v-bind:src="reset" />                              
                 <!-- <div class="display-2 font-weight-black white--text text-xs-center">RESET!</div>           -->
                <br />
                 <br /><br />
                 <v-form ref="form" v-model="valid">
                     <div style="margin:20px" class="white--text">
                        <v-text-field  
                                                      
                            color="white"                            
                            autofocus
                            clearable                          
                            v-model="email"
                            label="Email"
                            type="email"                            
                            :rules="[v => !!v || 'Email is required']"
                            required>
                        </v-text-field>
                     
                        <v-text-field style="color:white"
                            color="white"    
                            clearable                        
                            v-model="password"
                            label="Password"
                            type="password"
                            :rules="[v => !!v || 'Password is required']"
                            required>
                        </v-text-field>
                     </div>
                    </v-form>
                
               
                <div>  <router-link to='' style="color:white"><span @click="forgotPasswordDialog = true">Forgot password?</span></router-link></div>
                
                <br />
                <div><v-btn block color="primary" @click="login()">Sign In</v-btn></div>
                <!-- <div><v-btn color="primary" @click="register()">Register</v-btn></div> -->
                <div>  <router-link to='' style="color:white"><span  @click="register()">Register"</span></router-link></div>
                
                <br /><br />
                <br /><br />
                <br /><br />
               
                
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<style scoped></style>

<script>
    export default {
        computed: {
            logo() {
                return require('../assets/NC_badge_darkbg_RGB.png');
            },
            reset() {
                return require('../assets/reset-title.png');
            }
        },
        methods: {
            login() {
                this.$router.push('/login');
            },
            
            register() {
                this.$router.push('/register');
            }
        }
    }
</script>