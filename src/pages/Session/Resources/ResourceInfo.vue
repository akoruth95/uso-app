<template>
  <v-container class="text-xs-left" fluid grid-list-lg>
    <v-img
      aspect-ratio="1.7"
      contain
      class="my-2 mx-3"
      max-height="300"
      :src="selectedResource.photoLink"
    ></v-img>
    <div class="title text-xs-center">{{selectedResource.name}}</div>
    <div class="body-1">{{selectedResource.description}}</div>
    <div>
      <a
        target="_blank"
        class="grey--text"
        :href="selectedResource.downloadLink"
      >{{ selectedResource.downloadLink}}</a>
    </div>
  </v-container>
</template>


<script>
import { mapActions, mapState } from "vuex";
// import { sessions } from "../../../store/sessions.module";

export default {
  created() {
    this.setNewHeading("Resources");
    this.setShowBackButton(true);
    this.setNewBacklink("/resources");
  },

  computed: {
    ...mapState({
      selectedResource: state => state.resources.selectedResource,
      event: state => state.events.selectedEvent,
      session: state => state.sessions.selectedSession
    })
  },

  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ])
  }
};
</script>
<style>
.material-text {
  background-color: #0077ff3b;
}
</style>
