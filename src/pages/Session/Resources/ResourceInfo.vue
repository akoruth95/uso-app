<template>
  <v-container class="text-xs-left" fluid grid-list-lg>
    <v-img
      aspect-ratio="1.5"
      contain
      class="my-2 mx-3"
      max-height="300"
      :src="selectedResource.photoLink"
    ></v-img>
    <v-layout row>
      <v-flex>
        <div class="title mt-2">
          <span class="title">{{selectedResource.name}}</span>
        </div>
      </v-flex>
      <v-flex>
        <v-btn
          small
          :class="(selectedResource.hasBookmarked)?'secondary':'primary'"
          class="elevation-5"
          @click="fetchBookmarks()"
          icon
        >
          <v-icon small color="white">fa-bookmark</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <div class="body-1">{{selectedResource.description}}</div>
    <div>
      <a
        target="_blank"
        class="grey--text"
        :href="selectedResource.downloadLink"
      >{{ selectedResource.downloadLink }}</a>
    </div>
  </v-container>
  <!-- <v-container class="text-xs-left" fluid grid-list-lg>
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
  </v-container> -->
</template>


<script>
import { mapActions, mapState } from "vuex";
import { resourcesService } from '../../../services';
// import { sessions } from "../../../store/sessions.module";

export default {
  created() {
    let heading = this.selectedResource.name;
    let backLink = "/bookmark";
    if (this.event.name) {
      heading = this.event.name;
      backLink = "/resources";
    }
    this.setNewHeading(heading);
    this.setShowBackButton(true);
    this.setNewBacklink(backLink);
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
    ]),
    fetchBookmarks() {
      let payload = {
        eventId: this.event.eventId,
        attendeeId: this.event.attendeeId,
        activityType: "bookmark",
        sourceTable: "resource",
        sourceId: this.selectedResource.resourceId,
        activityTime: Date.now()
      };
      resourcesService.resourceBookmarks(payload).then(res => {
        this.$store.commit("resources/setSelectedResourceByResource", res.data);
      });
    }
  }
};
</script>
<style>
.material-text {
  background-color: #0077ff3b;
}
</style>
