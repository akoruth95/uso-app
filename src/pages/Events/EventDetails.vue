<template>
  <div>
    <v-layout class="header ma-0 py-2 white--text location-bar" row>
      <v-flex xs10>
        <v-card-text class="my-0 pa-0 px-2">
          <span>{{ eventLocationString }}</span>
          <br>
          {{eventTimeString}}
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text class="my-0 pa-0">
          <v-btn class="ma-0 pa-0" dark small fab flat>
            <v-icon>fa-map-marker-alt</v-icon>
          </v-btn>
        </v-card-text>
      </v-flex>
    </v-layout>
    <br>
    <br>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs6 v-for="(option, index) in options" :key="index">
          <v-card class="elevation-5 primary" :to="option.route">
            <v-flex text-xs-center>
              <v-icon x-large white right>{{option.icon}}</v-icon>
              <div>{{option.name}}</div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { eventOptions } from "../../utils/constants";
export default {
  data() {
    return {
      eventLocationString: "",
      eventTimeString: "",
      options: eventOptions
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"])
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/events");
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    }
  }
};
</script>

<style>
.location-bar {
  margin: 10px 5px 5px 5px;
}
p {
  margin-bottom: 0px;
}
.event-location {
  padding: 8px 16px 8px 16px;
}
.column {
  float: left;
  padding: 10px;
}
.left {
  width: 80%;
}
.right {
  width: 20%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.header {
  background-color: #011020;
}
</style>