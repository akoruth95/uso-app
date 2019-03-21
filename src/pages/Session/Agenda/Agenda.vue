<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-img class="white--text" max-height="300px" :src="selectedEvent.photoLink"></v-img>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab v-for="n in 3" :key="n" ripple>Day {{ n }}</v-tab>
            <v-tab-item v-for="n in 3" :key="n">
              <v-card flat>
                <v-card-text class="primary">

                  jdhfkahfak
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <div class="text-xs-center mt-3">
            <v-btn @click="next">next tab</v-btn>
          </div>
        </v-flex>
        <!-- <v-flex class="text-xs-center" xs6 v-for="dat in dates" :key="dat">
          {{ dat}}
        </v-flex>-->
      </v-layout>
      <v-layout v-for="session in sessions" :key="session.sessionId" row wrap>
        <v-flex xs12>
          <SessionCard
            :session="session"
            :event="selectedEvent"
            @click.native="selectSession(session)"
          ></SessionCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SessionCard from "./SessionCard.vue";
import { mapState, mapActions } from "vuex";
import { sessionsService } from "../../../services";

export default {
  data() {
    return {
      sessions: [],
      dates: []
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"])
  },
  created() {
    this.fetchSessions();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
    this.calulateTabs();
  },
  components: {
    SessionCard
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions("sessions", ["setSelectedSession"]),
    fetchSessions() {
      sessionsService
        .getSessions(this.selectedEvent.eventId, this.selectedEvent.attendeeId)
        .then(res => {
          this.sessions = res["data"];
        });
    },
    selectSession(session) {
      this.setSelectedSession(session);
      this.$router.push({ path: "session-info" });
    },
    calulateTabs() {
      // let startDate = new Date(this.selectedEvent.startDate).getDate();
      // let endDate = new Date(this.selectedEvent.endDate).getDate();
      // console.log(endDate, startDate, endDate - startDate);
      // need to add logic to calulcate date tabs
      this.dates.push("Fri Mar 01 2019");
      this.dates.push("Sat Mar 02 2019");
    }
  }
};
</script>