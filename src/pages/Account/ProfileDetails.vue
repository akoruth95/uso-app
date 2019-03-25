<template>
  <v-container v-if="user">
    <v-layout>
      <v-flex text-xs-center align-center xs12>
        <v-avatar size="175px">
          <img v-bind:src="user.photoLink || staticPhotoLink">
        </v-avatar>
        <h1 class="headline pt-1">
          {{user.firstName}}
          <span v-if="user.nickName">"{{user.nickName}}"</span>
          {{user.lastName}}
        </h1>
        <h3 class="py-0">{{user.city}}, {{user.state}}</h3>
      </v-flex>
    </v-layout>
    <v-layout v-if="user.shareProfile==='Y'" row>
      <v-flex xs12 sm12>
        <v-list two-line class="primary">
          <v-list-tile class="condense">
            <v-list-tile-action>
              <v-icon color="white">fa-phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.phoneNumber}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile class="condense">
            <v-list-tile-action>
              <v-icon color="white">fa-envelope</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.emailAddress}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile v-bind:class="user.address2 ? '' : 'condense'">
            <v-list-tile-action>
              <v-icon color="white">fa-map-marker-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.address1}}</v-list-tile-title>
              <v-list-tile-sub-title>{{user.address2}}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{user.city}}, {{user.state}} {{user.zip}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
                <v-list-tile-action>
              <v-icon color="white">fa-trophy</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
           
              <v-list-tile-title>{{user.interests}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
             <v-list-tile-action>
              <v-icon color="white">fa-id-badge</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.serviceBranch}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
             <v-list-tile-action>
              <v-icon color="white">fa-at</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.station}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

 <script>
import { userService } from "../../services";
import { STATELIST } from "../../utils/constants.js";
import { mapActions, mapState } from "vuex";
import { TEXT } from "../../utils/constants";

export default {
  data() {
    return {
      user: null,
      stateList: STATELIST,
      staticPhotoLink: TEXT.staticPhotolink
    };
  },
  computed: {
    ...mapState({ attendee: state => state.attendee })
  },
  created() {
    this.getProfileDetails();
    this.setShowBackButton(true);
    this.setNewBacklink("/events/attendeelist");
  },
  methods: {
    ...mapActions("common", [
      "setNewHeading",
      "setShowBackButton",
      "setNewBacklink"
    ]),
    getProfileDetails() {
      userService
        .getAttendeeProfile(this.attendee.selectedAttendee.userId)
        .then(res => {
          this.user = res["data"];
          this.setNewHeading(`${this.user.firstName} ${this.user.lastName}`);
        });
    }
  }
};
</script>

 <style scoped>
.v-divider {
  border-color: gray;
}
.condense {
  margin: -10px 0px;
}
</style>