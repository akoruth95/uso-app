<template>

        <v-container fluid grid-list-lg>
            <v-layout v-if="materialList.length" row wrap>
                <v-layout v-for="b in materialList" :key="b.material_id">
                    <v-flex xs12>
                        <v-list two-line class="primary pa-0" dark>
                            <v-list-tile>
                                <!-- <v-list-tile-avatar>
                                    <v-icon>fa-{{icons[b.type]}}</v-icon>
                                </v-list-tile-avatar> -->
                                <v-list-tile-content @click="selectMaterial(b.material_id)">
                                    <v-list-tile-title>{{b.name}}</v-list-tile-title>
                                     <v-list-tile-sub-title>{{b.description}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <!-- <v-list-tile-avatar>
                                    <v-btn icon><v-icon>fa-trash-alt</v-icon></v-btn>
                                </v-list-tile-avatar> -->
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-container>


</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { materialsService } from '../services';
    import store  from '../store';

    export default {
        
        created() {
            this.setNewHeading('Materials');
            this.getMaterials(this.event.event_id);
            this.setShowBackButton(true);   
            this.setNewBacklink('/event/details');
        },

        computed: {
            ...mapState({
                event: state => state.events.selectedEvent,
                materialList : state => state.materials.materialList,
                selectedMaterial : state => state.materials.selectedMaterial,

            }),
        },

        methods: {
            ...mapActions('common', ['setNewHeading', 'setShowBackButton', 'setNewBacklink']),
            ...mapActions('materials', ['getMaterials']),
            selectMaterial(material_id){
                store.commit('materials/setSelectedMaterial', material_id);
                this.$router.push({ path: "material-info" });
            }
        }
        
    }
</script>

