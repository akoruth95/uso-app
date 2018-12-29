<template>
  <v-toolbar color="secondary" height="70px" dark app>
    <img class height="55px" src="../assets/uso-logo.svg">
    <v-spacer></v-spacer>
    <span class="title">{{ heading }}</span>
    <v-spacer></v-spacer>
    <v-btn fab small color="primary" to="/search">
      <v-icon style="height:auto;width:auto" small>fa-search</v-icon>
    </v-btn>
    <v-btn fab small color="primary" to="/faq">
      <v-icon style="height:auto;width:auto" small>fa-info</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  props: ["heading", "backlink"],
  name: "TopBar"
};
</script>
