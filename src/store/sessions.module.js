import { sessionsService } from '../services';
import Vue from 'vue';
import store from '../store';

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
        console.log("attendee ID", attendeeId);
        return sessionsService.getNotes(state.selectedSession.eventID, state.selectedSession.sessionId, attendeeId);

    },
    submitNotes({commit}, {noteId, eventId, attendeeId, notes}) {
        console.log("store id in session = ", store);
        console.log("attendee id in session = ", store.state.events.selectedEvent.attendee_id);
        console.log("note id in session = ", noteId);

        const data = {
                note_id: noteId,
                sessionid : state.selectedSession.sessionId,
                attendeeid : store.state.events.selectedEvent.attendee_id,
                note: notes
                }; 
                console.log('body: ', data)       
        sessionsService.submitNotes(eventId, state.selectedSession.sessionId, data).then(
            response => {
                commit('saveNote', response.data);
            }, error => {
                Vue.$log.error(error.mesage);
            }

        )
    },
    postNotes({commit}, {eventId, attendeeId, notes}) {
                const data = {
                sessionid : state.selectedSession.sessionId,
                attendeeid : store.state.events.selectedEvent.attendee_id,
                note: notes
                }; 
                sessionsService.postNotes(eventId, state.selectedSession.sessionId, data).then(
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