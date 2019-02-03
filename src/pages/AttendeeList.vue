<template>
  <div>
    <v-container fluid grid-list-sm>
      <v-layout row justify-center="true">
          <div>
              <h2>Event Participants</h2>
          </div>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          class="ma-1 primaryLight text-xs-center"
          v-for="attendee in attendeeList"
          :key="attendee.attendee_id"
        >
          <v-avatar size="100px" class="attendee-back elevation-5" @click="clickAttendee(attendee)"> 
            <v-img contain :src="attendee.photo_link"></v-img>
          </v-avatar>
          <div class="caption">{{attendee.first_name}} {{attendee.last_name}}</div>
        </v-flex>
      </v-layout>
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
      attendeesService.getAttendees(this.event.event_id).then(result => {
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

  