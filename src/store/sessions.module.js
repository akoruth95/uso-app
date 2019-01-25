import { sessionsService } from '../services';

const state = {
    selectedSession: {},
    notes:  []
}

const mutations = {
    selectSession(state, session) {
        state.selectedSession = session
    },
    setNotes(state, notes) {
        state.notes = notes
    }
}

const actions = {
    setSelectedSession({commit}, session) {
        commit('selectSession', session)
    },
    getNotes({commit}, attendeeId) {
        console.log("sessioneerwrwer",state.selectedSession);
        // sessionsService.getNotes(state.selectedSession.eventID, state.selectedSession.sessionId, 4).then(
        //     res=>commit('setNotes',res.data)
        // );
    }
}

export const sessions = {
    namespaced: true,
    state,
    mutations,
    actions
}