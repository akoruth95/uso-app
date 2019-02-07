<template>
  <v-list three-line class="agenda-text">
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{ session.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Speaker Name</v-list-tile-sub-title>
        <v-list-tile-sub-title>{{session.startTime}} - {{session.endTime}} | {{session.location}}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar>
        <v-badge>
          <v-btn icon>
            <v-icon small color="white">fas fa-thumbs-up</v-icon>
            {{session.likesCount}}
          </v-btn>
        </v-badge>
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
import { activityService } from "../../../services";
import { CONFIG } from "../../../config/config";

export default {
  data() {
    return {
      likeCount: 0,
      bookmarkCount: 0,
      activityState: { like: false, bookmark: false },
      ACTIVITY_DETAILS: {
        source: CONFIG.sessionDetails.source,
        sourceId: this.session.sessionId
      }
    };
  },

  props: ["session", "event"],

  computed: {
    ...mapState("account", ["userId"])
  },

  created() {
    this.fetchLikes();
  },

  methods: {
    fetchLikes() {
      let details = {
        ...this.ACTIVITY_DETAILS,
        type: "like"
      };
      activityService
        .getActivity(this.userId, this.event, details)
        .then(res => {
          //TODO: confirm with backend what field for number of likes is
          this.likeCount = res["data"].likes;
        });
    }
  }
};
</script>

<style scoped>
.session-card {
  border-radius: 10px;
}

.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.agenda-text {
  background-color: #0077ff3b;
}
</style>