import { CONFIG } from '../config/config'
import request from './common.service'


export const attendeesService = {
    getAttendees,
    getAttendeeInfo
}


//get attendees list for particular event
function getAttendees(eventId) {
    return request.get(CONFIG.api.events + `/events/${eventId}/attendees`)
}


//get attendee info
function getAttendeeInfo(eventId, attendeeId) {
    return request.get(CONFIG.api.events + `/events/${eventId}/attendees/${attendeeId}/`)
}