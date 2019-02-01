import { CONFIG } from "../config/config";
import request from "./common.service";

//export const resourcesService = { getResources, getResourceDetails };
export const resourcesService = { getResources };

function getResources(eventId, sessionId) {
  return request.get(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/resources`
  );
}

// function getResourceDetails(eventId, sessionId, resourceId) {
//   return request.get(
//     CONFIG.api.sessions +
//       `/events/${eventId}/sessions/${sessionId}/resources/${resourceId}`
//   );
// }
