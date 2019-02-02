import { CONFIG } from "../config/config";
import request from "./common.service";

export const bookmarkService = {
  getBookmarks
};

//get attendees list for particular event
function getBookmarks(usersId) {
  return request.get(CONFIG.api.events + `/users/${usersId}/bookmarks`);
}
