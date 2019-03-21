import { CONFIG } from '../config/config'
import request from './common.service'


export const attendeesService = {
    getAttendees,
    getAttendeeInfo,
    getLeaderboard
}


//get attendees list for particular event
function getAttendees(eventId) {
    return request.get(CONFIG.api.events + `/events/${eventId}/attendees`)
}

function getLeaderboard(eventId) {
    return request.get(`https://api.v1.uat.usoncevents.com/api/events/${eventId}/progress`)
}

//get attendee info
function getAttendeeInfo(attendeeId) {
    return request.get(CONFIG.api.users + `/users/${attendeeId}/`)
}