import { eventsService } from "../services";

const state = {
    selectedEvent: {},
    progress: {}
}

const mutations = {
    selectEvent(state, event) {
        state.selectedEvent = event
    },
    getProgress(state, progress) {
        state.progress = progress
    }
}

const actions = {
    selectEvent({commit}, event) {
        commit('selectEvent', event)
    },
    getProgress({commit}, userId) {
        console.log('state' , state);
        return eventsService.getProgress(state.selectedEvent.event_id, state.selectedEvent.attendee_id);
    }
}

export const events = {
    namespaced: true,
    state,
    mutations,
    actions
}