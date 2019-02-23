<template>
  <v-container class="session-info-container" fluid grid-list-md text-xs-center>
    <v-layout class="session-info-img" row wrap>
      <v-flex class="session-info-img-container" xs12>
        <v-img class="white--text" height="200px" :src="sessionInfo.photoLink"></v-img>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex>
        <div class="title mt-2">
          <span class="title">{{sessionInfo.name}}</span>
        </div>
      </v-flex>
      <v-flex>
        <v-btn
          small
          :class="(hasLiked)?'secondary':'primary'"
          class="elevation-5"
          @click="fetchLikes"
          icon
        >
          <v-icon small color="white">fas fa-thumbs-up</v-icon>
        </v-btn>
        {{sessionInfo.likesCount}}
      </v-flex>
      <v-flex>
        <v-btn
          small
          :class="(hasBookmarked)?'secondary':'primary'"
          class="elevation-5"
          @click="fetchBookmarks()"
          icon
        >
          <v-icon small color="white">fas fa-bookmark</v-icon>
        </v-btn>
        {{sessionInfo.bookmarkCount}}
      </v-flex>
    </v-layout>
    <v-btn flat block to="/speakerbio">Instructor - {{sessionInfo.speakerName}}</v-btn>

    <v-layout class="session-info-description text-xs-left" row wrap>
      <v-flex style="heigth:auto">{{sessionInfo.description}}</v-flex>
    </v-layout>
    <br>
    <v-layout class="session-info-buttons pb-4 mb-4" row wrap>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" to="/resources" small>Resources</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" small to="/take-notes">Take Notes</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" small to="/ask-questions">Questions</v-btn>
      </v-flex>
    </v-layout>
    <br>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { sessionsService } from "../../../services";
import { activityService } from "../../../services";
import { CONFIG } from "../../../config/config";

export default {
  data() {
    return {
      tabs: null,
      fab: false,
      fling: false,
      sessionInfo: this.$store.state.sessions.selectedSession,
      likeCount: 0,
      bookmarkCount: 0,
      activityState: { like: false, bookmark: false },
      ACTIVITY_DETAILS: {},
      hasBookmarked: this.$store.state.sessions.selectedSession.hasBookmarked,
      hasLiked: this.$store.state.sessions.selectedSession.hasLiked
    };
  },

  computed: {
    ...mapState("sessions", ["selectedSession"]),
    ...mapState("events", ["selectedEvent"]),
    ...mapState("account", ["userId"]),
    ...mapState("bookmarks", ["bookmarks"]),
    likeColor() {}
  },

  created() {
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/agenda");
  },

  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    setActivityDetails() {
      this.ACTIVITY_DETAILS = {
        source: CONFIG.sessionDetails.source, //TODO: there needs to be a separate source for session info
        sourceId: this.selectedSession.sessionId
      };
    },

    fetchLikes() {
      let payload = {
        eventId: this.selectedEvent.eventId,
        attendeeId: this.selectedEvent.attendeeId,
        activityType: "like",
        sourceTable: "sessions",
        sourceId: this.selectedSession.sessionId,
        activityTime: Date.now()
      };
      sessionsService.sessionLikes(payload).then(res => {
        this.sessionInfo.likesCount = res.data;
        this.hasLiked = !this.hasLiked;
      });
    },

    fetchBookmarks() {
      let payload = {
        eventId: this.selectedEvent.eventId,
        attendeeId: this.selectedEvent.attendeeId,
        activityType: "bookmark",
        sourceTable: "session",
        sourceId: this.selectedSession.sessionId,
        activityTime: Date.now(),
        insertUser: this.userId
      };
      sessionsService.sessionBookmarks(payload).then(res => {
        this.sessionInfo.bookmarkCount = res.data;
        this.hasBookmarked = !this.hasBookmarked;
      });
    },

    callActivity(activityType) {
      let details = {
        ...this.ACTIVITY_DETAILS,
        type: activityType
      };
      if (this.activityState[activityType]) {
        activityService
          .undoActivity(this.userId, this.selectedEvent, details)
          .then(this.toggleActivity(activityType));
      } else {
        activityService
          .updateActivity(this.userId, this.selectedEvent, details)
          .then(this.toggleActivity(activityType));
      }
    },

    toggleActivity(activityType) {
      this.activityState[activityType] = !this.activityState[activityType];
    }
  }
};
</script>

<style scoped>
.session-info-btn {
  font-size: 12px;
  border-radius: 3px;
}

.session-info-container {
  /* position: relative; */
  height: calc(100vh * 0.85);
}

.session-info-buttons {
  height: 7%;
  align-items: center;
}

.session-info-speaker {
  height: 5%;
  align-items: center;
}

.session-info-actions {
  height: 7%;
  align-items: center;
}

.session-info-title {
  height: 7%;
  align-items: center;
}

.session-info-description {
  height: 35%;
  overflow-y: scroll;
}

.session-info-img {
  height: 30%;
  overflow: hidden;
  align-items: center;
}
</style>
