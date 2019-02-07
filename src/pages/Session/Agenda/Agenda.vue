<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-img class="white--text" max-height="300px" :src="selectedEvent.photoLink"></v-img>
        </v-flex>
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
      sessions: []
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
      sessionsService.getSessions(this.selectedEvent.eventId).then(res => {
        this.sessions = res["data"];
      });
    },
    selectSession(session) {
      this.setSelectedSession(session);
      this.$router.push({ path: "session-info" });
    }
  }
};
</script>