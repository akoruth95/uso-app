<template>
  <div>
    <v-container fluid grid-list-xs>
      <v-text-field
        solo
        clearable
        dark
        background-color="#054185"
        color="white"
        name="search"
        label="search here"
        type="text"
        hide-details
        v-model="search"
      ></v-text-field>
      <v-list class="primary">
        <v-list-tile
          v-for="attendee in filteredList"
          :key="attendee.attendeeId"
          @click="clickAttendee(attendee)"
          class="attendee-back py-2 my-2"
        >
          <v-list-tile-avatar size="50px" class="pr-3">
            <v-img aspect-ratio="0.2" :src="attendee.photoLink"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content class="text-xs-right">
            <div class="body-2 text-xs-right">{{attendee.firstName}} {{attendee.lastName}}</div>
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
      search: "",
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
    }),
    filteredList() {
      if (!this.search) return this.attendeeList;
      let al = [];
      this.attendeeList.forEach(element => {
        if (
          (element !== undefined &&
            element.firstName
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) != -1) ||
          element.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !=
            -1
        ) {
          al.push(element);
        }
      });
      return al;
    }
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

  