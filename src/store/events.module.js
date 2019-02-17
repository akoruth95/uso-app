import { eventsService } from "../services";

const state = {
  selectedEvent: {},
  progress: {},
  polls: []
};

const mutations = {
  selectEvent(state, event) {
    state.selectedEvent = event;
  },
  setProgress(state, progress) {
    state.progress = progress;
  },
  setPolls(state, polls) {
    state.polls = polls;
  }
};

const actions = {
  selectEvent({ commit }, event) {
    commit("selectEvent", event);
  },
  getProgress({ commit }, userId) {
    commit("setProgress", null);
    return eventsService.getProgress(state.selectedEvent.eventId, userId);
  },
  getPolls({ commit }, data) {
    commit("setPolls", null);
    const eventId = data.eventId;
    const attendeeId = data.attendeeId;
    return eventsService.getPolls(eventId, attendeeId);
  },
  submitPolls({ commit }, data) {
    commit("setPolls", null);
    return eventsService.submitPolls(data);
  }
};

export const events = {
  namespaced: true,
  state,
  mutations,
  actions
};
