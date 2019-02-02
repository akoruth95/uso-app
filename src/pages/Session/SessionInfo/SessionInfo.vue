<template>
  <v-container class="session-info-container" fluid grid-list-md text-xs-center>
    <v-layout class="session-info-img" row wrap>
      <v-flex class="session-info-img-container" xs12>
        <v-img class="white--text" height="200px" :src="sessionInfo.photoLink"></v-img>
      </v-flex>
    </v-layout>
    <br>
    <!-- <v-layout class="session-info-title" row wrap>
      <v-flex xs12>
        <h1>
          <strong>{{sessionInfo.name}}</strong>
        </h1>
      </v-flex>
    </v-layout>-->
    <v-layout row>
      <v-flex>
        <div class="title mt-2">
          <span class="title">{{sessionInfo.name}}</span>
        </div>
      </v-flex>
      <v-flex>
        <v-btn small color="secondary" class="elevation-5" v-on:click="callActivity('like')" icon>
          <v-icon small color="white">fas fa-thumbs-up</v-icon>
        </v-btn>
        {{likeCount}}
      </v-flex>
      <v-flex>
        <v-btn small class="elevation-5" v-on:click="callActivity('bookmark')" icon>
          <v-icon small color="white">fas fa-bookmark</v-icon>
        </v-btn>
        {{bookmarkCount}}
      </v-flex>
    </v-layout>
    <!-- <v-layout class="session-info-actions">
      <v-flex xs8>
        <a href="#/speakerbio" class="subheading white--text"></a>
    
    < </v-flex>
    </v-layout>-->
    <!-- TODO: need to get speaker name, just getting speaker id now-->
    <v-btn flat block to="/speakerbio">Speaker: Robert O'Neill</v-btn>
    <!-- <div class="title pb-2">{{sessionInfo.name}}</div> -->
    <v-layout class="session-info-description text-xs-left" row wrap>
      <v-flex style="heigth:auto">{{sessionInfo.description}}</v-flex>
    </v-layout>

    <br>
    <!-- <v-layout class="session-info-speaker" row wrap>
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
    <br>-->
    <!-- <v-speed-dial v-model="fab" bottom right direction="left" transition="slide-x">
      <v-btn slot="activator" v-model="fab" color="secondary" dark fab>
        <v-icon>fa-circle</v-icon>
        <v-icon>fa-times</v-icon>
      </v-btn>
      <v-btn fab dark small color="secondary">
        <v-icon>fa-edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="secondary">
        <v-icon>fa-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="secondary">
        <v-icon>fa-trash</v-icon>
      </v-btn>
    </v-speed-dial>-->
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
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },

  created() {
    this.fetchSessionInfo();
    this.fetchLikes();
    this.fetchBookmarks();
    this.setActivityDetails();
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
