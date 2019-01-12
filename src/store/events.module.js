
const state = {
    selectedEvent: {}
}

const mutations = {
    selectEvent(state, event) {
        state.selectedEvent = event
    }
}

const actions = {
    selectEvent({commit}, event) {
        commit('selectEvent', event)
    }
}

export const events = {
    namespaced: true,
    state,
    mutations,
    actions
}