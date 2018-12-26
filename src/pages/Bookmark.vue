<template>
  <div>
    <v-toolbar flat dense>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pt-2 secondary--text">Saved Bookmarks</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile
        class="elevation-5 primary white--text mb-2"
        v-for="bookmark in bookmarks"
        :key="bookmark"
        @click="some"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="font-weight-medium subheading">{{ bookmark.name }}</span>
          </v-list-tile-title>
          <v-list-tile-title>
            <span class="font-weight-medium subheading">{{ bookmark.eventName }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <v-btn fab style="height:30px;width:30px" @click.prevent.stop="removeLink(index)">
          <v-icon small style="height:auto;width:auto">fa-times</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookmarks: [
        {
          name: "Resource info: bookmark name 1",
          eventName: "Family Reset"
        },
        {
          name: "Session info: bookmark name 2",
          eventName: "Family Reset"
        }
      ]
    };
  }
};
</script>
