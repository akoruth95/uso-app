<template>
  <div>
    <v-container fluid grid-list-xl >
    
    <div>
        <v-flex text-xs-center align-center xs12>
            <v-avatar size="250px"><img v-bind:src="profileImage"></v-avatar>
            <h1 class="headline py-2">Novice</h1>
        </v-flex>
    <v-layout row wrap>
      <v-flex xs6>
            <v-flex text-xs-center>
                <v-icon large color="yellow darken-2" right>fa-coins</v-icon>
                <div>{{userProgress.game_points}}</div>
            </v-flex>
          </v-flex>
          <v-flex xs6>
            <v-flex text-xs-center>
                <v-icon large color="yellow darken-2" right>fa-trophy</v-icon>
                <div>{{userProgress.game_rank}}</div>
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

              <v-list>
                <v-list-tile v-for="item in items" :key="item.title" avatar>
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
import { eventsService } from "../../services";

export default {
  data() {
    return {
      comments: '',
      userProgress: {},
      //active : userProgress.answer_poll_flag === 'Y' ? true : false
      items: [
        { active : false , title: 'Answer Poll', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ask Question', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Bookmarks', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Likes', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Posts', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Provide Feedback', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Take Notes', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Update Profile', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
      ]
      
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState({
      userInfo: state => state.account.userInfo
    }),
    profileImage: function() {
      return (
        this.userInfo.profileUrl || require("../../assets/blank-profile.png")
      );
    },
    levelImage() {
      let level = this.score / this.maxScore;
      if (level < 0.2) return require("../../assets/journeyman.png");
      if (level < 0.4) return require("../../assets/magus.png");
      if (level < 0.6) return require("../../assets/grandmaster.png");
      if (level < 0.8) return require("../../assets/archmage.png");
      return require("../../assets/promithean.png");
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
    this.getProgress(this.selectedEvent.eventID, this.userId).then(
      res=> {
        this.userProgress = res.data;
        console.log(this.userProgress);
      }
    );
  },
  methods: {
    ...mapActions('common', ['setNewHeading', 'setShowBackButton', ]),
    ...mapActions('account', ['getUserInfo']),
    ...mapActions('events',['getProgress']),
    // fetchProgress() {
    //   eventsService.getProgress(this.selectedEvent.eventID, this.userId).then(res => {
    //     this.userProgress = res["data"];
    //   }); 
    // },
    setEventDetails() {
      this.eventLocationString = `${this.selectedEvent.venueName}, ${
        this.selectedEvent.venueAddress1
      }`;
      this.eventTimeString = `${this.selectedEvent.startDate} . ${
        this.selectedEvent.startTime
      } to ${this.selectedEvent.endTime}`;
    }
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
  font-family: "Raleway", sans-serif;
}
h3 {
  color: #f80750;
  font-family: "Raleway", sans-serif;
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
</style>
