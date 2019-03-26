<template>
  <v-toolbar color="secondary" height="70px" dark app>
    <v-btn v-if="showBackButton" fab small color="primary" :to="backlink">
      <v-icon style="height:auto;width:auto" small>fa-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{heading}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="navigateInfo()" color="primary" small fab>
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
  methods: {
    navigateInfo() {
      if (this.$route.name === "faq") {
        this.$router.go(-1);
      } else {
        this.$router.push("/faq");
      }
    }
  },
  name: "TopBar"
};
</script>
