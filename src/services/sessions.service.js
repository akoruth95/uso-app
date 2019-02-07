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
  sessionBookmarks
};

//get session list for particular event
function getSessions(eventId) {
  return request.get(CONFIG.api.url + `/events/${eventId}/sessions`);
}

//get single session
function getSession(eventId, sessionId) {
  return request.get(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}`
  );
}

function getSessionInfo(eventId, sessionId) {
  return request.get(CONFIG.api.url + `/sessions/${sessionId}/`);
}

function getNotes(eventId, sessionId, attendeeId) {
  return request.get(
    CONFIG.api.sessions +
      `/events/${eventId}/sessions/${sessionId}/notes?attendeeid=${attendeeId}`
  );
}

function submitNotes(eventId, sessionId, data) {
  return request.put(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes`,
    data
  );
}

function postNotes(eventId, sessionId, data) {
  return request.post(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/notes`,
    data
  );
}

function getQuestions(eventId, sessionId) {
  return request.get(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/questions`
  );
}

function postQuestions(eventId, sessionId, data) {
  return request.post(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/questions`,
    data
  );
}

function submitQuestions(eventId, sessionId, data) {
  return request.put(
    CONFIG.api.sessions + `/events/${eventId}/sessions/${sessionId}/questions`,
    data
  );
}

function sessionLikes(payload) {
  return request.post(CONFIG.api.url + "/sessions/likes", payload);
}

function sessionBookmarks(payload) {
  return request.post(CONFIG.api.url + "/sessions/bookmarks", payload);
}

//https://api.v2.sessions.usoncevents.com/events/1/sessions/1/questions
