<template>
  <v-toolbar color="secondary" height="70px" dark app>
    <v-btn v-if="showBackButton" fab small color="primary" :to="backlink">
      <v-icon style="height:auto;width:auto" small>fa-chevron-left</v-icon>
    </v-btn>
    <!-- <v-btn v-if="!showBackButton && showHomeButton" fab small color="primary" to="/">
      <v-icon style="height:autho; width:auto;" small>fa-home</v-icon>
    </v-btn>-->
    <!-- <v-spacer></v-spacer> -->
    <v-toolbar-title>{{heading}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat small fab to="/faq">
      <v-icon style="height:auto;width:auto">fa-info</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("common", [
      "backlink",
      "heading",
      "showBackButton",
      "showButton"
    ])
  },
  name: "TopBar"
};
</script>
