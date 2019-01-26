<template>
  <v-container class="session-info-container" fluid grid-list-md text-xs-center>
    <v-layout class="session-info-img" row wrap>
      <v-flex class="session-info-img-container" xs12>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-img>
      </v-flex>
    </v-layout>
    <br>
    <v-layout class="session-info-title" row wrap>
      <v-flex xs12>
        <h1>
          <strong>{{sessionInfo.name}}</strong>
        </h1>
      </v-flex>
    </v-layout>
    <v-layout class="session-info-description" row wrap>
      <v-flex style="heigth:auto">{{sessionInfo.description}}</v-flex>
    </v-layout>
    <v-layout class="session-info-actions">
      <v-flex xs8>
        <a href="#/speakerbio" class="subheading white--text">Speaker: Robert O'Neill</a>
        <!-- TODO: need to get speaker name, just getting speaker id now -->
      </v-flex>
    </v-layout>
    <br>
    <v-layout class="session-info-speaker" row wrap>
      <v-flex xs4 offset-xs4>
        <v-btn class="elevation-5" v-on:click="callActivity('like')" icon>
          <v-icon small color="white">fas fa-thumbs-up</v-icon>
        </v-btn>
        {{likeCount}}
      </v-flex>
      <v-flex xs4>
        <v-btn class="elevation-5" v-on:click="callActivity('bookmark')" icon>
          <v-icon small color="white">fas fa-bookmark</v-icon>
        </v-btn>
        {{bookmarkCount}}
      </v-flex>
    </v-layout>
    <br>
    <v-layout class="session-info-buttons pb-4" row wrap>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" small>Resources</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" small to="/take-notes">Take Notes</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn class="session-info-btn secondary" small to="/ask-questions">Questions</v-btn>
      </v-flex>
    </v-layout>
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
      sessionInfo: {},
      likeCount: 0,
      bookmarkCount: 0,
      activityState: { like: false, bookmark: false },
      ACTIVITY_DETAILS: {}
    };
  },

  computed: {
    ...mapState("sessions", ["selectedSession"]),
    ...mapState("events", ["selectedEvent"]),
    ...mapState("account", ["userId"]),
    pageName() {
      return this.sessionInfo.name;
    }
  },

  created() {
    this.fetchSessionInfo();
    this.fetchLikes();
    this.fetchBookmarks();
    this.setActivityDetails();
    this.setNewHeading(this.pageName);
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
    fetchSessionInfo() {
      sessionsService
        .getSessionInfo(
          this.selectedEvent.event_id,
          this.selectedSession.sessionId
        )
        .then(res => {
          this.sessionInfo = res["data"];
        });
    },

    fetchLikes() {
      let details = {
        ...this.ACTIVITY_DETAILS,
        type: "like"
      };
      activityService
        .getActivity(this.userId, this.selectedEvent, details)
        .then(res => {
          //TODO: confirm with backend what field for number of likes is
          this.likeCount = res["data"].likes;
        });
    },

    fetchBookmarks() {
      let details = {
        ...this.ACTIVITY_DETAILS,
        type: "bookmark"
      };
      activityService
        .getActivity(this.userId, this.selectedEvent, details)
        .then(res => {
          //TODO: confirm with backend what field for number of bookmarks is
          this.bookmarkCount = res["data"].likes;
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
