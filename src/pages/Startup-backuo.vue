<template>
    <v-container fill-height text-xs-center>
        <v-layout row wrap align-center>
            <v-flex xs-12>
                <h1>Welcome to Reset</h1>
                <br /><br />
                <img width="75%" v-bind:src="logo" />
                <br /><br /><br />
                <div><v-btn color="primary" @click="register()">Register</v-btn></div>
                <div><v-btn color="secondary" @click="login()">Login</v-btn></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped></style>

<script>
    export default {
        computed: {
            logo() {
                return require('../assets/uso-logo.svg');
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