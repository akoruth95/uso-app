import Vue from "vue";
import { bookmarkService } from "../services";

const state = {
  bookmarks: []
};

const mutations = {
  saveBookmarks(state, bookmarks) {
    state.bookmarks = bookmarks;
  },
  deleteBookmark(state, streamId) {
    state.bookmarks.forEach((element, index) => {
      if (element.streamId == streamId) {
        state.bookmarks.splice(index, 1);
        return;
      }
    });
  }

  // setSelectedMaterial(state, material_id) {
  //     state.selectedMaterial = state.materialList.find(m => m.material_id === material_id);
  // }
};

const actions = {
  getBookmarks({ commit }, userId) {
    bookmarkService.getBookmarks(userId).then(
      result => {
        commit("saveBookmarks", result.data);
      },
      error => {
        Vue.$log.error(error);
      }
    );
  }
};

export const bookmarks = {
  namespaced: true,
  state,
  mutations,
  actions
};
