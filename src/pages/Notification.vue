<template>
  <v-container>
    <v-img max-height="150" class="mb-2" src="https://static.usoncevents.com/megaphone.jpg"></v-img>
    <v-layout v-if="notifications.length" row wrap>
      <v-flex v-for="b in notifications" :key="b.id" xs12 class="py-1">
        <v-list two-line class="primary ma-0 pa-0" dark>
          <v-list-tile :class="notificationClass(b.notificationRead)" class="notification-text">
            <v-list-tile-content>
              <v-list-tile-title class="body-2 grey--text">{{b.notifiedTime}}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text text--lighten-2">{{b.notification}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-layout v-if="!notifications.length" justify-center>
      <div class="body-2 pa-4">You have no notifications</div>
    </v-layout>
  </v-container>
</template>

<style scoped>
.newNotification {
  font-weight: bold;
  filter: brightness(150%);
}

.notification-text {
  background-color: #0077ff3b;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      newNotifications: 0
    };
  },
  computed: {
    ...mapState({
      notifications: state => state.account.notifications
    })
  },
  created() {
    this.setNewHeading("My Notifications");
    this.getNotifications();
    // this.getNewNotificationCount();
  },
  beforeDestroy() {
    // console.log("In before destroy");
    this.updateNotifications({ data: "Y" });
    this.$store.commit("account/resetCount");
  },
  methods: {
    ...mapActions("account", ["getNotifications", "updateNotifications"]),
    ...mapActions("common", ["setNewHeading"]),
    notificationClass(readStatus) {
      if (!readStatus) {
        return "newNotification";
      }
    },
    getNewNotificationCount() {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].notificationRead === "N")
          this.newNotifications++;
        //  console.log(this.newNotifications);
      }
    }
  }
};
</script>