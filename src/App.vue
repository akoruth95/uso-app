<template>
  <v-app>
    <top-bar heading="RESET" backlink></top-bar>
    <v-content color="secondary">
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
    <bottom-bar></bottom-bar>
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
    topBar,
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
