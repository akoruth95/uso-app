<template>
  <v-app dark>
    <top-bar v-if="loggedIn"></top-bar>
    <v-content class="primary">
      <div class="text-xs-center">
        <v-alert
          transition="slide-y-transition"
          style="position: absolute; z-index: 999; width: 100%;"
          v-model="showAlert"
          :type="alert.type"
          dismissible
        >{{ alert.message }}</v-alert>
      </div>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
    <bottom-bar v-if="loggedIn"></bottom-bar>
  </v-app>
</template>

<script>
import topBar from "./components/TopBar";
import bottomBar from "./components/BottomBar";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return { 
      bottomNav: 0
    };
  },

  methods: {
     ...mapActions('alert', ['clear'])
  },

  computed: {
    ...mapState({
      loggedIn: state => state.account.status.loggedIn,
      alert: state => state.alert
    }),
    showAlert: {
      get() {
        return !!this.alert.message;
      },
      set (val) {
        if (!val) {
          this.clear();
        }
      }
    }
  },
  components: {
    topBar,
    bottomBar
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
