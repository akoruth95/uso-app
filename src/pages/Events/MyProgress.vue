<template>
  <div>
    <v-container fluid grid-list-xl >
    
    <div>
        <v-flex text-xs-center align-center xs12>
            <v-avatar size="250px"><img v-bind:src="profileImage"></v-avatar>
            <h1 class="headline py-2">"Novice"</h1>
            <h1 class="headline py-2">{{firstName}} {{lastName}}</h1>
        </v-flex>
    <v-layout row wrap>
      <v-flex xs6>
            <v-flex text-xs-center>
                <v-icon large color="yellow darken-2" right>fa-coins</v-icon>
                <div>600</div>
            </v-flex>
        </v-flex>
        <v-flex xs6>
            <v-flex text-xs-center>
                <v-icon large color="yellow darken-2" right>fa-trophy</v-icon>
                <div>5/15</div>
            </v-flex>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
  
            <v-toolbar-title class="text-xs-center">Achievements</v-toolbar-title>
  
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-list >
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              avatar
            > 
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">fa-check-circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    </div>
  </v-container>
  </div>
</template>

<script>
import topBar from "../../components/TopBar";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      comments: '',
      items: [
        { active: true, title: 'Complete Profile', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Post on Social Wall', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Read Materials', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Take Notes', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
      ],
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState({
            userInfo: state => state.account.userInfo
        }),
    profileImage: function() {
            return this.userInfo.profileUrl || require('../../assets/blank-profile.png');
        },
    firstName: function() {
            return this.userInfo.firstName;
        },
    lastName: function() {
            return this.userInfo.lastName;
        }
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.getUserInfo();
  },
  methods: {
    ...mapActions('common', ['setNewHeading', 'setShowBackButton', ]),
    ...mapActions('account', ['getUserInfo']),
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    },
  },
  components: {
    topBar
  }
};
</script>

<style>
.column {
  float: left;
  padding: 10px;
}
.left {
  width: 80%;
}
.right {
  width: 20%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
body {
  font-family: 'Raleway', sans-serif;
}
h3 {
  color: #f80750;
  font-family: 'Raleway', sans-serif;
}
#ip2 {
    border-radius: 25px;
    border: 2px solid #f80750;
    padding: 10px; 
    width: 95%;
    height: 50px;    
}
.fa-coins {
  color: yellow;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> fixed issues on progress
