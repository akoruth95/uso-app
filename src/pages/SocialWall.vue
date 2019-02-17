<template>
  <div>
    <div class="titlebar primary">
      <div class="mx-3 mt-3">
        <textarea
          block
          v-model="post"
          style="width:100%;border-radius:15px"
          class="post-text pa-2"
          rows="4"
          placeholder="Start Writing..."
          maxlength="300"
          required
        ></textarea>
      </div>
      <div class="text-xs-center">
        <v-btn class="mr-3" small @click="postMessage()" color="secondary">post message</v-btn>
      </div>
    </div>
    <div class="content"></div>
    <v-container fluid grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-flex class="post-text my-2 pa-2" v-for="post in posts" :key="post.wallId" xs12>
            <v-flex>{{ post.post }}</v-flex>
            <v-layout>
              <v-flex xs2 class="text-xs-right">
                <img style="border-radius:5px;" width="30px" :src="post.userPhotoLink">
              </v-flex>
              <v-flex xs5 align-self-center>
                <span class="grey--text pl-2">{{ post.userFullName }}</span>
              </v-flex>
              <v-flex offset-xs2 align-self-center>
                <v-icon
                  @click="postLike(post)"
                  :color="(post.hasLiked)?'secondary':'grey'"
                  small
                >fas fa-thumbs-up</v-icon>
                {{ post.likeCount }}
                <!-- <v-icon color="grey" small class="ml-2">fas fa-flag</v-icon> -->
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
        <v-flex class="text-xs-right" xs12></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
.post-text {
  background-color: #003472;
}
.titlebar {
  height: 24vh;
  width: 100%;
  position: fixed;
  flex-shrink: 0;
}

.content {
  height: 24vh;
  flex-grow: 1;
  overflow-x: auto;
}
</style>
<script>
import { mapActions } from "vuex";
import { wallsService } from "../services";

export default {
  data() {
    return {
      post: "",
      posts: [],
      event: this.$store.state.events.selectedEvent
    };
  },
  created() {
    this.setNewHeading(this.event.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
    this.loadAllWallMessages();
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    loadAllWallMessages() {
      wallsService
        .getWalls(this.event.eventId, this.event.attendeeId)
        .then(res => {
          this.posts = res.data;
        });
    },
    postMessage() {
      if (this.post !== "") {
        wallsService
          .postMessage(this.event.eventId, this.event.attendeeId, this.post)
          .then(res => {
            this.posts.unshift(res.data);
            this.post = "";
          });
      }
    },
    postLike(post) {
      let payload = {
        eventId: this.event.eventId,
        attendeeId: this.event.attendeeId,
        activityType: "like",
        sourceTable: "walls",
        sourceId: post.wallId,
        activityTime: Date.now()
      };
      wallsService.wallLikes(payload).then(res => {
        post.likeCount = res.data;
        post.hasLiked = !post.hasLiked;
      });
    }
  }
};
</script>