<template>
  <v-card light class="elevation-10">
    <v-img
      class="white--text"
      height="100px"
      src="https://i1.wp.com/raleigh.americaserves.org/wp-content/uploads/2016/08/IMG_1501.jpg?resize=600%2C450"
    ></v-img>
    <v-card-text class="white">
      <v-layout row>
        <v-flex class="body-2" xs-6>{{ event.name }}</v-flex>
        <v-flex class="text-xs-right" xs6>{{ new Date(event.startDate).toDateString() }}</v-flex>
      </v-layout>
      <div>{{event.description}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["event"]
};
</script>

<style scoped>
p {
  margin-bottom: 0px;
}
</style>
