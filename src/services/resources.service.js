import { CONFIG } from "../config/config";
import request from "./common.service";

//export const resourcesService = { getResources, getResourceDetails };
export const resourcesService = {
  getResourceDetails,
  getResources,
  resourceBookmarks
};

function getResourceDetails(attendeeId, resourceId) {
  return request.get(
    CONFIG.api.url + `/attendees/${attendeeId}/resources/${resourceId}`
  );
}

function getResources(sessionId) {
  return request.get(CONFIG.api.url + `/sessions/${sessionId}/resources`);
}

function resourceBookmarks(payload) {
  return request.post(CONFIG.api.url + "/resources/bookmarks", payload);
}

// function getResourceDetails(eventId, sessionId, resourceId) {
//   return request.get(
//     CONFIG.api.sessions +
//       `/events/${eventId}/sessions/${sessionId}/resources/${resourceId}`
//   );
// }
