<template>
  <div>
    <v-container fluid grid-list-xs>
      <v-layout row justify-center="true">
        <div class="title">Event Participants</div>
      </v-layout>
      <v-list class="primary">
        <v-list-tile
          v-for="attendee in attendeeList"
          :key="attendee.attendeeId"
          @click="clickAttendee(attendee)"
          class="attendee-back py-2 my-2"
        >
          <v-list-tile-avatar size="50px" class="pr-3">
            <v-img aspect-ratio="0.2" :src="attendee.photo_link"></v-img>
          </v-list-tile-avatar>
          <!-- <v-list-tile-content></v-list-tile-content> -->
          <v-list-tile-content class="text-xs-right">
            <div class="body-2 text-xs-right">{{attendee.first_name}} {{attendee.last_name}}</div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-container>
  </div>
</template>
      
<script>
import { mapActions, mapState } from "vuex";
import { attendeesService } from "../services";

export default {
  data() {
    return {
      attendeeList: []
    };
  },
  created() {
    this.getList();
    this.setNewHeading(this.event.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
  },
  computed: {
    ...mapState({
      event: state => state.events.selectedEvent
    })
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions("attendee", ["selectAttendee"]),

    clickAttendee(attendee) {
      this.selectAttendee(attendee);
      this.$router.push({ name: "profileDetails" });
    },

    getList() {
      attendeesService.getAttendees(this.event.eventId).then(result => {
        this.attendeeList = result.data;
      });
    }
  }
};
</script>
<style>
.attendee-back {
  background-color: #0077ff3b;
}
</style>

  