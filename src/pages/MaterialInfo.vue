<template>
  <v-container class="text-xs-left" fluid grid-list-lg>
    <v-img
      aspect-ratio="1.5"
      contain
      class="my-2 mx-3"
      max-height="300"
      :src="selectedMaterial.photoLink"
    ></v-img>
    <div class="title text-xs-center">{{selectedMaterial.name}}</div>
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

export default {
  created() {
    this.setNewHeading(this.event.name);
    this.setShowBackButton(true);
    this.setNewBacklink("material");
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
    ])
  }
};
</script>
<style>
.material-text {
  background-color: #0077ff3b;
}
</style>
