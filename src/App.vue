<template>
  <v-app>
    <v-toolbar color="secondary" height="70px" dark app>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn to="/" :color="(fab!='home')?'grey':'white'" :fab="fab=='home'" light :icon="fab!='home'"  @click.stop="fab = 'home'">
        <v-badge right color="red">
          <v-icon color="secondary">fa-home</v-icon>
        </v-badge>
      </v-btn>
      <v-btn :color="(fab!='globe')?'grey':'white'" :fab="fab=='globe'" light :icon="fab!='globe'"  @click.stop="fab = 'globe'">
        <v-icon color="secondary">fas fa-globe</v-icon>
      </v-btn>
      <v-btn icon to="/info">
              <v-icon> fa-info</v-icon>
      </v-btn>-->
      <!-- <v-spacer></v-spacer>
      <v-spacer></v-spacer>-->
      <img class height="55px" src="./assets/uso-logo.svg">
      <v-spacer></v-spacer>
      <span></span>
      <v-spacer></v-spacer>
      <v-btn fab small color="primary" to="/search">
        <v-icon style="height:auto;width:auto" small>fa-search</v-icon>
      </v-btn>
      <v-btn fab small color="primary" to="/faq">
        <v-icon style="height:auto;width:auto" small>fa-info</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content color="secondary">
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
    <bottom-bar></bottom-bar>
  </v-app>
</template>

<script>
import bottomBar from "./components/BottomBar";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      // fab: "home",
      bottomNav: 0
    };
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  components: {
    bottomBar
  },
  watch: {
    $route() {
      this.clearAlert();
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
