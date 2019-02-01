import { CONFIG } from '../config/config'
import request from './common.service'

export const sessionsService = {
    getSessions,
    getSession,
    getSessionInfo
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