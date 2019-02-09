<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout v-for="event in events" :key="event.eventId" row wrap>
        <v-flex xs12>
          <EventCard class="primary" v-bind:event="event" @click.native="clickEvent(event)"></EventCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import topBar from "../../components/TopBar";
import { mapActions, mapState } from "vuex";
import EventCard from "./EventCard.vue";
import { eventsService } from "../../services";

export default {
  data() {
    return {
      events: []
    };
  },
  computed: {
    ...mapState("account", ["userId"])
  },
  created() {
    this.fetchEvents();
    this.getBookmarks(this.$store.state.account.userId);
    this.setNewHeading("My Events");
  },

  components: {
    topBar,
    EventCard
  },

  methods: {
    ...mapActions("common", ["setNewHeading"]),
    ...mapActions("events", ["selectEvent"]),
    ...mapActions("bookmarks", ["getBookmarks"]),
    fetchEvents() {
      //TODO: change to make service handle parameter object parsing
      eventsService.getEvents(this.userId).then(res => {
        this.events = res["data"];
      });
    },
    clickEvent(event) {
      this.selectEvent(event);
      this.$router.push({ path: "/event/details" });
    }
  }
};
</script>