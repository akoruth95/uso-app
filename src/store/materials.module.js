import { materialsService } from '../services';

const state = {
    materialsList: [],
    selectedMaterial: {}
}

const mutations = {
    saveMaterials(state, materialList) {
        state.materialList = materialList;
    },
    setSelectedMaterial(state, material_id) {
        state.selectedMaterial = state.materialList.find(m => m.material_id === material_id);
        //state.selectedMaterial = material_id;
    }
}

const actions = {
    getMaterials({commit}, event_id){
        materialsService.getMaterials(event_id).then(result => {
            
            commit('saveMaterials', result.data);

            });
    },
    // setSelectedMaterial
}

export const materials = {
    namespaced: true,
    state,
    mutations,
    actions
}