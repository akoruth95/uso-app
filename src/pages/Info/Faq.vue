<template>
  <div>
    <v-layout row>
      <v-flex>
        <v-dialog persistent v-model="faqDialog">
          <v-card color="white" light>
            <v-card-title class="blue lighten-4 subheading">{{ dialogTitle }}</v-card-title>
            <v-card-text class="grey lighten-4 subheading" v-html="dialogBody">
            </v-card-text>
            <v-card-actions class="blue lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="faqDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card class="elevation-0">
          <v-list class="primary">
            <v-list-group v-for="item in items" v-model="item.active" :key="item.title" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                class="primaryLight"
                v-if="item.title != 'Contact Us'"
                v-for="subItem in item.body"
                :key="subItem.title"
                @click="select()"
              >
                <v-list-tile-content>
                  <v-list-tile-title
                    @click="handleDetails(subItem.title, subItem.description)"
                  >{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list v-else class="primaryLight" two-line>
                <v-list-tile @click="select()">
                  <v-list-tile-action>
                    <v-icon color="indigo">fa-phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>+1 919 840 3000</v-list-tile-title>
                    <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile @click="select()">
                  <v-list-tile-action>
                    <v-icon color="indigo">fa-envelope</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>IWRIGHT@USO-NC.ORG</v-list-tile-title>
                    <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile @click="select()">
                  <v-list-tile-action>
                    <v-icon color="indigo">fa-map-marker-alt</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>600 Airport Blvd, Suite 200</v-list-tile-title>
                    <v-list-tile-sub-title>Morrisville, NC 27560</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-list-group>
          </v-list>
          <v-flex class="primary">
            <div class="mx-3">
              <div class="subheading pb-3">App Created By</div>
              <v-img :src="getImage" @click="handleDetails('Credits',credits)"></v-img>
            </div>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      faqDialog: false,
      dialogTitle: " ",
      dialogBody: " ",
    
      credits: "<i>Alan Krouth<br> Ausaif Ali<br> Indraneel Bende<br> Janeth Jepkogei<br> Joseph Prem Anand<br> Kameswara Eati<br> Kumarasamy Ramasamy<br> Maki Ma<br> Piriyanka Aruwani<br> Prithika Manivannan<br> Raghavendra Mesta</i>",

      items: [
        {
          title: "Logging out and Changing Password",
          body: [
            {
              title: "How do I change my password or logout?",
              description:
                "From the <b>Bottom Bar</b>, navigate to the Profile page. Here you can change your Reset app password as well as logout of the Reset application. <br><br><b>[Bottom Bar -> Profile -> Change Password (lock icon) or Logout]</b>"
            }
          ]
        },
        {
          title: "User Profile",
          body: [
            {
              title: "How to edit my profile or change my photo?",
              description:
                "Touch the <b>'Profile'</b> icon in the <b> Bottom Bar</b>. This will display your profile information. Click on the Edit (pencil) button to change your profile including uploading or changing your photo. <br> Touch the photo to replace with a new photo from your phone's camera roll or photo gallery. <br><br><b>[Bottom Bar -> Profile -> Edit Profile]</b> "
            },
            {
              title: "Is my profile information private?",
              description:
                "By default, your profile is private - none of the information, except your name and city are visible to others. If you wish to change this behaviour, navigate to the Profile page, Edit profile and set the toggle at the bottom of the page to: <b>Your profile is public<b>. <br><br><b> [Bottom Bar -> Profile -> Edit Profile -> Privacy Toggle]</b>"
            }
          ]
        },
        {
          title: "Event and Sessions",
          body: [
            {
              title: "Where can I find Event information?",
              description:
                "In the Bottom Bar, use the <b>Events</b> icon to go to a list of events that you have registered for. From there you can navigate to a particular Event <b>Home page</b>. The top of the page displays <b>Event Venue</b>, date and time. There are icons there to lead you to pages that show the Agenda, materials available for the Event, Attendees of the Event and so on. <br><br><b>[Bottom Bar -> Event Listing -> Event Home]</b>."
            },
            {
              title: "Where can I find details of individual Sessions?",
              description:
                "The <b>Session Details </b> page provides a description of the Session, an Instructor Bio, Resources connected with the Session as well as Notes and Questions. <br><br><b> [Events Listing -> Event Home -> Agenda -> Session Listing -> Session Details]</b>."
            }
          ]
        },
        {
          title: "Tools",
          body: [
            {
              title: "What are Notes and Questions?",
              description:
                "<b>Notes</b> allow you to take Notes during a Session for later reference. You can use the <b>Questions</b> page to ask questions to the Instructor before or during a Session. <br><br><b>[Events Listing -> Event Home -> Agenda -> Session Listing -> Session Details -> Notes]</b>. <br><br> The Instructor will answer all questions at the end of the Session. Questions asked after the Session closure may not be answered. <br><br><b>[Events Listing -> Event Home -> Agenda -> Session Listing -> Session Details -> Questions]</b>"
            },
            {
              title: "What are Materials and Resources?",
              description:
                "Help guides, links, documents etc. provided for an Event can be accessed from the <b>Materials</b> section of the Event. <br><br><b>[Events Listing -> Event Home -> Materials]</b>. <br><br> Similarly, material relating to a particular Session can be accessed from <b>Resources</b> section. <br><br><b>[Events Listing -> Event Home -> Agenda -> Session Listing -> Session Details -> Resources]</b>. <br><br> Both Materials and Resources can be bookmarked for easy access. "
            },
            {
              title: "What are Bookmarks?",
              description:
                "<b>Bookmarks</b> are shortcuts to reach your favorite pages quickly. For example, you can bookmark a Session under an Event and at a later time, navigate to the Session page quickly using the Bookmark. Other than a Session, you can also bookmark Materials and Resources. <br><br>Touch the Bookmark icon to bookmark a page. All bookmarked items will be listed under the Bookmarks page which can be accessed from the Bottom Bar. Once in the Bookmarks page, touch a bookmarked item to quickly navigate to it. Use the delete button to remove a bookmark if you do not need it. <br><br><b>[Bottom Bar -> Bookmarks]</b>."
            },
            {
              title: "Where can I see notifications that I have received?",
              description:
                "The Reset app addministrators may periodically send announcements or reminders over to you. These are displayed in the <b>Notifications page</b>, which can be accessed through the Bottom Bar. This page provides a reverse chronological display of all notifications. <br><br><b>[Bottom Bar -> Notifications (Bell icon)]</b>."
            }
          ]
        },
        {
          title: "Connecting with Event participants",
          body: [
            {
              title: "Where to find info about attendees to my event?",
              description:
                "You can view all attendees for an event through the <b>Attendees </b> section in the Event Home.  This page lists the attendees along with their profile photo. Clicking on one of the rows will take you to the Profile page of the attendee. Depending on their privacy settings, you can either view all or brief details about them. <br><br><b>[Events Listing -> Event Home -> Attendees]</b>."
            },
            {
              title: "How to communicate with other attendees?",
              description:
                "The Reset app provides an Event Wall which can be accessed from the Event Home of your event. You can post messages on the wall and read replies. Note that all messages posted on the app is public. Spamming or bad language is prohibited. <br><br><b>[Events Listing -> Event Home -> Event Wall]</b>. "
            }
          ]
        },
        {
          title: "Contact Us",
          body: [{}]
        }
      ]
    };
  },
  computed: {
    getImage() {
      return require("../../assets/AppDevelopedBy.png");
    }
  },
  created() {
    this.setNewHeading("Help & FAQ");
  },
  methods: {
    ...mapActions("common", ["setNewHeading"]),
    select() {
      console.log("clicked");
    },
    handleDetails(title, description) {
      this.dialogTitle = title;
      this.dialogBody = description;
      this.faqDialog = true;
    }
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
