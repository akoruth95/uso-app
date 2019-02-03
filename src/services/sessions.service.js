import { CONFIG } from '../config/config'
import request from './common.service'


export const sessionsService = {
    getSessions,
    getSessionInfo,
    getNotes,
    submitNotes
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
    // return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes?attendeeid=${attendeeId }`)
}

function submitNotes(eventId, sessionId, data) {
    console.log("path = ", CONFIG.api.sessions);
    console.log("data" , data);
    return request.put(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes`,data)
    //https://api.v2.sessions.usoncevents.com/events/1/sessions/1/notes
}

//https://api.v2.sessions.usoncevents.com/events/1/sessions/2/notes?sessionid=1&attendeeid=4&note=great
      
