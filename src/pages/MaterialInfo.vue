<template>
  <v-container class="text-xs-center" fluid grid-list-lg>
    <h1>{{selectedMaterial.name}}</h1>
      <v-avatar size="200px"><v-img :aspect-ratio="16/9" src="https://taj.tajhotels.com/content/dam/luxury/hotels/Taj_Mahal_Delhi/images/4x3/HotelFacade4x3.jpg">
      </v-img></v-avatar>

      <h2>
           {{selectedMaterial.description}}
      </h2>
      Download Link: {{ selectedMaterial.downloadLink }}
  </v-container>
</template>


<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        
        created() {
            this.setNewHeading('Materials Info');
            this.setShowBackButton(true); 
            this.setNewBacklink('/eventMaterialHome');
        },

        computed: {
            ...mapState({
                selectedMaterial : state => state.materials.selectedMaterial,
            }),
        },

        methods: {
            ...mapActions('common', ['setNewHeading', 'setShowBackButton', 'setNewBacklink']),
        }  
    }
    
<<<<<<< HEAD

=======
>>>>>>> Kumar (#40)
</script>