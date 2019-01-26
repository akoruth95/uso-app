<template>
  <div style="margin:10px">
    <v-container fluid grid-list-xl >
    <div>
        <h2 class="whitetext">Take Notes about the session</h2>
        <p class="whitetext"> Use the Space below to write your own notes about the session </p>
        <form>
          
            <textarea class="ip3" v-model="note"   name="content"></textarea>
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
import VueTrix from 'vue-trix';
export default {
  data() {
    return {
      userNote: {
        note : ''
      },
      note: ''
    };
  },
  computed: {
    ...mapState('events', ['selectedEvent']),
    ...mapState('sessions',['notes','selectedSession'])
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.getNotes(this.selectedEvent.attendee_id);
    Object.assign(this.note, this.notes[0].note);
    //this.userNote.note=this.notes[0].note.slice(0);
    //console.log(this.selectedEvent);
  },
  methods: {
    ...mapActions('common', ['setNewHeading', 'setShowBackButton']),
    ...mapActions('sessions',['getNotes','submitNotes']),
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    },
    submit: function() {
      console.log("In vue session = ", this.selectedSession.sessionId);
      console.log('eventID: ', this.selectedSession.eventID);
      console.log('attendeeID: ', this.selectedEvent.attendee_id);
      console.log('note = ', this.note);
      console.log('event details', this.selectedEvent);
       this.submitNotes(this.selectedSession.eventID,
                        this.selectedEvent.attendee_id, this.note);
        
      //https://api.v2.sessions.usoncevents.com/events/1/sessions/2/notes?sessionid=1&attendeeid=4&note=great
        console.log("Notes = " , this.note);
    },
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
  font-family: 'Raleway', sans-serif;
}
.whitetext {
  color: white;
  font-family: 'Raleway', sans-serif;
}
.ip3{
  resize: none;
  outline: none;
  width: 100%;
  padding: 10px;
  border: none;
  height: 100%;
  margin: -10px;
  border: 1px solid silver;
}
trix-toolbar .trix-button-group button {
  background-color: white;
}
trix-editor {
    position:relative;
    border: 1px solid #bbb;
    border-radius: 3px;
    margin: 0;
    padding: 0.4em 0.6em;
    min-height: calc(100vh * .5);
    outline: none;
}
.btn {
    bottom: 4%;
    right:10%;
}
</style>
