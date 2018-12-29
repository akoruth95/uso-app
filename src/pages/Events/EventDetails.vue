<template>
  <div>
    <top-bar :heading="selectedEvent.name.toUpperCase()" backlink></top-bar>
    <v-layout class="primary white--text" row>
      <v-flex xs10>
        <v-card-text>
          <span>{{eventLocationString}}</span>
          <br>
          {{eventTimeString}}
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-btn class="ma-0 pa-0" dark small fab flat>
            <v-icon>fa-map-marker-alt</v-icon>
          </v-btn>
        </v-card-text>
      </v-flex>
    </v-layout>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card class="elevation-5">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-book</v-icon>
              <div>Materials</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5" to="/agenda">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-calendar-minus</v-icon>
              <div>Agenda</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-flag</v-icon>
              <div>My Progress</div>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card class="elevation-5" to="/events/feedback">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-comment-alt</v-icon>
              <div>Feedback</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-share-alt</v-icon>
              <div>Event Wall</div>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card class="elevation-5">
            <v-flex text-xs-center>
              <v-icon x-large color="primary" right>fa-users</v-icon>
              <div>Attendees</div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import topBar from "../../components/TopBar";
import { mapState } from "vuex";
export default {
  data() {
    return {
      eventLocationString: "",
      eventTimeString: ""
    };
  },

  computed: {
    ...mapState("events", ["selectedEvent"])
  },

  created() {
    this.setEventDetails();
  },

  methods: {
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    }
  },
  components: {
    topBar
  }
};
</script>

<style>
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
