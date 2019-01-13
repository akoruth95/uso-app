


<template>
  <div>
    
    <v-container fluid grid-list-sm>
      
      <v-layout row wrap>
      
        <v-flex  v-for="attendee in attendeeList" :key="attendee.attendee_id" xs4>
          <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"><div class="fill-height bottom-gradient">{{attendee.first_name}} {{attendee.last_name}}</div></v-img>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>
      
      
      


    <script>
        import { mapActions, mapState } from 'vuex';
        import { attendeesService } from '../services';

        export default {
            data () {
                return {
                    attendeeList:[]
                }
            },
            created() {
              this.getList();
              this.setNewHeading('Attendee List');
              this.setShowBackButton(true);
              this.setNewBacklink('/event/details');
            },
            computed: {
                ...mapState({
                    event: state => state.events.selectedEvent,
                }),
            },
            methods: {
                ...mapActions('common', ['setNewHeading', 'setShowBackButton', 'setNewBacklink']),
                
                getList(){
                    
                  attendeesService.getAttendees(this.event.event_id).then(result => {
                    this.attendeeList = result.data;
                    console.log(result.data);
                    });
                }
            }
        }
    </script>
  