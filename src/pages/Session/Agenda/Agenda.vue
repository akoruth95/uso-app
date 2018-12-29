<template>
  <div>
    <top-bar heading="AGENDA" backlink></top-bar>
    <v-container fluid grid-list-lg>
      <v-layout v-for="session in sessions" :key="session.sessionId" row wrap>
        <v-flex xs12>
          <SessionCard
            :session="session"
            :event="selectedEvent"
            v-on:click="selectSession(session)"
          ></SessionCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import topBar from "../../../components/TopBar";
import SessionCard from "./SessionCard.vue";
import { mapState, mapActions } from "vuex";
import { sessionsService } from "../../../services";

export default {
  data() {
    return {
      sessions: []
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"])
  },
  created() {
    this.fetchSessions();
  },
  components: {
    topBar,
    SessionCard
  },
  methods: {
    ...mapActions("sessions", ["selectSession"]),
    fetchSessions() {
      sessionsService.getSessions(this.selectedEvent.event_id).then(res => {
        this.sessions = res["data"];
      });
    },
    selectSession(session) {
      this.selectSession(session);
      this.$router.push({ path: "session-info" });
    }
  }
};
</script>