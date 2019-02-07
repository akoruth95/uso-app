<template>
       <v-card>
        <v-flex text-xs-center>
          <h3 align="justify">{{ poll.question }}</h3>
          <div align="center" >
            <star-rating align="center" :star-size="20" :show-rating="false" active-color="yellow" @rating-selected="setSatisfactionRating"></star-rating> 
          </div>
        </v-flex>
       </v-card>
</template>

<script>
export default {
  props: ["poll"],
  data() {
    return {
    };
  },
  computed: {
  }
};
</script>

<script>
export default {
    props: ['feedback']
};
</script>

<style scoped>
p {
    margin-bottom: 0px;
}
</style>
