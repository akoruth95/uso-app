<template>
  <div>
    <div class="feedback">
      <div class="title pa-2 text-xs-center">Feedback</div>
      <div v-if="ratingPolls.length">
        <div v-for="b in ratingPolls" :key="b.pollId">
          <div class="feedback-text ma-2 pa-2">
            <div class="text-xs-left body-2">{{ b.question }}</div>
            <div align="text-xs-center">
              <span v-for="(star,index) in stars" :key="index">
                <v-btn
                  v-if="b.ratingAnswer > index"
                  class="mx-1"
                  small
                  icon
                  color="secondary"
                  @click="updateRating(b,index+1)"
                >
                  <v-icon small>fa-star</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  class="mx-1"
                  small
                  icon
                  color="primary"
                  @click="updateRating(b,index+1)"
                >
                  <v-icon small color="grey">fa-star</v-icon>
                </v-btn>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="pa-4 body-2">You have no rating polls</div>
      </div>

      <div v-if="commentPolls.length">
        <div v-for="b in commentPolls" :key="b.pollId">
          <div class="feedback-text ma-2 pa-2">
            <div class="text-xs-left body-2">{{ b.question }}</div>
            <div align="text-xs-center">
              <textarea id="ip2" v-model="b.commentAnswer"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="pa-4 body-2">You have no comment polls</div>
      </div>
    </div>
    <div>
      <div align="center" id="fixedbutton">
        <v-btn color="secondary" @click="submit()">submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from "../../components/TopBar";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      eventId: "",
      ratingPolls: [],
      commentPolls: [],
      allPolls: [],
      stars: 5
    };
  },
  computed: {
    ...mapState("events", ["selectedEvent"]),
    ...mapState("account", ["userId"]),
    ...mapState({
      alert: state => state.alert,
      userId: state => state.account.userId
    })
  },
  created() {
    this.setEventDetails();
    this.setNewHeading(this.selectedEvent.name);
    this.setShowBackButton(true);
    this.setNewBacklink("/event/details");
    const pollsRequestData = {
      eventId: this.selectedEvent.eventId,
      attendeeId: this.selectedEvent.attendeeId
    };
    this.getPolls(pollsRequestData).then(res => {
      res.data.forEach(element => {
        this.allPolls = res.data;
        if (element.questionType == "RATING") {
          if (!element.ratingAnswer) element.ratingAnswer = -1;
          this.ratingPolls.push(element);
        } else if (element.questionType == "COMMENT") {
          this.commentPolls.push(element);
        }
      });
    });
  },
  methods: {
    ...mapActions("common", [
      "setNewBacklink",
      "setNewHeading",
      "setShowBackButton"
    ]),
    ...mapActions("events", ["getPolls", "submitPolls"]),
    ...mapActions("alert", ["clear", "error", "success"]),
    setEventDetails() {
      this.eventId = `${this.selectedEvent.eventId}`;
    },
    submit() {
      let payload = [];
      this.allPolls.forEach(element => {
        if (null === element.answerId) {
          let item = {
            attendeeId: this.selectedEvent.attendeeId,
            commentAnswer: element.commentAnswer,
            pollId: element.pollId,
            ratingAnswer: element.ratingAnswer
          };
          payload.push(item);
        } else {
          let item = {
            attendeeId: this.selectedEvent.attendeeId,
            commentAnswer: element.commentAnswer,
            pollId: element.pollId,
            ratingAnswer: element.ratingAnswer,
            answerId: element.answerId
          };
          payload.push(item);
        }
      });
      console.log("length", payload.length);
      if (this.allPolls.length === 0) {
        this.error("Polls are yet to be created, thank you for your patience.");
      } else {
        this.submitPolls(payload);
        if (payload.length > 1) {
          this.success("Thank you for your feedback");
        } else {
          this.error("OOPS! There is something wrong. Please try again");
        }
      }
    },
    updateRating(b, index) {
      b.ratingAnswer = index;
    }
  },
  components: {
    topBar
  }
};
</script>

<style >
.feedback-text {
  background-color: #003472;
}
#ip2 {
  border-radius: 15px;
  border: 2px solid white;
  padding: 2px 10px;
  margin-top: 1vh;
  width: 100%;
  height: 60px;
}
#fixedbutton {
  position: fixed;
  top: 85%;
  margin-top: -10px;
  width: 100%;
  height: 10%;
  background: #012247;
}
.feedback {
  padding-bottom: 60px;
}
</style>