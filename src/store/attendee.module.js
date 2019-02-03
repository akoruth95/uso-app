const state = {
    selectedAttendee: null
};

const actions = {
    selectAttendee({commit}, attendee ) {
        commit('setAttendee', attendee);
    },
};

const mutations = {
    setAttendee(state, attendee) {
        state.selectedAttendee = attendee;
    }  
};

export const attendee = {
    actions,
    mutations,
    namespaced: true,
    state
};