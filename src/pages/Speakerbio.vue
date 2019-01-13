<template>
  <v-container class="text-xs-center" fluid grid-list-lg>
    <h1>{{speakerInfo.firstName}} {{speakerInfo.lastName}}</h1>
      <!-- <v-img :aspect-ratio="16/9" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/09/12/robert-o-neil.jpg">
      </v-img> -->

      <v-avatar size="200px"><v-img :aspect-ratio="16/9" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/09/12/robert-o-neil.jpg">
      </v-img></v-avatar>

      <h2>
           {{ speakerInfo.speakerBio }}
      </h2>
      <!-- <span>Message: {{ speakerInfo.speakerBio }}</span> -->
  </v-container>
</template>


<script>
        import { mapActions, mapState } from 'vuex';
        import { attendeesService } from '../services';

        export default {
            data () {
                return {
                    speakerInfo:{},
                }
            },
            created() {
              this.getSpeakerInfo();
              this.setNewHeading('Speaker Bio');
              this.setShowBackButton(true);
              this.setNewBacklink('/session-info');
            },
            computed: {
                ...mapState({
                    session: state => state.sessions.selectedSession,
                }),
            },
            methods: {
                ...mapActions('common', ['setNewHeading', 'setShowBackButton', 'setNewBacklink']),

                getSpeakerInfo(){
                  attendeesService.getAttendeeInfo(this.session.speakerId).then(result => {
                    this.speakerInfo = result.data;
                    console.log(result.data);
                    });
                }
            }
        }

</script>