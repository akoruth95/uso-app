<template class="infoPage">
  <div >
    <v-card>
    <v-layout row>
      <v-flex >
       
          <!-- <v-toolbar color="white" dark>

            <v-toolbar-title>Info Help</v-toolbar-title>
          </v-toolbar> -->
          
    <div class='is-component is-searchbox'>
       
        <input class='is-button is-search-button is-field' type='text' ref='input' v-model='entry' v-on:click='focus()'/>
    </div>
          <v-list subheader two-line>
            <v-list-tile to="/info/usage.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>How to use the app</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/info/gettingStarted.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>Getting Started</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/info/troubleshoot.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>Troubleshooting</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/info/faq.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>FAQs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/info/uso.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>About USO</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/info/deutschebank.html">
              <v-list-tile-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content @click="notifications = !notifications">
                <v-icon>fa-folder</v-icon>
                <v-list-tile-title>About Deutsche Bank</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex  text-xs-center class="logo-container">
        <v-item-group class="logos">
          <img height="60px" width="99px" padding="10px" src="@/assets/uso-logo.svg" alt="Vuetify.js" class="mb-5">
        </v-item-group>
        <v-item-group>
          <img height="70px" width="99px" padding="10px" src="@/assets/db-logo.jpeg" alt="Vuetify.js" class="mb-5">
        </v-item-group>   
      </v-flex>
    </v-layout>
    </v-card>
  </div>
</template>

<style scoped>
  .logos{
    margin-bottom: 10px;
  }
  .logo-container{
    margin-bottom: 0%;
  }
  .infoPage{
    background-color: pink;
  }
  .is-component{
    padding: 10px;
  }
  .is-searchbox{
    background:pink;
  }
  .button, input, select, textarea {
    background-color: #fafafa;
    border-style: inset;
    color: inherit;
  }
</style>

<script>
    export default {
        name : 'search-button',
        props : {
            // text : set the text into the input button
            "text" : {
                type : String,
                default : "Search Help"
            }
        } 
    }
</script>