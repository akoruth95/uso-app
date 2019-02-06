<template>
  <div style="margin:10px">
    <v-container fluid grid-list-xl >
    <div>
        <h2 class="whitetext">Take Notes about the session</h2>
        <p class="whitetext"> Use the Space below to write your own notes about the session </p>
        <form>
          
            <textarea id="text-area" v-model="userNote.note"   name="content"></textarea>
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
      userNote: {
        note : '',
        note_id : 0
      },
      notes: [],
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
    this.getNotes(this.selectedEvent.attendee_id).then(
      res => {
        if (res.data.length == 0)
          this.userNote.note_id = 0;
        else {
          this.notes = res.data[0];
          this.userNote = this.notes;
        }
         }
    );
  },
  methods: {
    ...mapActions('common', ['setNewHeading', 'setShowBackButton']),
    ...mapActions('sessions',['getNotes','submitNotes','postNotes']),
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    },
    submit: function() {
      if(this.userNote.note_id != 0)  {
         this.submitNotes({noteId: this.userNote.note_id, eventId: this.selectedSession.eventID,
                        attendeeId: this.selectedEvent.attendee_id, notes: this.userNote.note});
      }
      else {
        this.postNotes({eventId: this.selectedSession.eventID,
                        attendeeId: this.selectedEvent.attendee_id, notes: this.userNote.note});
      }
        
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
  font-family: "Raleway", sans-serif;
}
.whitetext {
  color: white;
  font-family: "Raleway", sans-serif;
}
#text-area {
    position:relative;
    border: 1px solid #bbb;
    border-radius: 3px;
    margin: 0;
    padding: 0.4em 0.6em;
    min-height: calc(100vh * .5);
    min-width: calc(100vh * .5);
    outline: none;
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