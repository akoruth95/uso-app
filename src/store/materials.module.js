import Vue from "vue";
import { materialsService } from "../services";

const state = {
  materialList: [],
  selectedMaterial: {}
};

const mutations = {
  saveMaterials(state, materialList) {
    state.materialList = materialList;
  },
  setSelectedMaterial(state, materialId) {
    state.selectedMaterial = state.materialList.find(
      m => m.materialId === materialId
    );
  },
  setSelectedMaterialByMaterial(state, material) {
    state.selectedMaterial = material;
  }
};

const actions = {
  getMaterials({ commit }, data) {
    const eventId = data.eventId;
    const attendeeId = data.attendeeId;
    materialsService.getMaterials(eventId, attendeeId).then(
      result => {
        commit("saveMaterials", result.data);
      },
      error => {
        Vue.$log.error(error);
      }
    );
  }
};

export const materials = {
  namespaced: true,
  state,
  mutations,
  actions
};
