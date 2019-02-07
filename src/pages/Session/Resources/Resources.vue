<template>
  <v-container fluid grid-list-lg>
    <v-img max-height="150" class="mb-3" src="https://static.usoncevents.com/bulletin-board.jpg"></v-img>
    <v-layout row wrap>
      <v-layout v-for="b in resourceList" :key="b.resourceId">
        <v-flex xs12 class="py-1">
          <v-list two-line class="primary pa-0" dark>
            <v-list-tile class="material-text pointer">
              <v-list-tile-content @click="selectResource(b.resourceId)">
                <v-list-tile-title>{{b.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{b.description}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "../../../store";

export default {
  created() {
    this.setNewHeading("Resources");
    this.getResources(this.session.sessionId);
    this.setShowBackButton(true);
    this.setNewBacklink("/session-info");
  },

  computed: {
    ...mapState({
      event: state => state.events.selectedEvent,
      session: state => state.sessions.selectedSession,
      resourceList: state => state.resources.resourceList,
      selectedResource: state => state.resources.selectedResource
    })
  },

  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions("resources", ["getResources"]),
    selectResource(resourceId) {
      store.commit("resources/setSelectedResource", resourceId);
      this.$router.push({ path: "/resource-info" });
    }
  }
};
</script>

<style>
.material-text {
  background-color: #0077ff3b;
}
</style>
