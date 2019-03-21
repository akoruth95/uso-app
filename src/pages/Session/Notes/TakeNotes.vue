<template>
  <div style="margin:10px">
    <v-container fluid grid-list-xl>
      <div>
        <h2 class="whitetext">Take Notes about the session</h2>
        <p class="whitetext">Use the Space below to write your own notes about the session</p>
        <br>
        <form>
          <textarea
            v-model="userNote.note"
            name="content"
            style="width:100%;border-radius:15px"
            maxlength="300"
            class="post-text pa-2"
            block
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
      userNote: {
        note: "",
        noteId: 0
      }
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState("sessions", ["notes", "selectedSession"])
  },
  created() {
    this.loadNotes();
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
    loadNotes() {
      sessionsService
        .getNotes(this.selectedSession.sessionId, this.selectedEvent.attendeeId)
        .then(response => {
          if (response.data.length > 0) {
            this.userNote = response.data[0];
          }
        });
    },
    submit() {
      const data = {
        attendeeId: this.selectedEvent.attendeeId,
        note: this.userNote.note,
        sessionId: this.selectedSession.sessionId
      };
      if (this.userNote.noteId != 0) {
        data.noteId = this.userNote.noteId;
        sessionsService.submitNotes(this.userNote.noteId, data);
      } else {
        sessionsService.postNotes(data);
      }
    }
  }
};
</script>

<style>
#text-area {
  position: relative;
  border: 1px solid #bbb;
  border-radius: 3px;
  margin: 0;
  padding: 0.4em 0.6em;
  min-height: calc(100vh * 0.5);
  min-width: calc(100vh * 0.5);
  outline: none;
}

.post-text {
  background-color: #003472;
  min-height: calc(100vh * 0.5);
}
</style>