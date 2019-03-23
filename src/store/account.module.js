import router from "../router.js";
import Vue from "vue";
import { User } from "../utils/UserClass";
import { userService } from "../services";
import { isNullOrUndefined } from "util";

const USERID = "userId";
const USERINFO = "userInfo";

const state = {
  notifications: [],
  newNotifications: 0,
  status: {
    loggedIn: !isNullOrUndefined(localStorage.getItem(USERID)),
    registered: false
  },
  userId: localStorage.getItem(USERID),
  userInfo: localStorage.getItem(USERINFO) || {}
};

const actions = {
  changePassword({ commit }, { oldPassword, newPassword }) {
    const data = {
      emailAddress: state.userInfo.email,
      newPassword: newPassword,
      oldPassword: oldPassword
    };
    userService.changePassword(data).then(
      response => {
        console.log(response);
        commit("passwordChangeSuccess");
      },
      error => {
        console.error(error);
        commit("passwordChangeFail");
      }
    );
  },
  createProfile({ dispatch }, data) {
    userService.createProfile(data).then(
      () => {
        const params = {
          email: data.emailAddress,
          password: data.password,
          registration: true
        };
        Vue.$log.info("Successful registration for " + params.email);
        dispatch("login", params);
      },
      error => {
        Vue.$log.error(error.message);
        dispatch(
          "alert/error",
          "There was a problem registering. Please try again in a few minutes.",
          { root: true }
        );
      }
    );
  },
  getBookmarks() {
    // TODO
    userService.getBookmarks().then(
      response => {
        return response.data;
      },
      error => {
        Vue.$log.error(error.message);
      }
    );
  },
  getNotifications({ commit }) {
    userService.getNotifications().then(response => {
      commit("getNotifications", response.data);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].notificationRead == "N") commit("incrementCount");
      }
    });
  },

  updateNotifications({ dispatch }) {
    const data = {
      userId: state.USERID,
      notificationRead: "Y"
    };
    userService.updateNotifications(data).then(() => {
      dispatch("getNotifications");
    });
  },

  getUserInfo({ commit, dispatch }) {
    userService.getUserInfo().then(
      response => {
        commit("saveUserInfo", response.data);
      },
      error => {
        Vue.$log.error(error.message);
        let message = "";
        if (!isNullOrUndefined(state.userInfo)) {
          message =
            "There was a problem refreshing your profile. You are viewing cached data.";
        } else {
          message =
            "There was a problem retrieving your profile. Please try again in a few minutes.";
        }
        dispatch("alert/error", message, { root: true });
      }
    );
  },
  login({ commit, dispatch }, { email, password, registration = false }) {
    dispatch("alert/clear", null, { root: true });
    const data = {
      emailAddress: email,
      password: password
    };
    userService.login(data).then(
      response => {
        if (response.data.exit_code) {
          Vue.$log.error(response.data.message);
          commit("loginFailure");
          dispatch("alert/error", "Email or password is incorrect", {
            root: true
          });
        } else {
          Vue.$log.info("Successful login for " + email);
          commit("loginSuccess", response.data["userId"]);
          dispatch("getUserInfo");
          // router.push("/");
          router.push("/", () => {
            if (registration) {
              dispatch(
                "alert/error",
                "You were registered successfully. You have been logged in automatically.",
                {
                  root: true
                }
              );
            }
          });
        }
      },
      error => {
        Vue.$log.error(error.message);
        commit("loginFailure", error);
        dispatch(
          "alert/error",
          "There was a problem logging in. Please try again in a few minutes.",
          { root: true }
        );
      }
    );
  },
  logout({ commit, dispatch }) {
    commit("logoutSuccess");
    router.push("/startup", () => {
      dispatch("alert/success", "You were successfully logged out.", {
        root: true
      });
    });
  },
  register({ commit, dispatch }, { email, password }) {
    dispatch("alert/clear", null, { root: true });
    const data = {
      emailAddress: email,
      temporaryPassword: password
    };
    userService.register(data).then(
      response => {
        if (response.data.exit_code) {
          Vue.$log.error(response.data.message);
          commit("registerFailure");
          dispatch("alert/error", "Email or password is incorrect", {
            root: true
          });
        } else {
          Vue.$log.info("Successful registration for " + email);
          commit("registerSuccess", email);
          //router.push("/setup");
        }
      },
      error => {
        Vue.$log.error(error.message);
        commit("registerFailure");
        dispatch(
          "alert/error",
          "There was a problem registering. Please try again in a few minutes.",
          { root: true }
        );
      }
    );
  },
  updateProfile({ dispatch }, form) {
    const data = {
      address1: form.streetAddress1,
      address2: form.streetAddress2,
      city: form.city,
      firstName: form.firstName,
      lastName: form.lastName,
      nickName: form.nickName,
      phoneNumber: form.phone,
      shareProfile: form.profilePublic ? "Y" : "N",
      state: form.state,
      zip: form.zip
    };
    userService.updateProfile(data).then(
      response => {
        if (response.exit_code) {
          Vue.$log.error(response.message);
          dispatch("alert/error", response.message, { root: true });
        } else {
          dispatch("getUserInfo");
          return true;
        }
      },
      error => {
        Vue.$log.error(error.message);
        dispatch(
          "alert/error",
          "There was a problem updating your profile. Please try again in a few minutes.",
          { root: true }
        );
      }
    );
  }
};

const mutations = {
  getNotifications(state, data) {
    state.notifications = data;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
  },
  loginSuccess(state, userId) {
    localStorage.setItem(USERID, userId);
    state.status.loggedIn = true;
    state.userId = userId;
  },
  logoutSuccess(state) {
    localStorage.removeItem(USERID);
    localStorage.removeItem(USERINFO);
    state.status = {
      loggedIn: false
    };
    state.userId = null;
    state.userInfo = null;
  },
  registerFailure(state) {
    state.status.registered = false;
  },
  registerSuccess(state, userId) {
    localStorage.setItem(USERID, userId);
    state.status.registered = true;
    state.userId = userId;
  },
  saveUserInfo(state, data) {
    const newUser = createUser(data);
    localStorage.setItem(USERINFO, newUser);
    state.userInfo = newUser;
  },
  resetCount(state) {
    state.newNotifications = 0;
    // Object.assign(state, newNotifications);
  },
  incrementCount(state, counter) {
    state.newNotifications = counter;
  }
};

function createUser(userInfo) {
  const newUser = new User(
    userInfo.city,
    userInfo.emailAddress,
    userInfo.firstName,
    userInfo.lastName,
    userInfo.nickName,
    userInfo.phoneNumber,
    userInfo.state,
    userInfo.address1,
    userInfo.address2,
    userInfo.userId,
    userInfo.shareProfile,
    userInfo.photoLink,
    userInfo.userRole,
    userInfo.zip
  );
  return newUser;
}

export const account = {
  actions,
  mutations,
  namespaced: true,
  state
};
