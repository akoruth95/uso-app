import request from "./common.service";
import store from "../store";
import { CONFIG } from "../config/config";

const baseUrl = CONFIG.api.url;

function changePassword(data) {
  // TODO
  return request.put(
    baseUrl + `/users/${store.state.account.userId}/password`,
    data
  );
}

function createProfile(data) {
  console.log(data);
  return request.post(
    baseUrl + "/users/create",
    data
  );
}

function forgotPassword(data) {
  // TODO
  console.log(data);
}

function getBookmarks() {
  return request.get(
    baseUrl + `/users/${store.state.account.userId}/bookmarks`
  );
}

function getNotifications() {
  return request.get(
    baseUrl + `/users/${store.state.account.userId}/notifications`
  );
}
//https://api.v2.users.usoncevents.com/users/2/notifications
function updateNotifications(data) {
  return request.put(
    baseUrl + `/users/${store.state.account.userId}/notifications`,
    data
  );
}

function getUserInfo() {
  return request.get(baseUrl + `/users/${store.state.account.userId}`);
}

function getAttendeeProfile(userId) {
  return request.get(baseUrl + `/users/${userId}`);
}

function login(data) {
  return request.post(baseUrl + "/users/login", data);
}

function register(data) {
  return request.post(baseUrl + "/users", data);
}

function updateProfile(data) {
  return request.post(
    baseUrl + `/users/${store.state.account.userId}/profile`,
    data
  );
}

function deleteBookmark(streamId) {
  return request.delete(CONFIG.api.url + `/streams/${streamId}`);
}

export const userService = {
  changePassword,
  createProfile,
  forgotPassword,
  getBookmarks,
  getNotifications,
  getUserInfo,
  login,
  register,
  updateProfile,
  getAttendeeProfile,
  updateNotifications,
  deleteBookmark
};
