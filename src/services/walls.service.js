import { CONFIG } from "../config/config";
import request from "./common.service";

export const wallsService = {
  getWalls,
  postMessage,
  wallLikes
};

//get wall messages for particular event
function getWalls(eventId, attendeeId) {
  return request.get(
    CONFIG.api.url + `/events/${eventId}/attendees/${attendeeId}/walls`
  );
}

// post message
function postMessage(eventId, attendeeId, post) {
  const data = {
    eventId: eventId,
    attendeeId: attendeeId,
    post: post,
    postedTime: Date.now()
  };
  return request.post(CONFIG.api.url + `/walls/create`, data);
}

function wallLikes(payload) {
  return request.post(CONFIG.api.url + "/walls/likes", payload);
}
