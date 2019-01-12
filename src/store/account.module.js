import router from '../router.js';
import Vue from 'vue';
import { User } from '../utils/UserClass';
import { userService } from '../services';
import { isNullOrUndefined } from 'util';

const USERID = 'userId';
const USERINFO = 'userInfo';

const state = {
    status: {
        loggedIn: !isNullOrUndefined(localStorage.getItem(USERID)),
        registered: false
    },
    userId: localStorage.getItem(USERID),
    userInfo: localStorage.getItem(USERINFO) || {}
}

const actions = {
    changePassword({commit}, {oldPassword, newPassword}) {
        // TODO
        const data = {
            newPassword: newPassword,
            oldPassword: oldPassword,
            userid: state.userId
        };
        userService.changePassword(data).then(
            // TODO
            response => {
                console.log(response);
                commit('passwordChangeSuccess');
            }, error => {
                console.error(error);
                commit('passwordChangeFail');
            }
        );
    },
    createProfile() {
        // TODO
        const data = {};
        userService.createProfile(data).then(
            response => {
                // TODO
                console.log(response);
            }, error => {
                // TODO
                console.error(error);
            }
        );
    },
    getBookmarks() {
        // TODO
        userService.getBookmarks().then(
            response => {
                return response.data;
            }, error => {
                Vue.$log.error(error.message);
            }
        )
    },
    getNotifications() {
        // TODO
        userService.getNotifications().then(
            response => {
                return response.data;
            }, error => {
                Vue.$log.error(error.message);
            }
        )
    },
    getUserInfo({commit, dispatch}) {
        userService.getUserInfo().then(
            response => {
                commit('getUserInfo', response.data);
            }, error => {
                Vue.$log.error(error.message);
                let message = '';
                if (!isNullOrUndefined(state.userInfo)) {
                    message = 'There was a problem refreshing your profile. You are viewing cached data.';
                } else {
                    message = 'There was a problem retrieving your profile. Please try again in a few minutes.';
                }
                dispatch('alert/error', message, {root: true});
            }
        );
    },
    login({commit, dispatch}, {email, password}) {
        dispatch('alert/clear', null, {root: true});
        const data = {
            emailAddress: email,
            password: password
        };
        userService.login(data).then(
            response => {
                if (response.data.exit_code) {
                    Vue.$log.error(response.data.message);
                    commit('loginFailure');
                    dispatch('alert/error', 'Email or password is incorrect', {root: true});
                } else {
                    Vue.$log.info('Successful login for ' + email);
                    commit('loginSuccess', response.data["user_id "]);
                    dispatch('getUserInfo');
                    router.push('/');
                }
            }, error => {
                Vue.$log.error(error.message);
                commit('loginFailure', error);
                dispatch('alert/error', 'There was a problem logging in. Please try again in a few minutes.', {root: true});
            }
        );
    },
    logout({commit, dispatch}) {
        commit('logoutSuccess');
        router.push('/startup', () => {
            dispatch('alert/success', 'You were successfully logged out.', {root: true})
        });
    },
    register({commit, dispatch}, {email, password}) {
        dispatch('alert/clear', null, {root: true});
        const data = {
            emailAddress: email,
            temporaryPassword: password
        };
        userService.register(data).then(
            response => {
                if (response.data.exit_code) {
                    Vue.$log.error(response.data.message);
                    commit('registerFailure');
                    dispatch('alert/error', 'Email or password is incorrect', {root: true});
                } else {
                    Vue.$log.info('Successful registration for ' + email);
                    commit('registerSuccess', email);
                    router.push('/setup');
                }
            }, error => {
                Vue.$log.error(error.message);
                commit('registerFailure');
                dispatch('alert/error', 'There was a problem registering. Please try again in a few minutes.', {root: true});
            }
        );
    }
};

const mutations = {
    getUserInfo(state, data) {
        const newUser = createUser(data);
        localStorage.setItem(USERINFO, newUser);
        state.userInfo = newUser;
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
        state.status = {}
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
    }
};

function createUser(userInfo) {
    const newUser = new User(
        userInfo.city,
        userInfo.emailAddress,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.nickName,
        userInfo.phone,
        userInfo.state,
        userInfo.streetAddress,
        userInfo.userId,
        userInfo.profilePublic,
        userInfo.profileUrl,
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
