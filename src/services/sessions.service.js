import { CONFIG } from "../config/config";
import request from "./common.service";

export const sessionsService = {
  getSessions,
  getSessionInfo,
  getNotes,
  submitNotes,
  postNotes,
  getQuestions,
  postQuestions,
  submitQuestions,
  sessionLikes,
  sessionBookmarks,
  getQuestionsBySession
};

//get session list for particular event
function getSessions(eventId, attendeeId) {
  return request.get(
    CONFIG.api.url + `/events/${eventId}/attendees/${attendeeId}/sessions`
  );
}

function getSessionInfo(attendeeId, sessionId) {
  return request.get(
    CONFIG.api.url + `/attendees/${attendeeId}/sessions/${sessionId}`
  );
}

function getNotes(sessionId, attendeeId) {
  return request.get(
    CONFIG.api.url +
      `/sessions/${sessionId}/attendees/${attendeeId}/sessionnotes`
  );
}

function submitNotes(notesId, data) {
  return request.put(CONFIG.api.url + `/sessionnotes/${notesId}`, data);
}

function postNotes(data) {
  return request.post(CONFIG.api.url + "/sessionnotes/create", data);
}

function getQuestions(sessionId, attendeeId) {
  return request.get(
    CONFIG.api.url + `/sessions/${sessionId}/attendees/${attendeeId}/questions`
  );
}

function postQuestions(data) {
  return request.post(CONFIG.api.url + "/questions/create", data);
}

function submitQuestions(questionId, data) {
  return request.put(CONFIG.api.url + `/questions/${questionId}`, data);
}

function getQuestionsBySession(sessionId) {
  return request.get(CONFIG.api.url + `/sessions/${sessionId}/questions`);
}
function sessionLikes(payload) {
  return request.post(CONFIG.api.url + "/sessions/likes", payload);
}

function sessionBookmarks(payload) {
  return request.post(CONFIG.api.url + "/sessions/bookmarks", payload);
}
