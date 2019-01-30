<template>
  <v-container class="text-xs-center" fluid grid-list-lg>
    <div class="title">{{selectedMaterial.name}}</div>
    <v-img class="my-2 mx-3" :src="selectedMaterial.photoLink"></v-img>
    <div class="body-1">{{selectedMaterial.description}}</div>Download Link:
    <div>
      <a class="grey--text" :href="selectedMaterial.downloadLink">Click Here</a>
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
