<template>
  <v-container fluid id="socialWallContainer">

    <div id="startWriting">
      <textarea placeholder="Start Writing" id="startWritingTextarea" v-model="post"></textarea>
      <div id="startWritingRight">
        <v-btn color="#bb133e" fab large dark v-if="post.length > 0" class="submitPost">submit</v-btn>
        <v-btn color="#002147" fab large dark v-if="post.length == 0" class="submitPost submitPostInactive">submit</v-btn>
        <i class="fas fa-microphone-alt" id="microphone"></i>
      </div>
    </div>

    <div v-for="post in posts" :key="post.wall_id" id="postContainer">
      <div id="postImageContainer">
        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F95%2FVue.js_Logo_2.svg%2F1200px-Vue.js_Logo_2.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FVue.js&docid=NgTyn8bKIS8ifM&tbnid=t_12Px0RtwVq1M%3A&vet=10ahUKEwiRttD2oYLfAhXqtlkKHQfyARIQMwhMKAAwAA..i&w=1200&h=1040&bih=603&biw=1016&q=vue%20image&ved=0ahUKEwiRttD2oYLfAhXqtlkKHQfyARIQMwhMKAAwAA&iact=mrc&uact=8" id="postImage" height="75px" width="75px">
      </div>
      <div id="postBody">
        <div>{{post.post}}</div>
        <i class="fas fa-thumbs-up"></i> {{post.likes}}
      </div>
    </div>

  </v-container>
</template>

<style scoped>
#socialWallContainer{
  color:#bb133e;
  font-size:1em;
}
#startWriting{
  border:1px solid #bb133e;
  border-radius:5em;
}
#startWritingTextarea{
  padding:2.5em;
  padding-top:2em;
  height:5.5em;
  max-height:5.5;
  width:68%;
  outline:none;
  display:inline-block;
  resize:none;
}
#microphone{
  font-size:2em;
  display:inline-block;
  padding-top:.85em;
  float:right;
  padding-right:.25em
}
.submitPost{
  float:right;
  margin-top:.35em
}
.submitPostInactive{
  color:gray;
}
#startWritingRight{
  display:inline-block;
  float:right;
}
#postContainer{
  padding-top:.99em;
  display:block;
}
#postImageContainer{
  display:inline-block;
  width:20%;
  float:left;
  padding-top:.5em;
  padding-right:.99em;
}
#postImage{
  border:1px solid #bb133e;
}
#postBody{
  padding-left:.99em;
  width:80%;
  display:inline-block;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
</style>

<script>
  // import { mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        post:'',
        posts:[
          {
            wall_id: 22,
            event_id: 12345,
            attendee_id: 7,
            post: 'postyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
            posted_time: '2018-12-02T20:35:05Z',
            insert_user:'nik',
            insert_tms:'2018-12-02T20:35:05Z',
            last_chg_user:'nik',
            last_chg_tms:'2018-12-02T20:35:05Z',
            likes: 2
          },
          {
            wall_id: 24,
            event_id: 12345,
            attendee_id: 8,
            post: 'posty toasty',
            posted_time: '2018-12-02T20:35:05Z',
            insert_user:'nik',
            insert_tms:'2018-12-02T20:35:05Z',
            last_chg_user:'nik',
            last_chg_tms:'2018-12-02T20:35:05Z',
            likes: 5
          }
        ]
      }
      // ,
      // computed: {
      //   ...mapState('account', [('user')]),
      //   ...mapState('events', [('state')])
      // }
    }
  };
</script>