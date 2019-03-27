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
          <v-tabs v-model="sessionGroup" color="blue" slider-color="yellow">
            <v-tab v-for="d in dates" :key="d" ripple>{{ d }}</v-tab>
            <v-tab-item v-for="d in dates" :key="d">
              <v-card flat color="primary">
                <div v-for="session in currentSessions" :key="session.sessionId">
                  <SessionCard
                    class="my-2"
                    :session="session"
                    :event="selectedEvent"
                    @click.native="selectSession(session)"
                  ></SessionCard>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs>
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
      sessionGroup: "Fri Mar 01 2019",
      sessions: [],
      dates: []
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    currentSessions() {
      let cs = [];
      this.sessions.forEach(session => {
        if (
          session.sessionDate &&
          new Date(session.sessionDate).toDateString() ==
            this.dates[this.sessionGroup]
        ) {
          cs.push(session);
        }
      });
      return cs;
    }
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
      let startDate = new Date(this.selectedEvent.startDate);
      let endDate = new Date(this.selectedEvent.endDate);
      let totalEventDays = (endDate - startDate) / 86400000;
      let currentDate = startDate;
      for (let i = 0; i <= totalEventDays; i++) {
        this.dates.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }
};
</script>