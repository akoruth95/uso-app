import { sessionsService } from '../services';
import Vue from 'vue';

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
    },
    saveNote(state, note)  {
        state.notes.push(note)
    }
}

const actions = {
    setSelectedSession({commit}, session) {
        commit('selectSession', session)
    },
    getNotes({commit}, attendeeId) {
        console.log("sessione",state.selectedSession);
        // sessionsService.getNotes(state.selectedSession.eventID, state.selectedSession.sessionId, 4).then(
        //     res=>commit('setNotes',res.data)
        // );
    },
    submitNotes({commit}, eventId, attendeeId, note) {
        console.log("event id in session = ", eventId);
        console.log("attendee id in session = ", attendeeId);
        console.log("note id in session = ", note);

        const data = {
                sessionid : state.selectedSession.sessionId,
                attendeeid : attendeeId,
                note: note
                };        
        sessionsService.submitNotes(eventId, state.selectedSession.sessionId, data).then(
            response => {
                commit('saveNote', response.data);
            }, error => {
                Vue.$log.error(error.mesage);
            }

        )
    }
}

export const sessions = {
    namespaced: true,
    state,
    mutations,
    actions
}