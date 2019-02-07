<template>
  <v-container fluid grid-list-lg>
    <v-img max-height="150" class="mb-3" src="https://static.usoncevents.com/megaphone.jpg"></v-img>
    <div class="mx-2 my-2" v-for="n in notifications" :key="n.notificationId">
      <v-list
        three-line
        class="primary ma-0 pa-0"
        :class="notificationClass(n.notificationRead)"
        dark
      >
        <v-list-tile class="notification-text pa-0 pb-1">
          <v-list-tile-content>
            <v-list-tile-title class="body-2 grey--text">{{n.notifiedTime}}</v-list-tile-title>
            <v-list-tile-sub-title class="body grey-text">{{n.notification}}</v-list-tile-sub-title>
            <v-list-tile-sub-title class="body grey-text">{{n.notificationRead}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <!-- <v-layout v-if="notifications.length" row>
      <v-layout>
        <v-flex xs12 v-for="n in notifications" :key="n.notificationId">
          <v-list
            three-line
            class="primary ma-0 pa-0"
            :class="notificationClass(n.notificationRead)"
            dark
          >
            <v-list-tile class="notification-text pa-0 pb-1">
              <v-list-tile-content>
                <v-list-tile-title class="body-2 grey--text">{{n.notifiedTime}}</v-list-tile-title>
                <v-list-tile-sub-title class="body grey-text">{{n.notification}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>-->
    <v-layout v-if="!notifications.length" justify-center>
      <h2 class="pa-4">You have no notifications</h2>
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
      newNotifications : 0
    }
  },
  computed: {
    ...mapState({
      notifications: state => state.account.notifications
    })
  },
  created() {
    this.setNewHeading("My Notifications");
   // this.getNotifications();
   // this.getNewNotificationCount();
    
  },
  beforeDestroy() {
   // console.log("In before destroy");
     this.updateNotifications({data: 'Y'});
    this.$store.commit('account/resetCount');
        
  },
  methods: {
    ...mapActions("account", ["getNotifications","updateNotifications"]),
    ...mapActions("common", ["setNewHeading"]),
    notificationClass(readStatus) {
      if (!readStatus) {
        return "newNotification";
      }
    },
    getNewNotificationCount() {
      for(let i=0;i<this.notifications.length;i++) {
        if(this.notifications[i].notificationRead == 'N')
            this.newNotifications++;
          //  console.log(this.newNotifications);
      }
    }
  }
};
</script>