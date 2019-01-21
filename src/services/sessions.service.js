import { CONFIG } from '../config/config'
import request from './common.service'

export const sessionsService = {
    getSessions,
    getSessionInfo,
    getNotes
}

//get session list for particular event
function getSessions(eventId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions`)
}

function getSessionInfo(eventId, sessionId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/`)
}

function getNotes(eventId, sessionId, attendeeId) {
    return request.get(CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes?attendeeid=${attendeeId }`)
}
