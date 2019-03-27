import request from "./common.service";
import store from "../store";
import { CONFIG } from "../config/config";

const baseUrl = CONFIG.api.url;

function changePassword(data) {
  return request.post(baseUrl + "/users/password/update", data);
}

function createProfile(data) {
  return request.patch(baseUrl + `/users/${data.userId}`, data);
}

function uploadPhoto(data) {
  let userId = data.get("userId");
  let headers = {
    accept: "application/json",
    "Accept-Language": "en-US,en;q=0.8",
    "Content-Type": `multipart/form-data; boundary=${data._boundary}`
  };
  return request.post(baseUrl + `/users/${userId}/photo/upload`, data, headers);
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
  return request.patch(baseUrl + `/users/${store.state.account.userId}`, data);
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
  deleteBookmark,
  uploadPhoto
};
