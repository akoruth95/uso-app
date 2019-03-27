import { CONFIG } from "../config/config";
import request from "./common.service";

export const materialsService = {
  getMaterials,
  materialBookmarks,
  getMaterialsDetails
};

//get Material list for particular event
function getMaterials(eventId, attendeeId) {
  return request.get(
    CONFIG.api.url + `/events/${eventId}/attendees/${attendeeId}/materials`
  );
}

function materialBookmarks(payload) {
  return request.post(CONFIG.api.url + "/materials/bookmarks", payload);
}

//get Material info
function getMaterialsDetails(attendeeId, materialId) {
  return request.get(
    CONFIG.api.url + `/attendees/${attendeeId}/materials/${materialId}`
  );
}
