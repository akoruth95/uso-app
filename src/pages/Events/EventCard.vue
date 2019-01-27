<template>
  <v-card light class="elevation-10">
    <v-img class="white--text" height="150px" :src="event.photoLink"></v-img>
    <v-card-text class="white">
      <v-layout row>
        <v-flex class="body-2" xs-6>{{ event.name }}</v-flex>
        <v-flex class="text-xs-right" xs6>{{ new Date(event.startDate).toDateString() }}</v-flex>
      </v-layout>
      <div>
        {{ description }}
        <span
          class="primary--text"
          @click.prevent.stop="showMore=false"
          v-if="showMore"
        >... Show more</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      showMore: true
    };
  },
  computed: {
    description() {
      if (this.event.description.length > 200 && this.showMore) {
        return this.event.description.substring(0, 200);
      } else if (!this.showMore) {
        return this.event.description;
      } else {
        return this.event.description;
      }
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
</style>
