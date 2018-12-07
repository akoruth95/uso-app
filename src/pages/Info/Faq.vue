<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Help and FAQ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>fa-search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card>
          <v-list>
            <v-list-group v-for="item in items" v-model="item.active" :key="item.title" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-for="subItem in item.body" :key="subItem.title" @click>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
        <v-divider class="my-3"></v-divider>
        <v-card>
          <v-subheader>Contact Us</v-subheader>
          <v-list two-line>
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon color="indigo">fa-phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon color="indigo">fa-envelope</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>ncreset@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Email</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon color="indigo">fa-map-marker-alt</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>1400 Main Street</v-list-tile-title>
                <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>



<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Download and Installation",
          body: [
            { title: "Updating the app" },
            { title: "Reinstalling the app" },
            { title: "List Item" },
            { title: "List Item" }
          ]
        },
        {
          title: "Verification",
          body: [
            { title: "Verify your number" },
            { title: "Two step authentication" }
          ]
        },
        {
          title: "Account and Profile",
          body: [
            { title: "Managing your profile" },
            { title: "Deleting your account" },
            { title: "Changing your phone" }
          ]
        },
        {
          title: "Chat Wall",
          body: [
            { title: "Deleting chats" },
            { title: "Disabling notifications" }
          ]
        },
        {
          title: "Troubleshooting",
          body: [
            { title: "Connection problems" },
            { title: "Why don't I get notifications" },
            { title: "seeing blurry photos" }
          ]
        }
      ]
    };
  }
};
</script>
