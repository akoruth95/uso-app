<template>
  <div>
    <v-layout class="primary white--text location-bar" row>
      <v-flex xs10>
        <v-card-text class="event-location">
          <span>{{eventLocationString}}</span>
          <br>
          {{eventTimeString}}
        </v-card-text>
      </v-flex>
      <v-flex align-self-center xs2>
        <v-icon medium>fa-map-marker-alt</v-icon>
      </v-flex>
    </v-layout>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs6 v-for="(option, index) in options" :key="index">
          <v-card class="elevation-5 primary" :to="option.route">
            <v-flex text-xs-center>

              <v-icon x-large right>fa-book</v-icon>
              <div>Materials</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5 primary" to="/agenda">
            <v-flex text-xs-center>
              <v-icon x-large white right>fa-calendar-minus</v-icon>
              <div>Agenda</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5 primary">
            <v-flex text-xs-center>
              <v-icon x-large white right>fa-flag</v-icon>
              <div>My Progress</div>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card class="elevation-5 primary" to="/events/feedback">
            <v-flex text-xs-center>
              <v-icon x-large white right>fa-comment-alt</v-icon>
              <div>Feedback</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5 primary">
            <v-flex text-xs-center>
              <v-icon x-large white right>fa-share-alt</v-icon>
              <div>Event Wall</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5 primary" to="/attendeelist">
            <v-flex text-xs-center>
              <v-icon x-large white right>fa-users</v-icon>
              <div>Attendees</div>
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
  // TODO: clean up html
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
    this.setNewBacklink('/events');
  },

  methods: {
    ...mapActions('common', ['setNewHeading', 'setShowBackButton', 'setNewBacklink']),
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
</style>
