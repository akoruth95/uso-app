import { eventsService } from "../services";

const state = {
  selectedEvent: {},
  progress: {}
};

const mutations = {
  selectEvent(state, event) {
    state.selectedEvent = event;
  },
  getProgress(state, progress) {
    state.progress = progress;
  }
};

const actions = {
  selectEvent({ commit }, event) {
    commit("selectEvent", event);
  },
  getProgress({ state }, userId) {
    console.log("state", state);
    return eventsService.getProgress(state.selectedEvent.eventId, userId);
  }
};

export const events = {
  namespaced: true,
  state,
  mutations,
  actions
};
