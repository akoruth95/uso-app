<template>

  <div>
    <v-container fluid grid-list-xl>
      <div>
        <v-flex text-xs-center align-center xs12>
          <v-avatar size="150px">
            <img :src="levelImage">
          </v-avatar>
          <div class="title py-2">{{ levelName }}</div>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs6 text-xs-center class="py-0">
            <v-icon color="yellow darken-2" right>fa-coins</v-icon>
            <div>{{userProgress.gamePoints}}</div>
          </v-flex>
          <v-flex xs6 text-xs-center class="py-0">
            <v-dialog scrollable
        v-model="dialog"
        width="500"
      >
            <v-icon slot="activator" color="yellow darken-2" right @click="getLeaderBoardInfo()">fa-trophy</v-icon>
      <v-card dense class="elevation-0">
        <v-toolbar color=secondary dark>
             <v-toolbar-title >Leaderboard</v-toolbar-title>   
             <v-spacer></v-spacer>
             <v-icon>fa-times</v-icon>
            </v-toolbar>
       <!-- orderBy(rooms,'last_iteraction') -->
                    <v-list class="primaryLight" >
                        <v-list-tile
                              v-for="(attendee,index) in orderedUsers"
                              :key="attendee.attendeeId"
                              class="attendee-back py-2 my-2">
                            <v-list-tile-avatar size="50px" class="pr-3">
                                <v-img aspect-ratio="0.2" :src="attendee.photoLink"></v-img>
                            </v-list-tile-avatar>
                            <v-list-tile-content class="text-xs-right">
                                <div class="body-2 text-xs-right">{{attendee.firstName}} {{attendee.lastName}}</div>
                                <div> 
                                  {{attendee.gamePoints}} points 
                                </div> 
                            </v-list-tile-content>
                            <!-- v-bind:class="{'classcss': class1 === 1,'classcss2': class1 === 2}" -->
                            <v-list-tile   v-if="index === 0" size="50px" class="pr-3">
                                <v-icon color="yellow darken-2">fa-trophy</v-icon>
                            </v-list-tile>
                            <v-list-tile   v-if="index === 1" size="50px" class="pr-3">
                                <v-icon >fa-trophy</v-icon>
                            </v-list-tile>
                            <v-list-tile   v-if="index === 2" size="50px" class="pr-3">
                                <v-icon color="brown">fa-trophy</v-icon>
                            </v-list-tile>
                        </v-list-tile>
                    </v-list>
           </v-card>
      </v-dialog>
            <div>{{userProgress.gameRank}}</div>
          </v-flex>
          <v-flex xs12>
            <v-card dense class="elevation-0">
              <v-list class="primaryLight" dense>
                <v-list-tile class="progress-text my-1" avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="subheading">Achievements</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>{{userProgress.achievementCount}}</v-list-tile-action>
                </v-list-tile>
                <v-list-tile
                  class="progress-text my-1"
                  v-for="item in items"
                  :key="item.title"
                  avatar
                >
                  <v-list-tile-content>
                    <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon :color="item.active ? 'teal' : 'grey darken-2'">fa-check-circle</v-icon>
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
import _ from 'lodash';
import { mapActions, mapState, Store } from "vuex";
import { eventsService } from "../../services";
import { attendeesService } from "../../services";


export default {
  data() {
    return {
      orderBy : require('lodash.orderby'),
      levelName: "",
      maxPoints: 800,
      comments: "",
      userProgress: {},
      images: {
                sample: require('../../assets/Leaderboard.png')
            },
      dialog: false,
      attendeeList: [],
      leaderBoard: [],
      //active : userProgress.answer_poll_flag === 'Y' ? true : false
      items: [
        {
          key: "answerPollFlag",
          title: "Answer Poll"
        },
        {
          key: "askQuestionFlag",
          title: "Ask Question"
        },
        {
          key: "bookmarkFlag",
          title: "Bookmarks"
        },
        {
          key: "likeFlag",
          title: "Likes"
        },
        {
          key: "postFlag",
          title: "Posts"
        },
        {
          key: "provideFeedbackFlag",
          title: "Provide Feedback"
        },
        {
          key: "takeNoteFlag",
          title: "Take Notes"
        },
        {
          key: "updateProfileFlag",
          title: "Update Profile"
        },
        {
          key: "uploadPhotoFlag",
          title: "Upload photo"
        }
      ]
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState({
      userInfo: state => state.account.userInfo
    }),
  //   orderedUsers: function () {
  //   return _.orderBy(this.users, 'name')
  // },
    orderedUsers: function() {
        return _.orderBy(this.leaderBoard,'gamePoints').reverse();
    },
    profileImage: function() {
      return (
        this.userInfo.profileUrl || require("../../assets/blank-profile.png")
      );
    },
    leaderboardImage() {
      return require("../../assets/Leaderboard.png");
    },
    levelImage() {
      let level = this.userProgress.gamePoints / this.maxPoints;
      if (level > 0.8 && this.userProgress.achievementCount == "9/9") {
        this.levelName = "Promithean";
        return require("../../assets/promithean.png");
      }
      if (level > 0.6) {
        this.levelName = "Archmage";
        return require("../../assets/archmage.png");
      }
      if (level > 0.4) {
        this.levelName = "Grand Master";
        return require("../../assets/grandmaster.png");
      }
      if (level > 0.2) {
        this.levelName = "Magus";
        return require("../../assets/magus.png");
      }
      this.levelName = "Journey Man";
      return require("../../assets/journeyman.png");
    },
    name: function() {
      return (
        this.userProgress.firstName +
        " " +
        this.userProgress.lastName +
        (this.userProgress.nickName ? ", " + this.userProgress.nickName : "")
      );
    },
    lastName: function() {
      return;
    }
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
    this.getProgress(this.$store.state.account.userId).then(res => {
      this.userProgress = res.data;
      this.items.forEach(item => {
        if (this.userProgress[item.key].toUpperCase() === "Y") {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      // console.log(this.userProgress);
    });
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions("events", ["getProgress"]),

    getLeaderBoardInfo() {
      attendeesService.getLeaderboard(this.userProgress.eventId).then(result => {
        this.leaderBoard = result.data;
     })
    },

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
.progress-text {
  background-color: #0077ff3b;
}
.full {
  width: 100%;
  height: auto;
}

</style>
