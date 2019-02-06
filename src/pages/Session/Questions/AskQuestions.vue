<template>
  <div style="margin:10px">
    <v-container fluid grid-list-xl>
      <div>
        <p class="whitetext title pb-2">You can ask questions to the speaker</p>
        <p class="whitetext">Your questions will be answered during or after the session</p>
        <form>
          
            <textarea id="text-area"  v-model="questions.question" name="content"></textarea>
                  <!-- <trix-editor input="x"></trix-editor> -->
  
          <!-- <input id="x" type="hidden" name="content">
           <VueTrix inputId="x" v-model="userNote.note" /> -->
          <!-- <trix-editor input="x"></trix-editor> -->
      <div align="center">
        <v-btn style="background-color: #f80750" @click="submit()">save</v-btn>
      </div>
      </form>
      </div>
    </v-container>
  </div>
</template>

<script>
import topBar from "../../../components/TopBar";
import { mapActions, mapState } from "vuex";
import VueTrix from "vue-trix";
export default {
  data() {
    return {
      questions: {
        question_id : 0,
        question: ''
      }
    };
  },

  computed: {
    ...mapState('events', ['selectedEvent']),
    ...mapState('sessions',['questions','selectedSession'])
  },

  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/session-info");
    this.getQuestions(this.selectedEvent.attendee_id).then(
      res=> {
        if(res.data.length == 0)
          this.questions.question_id = 0;
        else {
          this.questions = res.data[0];
        }
      }
    )
  },

  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions('sessions',['getQuestions','submitNotes','postNotes','postQuestions','submitQuestions']),
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    },
    submit: function() {
      if(this.questions.question_id != 0)  {
         this.submitQuestions({questionId: this.questions.question_id, eventId: this.selectedSession.eventID,
                        attendeeId: this.selectedEvent.attendee_id, questions: this.questions.question});
      }
      else {
        this.postQuestions({eventId: this.selectedSession.eventID,
                            attendeeId: this.selectedEvent.attendee_id,
                            questions: this.questions.question });
      }
    }
  },
  components: {
    topBar,
    VueTrix
  }
};
</script>

<style>
.column {
  float: left;
  padding: 10px;
}

.left {
  width: 80%;
}

.right {
  width: 20%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
body {
  font-family: "Raleway", sans-serif;
}
.whitetext {
  color: white;
  font-family: "Raleway", sans-serif;
}
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
#ip3 {
  border-radius: 25px;
  border: 2px solid white;
  padding: 10px;
  width: 95%;
  height: 350px;
}
trix-toolbar .trix-button-group button {
  background-color: white;
}
trix-editor {
  position: relative;
  border: 1px solid #bbb;
  border-radius: 3px;
  margin: 0;
  padding: 0.4em 0.6em;
  min-height: calc(100vh * 0.5);
  outline: none;
}
.btn {
  bottom: 4%;
  right: 10%;
}
</style>
