<template>
  <v-container fluid grid-list-lg>
    <v-img max-height="150" class="mb-3" src="https://static.usoncevents.com/learning.jpg"></v-img>
    <v-layout v-if="bookmarks.length" row wrap>
      <v-layout v-for="b in bookmarks" :key="b.id">
        <v-flex xs12 class="px-2 pb-1">
          <v-list two-line class="primary ma-0 pa-0" dark>
            <v-list-tile class="bookmark-text" @click="openBookmark(b)">
              <v-list-tile-avatar>
                <v-icon color="grey">fa-{{icons[b.bookmarkType]}}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="body-2 grey--text">{{b.bookmarkType}}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--lighten-2">{{b.name}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <v-btn @click.stop="deleteBookmark(b.streamId)" color="grey" icon>
                  <v-icon color="secondary" style="height:auto;width:auto">fa-trash-alt</v-icon>
                </v-btn>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout v-if="!bookmarks.length" justify-center>
      <h2 class="pa-4">You have no bookmarks</h2>
    </v-layout>
  </v-container>
</template>

<style scoped></style>

<script>
import { mapActions, mapState } from "vuex";
import store from "../store";
import { sessionsService, userService } from "../services";
import { CONFIG } from "../config/config";

export default {
  created() {
    this.setNewHeading("Bookmarks");
    this.getBookmarks(this.$store.state.account.userId);
  },
  data() {
    return {
      icons: {
        RESOURCE: "book",
        SESSION: "calendar-minus",
        MATERIAL: "book"
      }
    };
  },
  methods: {
    ...mapActions("common", ["setNewHeading"]),
    ...mapActions("bookmarks", ["getBookmarks"]),
    openBookmark(bookmark) {
      console.log(bookmark);
      switch (bookmark.bookmarkType) {
        case "SESSION":
          this.fetchSessionInfo(bookmark.attendeeId, bookmark.itemId);
          break;
        case "RESOURCE":
          this.$router.push("/resource-info");
          break;
        case "MATERIAL":
          this.$router.push("/events/material-info");
          break;
      }
    },

    fetchSessionInfo(attendeeId, sessionId) {
      sessionsService.getSessionInfo(attendeeId, sessionId).then(res => {
        store.commit("sessions/selectSession", res["data"]);
        this.$router.push("/session-info");
      });
    },
    deleteBookmark(streamId) {
      userService.deleteBookmark(streamId).then(r => {
        if (r.status === 200) {
          store.commit("bookmarks/deleteBookmark", streamId);
        }
      });
    }
    // fetchMaterialInfo()
  },
  computed: {
    ...mapState({
      bookmarks: state => state.bookmarks.bookmarks
    })
  }
};
</script>
<style scoped>
.bookmark-text {
  background-color: #0077ff3b;
}
</style>


