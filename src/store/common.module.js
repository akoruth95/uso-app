const state = {
  backlink: "",
  heading: "",
  showBackButton: false,
  showHomeButton: true
};

const actions = {
  setNewBacklink({ commit }, link) {
    commit("newBacklink", link);
  },
  setNewHeading({ commit }, heading) {
    commit("newHeading", heading);
  },
  setShowBackButton({ commit }, show) {
    commit("showBackButton", show);
  },
  setShowHomeButton({ commit }, home) {
    commit("showHomeButton", home);
  }
};

const mutations = {
  newBacklink(state, link) {
    state.backlink = link;
  },
  newHeading(state, heading) {
    state.heading = heading;
  },
  showBackButton(state, show) {
    state.showBackButton = show;
  },
  showHomeButton(state, home) {
    state.showBackButton = home;
  }
};

export const common = {
  actions,
  mutations,
  namespaced: true,
  state
};
