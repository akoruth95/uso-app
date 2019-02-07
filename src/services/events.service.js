import { CONFIG } from "../config/config";
import request from "./common.service";

export const eventsService = {
  getEvents,
  getProgress
};

//get all events user is subscribed to
function getEvents(userId) {
  return request.get(CONFIG.api.url + `/users/${userId}/events?status=OPEN`);
}

function getProgress(eventId, userId) {
  //return request.get(CONFIG.api.events + `/events/${eventId}/users/${userId}/progress`)
  return request.get(CONFIG.api.events + `/events/1/users/2/progress`);
}

//function get

//https://api.v1.usoncevents.com/api/events/1/polls
