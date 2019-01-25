
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
        console.log("selectedEvent = ", state.selectedEvent);
    }
}

export const events = {
    namespaced: true,
    state,
    mutations,
    actions
}