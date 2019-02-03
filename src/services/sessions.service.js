import { CONFIG } from '../config/config'
import request from './common.service'


export const sessionsService = {
    getSessions,
    getSessionInfo,
    getNotes,
    submitNotes,
    postNotes
}

//get session list for particular event
function getSessions(eventId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions`)
}

//get single session
function getSession(eventId, sessionId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}`)
}

function getSessionInfo(eventId, sessionId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/`)
}

function getNotes(eventId, sessionId, attendeeId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes?attendeeid=${attendeeId}`)
}

function submitNotes(eventId, sessionId, data) {
    return request.put(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes`,data)
    }

function postNotes(eventId, sessionId, data) {
    return request.post(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes`,data)
}

//https://api.v2.sessions.usoncevents.com/events/1/sessions/2/notes?sessionid=1&attendeeid=4&note=great
      
