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
  getNotes({ commit }, attendeeId) {
    return sessionsService.getNotes(
      state.selectedSession.eventID,
      state.selectedSession.sessionId,
      attendeeId
    );
  },
  submitNotes({ commit }, { noteId, eventId, attendeeId, notes }) {
    const data = {
      note_id: noteId,
      sessionid: state.selectedSession.sessionId,
      attendeeid: store.state.events.selectedEvent.attendeeId,
      note: notes
    };
    sessionsService
      .submitNotes(eventId, state.selectedSession.sessionId, data)
      .then(
        response => {
          commit("saveNote", response.data);
        },
        error => {
          Vue.$log.error(error.mesage);
        }
      );
  },
  postNotes({ commit }, { eventId, attendeeId, notes }) {
    const data = {
      sessionid: state.selectedSession.sessionId,
      attendeeid: store.state.events.selectedEvent.attendeeId,
      note: notes
    };
    sessionsService
      .postNotes(eventId, state.selectedSession.sessionId, data)
      .then(
        response => {
          commit("saveNote", response.data);
        },
        error => {
          Vue.$log.error(error.mesage);
        }
      );
  },
  getQuestions({ commit }, attendeeId) {
    return sessionsService.getQuestions(
      state.selectedSession.eventID,
      state.selectedSession.sessionId
    );
  },
  postQuestions({ commit }, { eventId, attendeeId, questions }) {
    const data = {
      sessionid: state.selectedSession.sessionId,
      attendeeid: store.state.events.selectedEvent.attendeeId,
      question: questions
    };
    sessionsService
      .postQuestions(eventId, state.selectedSession.sessionId, data)
      .then(
        response => {
          commit("saveQuestions", response.data);
        },
        error => {
          Vue.$log.error(error.mesage);
        }
      );
  },
  submitQuestions({ commit }, { questionId, eventId, attendeeId, questions }) {
    const data = {
      question_id: questionId,
      sessionid: state.selectedSession.sessionId,
      attendeeid: store.state.events.selectedEvent.attendeeId,
      question: questions
    };
    sessionsService
      .submitQuestions(eventId, state.selectedSession.sessionId, data)
      .then(
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
