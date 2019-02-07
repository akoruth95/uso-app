import Vue from "vue";
import { resourcesService } from "../services";

const state = {
  resourceList: [],
  selectedResource: {}
};

const mutations = {
  saveResources(state, resourceList) {
    state.resourceList = resourceList;
  },
  setSelectedResource(state, resourceId) {
    state.selectedResource = state.resourceList.find(
      m => m.resourceId === resourceId
    );
  }
};

const actions = {
  getResources({ commit }, sessionId) {
    //const sessionId = payload.sessionId;
    resourcesService.getResources(sessionId).then(
      result => {
        commit("saveResources", result.data);
      },
      error => {
        Vue.$log.error(error);
      }
    );
  }
};

export const resources = {
  namespaced: true,
  state,
  mutations,
  actions
};
