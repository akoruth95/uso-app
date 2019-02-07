<template>
  <div>
    <div class="title py-3 text-xs-center">Feedback</div>

    <v-container fluid grid-list-xl>
      <div>
        <p style="color:white">Use the Space below to provide any additional comments you might have</p>
        <textarea id="ip2" v-model="comments"/>
      </div>

      <v-layout row align-center justify-center fill-height>
        <v-flex d-flex xs12 sm6 md4>
          <v-card>
            <v-flex text-xs-center>
              <h3 align="justify">In terms of overall satisfaction, how would you rate the event</h3>
              <div align="center">
                <star-rating
                  align="center"
                  :star-size="20"
                  :show-rating="false"
                  active-color="yellow"
                  @rating-selected="setSatisfactionRating"
                ></star-rating>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row align-center justify-center fill-height>
        <v-flex d-flex xs12 sm6 md4>
          <v-card>
            <v-flex text-xs-center>
              <h3 align="justify">Do you think the event met the objectives you had in mind</h3>
              <div align="center">
                <star-rating
                  align="center"
                  :star-size="20"
                  :show-rating="false"
                  active-color="yellow"
                  @rating-selected="setObjectivesRating"
                ></star-rating>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row align-center justify-center fill-height>
        <v-flex d-flex xs12 sm6 md4>
          <v-card tile="true">
            <v-flex text-xs-center>
              <h3 align="justify">How likely are you to suggest events from USO to your friends</h3>
              <div align="center">
                <star-rating
                  align="center"
                  :star-size="20"
                  :show-rating="false"
                  active-color="yellow"
                  @rating-selected="setSuggestionRating"
                ></star-rating>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>

      <div align="center">
        <v-btn style="background-color: #f80750" @click="submit">submit</v-btn>
      </div>
      <v-dialog hide-overlay v-model="dialog" max-width="300">
        <v-card>
          <v-card-text>Thank you for your comments. Your feedback has been accepted.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="white" flat="flat" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import topBar from "../../components/TopBar";
import { mapActions, mapState } from "vuex";
import StarRating from "vue-star-rating";
import Rating from "v-rating";
export default {
  data() {
    return {
      satisfactionRating: 0,
      objectivesRating: 0,
      suggestionRating: 0,
      comments: "",
      dialog: false,
      eventId: ""
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState("account", ["userId"]),
    ...mapState({
      userId: state => state.account.userId
    })
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
  },
  methods: {
    ...mapActions("common", [
      "setNewBacklink",
      "setNewHeading",
      "setShowBackButton"
    ]),
    setEventDetails() {
      this.eventId = `${this.selectedEvent.eventId}`;
    },
    setSatisfactionRating: function(rating) {
      this.satisfactionRating = rating;
    },
    setObjectivesRating: function(rating) {
      this.objectivesRating = rating;
    },
    setSuggestionRating: function(rating) {
      this.suggestionRating = rating;
    },
    submit: function() {
      console.log("satisfactionRating = " + this.satisfactionRating);
      console.log("objectivesRating = " + this.objectivesRating);
      console.log("suggestionRating = " + this.suggestionRating);
      console.log("comments = " + this.comments);
      console.log("event ID = " + this.eventId);
      console.log("user Id = " + this.userId);
      this.dialog = true;
    }
  },
  components: {
    topBar,
    StarRating,
    Rating
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
  color: white;
  font-family: "Raleway", sans-serif;
}
#ip2 {
  border-radius: 25px;
  border: 2px solid white;
  padding: 10px;
  width: 95%;
  height: 50px;
}
</style>