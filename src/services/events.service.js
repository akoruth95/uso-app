import { CONFIG } from "../config/config";
import request from "./common.service";

export const eventsService = {
  getEvents,
  getProgress,
  getPolls,
  submitPolls
};

//get all events user is subscribed to
function getEvents(userId) {
  return request.get(CONFIG.api.url + `/users/${userId}/events?status=OPEN`);
}

function getProgress(eventId, userId) {
  return request.get(
    CONFIG.api.url + `/events/${eventId}/users/${userId}/progress`
  );
}

function getPolls(eventId, attendeeId) {
  return request.get(
    CONFIG.api.url + `/events/${eventId}/attendees/${attendeeId}/polls`
  );
}

function submitPolls(data) {
  return request.post(CONFIG.api.url + `/answers/post`, data);
}
//function get

//https://api.v1.usoncevents.com/api/events/1/polls
