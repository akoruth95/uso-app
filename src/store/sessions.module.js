import { sessionsService } from "../services";
import Vue from "vue";
import store from "../store";

const state = {
  selectedSession: {},
  notes: [],
  questions: []
};

const mutations = {
  selectSession(state, session) {
    state.selectedSession = session;
  },
  setNotes(state, notes) {
    state.notes = notes;
  },
  saveNote(state, note) {
    state.notes.push(note);
  },
  saveQuestions(state, question) {
    state.questions.push(question);
  }
};

const actions = {
  setSelectedSession({ commit }, session) {
    commit("selectSession", session);
  },
  // getNotes({ commit }, attendeeId) {
  //   return sessionsService.getNotes(
  //     state.selectedSession.eventID,
  //     state.selectedSession.sessionId,
  //     attendeeId
  //   );
  // },
  // submitNotes({ commit }, { noteId, eventId, attendeeId, notes }) {
  //   const data = {
  //     note_id: noteId,
  //     sessionid: state.selectedSession.sessionId,
  //     attendeeid: store.state.events.selectedEvent.attendeeId,
  //     note: notes
  //   };
  //   sessionsService.submitNotes(data).then(
  //     response => {
  //       commit("saveNote", response.data);
  //     },
  //     error => {
  //       Vue.$log.error(error.mesage);
  //     }
  //   );
  // },
  // postNotes({ commit }, note) {
  //   // const data = {
  //   //   sessionid: state.selectedSession.sessionId,
  //   //   attendeeid: store.state.events.selectedEvent.attendeeId,
  //   //   note: notes
  //   // };
  //   const data = {
  //     attendeeId: state.events.selectedEvent.attendeeId,
  //     note: note,
  //     sessionId: state.selectedSession.sessionId
  //   };
  //   sessionsService.postNotes(data).then(
  //     response => {
  //       commit("saveNote", response.data);
  //     },
  //     error => {
  //       Vue.$log.error(error.mesage);
  //     }
  //   );
  // },
  getQuestions({ commit }, attendeeId) {
    return sessionsService.getQuestions(
      state.selectedSession.eventID,
      state.selectedSession.sessionId
    );
  },
  postQuestions({ commit }, { sessionId, attendeeId, questions }) {
    const data = {
      sessionId: sessionId,
      attendeeId: attendeeId,
      question: questions,
      askedTime: Date.now()
    };
    sessionsService.postQuestions(data).then(
      response => {
        commit("saveQuestions", response.data);
      },
      error => {
        Vue.$log.error(error.mesage);
      }
    );
  },
  submitQuestions(
    { commit },
    { questionId, sessionId, attendeeId, questions }
  ) {
    const data = {
      questionId: questionId,
      sessionId: sessionId,
      attendeeId: attendeeId,
      question: questions,
      askedTime: Date.now()
    };
    sessionsService.submitQuestions(attendeeId, data).then(
      response => {
        commit("saveQuestions", response.data);
      },
      error => {
        Vue.$log.error(error.mesage);
      }
    );
  }
};

export const sessions = {
  namespaced: true,
  state,
  mutations,
  actions
};
