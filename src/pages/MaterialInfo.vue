<template>
  <v-container class="text-xs-left" fluid grid-list-lg>
    <v-img
      aspect-ratio="1.5"
      contain
      class="my-2 mx-3"
      max-height="300"
      :src="selectedMaterial.photoLink"
    ></v-img>
    <v-layout row>
      <v-flex>
        <div class="title mt-2">
          <span class="title">{{selectedMaterial.name}}</span>
        </div>
      </v-flex>
      <v-flex>
        <v-btn
          small
          :class="(selectedMaterial.hasBookmarked)?'secondary':'primary'"
          class="elevation-5"
          @click="fetchBookmarks()"
          icon
        >
          <v-icon small color="white">fa-bookmark</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <div class="body-1">{{selectedMaterial.description}}</div>
    <div>
      <a
        target="_blank"
        class="grey--text"
        :href="selectedMaterial.downloadLink"
      >{{ selectedMaterial.downloadLink}}</a>
    </div>
  </v-container>
</template>


<script>
import { mapActions, mapState } from "vuex";
import { materialsService } from "../services";
import store from "../store";

export default {
  created() {
    let heading = this.selectedMaterial.name;
    let backLink = "/bookmark";
    if (this.event.name) {
      heading = this.event.name;
      backLink = "material";
    }
    this.setNewHeading(heading);
    this.setShowBackButton(true);
    this.setNewBacklink(backLink);
  },

  computed: {
    ...mapState({
      selectedMaterial: state => state.materials.selectedMaterial,
      event: state => state.events.selectedEvent
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
        sourceTable: "material",
        sourceId: this.selectedMaterial.materialId,
        activityTime: Date.now()
      };
      materialsService.materialBookmarks(payload).then(res => {
        console.log('Material response: ', res);
        store.commit("materials/setSelectedMaterialByMaterial", res.data);
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
