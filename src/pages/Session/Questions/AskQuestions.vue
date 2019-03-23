<template>
  <div style="margin:10px">
    <v-container fluid grid-list-xl>
      <div>
        <p class="whitetext title pb-2">You can ask questions to the speaker</p>
        <p class="whitetext">Your questions will be answered during or after the session</p>
        <br>
        <form>
          <textarea
            v-model="questions.question"
            style="width:100%;border-radius:15px"
            maxlength="300"
            class="post-text pa-2"
            blockname="content"
          ></textarea>
          <div align="center">
            <v-btn style="background-color: #f80750" @click="submit()">save</v-btn>
          </div>
        </form>
      </div>
    </v-container>
  </div>
</template>

<script>
import { sessionsService } from "../../../services";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      questions: {
        questionId: 0,
        question: ""
      }
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
        .getQuestions(
          this.selectedSession.sessionId,
          this.selectedEvent.attendeeId
        )
        .then(response => {
          if (response.data.length > 0) {
            this.questions = response.data[0];
          }
        });
    },
    submit: function() {
      const data = {
        sessionId: this.selectedSession.sessionId,
        attendeeId: this.selectedEvent.attendeeId,
        question: this.questions.question,
        askedTime: new Date()
      };
      if (this.questions.questionId != 0) {
        data.questionId = this.questions.questionId;
        sessionsService.submitQuestions(this.questions.questionId, data);
      } else {
        sessionsService.postQuestions(data);
      }
    }
  }
};
</script>

<style>
#text-area {
  border: 1px solid #bbb;
  border-radius: 3px;
  margin: 0;
  padding: 0.4em 0.6em;
  min-height: calc(100vh * 0.5);
  /* min-width: calc(100vh * 0.5); */
  outline: none;
  width: -webkit-fill-available;
}
.post-text {
  background-color: #003472;
  min-height: calc(100vh * 0.5);
}
</style>
