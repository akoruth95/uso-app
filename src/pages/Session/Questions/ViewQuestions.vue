<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center title">Questions asked by the attendees</v-flex>
      <v-flex xs12>
        <v-flex
          class="question-text my-2 pa-2"
          v-for="question in questions"
          :key="question.questionId"
          xs12
        >
          <v-flex>{{ question.question }}</v-flex>
          <v-layout>
            <v-flex xs2 class="text-xs-right">
              <img style="border-radius:5px;" width="30px" :src="question.userPhotoLink">
            </v-flex>
            <v-flex xs5 align-self-center>
              <span class="grey--text pl-2">{{ question.userFullName }}</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { sessionsService } from "../../../services";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      questions: []
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState("sessions", ["selectedSession"])
  },
  created() {
    this.loadQuestions();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/session-info");
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    loadQuestions() {
      sessionsService
        .getQuestionsBySession(this.selectedSession.sessionId)
        .then(response => {
          if (response.data.length > 0) {
            this.questions = response.data;
          }
        });
    }
  }
};
</script>
<style>
.question-text {
  background-color: #003472;
}
</style>

