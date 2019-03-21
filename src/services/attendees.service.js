import { CONFIG } from "../config/config";
import request from "./common.service";

export const attendeesService = {
  getAttendees,
  getAttendeeInfo,
  getLeaderboard
};

//get attendees list for particular event
function getAttendees(eventId) {
  return request.get(CONFIG.api.url + `/events/${eventId}/attendees`);
}

function getLeaderboard(eventId) {
  return request.get(CONFIG.api.url + `/events/${eventId}/progress`);
}

//get attendee info
function getAttendeeInfo(attendeeId) {
  return request.get(CONFIG.api.url + `/users/${attendeeId}/`);
}
