<template>
  <div>
    <v-bottom-nav :active.sync="bottomNav" :value="true" color="secondary" app fixed>
      <v-btn dark to="/">
        <span>Events</span>
        <v-icon>fa-list</v-icon>
      </v-btn>

      <v-btn dark to="/bookmark">
        <span>Bookmarks</span>
        <v-icon>fa-bookmark</v-icon>
      </v-btn>

      <v-btn dark to="/notification">
        <span>Notifications</span>
        <v-badge  v-if="num > 0" fab color="primary">
          <span slot="badge">{{num}}</span>
          <v-icon>fa-bell</v-icon>
        </v-badge>
        <v-badge  v-else fab color="primary">
          <v-icon>fa-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-btn dark to="/profile">
        <span>Profile</span>
        <v-icon>fa-user-cog</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
       num: state => state.account.newNotifications
     // num: state => state.account.notifications.length
    })
  },
  data() {
    return {
      bottomNav: 0
    };
  }
};
</script>

