import { CONFIG } from "../config/config";
import request from "./common.service";

//export const resourcesService = { getResources, getResourceDetails };
export const resourcesService = { getResourceDetails, getResources, resourceBookmarks };

function getResourceDetails(resourceId) {
  return request.get(CONFIG.api.url + `/resources/${resourceId}`);
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
