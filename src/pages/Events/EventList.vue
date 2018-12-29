<template>
  <div>
    <top-bar heading="MY EVENTS" backlink></top-bar>
    <v-container fluid grid-list-lg>
      <v-layout v-for="event in events" :key="event.event_id" row wrap>
        <v-flex xs12>
          <EventCard v-bind:event="event" @click.native="clickEvent(event)"></EventCard>
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
      user: {
        id: "1"
      },
      events: []
    };
  },

  computed: {
    ...mapState("account", ["user"])
  },

  created() {
    this.fetchEvents();
  },

  components: {
    topBar,
    EventCard
  },

  methods: {
    ...mapActions("events", ["selectEvent"]),
    fetchEvents() {
      //TODO: change to make service handle parameter object parsing
      eventsService.getEvents(this.user.id).then(res => {
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