<template>
  <div>
    <top-bar heading="RESET" backlink></top-bar>

    <v-layout row>
      <v-flex>
        <v-card class="elevation-0">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Help and FAQ</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>fa-search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <v-list-group v-for="item in items" v-model="item.active" :key="item.title" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-if="item.title != 'Contact Us'"
                v-for="subItem in item.body"
                :key="subItem.title"
                @click
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list v-else two-line>
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
            </v-list-group>
          </v-list>
          <v-flex>
            <v-card>
              <v-list-tile>Our Sponsors</v-list-tile>

              <v-container grid-list-sm fluid>
                <v-layout row wrap>
                  <v-flex v-for="n in 3" :key="n" xs4>
                    <v-card flat tile class="center">
                      <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        width="100"
                      >
                        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </v-img>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import topBar from "../../components/TopBar";
export default {
  data() {
    return {
      items: [
        {
          title: "Download and Installation",
          body: [
            { title: "How to use the app" },
            { title: "Updating the app" },
            { title: "Reinstalling the app" }
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
        },
        {
          title: "Contact Us",
          body: [{}]
        }
      ]
    };
  },
  components: {
    topBar
  }
};
</script>

<style >
.v-list__group__items--no-action .v-list__tile {
  padding-left: 35px;
}
.center {
  text-align: center;
  text-align: -webkit-center;
}
</style>
