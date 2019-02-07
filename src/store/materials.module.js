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
  setSelectedMaterial(state, material_id) {
    state.selectedMaterial = state.materialList.find(
      m => m.material_id === material_id
    );
  }
};

const actions = {
  getMaterials({ commit }, eventId) {
    materialsService.getMaterials(eventId).then(
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
