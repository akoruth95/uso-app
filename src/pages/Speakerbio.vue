<template>
  <v-container class="text-xs-center" fluid grid-list-lg>
    <v-img aspect-ratio="1.7" contain max-height="250" :src="speakerInfo.photoLink"></v-img>
    <p class="title my-2">{{speakerInfo.firstName}} {{speakerInfo.lastName}}</p>
    <p class="body-1 text-xs-left">{{ speakerInfo.speakerBio }}</p>
  </v-container>
</template>


<script>
import { mapActions, mapState } from "vuex";
import { attendeesService } from "../services";

export default {
  data() {
    return {
      speakerInfo: {}
    };
  },
  created() {
    this.getSpeakerInfo();
    this.setNewHeading("Speaker Bio");
    this.setShowBackButton(true);
    this.setNewBacklink("/session-info");
  },
  computed: {
    ...mapState({
      session: state => state.sessions.selectedSession
    })
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),

    getSpeakerInfo() {
      attendeesService.getAttendeeInfo(this.session.speakerId).then(result => {
        this.speakerInfo = result.data;
        console.log(result.data);
      });
    }
  }
};
</script>