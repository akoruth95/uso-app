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
            <v-dialog
        v-model="dialog"
        width="500"
      >
            <v-icon slot="activator" color="yellow darken-2" right>fa-trophy</v-icon>
             <v-card>
                <img :src="images.sample" class="full">
                <v-divider></v-divider>    
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
import { mapActions, mapState, Store } from "vuex";
import { eventsService } from "../../services";

export default {
  data() {
    return {
      levelName: "",
      maxPoints: 800,
      comments: "",
      userProgress: {},
      images: {
                sample: require('../../assets/Leaderboard.png')
            },
      dialog: false,
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
      console.log(this.userProgress);
    });
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    ...mapActions("events", ["getProgress"]),

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
