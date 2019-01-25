import { CONFIG } from '../config/config'
import request from './common.service'

export const eventsService = {
    getEvents,
    getProgress
}

//get all events user is subscribed to
function getEvents(userId) {
    return request.get(CONFIG.api.events + `/${userId}/events?status=OPEN`)
}

function getProgress(eventId, userId) {
    return request.get(CONFIG.api.events + `/events/${eventId}/users/${userId}/progress`)
}